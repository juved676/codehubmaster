-- Fix the last function search path security warning

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, preferred_language, study_level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'English'),
    COALESCE(NEW.raw_user_meta_data->>'study_level', 'School Level')
  );
  
  -- Log the new user signup
  INSERT INTO public.logs (event_type, details, user_id)
  VALUES ('user_signup', jsonb_build_object('user_id', NEW.id, 'email', NEW.email), NEW.id);
  
  RETURN NEW;
END;
$$;