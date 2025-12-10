-- FIX: user_subscriptions - Replace overly permissive system policies with admin-only
DROP POLICY IF EXISTS "System can create subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "System can update subscriptions" ON public.user_subscriptions;

CREATE POLICY "Admins can create subscriptions" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update subscriptions" 
ON public.user_subscriptions 
FOR UPDATE 
USING (public.is_admin(auth.uid()));