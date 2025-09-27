import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export default function Ask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    language: 'english',
    audience: 'school'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.question.trim()) {
      toast({
        title: "Incomplete Form / نامکمل فارم",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert question into database (anonymous or authenticated)
      const { data: question, error: questionError } = await supabase
        .from('questions')
        .insert({
          user_id: user?.id || null, // Allow null for anonymous users
          title: formData.title.trim(),
          body: formData.question.trim(),
          language: formData.language as any,
          audience_level: formData.audience as any,
          status: 'draft'
        })
        .select()
        .single();

      if (questionError) throw questionError;

      // Process the question with AI
      const { data: processResult, error: processError } = await supabase.functions
        .invoke('process-question', {
          body: { questionId: question.id }
        });

      if (processError) throw processError;

      toast({
        title: "Question Submitted! / سوال جمع کر دیا گیا!",
        description: processResult.requires_review 
          ? "Your question is being reviewed by scholars / آپ کا سوال علماء کے جائزے میں ہے"
          : "Your answer is ready! / آپ کا جواب تیار ہے!",
      });

      // Redirect to question page
      navigate(`/question/${question.id}`);

    } catch (error: any) {
      console.error('Error submitting question:', error);
      toast({
        title: "خطا / Error",
        description: error.message || "Failed to submit question",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Remove authentication requirement - allow anonymous questions

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Ask Your Question / اپنا سوال پوچھیں
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Get knowledgeable answers about Islamic studies from our AI assistant, backed by authentic sources
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Submit Your Question / سوال جمع کریں</CardTitle>
          <CardDescription>
            Fill out the form below to get a comprehensive answer to your Islamic studies question.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Question Title * / سوال کا عنوان</Label>
              <Input
                id="title"
                placeholder="What is your main question? / آپ کا بنیادی سوال کیا ہے؟"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            {/* Question Details */}
            <div className="space-y-2">
              <Label htmlFor="question">Question Details * / تفصیلات</Label>
              <Textarea
                id="question"
                placeholder="Please provide detailed context for your question. Include any specific aspects you'd like covered... / براہ کرم اپنے سوال کا تفصیلی پس منظر فراہم کریں۔"
                className="min-h-[120px]"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                required
              />
            </div>

            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Language / ترجیحی زبان</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="urdu">اردو (Urdu)</SelectItem>
                    <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audience Level */}
              <div className="space-y-2">
                <Label>Study Level / تعلیمی سطح</Label>
                <Select value={formData.audience} onValueChange={(value) => handleInputChange("audience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School Level / اسکول (بنیادی)</SelectItem>
                    <SelectItem value="college">College Level / کالج (درمیانی)</SelectItem>
                    <SelectItem value="research">Research Level / تحقیقی (اعلیٰ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Processing... / پروسیسنگ...' : 'Submit Question / سوال جمع کریں'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="mt-8 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Guidelines / رہنمائی:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific and include context for better answers</li>
            <li>• Complex theological questions may require human review</li>
            <li>• Answers are educational summaries, not formal religious rulings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}