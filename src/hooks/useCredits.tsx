import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface CreditInfo {
  can_ask: boolean;
  credits_left: number;
  plan_name: string;
  original_price: number;
  discounted_price: number;
  period_number: number;
  is_premium?: boolean;
  subscription_expires?: string;
  message?: string;
}

export function useCredits() {
  const { user } = useAuth();
  const [creditInfo, setCreditInfo] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!user) {
      setCreditInfo({
        can_ask: true,
        credits_left: 5,
        plan_name: 'Code Free',
        original_price: 25,
        discounted_price: 0,
        period_number: 3,
        is_premium: false,
        message: 'Anonymous users get 5 free questions'
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_user_credits_detailed', {
        user_uuid: user.id
      });

      if (error) {
        console.error('Error fetching credits:', error);
        setError(error.message);
      } else {
        setCreditInfo(data as unknown as CreditInfo);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to fetch credit information');
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