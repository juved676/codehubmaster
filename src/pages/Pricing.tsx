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
  const [upiId, setUpiId] = useState('your-fampay-upi@paytm'); // Your Fampay UPI ID
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
      setPlans(data || []);
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
        // Generate UPI deep link
        const upiLink = `upi://pay?pa=${upiId}&pn=CodeHub&am=${selectedPlan.discounted_price}&cu=INR&tn=CodeHub ${selectedPlan.name} Subscription Payment ID: ${responseData.payment_id}`;
        
        // Try to open UPI app
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/)) {
          window.location.href = upiLink;
        } else {
          // For desktop, show QR code or payment instructions
          toast({
            title: "Payment Initiated",
            description: `Please pay ₹${selectedPlan.discounted_price} to UPI ID: ${upiId} with reference: ${responseData.payment_id}`,
          });
        }

        setShowPaymentDialog(false);
        
        // Show success message with manual verification option
        toast({
          title: "Payment Initiated",
          description: "After completing payment, please contact support with your transaction ID for verification.",
        });
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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-accent text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
          <Clock className="w-4 h-4" />
          Limited Time Offer - Massive Discounts!
        </div>
        
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Choose Your Coding Learning Plan
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant help with Python, Web Development, Data Science & AI/ML from our AI coding assistant
          </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Smartphone className="w-4 h-4" />
          <span>Pay securely with Fampay UPI - Instant activation</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {plans.map((plan) => {
          const discount = calculateDiscount(plan.original_price, plan.discounted_price);
          
          return (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-elegant ${
                plan.is_popular 
                  ? 'border-primary shadow-glow scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-accent text-white text-center py-2 text-sm font-medium">
                  <Star className="inline w-4 h-4 mr-1" />
                  MOST POPULAR - SAVE {discount}%
                </div>
              )}
              
              <CardHeader className={plan.is_popular ? 'pt-12' : 'pt-6'}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-islamic-emerald">{plan.name}</CardTitle>
                  {discount > 0 && (
                    <Badge variant="destructive" className="bg-red-500">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-islamic-emerald">
                      ₹{plan.discounted_price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{plan.original_price}
                    </span>
                  </div>
                  <CardDescription>
                    {plan.credits_per_period} questions per 10-day period
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-islamic-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${
                    plan.is_popular
                      ? 'bg-gradient-primary hover:opacity-90'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8">Why Choose CodeHub Premium?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Expert Answers</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed coding help with practical examples and best practices
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Instant Help</h3>
            <p className="text-sm text-muted-foreground">
              Get immediate answers to programming questions 24/7
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Easy Payment</h3>
            <p className="text-sm text-muted-foreground">
              Secure UPI payments with Fampay - activate instantly
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
              Pay securely using UPI to activate your {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-islamic-emerald mb-2">
                ₹{selectedPlan?.discounted_price}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedPlan?.name} - {selectedPlan?.credits_per_period} questions per period
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="upi-id">UPI ID for Payment</Label>
              <Input
                id="upi-id"
                value={upiId}
                readOnly
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                You will be redirected to your UPI app to complete the payment
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full bg-gradient-primary"
                size="lg"
              >
                {paymentLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <Smartphone className="w-4 h-4 mr-2" />
                )}
                Pay with UPI
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                After payment, contact support with your transaction ID for instant activation
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;