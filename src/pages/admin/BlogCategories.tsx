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

interface BlogCategory {
  id: string;
  name_ka: string;
  name_en: string;
  slug: string;
}

const BlogCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [formData, setFormData] = useState({ name_ka: '', name_en: '', slug: '' });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name_ka');
      
      if (error) throw error;
      return data as BlogCategory[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<BlogCategory, 'id'>) => {
      const { error } = await supabase.from('blog_categories').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-categories'] });
      toast({ title: 'კატეგორია დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: BlogCategory) => {
      const { error } = await supabase.from('blog_categories').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-categories'] });
      toast({ title: 'კატეგორია განახლდა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-categories'] });
      toast({ title: 'კატეგორია წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name_ka: '', name_en: '', slug: '' });
  };

  const openEditDialog = (category: BlogCategory) => {
    setEditingCategory(category);
    setFormData({
      name_ka: category.name_ka,
      name_en: category.name_en,
      slug: category.slug,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en,
      slug: formData.slug || formData.name_en.toLowerCase().replace(/\s+/g, '-'),
    };

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, ...data });
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
        <h1 className="text-2xl font-bold">ბლოგის კატეგორიები</h1>
        <p className="text-muted-foreground">მართეთ კატეგორიები</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>კატეგორიები</CardTitle>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            დამატება
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <div className="font-medium">{category.name_ka}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.name_en} • /{category.slug}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => {
                      if (confirm('წავშალოთ კატეგორია?')) {
                        deleteMutation.mutate(category.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {categories?.length === 0 && (
              <p className="py-4 text-center text-muted-foreground">
                კატეგორიები არ მოიძებნა
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'კატეგორიის რედაქტირება' : 'ახალი კატეგორია'}
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
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated from english name"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              გაუქმება
            </Button>
            <Button onClick={handleSubmit}>
              {editingCategory ? 'განახლება' : 'დამატება'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogCategories;
