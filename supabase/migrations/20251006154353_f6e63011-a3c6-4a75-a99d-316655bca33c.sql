-- Fix 1: Enable RLS on secure_audit_logs and add admin-only policies
ALTER TABLE public.secure_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.secure_audit_logs
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert audit logs"
ON public.secure_audit_logs
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Fix 2: Create a public view for questions that hides user_id
CREATE OR REPLACE VIEW public.questions_public AS
SELECT 
  id,
  title,
  body,
  status,
  audience_level,
  language,
  created_at,
  updated_at
FROM public.questions
WHERE status = 'published';

-- Grant access to the view
GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Fix 3: Create a restricted view for subscription_plans (only active, customer-facing info)
CREATE OR REPLACE VIEW public.subscription_plans_public AS
SELECT 
  id,
  name,
  discounted_price,
  features,
  is_popular,
  credits_per_period,
  periods_per_month
FROM public.subscription_plans
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.subscription_plans_public TO anon, authenticated;

-- Fix 4: Update functions missing search_path parameter
CREATE OR REPLACE FUNCTION public.update_user_credits(user_id uuid, credits_to_use integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    remaining_credits INT;
BEGIN
    UPDATE users 
    SET credits = credits - credits_to_use,
        updated_at = NOW()
    WHERE id = user_id 
      AND credits >= credits_to_use
    RETURNING credits INTO remaining_credits;
    
    IF remaining_credits IS NULL THEN
        RAISE EXCEPTION 'Insufficient credits or user not found';
    END IF;
    
    RETURN remaining_credits;
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_user_input(input_text text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    IF LENGTH(input_text) > 1000 THEN
        RETURN FALSE;
    END IF;
    
    IF input_text !~ '^[a-zA-Z0-9\s.,!?@#$%^&*()_+-=]*$' THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_user_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.user_id = auth.uid();
    RETURN NEW;
END;
$function$;