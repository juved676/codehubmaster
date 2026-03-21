import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Clock, CreditCard, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';

interface Plan {
  id: string;
  name: string;
  original_price: number;
  discounted_price: number;
  credits_per_period: number;
  features: string[];
  is_popular: boolean;
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [razorpayLink] = useState('https://razorpay.me/@afsana9249');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('discounted_price');

      if (error) throw error;
      
      // Map plan names to new branding
      const mappedPlans = (data || []).map(plan => {
        let displayName = plan.name;
        if (plan.name.includes('ILM Free')) displayName = 'Code Free';
        else if (plan.name.includes('ILM Advance')) displayName = 'Code Advance';
        else if (plan.name.includes('ILM Pro') || plan.name.includes('Code Pro')) displayName = 'Code Pro';
        
        return { ...plan, name: displayName };
      });

      // Reorder: Code Advance first (most popular), then Code Pro, then Code Free
      const reordered = [
        ...mappedPlans.filter(p => p.name === 'Code Advance'),
        ...mappedPlans.filter(p => p.name === 'Code Pro'),
        ...mappedPlans.filter(p => p.name === 'Code Free')
      ];

      setPlans(reordered);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load pricing plans",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase a subscription plan",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !user) return;

    try {
      setPaymentLoading(true);

      // Create payment record
      const { data, error } = await supabase.rpc('initiate_upi_payment', {
        user_uuid: user.id,
        plan_uuid: selectedPlan.id
      });

      if (error) throw error;

      const responseData = data as any;
      if (responseData.success) {
        // Open Razorpay payment link - user will enter amount manually
        window.open(razorpayLink, '_blank');

        setShowPaymentDialog(false);
        
        // Show success message with manual verification option
        toast({
          title: "Payment Link Opened 🎉",
          description: `Please pay ₹${selectedPlan.discounted_price} on Razorpay. After payment, you'll receive a Payment ID via SMS/Email. Enter it on the Verify Payment page to activate instantly!`,
        });

        // Redirect to verify payment page after 3 seconds
        setTimeout(() => {
          window.location.href = '/verify-payment';
        }, 3000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Free AI Coding Assistant - Compare Plans & Pricing | CodeHubMaster"
        description="Get free AI-powered coding help with our Code Free plan. Compare our affordable pricing: Free plan (15 questions/month), Pro (₹99), and Advance (₹499). Start learning Python, JavaScript, and more today!"
        keywords="free AI coding assistant, coding course pricing, python course free, learn programming free, AI code helper free, affordable coding courses, code assistant pricing"
        canonical="https://codehubmaster.site/pricing"
        faqData={[
          { question: "Is CodeHubMaster really free?", answer: "Yes! Our Code Free plan gives you 15 AI-powered coding questions per month at absolutely no cost. No credit card required." },
          { question: "What do I get for free?", answer: "Free users get: 5 questions every 10 days (15/month), AI-powered answers with code examples, access to all programming topics including Python, JavaScript, and more." },
          { question: "How is CodeHubMaster different from ChatGPT?", answer: "CodeHubMaster is specialized for coding education with structured explanations, best practices, and practical code examples tailored for learning." },
          { question: "Can I cancel anytime?", answer: "Yes, all plans are flexible. You can cancel, upgrade, or downgrade at any time with no hidden fees." }
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.site" },
          { name: "Pricing", url: "https://codehubmaster.site/pricing" }
        ]}
      />
      
      <div className="min-h-screen py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
      
        {/* Hero Section */}
        <div className="relative text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-600 dark:text-green-400 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-green-500/30">
            <Check className="w-4 h-4" />
            Start Free - No Credit Card Required
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 gradient-text">
            Learn to Code with Free AI Assistance
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Get instant AI-powered answers to your coding questions. Start with 15 free questions per month, upgrade anytime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Python, JavaScript, React & more
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Instant AI responses
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Code examples included
            </span>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 gradient-text">Quick Plan Comparison</h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/10">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Code Free</th>
                  <th className="text-center p-4 font-semibold bg-accent/20">Code Advance ⭐</th>
                  <th className="text-center p-4 font-semibold">Code Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-medium">Price</td>
                  <td className="text-center p-4 text-green-600 font-bold">FREE</td>
                  <td className="text-center p-4 bg-accent/10 text-primary font-bold">₹499</td>
                  <td className="text-center p-4">₹99</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">AI Questions</td>
                  <td className="text-center p-4">15/month</td>
                  <td className="text-center p-4 bg-accent/10 font-semibold">999/40 days</td>
                  <td className="text-center p-4">50/30 days</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">AI Models</td>
                  <td className="text-center p-4">GPT-4</td>
                  <td className="text-center p-4 bg-accent/10">GPT-4, Claude, Gemini</td>
                  <td className="text-center p-4">GPT-4, Claude</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Code Examples</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4 bg-accent/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Priority Support</td>
                  <td className="text-center p-4 text-muted-foreground">—</td>
                  <td className="text-center p-4 bg-accent/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => {
            const discount = calculateDiscount(plan.original_price, plan.discounted_price);
            const isAdvance = plan.name === 'Code Advance';
            const isFree = plan.name === 'Code Free';
            
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden glass-card hover-lift animate-fade-in ${
                  isAdvance
                    ? 'border-accent/50 shadow-neon scale-105' 
                    : 'border-primary/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isAdvance && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-accent text-white text-center py-3 text-sm font-bold shadow-neon">
                    <Star className="inline w-5 h-5 mr-2" />
                    MOST POPULAR - BEST VALUE
                  </div>
                )}
                
                <CardHeader className={isAdvance ? 'pt-16' : 'pt-8'}>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-3xl font-bold gradient-text">{plan.name}</CardTitle>
                    {discount > 0 && !isFree && (
                      <Badge className="bg-destructive text-white px-3 py-1 font-bold shadow-neon">
                        {discount}% OFF
                      </Badge>
                    )}
                    {isFree && (
                      <Badge className="bg-green-500 text-white px-3 py-1 font-bold">
                        FREE
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-extrabold text-primary">
                        {isFree ? 'Free' : `₹${plan.discounted_price}`}
                      </span>
                      {!isFree && (
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{plan.original_price}
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-base font-medium">
                      {plan.name === 'Code Pro' 
                        ? '50 AI questions for 30 days' 
                        : plan.name === 'Code Advance'
                        ? '999 AI questions for 40 days'
                        : '15 free questions per month'}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">What you get:</h4>
                    <ul className="space-y-2 text-sm">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full text-lg py-6 ${
                      isAdvance
                        ? 'bg-gradient-accent hover:shadow-neon'
                        : isFree
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-primary hover:shadow-neon'
                    }`}
                    size="lg"
                  >
                    {isFree ? (
                      <>Start Free Now</>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Get {plan.name}
                      </>
                    )}
                  </Button>
                  
                  {isFree && (
                    <p className="text-xs text-center text-muted-foreground">
                      No credit card required
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="relative max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Is CodeHubMaster really free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Our Code Free plan gives you 15 AI-powered coding questions per month at absolutely no cost. 
                  No credit card required, no hidden fees. Just sign up and start asking questions about Python, 
                  JavaScript, React, or any programming topic.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">What do I get for free?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    5 AI-powered questions every 10 days (15 per month)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Answers with working code examples
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Access to all programming topics (Python, JavaScript, SQL, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Step-by-step explanations
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">How is this different from ChatGPT?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  CodeHubMaster is specialized for coding education. While ChatGPT is a general-purpose AI, 
                  we focus specifically on programming with structured explanations, best practices, 
                  and educational code examples tailored for learners. Our responses include context-aware 
                  suggestions and practical implementations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! All our plans are flexible. You can upgrade from Free to Pro or Advance at any time 
                  to get more questions. There are no long-term commitments or hidden cancellation fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative text-center mb-16">
          <h2 className="text-3xl font-bold mb-12 gradient-text">Why 50,000+ Developers Choose CodeHubMaster</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Production-Ready Code</h3>
              <p className="text-muted-foreground">
                Get working code examples with best practices, not just theory. Copy, paste, and use immediately.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-accent">2-Second Responses</h3>
              <p className="text-muted-foreground">
                Get instant answers to your coding questions. No waiting, no scheduling, available 24/7.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl hover-lift group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Secure Payments</h3>
              <p className="text-muted-foreground">
                Pay securely with Razorpay - UPI, Cards, Net Banking & Wallets all supported.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="glass-card p-8 rounded-2xl border-primary/30">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to Start Learning?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of developers improving their coding skills with AI assistance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link to="/ask">
                  Start Free Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/topics">
                  Explore Tutorials
                </Link>
              </Button>
            </div>
          </div>
        </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Pay securely using Razorpay to activate your {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center p-8 glass-card rounded-2xl">
              <div className="text-4xl font-extrabold gradient-text mb-3">
                ₹{selectedPlan?.discounted_price}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedPlan?.name} - {selectedPlan?.credits_per_period} questions per period
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="razorpay-link">Razorpay Payment Link</Label>
              <Input
                id="razorpay-link"
                value={razorpayLink}
                readOnly
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Pay securely using Razorpay - Supports UPI, Cards, Net Banking & Wallets
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full bg-gradient-primary hover:shadow-neon"
                size="lg"
              >
                {paymentLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                Pay with Razorpay
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-3">
                💡 After payment, you'll receive a Payment ID via SMS/Email. Enter it on the Verify Payment page for instant activation (valid for 24 hours).
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
};

export default Pricing;