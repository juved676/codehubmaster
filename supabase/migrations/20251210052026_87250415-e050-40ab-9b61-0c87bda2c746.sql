-- FIX 1: user_usage - Remove overly permissive system policy
DROP POLICY IF EXISTS "System can manage user_usage" ON public.user_usage;

-- Keep only admin management for user_usage
CREATE POLICY "Admins can manage user_usage" 
ON public.user_usage 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 2: topics - Replace system policy with admin-only
DROP POLICY IF EXISTS "System can manage topics" ON public.topics;

CREATE POLICY "Admins can manage topics" 
ON public.topics 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 3: sources - Replace system policy with admin-only
DROP POLICY IF EXISTS "System can manage sources" ON public.sources;

CREATE POLICY "Admins can manage sources" 
ON public.sources 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 4: seo_metadata - Replace system policy with admin-only
DROP POLICY IF EXISTS "System can manage seo_metadata" ON public.seo_metadata;

CREATE POLICY "Admins can manage seo_metadata" 
ON public.seo_metadata 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 5: answers - Replace open insert with admin-only
DROP POLICY IF EXISTS "System can create answers" ON public.answers;

CREATE POLICY "Admins can manage answers" 
ON public.answers 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 6: logs - Replace open insert with admin-only
DROP POLICY IF EXISTS "System can create logs" ON public.logs;

CREATE POLICY "Admins can create logs" 
ON public.logs 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()));

-- FIX 7: ai_conversations - Replace open insert with proper check
DROP POLICY IF EXISTS "System can create ai_conversations" ON public.ai_conversations;

CREATE POLICY "Authenticated users can create conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);