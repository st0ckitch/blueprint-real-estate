import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Building2, DollarSign, Bed, SlidersHorizontal } from "lucide-react";

const SearchFilters = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      <div className="flex flex-wrap items-center gap-4">
        {/* Location */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">San Jose, CA</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Property Type */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Property type</p>
            <p className="text-sm font-medium">Apartments</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Price Range */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-sm font-medium">$2,000-$13,000</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Bedrooms */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <Bed className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Bedrooms</p>
            <p className="text-sm font-medium">3-5</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* More Filters */}
        <Button variant="ghost" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          More
        </Button>

        {/* Search Button */}
        <Button className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
