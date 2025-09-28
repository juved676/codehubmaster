-- Fix user identity exposure in published questions
-- Create a secure view for published questions that doesn't expose user_id to anonymous users

CREATE OR REPLACE VIEW public.published_questions_secure AS
SELECT 
    id,
    title,
    body,
    language,
    audience_level,
    status,
    created_at,
    updated_at,
    -- Only show user_id to authenticated users, null for anonymous
    CASE 
        WHEN auth.uid() IS NOT NULL THEN user_id 
        ELSE NULL 
    END AS user_id
FROM public.questions 
WHERE status = 'published';

-- Grant select permissions on the view
GRANT SELECT ON public.published_questions_secure TO authenticated, anon;

-- Update RLS policy to be more restrictive about user_id exposure
DROP POLICY IF EXISTS "Anyone can view published questions" ON public.questions;

-- Create a more secure policy that doesn't expose user_id to anonymous users
CREATE POLICY "Published questions visible with privacy protection" 
ON public.questions 
FOR SELECT 
USING (
    status = 'published'::question_status 
    AND (
        auth.uid() IS NOT NULL 
        OR (auth.uid() IS NULL AND user_id IS NULL)
    )
);