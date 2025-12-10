-- The issue is that views cannot have RLS directly - they inherit from base tables
-- For maximum security, we'll restrict the base questions table and use edge functions for public access

-- FIX 1: Remove the public access policy from questions table
-- Only authenticated users who own the question can see their full data
DROP POLICY IF EXISTS "Published questions are public" ON public.questions;
DROP POLICY IF EXISTS "Users can view own questions" ON public.questions;
DROP POLICY IF EXISTS "Users can view their own questions" ON public.questions;
DROP POLICY IF EXISTS "Users can only see own questions" ON public.questions;

-- Authenticated users can view their own questions
CREATE POLICY "Users view own questions" 
ON public.questions 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Authenticated users can insert/update their own questions
CREATE POLICY "Users insert own questions" 
ON public.questions 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users update own questions" 
ON public.questions 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Admins can view all questions
CREATE POLICY "Admins view all questions" 
ON public.questions 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- For public access to published questions (without user_id), use the questions_public view
-- which only exposes non-sensitive fields

-- Create a function that allows anonymous access to published questions via the view
CREATE OR REPLACE FUNCTION public.get_published_questions()
RETURNS TABLE (
    id uuid,
    title text,
    body text,
    status question_status,
    language language_type,
    audience_level audience_level,
    created_at timestamptz,
    updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT id, title, body, status, language, audience_level, created_at, updated_at
    FROM questions
    WHERE status = 'published';
$$;