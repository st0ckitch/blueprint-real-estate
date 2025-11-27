import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles, MapPin, Phone, Mail, Send } from "lucide-react";
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

        {/* Contact Section */}
        <section className="mt-24 mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Send className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                კონტაქტი
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                მოდით ვისაუბროთ თქვენს
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                მომავალ პროექტზე
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              გაგზავნეთ შეტყობინება და ჩვენი გუნდი დაგიკავშირდებით 24 საათში
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-6 text-center hover:shadow-lg transition-all group">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">ოფისი</h3>
              <p className="text-sm text-muted-foreground">
                ვაჟა-ფშაველას გამზირი 45<br />თბილისი, საქართველო
              </p>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-6 text-center hover:shadow-lg transition-all group">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">დაგვირეკეთ</h3>
              <a href="tel:+995557123456" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                +995 557 123 456
              </a>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-6 text-center hover:shadow-lg transition-all group">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">ელ.ფოსტა</h3>
              <a href="mailto:info@modex.ge" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                info@modex.ge
              </a>
            </div>
          </div>

          {/* Map and Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-4">იპოვეთ ჩვენი ოფისი</h3>
                <Map height="h-[500px]" showTokenInput={true} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-2">გამოგვიგზავნეთ წერილი</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ან ეწვიეთ <Link to="/contact" className="text-primary hover:underline">სრულ კონტაქტის გვერდს</Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                      სახელი და გვარი *
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="გიორგი გიორგაძე"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                      ელ.ფოსტა *
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="example@mail.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                      შეტყობინება *
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="დაწერეთ თქვენი შეტყობინება..."
                      rows={5}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "იგზავნება..." : "გაგზავნა"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
