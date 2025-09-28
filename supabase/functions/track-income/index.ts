import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IncomeReport {
  total_revenue: number;
  today_revenue: number;
  this_month_revenue: number;
  completed_payments: number;
  pending_payments: number;
  failed_payments: number;
  ilm_pro_sales: number;
  ilm_advance_sales: number;
  success_rate: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting income tracking and analytics update...');

    // Get all payment data with plan information
    const { data: paymentsData, error: paymentsError } = await supabaseClient
      .from('payments')
      .select(`
        amount,
        payment_status,
        created_at,
        plan_id,
        subscription_plans(name)
      `);

    if (paymentsError) {
      console.error('Error fetching payments data:', paymentsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch payments data' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Calculate comprehensive statistics
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = (paymentsData || []).reduce((acc, payment) => {
      const paymentDate = new Date(payment.created_at);
      const paymentAmount = Number(payment.amount);
      
      if (payment.payment_status === 'completed') {
        acc.total_revenue += paymentAmount;
        acc.completed_payments += 1;

        // Today's revenue
        if (paymentDate >= today) {
          acc.today_revenue += paymentAmount;
        }

        // This month's revenue
        if (paymentDate >= thisMonth) {
          acc.this_month_revenue += paymentAmount;
        }

        // Plan-wise sales tracking
        const planName = payment.subscription_plans?.[0]?.name || 'Unknown';
        if (planName === 'ILM PRO') {
          acc.ilm_pro_sales += 1;
        } else if (planName === 'ILM ADVANCE') {
          acc.ilm_advance_sales += 1;
        }
      } else if (payment.payment_status === 'pending') {
        acc.pending_payments += 1;
      } else if (payment.payment_status === 'failed') {
        acc.failed_payments += 1;
      }
      
      return acc;
    }, {
      total_revenue: 0,
      today_revenue: 0,
      this_month_revenue: 0,
      completed_payments: 0,
      pending_payments: 0,
      failed_payments: 0,
      ilm_pro_sales: 0,
      ilm_advance_sales: 0
    });

    // Calculate success rate
    const totalAttempts = stats.completed_payments + stats.failed_payments + stats.pending_payments;
    const successRate = totalAttempts > 0 ? (stats.completed_payments / totalAttempts) * 100 : 0;

    const report: IncomeReport = {
      ...stats,
      success_rate: Math.round(successRate * 100) / 100 // Round to 2 decimal places
    };

    // Log the income report for tracking
    await supabaseClient
      .from('logs')
      .insert({
        event_type: 'income_tracking',
        details: {
          report,
          timestamp: new Date().toISOString(),
          automated: true
        }
      });

    console.log('Income tracking completed:', report);

    // Real-time analytics - get last 30 days breakdown
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentPayments } = await supabaseClient
      .from('payments')
      .select('amount, payment_status, created_at')
      .eq('payment_status', 'completed')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Group by day for analytics
    const dailyStats = (recentPayments || []).reduce((acc: Record<string, { revenue: number; sales: number }>, payment) => {
      const date = new Date(payment.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { revenue: 0, sales: 0 };
      }
      acc[date].revenue += Number(payment.amount);
      acc[date].sales += 1;
      return acc;
    }, {});

    const dailyBreakdown = Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      revenue: stats.revenue,
      sales: stats.sales
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate growth metrics
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const { data: lastMonthPayments } = await supabaseClient
      .from('payments')
      .select('amount')
      .eq('payment_status', 'completed')
      .gte('created_at', lastMonth.toISOString())
      .lte('created_at', lastMonthEnd.toISOString());

    const lastMonthRevenue = (lastMonthPayments || []).reduce((sum, payment) => sum + Number(payment.amount), 0);
    const growthRate = lastMonthRevenue > 0 ? ((stats.this_month_revenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    const response = {
      success: true,
      message: 'Income tracking completed successfully',
      report,
      analytics: {
        daily_breakdown: dailyBreakdown,
        growth_metrics: {
          current_month: stats.this_month_revenue,
          last_month: lastMonthRevenue,
          growth_rate: Math.round(growthRate * 100) / 100
        },
        fampay_integration: {
          upi_id: "9625852028@fam",
          status: "active",
          auto_verification: true
        }
      },
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in track-income function:', error);
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