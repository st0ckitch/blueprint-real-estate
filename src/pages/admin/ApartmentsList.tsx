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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Apartment {
  id: string;
  project_id: string;
  title_ka: string | null;
  title_en: string | null;
  floor: number | null;
  area: number | null;
  rooms: number | null;
  price: number | null;
  bathrooms: number | null;
  bedrooms: number | null;
  living_area: number | null;
  balcony_area: number | null;
  bathroom_areas: number[] | null;
  bedroom_areas: number[] | null;
  status: 'available' | 'reserved' | 'sold';
  image_url: string | null;
  floor_plan_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface Project {
  id: string;
  name_ka: string;
  name_en: string;
}

const statusLabels: Record<string, string> = {
  available: 'ხელმისაწვდომი',
  reserved: 'დაჯავშნილი',
  sold: 'გაყიდული',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive'> = {
  available: 'default',
  reserved: 'secondary',
  sold: 'destructive',
};

const ApartmentsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [formData, setFormData] = useState({
    project_id: '',
    title_ka: '',
    title_en: '',
    floor: '',
    area: '',
    rooms: '',
    price: '',
    bathrooms: '',
    bedrooms: '',
    living_area: '',
    balcony_area: '',
    bathroom_areas: [''] as string[],
    bedroom_areas: [''] as string[],
    status: 'available' as Apartment['status'],
    image_url: '',
    floor_plan_url: '',
    is_active: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ['admin-projects-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name_ka, name_en')
        .order('name_ka');
      
      if (error) throw error;
      return data as Project[];
    },
  });

  const { data: apartments, isLoading } = useQuery({
    queryKey: ['admin-apartments', selectedProject],
    queryFn: async () => {
      let query = supabase
        .from('apartments')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (selectedProject !== 'all') {
        query = query.eq('project_id', selectedProject);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Apartment[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Apartment, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('apartments').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartments'] });
      toast({ title: 'ბინა დაემატა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Apartment> & { id: string }) => {
      const { error } = await supabase.from('apartments').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartments'] });
      toast({ title: 'ბინა განახლდა' });
      closeDialog();
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('apartments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartments'] });
      toast({ title: 'ბინა წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('apartments').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-apartments'] });
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingApartment(null);
    setFormData({
      project_id: '',
      title_ka: '',
      title_en: '',
      floor: '',
      area: '',
      rooms: '',
      price: '',
      bathrooms: '',
      bedrooms: '',
      living_area: '',
      balcony_area: '',
      bathroom_areas: [''],
      bedroom_areas: [''],
      status: 'available',
      image_url: '',
      floor_plan_url: '',
      is_active: true,
    });
  };

  const openEditDialog = (apartment: Apartment) => {
    setEditingApartment(apartment);
    const bathroomAreas = (apartment.bathroom_areas && Array.isArray(apartment.bathroom_areas) && apartment.bathroom_areas.length > 0) 
      ? apartment.bathroom_areas.map(a => a.toString()) 
      : [''];
    const bedroomAreas = (apartment.bedroom_areas && Array.isArray(apartment.bedroom_areas) && apartment.bedroom_areas.length > 0) 
      ? apartment.bedroom_areas.map(a => a.toString()) 
      : [''];
    setFormData({
      project_id: apartment.project_id,
      title_ka: apartment.title_ka || '',
      title_en: apartment.title_en || '',
      floor: apartment.floor?.toString() || '',
      area: apartment.area?.toString() || '',
      rooms: apartment.rooms?.toString() || '',
      price: apartment.price?.toString() || '',
      bathrooms: apartment.bathrooms?.toString() || '',
      bedrooms: apartment.bedrooms?.toString() || '',
      living_area: apartment.living_area?.toString() || '',
      balcony_area: apartment.balcony_area?.toString() || '',
      bathroom_areas: bathroomAreas,
      bedroom_areas: bedroomAreas,
      status: apartment.status,
      image_url: apartment.image_url || '',
      floor_plan_url: apartment.floor_plan_url || '',
      is_active: apartment.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.project_id) {
      toast({ title: 'აირჩიეთ პროექტი', variant: 'destructive' });
      return;
    }

    const bathroomAreasArray = formData.bathroom_areas
      .filter(a => a.trim() !== '')
      .map(a => parseFloat(a));
    const bedroomAreasArray = formData.bedroom_areas
      .filter(a => a.trim() !== '')
      .map(a => parseFloat(a));

    const data = {
      project_id: formData.project_id,
      title_ka: formData.title_ka || null,
      title_en: formData.title_en || null,
      floor: formData.floor ? parseInt(formData.floor) : null,
      area: formData.area ? parseFloat(formData.area) : null,
      rooms: formData.rooms ? parseInt(formData.rooms) : null,
      price: formData.price ? parseFloat(formData.price) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      living_area: formData.living_area ? parseFloat(formData.living_area) : null,
      balcony_area: formData.balcony_area ? parseFloat(formData.balcony_area) : null,
      bathroom_areas: bathroomAreasArray.length > 0 ? bathroomAreasArray : null,
      bedroom_areas: bedroomAreasArray.length > 0 ? bedroomAreasArray : null,
      status: formData.status,
      image_url: formData.image_url || null,
      floor_plan_url: formData.floor_plan_url || null,
      is_active: formData.is_active,
    };

    if (editingApartment) {
      updateMutation.mutate({ id: editingApartment.id, ...data });
    } else {
      createMutation.mutate(data as any);
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects?.find((p) => p.id === projectId);
    return project?.name_ka || '-';
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
          <h1 className="text-2xl font-bold">ბინები</h1>
          <p className="text-muted-foreground">მართეთ თქვენი ბინები</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              დამატება
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingApartment ? 'ბინის რედაქტირება' : 'ახალი ბინა'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label>პროექტი</Label>
                <Select
                  value={formData.project_id}
                  onValueChange={(v) => setFormData({ ...formData, project_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიეთ პროექტი" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name_ka}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>სახელი (ქართ.)</Label>
                  <Input
                    value={formData.title_ka}
                    onChange={(e) => setFormData({ ...formData, title_ka: e.target.value })}
                  />
                </div>
                <div>
                  <Label>სახელი (ინგ.)</Label>
                  <Input
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>სართული</Label>
                  <Input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>
                <div>
                  <Label>ფართი (მ²)</Label>
                  <Input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
                <div>
                  <Label>ოთახები</Label>
                  <Input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>სველი წერტილი (რაოდენობა)</Label>
                  <Input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  />
                </div>
                <div>
                  <Label>საძინებელი (რაოდენობა)</Label>
                  <Input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  />
                </div>
              </div>

              {/* Bathroom Areas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>სველი წერტილების ფართები (მ²)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ 
                      ...formData, 
                      bathroom_areas: [...formData.bathroom_areas, ''] 
                    })}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    დამატება
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {formData.bathroom_areas.map((area, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder={`#${index + 1}`}
                        value={area}
                        onChange={(e) => {
                          const newAreas = [...formData.bathroom_areas];
                          newAreas[index] = e.target.value;
                          setFormData({ ...formData, bathroom_areas: newAreas });
                        }}
                      />
                      {formData.bathroom_areas.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => {
                            const newAreas = formData.bathroom_areas.filter((_, i) => i !== index);
                            setFormData({ ...formData, bathroom_areas: newAreas });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bedroom Areas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>საძინებლების ფართები (მ²)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ 
                      ...formData, 
                      bedroom_areas: [...formData.bedroom_areas, ''] 
                    })}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    დამატება
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {formData.bedroom_areas.map((area, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder={`#${index + 1}`}
                        value={area}
                        onChange={(e) => {
                          const newAreas = [...formData.bedroom_areas];
                          newAreas[index] = e.target.value;
                          setFormData({ ...formData, bedroom_areas: newAreas });
                        }}
                      />
                      {formData.bedroom_areas.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => {
                            const newAreas = formData.bedroom_areas.filter((_, i) => i !== index);
                            setFormData({ ...formData, bedroom_areas: newAreas });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>მისალები (მ²)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.living_area}
                    onChange={(e) => setFormData({ ...formData, living_area: e.target.value })}
                  />
                </div>
                <div>
                  <Label>საზაფხულო (მ²)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.balcony_area}
                    onChange={(e) => setFormData({ ...formData, balcony_area: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ფასი</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label>სტატუსი</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData({ ...formData, status: v as Apartment['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">ხელმისაწვდომი</SelectItem>
                      <SelectItem value="reserved">დაჯავშნილი</SelectItem>
                      <SelectItem value="sold">გაყიდული</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>სურათის URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div>
                <Label>გეგმის URL</Label>
                <Input
                  value={formData.floor_plan_url}
                  onChange={(e) => setFormData({ ...formData, floor_plan_url: e.target.value })}
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
                {editingApartment ? 'განახლება' : 'დამატება'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Label>პროექტი:</Label>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ყველა</SelectItem>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name_ka}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">აქტიური</TableHead>
              <TableHead>პროექტი</TableHead>
              <TableHead>სართული</TableHead>
              <TableHead>ფართი</TableHead>
              <TableHead>ფასი</TableHead>
              <TableHead>სტატუსი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments?.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell>
                  <Switch
                    checked={apartment.is_active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: apartment.id, is_active: checked })
                    }
                  />
                </TableCell>
                <TableCell>{getProjectName(apartment.project_id)}</TableCell>
                <TableCell>{apartment.floor || '-'}</TableCell>
                <TableCell>{apartment.area ? `${apartment.area} მ²` : '-'}</TableCell>
                <TableCell>
                  {apartment.price ? `${apartment.price.toLocaleString()} ₾` : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[apartment.status]}>
                    {statusLabels[apartment.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(apartment)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        if (confirm('წავშალოთ ბინა?')) {
                          deleteMutation.mutate(apartment.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {apartments?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  ბინები არ მოიძებნა
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApartmentsList;
