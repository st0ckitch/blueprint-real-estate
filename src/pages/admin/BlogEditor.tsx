import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SeoAnalyzer from '@/components/admin/SeoAnalyzer';

interface BlogPost {
  id: string;
  slug: string;
  title_ka: string;
  title_en: string;
  excerpt_ka: string | null;
  excerpt_en: string | null;
  content_ka: string | null;
  content_en: string | null;
  image_url: string | null;
  category_id: string | null;
  meta_title_ka: string | null;
  meta_title_en: string | null;
  meta_description_ka: string | null;
  meta_description_en: string | null;
  focus_keyword: string | null;
  seo_score: number | null;
  is_active: boolean;
  read_time: number | null;
}

interface Category {
  id: string;
  name_ka: string;
  name_en: string;
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    slug: '',
    title_ka: '',
    title_en: '',
    excerpt_ka: '',
    excerpt_en: '',
    content_ka: '',
    content_en: '',
    image_url: '',
    category_id: '',
    meta_title_ka: '',
    meta_title_en: '',
    meta_description_ka: '',
    meta_description_en: '',
    focus_keyword: '',
    is_active: false,
    read_time: 5,
  });

  const [activeTab, setActiveTab] = useState('ka');

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['admin-blog-post', id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !isNew,
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name_ka');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug,
        title_ka: post.title_ka,
        title_en: post.title_en,
        excerpt_ka: post.excerpt_ka || '',
        excerpt_en: post.excerpt_en || '',
        content_ka: post.content_ka || '',
        content_en: post.content_en || '',
        image_url: post.image_url || '',
        category_id: post.category_id || '',
        meta_title_ka: post.meta_title_ka || '',
        meta_title_en: post.meta_title_en || '',
        meta_description_ka: post.meta_description_ka || '',
        meta_description_en: post.meta_description_en || '',
        focus_keyword: post.focus_keyword || '',
        is_active: post.is_active,
        read_time: post.read_time || 5,
      });
    }
  }, [post]);

  // Calculate SEO score
  const seoScore = useMemo(() => {
    const content = activeTab === 'ka' ? formData.content_ka : formData.content_en;
    const metaTitle = activeTab === 'ka' ? formData.meta_title_ka : formData.meta_title_en;
    const metaDesc = activeTab === 'ka' ? formData.meta_description_ka : formData.meta_description_en;
    const keyword = formData.focus_keyword.toLowerCase().trim();

    let score = 0;
    let total = 0;

    // Keyword check
    total++;
    if (keyword) score++;

    // Title length
    total++;
    if (metaTitle.length >= 30 && metaTitle.length <= 60) score++;

    // Keyword in title
    total++;
    if (keyword && metaTitle.toLowerCase().includes(keyword)) score++;

    // Description length
    total++;
    if (metaDesc.length >= 120 && metaDesc.length <= 160) score++;

    // Keyword in description
    total++;
    if (keyword && metaDesc.toLowerCase().includes(keyword)) score++;

    // Content length
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    total++;
    if (wordCount >= 300) score++;

    // Keyword in content
    total++;
    if (keyword && content.toLowerCase().includes(keyword)) score++;

    return Math.round((score / total) * 100);
  }, [formData, activeTab]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        slug: formData.slug || formData.title_en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        title_ka: formData.title_ka,
        title_en: formData.title_en,
        excerpt_ka: formData.excerpt_ka || null,
        excerpt_en: formData.excerpt_en || null,
        content_ka: formData.content_ka || null,
        content_en: formData.content_en || null,
        image_url: formData.image_url || null,
        category_id: formData.category_id && formData.category_id.trim() !== '' ? formData.category_id : null,
        meta_title_ka: formData.meta_title_ka || null,
        meta_title_en: formData.meta_title_en || null,
        meta_description_ka: formData.meta_description_ka || null,
        meta_description_en: formData.meta_description_en || null,
        focus_keyword: formData.focus_keyword || null,
        seo_score: seoScore,
        is_active: formData.is_active,
        read_time: formData.read_time,
      };

      if (isNew) {
        const { error } = await supabase.from('blog_posts').insert([data]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').update(data).eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: isNew ? 'პოსტი შეიქმნა' : 'პოსტი განახლდა' });
      if (isNew) {
        navigate('/admin/blog');
      }
    },
    onError: (error: any) => {
      toast({
        title: 'შეცდომა',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!isNew && isLoadingPost) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blog')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isNew ? 'ახალი პოსტი' : 'პოსტის რედაქტირება'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label>გამოქვეყნება</Label>
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
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="ka">ქართული</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            <TabsContent value="ka" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>კონტენტი (ქართული)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>სათაური</Label>
                    <Input
                      value={formData.title_ka}
                      onChange={(e) => setFormData({ ...formData, title_ka: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>მოკლე აღწერა</Label>
                    <Textarea
                      value={formData.excerpt_ka}
                      onChange={(e) => setFormData({ ...formData, excerpt_ka: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>კონტენტი</Label>
                    <RichTextEditor
                      content={formData.content_ka}
                      onChange={(content) => setFormData({ ...formData, content_ka: content })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content (English)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      value={formData.excerpt_en}
                      onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <RichTextEditor
                      content={formData.content_en}
                      onChange={(content) => setFormData({ ...formData, content_en: content })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>პარამეტრები</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <Label>კატეგორია</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(v) => setFormData({ ...formData, category_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიეთ" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name_ka}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>სურათის URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div>
                <Label>კითხვის დრო (წუთი)</Label>
                <Input
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                />
              </div>
            </CardContent>
          </Card>

          <SeoAnalyzer
            data={{
              focusKeyword: formData.focus_keyword,
              metaTitle: activeTab === 'ka' ? formData.meta_title_ka : formData.meta_title_en,
              metaDescription: activeTab === 'ka' ? formData.meta_description_ka : formData.meta_description_en,
              content: activeTab === 'ka' ? formData.content_ka : formData.content_en,
            }}
            onChange={(seoData) => {
              if (activeTab === 'ka') {
                setFormData({
                  ...formData,
                  focus_keyword: seoData.focusKeyword ?? formData.focus_keyword,
                  meta_title_ka: seoData.metaTitle ?? formData.meta_title_ka,
                  meta_description_ka: seoData.metaDescription ?? formData.meta_description_ka,
                });
              } else {
                setFormData({
                  ...formData,
                  focus_keyword: seoData.focusKeyword ?? formData.focus_keyword,
                  meta_title_en: seoData.metaTitle ?? formData.meta_title_en,
                  meta_description_en: seoData.metaDescription ?? formData.meta_description_en,
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
