-- FIX 1: user_usage table - block anonymous access
DROP POLICY IF EXISTS "Users can view their own usage" ON public.user_usage;

CREATE POLICY "Users can view only their own usage" 
ON public.user_usage 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- FIX 2: reviews table - restrict to reviewers and admins only
DROP POLICY IF EXISTS "System can manage reviews" ON public.reviews;

CREATE POLICY "Reviewers can view their own reviews" 
ON public.reviews 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = reviewer_id);

CREATE POLICY "Admins can view all reviews" 
ON public.reviews 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage reviews" 
ON public.reviews 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));