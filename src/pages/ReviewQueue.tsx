import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Edit, Clock, AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface AnswerForReview {
  id: string;
  answer_text: string;
  summary_text: string;
  confidence_score: number;
  created_at: string;
  questions: {
    id: string;
    title: string;
    body: string;
    language: string;
    audience_level: string;
  };
}

export default function ReviewQueue() {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerForReview[]>([]);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [reviewNotes, setReviewNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      checkUserRole();
      fetchAnswersForReview();
    }
  }, [user]);

  const checkUserRole = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setUserRole(profile?.role);
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const fetchAnswersForReview = async () => {
    try {
      const { data, error } = await supabase
        .from('answers')
        .select(`
          id,
          answer_text,
          summary_text,
          confidence_score,
          created_at,
          questions:questions!answers_question_id_fkey (
            id,
            title,
            body,
            language,
            audience_level
          )
        `)
        .eq('requires_review', true)
        .eq('published', false)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setAnswers(data || []);
    } catch (error) {
      console.error('Error fetching answers for review:', error);
      toast({
        title: "خطا / Error",
        description: "Could not load answers for review",
        variant: "destructive",
      });
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleReview = async (answerId: string, verdict: 'approve' | 'reject' | 'edit') => {
    if (!user) return;

    try {
      // Create review record
      await supabase
        .from('reviews')
        .insert({
          answer_id: answerId,
          reviewer_id: user.id,
          verdict: verdict,
          notes: reviewNotes[answerId] || ''
        });

      // Update answer based on verdict
      const updateData: any = {
        requires_review: false
      };

      if (verdict === 'approve') {
        updateData.published = true;
        
        // Also update question status to published
        const answer = answers.find(a => a.id === answerId);
        if (answer) {
          await supabase
            .from('questions')
            .update({ status: 'published' })
            .eq('id', answer.questions.id);
        }
      } else if (verdict === 'reject') {
        updateData.published = false;
      }

      await supabase
        .from('answers')
        .update(updateData)
        .eq('id', answerId);

      // Log the review action
      await supabase
        .from('logs')
        .insert({
          event_type: 'answer_reviewed',
          details: {
            answer_id: answerId,
            verdict: verdict,
            reviewer_id: user.id
          },
          user_id: user.id
        });

      toast({
        title: "Review Completed / جائزہ مکمل",
        description: `Answer has been ${verdict}d / جواب ${verdict === 'approve' ? 'منظور' : verdict === 'reject' ? 'مسترد' : 'ترمیم'} کیا گیا`,
      });

      // Remove from current list
      setAnswers(answers.filter(a => a.id !== answerId));
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "خطا / Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole !== 'reviewer' && userRole !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied / رسائی مسترد</h1>
        <p className="text-muted-foreground mb-4">
          You need reviewer or admin privileges to access this page. / 
          اس صفحہ تک رسائی کے لیے آپ کو جائزہ کار یا ایڈمن اختیارات کی ضرورت ہے۔
        </p>
        <Button onClick={() => window.history.back()}>Go Back / واپس جائیں</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Queue / جائزہ کی فہرست</h1>
        <p className="text-muted-foreground">
          Review AI-generated answers before publication / اشاعت سے پہلے AI کے جوابات کا جائزہ لیں
        </p>
      </div>

      {loadingAnswers ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      ) : answers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">All Caught Up! / سب کچھ مکمل!</h2>
            <p className="text-muted-foreground">
              No answers pending review at the moment. / فی الوقت کوئی جواب جائزے کے منتظر نہیں ہے۔
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {answers.map((answer) => (
            <Card key={answer.id} className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      {answer.questions.title}
                    </CardTitle>
                    <CardDescription className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">{answer.questions.language}</Badge>
                      <Badge variant="outline">{answer.questions.audience_level}</Badge>
                      {answer.confidence_score && (
                        <Badge variant="destructive">
                          Confidence: {Math.round(answer.confidence_score * 100)}%
                        </Badge>
                      )}
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {new Date(answer.created_at).toLocaleDateString()}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div>
                  <h4 className="font-semibold mb-2">Original Question / اصل سوال:</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{answer.questions.body}</p>
                  </div>
                </div>

                {/* AI Answer */}
                <div>
                  <h4 className="font-semibold mb-2">AI Generated Answer / AI کا جواب:</h4>
                  
                  {/* Summary */}
                  {answer.summary_text && (
                    <div className="bg-primary/5 p-3 rounded-lg mb-3">
                      <h5 className="font-medium mb-1">Summary / خلاصہ:</h5>
                      <p className="text-sm">{answer.summary_text}</p>
                    </div>
                  )}
                  
                  {/* Full Answer */}
                  <div className="bg-background border rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{answer.answer_text}</p>
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <h4 className="font-semibold mb-2">Review Notes / جائزہ کے نوٹس:</h4>
                  <Textarea
                    placeholder="Add your review comments here... / یہاں اپنے جائزہ کے تبصرے شامل کریں..."
                    value={reviewNotes[answer.id] || ''}
                    onChange={(e) => setReviewNotes({
                      ...reviewNotes,
                      [answer.id]: e.target.value
                    })}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Review Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleReview(answer.id, 'approve')}
                    className="flex-1"
                    variant="default"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve / منظور کریں
                  </Button>
                  <Button
                    onClick={() => handleReview(answer.id, 'edit')}
                    className="flex-1"
                    variant="secondary"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Needs Edit / ترمیم ضروری
                  </Button>
                  <Button
                    onClick={() => handleReview(answer.id, 'reject')}
                    className="flex-1"
                    variant="destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject / مسترد کریں
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}