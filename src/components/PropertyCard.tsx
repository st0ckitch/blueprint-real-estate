import { Bed, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id?: string;
  image: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  address?: string;
}

const PropertyCard = ({ id, image, price, beds, baths, sqm, address }: PropertyCardProps) => {
  const content = (
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
          <div className="flex items-center gap-4 text-sm">
            {beds && (
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Bed className="h-4 w-4 text-primary" />
                <span className="text-primary">{beds}</span>
                <span className="text-muted-foreground font-normal">ოთახი</span>
              </div>
            )}
            {baths && (
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Bath className="h-4 w-4 text-primary" />
                <span className="text-primary">{baths}</span>
                <span className="text-muted-foreground font-normal">სააბაზანო</span>
              </div>
            )}
            {sqm && (
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Maximize className="h-4 w-4 text-primary" />
                <span className="text-primary">{sqm}</span>
                <span className="text-muted-foreground font-normal">მ²</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (id) {
    return <Link to={`/apartments/${id}`}>{content}</Link>;
  }

  return content;
};

export default PropertyCard;
