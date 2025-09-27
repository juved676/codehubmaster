-- Update RLS policies to allow anonymous access
DROP POLICY IF EXISTS "Users can create questions" ON public.questions;
DROP POLICY IF EXISTS "Users can view their own questions" ON public.questions;
DROP POLICY IF EXISTS "Users can update their own questions" ON public.questions;

-- Create new policies for open access
CREATE POLICY "Anyone can create questions" 
ON public.questions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their own questions" 
ON public.questions 
FOR SELECT 
USING (
  CASE 
    WHEN auth.uid() IS NOT NULL AND user_id IS NOT NULL 
    THEN auth.uid() = user_id 
    ELSE true  -- Allow anonymous questions to be viewable
  END
);