import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bed, Bath, Maximize, Bookmark } from "lucide-react";
import heroProperty from "@/assets/hero-property.jpg";

const FeaturedProperty = () => {
  return (
    <div className="property-card p-0 relative">
      {/* Property Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={heroProperty}
          alt="Featured Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details Card */}
      <div className="absolute top-4 right-4 bg-card rounded-2xl p-4 shadow-lg w-[240px]">
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">2011 Prague Dr,</p>
              <p className="text-xs text-muted-foreground">San Jose, CA 95129</p>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div>
              <p className="text-2xl font-semibold">4</p>
              <p className="text-xs text-muted-foreground">beds</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">3</p>
              <p className="text-xs text-muted-foreground">baths</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">1,868</p>
              <p className="text-xs text-muted-foreground">sqft</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-xl font-semibold">$1,650,000</p>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Split uptown →
            </Button>
          </div>

          {/* Agent */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Amelia</p>
                  <p className="text-sm font-medium">Stephenson</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Agent</p>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Contact
            </Button>
          </div>

          {/* Request Tour */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Request a tour
            <span className="block text-xs font-normal opacity-80">
              Earliest at 11:00 tomorrow
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
