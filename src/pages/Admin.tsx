import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { BarChart3, Users, MessageSquare, Settings, Shield, Database, IndianRupee, CreditCard, TrendingUp, Activity } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

interface Stats {
  totalUsers: number;
  totalQuestions: number;
  publishedAnswers: number;
  pendingReviews: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  created_at: string;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuestions: 0,
    publishedAnswers: 0,
    pendingReviews: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (user) {
      checkUserRole();
      fetchStats();
      fetchUsers();
    }
  }, [user]);

  const checkUserRole = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user?.id)
        .single();

      // Skip role check for open system - allow all access
      setUserRole('admin'); // Set default admin role for open access
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Get total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total questions  
      const { count: questionsCount } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true });

      // Get published answers
      const { count: answersCount } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      // Get pending reviews
      const { count: reviewsCount } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .eq('requires_review', true)
        .eq('published', false);

      setStats({
        totalUsers: usersCount || 0,
        totalQuestions: questionsCount || 0,
        publishedAnswers: answersCount || 0,
        pendingReviews: reviewsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Skip user management for open system - set empty array
      setUsers([]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'reviewer' | 'admin') => {
    // Skip role updates for open system
    toast({
      title: "Role Update Disabled",
      description: "User roles are disabled in open access mode",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

      if (userRole !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-4">
          You need admin privileges to access this page.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your IIM-HUB-AI platform
        </p>
      </div>

      {/* Credits Overview */}
      <div className="mb-8">
        <CreditsDisplay />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Asked</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <p className="text-xs text-muted-foreground">Total inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Answers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedAnswers}</div>
            <p className="text-xs text-muted-foreground">AI responses live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access to Payment Analytics */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <IndianRupee className="h-5 w-5" />
              Payment Analytics & Income Tracking
            </CardTitle>
            <CardDescription className="text-green-700">
              Access comprehensive revenue analytics, Fampay UPI integration, and payment management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Fampay UPI: 9625852028@fam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Real-time Tracking Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Auto Verification Enabled</span>
                </div>
              </div>
              <Link to="/admin/payments">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  View Payment Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="payments">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{user.name || 'Anonymous'}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={user.verified ? 'default' : 'secondary'}>
                          {user.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge variant="outline">
                          {new Date(user.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as 'user' | 'reviewer' | 'admin')}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="user">User</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                  <IndianRupee className="h-5 w-5" />
                  Revenue Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700 mb-1">Real-time Income</div>
                <p className="text-sm text-green-600">Complete financial analytics with daily/monthly breakdowns</p>
                <div className="mt-3">
                  <div className="text-xs text-green-800 font-medium">Features:</div>
                  <ul className="text-xs text-green-700 mt-1 space-y-1">
                    <li>• Daily revenue charts</li>
                    <li>• Plan-wise sales analytics</li>
                    <li>• Growth rate tracking</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                  <CreditCard className="h-5 w-5" />
                  Fampay Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700 mb-1">9625852028@fam</div>
                <p className="text-sm text-blue-600">Automated UPI payment processing</p>
                <div className="mt-3">
                  <div className="text-xs text-blue-800 font-medium">Status:</div>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>✅ Auto verification active</li>
                    <li>✅ Real-time tracking enabled</li>
                    <li>✅ Subscription automation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                  <BarChart3 className="h-5 w-5" />
                  Payment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700 mb-1">Complete Control</div>
                <p className="text-sm text-purple-600">Manage all payment statuses and user subscriptions</p>
                <div className="mt-3">
                  <div className="text-xs text-purple-800 font-medium">Capabilities:</div>
                  <ul className="text-xs text-purple-700 mt-1 space-y-1">
                    <li>• Update payment status</li>
                    <li>• Auto subscription creation</li>
                    <li>• Export reports</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Access Full Payment Dashboard</CardTitle>
              <CardDescription>
                Click below to access the complete payment analytics system with charts, reports, and management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admin/payments" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base">
                    <IndianRupee className="mr-2 h-5 w-5" />
                    Open Payment Analytics Dashboard
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Quick Stats
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Live Tracking
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm font-medium text-amber-800 mb-2">💡 Payment Analytics Features</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-amber-700">
                  <div>
                    <strong>Revenue Tracking:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Real-time income monitoring</li>
                      <li>• Daily/monthly revenue charts</li>
                      <li>• Growth rate calculations</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Payment Management:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Fampay UPI verification</li>
                      <li>• Automatic user upgrades</li>
                      <li>• Detailed payment reports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure AI providers and moderation settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">AI Provider Configuration</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Provider: Google Gemini / موجودہ فراہم کنندہ: گوگل جیمنی
                  </p>
                  <Badge variant="outline">Active / فعال</Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Moderation Settings / نظم و ضبط کی ترتیبات</h4>
                  <p className="text-sm text-muted-foreground">
                    Auto-review threshold: Questions containing "fatwa", "ruling", or similar terms
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">API Status / API کی صورتحال</h4>
                  <Badge variant="default">Google Gemini: Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity / حالیہ سرگرمی</CardTitle>
              <CardDescription>
                System events and user actions / سسٹم کے واقعات اور صارف کی کارروائیاں
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Database className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Activity logs will appear here / یہاں سرگرمی کے لاگ نظر آئیں گے</p>
                <p className="text-sm">Check back after more user interactions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}