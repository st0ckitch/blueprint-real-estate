import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  image: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  address?: string;
}

const PropertyCard = ({ image, price, beds, baths, sqm, address }: PropertyCardProps) => {
  return (
    <div className="property-card overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt="უძრავი ქონება"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {price && (
        <div className="p-4">
          <p className="text-lg font-semibold mb-2">{price}</p>
          {address && <p className="text-sm text-muted-foreground mb-3">{address}</p>}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {beds && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{beds} საძინებელი</span>
              </div>
            )}
            {baths && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{baths} სააბაზანო</span>
              </div>
            )}
            {sqm && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{sqm} მ²</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
