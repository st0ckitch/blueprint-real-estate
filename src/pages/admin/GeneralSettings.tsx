import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label_ka: string | null;
  label_en: string | null;
}

const GeneralSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, string>>({});

  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ['admin-site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });

  useEffect(() => {
    if (siteSettings) {
      const settingsMap: Record<string, string> = {};
      siteSettings.forEach((setting) => {
        settingsMap[setting.key] = setting.value;
      });
      setSettings(settingsMap);
    }
  }, [siteSettings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value })
          .eq('key', update.key);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-site-settings'] });
      toast({ title: 'პარამეტრები შენახულია' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ინფორმაცია</h1>
          <p className="text-muted-foreground">ზოგადი პარამეტრები</p>
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          შენახვა
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>საიტის ინფორმაცია</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {siteSettings?.map((setting) => (
            <div key={setting.id}>
              <Label>{setting.label_ka || setting.key}</Label>
              <div className="flex gap-2">
                <Input
                  value={settings[setting.key] || ''}
                  onChange={(e) =>
                    setSettings({ ...settings, [setting.key]: e.target.value })
                  }
                />
                {setting.key === 'starting_price' && (
                  <span className="flex items-center text-muted-foreground">₾</span>
                )}
              </div>
              {setting.label_en && (
                <p className="mt-1 text-sm text-muted-foreground">{setting.label_en}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
