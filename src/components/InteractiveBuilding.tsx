import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Building2, Home } from "lucide-react";
import heroBuilding from "@/assets/hero-building.png";

interface Floor {
  id: number;
  name: string;
  nameEn: string;
  apartments: number;
  description: string;
  position: {
    top: string;
    height: string;
  };
}

const floors: Floor[] = [
  {
    id: 6,
    name: "სართული 6",
    nameEn: "Floor 6",
    apartments: 4,
    description: "building.floorDescription",
    position: { top: "8%", height: "14%" }
  },
  {
    id: 5,
    name: "სართული 5",
    nameEn: "Floor 5",
    apartments: 6,
    description: "building.floorDescription",
    position: { top: "22%", height: "14%" }
  },
  {
    id: 4,
    name: "სართული 4",
    nameEn: "Floor 4",
    apartments: 6,
    description: "building.floorDescription",
    position: { top: "36%", height: "14%" }
  },
  {
    id: 3,
    name: "სართული 3",
    nameEn: "Floor 3",
    apartments: 6,
    description: "building.floorDescription",
    position: { top: "50%", height: "14%" }
  },
  {
    id: 2,
    name: "სართული 2",
    nameEn: "Floor 2",
    apartments: 6,
    description: "building.floorDescription",
    position: { top: "64%", height: "14%" }
  },
  {
    id: 1,
    name: "სართული 1",
    nameEn: "Floor 1",
    apartments: 8,
    description: "building.floorDescription",
    position: { top: "78%", height: "14%" }
  }
];

const InteractiveBuilding = () => {
  const { t, i18n } = useTranslation();
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);

  const currentLang = i18n.language;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative h-[400px] overflow-hidden rounded-t-3xl">
        {/* Building Image */}
        <img
          src={heroBuilding}
          alt="Building"
          className="w-full h-full object-cover"
        />

        {/* Floor Overlays */}
        <div className="absolute inset-0">
          {floors.map((floor) => (
            <Tooltip key={floor.id}>
              <TooltipTrigger asChild>
                <button
                  className="absolute left-0 right-0 transition-all duration-300 ease-out cursor-pointer border-2 border-transparent hover:border-primary hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{
                    top: floor.position.top,
                    height: floor.position.height
                  }}
                  onClick={() => setSelectedFloor(floor)}
                  onMouseEnter={() => setHoveredFloor(floor.id)}
                  onMouseLeave={() => setHoveredFloor(null)}
                  aria-label={`${currentLang === 'ka' ? floor.name : floor.nameEn}`}
                >
                  {/* Floor number indicator - visible on hover */}
                  {hoveredFloor === floor.id && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-card rounded-lg px-3 py-1 shadow-lg border border-border animate-fade-in">
                      <span className="text-sm font-semibold text-foreground">
                        {currentLang === 'ka' ? floor.name : floor.nameEn}
                      </span>
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {currentLang === 'ka' ? floor.name : floor.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Home className="h-3 w-3" />
                    {floor.apartments} {t('building.apartments')}
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {t('building.clickToExplore')}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Floor Details Dialog */}
        <Dialog open={!!selectedFloor} onOpenChange={(open) => !open && setSelectedFloor(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="h-6 w-6 text-primary" />
                {selectedFloor && (currentLang === 'ka' ? selectedFloor.name : selectedFloor.nameEn)}
              </DialogTitle>
              <DialogDescription className="text-base">
                {t('building.available')} {selectedFloor?.apartments} {t('building.apartments')}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="rounded-lg bg-muted/50 p-4 border border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedFloor && t(selectedFloor.description)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  onClick={() => setSelectedFloor(null)}
                >
                  {t('building.viewPlan')}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedFloor(null)}
                >
                  {t('building.contactForDetails')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default InteractiveBuilding;
