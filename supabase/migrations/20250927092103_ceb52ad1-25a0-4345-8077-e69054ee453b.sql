-- Create payments table for tracking all payment attempts (if not exists)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  upi_transaction_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed, expired
  payment_method TEXT NOT NULL DEFAULT 'upi',
  upi_ref TEXT, -- User provided transaction reference
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '15 minutes')
);

-- Create user subscriptions table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, expired, canceled
  credits_remaining INTEGER NOT NULL DEFAULT 0,
  current_period INTEGER NOT NULL DEFAULT 1,
  period_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update subscription plans with sale pricing
UPDATE public.subscription_plans SET 
  original_price = 25, 
  discounted_price = 5,
  features = ARRAY[
    'AI-powered Islamic Q&A',
    '15 questions per 10-day period',
    'Priority response within 2 hours',
    'Access to premium Islamic content',
    'Quran & Hadith references',
    'Multiple language support',
    'Email support'
  ],
  is_popular = true
WHERE name = 'ILM PRO';

UPDATE public.subscription_plans SET 
  original_price = 50, 
  discounted_price = 8,
  features = ARRAY[
    'Everything in ILM PRO',
    '50 questions per 10-day period',
    'Instant AI responses',
    'Advanced Islamic scholarship access',
    'Private consultation requests',
    'Custom research assistance',
    'Download conversation history',
    'Priority customer support',
    'Early access to new features'
  ],
  is_popular = false
WHERE name = 'ILM ADVANCE';

-- Enable RLS on new tables
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" 
ON public.payments FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" 
ON public.payments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" 
ON public.payments FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.user_subscriptions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create subscriptions" 
ON public.user_subscriptions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update subscriptions" 
ON public.user_subscriptions FOR UPDATE 
USING (true);

-- Create function to get user's current subscription and credits
CREATE OR REPLACE FUNCTION public.get_user_credits_detailed(user_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    current_period INTEGER;
    user_sub RECORD;
    free_credits_used INTEGER := 0;
    free_credits_limit INTEGER := 6;
    result JSONB;
BEGIN
    current_period := public.get_current_period();
    
    -- Check for active subscription
    SELECT us.*, sp.name as plan_name, sp.original_price, sp.discounted_price, sp.credits_per_period
    INTO user_sub
    FROM public.user_subscriptions us
    JOIN public.subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = user_uuid 
    AND us.status = 'active' 
    AND us.expires_at > now()
    AND us.current_period = current_period
    ORDER BY us.created_at DESC
    LIMIT 1;
    
    IF user_sub IS NOT NULL THEN
        -- User has active subscription
        result := jsonb_build_object(
            'can_ask', user_sub.credits_remaining > 0,
            'credits_left', user_sub.credits_remaining,
            'period_number', current_period,
            'plan_name', user_sub.plan_name,
            'original_price', user_sub.original_price,
            'discounted_price', user_sub.discounted_price,
            'is_premium', true,
            'subscription_expires', user_sub.expires_at,
            'message', CASE 
                WHEN user_sub.credits_remaining > 0 
                THEN 'You have ' || user_sub.credits_remaining || ' premium credits remaining'
                ELSE 'Premium credits exhausted. They will reset in the next period.'
            END
        );
    ELSE
        -- Free user - use existing free credit logic
        result := jsonb_build_object(
            'can_ask', (free_credits_limit - free_credits_used) > 0,
            'credits_left', free_credits_limit - free_credits_used,
            'period_number', current_period,
            'plan_name', 'ILM Free',
            'original_price', 25,
            'discounted_price', 0,
            'is_premium', false,
            'message', CASE 
                WHEN (free_credits_limit - free_credits_used) > 0 
                THEN 'You have ' || (free_credits_limit - free_credits_used) || ' free credits remaining'
                ELSE 'Free credits exhausted. Upgrade to continue asking questions!'
            END
        );
    END IF;
    
    RETURN result;
END;
$$;

-- Create function to initiate UPI payment
CREATE OR REPLACE FUNCTION public.initiate_upi_payment(
    user_uuid UUID,
    plan_uuid UUID
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    plan_record RECORD;
    payment_id UUID;
    result JSONB;
BEGIN
    -- Get plan details
    SELECT * INTO plan_record 
    FROM public.subscription_plans 
    WHERE id = plan_uuid AND is_active = true;
    
    IF plan_record IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'message', 'Invalid or inactive plan selected'
        );
    END IF;
    
    -- Create payment record
    INSERT INTO public.payments (user_id, plan_id, amount, payment_status)
    VALUES (user_uuid, plan_uuid, plan_record.discounted_price, 'pending')
    RETURNING id INTO payment_id;
    
    result := jsonb_build_object(
        'success', true,
        'payment_id', payment_id,
        'plan_name', plan_record.name,
        'amount', plan_record.discounted_price,
        'original_price', plan_record.original_price,
        'message', 'Payment initiated successfully'
    );
    
    RETURN result;
END;
$$;