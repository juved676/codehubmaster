-- Fix function search path security warnings by setting proper search_path

-- Update get_ai_answer function 
CREATE OR REPLACE FUNCTION public.get_ai_answer(user_question text, requesting_user_id uuid DEFAULT NULL)
RETURNS TABLE(answer_text text, sources text[], confidence double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update get_current_period function
CREATE OR REPLACE FUNCTION public.get_current_period()
RETURNS integer
LANGUAGE plpgsql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN CASE 
        WHEN EXTRACT(DAY FROM CURRENT_DATE) BETWEEN 1 AND 10 THEN 1
        WHEN EXTRACT(DAY FROM CURRENT_DATE) BETWEEN 11 AND 20 THEN 2
        ELSE 3
    END;
END;
$$;

-- Update manage_topic function
CREATE OR REPLACE FUNCTION public.manage_topic(
    action_type text, 
    topic_id uuid DEFAULT NULL::uuid, 
    topic_name text DEFAULT NULL::text, 
    topic_description text DEFAULT NULL::text, 
    topic_tags text[] DEFAULT NULL::text[], 
    topic_category text DEFAULT 'general'::text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF action_type = 'create' THEN
        INSERT INTO public.topics (name, description, tags, category)
        VALUES (topic_name, topic_description, topic_tags, topic_category);
        RETURN 'Topic created successfully';
        
    ELSIF action_type = 'update' AND topic_id IS NOT NULL THEN
        UPDATE public.topics SET 
            name = COALESCE(topic_name, name),
            description = COALESCE(topic_description, description),
            tags = COALESCE(topic_tags, tags),
            category = COALESCE(topic_category, category),
            updated_at = NOW()
        WHERE id = topic_id;
        RETURN 'Topic updated successfully';
        
    ELSIF action_type = 'delete' AND topic_id IS NOT NULL THEN
        UPDATE public.topics SET is_active = false WHERE id = topic_id;
        RETURN 'Topic deactivated successfully';
        
    ELSE
        RETURN 'Invalid action or missing parameters';
    END IF;
END;
$$;

-- Update update_seo_metadata function
CREATE OR REPLACE FUNCTION public.update_seo_metadata(
    page_url text, 
    page_title text, 
    page_description text, 
    page_keywords text[]
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.seo_metadata (page_url, title, description, keywords)
    VALUES (page_url, page_title, page_description, page_keywords)
    ON CONFLICT (page_url) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        keywords = EXCLUDED.keywords,
        updated_at = NOW();
    
    RETURN 'SEO metadata updated successfully for: ' || page_url;
END;
$$;