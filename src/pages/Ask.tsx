import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingModal } from '@/components/PricingModal';
import { Send, Settings, Menu, X, Sparkles, Bot, Cpu, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SEO } from '@/components/SEO';

interface ChatMessage {
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export default function Ask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { creditInfo, refetch: refetchCredits } = useCredits();
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('english');
  const [experienceLevel, setExperienceLevel] = useState('school');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleExperienceLevelChange = (value: string) => {
    // Check if user is trying to select intermediate or advanced without premium
    if ((value === 'college' || value === 'research') && !creditInfo?.is_premium) {
      setShowPricingModal(true);
      toast.error("Premium Plan Required", {
        description: "Intermediate and Advanced options require a paid plan"
      });
      return;
    }
    setExperienceLevel(value);
  };

  const handleLanguageChange = (value: string) => {
    // Show pricing modal when changing language to inform about plans
    if (value !== 'english' && !creditInfo?.is_premium) {
      setShowPricingModal(true);
    }
    setLanguage(value);
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (creditInfo && !creditInfo.can_ask) {
      setShowPricingModal(true);
      toast.error("Credits Required", {
        description: creditInfo.message || "Please upgrade to continue asking questions"
      });
      return;
    }

    setIsSubmitting(true);

    // Add question to chat immediately
    setChatHistory(prev => [...prev, {
      type: 'question',
      content: question,
      timestamp: new Date()
    }]);

    const currentQuestion = question;
    setQuestion("");

    const attemptSubmission = async (retryCount = 0): Promise<void> => {
      try {
        const questionData = {
          title: currentQuestion.substring(0, 100),
          body: currentQuestion,
          language: language as 'english' | 'urdu' | 'arabic',
          audience_level: experienceLevel as 'school' | 'college' | 'research',
          user_id: user?.id || null,
          status: 'pending_review' as const,
        };

        const { data: newQuestion, error: questionError } = await supabase
          .from('questions')
          .insert([questionData])
          .select()
          .single();

        if (questionError) {
          console.error('Question insert error:', questionError);
          throw new Error("I'm here to help with coding! Could you please try asking your question again?");
        }

        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          'process-question',
          {
            body: { questionId: newQuestion.id }
          }
        );

        if (functionError) {
          console.error('Function error:', functionError);
          
          if (retryCount < 2 && (functionError.message?.includes('timeout') || functionError.message?.includes('temporarily'))) {
            toast.info(`Working on your answer... (Attempt ${retryCount + 2}/3)`, {
              description: "Complex questions may take longer",
              duration: 3000
            });
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return attemptSubmission(retryCount + 1);
          }
          
          throw new Error("Let me help you with that. Could you try asking your question differently? Make sure it's clear and specific about what coding help you need.");
        }

        if (functionData?.error) {
          if (functionData.retry && retryCount < 2) {
            toast.info(`Working on your answer... (Attempt ${retryCount + 2}/3)`, {
              description: "Complex questions may take longer",
              duration: 3000
            });
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return attemptSubmission(retryCount + 1);
          }
          throw new Error("I'm ready to help! Could you please rephrase your coding question? Try to be specific about what you're trying to achieve.");
        }

        // Fetch the answer and add to chat
        if (functionData?.answer_id) {
          const { data: answerData } = await supabase
            .from('answers')
            .select('answer_text, sources_used')
            .eq('id', functionData.answer_id)
            .single();

          if (answerData) {
            const sources = Array.isArray(answerData.sources_used) 
              ? answerData.sources_used.map(s => String(s))
              : [];
              
            setChatHistory(prev => [...prev, {
              type: 'answer',
              content: answerData.answer_text,
              timestamp: new Date(),
              sources
            }]);
          }
        }

        await refetchCredits();
        toast.success("Answer generated successfully!");
      } catch (err) {
        console.error('Submission error:', err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : "I'm here to help with coding! Could you please rephrase your question?";
        toast.error(errorMessage, {
          description: "I support Python, Web Dev, AI/ML, JavaScript & more",
          duration: 5000
        });
        
        // Remove the question from chat on error
        setChatHistory(prev => prev.slice(0, -1));
        setQuestion(currentQuestion);
        throw err;
      }
    };

    try {
      await attemptSubmission();
    } catch {
      // Error already handled in attemptSubmission
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
              {creditInfo?.credits_left ?? 5}
            </span>
            <span className="text-muted-foreground">remaining</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Plan: <span className="text-primary font-semibold">{creditInfo?.plan_name || 'Code Free'}</span>
          </div>
          {creditInfo?.subscription_expires && (() => {
            const expiresAt = new Date(creditInfo.subscription_expires);
            const now = new Date();
            return expiresAt < now ? (
              <div className="text-xs text-center text-destructive mt-2">
                Plan expired - Renew to continue
              </div>
            ) : null;
          })()}
          {!creditInfo?.can_ask && (
            <Button 
              onClick={() => setShowPricingModal(true)} 
              className="w-full mt-2"
              variant="default"
            >
              {creditInfo?.is_premium ? 'Renew Plan' : 'Upgrade Plan'}
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
            <Select value={language} onValueChange={handleLanguageChange}>
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
            <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="school">🎓 Beginner</SelectItem>
                <SelectItem value="college" disabled={!creditInfo?.is_premium}>
                  💻 Intermediate {!creditInfo?.is_premium && "🔒"}
                </SelectItem>
                <SelectItem value="research" disabled={!creditInfo?.is_premium}>
                  🚀 Advanced {!creditInfo?.is_premium && "🔒"}
                </SelectItem>
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
    <>
      <SEO 
        title="AI Coding Assistant - Instant Python & JavaScript Help | CodeHubMaster"
        description="Ask any programming question to our advanced AI and get instant, intelligent code solutions. AI-powered Python, JavaScript, React, and web development help with automated code generation."
        keywords="AI coding assistant, AI programming help, artificial intelligence coding, GPT code generator, automated coding, intelligent programming, AI developer tools, machine learning code"
        canonical="https://codehubmaster.lovable.app/ask"
        isAIContent={true}
        faqData={[
          { question: "What is an AI coding assistant?", answer: "An AI coding assistant uses artificial intelligence and machine learning to understand your programming questions and generate intelligent code solutions instantly." },
          { question: "How does AI-powered coding help work?", answer: "Our advanced AI analyzes your question, understands the context, and generates accurate code solutions with explanations using machine learning models." },
          { question: "What programming languages does the AI support?", answer: "Our AI assistant supports Python, JavaScript, React, HTML, CSS, SQL, and many more programming languages and frameworks with intelligent code generation." }
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "AI Assistant", url: "https://codehubmaster.lovable.app/ask" }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-6 max-w-7xl h-screen flex flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-3 py-1 mb-2">
                <Bot className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary">AI-Powered</span>
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-1">
                AI Coding Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Get instant AI-generated code solutions and intelligent debugging help
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
              <CardContent className="flex-1 flex flex-col p-6 gap-4 overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                  {chatHistory.length === 0 ? (
                    /* Welcome Message */
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center max-w-2xl space-y-4">
                        <div className="flex justify-center gap-2">
                          <Bot className="h-12 w-12 text-primary" />
                          <Cpu className="h-12 w-12 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold">AI Coding Assistant Ready</h2>
                        <p className="text-muted-foreground">
                          Ask any coding question and get intelligent AI-generated solutions with detailed explanations
                        </p>
                        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-3 py-1">
                          <Zap className="h-3 w-3 text-accent" />
                          <span className="text-xs font-medium text-accent">Powered by Advanced AI</span>
                        </div>
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
                  ) : (
                    /* Chat Messages */
                    chatHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'question' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <div className="whitespace-pre-wrap break-words">{message.content}</div>
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border/50 text-xs">
                              <p className="font-semibold mb-1">Sources:</p>
                              <ul className="list-disc list-inside space-y-0.5">
                                {message.sources.map((source, idx) => (
                                  <li key={idx}>{source}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isSubmitting && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span>Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your coding question here... (Ctrl/Cmd + Enter to send)"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[80px] bg-background/50 border-border/50 focus:border-primary resize-none"
                    disabled={isSubmitting}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {creditInfo?.credits_left !== undefined && (
                        <span className="font-medium">
                          {creditInfo.credits_left} credits remaining
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !question.trim()}
                      className="bg-gradient-primary hover:shadow-neon"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Ask Question
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <PreferencesSidebar />
            </div>
          </div>
        </div>

        <PricingModal 
          open={showPricingModal} 
          onClose={() => setShowPricingModal(false)}
        />
      </div>
    </>
  );
}
