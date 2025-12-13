-- Step 1: Drop the existing view
DROP VIEW IF EXISTS public.answers_public;

-- Step 2: Add public SELECT policy on answers table for published answers only
CREATE POLICY "Anyone can view published answers" 
ON public.answers 
FOR SELECT 
USING (published = true);

-- Step 3: Recreate view with security_invoker = true (uses caller's permissions)
CREATE VIEW public.answers_public 
WITH (security_invoker = true)
AS
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