import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ApartmentFeature {
  id: string;
  name_ka: string;
  name_en: string;
  icon: string | null;
}

const ApartmentsParams = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ApartmentFeature | null>(null);
  const [formData, setFormData] = useState({ name_ka: '', name_en: '', icon: '' });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: features, isLoading } = useQuery({
    queryKey: ['admin-apartment-features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apartment_features')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ApartmentFeature[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<ApartmentFeature, 'id'>) => {
      const { error } = await supabase.from('apartment_features').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartment-features'] });
      toast({ title: 'მახასიათებელი დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: ApartmentFeature) => {
      const { error } = await supabase.from('apartment_features').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartment-features'] });
      toast({ title: 'მახასიათებელი განახლდა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('apartment_features').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartment-features'] });
      toast({ title: 'მახასიათებელი წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingFeature(null);
    setFormData({ name_ka: '', name_en: '', icon: '' });
  };

  const openEditDialog = (feature: ApartmentFeature) => {
    setEditingFeature(feature);
    setFormData({
      name_ka: feature.name_ka,
      name_en: feature.name_en,
      icon: feature.icon || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en,
      icon: formData.icon || null,
    };

    if (editingFeature) {
      updateMutation.mutate({ id: editingFeature.id, ...data });
    } else {
      createMutation.mutate(data);
    }
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
      <div>
        <h1 className="text-2xl font-bold">ბინის პარამეტრები</h1>
        <p className="text-muted-foreground">მართეთ მახასიათებლები</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>მახასიათებლები</CardTitle>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            დამატება
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {features?.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <div className="font-medium">{feature.name_ka}</div>
                  <div className="text-sm text-muted-foreground">{feature.name_en}</div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(feature)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => {
                      if (confirm('წავშალოთ მახასიათებელი?')) {
                        deleteMutation.mutate(feature.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {features?.length === 0 && (
              <p className="py-4 text-center text-muted-foreground">
                მახასიათებლები არ მოიძებნა
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingFeature ? 'მახასიათებლის რედაქტირება' : 'ახალი მახასიათებელი'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>სახელი (ქართ.)</Label>
              <Input
                value={formData.name_ka}
                onChange={(e) => setFormData({ ...formData, name_ka: e.target.value })}
              />
            </div>
            <div>
              <Label>სახელი (ინგ.)</Label>
              <Input
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              />
            </div>
            <div>
              <Label>აიქონი (lucide icon name)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="მაგ: door-open, maximize"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              გაუქმება
            </Button>
            <Button onClick={handleSubmit}>
              {editingFeature ? 'განახლება' : 'დამატება'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApartmentsParams;
