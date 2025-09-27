import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Clock, Zap, Crown } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { cn } from '@/lib/utils';

interface CreditsDisplayProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function CreditsDisplay({ variant = 'full', className }: CreditsDisplayProps) {
  const { creditInfo, loading, daysUntilReset } = useCredits();

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
        <Coins className="h-4 w-4 text-islamic-gold" />
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
    <Card className={cn('border-islamic-emerald/20', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="h-5 w-5 text-islamic-gold" />
          Credits Overview / کریڈٹس کی تفصیلات
        </CardTitle>
        <CardDescription>
          Your current usage and plan information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Credits Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-islamic-emerald" />
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
            <Crown className="h-4 w-4 text-islamic-gold" />
            <span className="text-sm font-medium">Current Plan</span>
          </div>
          <Badge variant="outline">{creditInfo.plan_name}</Badge>
        </div>

        {/* Reset Timer */}
        {daysUntilReset > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Credits Reset</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {daysUntilReset} day{daysUntilReset !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Status Message */}
        <div className="text-sm text-center p-3 bg-muted rounded-lg">
          {creditInfo.message}
        </div>

        {/* Upgrade Options */}
        {creditInfo.credits_left <= 2 && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-sm font-medium text-center mb-3">
              Upgrade Options / اپ گریڈ آپشنز
            </p>
            <div className="grid gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-gradient-primary"
              >
                <Crown className="h-4 w-4 mr-2" />
                ILM Pro - $15/month
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-foreground"
              >
                <Zap className="h-4 w-4 mr-2" />
                ILM Advance - $25/month
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}