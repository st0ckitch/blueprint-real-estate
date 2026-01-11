import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  name_ka: string;
  name_en: string;
  slug: string;
  address_ka: string | null;
  address_en: string | null;
  description_ka: string | null;
  description_en: string | null;
  status: 'ongoing' | 'completed' | 'upcoming';
  completion_date: string | null;
  total_units: number | null;
  available_units: number | null;
  price_from: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  ongoing: 'მიმდინარე',
  completed: 'დასრულებული',
  upcoming: 'მომავალი',
};

const ProjectsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name_ka: '',
    name_en: '',
    slug: '',
    address_ka: '',
    address_en: '',
    description_ka: '',
    description_en: '',
    status: 'ongoing' as Project['status'],
    completion_date: '',
    total_units: '',
    available_units: '',
    price_from: '',
    image_url: '',
    is_active: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Project, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('projects').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({ title: 'პროექტი დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Project> & { id: string }) => {
      const { error } = await supabase.from('projects').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({ title: 'პროექტი განახლდა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({ title: 'პროექტი წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('projects').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({
      name_ka: '',
      name_en: '',
      slug: '',
      address_ka: '',
      address_en: '',
      description_ka: '',
      description_en: '',
      status: 'ongoing',
      completion_date: '',
      total_units: '',
      available_units: '',
      price_from: '',
      image_url: '',
      is_active: true,
    });
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name_ka: project.name_ka,
      name_en: project.name_en,
      slug: project.slug,
      address_ka: project.address_ka || '',
      address_en: project.address_en || '',
      description_ka: project.description_ka || '',
      description_en: project.description_en || '',
      status: project.status,
      completion_date: project.completion_date || '',
      total_units: project.total_units?.toString() || '',
      available_units: project.available_units?.toString() || '',
      price_from: project.price_from?.toString() || '',
      image_url: project.image_url || '',
      is_active: project.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en,
      slug: formData.slug || formData.name_en.toLowerCase().replace(/\s+/g, '-'),
      address_ka: formData.address_ka || null,
      address_en: formData.address_en || null,
      description_ka: formData.description_ka || null,
      description_en: formData.description_en || null,
      status: formData.status,
      completion_date: formData.completion_date || null,
      total_units: formData.total_units ? parseInt(formData.total_units) : null,
      available_units: formData.available_units ? parseInt(formData.available_units) : null,
      price_from: formData.price_from ? parseFloat(formData.price_from) : null,
      image_url: formData.image_url || null,
      is_active: formData.is_active,
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, ...data });
    } else {
      createMutation.mutate(data as any);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">პროექტები</h1>
          <p className="text-muted-foreground">მართეთ თქვენი პროექტები</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              დამატება
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'პროექტის რედაქტირება' : 'ახალი პროექტი'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated from english name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>მისამართი (ქართ.)</Label>
                  <Input
                    value={formData.address_ka}
                    onChange={(e) => setFormData({ ...formData, address_ka: e.target.value })}
                  />
                </div>
                <div>
                  <Label>მისამართი (ინგ.)</Label>
                  <Input
                    value={formData.address_en}
                    onChange={(e) => setFormData({ ...formData, address_en: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>აღწერა (ქართ.)</Label>
                <Textarea
                  value={formData.description_ka}
                  onChange={(e) => setFormData({ ...formData, description_ka: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>აღწერა (ინგ.)</Label>
                <Textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>სტატუსი</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData({ ...formData, status: v as Project['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">მიმდინარე</SelectItem>
                      <SelectItem value="completed">დასრულებული</SelectItem>
                      <SelectItem value="upcoming">მომავალი</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>დასრულების თარიღი</Label>
                  <Input
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                    placeholder="მაგ: 2025 Q2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>სულ ბინები</Label>
                  <Input
                    type="number"
                    value={formData.total_units}
                    onChange={(e) => setFormData({ ...formData, total_units: e.target.value })}
                  />
                </div>
                <div>
                  <Label>ხელმისაწვდომი</Label>
                  <Input
                    type="number"
                    value={formData.available_units}
                    onChange={(e) => setFormData({ ...formData, available_units: e.target.value })}
                  />
                </div>
                <div>
                  <Label>ფასი (დან)</Label>
                  <Input
                    type="number"
                    value={formData.price_from}
                    onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>სურათის URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
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
              <Button onClick={handleSubmit}>
                {editingProject ? 'განახლება' : 'დამატება'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">აქტიური</TableHead>
              <TableHead>სახელი</TableHead>
              <TableHead>მისამართი</TableHead>
              <TableHead>სტატუსი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Switch
                    checked={project.is_active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: project.id, is_active: checked })
                    }
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.name_ka}</div>
                    <div className="text-sm text-muted-foreground">{project.name_en}</div>
                  </div>
                </TableCell>
                <TableCell>{project.address_ka || '-'}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{statusLabels[project.status]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        if (confirm('წავშალოთ პროექტი?')) {
                          deleteMutation.mutate(project.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {projects?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  პროექტები არ მოიძებნა
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsList;
