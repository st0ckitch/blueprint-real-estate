import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  image: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  address?: string;
}

const PropertyCard = ({ image, price, beds, baths, sqft, address }: PropertyCardProps) => {
  return (
    <div className="property-card overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt="Property"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {price && (
        <div className="p-4">
          <p className="text-xl font-semibold mb-2">{price}</p>
          {address && <p className="text-sm text-muted-foreground mb-3">{address}</p>}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {beds && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{beds} beds</span>
              </div>
            )}
            {baths && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{baths} baths</span>
              </div>
            )}
            {sqft && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{sqft} sqft</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
