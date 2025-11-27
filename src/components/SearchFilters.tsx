import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Building2, DollarSign } from "lucide-react";

const SearchFilters = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      <div className="flex flex-wrap items-center gap-4">
        {/* Location */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">ლოკაცია</p>
            <p className="text-sm font-medium">თბილისი</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Property Type */}
        <div className="flex items-center gap-2 min-w-[220px]">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">მშენებლობის ტიპი</p>
            <p className="text-sm font-medium">აპარტამენტები</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Price Range */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">ფასი</p>
            <p className="text-sm font-medium">40,000 - 83,000</p>
          </div>
        </div>

        {/* View Project Button */}
        <Button className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          პროექტის დათვალიერება
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
