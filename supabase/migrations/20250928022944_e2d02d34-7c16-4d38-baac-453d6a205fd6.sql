-- Fix the get_ai_answer function that's missing search_path

-- Check if function exists with old signature and drop it
DROP FUNCTION IF EXISTS public.get_ai_answer(text);

-- Create the function with proper search_path
CREATE OR REPLACE FUNCTION public.get_ai_answer(user_question text, requesting_user_id uuid DEFAULT NULL)
RETURNS TABLE(answer_text text, sources text[], confidence double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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