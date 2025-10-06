-- Fix the Security Definer View issues by recreating views with SECURITY INVOKER
DROP VIEW IF EXISTS public.questions_public;
DROP VIEW IF EXISTS public.subscription_plans_public;

-- Recreate questions view with SECURITY INVOKER
CREATE VIEW public.questions_public
WITH (security_invoker = true)
AS
SELECT 
  id,
  title,
  body,
  status,
  audience_level,
  language,
  created_at,
  updated_at
FROM public.questions
WHERE status = 'published';

-- Grant access to the view
GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Recreate subscription_plans view with SECURITY INVOKER
CREATE VIEW public.subscription_plans_public
WITH (security_invoker = true)
AS
SELECT 
  id,
  name,
  discounted_price,
  features,
  is_popular,
  credits_per_period,
  periods_per_month
FROM public.subscription_plans
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.subscription_plans_public TO anon, authenticated;