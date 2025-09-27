-- First, just make user_id nullable 
ALTER TABLE public.questions ALTER COLUMN user_id DROP NOT NULL;