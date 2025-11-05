import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, MessageCircle, Search, Star, Users, Globe, ArrowRight, Eye } from "lucide-react";
import heroImage from "@/assets/coding-hero-bg.jpg";
import { sampleQuestions } from "@/data/sampleQuestions";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Python Tutorial for Beginners - Learn Python Programming Free | CodeHub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn Python from basics to advanced with our free coding tutorials. Practical examples, projects, and complete beginner\'s guide to Python programming.');
    }
  }, []);
  
  const featuredTopics = [
    {
      title: "Python Basics",
      description: "Master Python fundamentals, syntax, and core programming concepts",
      questionCount: 128,
      slug: "python-basics"
    },
    {
      title: "Web Development",
      description: "Build modern websites with HTML, CSS, JavaScript, and React",
      questionCount: 95,
      slug: "web-development"
    },
    {
      title: "Data Science",
      description: "Learn data analysis, visualization with pandas and numpy",
      questionCount: 76,
      slug: "data-science"
    },
    {
      title: "Machine Learning",
      description: "Understand ML algorithms, AI concepts, and model training",
      questionCount: 62,
      slug: "machine-learning"
    }
  ];

  const recentQuestions = sampleQuestions.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 gradient-text animate-fade-in">
            Learn Python Programming for Free
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold text-primary mb-4 animate-fade-in">
            Master Python, Web Development, Data Science & Machine Learning
          </p>
          <p className="text-lg lg:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto animate-fade-in">
            Free Python tutorials for beginners with step-by-step guides, practical coding examples, and AI-powered learning. 
            Perfect for students and developers building careers in programming.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="relative glass-card p-1 rounded-2xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 z-10" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask your coding question... e.g., How do I learn Python?"
                className="pl-14 pr-32 py-6 text-lg bg-card/50 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-primary"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:shadow-neon transition-all duration-300"
                asChild
              >
                <Link to="/ask">Ask Now</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button size="lg" className="bg-gradient-primary hover:shadow-neon hover-lift transition-all duration-300" asChild>
              <Link to="/topics">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Tutorials
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:border-primary hover:shadow-neon transition-all duration-300" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Help Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-primary rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">50,000+</h3>
              <p className="text-muted-foreground text-lg">Students Learning</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-accent rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-accent mb-2">15,000+</h3>
              <p className="text-muted-foreground text-lg">Questions Solved</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="p-4 bg-gradient-primary rounded-2xl mb-6 w-fit group-hover:shadow-neon transition-all duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
              <p className="text-muted-foreground text-lg">Tech Topics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Most Popular Python & Coding Topics
            </h2>
            <p className="text-xl text-primary mb-2">
              Top Programming Tutorials for Beginners
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore comprehensive Python programming tutorials, web development guides, and AI/ML courses with practical coding examples and step-by-step instructions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic, index) => (
              <Card key={topic.slug} className="glass-card hover-lift group border-primary/20 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                  <CardDescription className="text-sm text-accent font-semibold">
                    {topic.questionCount} questions answered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {topic.questionCount} questions
                    </span>
                    <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                      <Link to={`/${topic.slug}`}>Explore</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
            {recentQuestions.map((question, index) => (
              <Card key={question.id} className="glass-card hover-lift border-primary/20 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary hover:shadow-neon transition-all" asChild>
              <Link to="/topics">View All Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 glass-card p-12 rounded-3xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Start Your Tech Career Today
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            Join 50,000+ Students Mastering Programming
          </p>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Get AI-powered coding lessons, real-world projects, and career guidance for tech jobs in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-neon hover-lift transition-all duration-300 px-8 py-6 text-lg" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-6 w-6" />
                Start Learning Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:border-primary hover:shadow-neon transition-all duration-300 px-8 py-6 text-lg" asChild>
              <Link to="/pricing">
                <Star className="mr-2 h-6 w-6" />
                View Plans
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;