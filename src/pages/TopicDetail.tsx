import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, MessageCircle } from "lucide-react";
import { getQuestionsByTopic } from "@/data/sampleQuestions";
import { SEO } from "@/components/SEO";

const topicInfo: Record<string, { title: string; description: string }> = {
  "python-basics": {
    title: "Python Basics",
    description: "Learn Python fundamentals, syntax, data types, loops, and functions."
  },
  "data-science": {
    title: "Data Science",
    description: "Master data analysis, visualization with pandas, numpy, and matplotlib."
  },
  "web-development": {
    title: "Web Development",
    description: "Build modern websites with HTML, CSS, JavaScript, and React."
  },
  "machine-learning": {
    title: "Machine Learning",
    description: "Understand ML algorithms, scikit-learn, neural networks, and AI."
  }
};

export default function TopicDetail() {
  const { topic: topicParam } = useParams<{ topic: string }>();
  const location = useLocation();
  
  // Extract topic from either URL param or pathname
  const topic = topicParam || location.pathname.replace('/', '');
  
  const questions = topic ? getQuestionsByTopic(topic) : [];
  const info = topic ? topicInfo[topic] : null;

  if (!topic || !info) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Link to="/topics">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://code-hub-master.lovable.app/topic/${topic}`;
  const pageTitle = `${info.title} - Learn Python Programming | CodeHub`;
  const pageDescription = `${info.description} Explore ${questions.length} questions and detailed code examples.`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={`${info.title}, python programming, coding tutorial, ${topic}`}
      />
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link to="/topics">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Button>
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {info.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {info.description}
          </p>
          <Badge variant="secondary" className="text-sm">
            {questions.length} Questions Available
          </Badge>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((question) => (
              <Card key={question.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {question.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">
                        {question.body}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline">{question.difficulty}</Badge>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {question.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {question.answers} answer{question.answers !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to={`/question/${topic}/${question.id}`}>
                    <Button className="w-full">
                      View Answer & Code Examples
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  No questions available for this topic yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-hero rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Have a specific question about {info.title}?
          </h3>
          <p className="text-white/90 mb-6">
            Get personalized answers with detailed code examples from our AI coding instructor.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/ask">
              Ask Your Question
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
