-- Update Code Advance (ILM Advance) price to 99 rupees
UPDATE subscription_plans
SET 
  discounted_price = 99,
  original_price = 4999,
  features = ARRAY[
    '999 coding questions per 40-day validity',
    'Python, Web Dev, Data Science & AI/ML help',
    'Advanced debugging & optimization tips',
    'Real-world project examples',
    'Code review & best practices',
    'Priority 24/7 expert support',
    'Access to premium coding tutorials',
    'Algorithm & data structure guidance',
    'Interview preparation assistance'
  ]
WHERE name = 'ILM Advance';

-- Update Code Pro features and validity
UPDATE subscription_plans
SET
  features = ARRAY[
    '50 coding questions per 30-day validity',
    'Python, Web Dev, Data Science help',
    'Code debugging assistance',
    'Step-by-step explanations',
    'Best coding practices',
    'Priority support',
    'Access to all coding topics',
    'Project implementation guidance'
  ]
WHERE name = 'Code Pro';

-- Update Code Free features for consistency
UPDATE subscription_plans
SET
  features = ARRAY[
    '6 coding questions every 10 days',
    'Basic Python & Web Dev help',
    'Standard AI-powered answers',
    'Community support',
    'Access to basic topics'
  ]
WHERE name = 'ILM Free';