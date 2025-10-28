-- Update subscription plans pricing
UPDATE subscription_plans 
SET discounted_price = 49 
WHERE name = 'Code Pro';

UPDATE subscription_plans 
SET discounted_price = 99 
WHERE name = 'Code Advance';

-- Create admin whitelist function to restrict access to specific emails
CREATE OR REPLACE FUNCTION public.is_admin_email(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_email IN ('saifiumar51@gmail.com', 'kmdsohail392@gmail.com')
$$;

-- Add comment explaining the admin whitelist
COMMENT ON FUNCTION public.is_admin_email(text) IS 'Checks if the provided email is in the admin whitelist (saifiumar51@gmail.com, kmdsohail392@gmail.com)';
