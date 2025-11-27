import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark } from "lucide-react";
import heroProperty from "@/assets/hero-building.png";
const FeaturedProperty = () => {
  return <div className="property-card p-0 relative">
      {/* Property Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img src={heroProperty} alt="Featured Property" className="w-full h-full object-cover" />
      </div>

      {/* Property Details Card */}
      <div className="absolute top-4 right-4 bg-card rounded-2xl p-4 shadow-lg w-[240px]">
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">​თბილისი</p>
              <p className="text-xs text-muted-foreground">​ერმილე ბედიას 16          </p>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Contact Form */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h3 className="text-sm font-semibold">კონტაქტი</h3>
            
            <Input placeholder="სახელი" className="text-sm" />
            
            <Input placeholder="ნომერი" type="tel" className="text-sm" />
            
            {/* Mini Map */}
            <div className="rounded-lg overflow-hidden h-24 bg-muted">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95775.19490869!2d44.7833!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61542c07bb42dcbe!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2s!4v1234567890" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              გაგზავნა
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default FeaturedProperty;