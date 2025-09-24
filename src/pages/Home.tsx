import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, MessageCircle, Search, Star, Users, Globe } from "lucide-react";
import heroImage from "@/assets/islamic-hero-bg.jpg";

const Home = () => {
  const featuredTopics = [
    {
      title: "Five Pillars of Islam",
      titleUrdu: "اسلام کے پانچ ستون",
      description: "Learn about the fundamental pillars that form the foundation of Islamic practice",
      questionCount: 24,
      slug: "five-pillars-of-islam"
    },
    {
      title: "Salah (Prayer)",
      titleUrdu: "نماز",
      description: "Complete guide to Islamic prayer, its rules, and spiritual significance",
      questionCount: 45,
      slug: "salah-prayer"
    },
    {
      title: "Hadith & Sunnah",
      titleUrdu: "حدیث اور سنت",
      description: "Understanding the teachings and practices of Prophet Muhammad (PBUH)",
      questionCount: 38,
      slug: "hadith-sunnah"
    },
    {
      title: "Tafsir (Quranic Commentary)",
      titleUrdu: "تفسیر",
      description: "Explore the interpretation and explanation of Quranic verses",
      questionCount: 29,
      slug: "tafsir"
    }
  ];

  const recentQuestions = [
    {
      id: 1,
      title: "What is the difference between Hadith and Sunnah?",
      titleUrdu: "حدیث اور سنت میں کیا فرق ہے؟",
      answers: 3,
      views: 1240
    },
    {
      id: 2,
      title: "How to perform Wudu correctly?",
      titleUrdu: "وضو کا صحیح طریقہ کیا ہے؟",
      answers: 5,
      views: 2156
    },
    {
      id: 3,
      title: "What are the conditions for Zakat?",
      titleUrdu: "زکوٰت کی شرائط کیا ہیں؟",
      answers: 2,
      views: 987
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
            Islamic Study Hub
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-2">
            اسلامی مطالعاتی مرکز
          </p>
          <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Ask any Islamic studies question and get comprehensive, scholarly answers. 
            Learn from trusted sources with AI-powered insights.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Ask your Islamic studies question... / اپنا سوال پوچھیں..."
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
                Browse Topics
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Question / سوال پوچھیں
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
              <h3 className="text-2xl font-bold text-foreground">10,000+</h3>
              <p className="text-muted-foreground">Students Learning</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-accent rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">5,000+</h3>
              <p className="text-muted-foreground">Questions Answered</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-primary rounded-full mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">50+</h3>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Topics
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              مخصوص مواضیع
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular Islamic studies topics with comprehensive answers and scholarly insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic) => (
              <Card key={topic.slug} className="hover:shadow-elegant transition-all duration-300 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription className="text-sm text-islamic-emerald font-medium">
                    {topic.titleUrdu}
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
              حالیہ سوالات
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what other students are asking and learning about Islamic studies.
            </p>
          </div>

          <div className="space-y-4">
            {recentQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {question.title}
                      </h3>
                      <p className="text-sm text-islamic-emerald mb-4">
                        {question.titleUrdu}
                      </p>
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
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-white/90 mb-2">
            سیکھنے کے لیے تیار ہیں؟
          </p>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students exploring Islamic knowledge through our AI-powered study platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Your First Question
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/topics">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse All Topics
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;