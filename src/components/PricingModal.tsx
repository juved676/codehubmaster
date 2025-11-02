import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, CreditCard, Smartphone, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Plan {
  id: string;
  name: string;
  original_price: number;
  discounted_price: number;
  credits_per_period: number;
  features: string[];
  is_popular: boolean;
}

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export function PricingModal({ open, onClose }: PricingModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [razorpayLink] = useState('https://razorpay.me/@afsana9249');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchPlans();
    }
  }, [open]);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('discounted_price');

      if (error) throw error;
      
      // Map and reorder plans
      const mappedPlans = (data || []).map(plan => {
        let displayName = plan.name;
        if (plan.name.includes('ILM Free')) displayName = 'Code Free';
        else if (plan.name.includes('ILM Advance')) displayName = 'Code Advance';
        else if (plan.name.includes('ILM Pro') || plan.name.includes('Code Pro')) displayName = 'Code Pro';
        
        return { ...plan, name: displayName };
      });

      // Reorder: Code Advance, Code Pro, Code Free
      const reordered = [
        ...mappedPlans.filter(p => p.name === 'Code Advance'),
        ...mappedPlans.filter(p => p.name === 'Code Pro'),
        ...mappedPlans.filter(p => p.name === 'Code Free')
      ];

      setPlans(reordered);
    } catch (error) {
      console.error('Error fetching plans:', error);
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
    setShowPayment(true);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !user) return;

    try {
      setPaymentLoading(true);

      const { data, error } = await supabase.rpc('initiate_upi_payment', {
        user_uuid: user.id,
        plan_uuid: selectedPlan.id
      });

      if (error) throw error;

      const responseData = data as any;
      if (responseData.success) {
        // Open Razorpay payment link - user will enter amount manually
        window.open(razorpayLink, '_blank');

        setShowPayment(false);
        onClose();
        
        toast({
          title: "Payment Link Opened",
          description: `Please pay ₹${selectedPlan.discounted_price} on Razorpay. After payment, go to Verify Payment page to activate your subscription.`,
        });

        // Redirect to verify payment page after 2 seconds
        setTimeout(() => {
          window.location.href = '/verify-payment';
        }, 2000);
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

  if (showPayment && selectedPlan) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Pay securely using Razorpay to activate your {selectedPlan.name} plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center p-8 glass-card rounded-2xl">
              <div className="text-4xl font-extrabold gradient-text mb-3">
                ₹{selectedPlan.discounted_price}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedPlan.name} - {selectedPlan.credits_per_period} questions per period
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
                After payment, contact support with your Razorpay payment ID for instant activation
              </p>
              
              <Button
                onClick={() => setShowPayment(false)}
                variant="outline"
                className="w-full"
              >
                Back to Plans
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text text-center">
            Upgrade to Continue Learning
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            You've used all your free questions. Choose a plan to keep learning!
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 py-6">
            {plans.filter(p => p.name !== 'Code Free').map((plan, index) => {
              const discount = calculateDiscount(plan.original_price, plan.discounted_price);
              const isAdvance = plan.name === 'Code Advance';
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden glass-card hover-lift ${
                    isAdvance
                      ? 'border-accent/50 shadow-neon scale-105' 
                      : 'border-primary/20'
                  }`}
                >
                  {isAdvance && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-accent text-white text-center py-2 text-sm font-bold">
                      <Star className="inline w-4 h-4 mr-1" />
                      BEST VALUE - SAVE ₹4,500
                    </div>
                  )}
                  
                  <CardHeader className={isAdvance ? 'pt-12' : 'pt-6'}>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-2xl font-bold gradient-text">{plan.name}</CardTitle>
                      {discount > 0 && (
                        <Badge className="bg-destructive text-white px-2 py-1 font-bold">
                          {discount}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-primary">
                          ₹{plan.discounted_price}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{plan.original_price}
                        </span>
                      </div>
                      <CardDescription>
                        {plan.name === 'Code Pro' 
                          ? '50 questions for 30 days' 
                          : plan.name === 'Code Advance'
                          ? '999 questions for 40 days'
                          : '6 questions per 10-day period'}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full ${
                        isAdvance
                          ? 'bg-gradient-accent hover:shadow-neon'
                          : 'bg-gradient-primary'
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
        )}
      </DialogContent>
    </Dialog>
  );
}
