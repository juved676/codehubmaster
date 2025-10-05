import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Laptop, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-3xl mx-4">
        <Code2 className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="mb-4 text-5xl font-bold gradient-text">IIM-HUB-AI</h1>
        <p className="text-2xl text-primary font-semibold mb-4">AI-Powered Coding Education Platform</p>
        <p className="text-xl text-muted-foreground mb-8">Master programming with AI assistance. Learn Python, Web Development, Data Science, and Machine Learning.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-gradient-primary hover:shadow-neon" asChild>
            <Link to="/home">
              <Laptop className="mr-2 h-5 w-5" />
              Start Learning
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary" asChild>
            <Link to="/pricing">
              <Zap className="mr-2 h-5 w-5" />
              View Plans
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
