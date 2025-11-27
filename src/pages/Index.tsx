import Header from "@/components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-semibold mb-8 text-foreground">
          Modex - სლოგანი სლოგანი სლოგანი
        </h1>

        {/* Featured Property */}
        <div className="mb-8">
          <FeaturedProperty />
        </div>

        {/* Search Filters */}
        <div className="mb-16">
          <SearchFilters />
        </div>

        {/* Latest in Your Area */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-foreground">პროექტები</h2>
            <Button variant="outline">View all →</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard
              image={property1}
              price="$850,000"
              beds={3}
              baths={2}
              sqft={1450}
              address="123 Main St, San Jose, CA"
            />
            <PropertyCard
              image={property2}
              price="$1,200,000"
              beds={4}
              baths={3}
              sqft={2100}
              address="456 Oak Ave, San Jose, CA"
            />
            <PropertyCard
              image={property3}
              price="$2,300,000"
              beds={5}
              baths={4}
              sqft={3200}
              address="789 Pine Rd, San Jose, CA"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
