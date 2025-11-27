import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles, MapPin, Phone, Mail, Check, Facebook, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" }).max(100),
  email: z.string().trim().email({ message: "არასწორი ელ.ფოსტა" }).max(255),
  message: z.string().trim().min(10, { message: "შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო" }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const blogArticles = [
  {
    id: "1",
    slug: "rogor-avirciot-bina-tbilisshi",
    title: "როგორ ავირჩიოთ ბინა თბილისში - სრული გზამკვლევი",
    excerpt: "თბილისში ბინის შეძენა დიდი გადაწყვეტილებაა. ამ სტატიაში განვიხილავთ ყველა მნიშვნელოვან ასპექტს, რომელიც უნდა გაითვალისწინოთ.",
    date: "2024-03-15",
    readTime: "5 წუთი",
    category: "რჩევები",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    slug: "saburthalos-raioni-mimoxilva",
    title: "საბურთალოს რაიონი - სრული მიმოხილვა და ფასები",
    excerpt: "საბურთალო თბილისის ერთ-ერთი ყველაზე პოპულარული რაიონია. გაეცანით რაიონის უპირატესობებს და უძრავი ქონების ფასებს.",
    date: "2024-03-10",
    readTime: "7 წუთი",
    category: "რაიონები",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
  },
  {
    id: "3",
    slug: "investicia-udzravi-qonebashi",
    title: "ინვესტიცია უძრავ ქონებაში 2024 წელს",
    excerpt: "უძრავი ქონება რჩება ერთ-ერთ საუკეთესო ინვესტიციად. გაიგეთ, რატომ და როგორ დაიწყოთ ინვესტირება.",
    date: "2024-03-05",
    readTime: "6 წუთი",
    category: "ინვესტიცია",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop"
  }
];

const Index = () => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "წარმატებით გაიგზავნა",
        description: "ჩვენ მალე დაგიკავშირდებით",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადოთ თავიდან",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="w-full px-8 py-8 max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-semibold mb-8 text-foreground">
          Modex - სლოგანი სლოგანი სლოგანი
        </h1>

        {/* Featured Property */}
        <div className="mb-8">
          <FeaturedProperty />
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">მიმდინარე პროექტები</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            {/* Project 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Modex აღმაშენებელზე</h3>
              <SearchFilters />
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-8" />

            {/* Project 2 */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Modex საბურთალოზე</h3>
              <SearchFilters />
            </div>
          </div>
        </div>

        {/* Latest in Your Area */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-foreground">რენდერები</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard
              image={render1}
              price="65,000₾"
              beds={2}
              baths={1}
              sqm={45}
              address="ვაჟა-ფშაველას გამზირი, თბილისი"
            />
            <PropertyCard
              image={render2}
              price="48,000₾"
              beds={1}
              baths={1}
              sqm={32}
              address="აღმაშენებლის გამზირი, თბილისი"
            />
            <PropertyCard
              image={render3}
              price="125,000₾"
              beds={3}
              baths={2}
              sqm={78}
              address="ჩავჩავაძის გამზირი, თბილისი"
            />
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-24 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  ბლოგი
                </span>
              </div>
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  სიახლეები და რჩევები
                </span>
              </h2>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="group">
                ყველას ნახვა
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogArticles.map((article) => (
              <article 
                key={article.id}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <Link to={`/blog/${article.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString('ka-GE', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>წაიკითხე მეტი</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section - Modern Design */}
        <section className="relative mt-24 mb-16 bg-background rounded-3xl overflow-hidden border border-border/50">
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
            <h2 className="text-[20vw] font-black whitespace-nowrap text-foreground">
              დაგვიკავშირდი
            </h2>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Side - Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-foreground">
                    მოგვწერეთ
                  </h2>
                  <ArrowRight className="h-10 w-10 text-primary" strokeWidth={3} />
                </div>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  გაქვთ კითხვა ან გჭირდებათ დახმარება? დაუკავშირდით ჩვენს გუნდს. 
                  ჩვენ აქ ვართ, რომ დაგეხმაროთ ნებისმიერ საკითხში.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="contact-name"
                        placeholder="სახელი"
                        {...register("name")}
                        className={`bg-muted/50 border-border h-12 ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="ელ.ფოსტა"
                        {...register("email")}
                        className={`bg-muted/50 border-border h-12 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Textarea
                      id="contact-message"
                      placeholder="შეტყობინება"
                      rows={8}
                      {...register("message")}
                      className={`bg-muted/50 border-border resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold rounded-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "იგზავნება..." : "გაგზავნა"}
                  </Button>
                </form>

                {/* Features - Below Form */}
                <div className="space-y-4 mt-8 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">პერსონალიზებული მომსახურება</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">სწრაფი პასუხი</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">სრული მხარდაჭერა</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-8">
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
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
                  <h3 className="text-xl font-semibold mb-2 text-foreground">დაგვწერეთ</h3>
                  <a href="mailto:info@modex.ge" className="text-muted-foreground hover:text-primary text-lg transition-colors font-medium">
                    info@modex.ge
                  </a>
                </div>

                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">დარეკეთ</h3>
                  <a href="tel:+995557123456" className="text-muted-foreground hover:text-primary text-lg transition-colors font-medium">
                    +995 557 123 456
                  </a>
                </div>

                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all group">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">ჩვენი ლოკაცია</h3>
                  <p className="text-muted-foreground text-lg">
                    ვაჟა-ფშაველას გამზირი 45<br />თბილისი, საქართველო
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
