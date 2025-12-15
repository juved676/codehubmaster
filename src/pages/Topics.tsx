import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, MessageCircle, Users, Star, Code, Brain, ArrowRight, Bot } from "lucide-react";
import { SEO } from "@/components/SEO";

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allTopics = [
    {
      id: 1,
      title: "Python Basics",
      description: "Learn Python fundamentals, syntax, data types, loops, and functions for beginners.",
      slug: "python-basics",
      questionCount: 128,
      articleCount: 15,
      level: "Beginner",
      tags: ["Python", "Programming", "Basics"],
      featured: true
    },
    {
      id: 2,
      title: "Web Development",
      description: "Build modern websites with HTML, CSS, JavaScript, React, and responsive design.",
      slug: "web-development",
      questionCount: 95,
      articleCount: 18,
      level: "All Levels",
      tags: ["HTML", "CSS", "JavaScript", "React"],
      featured: true
    },
    {
      id: 3,
      title: "Data Science",
      description: "Master data analysis, visualization with pandas, numpy, and matplotlib.",
      slug: "data-science",
      questionCount: 76,
      articleCount: 12,
      level: "Intermediate",
      tags: ["Data", "Python", "Analytics"],
      featured: true
    },
    {
      id: 4,
      title: "Machine Learning",
      description: "Understand ML algorithms, scikit-learn, neural networks, and AI concepts.",
      slug: "machine-learning",
      questionCount: 62,
      articleCount: 14,
      level: "Advanced",
      tags: ["AI", "ML", "Algorithms"],
      featured: true
    },
    {
      id: 5,
      title: "Algorithms & DSA",
      description: "Master data structures, algorithms, problem-solving for coding interviews.",
      slug: "algorithms-dsa",
      questionCount: 89,
      articleCount: 16,
      level: "Intermediate",
      tags: ["DSA", "LeetCode", "Interviews"],
      featured: false
    },
    {
      id: 6,
      title: "Database & SQL",
      description: "Learn database design, SQL queries, MySQL, PostgreSQL, and optimization.",
      slug: "database-sql",
      questionCount: 54,
      articleCount: 10,
      level: "Intermediate",
      tags: ["SQL", "Database", "Backend"],
      featured: false
    },
    {
      id: 7,
      title: "APIs & Backend",
      description: "Build REST APIs with Node.js, Express, FastAPI, and authentication.",
      slug: "apis-backend",
      questionCount: 48,
      articleCount: 11,
      level: "Intermediate",
      tags: ["API", "Backend", "Node.js"],
      featured: false
    },
    {
      id: 8,
      title: "DevOps Basics",
      description: "Git, GitHub, Docker, CI/CD, deployment, and cloud fundamentals.",
      slug: "devops-basics",
      questionCount: 36,
      articleCount: 8,
      level: "All Levels",
      tags: ["Git", "Docker", "DevOps"],
      featured: false
    }
  ];

  const filteredTopics = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredTopics = filteredTopics.filter(topic => topic.featured);
  const otherTopics = filteredTopics.filter(topic => !topic.featured);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  return (
    <>
      <SEO 
        title="Python Tutorial for Beginners 2025 - Free Programming Courses | CodeHubMaster"
        description="Learn Python programming from scratch with free step-by-step tutorials. Master web development, data science, machine learning with practical code examples. Best for US/UK beginners."
        keywords="python tutorial 2025, python programming course, learn python free, web development tutorial, data science course, machine learning tutorial, javascript tutorial, react course, coding for beginners"
        canonical="https://codehubmaster.lovable.app/topics"
        faqData={[
          { question: "What programming topics can I learn?", answer: "We offer tutorials on Python, JavaScript, React, Web Development, Data Science, Machine Learning, SQL, and more." },
          { question: "Are the programming tutorials free?", answer: "Yes! All our basic tutorials and code examples are completely free. Premium plans offer AI-powered personalized help." },
          { question: "Which topic should I start with as a beginner?", answer: "We recommend starting with Python Basics. It's beginner-friendly and provides a solid foundation for programming." }
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "Topics", url: "https://codehubmaster.lovable.app/topics" }
        ]}
      />
      
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Free Python Programming Tutorials & Coding Topics
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Master Python, Web Development & Data Science Step by Step
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Learn coding from Python basics to advanced AI/ML with comprehensive tutorials. 
            Get step-by-step Python programming guides with practical examples, code snippets, and real-world projects for beginners and advanced developers.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search topics... e.g., Python, React, ML"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* AI Technology Banner */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Powered by Enterprise AI Technology</h3>
                <p className="text-sm text-muted-foreground">GPT-4 • Claude 3.5 • Gemini Pro • 94.7% Accuracy • 2.3s Response</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-primary/40" asChild>
                <Link to="/ai-technology">
                  <Brain className="mr-2 h-4 w-4" />
                  View AI Stack
                </Link>
              </Button>
              <Button size="sm" className="bg-gradient-primary" asChild>
                <Link to="/ask">
                  <Bot className="mr-2 h-4 w-4" />
                  Try AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Topics */}
        {featuredTopics.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Python & Programming Topics</h2>
              <Badge variant="secondary" className="flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Most Popular Tutorials
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-elegant transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{topic.title}</CardTitle>
                        <CardDescription className="text-primary font-medium mb-2">
                          {topic.questionCount} questions • {topic.articleCount} resources
                        </CardDescription>
                        <Badge className={getLevelColor(topic.level)}>{topic.level}</Badge>
                      </div>
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {topic.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {topic.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to={`/topic/${topic.slug}`}>
                        Explore Topic
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Other Topics */}
        {otherTopics.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">All Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {topic.questionCount} questions
                    </CardDescription>
                    <Badge className={getLevelColor(topic.level)}>
                      {topic.level}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {topic.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/topic/${topic.slug}`}>
                        View Topic
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredTopics.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No topics found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or explore our featured topics.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* CTA Section */}
        {!searchTerm && (
          <section className="mt-16 text-center bg-gradient-hero rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-white/90 mb-6">
              Ask a specific coding question and get personalized answers with code examples.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Your Question
              </Link>
            </Button>
          </section>
        )}
        </div>
      </div>
    </>
  );
};

export default Topics;
