-- Add duration_days column to subscription_plans table to properly track plan validity
ALTER TABLE public.subscription_plans
ADD COLUMN IF NOT EXISTS duration_days INTEGER DEFAULT 30;

-- Update existing plans with correct durations
-- Code Pro: 30 days (3 periods of 10 days)
-- Code Advance: 40 days (4 periods of 10 days)
UPDATE public.subscription_plans
SET duration_days = 30
WHERE name = 'Code Pro' OR name = 'ILM Pro';

UPDATE public.subscription_plans
SET duration_days = 40
WHERE name = 'Code Advance' OR name = 'ILM Advance';