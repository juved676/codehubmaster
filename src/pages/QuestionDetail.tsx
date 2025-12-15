import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Eye, MessageCircle, Copy, Check, BookOpen, ExternalLink, Brain, Bot, ArrowRight } from "lucide-react";
import { getQuestionById, getQuestionsByTopic } from "@/data/sampleQuestions";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { InArticleAd } from "@/components/AdUnit";

export default function QuestionDetail() {
  const { topic, id } = useParams<{ topic: string; id: string }>();
  const question = id ? getQuestionById(id) : null;
  const relatedQuestions = topic ? getQuestionsByTopic(topic).filter(q => q.id !== id).slice(0, 3) : [];
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (question?.codeExample) {
      navigator.clipboard.writeText(question.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
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

  const canonicalUrl = `https://codehubmaster.lovable.app/question/${topic}/${id}`;
  const pageTitle = `${question.title} - Python Tutorial with Code Example | CodeHubMaster`;
  const pageDescription = `Learn ${question.title.toLowerCase()}. ${question.body.substring(0, 120)}... Free Python tutorial with working code examples.`;

  // FAQ Schema data for rich snippets
  const faqData = [
    {
      question: question.title,
      answer: question.answer.substring(0, 300) + "..."
    }
  ];

  // Breadcrumb data for navigation schema
  const breadcrumbs = [
    { name: "Home", url: "https://codehubmaster.lovable.app" },
    { name: topic?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Topics", url: `https://codehubmaster.lovable.app/topic/${topic}` },
    { name: question.title, url: canonicalUrl }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={`${question.title}, python tutorial, ${topic} guide, programming example, coding tutorial, learn ${topic}, free python course`}
        faqData={faqData}
        breadcrumbs={breadcrumbs}
        articleData={{
          publishedTime: "2025-01-01T00:00:00Z",
          modifiedTime: new Date().toISOString(),
          author: "CodeHubMaster",
          section: topic?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
        }}
      />
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Link to={`/topic/${topic}`}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {topic?.replace('-', ' ')}
              </Button>
            </Link>
          </div>

          {/* Question */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-3">{question.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                    <Badge variant="outline">{question.difficulty}</Badge>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {question.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {question.answers} answer
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{question.body}</p>
            </CardContent>
          </Card>

          {/* In-Article Ad - Between Question and Answer */}
          <InArticleAd />

          {/* AI Answer */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <CardTitle>AI Coding Instructor Answer</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none mb-6">
                <div className="whitespace-pre-wrap text-foreground">{question.answer}</div>
              </div>

              {question.codeExample && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Code2 className="h-3 w-3" />
                      Code Example
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyCode}
                      className="h-8"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border">
                    <code className="text-sm text-foreground">
                      {question.codeExample}
                    </code>
                  </pre>
                </div>
              )}

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>💡 Pro Tip:</strong> Try running this code in your own environment and experiment with modifications to deepen your understanding!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Questions - Internal Linking for SEO */}
          {relatedQuestions.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Related {topic?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedQuestions.map((q) => (
                    <Link 
                      key={q.id} 
                      to={`/question/${topic}/${q.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-primary transition-colors">{q.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                          <span>{q.views} views</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Link to={`/topic/${topic}`} className="text-primary hover:underline text-sm font-medium">
                    View all {topic?.replace('-', ' ')} tutorials →
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* In-Article Ad */}
          <InArticleAd />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/ask">
              <Button size="lg" className="w-full sm:w-auto">
                Ask Another Question
              </Button>
            </Link>
            <Link to="/topics">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore More Topics
              </Button>
            </Link>
          </div>

          {/* AI Technology Promotion */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">This answer was generated by AI</h4>
                  <p className="text-sm text-muted-foreground">Powered by GPT-4, Claude 3.5 & Gemini Pro • 94.7% Accuracy</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-primary/40" asChild>
                <Link to="/ai-technology">
                  Learn About Our AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Internal Links Footer for SEO */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Popular Programming Topics</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/ai-technology" className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm hover:bg-accent/30 transition-colors font-medium">
                🧠 AI Technology
              </Link>
              <Link to="/topic/python-basics" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                Python Basics
              </Link>
              <Link to="/topic/web-development" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                Web Development
              </Link>
              <Link to="/topic/data-science" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                Data Science
              </Link>
              <Link to="/topic/machine-learning" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                Machine Learning
              </Link>
              <Link to="/topic/algorithms-dsa" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                DSA & Algorithms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
