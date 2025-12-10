-- Remove the problematic policies that expose user conversations
DROP POLICY IF EXISTS "Anonymous users can view anonymous conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.ai_conversations;

-- Create a secure policy that only allows authenticated users to view their own conversations
CREATE POLICY "Users can view only their own conversations" 
ON public.ai_conversations 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);