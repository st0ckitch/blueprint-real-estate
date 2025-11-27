import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

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
      </main>
    </div>
  );
};

export default Index;
