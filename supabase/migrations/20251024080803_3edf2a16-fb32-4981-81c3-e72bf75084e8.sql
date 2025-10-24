-- Enable RLS on questions table (if not already enabled)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own questions
CREATE POLICY "Users can insert their own questions"
ON public.questions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous users to insert questions (user_id will be null)
CREATE POLICY "Anonymous users can insert questions"
ON public.questions
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Allow users to view their own questions
CREATE POLICY "Users can view their own questions"
ON public.questions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous users to view their questions (if we track by session)
CREATE POLICY "Anyone can view published questions"
ON public.questions
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Allow users to update their own questions
CREATE POLICY "Users can update their own questions"
ON public.questions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);