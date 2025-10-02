-- Update subscription plans for coding education platform
UPDATE public.subscription_plans
SET 
  name = 'Code Pro',
  original_price = 25,
  discounted_price = 5,
  features = ARRAY[
    '50 AI coding questions per period',
    'Python, Web Dev, Data Science help',
    'Code debugging assistance',
    'Priority support',
    'Access to all coding topics'
  ]
WHERE name = 'ILM Pro';

UPDATE public.subscription_plans
SET 
  name = 'Code Advanced',
  original_price = 50,
  discounted_price = 8,
  features = ARRAY[
    '200 AI coding questions per period',
    'Advanced AI/ML concepts',
    'Real-time code review',
    'Project guidance',
    'Interview preparation',
    'Premium coding resources'
  ]
WHERE name = 'ILM Advanced';

-- Update topics to coding topics
DELETE FROM public.topics WHERE is_active = true;

INSERT INTO public.topics (name, description, tags, category, display_order, is_active) VALUES
('Python Basics', 'Learn Python fundamentals, syntax, and core concepts', ARRAY['python', 'beginner', 'programming'], 'programming', 1, true),
('Web Development', 'HTML, CSS, JavaScript, React, and modern web technologies', ARRAY['web', 'frontend', 'backend'], 'programming', 2, true),
('Data Science', 'Data analysis, visualization, pandas, numpy', ARRAY['data', 'analytics', 'python'], 'data-science', 3, true),
('Machine Learning', 'ML algorithms, scikit-learn, model training', ARRAY['ml', 'ai', 'algorithms'], 'ai-ml', 4, true),
('Algorithms & DSA', 'Data structures, algorithms, problem solving', ARRAY['algorithms', 'dsa', 'leetcode'], 'computer-science', 5, true),
('Database & SQL', 'Database design, SQL queries, optimization', ARRAY['database', 'sql', 'backend'], 'backend', 6, true),
('APIs & Backend', 'REST APIs, Node.js, Express, FastAPI', ARRAY['api', 'backend', 'server'], 'backend', 7, true),
('DevOps Basics', 'Git, Docker, deployment, CI/CD', ARRAY['devops', 'deployment', 'tools'], 'devops', 8, true);

-- Update sources to programming resources
DELETE FROM public.sources;

INSERT INTO public.sources (title, type, citation, contributor, trust_level, text_snippet) VALUES
('Python Official Documentation', 'documentation', 'Python Software Foundation', 'Python.org', 'high', 'Official Python documentation and tutorials'),
('MDN Web Docs', 'documentation', 'Mozilla Developer Network', 'MDN Contributors', 'high', 'Comprehensive web development documentation'),
('GeeksforGeeks', 'educational', 'GeeksforGeeks.org', 'GFG Team', 'medium', 'Programming tutorials and problem solutions'),
('Stack Overflow', 'community', 'Stack Overflow Community', 'Developers Worldwide', 'medium', 'Programming Q&A community'),
('Real Python', 'tutorial', 'Real Python Team', 'Real Python', 'high', 'In-depth Python tutorials and guides'),
('FreeCodeCamp', 'course', 'freeCodeCamp.org', 'FCC Community', 'high', 'Free coding courses and certifications');