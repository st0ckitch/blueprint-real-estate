import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface BlogPost {
  id: string;
  slug: string;
  title_ka: string;
  title_en: string;
  excerpt_ka: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  read_time: number | null;
  created_at: string;
  category_id: string | null;
  blog_categories?: {
    id: string;
    name_ka: string;
    name_en: string;
    slug: string;
  } | null;
}

interface BlogCategory {
  id: string;
  name_ka: string;
  name_en: string;
  slug: string;
}

const Blog = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch blog posts from database
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(id, name_ka, name_en, slug)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  // Fetch categories from database
  const { data: dbCategories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name_ka');
      
      if (error) throw error;
      return data as BlogCategory[];
    },
  });

  const categories = [
    { id: 'all', name_ka: 'ყველა', name_en: 'All' },
    ...(dbCategories || [])
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts?.filter(post => post.category_id === selectedCategory);

  // Fallback articles if no posts in database
  const fallbackArticles = [
    {
      id: "1",
      slug: "rogor-avirciot-bina-tbilisshi",
      title_ka: "როგორ ავირჩიოთ ბინა თბილისში - სრული გზამკვლევი",
      title_en: "How to Choose an Apartment in Tbilisi - Complete Guide",
      excerpt_ka: "თბილისში ბინის შეძენა დიდი გადაწყვეტილებაა. ამ სტატიაში განვიხილავთ ყველა მნიშვნელოვან ასპექტს.",
      excerpt_en: "Buying an apartment in Tbilisi is a big decision. In this article, we'll cover all the important aspects.",
      created_at: "2024-03-15",
      read_time: 5,
      category_name_ka: "რჩევები",
      category_name_en: "Tips",
      image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
    },
    {
      id: "2",
      slug: "saburthalos-raioni-mimoxilva",
      title_ka: "საბურთალოს რაიონი - სრული მიმოხილვა და ფასები",
      title_en: "Saburtalo District - Complete Overview and Prices",
      excerpt_ka: "საბურთალო თბილისის ერთ-ერთი ყველაზე პოპულარული რაიონია.",
      excerpt_en: "Saburtalo is one of the most popular districts in Tbilisi.",
      created_at: "2024-03-10",
      read_time: 7,
      category_name_ka: "რჩევები",
      category_name_en: "Tips",
      image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    },
    {
      id: "3",
      slug: "investicia-udzravi-qonebashi",
      title_ka: "ინვესტიცია უძრავ ქონებაში 2024 წელს",
      title_en: "Real Estate Investment in 2024",
      excerpt_ka: "უძრავი ქონება რჩება ერთ-ერთ საუკეთესო ინვესტიციად.",
      excerpt_en: "Real estate remains one of the best investments.",
      created_at: "2024-03-05",
      read_time: 6,
      category_name_ka: "ინვესტიცია",
      category_name_en: "Investment",
      image_url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop"
    }
  ];

  const displayPosts = (filteredPosts && filteredPosts.length > 0) ? filteredPosts : (selectedCategory === 'all' ? fallbackArticles : []);

  return (
    <>
      <Helmet>
        <title>ბლოგი - ModX | უძრავი ქონების სიახლეები და რჩევები</title>
        <meta 
          name="description" 
          content="გაეცანით უძრავი ქონების ბაზრის სიახლეებს, რჩევებს და ექსპერტულ მიმოხილვებს. ModX ბლოგზე იპოვით სასარგებლო ინფორმაციას ბინის შეძენის შესახებ." 
        />
        <meta name="keywords" content="უძრავი ქონება, ბლოგი, თბილისი, ბინა, სამშენებლო პროექტები, ინვესტიცია" />
        <link rel="canonical" href="https://yourdomain.com/blog" />
        <meta property="og:title" content="ბლოგი - ModX | უძრავი ქონების სიახლეები" />
        <meta property="og:description" content="უძრავი ქონების ბაზრის სიახლეები და ექსპერტული რჩევები" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  ბლოგი
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  სიახლეები და რჩევები უძრავი ქონების შესახებ
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  გაეცანით უძრავი ქონების ბაზრის უახლეს ტენდენციებს, 
                  ექსპერტულ რჩევებს და სასარგებლო ინფორმაციას
                </p>
              </div>
            </div>
          </section>

          {/* Category Filters */}
          <section className="py-8 px-8 border-b border-border/50">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-3 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full"
                  >
                    {currentLang === 'ka' ? category.name_ka : category.name_en}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="py-16 px-8">
            <div className="max-w-[1200px] mx-auto">
              {postsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {displayPosts.map((article) => {
                    // Check if it's a database post or fallback
                    const isDbPost = 'blog_categories' in article;
                    const title = isDbPost 
                      ? (currentLang === 'ka' ? article.title_ka : article.title_en)
                      : (currentLang === 'ka' ? (article as any).title_ka : (article as any).title_en);
                    const excerpt = isDbPost 
                      ? (currentLang === 'ka' ? article.excerpt_ka : article.excerpt_en)
                      : (currentLang === 'ka' ? (article as any).excerpt_ka : (article as any).excerpt_en);
                    const categoryName = isDbPost 
                      ? (article.blog_categories 
                          ? (currentLang === 'ka' ? article.blog_categories.name_ka : article.blog_categories.name_en) 
                          : null)
                      : (currentLang === 'ka' ? (article as any).category_name_ka : (article as any).category_name_en);
                    const imageUrl = article.image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop";
                    const readTime = article.read_time || 5;
                    const date = article.created_at;
                    const slug = article.slug;

                    return (
                      <article 
                        key={article.id}
                        className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        <Link to={`/blog/${slug}`} className="block">
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={imageUrl} 
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {categoryName && (
                              <div className="absolute top-4 left-4">
                                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                                  {categoryName}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={date}>
                                  {new Date(date).toLocaleDateString('ka-GE', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </time>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{readTime} წუთი</span>
                              </div>
                            </div>
                            
                            <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {title}
                            </h2>
                            
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {excerpt}
                            </p>
                            
                            <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                              <span>წაიკითხე მეტი</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              )}

              {!postsLoading && displayPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">სტატიები ვერ მოიძებნა</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Blog;
