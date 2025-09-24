import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, MessageCircle, Users, Star } from "lucide-react";

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allTopics = [
    {
      id: 1,
      title: "Five Pillars of Islam",
      titleUrdu: "اسلام کے پانچ ستون",
      description: "Comprehensive guide to Shahada, Salah, Zakat, Sawm, and Hajj - the fundamental pillars of Islamic practice.",
      slug: "five-pillars-of-islam",
      questionCount: 45,
      articleCount: 8,
      level: "Beginner",
      tags: ["Fundamentals", "Practice", "Pillars"],
      featured: true
    },
    {
      id: 2,
      title: "Salah (Prayer)",
      titleUrdu: "نماز",
      description: "Complete guide to Islamic prayer including rules, timings, types, and spiritual significance.",
      slug: "salah-prayer",
      questionCount: 67,
      articleCount: 12,
      level: "All Levels",
      tags: ["Prayer", "Worship", "Daily Practice"],
      featured: true
    },
    {
      id: 3,
      title: "Hadith & Sunnah",
      titleUrdu: "حدیث اور سنت",
      description: "Understanding the teachings, practices, and sayings of Prophet Muhammad (PBUH).",
      slug: "hadith-sunnah",
      questionCount: 89,
      articleCount: 15,
      level: "Intermediate",
      tags: ["Hadith", "Sunnah", "Prophet", "Authentic Sources"],
      featured: true
    },
    {
      id: 4,
      title: "Tafsir (Quranic Commentary)",
      titleUrdu: "تفسیر",
      description: "Interpretation and explanation of Quranic verses by classical and contemporary scholars.",
      slug: "tafsir",
      questionCount: 52,
      articleCount: 18,
      level: "Advanced",
      tags: ["Quran", "Interpretation", "Commentary"],
      featured: true
    },
    {
      id: 5,
      title: "Zakat & Charity",
      titleUrdu: "زکوٰت اور خیرات",
      description: "Rules, calculations, and spiritual aspects of obligatory charity in Islam.",
      slug: "zakat-charity",
      questionCount: 34,
      articleCount: 6,
      level: "Intermediate",
      tags: ["Zakat", "Charity", "Finance", "Social Justice"],
      featured: false
    },
    {
      id: 6,
      title: "Fasting (Sawm)",
      titleUrdu: "روزہ",
      description: "Complete guide to Ramadan fasting and voluntary fasting throughout the year.",
      slug: "fasting-sawm",
      questionCount: 41,
      articleCount: 9,
      level: "All Levels",
      tags: ["Fasting", "Ramadan", "Spiritual Discipline"],
      featured: false
    },
    {
      id: 7,
      title: "Islamic Ethics & Morality",
      titleUrdu: "اسلامی اخلاق",
      description: "Principles of Islamic moral conduct and ethical behavior in daily life.",
      slug: "islamic-ethics",
      questionCount: 28,
      articleCount: 11,
      level: "All Levels",
      tags: ["Ethics", "Morality", "Character", "Akhlaq"],
      featured: false
    },
    {
      id: 8,
      title: "Marriage & Family",
      titleUrdu: "نکاح اور خاندان",
      description: "Islamic guidance on marriage, family relationships, and parenting.",
      slug: "marriage-family",
      questionCount: 36,
      articleCount: 7,
      level: "All Levels",
      tags: ["Marriage", "Family", "Relationships"],
      featured: false
    },
    {
      id: 9,
      title: "Islamic History",
      titleUrdu: "اسلامی تاریخ",
      description: "Key events, figures, and periods in Islamic civilization and history.",
      slug: "islamic-history",
      questionCount: 23,
      articleCount: 14,
      level: "Intermediate",
      tags: ["History", "Civilization", "Caliphate"],
      featured: false
    },
    {
      id: 10,
      title: "Comparative Religion",
      titleUrdu: "مقایسہ ادیان",
      description: "Islamic perspective on other religions and interfaith dialogue.",
      slug: "comparative-religion",
      questionCount: 19,
      articleCount: 5,
      level: "Advanced",
      tags: ["Comparative", "Interfaith", "Dialogue"],
      featured: false
    }
  ];

  const filteredTopics = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.titleUrdu.includes(searchTerm) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredTopics = filteredTopics.filter(topic => topic.featured);
  const otherTopics = filteredTopics.filter(topic => !topic.featured);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Islamic Study Topics
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            اسلامی مطالعاتی مواضیع
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Explore comprehensive topics in Islamic studies. From basic principles to advanced scholarly discussions, 
            find answers to questions across all areas of Islamic knowledge.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search topics... / موضوعات تلاش کریں..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Featured Topics */}
        {featuredTopics.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Topics</h2>
              <Badge variant="secondary" className="flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-elegant transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{topic.title}</CardTitle>
                        <CardDescription className="text-islamic-emerald font-medium mb-2">
                          {topic.titleUrdu}
                        </CardDescription>
                        <Badge className={getLevelColor(topic.level)}>{topic.level}</Badge>
                      </div>
                      <Star className="h-5 w-5 text-islamic-gold fill-current" />
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
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {topic.questionCount} questions
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {topic.articleCount} articles
                      </span>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to={`/topic/${topic.slug}`}>
                        Explore Topic / موضوع دیکھیں
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
                    <CardDescription className="text-islamic-emerald font-medium">
                      {topic.titleUrdu}
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
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{topic.questionCount} questions</span>
                      <span>{topic.articleCount} articles</span>
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
              Ask a specific question and get personalized answers from our AI-powered system.
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
  );
};

export default Topics;
