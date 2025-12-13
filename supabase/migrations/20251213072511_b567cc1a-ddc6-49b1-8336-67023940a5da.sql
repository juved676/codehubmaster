-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can view active subscription plans" ON public.subscription_plans;

-- Add new policy allowing anyone to view active subscription plans
CREATE POLICY "Anyone can view active subscription plans" 
ON public.subscription_plans 
FOR SELECT 
USING (is_active = true);