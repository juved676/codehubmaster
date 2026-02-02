import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, MessageCircle, Star, Code, Brain, ArrowRight, Bot, Database, Globe, Cpu, Terminal, Play } from "lucide-react";
import { SEO } from "@/components/SEO";

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = {
    python: {
      name: "Python Programming",
      icon: Terminal,
      color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/40",
      description: "Master Python from basics to advanced. Perfect for beginners and data scientists.",
      topics: [
        { id: 1, title: "Python Basics", description: "Variables, data types, loops, functions, and OOP fundamentals. Start your coding journey here.", slug: "python-basics", questionCount: 128, articleCount: 15, level: "Beginner" },
        { id: 3, title: "Data Science", description: "Data analysis with pandas, numpy, matplotlib. Learn to visualize and manipulate data.", slug: "data-science", questionCount: 76, articleCount: 12, level: "Intermediate" },
        { id: 4, title: "Machine Learning", description: "Build ML models with scikit-learn, neural networks, and AI concepts.", slug: "machine-learning", questionCount: 62, articleCount: 14, level: "Advanced" },
      ]
    },
    webdev: {
      name: "Web Development",
      icon: Globe,
      color: "bg-blue-500/20 text-blue-600 border-blue-500/40",
      description: "Build modern, responsive websites with the latest frameworks and tools.",
      topics: [
        { id: 2, title: "Web Development", description: "HTML, CSS, JavaScript, React, and responsive design for modern websites.", slug: "web-development", questionCount: 95, articleCount: 18, level: "All Levels" },
        { id: 7, title: "APIs & Backend", description: "REST APIs with Node.js, Express, FastAPI, authentication, and databases.", slug: "apis-backend", questionCount: 48, articleCount: 11, level: "Intermediate" },
      ]
    },
    dataEngineering: {
      name: "Data & Databases",
      icon: Database,
      color: "bg-green-500/20 text-green-600 border-green-500/40",
      description: "Master databases, SQL, and data engineering for real-world applications.",
      topics: [
        { id: 6, title: "Database & SQL", description: "MySQL, PostgreSQL, query optimization, and database design patterns.", slug: "database-sql", questionCount: 54, articleCount: 10, level: "Intermediate" },
      ]
    },
    computerScience: {
      name: "Computer Science",
      icon: Cpu,
      color: "bg-purple-500/20 text-purple-600 border-purple-500/40",
      description: "Core CS concepts, algorithms, and interview preparation.",
      topics: [
        { id: 5, title: "Algorithms & DSA", description: "Data structures, LeetCode patterns, and coding interview prep.", slug: "algorithms-dsa", questionCount: 89, articleCount: 16, level: "Intermediate" },
        { id: 8, title: "DevOps Basics", description: "Git, Docker, CI/CD, cloud deployment, and automation.", slug: "devops-basics", questionCount: 36, articleCount: 8, level: "All Levels" },
      ]
    }
  };

  const allTopics = Object.values(categories).flatMap(cat => cat.topics);

  const filteredTopics = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const totalQuestions = allTopics.reduce((sum, t) => sum + t.questionCount, 0);

  return (
    <>
      <SEO 
        title="Free Python, JavaScript & React Tutorials - Learn Coding Online | CodeHubMaster"
        description="Browse 500+ free coding tutorials on Python, JavaScript, React, SQL, Machine Learning, and more. Organized by skill level with step-by-step guides and code examples."
        keywords="free python tutorials, javascript course, react tutorial, sql lessons, machine learning guide, coding tutorials online, learn programming free, web development course"
        canonical="https://codehubmaster.lovable.app/topics"
        faqData={[
          { question: "What programming topics can I learn for free?", answer: "Python, JavaScript, React, SQL, Machine Learning, Data Science, Algorithms, and DevOps - all completely free." },
          { question: "How many tutorials are available?", answer: "Over 500 questions answered across 8 major topic categories, from beginner to advanced." },
          { question: "Which topic should beginners start with?", answer: "Python Basics is the best starting point. It's beginner-friendly and teaches fundamental programming concepts." }
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "Topics", url: "https://codehubmaster.lovable.app/topics" }
        ]}
      />
      
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">
              {totalQuestions}+ Questions Answered
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Free Coding Tutorials & Learning Paths
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Master Python, JavaScript, React, SQL, and Machine Learning with organized tutorials. 
              From beginner basics to advanced concepts — all free.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search topics... Python, React, SQL"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick CTA */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-primary hover:shadow-neon" asChild>
                <Link to="/ask">
                  <Play className="mr-2 h-4 w-4" />
                  Ask AI Your Question
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/ai-technology">
                  <Brain className="mr-2 h-4 w-4" />
                  Explore Our AI Technology
                </Link>
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          {!searchTerm && (
            <Tabs defaultValue="all" className="mb-12">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All Topics
                </TabsTrigger>
                {Object.entries(categories).map(([key, cat]) => (
                  <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <cat.icon className="w-4 h-4 mr-2" />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* All Topics Tab */}
              <TabsContent value="all">
                {Object.entries(categories).map(([key, cat]) => (
                  <section key={key} className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg ${cat.color}`}>
                        <cat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.name}</h2>
                        <p className="text-sm text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.topics.map((topic) => (
                        <Card key={topic.id} className="hover:shadow-elegant transition-all duration-300 border-primary/20 hover-lift">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getLevelColor(topic.level)}>{topic.level}</Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {topic.questionCount} questions
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {topic.description}
                            </p>
                            
                            <Button className="w-full" asChild>
                              <Link to={`/topic/${topic.slug}`}>
                                Start Learning
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                ))}
              </TabsContent>

              {/* Individual Category Tabs */}
              {Object.entries(categories).map(([key, cat]) => (
                <TabsContent key={key} value={key}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${cat.color}`}>
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.name}</h2>
                        <p className="text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.topics.map((topic) => (
                      <Card key={topic.id} className="hover:shadow-elegant transition-all duration-300 border-primary/20 hover-lift">
                        <CardHeader>
                          <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getLevelColor(topic.level)}>{topic.level}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {topic.questionCount} questions • {topic.articleCount} articles
                            </span>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {topic.description}
                          </p>
                          
                          <Button className="w-full" asChild>
                            <Link to={`/topic/${topic.slug}`}>
                              Start Learning
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Search Results */}
          {searchTerm && filteredTopics.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Search Results for "{searchTerm}"
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-elegant transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getLevelColor(topic.level)}>{topic.level}</Badge>
                        <span className="text-xs text-muted-foreground">{topic.questionCount} questions</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                      <Button size="sm" className="w-full" asChild>
                        <Link to={`/topic/${topic.slug}`}>
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {searchTerm && filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No topics found</h3>
              <p className="text-muted-foreground mb-4">Try a different search term or ask our AI directly.</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear Search</Button>
                <Button asChild>
                  <Link to="/ask">Ask AI Instead</Link>
                </Button>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {!searchTerm && (
            <section className="mt-16 text-center bg-gradient-hero rounded-2xl p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Can't Find What You Need?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Ask any coding question and get an instant AI-powered answer with code examples. 
                Python, JavaScript, SQL, React — we cover it all.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/ask">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ask Your Question Free
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
                  <Link to="/pricing">
                    View All Plans
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Topics;
