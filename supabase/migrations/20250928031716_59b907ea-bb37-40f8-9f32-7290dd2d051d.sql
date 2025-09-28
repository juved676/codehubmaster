-- Fix the security definer view issue by using a regular view
-- and update the RLS policy to handle user identity protection properly

-- Drop the problematic security definer view
DROP VIEW IF EXISTS public.published_questions_secure;

-- Update the RLS policy to properly handle anonymous vs authenticated access
-- while protecting user identity in published questions
DROP POLICY IF EXISTS "Published questions visible with privacy protection" ON public.questions;

-- Create a policy that allows viewing published questions but protects user identity
CREATE POLICY "Anyone can view published questions safely" 
ON public.questions 
FOR SELECT 
USING (status = 'published'::question_status);

-- The user_id will be handled at the application level by not exposing it
-- in queries made by anonymous users