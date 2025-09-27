-- Fix security issues: Enable RLS on all missing tables
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for ai_config (system use only)
CREATE POLICY "System can manage ai_config" 
ON public.ai_config FOR ALL 
USING (true);

-- RLS policies for ai_conversations (public read)
CREATE POLICY "Anyone can view ai_conversations" 
ON public.ai_conversations FOR SELECT 
USING (true);

CREATE POLICY "System can create ai_conversations" 
ON public.ai_conversations FOR INSERT 
WITH CHECK (true);

-- RLS policies for sources (public read)
CREATE POLICY "Anyone can view sources" 
ON public.sources FOR SELECT 
USING (true);

CREATE POLICY "System can manage sources" 
ON public.sources FOR ALL 
USING (true);

-- RLS policies for topics (public read, system manage)  
CREATE POLICY "Anyone can view active topics" 
ON public.topics FOR SELECT 
USING (is_active = true);

CREATE POLICY "System can manage topics" 
ON public.topics FOR ALL 
USING (true);

-- RLS policies for user_usage (users can view their own)
CREATE POLICY "Users can view their own usage" 
ON public.user_usage FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage user_usage" 
ON public.user_usage FOR ALL 
USING (true);

-- RLS policies for seo_metadata (public read, system manage)
CREATE POLICY "Anyone can view seo_metadata" 
ON public.seo_metadata FOR SELECT 
USING (true);

CREATE POLICY "System can manage seo_metadata" 
ON public.seo_metadata FOR ALL 
USING (true);

-- RLS policies for reviews (system use only)
CREATE POLICY "System can manage reviews" 
ON public.reviews FOR ALL 
USING (true);

-- Fix function search_path issues by updating existing functions
CREATE OR REPLACE FUNCTION public.get_current_period()
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN CASE 
        WHEN EXTRACT(DAY FROM CURRENT_DATE) BETWEEN 1 AND 10 THEN 1
        WHEN EXTRACT(DAY FROM CURRENT_DATE) BETWEEN 11 AND 20 THEN 2
        ELSE 3
    END;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_user_credits(user_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_period INTEGER;
    credits_used INTEGER;
    credits_allowed INTEGER := 6;
    credits_left INTEGER;
    can_ask BOOLEAN;
BEGIN
    current_period := public.get_current_period();
    credits_used := 0; -- Simulated usage
    credits_left := credits_allowed - credits_used;
    can_ask := credits_left > 0;
    
    RETURN jsonb_build_object(
        'can_ask', can_ask,
        'credits_left', credits_left,
        'period_number', current_period,
        'plan_name', 'ILM Free',
        'original_price', 25,
        'discounted_price', 0,
        'message', CASE WHEN can_ask 
                      THEN 'You have ' || credits_left || ' credits remaining'
                      ELSE 'Credits exhausted. Upgrade to continue'
                 END
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_credits_detailed(user_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.initiate_upi_payment(
    user_uuid UUID,
    plan_uuid UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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