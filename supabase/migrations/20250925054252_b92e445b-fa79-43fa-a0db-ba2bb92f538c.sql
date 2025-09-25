-- Create enums for the application
CREATE TYPE public.user_role AS ENUM ('user', 'reviewer', 'admin');
CREATE TYPE public.question_status AS ENUM ('draft', 'published', 'pending_review', 'flagged');
CREATE TYPE public.language_type AS ENUM ('english', 'urdu', 'arabic');
CREATE TYPE public.audience_level AS ENUM ('school', 'college', 'research');
CREATE TYPE public.source_type AS ENUM ('quran', 'hadith', 'tafsir', 'book', 'url');
CREATE TYPE public.review_verdict AS ENUM ('approve', 'reject', 'edit');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'user',
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  language language_type NOT NULL DEFAULT 'english',
  audience_level audience_level NOT NULL DEFAULT 'school',
  status question_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create topics table
CREATE TABLE public.topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  seo_title TEXT,
  seo_meta TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sources table
CREATE TABLE public.sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type source_type NOT NULL,
  text_snippet TEXT NOT NULL,
  citation TEXT,
  contributor TEXT,
  trust_level TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create answers table
CREATE TABLE public.answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  summary_text TEXT,
  sources_used JSONB DEFAULT '[]',
  ai_provider TEXT,
  ai_response_raw JSONB,
  confidence_score DECIMAL(3,2),
  requires_review BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answer_id UUID NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  verdict review_verdict,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create logs table
CREATE TABLE public.logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for questions
CREATE POLICY "Anyone can view published questions" ON public.questions
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can view their own questions" ON public.questions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create questions" ON public.questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions" ON public.questions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Reviewers and admins can view all questions" ON public.questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role IN ('reviewer', 'admin')
    )
  );

-- RLS Policies for answers
CREATE POLICY "Anyone can view published answers" ON public.answers
  FOR SELECT USING (published = true);

CREATE POLICY "Reviewers and admins can view all answers" ON public.answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role IN ('reviewer', 'admin')
    )
  );

CREATE POLICY "System can create answers" ON public.answers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reviewers and admins can update answers" ON public.answers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role IN ('reviewer', 'admin')
    )
  );

-- RLS Policies for topics
CREATE POLICY "Anyone can view topics" ON public.topics
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage topics" ON public.topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for sources
CREATE POLICY "Anyone can view sources" ON public.sources
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage sources" ON public.sources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Reviewers can view relevant reviews" ON public.reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role IN ('reviewer', 'admin')
    )
  );

CREATE POLICY "Reviewers can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role IN ('reviewer', 'admin')
    )
  );

-- RLS Policies for logs
CREATE POLICY "Admins can view all logs" ON public.logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can create logs" ON public.logs
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
    NEW.email
  );
  
  -- Log the new user signup
  INSERT INTO public.logs (event_type, details, user_id)
  VALUES ('user_signup', jsonb_build_object('user_id', NEW.id, 'email', NEW.email), NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON public.topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sources_updated_at
  BEFORE UPDATE ON public.sources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_answers_updated_at
  BEFORE UPDATE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_questions_user_id ON public.questions(user_id);
CREATE INDEX idx_questions_status ON public.questions(status);
CREATE INDEX idx_questions_created_at ON public.questions(created_at DESC);
CREATE INDEX idx_answers_question_id ON public.answers(question_id);
CREATE INDEX idx_answers_published ON public.answers(published);
CREATE INDEX idx_topics_slug ON public.topics(slug);
CREATE INDEX idx_sources_type ON public.sources(type);
CREATE INDEX idx_reviews_answer_id ON public.reviews(answer_id);
CREATE INDEX idx_logs_event_type ON public.logs(event_type);
CREATE INDEX idx_logs_created_at ON public.logs(created_at DESC);