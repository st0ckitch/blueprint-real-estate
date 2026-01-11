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

interface ProjectTag {
  id: string;
  name_ka: string;
  name_en: string;
  icon: string | null;
}

const ProjectsParams = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<ProjectTag | null>(null);
  const [formData, setFormData] = useState({ name_ka: '', name_en: '', icon: '' });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tags, isLoading } = useQuery({
    queryKey: ['admin-project-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_tags')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ProjectTag[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<ProjectTag, 'id'>) => {
      const { error } = await supabase.from('project_tags').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-project-tags'] });
      toast({ title: 'ტეგი დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: ProjectTag) => {
      const { error } = await supabase.from('project_tags').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-project-tags'] });
      toast({ title: 'ტეგი განახლდა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('project_tags').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-project-tags'] });
      toast({ title: 'ტეგი წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTag(null);
    setFormData({ name_ka: '', name_en: '', icon: '' });
  };

  const openEditDialog = (tag: ProjectTag) => {
    setEditingTag(tag);
    setFormData({
      name_ka: tag.name_ka,
      name_en: tag.name_en,
      icon: tag.icon || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en,
      icon: formData.icon || null,
    };

    if (editingTag) {
      updateMutation.mutate({ id: editingTag.id, ...data });
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
        <h1 className="text-2xl font-bold">პროექტის პარამეტრები</h1>
        <p className="text-muted-foreground">მართეთ ტეგები და მახასიათებლები</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ტეგები / მახასიათებლები</CardTitle>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            დამატება
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tags?.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <div className="font-medium">{tag.name_ka}</div>
                  <div className="text-sm text-muted-foreground">{tag.name_en}</div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(tag)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => {
                      if (confirm('წავშალოთ ტეგი?')) {
                        deleteMutation.mutate(tag.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {tags?.length === 0 && (
              <p className="py-4 text-center text-muted-foreground">
                ტეგები არ მოიძებნა
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'ტეგის რედაქტირება' : 'ახალი ტეგი'}
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
                placeholder="მაგ: car, trees, shield"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              გაუქმება
            </Button>
            <Button onClick={handleSubmit}>
              {editingTag ? 'განახლება' : 'დამატება'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsParams;
