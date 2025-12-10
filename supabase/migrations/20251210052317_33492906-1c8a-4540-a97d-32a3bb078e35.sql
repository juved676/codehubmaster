-- Fix the security definer view issue by recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.questions_safe;

CREATE VIEW public.questions_safe 
WITH (security_invoker = true) AS
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

-- Also fix existing views if they have security definer issues
-- Recreate questions_public with security invoker
DROP VIEW IF EXISTS public.questions_public;

CREATE VIEW public.questions_public 
WITH (security_invoker = true) AS
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

GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Recreate subscription_plans_public with security invoker
DROP VIEW IF EXISTS public.subscription_plans_public;

CREATE VIEW public.subscription_plans_public 
WITH (security_invoker = true) AS
SELECT 
    id, 
    name, 
    discounted_price, 
    credits_per_period, 
    periods_per_month, 
    features, 
    is_popular
FROM public.subscription_plans 
WHERE is_active = true;

GRANT SELECT ON public.subscription_plans_public TO anon, authenticated;