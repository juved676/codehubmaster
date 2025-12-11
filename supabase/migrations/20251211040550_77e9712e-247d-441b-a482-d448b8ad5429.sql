-- Fix 1: Restrict 'sources' table to authenticated users only
DROP POLICY IF EXISTS "Anyone can view sources" ON public.sources;

CREATE POLICY "Authenticated users can view sources" 
ON public.sources 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Fix 2: Restrict 'subscription_plans' table - drop overly permissive policy
DROP POLICY IF EXISTS "Anyone can view active subscription plans" ON public.subscription_plans;

-- Allow only authenticated users to view subscription plans
CREATE POLICY "Authenticated users can view active subscription plans" 
ON public.subscription_plans 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_active = true);

-- Also allow admins full access
CREATE POLICY "Admins can manage subscription plans" 
ON public.subscription_plans 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));