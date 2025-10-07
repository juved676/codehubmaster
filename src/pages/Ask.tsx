import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingModal } from '@/components/PricingModal';
import { Send, Settings, Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Ask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { creditInfo } = useCredits();
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('english');
  const [experienceLevel, setExperienceLevel] = useState('school');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter your coding question",
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
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
          user_id: user?.id || null,
          title: question.trim().substring(0, 100), // Use first 100 chars as title
          body: question.trim(),
          language: language as any,
          audience_level: experienceLevel as any,
          status: 'draft'
        })
        .select()
        .single();

      if (questionError) throw questionError;

      // Process the question with AI
      const { data: processResult, error: processError } = await supabase.functions
        .invoke('process-question', {
          body: { questionId: questionData.id }
        });

      if (processError) throw processError;

      toast({
        title: "Question Submitted!",
        description: processResult.requires_review 
          ? "Your question is being reviewed by our team"
          : "Your answer is ready!",
      });

      // Redirect to question page
      navigate(`/question/${questionData.id}`);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Sidebar Component
  const PreferencesSidebar = () => (
    <div className="space-y-6">
      {/* Credits Display */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">💳</span>
            Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold gradient-text">
              {creditInfo?.credits_left ?? 6}
            </span>
            <span className="text-muted-foreground">remaining</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Plan: <span className="text-primary font-semibold">{creditInfo?.plan_name || 'Code Free'}</span>
          </div>
          {!creditInfo?.can_ask && (
            <Button 
              onClick={() => setShowPricingModal(true)} 
              className="w-full mt-2"
              variant="default"
            >
              Upgrade Plan
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="english">🇬🇧 English</SelectItem>
                <SelectItem value="hindi">🇮🇳 हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="school">🎓 Beginner</SelectItem>
                <SelectItem value="college">💻 Intermediate</SelectItem>
                <SelectItem value="research">🚀 Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="glass-card border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>• Be specific and detailed</p>
          <p>• Include error messages</p>
          <p>• Mention what you've tried</p>
          <p>• Press Ctrl/Cmd + Enter to send</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-7xl h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-1">
              AI Coding Assistant
            </h1>
            <p className="text-sm text-muted-foreground">
              Ask anything about coding and get instant help
            </p>
          </div>
          
          {/* Mobile sidebar trigger */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <PreferencesSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid lg:grid-cols-[1fr_320px] gap-6 min-h-0">
          {/* Chat Area */}
          <Card className="glass-card border-primary/30 flex flex-col shadow-elegant">
            <CardContent className="flex-1 flex flex-col p-6 gap-4">
              {/* Welcome Message */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-2xl space-y-4">
                  <div className="text-6xl mb-4">🤖</div>
                  <h2 className="text-2xl font-bold">How can I help you today?</h2>
                  <p className="text-muted-foreground">
                    Ask any coding question and get detailed explanations with examples
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 text-left">
                    <button
                      onClick={() => setQuestion("How do I create a function in Python?")}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 bg-card/50 hover:bg-card transition-colors text-sm"
                    >
                      <span className="block font-medium mb-1">Python Basics</span>
                      <span className="text-muted-foreground text-xs">How do I create a function?</span>
                    </button>
                    <button
                      onClick={() => setQuestion("Explain how JavaScript promises work")}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 bg-card/50 hover:bg-card transition-colors text-sm"
                    >
                      <span className="block font-medium mb-1">JavaScript</span>
                      <span className="text-muted-foreground text-xs">Explain promises</span>
                    </button>
                    <button
                      onClick={() => setQuestion("What's the difference between let, const, and var?")}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 bg-card/50 hover:bg-card transition-colors text-sm"
                    >
                      <span className="block font-medium mb-1">Variables</span>
                      <span className="text-muted-foreground text-xs">let vs const vs var</span>
                    </button>
                    <button
                      onClick={() => setQuestion("How do I fix 'undefined is not a function' error?")}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 bg-card/50 hover:bg-card transition-colors text-sm"
                    >
                      <span className="block font-medium mb-1">Debugging</span>
                      <span className="text-muted-foreground text-xs">Fix common errors</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your coding question here... (Ctrl/Cmd + Enter to send)"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary resize-none"
                  disabled={isSubmitting}
                />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {creditInfo?.can_ask ? (
                      <span className="text-accent">✓ Ready to ask</span>
                    ) : (
                      <span className="text-destructive">⚠️ No credits</span>
                    )}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !question.trim()}
                    size="lg"
                    className="gap-2 shadow-neon"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Question'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block overflow-y-auto">
            <PreferencesSidebar />
          </div>
        </div>
      </div>

      <PricingModal open={showPricingModal} onClose={() => setShowPricingModal(false)} />
    </div>
  );
}