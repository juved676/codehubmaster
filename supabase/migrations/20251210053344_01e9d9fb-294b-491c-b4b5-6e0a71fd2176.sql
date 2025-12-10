-- Fix plan naming for consistent CodeHubMaster branding
UPDATE subscription_plans SET name = 'Code Free', credits_per_period = 5 WHERE name = 'ILM Free';
UPDATE subscription_plans SET name = 'Code Advance' WHERE name = 'ILM Advance';