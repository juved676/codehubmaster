import { Link } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, MessageCircle, Search, Star, Users, Globe, ArrowRight, Eye, Cpu, Sparkles, Zap, Bot, Brain, Shield, Server, Rocket, GraduationCap, Briefcase } from "lucide-react";
import { sampleQuestions } from "@/data/sampleQuestions";
import { SEO } from "@/components/SEO";

// Lazy load non-critical components to reduce initial bundle
const LearningPaths = lazy(() => import("@/components/LearningPaths").then(m => ({ default: m.LearningPaths })));
const LaunchProjectCTA = lazy(() => import("@/components/LaunchProjectCTA").then(m => ({ default: m.LaunchProjectCTA })));
const AdUnit = lazy(() => import("@/components/AdUnit").then(m => ({ default: m.AdUnit })));
const AboveFoldAd = lazy(() => import("@/components/AdUnit").then(m => ({ default: m.AboveFoldAd })));
const InArticleAd = lazy(() => import("@/components/AdUnit").then(m => ({ default: m.InArticleAd })));
const MobileAd = lazy(() => import("@/components/AdUnit").then(m => ({ default: m.MobileAd })));

// Loading fallback for lazy components
const LazyFallback = () => <div className="min-h-[100px]" />;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredTopics = [{
    title: "Python Basics",
    description: "Master Python fundamentals, syntax, and core programming concepts",
    questionCount: 128,
    slug: "python-basics"
  }, {
    title: "Web Development",
    description: "Build modern websites with HTML, CSS, JavaScript, and React",
    questionCount: 95,
    slug: "web-development"
  }, {
    title: "Data Science",
    description: "Learn data analysis, visualization with pandas and numpy",
    questionCount: 76,
    slug: "data-science"
  }, {
    title: "Machine Learning",
    description: "Understand ML algorithms, AI concepts, and model training",
    questionCount: 62,
    slug: "machine-learning"
  }];
  const recentQuestions = sampleQuestions.slice(0, 3);
  
  return (
    <>
      <SEO 
        title="AI Coding Assistant - Intelligent Programming Help | CodeHubMaster"
        description="Advanced AI-powered coding assistant for Python, JavaScript, and web development. Get instant AI-generated code solutions, debugging help, and machine learning tutorials. Free AI coding platform."
        keywords="AI coding assistant, AI programming help, artificial intelligence coding, machine learning code generator, GPT coding assistant, AI developer tools, automated code generation, intelligent programming"
        canonical="https://codehubmaster.lovable.app"
        isAIContent={true}
      />
      
      <div className="min-h-screen">
        {/* Hero Section - FIRST for fastest LCP */}
        <section 
          className="relative py-20 lg:py-32 overflow-hidden hero-bg"
        >
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 gradient-text">
            AI-Powered Coding Assistant
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold text-primary mb-4">
            Intelligent Solutions for Python, Web Dev & Machine Learning
          </p>
          <p className="text-lg lg:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Get instant AI-generated code solutions, intelligent debugging assistance, and machine learning-powered 
            programming help. Our advanced AI understands your questions and delivers expert-level coding guidance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative glass-card p-1 rounded-2xl">
              <Bot className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 z-10" />
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Ask AI: How do I implement machine learning in Python?" className="pl-14 pr-32 py-6 text-lg bg-card/50 backdrop-filter-none border-0 rounded-xl focus:ring-2 focus:ring-primary" />
              <Button size="lg" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:shadow-neon transition-all duration-300" asChild>
                <Link to="/ask">
                  <Zap className="mr-1 h-4 w-4" />
                  Ask AI
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-neon hover-lift transition-all duration-300" asChild>
              <Link to="/ask">
                <Bot className="mr-2 h-5 w-5" />
                Ask AI Assistant
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-card border-accent/50 hover:border-accent hover:shadow-neon transition-all duration-300 bg-accent/10" asChild>
              <Link to="/ai-technology">
                <Brain className="mr-2 h-5 w-5" />
                View Our AI Stack
              </Link>
            </Button>
          </div>
        </div>
      </section>

        {/* Ads AFTER hero - don't block LCP */}
        <div style={{ minHeight: '100px', contain: 'layout' }}>
          <Suspense fallback={<div style={{ minHeight: '100px' }} />}>
            <AboveFoldAd />
          </Suspense>
        </div>
        <div className="md:hidden mobile-ad-lock" style={{ contain: 'strict' }}>
          <Suspense fallback={<div style={{ minHeight: '290px', height: '290px' }} />}>
            <MobileAd />
          </Suspense>
        </div>

      {/* AI FEATURES SECTION - Above The Fold Visibility for Google */}
      <section className="py-12 relative overflow-hidden bg-gradient-to-b from-card/80 to-background border-b border-primary/10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-500">AI Systems Online • 99.9% Uptime</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 gradient-text">
              AI-Powered Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade AI capabilities powered by GPT-4, Claude 3.5 & Gemini Pro
            </p>
          </div>

          {/* AI Features Grid - 4 Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* AI Code Assistant */}
            <div className="glass-card p-5 rounded-xl hover-lift group border border-primary/20 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">Live</span>
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm lg:text-base">🤖 AI Code Assistant</h3>
              <p className="text-xs text-muted-foreground mb-2">Real-time AI coding help with instant responses</p>
              <div className="text-xs text-primary font-medium">94.7% accuracy</div>
            </div>

            {/* ML Project Generator */}
            <div className="glass-card p-5 rounded-xl hover-lift group border border-accent/20 hover:border-accent/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">New</span>
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm lg:text-base">🧠 ML Project Generator</h3>
              <p className="text-xs text-muted-foreground mb-2">Generate complete ML projects automatically</p>
              <div className="text-xs text-accent font-medium">1,200+ projects</div>
            </div>

            {/* Smart Debugger */}
            <div className="glass-card p-5 rounded-xl hover-lift group border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-medium">Fast</span>
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm lg:text-base">⚡ Smart Debugger</h3>
              <p className="text-xs text-muted-foreground mb-2">AI-powered error detection & fix suggestions</p>
              <div className="text-xs text-yellow-500 font-medium">2.3s response</div>
            </div>

            {/* Personalized Paths */}
            <div className="glass-card p-5 rounded-xl hover-lift group border border-green-500/20 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full font-medium">AI</span>
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm lg:text-base">🎯 Personalized Paths</h3>
              <p className="text-xs text-muted-foreground mb-2">Custom learning based on your skill level</p>
              <div className="text-xs text-green-500 font-medium">4 skill levels</div>
            </div>
          </div>

          {/* Live AI Demo Element & Metrics */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Try AI Demo Card */}
            <div className="glass-card p-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg shadow-neon animate-pulse">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Try AI Assistant Now</h3>
                    <p className="text-xs text-muted-foreground">No signup required for demo</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/40">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Online
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Experience real AI coding assistance. Ask any programming question and get instant AI-generated solutions.
              </p>
              <Button className="w-full bg-gradient-primary hover:shadow-neon" asChild>
                <Link to="/ask">
                  <Zap className="mr-2 h-4 w-4" />
                  Launch AI Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* AI Metrics Dashboard */}
            <div className="glass-card p-6 rounded-xl border border-accent/30">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-accent" />
                AI Platform Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/50 p-3 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-xs text-muted-foreground">AI-Generated Examples</div>
                </div>
                <div className="bg-card/50 p-3 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-accent">1,200+</div>
                  <div className="text-xs text-muted-foreground">ML Projects</div>
                </div>
                <div className="bg-card/50 p-3 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500">99.9%</div>
                  <div className="text-xs text-muted-foreground">AI Availability</div>
                </div>
                <div className="bg-card/50 p-3 rounded-lg border border-yellow-500/20">
                  <div className="text-2xl font-bold text-yellow-500">24/7</div>
                  <div className="text-xs text-muted-foreground">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise AI Technology Banner */}
      <section className="py-8 relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-neon">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-foreground">Enterprise AI Technology</h3>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/40">GPT-4 • Claude • Gemini</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  94.7% accuracy • 2.3s response time • 32K token context • SOC 2 Compliant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Enterprise Security</span>
                </div>
              </div>
              <Button className="bg-gradient-primary hover:shadow-neon" asChild>
                <Link to="/ai-technology">
                  Explore AI Technology
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* In-Article Ad - After Hero - Lazy loaded */}
      <Suspense fallback={<LazyFallback />}>
        <InArticleAd />
      </Suspense>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-primary rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">AI</h3>
              <p className="text-muted-foreground text-lg">Powered Responses</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-accent rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-accent mb-2">Instant</h3>
              <p className="text-muted-foreground text-lg">Code Generation</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-primary rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">ML</h3>
              <p className="text-muted-foreground text-lg">Enhanced Learning</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-accent rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-accent mb-2">Smart</h3>
              <p className="text-muted-foreground text-lg">Debug Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Solutions */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Solutions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              AI Coding Solutions & Tutorials
            </h2>
            <p className="text-xl text-primary mb-2">
              Machine Learning-Enhanced Programming Help
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Get AI-generated code solutions, intelligent debugging assistance, and automated programming help powered by advanced machine learning models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic, index) => <Card key={topic.slug} className="glass-card hover-lift group border-primary/20 animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary font-medium">AI-Enhanced</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                  <CardDescription className="text-sm text-accent font-semibold">
                    {topic.questionCount} AI solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Bot className="h-3 w-3" />
                      {topic.questionCount} solutions
                    </span>
                    <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                      <Link to={`/topic/${topic.slug}`}>
                        <Zap className="mr-1 h-3 w-3" />
                        Get AI Help
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* AI Skills Quick Links */}
          <div className="mt-12 glass-card p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Explore AI Learning Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/free-ai-coding-tools-for-beginners" className="flex items-center gap-3 p-4 rounded-lg bg-card/50 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all group">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">Free AI Coding Tools</div>
                  <div className="text-xs text-muted-foreground">Learn Python & Web Dev for Free</div>
                </div>
              </Link>
              <Link to="/ai-tools-for-data-science" className="flex items-center gap-3 p-4 rounded-lg bg-card/50 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all group">
                <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-foreground group-hover:text-accent transition-colors">AI for Data Science</div>
                  <div className="text-xs text-muted-foreground">Python Automation & Analysis</div>
                </div>
              </Link>
              <Link to="/ai-coding-skills-for-jobs-2025" className="flex items-center gap-3 p-4 rounded-lg bg-card/50 hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-all group">
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Briefcase className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-foreground group-hover:text-green-500 transition-colors">AI Skills for Jobs 2025</div>
                  <div className="text-xs text-muted-foreground">Career-Ready Developer Skills</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* In-Article Ad - After Featured Topics */}
      <InArticleAd />

      {/* Learning Paths Section - Lazy loaded */}
      <Suspense fallback={<LazyFallback />}>
        <LearningPaths />
      </Suspense>

      {/* Launch Your Project CTA - Lazy loaded */}
      <section className="py-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 300px' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LazyFallback />}>
            <LaunchProjectCTA variant="full" />
          </Suspense>
        </div>
      </section>
      
      {/* Mobile Ad - Extra placement for mobile users */}
      <MobileAd />

      {/* Recent Questions */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Recent Coding Questions & Answers
            </h3>
            <p className="text-xl text-primary mb-2">
              Latest Python Programming Discussions
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover what other students are learning. Get answers to your Python, web development, and AI programming questions.
            </p>
          </div>

          <div className="space-y-4">
            {recentQuestions.map((question, index) => <Card key={question.id} className="glass-card hover-lift border-primary/20 animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-4 hover:text-primary transition-colors">
                        {question.title}
                      </h3>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2 text-accent" />
                          {question.answers} answer{question.answers !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          {question.views.toLocaleString()} views
                        </span>
                        <span className="text-primary font-medium">{question.difficulty}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                      <Link to={`/question/${question.topic}/${question.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary hover:shadow-neon transition-all" asChild>
              <Link to="/topics">View All Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Optimized blur effects */}
      <section className="py-20 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
        <div className="absolute inset-0 bg-gradient-hero opacity-40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 glass-card p-12 rounded-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start Your AI Coding Journey</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Experience AI-Powered Programming
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            Join Developers Using AI to Code Smarter
          </p>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Get instant AI-generated solutions, intelligent code explanations, and machine learning-powered debugging assistance. 
            The future of programming is here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-neon hover-lift transition-all duration-300 px-8 py-6 text-lg" asChild>
              <Link to="/ask">
                <Zap className="mr-2 h-6 w-6" />
                Try AI Assistant Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:border-primary hover:shadow-neon transition-all duration-300 px-8 py-6 text-lg" asChild>
              <Link to="/pricing">
                <Sparkles className="mr-2 h-6 w-6" />
                Upgrade to Pro AI
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};
export default Home;