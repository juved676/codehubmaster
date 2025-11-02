-- Fix 1: Update initiate_upi_payment to reject free plan payments and increase expiry time
CREATE OR REPLACE FUNCTION public.initiate_upi_payment(user_uuid uuid, plan_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    plan_record RECORD;
    payment_id UUID;
    result JSONB;
BEGIN
    -- Mark any expired subscriptions as expired
    UPDATE public.user_subscriptions
    SET status = 'expired'
    WHERE user_id = user_uuid 
    AND status = 'active' 
    AND expires_at < now();
    
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
    
    -- Reject free plans (amount = 0)
    IF plan_record.discounted_price <= 0 THEN
        RETURN jsonb_build_object(
            'success', false,
            'message', 'Free plan does not require payment. You already have access!'
        );
    END IF;
    
    -- Mark old pending payments for this user as expired
    UPDATE public.payments
    SET payment_status = 'expired'
    WHERE user_id = user_uuid 
    AND payment_status = 'pending'
    AND expires_at < now();
    
    -- Create payment record with 24 hour expiry
    INSERT INTO public.payments (user_id, plan_id, amount, payment_status, expires_at)
    VALUES (user_uuid, plan_uuid, plan_record.discounted_price, 'pending', now() + interval '24 hours')
    RETURNING id INTO payment_id;
    
    result := jsonb_build_object(
        'success', true,
        'payment_id', payment_id,
        'plan_name', plan_record.name,
        'amount', plan_record.discounted_price,
        'original_price', plan_record.original_price,
        'expires_in_hours', 24,
        'message', 'Payment initiated successfully. Complete payment within 24 hours.'
    );
    
    RETURN result;
END;
$function$;

-- Fix 2: Clean up all old expired pending payments
UPDATE public.payments
SET payment_status = 'expired'
WHERE payment_status = 'pending'
AND expires_at < now();

-- Fix 3: Create a scheduled job function to auto-cleanup expired payments
CREATE OR REPLACE FUNCTION public.cleanup_expired_payments()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    -- Mark expired pending payments as expired
    UPDATE public.payments
    SET payment_status = 'expired', updated_at = now()
    WHERE payment_status = 'pending'
    AND expires_at < now();
END;
$function$;