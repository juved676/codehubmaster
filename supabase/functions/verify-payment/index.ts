import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentVerificationRequest {
  payment_id: string;
  upi_ref: string;
  status: 'completed' | 'failed';
  auto_upgrade?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user is authenticated and is admin
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid or missing authentication' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('User verifying payment:', user.email);

    const { payment_id, upi_ref, status, auto_upgrade = true }: PaymentVerificationRequest = await req.json();

    if (!payment_id || !upi_ref || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: payment_id, upi_ref, status' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate UPI reference format (minimum length check)
    if (upi_ref.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: 'Invalid payment reference. Please enter a valid Razorpay payment ID or UPI transaction ID.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing payment verification:', { payment_id, upi_ref, status });

    // First, verify that this payment belongs to the authenticated user and is still valid
    const { data: paymentCheck, error: checkError } = await supabaseClient
      .from('payments')
      .select('user_id, payment_status, expires_at, amount')
      .eq('id', payment_id)
      .single();

    if (checkError || !paymentCheck) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if payment has expired
    const now = new Date();
    const expiresAt = new Date(paymentCheck.expires_at);
    if (expiresAt < now) {
      return new Response(
        JSON.stringify({ error: 'Payment has expired. Please create a new payment.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if payment is already completed
    if (paymentCheck.payment_status === 'completed') {
      return new Response(
        JSON.stringify({ error: 'This payment has already been verified and processed.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate amount
    if (paymentCheck.amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid payment amount' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Security check: Ensure user can only verify their own payments
    if (paymentCheck.user_id !== user.id) {
      console.warn('User attempted to verify another user\'s payment:', { 
        requesting_user: user.id, 
        payment_owner: paymentCheck.user_id 
      });
      return new Response(
        JSON.stringify({ error: 'Unauthorized: You can only verify your own payments' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Update payment status
    const { data: payment, error: updateError } = await supabaseClient
      .from('payments')
      .update({
        payment_status: status,
        upi_ref: upi_ref,
        upi_transaction_id: upi_ref,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment_id)
      .select('*, subscription_plans(name, credits_per_period)')
      .single();

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update payment', details: updateError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    let subscriptionCreated = false;
    let subscriptionError = null;

    // If payment completed and auto_upgrade is enabled, create subscription
    if (status === 'completed' && auto_upgrade && payment) {
      try {
        console.log('Creating user subscription for payment:', payment_id);

        // Check if subscription already exists
        const { data: existingSub } = await supabaseClient
          .from('user_subscriptions')
          .select('id')
          .eq('payment_id', payment_id)
          .single();

        if (!existingSub) {
          // Get current period using consistent calculation
          const currentDay = new Date().getDate();
          const currentPeriod = currentDay <= 10 ? 1 : currentDay <= 20 ? 2 : 3;

          // Get plan details to determine expiration based on duration_days
          const { data: planDetails } = await supabaseClient
            .from('subscription_plans')
            .select('duration_days')
            .eq('id', payment.plan_id)
            .single();

          const durationDays = planDetails?.duration_days || 30;

          // Create subscription with plan-specific expiry (30 days for Pro, 40 days for Advance)
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + durationDays);

          const { error: subError } = await supabaseClient
            .from('user_subscriptions')
            .insert({
              user_id: payment.user_id,
              plan_id: payment.plan_id,
              payment_id: payment.id,
              credits_remaining: payment.subscription_plans?.credits_per_period || 0,
              expires_at: expiresAt.toISOString(),
              current_period: currentPeriod,
              status: 'active'
            });

          if (subError) {
            console.error('Error creating subscription:', subError);
            subscriptionError = subError.message;
          } else {
            subscriptionCreated = true;
            console.log('Subscription created successfully for user:', payment.user_id);
          }
        } else {
          console.log('Subscription already exists for payment:', payment_id);
        }

        // Log successful payment processing
        await supabaseClient
          .from('logs')
          .insert({
            event_type: 'payment_verified',
            user_id: payment.user_id,
            details: {
              payment_id: payment.id,
              amount: payment.amount,
              plan: payment.subscription_plans?.name,
              upi_ref: upi_ref,
              auto_upgraded: subscriptionCreated
            }
          });

      } catch (error) {
        console.error('Error in subscription creation:', error);
        subscriptionError = error instanceof Error ? error.message : 'Unknown subscription error';
      }
    }

    const response: any = {
      success: true,
      message: 'Payment verification completed',
      payment_status: status,
      subscription_created: subscriptionCreated,
      payment_details: {
        id: payment.id,
        user_id: payment.user_id,
        amount: payment.amount,
        plan_name: payment.subscription_plans?.name,
        upi_ref: upi_ref
      }
    };

    if (subscriptionError) {
      response.subscription_error = subscriptionError;
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});