-- Update plan prices
UPDATE subscription_plans 
SET discounted_price = 2, original_price = 15
WHERE name = 'Code Pro';

UPDATE subscription_plans 
SET discounted_price = 5, original_price = 30
WHERE name = 'ILM Advance';