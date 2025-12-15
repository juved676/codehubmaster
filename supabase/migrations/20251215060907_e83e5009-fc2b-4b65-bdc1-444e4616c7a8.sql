
-- FIX 1: Restrict published answers to only show non-sensitive fields via the existing view
-- The answers_public view already filters columns, but we need to ensure RLS on base table is secure
-- Drop the overly permissive policy and replace with authenticated-only access for full answers
DROP POLICY IF EXISTS "Anyone can view published answers" ON public.answers;

-- Create a more restrictive policy - only authenticated users can view published answers
CREATE POLICY "Authenticated users can view published answers" 
ON public.answers 
FOR SELECT 
USING ((auth.uid() IS NOT NULL) AND (published = true));

-- FIX 2: Remove the ability for users to UPDATE their own payments (potential fraud risk)
-- Payments should only be created by users and updated by the verify-payment edge function (service role)
DROP POLICY IF EXISTS "Authenticated users update own payments" ON public.payments;

-- Create a restrictive update policy - only admins can update payments
CREATE POLICY "Only admins can update payments" 
ON public.payments 
FOR UPDATE 
USING (is_admin(auth.uid()));

-- FIX 3: Ensure user_subscriptions cannot be manipulated
-- Add WITH CHECK to prevent users from creating subscriptions for themselves
-- (This should only happen via edge functions with service role)

-- Also add a policy to prevent users from updating subscription credits
DROP POLICY IF EXISTS "Admins can update subscriptions" ON public.user_subscriptions;

CREATE POLICY "Only admins can update subscriptions" 
ON public.user_subscriptions 
FOR UPDATE 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- FIX 4: Add index for faster RLS policy checks
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_answers_published ON public.answers(published);
