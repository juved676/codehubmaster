import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Laptop, Zap, BookOpen, Brain, Trophy } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Learn Python Programming - Free Coding Tutorials & AI Courses | CodeHubMaster";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master Python programming, AI coding, and web development with free tutorials. Step-by-step guides with practical examples for beginners to advanced developers.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-3xl mx-4">
          <Code2 className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="mb-4 text-5xl font-bold gradient-text">Learn Python Programming & AI Coding for Free</h1>
          <p className="text-xl text-muted-foreground mb-8">Master Python programming, artificial intelligence, and web development with our comprehensive free tutorials. Perfect for beginners and advanced developers seeking to learn coding step by step.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-primary hover:shadow-neon" asChild>
              <Link to="/home">
                <Laptop className="mr-2 h-5 w-5" />
                Start Learning Python
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary" asChild>
              <Link to="/pricing">
                <Zap className="mr-2 h-5 w-5" />
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Learn Python Programming with CodeHubMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Free Python Tutorials</h3>
              <p className="text-muted-foreground">Access comprehensive Python programming tutorials from beginner to advanced level. Learn Python basics, data structures, and object-oriented programming for free.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI & Machine Learning</h3>
              <p className="text-muted-foreground">Master artificial intelligence and machine learning with practical coding examples. Learn AI programming, neural networks, and data science with Python.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hands-On Projects</h3>
              <p className="text-muted-foreground">Build real-world projects while learning to code. Practice with coding challenges and develop portfolio-worthy applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Start Your Python Programming Journey Today</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of students learning Python, AI, and web development. Get started with our free coding tutorials now!</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/home">Explore Free Python Tutorials</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <Link to="/topics">Browse All Coding Topics</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
