import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, CreditCard, Users, TrendingUp, IndianRupee, Calendar, BarChart3, DollarSign, Activity } from 'lucide-react';

interface Payment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  payment_status: string;
  upi_ref?: string;
  upi_transaction_id?: string;
  created_at: string;
  plan_name?: string;
}

interface PaymentStats {
  total_revenue: number;
  pending_payments: number;
  completed_payments: number;
  failed_payments: number;
  today_revenue: number;
  yesterday_revenue: number;
  this_month_revenue: number;
  last_month_revenue: number;
  code_pro_sales: number;
  code_advance_sales: number;
}

interface DailyStats {
  date: string;
  revenue: number;
  sales: number;
}

interface PlanStats {
  plan_name: string;
  total_sales: number;
  total_revenue: number;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    total_revenue: 0,
    pending_payments: 0,
    completed_payments: 0,
    failed_payments: 0,
    today_revenue: 0,
    yesterday_revenue: 0,
    this_month_revenue: 0,
    last_month_revenue: 0,
    code_pro_sales: 0,
    code_advance_sales: 0
  });
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [planStats, setPlanStats] = useState<PlanStats[]>([]);
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
      // Get payment statistics with detailed analytics
      const { data: statsData, error } = await supabase
        .from('payments')
        .select(`
          amount, 
          payment_status, 
          created_at,
          plan_id,
          subscription_plans(name)
        `);

      if (error) throw error;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      const stats = (statsData || []).reduce((acc, payment) => {
        const paymentDate = new Date(payment.created_at);
        const paymentAmount = Number(payment.amount);
        
        if (payment.payment_status === 'completed') {
          acc.total_revenue += paymentAmount;
          acc.completed_payments += 1;

          // Today's revenue
          if (paymentDate >= today) {
            acc.today_revenue += paymentAmount;
          }

          // Yesterday's revenue
          if (paymentDate >= yesterday && paymentDate < today) {
            acc.yesterday_revenue += paymentAmount;
          }

          // This month's revenue
          if (paymentDate >= thisMonth) {
            acc.this_month_revenue += paymentAmount;
          }

          // Last month's revenue
          if (paymentDate >= lastMonth && paymentDate <= lastMonthEnd) {
            acc.last_month_revenue += paymentAmount;
          }

          // Plan-wise sales
          const planName = payment.subscription_plans?.name || 'Unknown';
          if (planName.includes('PRO') || planName.includes('Pro')) {
            acc.code_pro_sales += 1;
          } else if (planName.includes('ADVANCE') || planName.includes('Advance')) {
            acc.code_advance_sales += 1;
          }
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
        failed_payments: 0,
        today_revenue: 0,
        yesterday_revenue: 0,
        this_month_revenue: 0,
        last_month_revenue: 0,
        code_pro_sales: 0,
        code_advance_sales: 0
      });

      setStats(stats);
      
      // Fetch daily stats for charts
      await fetchDailyStats();
      await fetchPlanStats();
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchDailyStats = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('amount, payment_status, created_at')
        .eq('payment_status', 'completed')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      const dailyData = (data || []).reduce((acc: Record<string, { revenue: number; sales: number }>, payment) => {
        const date = new Date(payment.created_at).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { revenue: 0, sales: 0 };
        }
        acc[date].revenue += Number(payment.amount);
        acc[date].sales += 1;
        return acc;
      }, {});

      const dailyStatsArray = Object.entries(dailyData).map(([date, stats]) => ({
        date,
        revenue: stats.revenue,
        sales: stats.sales
      })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setDailyStats(dailyStatsArray);
    } catch (error) {
      console.error('Error fetching daily stats:', error);
    }
  };

  const fetchPlanStats = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          amount,
          payment_status,
          subscription_plans(name)
        `)
        .eq('payment_status', 'completed');

      if (error) throw error;

      const planData = (data || []).reduce((acc: Record<string, { sales: number; revenue: number }>, payment) => {
        const planName = payment.subscription_plans?.name || 'Unknown';
        if (!acc[planName]) {
          acc[planName] = { sales: 0, revenue: 0 };
        }
        acc[planName].sales += 1;
        acc[planName].revenue += Number(payment.amount);
        return acc;
      }, {});

      const planStatsArray = Object.entries(planData).map(([plan_name, stats]) => ({
        plan_name,
        total_sales: stats.sales,
        total_revenue: stats.revenue
      }));

      setPlanStats(planStatsArray);
    } catch (error) {
      console.error('Error fetching plan stats:', error);
    }
  };

  const handleUpdatePayment = async () => {
    if (!selectedPayment || !newStatus || !upiRef.trim()) {
      toast({
        title: "Error",
        description: "Please provide UPI reference/Razorpay payment ID",
        variant: "destructive"
      });
      return;
    }

    try {
      // Use the verify-payment edge function for consistent subscription creation
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          payment_id: selectedPayment.id,
          upi_ref: upiRef.trim(),
          status: newStatus,
          auto_upgrade: true // Always auto-upgrade on payment completion
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "Success",
          description: data.subscription_created 
            ? "Payment verified and subscription activated!" 
            : "Payment status updated successfully",
        });
      } else {
        throw new Error(data?.error || 'Failed to verify payment');
      }

      setShowUpdateDialog(false);
      fetchPayments();
      fetchStats();
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update payment status",
        variant: "destructive"
      });
    }
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
        <h1 className="text-3xl font-bold text-primary mb-2">Revenue & Payment Analytics</h1>
        <p className="text-muted-foreground">Complete income tracking with Razorpay integration</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₹{stats.total_revenue}</div>
                <p className="text-xs text-muted-foreground">
                  +₹{stats.this_month_revenue} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{stats.today_revenue}</div>
                <p className="text-xs text-muted-foreground">
                  vs ₹{stats.yesterday_revenue} yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.completed_payments}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pending_payments} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {((stats.completed_payments / (stats.completed_payments + stats.failed_payments + stats.pending_payments)) * 100 || 0).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.failed_payments} failed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Plan Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Plan Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Code Pro (₹49)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{stats.code_pro_sales} sales</div>
                      <div className="text-sm text-muted-foreground">₹{stats.code_pro_sales * 49}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Code Advance (₹99)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{stats.code_advance_sales} sales</div>
                      <div className="text-sm text-muted-foreground">₹{stats.code_advance_sales * 99}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="font-bold text-green-600">₹{stats.this_month_revenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Month</span>
                    <span className="font-bold text-muted-foreground">₹{stats.last_month_revenue}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-medium">Growth</span>
                    <span className={`font-bold ${stats.this_month_revenue >= stats.last_month_revenue ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.last_month_revenue > 0 ? 
                        `${(((stats.this_month_revenue - stats.last_month_revenue) / stats.last_month_revenue) * 100).toFixed(1)}%` 
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Razorpay Integration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Razorpay Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">Payment Link Active</div>
                    <div className="text-sm text-green-600">https://razorpay.me/@afsana9249</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">Payment Methods</div>
                    <div className="text-sm text-blue-600">UPI, Cards, Wallets</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="font-semibold text-purple-800">Gateway</div>
                    <div className="text-sm text-purple-600">Razorpay</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Daily Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue Trend (Last 30 Days)</CardTitle>
              <CardDescription>Track daily income and sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyStats.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{dailyStats.reduce((sum, day) => sum + day.revenue, 0)}
                      </div>
                      <div className="text-sm text-green-800">30-Day Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {dailyStats.reduce((sum, day) => sum + day.sales, 0)}
                      </div>
                      <div className="text-sm text-blue-800">Total Sales</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{(dailyStats.reduce((sum, day) => sum + day.revenue, 0) / dailyStats.length).toFixed(0)}
                      </div>
                      <div className="text-sm text-purple-800">Daily Average</div>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {dailyStats.slice(-14).map((day, index) => (
                      <div key={day.date} className="flex-1 flex flex-col items-center">
                        <div 
                          className="bg-primary rounded-t w-full transition-all hover:bg-primary/80"
                          style={{ 
                            height: `${Math.max((day.revenue / Math.max(...dailyStats.map(d => d.revenue))) * 200, 4)}px` 
                          }}
                          title={`${day.date}: ₹${day.revenue} (${day.sales} sales)`}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-1 transform -rotate-45">
                          {new Date(day.date).getDate()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No data available for chart
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plan Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Plan-wise Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planStats.map((plan, index) => (
                  <div key={plan.plan_name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <div className="font-semibold">{plan.plan_name}</div>
                        <div className="text-sm text-muted-foreground">{plan.total_sales} customers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{plan.total_revenue}</div>
                      <div className="text-sm text-muted-foreground">
                        ₹{(plan.total_revenue / plan.total_sales || 0).toFixed(0)} avg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Manage and verify user payments with Razorpay</CardDescription>
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
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.plan_name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">{payment.plan_id.slice(0, 8)}...</div>
                        </div>
                      </TableCell>
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
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Income Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Lifetime Revenue</span>
                    <span className="font-bold">₹{stats.total_revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month Revenue</span>
                    <span className="font-bold text-green-600">₹{stats.this_month_revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Today's Revenue</span>
                    <span className="font-bold text-blue-600">₹{stats.today_revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per Sale</span>
                    <span className="font-bold">₹{(stats.total_revenue / stats.completed_payments || 0).toFixed(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Customers</span>
                    <span className="font-bold">{stats.completed_payments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Code Pro Users</span>
                    <span className="font-bold text-green-600">{stats.code_pro_sales}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Code Advance Users</span>
                    <span className="font-bold text-blue-600">{stats.code_advance_sales}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-bold">
                      {((stats.completed_payments / (stats.completed_payments + stats.failed_payments + stats.pending_payments)) * 100 || 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download detailed reports for accounting and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics Export
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Customer List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Update Payment Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
            <DialogDescription>
              Verify Razorpay payment and update status
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border">
              <div className="text-sm font-medium text-blue-800 mb-1">Razorpay Payment Link</div>
              <div className="text-lg font-mono text-blue-900">https://razorpay.me/@afsana9249</div>
            </div>

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
              <Label htmlFor="upi-ref">Razorpay Payment ID / Reference *</Label>
              <Input
                id="upi-ref"
                value={upiRef}
                onChange={(e) => setUpiRef(e.target.value)}
                placeholder="Enter Razorpay payment ID (required)"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required to activate user's subscription
              </p>
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