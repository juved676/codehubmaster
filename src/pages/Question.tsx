import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ExternalLink, Flag, ThumbsUp } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  body: string;
  language: string;
  audience_level: string;
  status: string;
  created_at: string;
  profiles: {
    name: string;
  };
}

interface Answer {
  id: string;
  answer_text: string;
  summary_text: string;
  sources_used: any;
  confidence_score: number;
  published: boolean;
  created_at: string;
}

export default function Question() {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchQuestionAndAnswer();
    }
  }, [id]);

  const fetchQuestionAndAnswer = async () => {
    try {
      // Fetch question
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .select(`
          *,
          profiles:profiles!questions_user_id_fkey(name)
        `)
        .eq('id', id)
        .single();

      if (questionError) throw questionError;
      setQuestion(questionData);

      // Fetch published answer
      const { data: answerData, error: answerError } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', id)
        .eq('published', true)
        .single();

      if (!answerError && answerData) {
        setAnswer(answerData);
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      toast({
        title: "خطا / Error",
        description: "Could not load question",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const requestReview = async () => {
    if (!answer || !user) return;

    try {
      await supabase
        .from('reviews')
        .insert({
          answer_id: answer.id,
          reviewer_id: user.id,
          verdict: null,
          notes: 'Human review requested by user'
        });

      toast({
        title: "جائزہ کی درخواست / Review Requested",
        description: "A human scholar will review this answer",
      });
    } catch (error) {
      console.error('Error requesting review:', error);
      toast({
        title: "خطا / Error",
        description: "Could not request review",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
        <Link to="/topics">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/topics">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics / واپس موضوعات
          </Button>
        </Link>
      </div>

      {/* Question */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{question.title}</CardTitle>
              <CardDescription className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{question.language}</Badge>
                <Badge variant="outline">{question.audience_level}</Badge>
                <Badge variant={question.status === 'published' ? 'default' : 'secondary'}>
                  {question.status}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-muted-foreground whitespace-pre-wrap">{question.body}</p>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Asked by {question.profiles?.name || 'Anonymous'} • {new Date(question.created_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      {/* Answer */}
      {answer ? (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>AI Answer / جواب</span>
                {answer.confidence_score && (
                  <Badge variant="outline">
                    Confidence: {Math.round(answer.confidence_score * 100)}%
                  </Badge>
                )}
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={requestReview}>
                  <Flag className="mr-2 h-4 w-4" />
                  Request Review / جائزہ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Summary */}
            {answer.summary_text && (
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Quick Summary / خلاصہ:</h4>
                <p>{answer.summary_text}</p>
              </div>
            )}
            
            {/* Full Answer */}
            <div className="prose max-w-none mb-6">
              <div className="whitespace-pre-wrap">{answer.answer_text}</div>
            </div>

            {/* Sources */}
            {answer.sources_used && answer.sources_used.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Sources Referenced / حوالہ جات:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {answer.sources_used.map((source, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Disclaimer / دستبرداری:</strong> This answer is an educational summary and not a formal fatwa. 
                For personal legal religious rulings, consult a qualified scholar. / 
                یہ جواب تعلیمی خلاصہ ہے اور رسمی فتویٰ نہیں۔ ذاتی مذہبی احکام کے لیے کسی اہل عالم سے رجوع کریں۔
              </p>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Generated on {new Date(answer.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No answer available yet. / ابھی تک کوئی جواب دستیاب نہیں ہے۔
            </p>
            <p className="text-sm text-muted-foreground">
              This question may be pending review or processing.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Related Actions */}
      <div className="flex gap-4 justify-center">
        <Link to="/ask">
          <Button>
            Ask Another Question / دوسرا سوال پوچھیں
          </Button>
        </Link>
        <Link to="/topics">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Explore Topics / موضوعات دیکھیں
          </Button>
        </Link>
      </div>
    </div>
  );
}