import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, CreditCard, Users, TrendingUp, IndianRupee } from 'lucide-react';

interface Payment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  payment_status: string;
  upi_ref?: string;
  upi_transaction_id?: string;
  created_at: string;
}

interface PaymentStats {
  total_revenue: number;
  pending_payments: number;
  completed_payments: number;
  failed_payments: number;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    total_revenue: 0,
    pending_payments: 0,
    completed_payments: 0,
    failed_payments: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [upiRef, setUpiRef] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: "Error",
        description: "Failed to load payments",
        variant: "destructive"  
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get payment statistics
      const { data: statsData, error } = await supabase
        .from('payments')
        .select('amount, payment_status');

      if (error) throw error;

      const stats = (statsData || []).reduce((acc, payment) => {
        if (payment.payment_status === 'completed') {
          acc.total_revenue += payment.amount;
          acc.completed_payments += 1;
        } else if (payment.payment_status === 'pending') {
          acc.pending_payments += 1;
        } else if (payment.payment_status === 'failed') {
          acc.failed_payments += 1;
        }
        return acc;
      }, {
        total_revenue: 0,
        pending_payments: 0,
        completed_payments: 0,
        failed_payments: 0
      });

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdatePayment = async () => {
    if (!selectedPayment || !newStatus) return;

    try {
      const updateData: any = { payment_status: newStatus };
      if (upiRef.trim()) {
        updateData.upi_ref = upiRef.trim();
        updateData.upi_transaction_id = upiRef.trim();
      }

      const { error } = await supabase
        .from('payments')
        .update(updateData)
        .eq('id', selectedPayment.id);

      if (error) throw error;

      // If payment is completed, create user subscription
      if (newStatus === 'completed') {
        await createUserSubscription(selectedPayment);
      }

      toast({
        title: "Success",
        description: "Payment status updated successfully"
      });

      setShowUpdateDialog(false);
      fetchPayments();
      fetchStats();
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive"
      });
    }
  };

  const createUserSubscription = async (payment: Payment) => {
    try {
      // Get plan details
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('credits_per_period')
        .eq('id', payment.plan_id)
        .single();

      if (planError) throw planError;

      // Create subscription with 30-day expiry
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { error: subError } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: payment.user_id,
          plan_id: payment.plan_id,
          payment_id: payment.id,
          credits_remaining: planData.credits_per_period,
          expires_at: expiresAt.toISOString(),
          current_period: getCurrentPeriod()
        });

      if (subError) throw subError;
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const getCurrentPeriod = () => {
    const day = new Date().getDate();
    if (day <= 10) return 1;
    if (day <= 20) return 2;
    return 3;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openUpdateDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setNewStatus(payment.payment_status);
    setUpiRef(payment.upi_ref || '');
    setShowUpdateDialog(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="mt-4 text-muted-foreground">Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-islamic-emerald mb-2">Payment Management</h1>
        <p className="text-muted-foreground">Manage subscriptions and track revenue</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-islamic-emerald">₹{stats.total_revenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed_payments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending_payments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed_payments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Manage and verify user payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>UPI Ref</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.user_id.slice(0, 8)}...</div>
                      <div className="text-sm text-muted-foreground">User ID</div>
                    </div>
                  </TableCell>
                  <TableCell>{payment.plan_id.slice(0, 8)}...</TableCell>
                  <TableCell className="font-mono">₹{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.payment_status)}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.upi_ref || payment.upi_transaction_id || 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(payment.created_at).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUpdateDialog(payment)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Payment Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
            <DialogDescription>
              Update the payment status and add transaction reference
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Payment Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="upi-ref">UPI Transaction Reference</Label>
              <Input
                id="upi-ref"
                value={upiRef}
                onChange={(e) => setUpiRef(e.target.value)}
                placeholder="Enter UPI transaction ID"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUpdatePayment} className="flex-1">
                Update Payment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUpdateDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;