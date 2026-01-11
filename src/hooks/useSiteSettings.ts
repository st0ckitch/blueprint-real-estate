import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label_ka: string | null;
  label_en: string | null;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      // Convert array to object for easier access
      const settings: Record<string, string> = {};
      (data as SiteSetting[]).forEach(item => {
        settings[item.key] = item.value;
      });
      
      return settings;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
