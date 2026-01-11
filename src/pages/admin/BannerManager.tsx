import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2, Image, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Banner {
  id: string;
  title_ka: string | null;
  title_en: string | null;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
  sort_order: number | null;
  created_at: string;
}

const BannerManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title_ka: '',
    title_en: '',
    image_url: '',
    link_url: '',
    is_active: true,
  });
  const [uploading, setUploading] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: banners, isLoading } = useQuery({
    queryKey: ['admin-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Banner[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Banner, 'id' | 'created_at' | 'sort_order'>) => {
      const { error } = await supabase.from('banners').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
      toast({ title: 'ბანერი დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
      toast({ title: 'ბანერი წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('banners').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      title_ka: '',
      title_en: '',
      image_url: '',
      link_url: '',
      is_active: true,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({ title: 'სურათი აიტვირთა' });
    } catch (error) {
      toast({ title: 'შეცდომა ატვირთვისას', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.image_url) {
      toast({ title: 'აირჩიეთ სურათი', variant: 'destructive' });
      return;
    }

    createMutation.mutate({
      title_ka: formData.title_ka || null,
      title_en: formData.title_en || null,
      image_url: formData.image_url,
      link_url: formData.link_url || null,
      is_active: formData.is_active,
    });
  };

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
          <h1 className="text-2xl font-bold">ბანერი</h1>
          <p className="text-muted-foreground">მართეთ მთავარი ბანერი</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          დამატება
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {banners?.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img
                  src={banner.image_url}
                  alt={banner.title_ka || 'Banner'}
                  className="h-full w-full rounded-t-lg object-cover"
                />
                <div className="absolute right-2 top-2 flex gap-1">
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      if (confirm('წავშალოთ ბანერი?')) {
                        deleteMutation.mutate(banner.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    {banner.title_ka && (
                      <p className="font-medium">{banner.title_ka}</p>
                    )}
                    {banner.link_url && (
                      <p className="text-sm text-muted-foreground">{banner.link_url}</p>
                    )}
                  </div>
                  <Switch
                    checked={banner.is_active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: banner.id, is_active: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {banners?.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Image className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">ბანერები არ მოიძებნა</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ახალი ბანერი</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>სურათი</Label>
              <div className="mt-2">
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute right-2 top-2"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          აირჩიეთ სურათი
                        </span>
                      </>
                    )}
                  </label>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                ან ჩაწერეთ URL:
              </p>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>სათაური (ქართ.)</Label>
                <Input
                  value={formData.title_ka}
                  onChange={(e) => setFormData({ ...formData, title_ka: e.target.value })}
                />
              </div>
              <div>
                <Label>სათაური (ინგ.)</Label>
                <Input
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>ბმული (ოპციონალური)</Label>
              <Input
                value={formData.link_url}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>აქტიური</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              გაუქმება
            </Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending}>
              დამატება
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannerManager;
