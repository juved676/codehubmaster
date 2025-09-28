-- Fix remaining function search path security warnings

-- Update ask_question_with_credits function
CREATE OR REPLACE FUNCTION public.ask_question_with_credits(user_uuid uuid, question_text text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    credit_info JSONB;
BEGIN
    credit_info := public.check_user_credits(user_uuid);
    
    IF NOT (credit_info->>'can_ask')::BOOLEAN THEN
        RETURN jsonb_build_object(
            'success', false,
            'answer_text', '',
            'message', credit_info->>'message',
            'credits_left', (credit_info->>'credits_left')::INTEGER
        );
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'answer_text', '🤖 AI Answer: ' || question_text,
        'message', 'Question answered successfully!',
        'credits_left', (credit_info->>'credits_left')::INTEGER - 1
    );
END;
$$;

-- Update check_user_credits function
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

-- Update get_user_credits_detailed function
CREATE OR REPLACE FUNCTION public.get_user_credits_detailed(user_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_period_value INTEGER;
    user_sub RECORD;
    free_credits_used INTEGER := 0;
    free_credits_limit INTEGER := 6;
    result JSONB;
BEGIN
    current_period_value := public.get_current_period();
    
    -- Check for active subscription
    SELECT us.*, sp.name as plan_name, sp.original_price, sp.discounted_price, sp.credits_per_period
    INTO user_sub
    FROM public.user_subscriptions us
    JOIN public.subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = user_uuid 
    AND us.status = 'active' 
    AND us.expires_at > now()
    AND us.current_period = current_period_value
    ORDER BY us.created_at DESC
    LIMIT 1;
    
    IF user_sub IS NOT NULL THEN
        -- User has active subscription
        result := jsonb_build_object(
            'can_ask', user_sub.credits_remaining > 0,
            'credits_left', user_sub.credits_remaining,
            'period_number', current_period_value,
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
            'period_number', current_period_value,
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

-- Update initiate_upi_payment function
CREATE OR REPLACE FUNCTION public.initiate_upi_payment(user_uuid uuid, plan_uuid uuid)
RETURNS jsonb
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