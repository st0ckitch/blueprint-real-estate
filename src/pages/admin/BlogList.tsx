import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, ExternalLink, Loader2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  slug: string;
  title_ka: string;
  title_en: string;
  excerpt_ka: string | null;
  image_url: string | null;
  category_id: string | null;
  is_active: boolean;
  seo_score: number | null;
  created_at: string;
}

interface Category {
  id: string;
  name_ka: string;
}

const BlogList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name_ka');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: 'პოსტი წაიშალა' });
    },
    onError: () => {
      toast({ title: 'შეცდომა', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('blog_posts').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
    },
  });

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return '-';
    const category = categories?.find((c) => c.id === categoryId);
    return category?.name_ka || '-';
  };

  const getSeoScoreColor = (score: number | null) => {
    if (!score) return 'secondary';
    if (score >= 70) return 'default';
    if (score >= 40) return 'secondary';
    return 'destructive';
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
          <h1 className="text-2xl font-bold">ბლოგ პოსტები</h1>
          <p className="text-muted-foreground">მართეთ თქვენი ბლოგი</p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            ახალი პოსტი
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">აქტიური</TableHead>
              <TableHead className="w-20">სურათი</TableHead>
              <TableHead>სათაური</TableHead>
              <TableHead>კატეგორია</TableHead>
              <TableHead>SEO</TableHead>
              <TableHead>თარიღი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Switch
                    checked={post.is_active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: post.id, is_active: checked })
                    }
                  />
                </TableCell>
                <TableCell>
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt=""
                      className="h-12 w-16 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded bg-muted">
                      <Image className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{post.title_ka}</div>
                    <div className="text-sm text-muted-foreground">/{post.slug}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{getCategoryName(post.category_id)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getSeoScoreColor(post.seo_score) as any}>
                    {post.seo_score || 0}%
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(post.created_at), 'dd.MM.yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/blog/${post.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        if (confirm('წავშალოთ პოსტი?')) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  პოსტები არ მოიძებნა
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogList;
