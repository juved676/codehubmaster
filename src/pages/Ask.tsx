import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { PricingModal } from '@/components/PricingModal';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { toast } from '@/hooks/use-toast';

export default function Ask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { creditInfo } = useCredits();
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    language: 'english',
    audience: 'school'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.question.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check if user has credits available
    if (creditInfo && !creditInfo.can_ask) {
      setShowPricingModal(true);
      toast({
        title: "No Credits Available",
        description: "Please upgrade your plan to continue asking questions",
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
        title: "Question Submitted!",
        description: processResult.requires_review 
          ? "Your question is being reviewed by our team"
          : "Your answer is ready!",
      });

      // Redirect to question page
      navigate(`/question/${question.id}`);

    } catch (error: any) {
      console.error('Error submitting question:', error);
      toast({
        title: "Error",
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
          Get AI Coding Help
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Describe your coding challenge and get detailed explanations, working examples, and debugging guidance from our AI instructor
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Describe Your Coding Challenge</CardTitle>
              <CardDescription>
                Our AI will provide detailed explanations, code examples, debugging tips, and learning resources.
              </CardDescription>
            </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Question Title *</Label>
              <Input
                id="title"
                placeholder="What is your coding question? e.g., How do I use Python lists?"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            {/* Question Details */}
            <div className="space-y-2">
              <Label htmlFor="question">Question Details *</Label>
              <Textarea
                id="question"
                placeholder="Describe your coding problem or what you want to learn. Include any error messages or code snippets if relevant..."
                className="min-h-[120px]"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                required
              />
            </div>

            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audience Level */}
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select value={formData.audience} onValueChange={(value) => handleInputChange("audience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">Beginner (Just Starting)</SelectItem>
                    <SelectItem value="college">Intermediate (Some Experience)</SelectItem>
                    <SelectItem value="research">Advanced (Experienced Developer)</SelectItem>
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
              {isSubmitting ? 'Processing...' : 'Submit Question'}
            </Button>
          </form>
        </CardContent>
          </Card>
        </div>

        {/* Credits Sidebar */}
        <div className="lg:col-span-1">
          <CreditsDisplay />
          
          {/* Quick Tips */}
          <Card className="mt-6 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Be specific and include error messages</p>
              <p>• Mention what you've already tried</p>
              <p>• Include relevant code if needed</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guidelines */}
      <Card className="mt-8 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Guidelines:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific and include error messages or code snippets</li>
            <li>• Complex projects may require human review</li>
            <li>• Answers are educational - always test code in your own environment</li>
          </ul>
        </CardContent>
      </Card>

      {/* Pricing Modal */}
      <PricingModal open={showPricingModal} onClose={() => setShowPricingModal(false)} />
    </div>
  );
}