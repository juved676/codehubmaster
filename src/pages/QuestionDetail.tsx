import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Eye, MessageCircle, Copy, Check } from "lucide-react";
import { getQuestionById } from "@/data/sampleQuestions";
import { useState } from "react";
import { SEO } from "@/components/SEO";

export default function QuestionDetail() {
  const { topic, id } = useParams<{ topic: string; id: string }>();
  const question = id ? getQuestionById(id) : null;
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

  const canonicalUrl = `https://code-hub-master.lovable.app/question/${topic}/${id}`;
  const pageTitle = `${question.title} - Python Code Example | CodeHub`;
  const pageDescription = question.body.substring(0, 155);

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={`${question.title}, python code, ${topic}, programming example`}
      />
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link to={`/${topic}`}>
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </div>
    </>
  );
}
