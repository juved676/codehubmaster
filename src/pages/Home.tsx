import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, MessageCircle, Search, Star, Users, Globe } from "lucide-react";
import heroImage from "@/assets/coding-hero-bg.jpg";

const Home = () => {
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

  const recentQuestions = [
    {
      id: 1,
      title: "How do I start learning Python for data science?",
      answers: 5,
      views: 2340
    },
    {
      id: 2,
      title: "What's the difference between React and vanilla JavaScript?",
      answers: 8,
      views: 3156
    },
    {
      id: 3,
      title: "Best way to learn machine learning algorithms?",
      answers: 4,
      views: 1987
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Master Coding with AI
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-2">
            Learn Python, Web Dev, Data Science & ML
          </p>
          <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Get AI-powered coding tutorials, debugging help, and career guidance. 
            Perfect for Indian students and job seekers building tech careers.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Ask your coding question... e.g., How do I learn Python?"
                className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-elegant"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                asChild
              >
                <Link to="/ask">Ask Now</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/topics">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Coding Tutorials
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Coding Help
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-primary rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">50,000+</h3>
              <p className="text-muted-foreground">Students Learning</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-accent rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">15,000+</h3>
              <p className="text-muted-foreground">Coding Questions Solved</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-primary rounded-full mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">100+</h3>
              <p className="text-muted-foreground">Tech Topics Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Popular Coding Topics
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Most Searched by Students
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular programming topics with AI-powered answers and practical examples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic) => (
              <Card key={topic.slug} className="hover:shadow-elegant transition-all duration-300 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription className="text-sm text-primary font-medium">
                    {topic.questionCount} questions answered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {topic.questionCount} questions
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/topic/${topic.slug}`}>Explore</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Questions */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Recent Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Latest from Our Community
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what other students are learning about programming and development.
            </p>
          </div>

          <div className="space-y-4">
            {recentQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {question.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {question.answers} answers
                        </span>
                        <span>{question.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/question/${question.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/questions">View All Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Your Tech Career Today
          </h2>
          <p className="text-lg text-white/90 mb-2">
            Join 50,000+ Students Mastering Programming
          </p>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get AI-powered coding lessons, real-world projects, and career guidance for tech jobs in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Learning Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/pricing">
                <Star className="mr-2 h-5 w-5" />
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