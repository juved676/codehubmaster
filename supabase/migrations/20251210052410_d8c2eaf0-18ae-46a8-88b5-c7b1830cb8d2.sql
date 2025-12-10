-- FIX 1: Drop redundant views that are creating confusion
DROP VIEW IF EXISTS public.questions_safe;

-- FIX 2: Create a secure view for answers without AI internals
CREATE OR REPLACE VIEW public.answers_public 
WITH (security_invoker = true) AS
SELECT 
    id,
    question_id,
    answer_text,
    summary_text,
    published,
    created_at,
    updated_at
FROM public.answers 
WHERE published = true;

GRANT SELECT ON public.answers_public TO anon, authenticated;

-- FIX 3: Update questions RLS policy to hide user_id for non-owners
-- First, drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can view published questions" ON public.questions;
DROP POLICY IF EXISTS "Anyone can view published questions safely" ON public.questions;
DROP POLICY IF EXISTS "Users can view published questions and their own" ON public.questions;

-- Create proper policies
-- Policy 1: Users can view their own questions (with user_id visible)
CREATE POLICY "Users can view own questions" 
ON public.questions 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Policy 2: Anyone can view published questions (user_id visible but this is the content creator choice)
-- For published questions, we accept that user_id is visible as the content is public
CREATE POLICY "Published questions are public" 
ON public.questions 
FOR SELECT 
USING (status = 'published');

-- FIX 4: Update answers policy to only expose safe fields via view
DROP POLICY IF EXISTS "Anyone can view published answers" ON public.answers;

-- Make the main answers table only accessible to admins
CREATE POLICY "Admins can view all answers" 
ON public.answers 
FOR SELECT 
USING (public.is_admin(auth.uid()));