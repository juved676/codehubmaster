-- Update free credits limit from 6 to 5
-- This gives users 5 credits per 10-day period (15 credits total per month, like Lovable)

CREATE OR REPLACE FUNCTION public.get_user_credits_detailed(user_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    current_period_value INTEGER;
    user_sub RECORD;
    free_credits_used INTEGER := 0;
    free_credits_limit INTEGER := 5;  -- Changed from 6 to 5
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
        -- Free user - check actual usage from user_usage table
        SELECT COALESCE(credits_used_current_period, 0) INTO free_credits_used
        FROM public.user_usage
        WHERE user_id = user_uuid
        AND current_period_number = current_period_value
        LIMIT 1;
        
        IF free_credits_used IS NULL THEN
            free_credits_used := 0;
        END IF;
        
        result := jsonb_build_object(
            'can_ask', (free_credits_limit - free_credits_used) > 0,
            'credits_left', free_credits_limit - free_credits_used,
            'period_number', current_period_value,
            'plan_name', 'Code Free',
            'original_price', 25,
            'discounted_price', 0,
            'is_premium', false,
            'message', CASE 
                WHEN (free_credits_limit - free_credits_used) > 0 
                THEN 'You have ' || (free_credits_limit - free_credits_used) || ' free credits remaining'
                ELSE 'Free credits exhausted. Upgrade to continue learning coding!'
            END
        );
    END IF;
    
    RETURN result;
END;
$$;