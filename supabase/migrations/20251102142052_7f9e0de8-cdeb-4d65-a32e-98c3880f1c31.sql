-- Update subscription system to handle expiration and re-purchase better

-- Add index for faster queries on expired subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_expires_at ON public.user_subscriptions(user_id, expires_at, status);

-- Create a function to automatically mark expired subscriptions as expired
CREATE OR REPLACE FUNCTION public.mark_expired_subscriptions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    UPDATE public.user_subscriptions
    SET status = 'expired'
    WHERE status = 'active' 
    AND expires_at < now();
END;
$$;

-- Add a function to check if user can purchase (always returns true now for re-purchase)
CREATE OR REPLACE FUNCTION public.can_user_purchase(user_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Users can always purchase, even if they have an active subscription
    -- This allows upgrades and renewals
    RETURN true;
END;
$$;

-- Update the initiate_upi_payment to mark old subscriptions as expired before creating new payment
CREATE OR REPLACE FUNCTION public.initiate_upi_payment(user_uuid uuid, plan_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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