import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles, MapPin, Phone, Mail, Check, Facebook, Twitter, Instagram, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from 'react-i18next';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const contactSchema = z.object({
  name: z.string().trim().min(2, {
    message: "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო"
  }).max(100),
  email: z.string().trim().email({
    message: "არასწორი ელ.ფოსტა"
  }).max(255),
  message: z.string().trim().min(10, {
    message: "შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო"
  }).max(1000)
});
type ContactFormData = z.infer<typeof contactSchema>;

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
  blog_categories?: {
    name_ka: string;
    name_en: string;
  } | null;
}

// Fallback blog articles
const fallbackBlogArticles = [{
  id: "1",
  slug: "rogor-avirciot-bina-tbilisshi",
  title_ka: "როგორ ავირჩიოთ ბინა თბილისში - სრული გზამკვლევი",
  title_en: "How to Choose an Apartment in Tbilisi",
  excerpt_ka: "თბილისში ბინის შეძენა დიდი გადაწყვეტილებაა.",
  excerpt_en: "Buying an apartment in Tbilisi is a big decision.",
  created_at: "2024-03-15",
  read_time: 5,
  category_ka: "რჩევები",
  category_en: "Tips",
  image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
}, {
  id: "2",
  slug: "saburthalos-raioni-mimoxilva",
  title_ka: "საბურთალოს რაიონი - სრული მიმოხილვა და ფასები",
  title_en: "Saburtalo District - Complete Overview",
  excerpt_ka: "საბურთალო თბილისის ერთ-ერთი ყველაზე პოპულარული რაიონია.",
  excerpt_en: "Saburtalo is one of the most popular districts.",
  created_at: "2024-03-10",
  read_time: 7,
  category_ka: "რაიონები",
  category_en: "Districts",
  image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
}, {
  id: "3",
  slug: "investicia-udzravi-qonebashi",
  title_ka: "ინვესტიცია უძრავ ქონებაში 2024 წელს",
  title_en: "Real Estate Investment in 2024",
  excerpt_ka: "უძრავი ქონება რჩება ერთ-ერთ საუკეთესო ინვესტიციად.",
  excerpt_en: "Real estate remains one of the best investments.",
  created_at: "2024-03-05",
  read_time: 6,
  category_ka: "ინვესტიცია",
  category_en: "Investment",
  image_url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop"
}];
const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { toast } = useToast();
  const { data: siteSettings } = useSiteSettings();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  // Fetch apartments from database
  const { data: apartments } = useQuery({
    queryKey: ['homepage-apartments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apartments')
        .select('*, projects(name_ka, name_en, address_ka, address_en)')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch blog posts from database
  const { data: blogPosts } = useQuery({
    queryKey: ['homepage-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(name_ka, name_en)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: t('contact.send'),
        description: t('contact.subtitle')
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const defaultImages = [render1, render2, render3];
  
  // Get contact info from settings with fallbacks
  const companyEmail = siteSettings?.company_email || 'Sales@modx.ge';
  const companyPhone = siteSettings?.company_phone || '599 87 89 89';
  const companyAddress = siteSettings?.company_address || 'პ.ასლანიდის 9, Tbilisi, Georgia';
  
  // Use database blog posts or fallback
  const displayBlogPosts = blogPosts && blogPosts.length > 0 ? blogPosts : fallbackBlogArticles;

  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="w-full px-8 py-8 max-w-[1200px] mx-auto">
        {/* Featured Property */}
        <div className="mb-8">
          <FeaturedProperty />
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">{t('projects.current')}</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{t('projects.tbilisi_themka')}</h3>
              <SearchFilters />
            </div>
          </div>
        </div>

        {/* Latest in Your Area */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-foreground">{t('apartments.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments && apartments.length > 0 ? (
              apartments.map((apt, index) => (
                <PropertyCard 
                  key={apt.id}
                  id={apt.id}
                  image={apt.image_url || defaultImages[index % 3]} 
                  price={apt.price ? `${apt.price.toLocaleString()}₾` : undefined}
                  beds={apt.rooms || undefined} 
                  baths={apt.bathrooms || undefined} 
                  sqm={apt.area || undefined} 
                  address={apt.projects ? (currentLang === 'ka' ? apt.projects.address_ka : apt.projects.address_en) || 'თბილისი' : 'თბილისი'} 
                />
              ))
            ) : (
              <>
                <PropertyCard image={render1} price="65,000₾" beds={2} baths={1} sqm={45} address="თემქა, თბილისი" />
                <PropertyCard image={render2} price="48,000₾" beds={1} baths={1} sqm={32} address="თემქა, თბილისი" />
                <PropertyCard image={render3} price="125,000₾" beds={3} baths={2} sqm={78} address="თემქა, თბილისი" />
              </>
            )}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-24 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {t('blog.title')}
                </span>
              </div>
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {t('blog.subtitle')}
                </span>
              </h2>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="group">
                {t('blog.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayBlogPosts.map(article => {
              const isDbPost = 'blog_categories' in article;
              const title = isDbPost 
                ? (currentLang === 'ka' ? (article as BlogPost).title_ka : (article as BlogPost).title_en)
                : (currentLang === 'ka' ? (article as any).title_ka : (article as any).title_en);
              const excerpt = isDbPost 
                ? (currentLang === 'ka' ? (article as BlogPost).excerpt_ka : (article as BlogPost).excerpt_en)
                : (currentLang === 'ka' ? (article as any).excerpt_ka : (article as any).excerpt_en);
              const categoryName = isDbPost 
                ? ((article as BlogPost).blog_categories 
                    ? (currentLang === 'ka' ? (article as BlogPost).blog_categories!.name_ka : (article as BlogPost).blog_categories!.name_en) 
                    : null)
                : (currentLang === 'ka' ? (article as any).category_ka : (article as any).category_en);
              const imageUrl = article.image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop";
              const readTime = article.read_time || 5;
              const date = article.created_at;

              return (
                <article key={article.id} className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <Link to={`/blog/${article.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                      {categoryName && (
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
                            {categoryName}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={date}>
                            {new Date(date).toLocaleDateString('ka-GE', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{readTime} წუთი</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        <span>{t('blog.readMore')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-24 mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                ხშირად დასმული კითხვები
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                  როგორ შევიძინო ბინა MODX-ში?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  ბინის შესაძენად დაგვიკავშირდით ტელეფონით ან შეავსეთ საკონტაქტო ფორმა. ჩვენი გუნდი დაგიკავშირდებათ და მოგაწვდით ყველა საჭირო ინფორმაციას, მათ შორის ფასებს, გადახდის პირობებს და ხელშეკრულების დეტალებს.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                  რა გადახდის მეთოდები არსებობს?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  ჩვენ ვთავაზობთ მოქნილ გადახდის პირობებს: სრული გადახდა, განვადება ბანკის მეშვეობით, ან პირდაპირი განვადება კომპანიისგან. თითოეული ვარიანტის დეტალები განიხილება ინდივიდუალურად.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                  როდის დასრულდება მშენებლობა?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  მშენებლობის დასრულების თარიღი დამოკიდებულია კონკრეტულ პროექტზე. თემქას პროექტის დასრულება დაგეგმილია 2025 წლის ბოლოსთვის. დეტალური ინფორმაცია თითოეული პროექტის გვერდზეა მითითებული.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                  შესაძლებელია თუ არა ბინის დაჯავშნა?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  დიახ, შესაძლებელია ბინის დაჯავშნა. ამისთვის საჭიროა საჯავშნო თანხის გადახდა, რომელიც შემდგომ ჩაითვლება ბინის ღირებულებაში. ჯავშანი მოქმედებს განსაზღვრული პერიოდის განმავლობაში.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                  რა გარანტიას იძლევით?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  ჩვენ ვიძლევით მშენებლობის ხარისხზე გარანტიას საქართველოს კანონმდებლობით დადგენილი წესით. ასევე, ყველა ბინა გადის ხარისხის კონტროლს ჩაბარებამდე და მომხმარებელს გადაეცემა სრულყოფილ მდგომარეობაში.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section - Modern Design */}
        <section className="relative mt-24 mb-16 bg-background rounded-3xl overflow-hidden border border-border/50">
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
            <h2 className="text-[20vw] font-black whitespace-nowrap text-foreground">
              {t('contact.getInTouch')}
            </h2>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Side - Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-foreground">
                    {t('contact.title')}
                  </h2>
                  <ArrowRight className="h-10 w-10 text-primary" strokeWidth={3} />
                </div>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t('contact.subtitle')}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input id="contact-name" placeholder={t('contact.name')} {...register("name")} className={`bg-muted/50 border-border h-12 ${errors.name ? "border-destructive" : ""}`} />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input id="contact-email" type="email" placeholder={t('contact.email')} {...register("email")} className={`bg-muted/50 border-border h-12 ${errors.email ? "border-destructive" : ""}`} />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Textarea id="contact-message" placeholder={t('contact.message')} rows={8} {...register("message")} className={`bg-muted/50 border-border resize-none ${errors.message ? "border-destructive" : ""}`} />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg font-semibold rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                  </Button>
                </form>

                {/* Features - Below Form */}
                <div className="space-y-4 mt-8 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">{t('contact.features.personalized')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">{t('contact.features.quick')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">{t('contact.features.support')}</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-8">
                  <a href="#" className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5 text-foreground" />
                  </a>
                  <a href="#" className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5 text-foreground" />
                  </a>
                  <a href="#" className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5 text-foreground" />
                  </a>
                </div>
              </div>

              {/* Right Side - Contact Info Cards */}
              <div className="flex flex-col justify-center gap-6">
                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t('contact.writeUs')}</h3>
                  <a href={`mailto:${companyEmail}`} className="text-muted-foreground hover:text-primary text-lg transition-colors font-medium">
                    {companyEmail}
                  </a>
                </div>

                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t('contact.callUs')}</h3>
                  <a href={`tel:${companyPhone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary text-lg transition-colors font-medium">
                    {companyPhone}
                  </a>
                </div>

                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t('contact.ourLocation')}</h3>
                  <p className="text-muted-foreground text-lg">
                    {companyAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>;
};
export default Index;