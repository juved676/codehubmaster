import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface CreditInfo {
  can_ask: boolean;
  credits_left: number;
  period_number: number;
  plan_name: string;
  original_price: number;
  discounted_price: number;
  message: string;
}

export function useCredits() {
  const { user } = useAuth();
  const [creditInfo, setCreditInfo] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!user) {
      // For anonymous users, show default free credits
      setCreditInfo({
        can_ask: true,
        credits_left: 6,
        period_number: 1,
        plan_name: 'Anonymous',
        original_price: 0,
        discounted_price: 0,
        message: 'Anonymous users get 6 free questions'
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('check_user_credits', {
        user_uuid: user.id
      });

      if (error) throw error;
      if (data && typeof data === 'object') {
        setCreditInfo(data as unknown as CreditInfo);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching credits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  // Calculate days until reset (assuming 10-day periods)
  const getDaysUntilReset = () => {
    if (!creditInfo) return 0;
    
    const currentDay = new Date().getDate();
    const periodStart = (creditInfo.period_number - 1) * 10 + 1;
    const periodEnd = creditInfo.period_number * 10;
    
    if (currentDay >= periodStart && currentDay <= periodEnd) {
      return periodEnd - currentDay + 1;
    }
    return 0;
  };

  return {
    creditInfo,
    loading,
    error,
    refetch: fetchCredits,
    daysUntilReset: getDaysUntilReset()
  };
}