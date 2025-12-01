import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const Renders = () => {
  const renders = [
    {
      id: "1",
      image: render1,
      price: "75,000₾",
      beds: 3,
      baths: 2,
      sqm: 85,
      address: "ვაჟა-ფშაველას გამზირი, თბილისი"
    },
    {
      id: "2",
      image: render2,
      price: "65,000₾",
      beds: 2,
      baths: 1,
      sqm: 60,
      address: "აღმაშენებლის გამზირი, თბილისი"
    },
    {
      id: "3",
      image: render3,
      price: "95,000₾",
      beds: 4,
      baths: 2,
      sqm: 120,
      address: "ჭავჭავაძის გამზირი, თბილისი"
    },
    {
      id: "4",
      image: render1,
      price: "58,000₾",
      beds: 2,
      baths: 1,
      sqm: 55,
      address: "დიღომი, თბილისი"
    },
    {
      id: "5",
      image: render2,
      price: "82,000₾",
      beds: 3,
      baths: 2,
      sqm: 90,
      address: "საბურთალო, თბილისი"
    },
    {
      id: "6",
      image: render3,
      price: "110,000₾",
      beds: 4,
      baths: 3,
      sqm: 135,
      address: "ვაკე, თბილისი"
    }
  ];

  return (
    <>
      <Helmet>
        <title>რენდერები | ModX - უძრავი ქონების 3D ვიზუალიზაცია</title>
        <meta name="description" content="იხილეთ ModX-ის უძრავი ქონების უმაღლესი ხარისხის 3D რენდერები და ვიზუალიზაციები. ფოტორეალისტური ბინების და სახლების გამოსახულებები." />
        <meta name="keywords" content="რენდერები, 3D ვიზუალიზაცია, უძრავი ქონება, ბინები თბილისში, არქიტექტურული რენდერები" />
        <link rel="canonical" href="https://modx.ge/renders" />
        
        <meta property="og:title" content="რენდერები | ModX" />
        <meta property="og:description" content="იხილეთ ModX-ის უძრავი ქონების უმაღლესი ხარისხის 3D რენდერები და ვიზუალიზაციები." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://modex.ge/renders" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Animated background layers */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-background to-primary/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="max-w-[1200px] mx-auto px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <div className="space-y-8 animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-sm font-medium">3D ვიზუალიზაცია</span>
                  </div>
                  
                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        პროფესიონალური
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                        3D რენდერები
                      </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      ფოტორეალისტური ვიზუალიზაციები, რომლებიც ცოცხლდება. 
                      თითოეული დეტალი შექმნილია უმაღლესი ხარისხის სტანდარტებით.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow">
                      იხილეთ პორტფოლიო
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8">
                      დაგვიკავშირდით
                    </Button>
                  </div>
                </div>

                {/* Right content - Feature cards */}
                <div className="grid grid-cols-2 gap-4 animate-scale-in">
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale shadow-lg">
                      <div className="text-4xl font-bold text-primary mb-2">4K</div>
                      <div className="text-sm text-muted-foreground">ულტრა HD ხარისხი</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale shadow-lg">
                      <div className="text-4xl font-bold text-primary mb-2">360°</div>
                      <div className="text-sm text-muted-foreground">სრული ხედები</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale shadow-lg">
                      <div className="text-4xl font-bold text-primary mb-2">24h</div>
                      <div className="text-sm text-muted-foreground">სწრაფი მიწოდება</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale shadow-lg">
                      <div className="text-4xl font-bold text-primary mb-2">100+</div>
                      <div className="text-sm text-muted-foreground">პროექტი</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Renders Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {renders.map((render) => (
                <Link key={render.id} to={`/renders/${render.id}`}>
                  <PropertyCard {...render} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Renders;
