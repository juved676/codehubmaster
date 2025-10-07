-- Fix: User Identity Could Be Exposed Through Question History
-- Remove user_id from the public questions view to protect user identity
DROP VIEW IF EXISTS public.questions_public CASCADE;

CREATE VIEW public.questions_public
WITH (security_invoker = true)
AS
SELECT 
  id,
  title,
  body,
  status,
  audience_level,
  language,
  created_at,
  updated_at
  -- Deliberately excluding user_id to protect user identity
FROM public.questions
WHERE status = 'published';

GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Fix: System Logs Could Expose User Activity Patterns
-- Add admin-only SELECT policy for logs table
DROP POLICY IF EXISTS "Only admins can view logs" ON public.logs;

CREATE POLICY "Only admins can view logs"
ON public.logs
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Keep the existing system insert policy
-- System can create logs policy already exists