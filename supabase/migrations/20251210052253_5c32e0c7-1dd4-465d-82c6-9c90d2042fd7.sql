-- FIX 1: Create a secure view for public questions without user_id
CREATE OR REPLACE VIEW public.questions_safe AS
SELECT 
    id, 
    title, 
    body, 
    status, 
    language, 
    audience_level, 
    created_at, 
    updated_at
FROM public.questions 
WHERE status = 'published';

-- Grant access to the view
GRANT SELECT ON public.questions_safe TO anon, authenticated;

-- FIX 2: Add policy for edge functions to create subscriptions using service role
-- Edge functions run with service role which bypasses RLS, so this is secure

-- FIX 3: Add policy for edge functions to update user_usage
-- The verify-payment function needs to update user_usage after successful payment
-- Since edge functions use service role, they already have access

-- Add a comment explaining the security model
COMMENT ON TABLE public.payments IS 'Payment records - RLS restricts to user own records only. Edge functions use service role for verification.';
COMMENT ON TABLE public.user_subscriptions IS 'Subscription records - Admin only creation via edge functions using service role.';
COMMENT ON TABLE public.user_usage IS 'Usage tracking - Admin only management via edge functions using service role.';