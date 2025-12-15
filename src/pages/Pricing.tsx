import React, { useState, useEffect } from 'react';
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
        title="Affordable Python Courses Pricing - Learn Programming from ₹99 | CodeHubMaster"
        description="Best affordable Python programming courses starting at just ₹99. Learn coding with AI-powered tutorials. Flexible pricing plans for students and developers in India, US, UK."
        keywords="coding course pricing, python course price, affordable programming courses, learn python cheap, online coding classes, best python course, programming tutorial pricing"
        canonical="https://codehubmaster.lovable.app/pricing"
        faqData={[
          { question: "How much does a coding course cost?", answer: "Our courses start at just ₹99 for Code Pro plan with 50 questions. Code Advance offers 999 questions for ₹499." },
          { question: "Is there a free plan available?", answer: "Yes! Code Free plan offers 5 free questions per 10-day period (15 questions per month) at no cost." },
          { question: "What payment methods are accepted?", answer: "We accept all major payment methods through Razorpay including UPI, Credit/Debit Cards, Net Banking, and Wallets." }
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://codehubmaster.lovable.app" },
          { name: "Pricing", url: "https://codehubmaster.lovable.app/pricing" }
        ]}
      />
      
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-gradient-accent text-white px-8 py-3 rounded-full text-sm font-bold mb-8 shadow-neon animate-fade-in">
          <Clock className="w-5 h-5" />
          Limited Time Offer - Save Up to 90% on Coding Courses
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text animate-fade-in">
          Affordable Coding Course Pricing Plans
        </h1>
        
        <p className="text-xl md:text-2xl text-primary font-semibold max-w-3xl mx-auto mb-4 animate-fade-in">
          Learn Python Programming, Web Development & AI at Low Cost
        </p>

        <div className="flex items-center justify-center gap-3 text-base text-muted-foreground animate-fade-in">
          <CreditCard className="w-5 h-5 text-accent" />
          <span>Pay securely with Razorpay - UPI, Cards, Net Banking & Wallets</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {plans.map((plan, index) => {
          const discount = calculateDiscount(plan.original_price, plan.discounted_price);
          const isAdvance = plan.name === 'Code Advance';
          
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
                  BEST VALUE - SAVE ₹4,500
                </div>
              )}
              
              <CardHeader className={isAdvance ? 'pt-16' : 'pt-8'}>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-3xl font-bold gradient-text">{plan.name}</CardTitle>
                  {discount > 0 && (
                    <Badge className="bg-destructive text-white px-3 py-1 font-bold shadow-neon">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-primary">
                      ₹{plan.discounted_price}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{plan.original_price}
                    </span>
                  </div>
                  <CardDescription className="text-base">
                    {plan.name === 'Code Pro' 
                      ? '50 questions for 30 days' 
                      : plan.name === 'Code Advance'
                      ? '999 questions for 40 days'
                      : '5 questions per 10-day period (15/month)'}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full text-lg py-6 ${
                    isAdvance
                      ? 'bg-gradient-accent hover:shadow-neon'
                      : 'bg-gradient-primary hover:shadow-neon'
                  }`}
                  size="lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="relative text-center">
        <h2 className="text-4xl font-bold mb-12 gradient-text">Why Choose CodeHub Premium Coding Courses?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 rounded-2xl hover-lift group">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Expert Answers</h3>
            <p className="text-muted-foreground">
              Get detailed coding help with practical examples and best practices
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-lift group">
            <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-accent">Instant Help</h3>
            <p className="text-muted-foreground">
              Get immediate answers to programming questions 24/7
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-lift group">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Easy Payment</h3>
            <p className="text-muted-foreground">
              Secure Razorpay payments - UPI, Cards, Net Banking & Wallets supported
            </p>
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