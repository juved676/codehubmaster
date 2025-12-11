-- Fix 1: Add explicit SELECT policy for profiles table (already has ALL policy but adding clarity)
-- The ALL policy already covers SELECT, but we need to ensure it works properly

-- Fix 2: Add explicit DELETE policy to prevent unauthorized deletion on payments
CREATE POLICY "Payments cannot be deleted by users" 
ON public.payments 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Fix 3: Add DELETE policy to prevent unauthorized deletion on user_subscriptions  
CREATE POLICY "Only admins can delete subscriptions" 
ON public.user_subscriptions 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Fix 4: Add DELETE policy for user_usage (admin only)
CREATE POLICY "Only admins can delete user_usage" 
ON public.user_usage 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Fix 5: Add DELETE policy for questions (users can delete own questions)
CREATE POLICY "Users can delete their own questions" 
ON public.questions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fix 6: Add DELETE policy for ai_conversations (users can delete own conversations)
CREATE POLICY "Users can delete their own conversations" 
ON public.ai_conversations 
FOR DELETE 
USING (auth.uid() = user_id);