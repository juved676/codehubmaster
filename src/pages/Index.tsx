import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Laptop, Zap, BookOpen, Brain, Trophy, Play, Users, ArrowRight, Star, CheckCircle, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

const Index = () => {
  const popularTopics = [
    { name: "Python Basics", questions: 128, slug: "python-basics", level: "Beginner" },
    { name: "Web Development", questions: 95, slug: "web-development", level: "All Levels" },
    { name: "Data Science", questions: 76, slug: "data-science", level: "Intermediate" },
    { name: "Machine Learning", questions: 62, slug: "machine-learning", level: "Advanced" },
  ];

  const howItWorks = [
    { step: 1, title: "Ask Any Question", description: "Type your coding question in plain English. Our AI understands Python, JavaScript, SQL, and 15+ languages." },
    { step: 2, title: "Get Instant Answer", description: "Receive a detailed explanation with working code examples in under 5 seconds." },
    { step: 3, title: "Learn & Apply", description: "Copy the code, understand the concept, and apply it to your project immediately." },
  ];

  const testimonials = [
    { name: "Priya S.", role: "Computer Science Student", text: "CodeHubMaster helped me understand Python recursion in minutes. The free plan is perfect for students!", rating: 5 },
    { name: "Rahul M.", role: "Junior Developer", text: "Way better than Stack Overflow for quick answers. The AI explains everything step by step.", rating: 5 },
    { name: "Sarah K.", role: "Self-taught Developer", text: "I went from beginner to landing my first job using CodeHubMaster. Highly recommend!", rating: 5 },
  ];

  return (
    <>
      <SEO 
        title="Learn to Code with Free AI Assistance - Python, JavaScript & More | CodeHubMaster"
        description="Get free AI-powered coding help instantly. Ask questions about Python, JavaScript, React, SQL, and 15+ programming languages. No credit card required. Start learning today!"
        keywords="learn to code free, AI coding assistant, Python tutorial free, JavaScript help, coding questions answered, free programming help, learn programming with AI"
        canonical="https://codehubmaster.site"
        faqData={[
          { question: "Is CodeHubMaster free to use?", answer: "Yes! Get 15 free AI-powered coding questions per month. No credit card required." },
          { question: "What programming languages are supported?", answer: "Python, JavaScript, React, SQL, Java, C++, Go, and 15+ languages." },
          { question: "How fast are the AI responses?", answer: "Most answers arrive in 2-5 seconds with complete code examples." }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <Badge className="mb-6 bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-sm px-4 py-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free to Start - No Credit Card Required
            </Badge>
            
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold gradient-text leading-tight">
              Learn to Code with Free AI Assistance
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get instant answers to your coding questions. Python, JavaScript, React, SQL — 
              ask anything and get working code in seconds.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Button size="lg" className="bg-gradient-primary hover:shadow-neon text-lg px-8 py-6" asChild>
                <Link to="/ask">
                  <Play className="mr-2 h-5 w-5" />
                  Ask Your First Question Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary text-lg px-8 py-6" asChild>
                <Link to="/topics">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Tutorials
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                15 free questions/month
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                15+ languages supported
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                2-second response time
              </span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">Simple & Fast</Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Get coding help in 3 simple steps. No complex setup, no waiting.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item) => (
                <div key={item.step} className="glass-card p-8 rounded-2xl text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" className="bg-gradient-primary hover:shadow-neon" asChild>
                <Link to="/ask">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Try It Now - It's Free
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Topics Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/40">Most Popular</Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Popular Coding Topics</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our most-asked topics with thousands of answered questions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTopics.map((topic) => (
                <Card key={topic.slug} className="glass-card border-primary/20 hover-lift group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{topic.level}</Badge>
                      <span className="text-xs text-muted-foreground">{topic.questions} questions</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{topic.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/topic/${topic.slug}`}>
                        Explore Topic
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/topics">
                  View All Topics
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Why Learn with CodeHubMaster?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powered by GPT-4, Claude 3.5, and Gemini Pro for accurate, helpful answers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Free Tutorials</h3>
                <p className="text-muted-foreground">Access comprehensive Python, JavaScript, and React tutorials from beginner to advanced. All free, forever.</p>
              </div>
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Answers</h3>
                <p className="text-muted-foreground">Get instant, accurate answers with working code examples. Our AI explains concepts clearly, step by step.</p>
              </div>
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <Trophy className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-World Projects</h3>
                <p className="text-muted-foreground">Build portfolio-worthy projects while learning. Practice with real coding challenges and examples.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/40">Success Stories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">What Developers Say</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of developers improving their coding skills every day.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card border-primary/20">
                  <CardHeader>
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-foreground italic">"{testimonial.text}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Start Your Coding Journey Today</h2>
            <p className="text-xl mb-8 text-white/90">
              Join 50,000+ developers learning Python, JavaScript, and more. Get 15 free questions every month.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link to="/ask">
                  <Play className="mr-2 h-5 w-5" />
                  Start Free Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 text-lg px-8 py-6" asChild>
                <Link to="/pricing">
                  <Zap className="mr-2 h-5 w-5" />
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
