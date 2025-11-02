import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Clock, Zap, Crown, Calendar } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';

interface CreditsDisplayProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function CreditsDisplay({ variant = 'full', className }: CreditsDisplayProps) {
  const { creditInfo, loading, daysUntilReset } = useCredits();

  // Calculate reset date (10-day periods)
  const getResetDate = () => {
    if (!creditInfo) return null;
    
    const currentDay = new Date().getDate();
    const periodEnd = creditInfo.period_number * 10;
    const today = new Date();
    
    if (currentDay <= periodEnd) {
      // Current period end date
      const resetDate = new Date(today.getFullYear(), today.getMonth(), periodEnd);
      return resetDate;
    } else {
      // Next period start
      const nextPeriodStart = ((creditInfo.period_number % 3) + 1) * 10 - 9;
      if (nextPeriodStart > currentDay) {
        return new Date(today.getFullYear(), today.getMonth(), nextPeriodStart);
      } else {
        return new Date(today.getFullYear(), today.getMonth() + 1, 1);
      }
    }
  };

  const resetDate = getResetDate();

  if (loading) {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="h-16 bg-muted rounded-lg"></div>
      </div>
    );
  }

  if (!creditInfo) return null;

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Coins className="h-4 w-4 text-primary" />
        <span className="text-muted-foreground">Credits:</span>
        <Badge variant={creditInfo.credits_left > 0 ? 'default' : 'destructive'}>
          {creditInfo.credits_left}
        </Badge>
        {creditInfo.plan_name !== 'Anonymous' && (
          <Badge variant="outline" className="text-xs">
            {creditInfo.plan_name}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className={cn('border-primary/20', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="h-5 w-5 text-accent" />
          Credits Overview
        </CardTitle>
        <CardDescription>
          Your current usage and plan information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Credits Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Remaining Credits</span>
          </div>
          <Badge 
            variant={creditInfo.credits_left > 2 ? 'default' : creditInfo.credits_left > 0 ? 'secondary' : 'destructive'}
            className="text-lg px-3 py-1"
          >
            {creditInfo.credits_left}
          </Badge>
        </div>

        {/* Plan Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Current Plan</span>
          </div>
          <Badge variant="outline">{creditInfo.plan_name}</Badge>
        </div>

        {/* Plan Expiration for Premium Users */}
        {creditInfo.is_premium && creditInfo.subscription_expires && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Plan Expires</span>
            </div>
            <span className="text-sm font-semibold text-accent">
              {(() => {
                const expiresAt = new Date(creditInfo.subscription_expires);
                const now = new Date();
                return expiresAt < now 
                  ? 'Expired' 
                  : formatDistanceToNow(expiresAt, { addSuffix: true });
              })()}
            </span>
          </div>
        )}

        {/* Reset Timer for Free Users */}
        {!creditInfo.is_premium && resetDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Credits Reset</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {creditInfo.credits_left === 0 
                ? format(resetDate, 'MMM dd, yyyy')
                : format(resetDate, 'MMM dd')
              }
            </span>
          </div>
        )}

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {creditInfo.credits_left} Credits Left
            </div>
            <p className="text-sm text-muted-foreground">
              {creditInfo.plan_name} Plan {creditInfo.is_premium && '✨'} • Period {creditInfo.period_number}/3
            </p>
            
            {!creditInfo.is_premium && resetDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground justify-center mt-2">
                <Clock className="h-3 w-3" />
                <span>
                  {creditInfo.credits_left === 0 
                    ? `Resets on ${format(resetDate, 'MMM dd, yyyy')}`
                    : `Resets ${format(resetDate, 'MMM dd')}`
                  }
                </span>
              </div>
            )}
          </div>

          {!creditInfo.is_premium && creditInfo.credits_left <= 3 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-amber-600 text-center">
                🚀 Upgrade to premium for more credits and features!
              </p>
              <Button size="sm" className="w-full bg-gradient-primary" asChild>
                <a href="/pricing">
                  <Zap className="h-3 w-3 mr-1" />
                  View Plans - 80% OFF
                </a>
              </Button>
            </div>
          )}

          {creditInfo.is_premium && creditInfo.subscription_expires && (() => {
            const expiresAt = new Date(creditInfo.subscription_expires);
            const now = new Date();
            const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            
            if (expiresAt < now) {
              return (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-destructive text-center font-semibold">
                    ⚠️ Your premium plan has expired!
                  </p>
                  <Button size="sm" className="w-full bg-gradient-accent" asChild>
                    <a href="/pricing">
                      <Zap className="h-3 w-3 mr-1" />
                      Renew Now - 80% OFF
                    </a>
                  </Button>
                </div>
              );
            } else if (daysLeft <= 7) {
              return (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-amber-600 text-center">
                    ⏰ Your plan expires in {daysLeft} days
                  </p>
                  <Button size="sm" className="w-full bg-gradient-primary" asChild>
                    <a href="/pricing">
                      <Zap className="h-3 w-3 mr-1" />
                      Renew Early - Save 80%
                    </a>
                  </Button>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </CardContent>
    </Card>
  );
}
