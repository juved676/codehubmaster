-- FIX 1: Payments table - Add explicit authentication check
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "Users can create their own payments" ON public.payments;
DROP POLICY IF EXISTS "Users can update their own payments" ON public.payments;

-- More secure policies with explicit auth checks
CREATE POLICY "Authenticated users view own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Authenticated users create own payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Authenticated users update own payments" 
ON public.payments 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- FIX 2: Clean up overlapping profile policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only see own profile" ON public.profiles;

-- Single consolidated policy for profiles
CREATE POLICY "Users manage own profile" 
ON public.profiles 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- FIX 3: user_subscriptions - Add explicit auth check on SELECT
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.user_subscriptions;

CREATE POLICY "Authenticated users view own subscriptions" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);