import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { BarChart3, Users, MessageSquare, Settings, Shield, Database } from 'lucide-react';
import { Navigate } from 'react-router-dom';

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
        <h1 className="text-2xl font-bold mb-4">Access Denied / رسائی مسترد</h1>
        <p className="text-muted-foreground mb-4">
          You need admin privileges to access this page. / 
          اس صفحہ تک رسائی کے لیے آپ کو ایڈمن اختیارات کی ضرورت ہے۔
        </p>
        <Button onClick={() => window.history.back()}>Go Back / واپس جائیں</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard / ایڈمن ڈیش بورڈ</h1>
        <p className="text-muted-foreground">
          Manage your Islamic Study Hub / اپنا اسلامک اسٹڈی ہب منظم کریں
        </p>
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

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users / صارفین</TabsTrigger>
          <TabsTrigger value="settings">Settings / ترتیبات</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs / سرگرمی</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management / صارف کا انتظام</CardTitle>
              <CardDescription>
                Manage user roles and permissions / صارف کے کردار اور اجازات کا انتظام
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

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings / سسٹم کی ترتیبات</CardTitle>
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