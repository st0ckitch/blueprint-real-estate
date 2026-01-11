import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import InteractiveBuilding from "./InteractiveBuilding";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Banner {
  id: string;
  title_ka: string | null;
  title_en: string | null;
  image_url: string;
  link_url: string | null;
}

const FeaturedProperty = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Fetch active banners
  const { data: banners } = useQuery({
    queryKey: ['homepage-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Banner[];
    },
  });

  // Fetch first active project for details card
  const { data: project } = useQuery({
    queryKey: ['homepage-featured-project'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  // Parallax effect - image moves up on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the viewport the element is
        // Start with image shifted down, move up as user scrolls
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          setParallaxOffset(scrollProgress * 60); // 60px max movement
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners]);

  const currentBanner = banners?.[currentBannerIndex];
  const hasBanners = banners && banners.length > 0;

  const goToPrevBanner = () => {
    if (!banners) return;
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNextBanner = () => {
    if (!banners) return;
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="property-card p-0 relative">
      {/* Banner/Hero Image with Parallax */}
      {hasBanners ? (
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl"
        >
          <div 
            className="absolute inset-0 w-full h-[130%] top-0"
            style={{ 
              transform: `translateY(${-30 + parallaxOffset}px)`,
              transition: 'transform 0.05s linear'
            }}
          >
            <img
              src={currentBanner?.image_url}
              alt={currentLang === 'ka' ? currentBanner?.title_ka || 'Banner' : currentBanner?.title_en || 'Banner'}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
          
          {/* Banner Title Overlay */}
          {(currentBanner?.title_ka || currentBanner?.title_en) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                {currentLang === 'ka' ? currentBanner?.title_ka : currentBanner?.title_en}
              </h2>
            </div>
          )}
          
          {/* Banner Navigation */}
          {banners && banners.length > 1 && (
            <>
              <button
                onClick={goToPrevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous banner"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-all"
                aria-label="Next banner"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentBannerIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        /* Fallback: Interactive Building */
        <InteractiveBuilding />
      )}

      {/* Property Details Card */}
      <div className="absolute top-4 right-4 bg-card rounded-2xl p-4 shadow-lg w-[240px]">
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {project ? (currentLang === 'ka' ? 'თბილისი' : 'Tbilisi') : 'თბილისი'}
              </p>
              <p className="text-xs text-muted-foreground">
                {project 
                  ? (currentLang === 'ka' ? project.address_ka : project.address_en) || 'ერმილე ბედიას 16'
                  : 'ერმილე ბედიას 16'}
              </p>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Contact Form */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h3 className="text-sm font-semibold">დაკავშირება</h3>
            
            <Input placeholder="სახელი" className="text-sm" />
            
            <Input placeholder="ნომერი" type="tel" className="text-sm" />
            
            {/* Mini Map */}
            <div className="rounded-lg overflow-hidden h-24 bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95775.19490869!2d44.7833!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61542c07bb42dcbe!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2s!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>
            
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              გაგზავნა
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
