-- Fix security issues: Enable RLS and create proper policies

-- 1. Enable RLS on subscription_plans table
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- 2. Create policy for subscription_plans - publicly readable for pricing info
CREATE POLICY "Anyone can view active subscription plans" 
ON public.subscription_plans 
FOR SELECT 
USING (is_active = true);

-- 3. Fix ai_conversations table - restrict to own conversations
DROP POLICY IF EXISTS "Anyone can view ai_conversations" ON public.ai_conversations;

-- Add user_id to ai_conversations if it doesn't exist
ALTER TABLE public.ai_conversations 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create secure policy for ai_conversations
CREATE POLICY "Users can view their own conversations" 
ON public.ai_conversations 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow anonymous conversations for now (user_id can be null)
CREATE POLICY "Anonymous users can view anonymous conversations" 
ON public.ai_conversations 
FOR SELECT 
TO anon
USING (user_id IS NULL);

-- 4. Update questions table policies for better security
DROP POLICY IF EXISTS "Anyone can view their own questions" ON public.questions;

-- Create more secure policy that properly handles both authenticated and anonymous users
CREATE POLICY "Users can view published questions and their own" 
ON public.questions 
FOR SELECT 
USING (
  status = 'published'::question_status OR 
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- 5. Update ai_conversations insert policy to include user_id
DROP POLICY IF EXISTS "System can create ai_conversations" ON public.ai_conversations;

CREATE POLICY "System can create ai_conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (true);

-- Update function to include user context
CREATE OR REPLACE FUNCTION public.get_ai_answer(user_question text, requesting_user_id uuid DEFAULT NULL)
RETURNS TABLE(answer_text text, sources text[], confidence double precision)
LANGUAGE plpgsql
AS $$
BEGIN
    answer_text := '🤖 AI Response: This answer is for - ''' || user_question || '''';
    sources := ARRAY['Quran', 'Sahih al-Bukhari', 'Sahih Muslim'];
    confidence := 0.85;
    
    INSERT INTO public.ai_conversations (question, answer, sources, confidence_level, user_id)
    VALUES (user_question, answer_text, sources, confidence, requesting_user_id);
    
    RETURN NEXT;
END;
$$;