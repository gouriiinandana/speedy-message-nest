import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Channel {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
}

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching channels:', error);
      } else {
        setChannels(data || []);
      }
      setLoading(false);
    };

    fetchChannels();
  }, []);

  return { channels, loading };
}
