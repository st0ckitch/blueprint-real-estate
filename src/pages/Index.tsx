import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

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
      </main>
    </div>
  );
};

export default Index;
