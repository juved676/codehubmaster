import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, XCircle, CreditCard } from 'lucide-react';

interface PendingPayment {
  id: string;
  amount: number;
  created_at: string;
  payment_status: string;
  subscription_plans: {
    name: string;
  };
}

export default function VerifyPayment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState('');
  const [razorpayRef, setRazorpayRef] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchPendingPayments();
  }, [user, navigate]);

  const fetchPendingPayments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('payments')
        .select('id, amount, created_at, payment_status, subscription_plans(name)')
        .eq('user_id', user.id)
        .eq('payment_status', 'pending')
        .gt('amount', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Remove duplicates based on payment ID
      const uniquePayments = data ? Array.from(
        new Map(data.map(item => [item.id, item])).values()
      ) : [];
      
      setPendingPayments(uniquePayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!selectedPaymentId || !razorpayRef.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your Razorpay payment ID",
        variant: "destructive"
      });
      return;
    }

    try {
      setVerifying(true);

      // Call verify-payment edge function
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          payment_id: selectedPaymentId,
          upi_ref: razorpayRef.trim(),
          status: 'completed',
          auto_upgrade: true
        }
      });

      if (error) throw error;

      const responseData = data as any;
      
      if (responseData.success) {
        toast({
          title: "Payment Verified! 🎉",
          description: responseData.subscription_created 
            ? `Your ${responseData.payment_details.plan_name} subscription is now active!`
            : "Payment verified successfully. Subscription will be activated shortly.",
        });

        // Refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Please contact admin with your payment details",
        variant: "destructive"
      });
    } finally {
      setVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Verify Your Payment</h1>
            <p className="text-muted-foreground">
              Enter your Razorpay payment details to activate your subscription
            </p>
          </div>

          {pendingPayments.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="py-12 text-center">
                <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Pending Payments</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any pending payments to verify
                </p>
                <Button onClick={() => navigate('/pricing')}>
                  View Pricing Plans
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingPayments.map((payment) => (
                <Card key={payment.id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{payment.subscription_plans?.name || 'Plan'}</CardTitle>
                      {getStatusBadge(payment.payment_status)}
                    </div>
                    <CardDescription>
                      Payment Amount: ₹{payment.amount} • {new Date(payment.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`razorpay-ref-${payment.id}`}>
                        Razorpay Payment ID / UPI Transaction ID
                      </Label>
                      <Input
                        id={`razorpay-ref-${payment.id}`}
                        placeholder="Enter your Razorpay payment ID or UPI transaction ID"
                        value={selectedPaymentId === payment.id ? razorpayRef : ''}
                        onChange={(e) => {
                          setSelectedPaymentId(payment.id);
                          setRazorpayRef(e.target.value);
                        }}
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Find this in your Razorpay payment confirmation email or SMS
                      </p>
                    </div>

                    <Button
                      onClick={handleVerifyPayment}
                      disabled={verifying || selectedPaymentId !== payment.id || !razorpayRef.trim()}
                      className="w-full bg-gradient-primary"
                    >
                      {verifying ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verify & Activate Subscription
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="glass-card border-primary/20">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground text-center">
                    💡 <strong>Tip:</strong> After successful payment on Razorpay, you'll receive a payment ID. Enter it above to instantly activate your subscription!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
