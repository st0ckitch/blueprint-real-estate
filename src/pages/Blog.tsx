import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const articles: BlogArticle[] = [
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
  },
  {
    id: "4",
    slug: "axali-proektebi-tbilisshi",
    title: "ახალი სამშენებლო პროექტები თბილისში",
    excerpt: "თბილისში მიმდინარე და დაგეგმილი სამშენებლო პროექტების მიმოხილვა. რა ელის ქალაქს მომავალში?",
    date: "2024-03-01",
    readTime: "8 წუთი",
    category: "პროექტები",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
  }
];

const Blog = () => {
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

          {/* Articles Grid */}
          <section className="py-16 px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <article 
                    key={article.id}
                    className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={article.date}>
                              {new Date(article.date).toLocaleDateString('ka-GE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                          <span>წაიკითხე მეტი</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Blog;
