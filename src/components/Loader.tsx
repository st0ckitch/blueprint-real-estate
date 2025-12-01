import { useEffect, useState } from "react";

const Loader = () => {
  const [stackedBlocks, setStackedBlocks] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const totalBlocks = 8;

  useEffect(() => {
    // Stack blocks one by one
    const stackInterval = setInterval(() => {
      setStackedBlocks((prev) => {
        if (prev >= totalBlocks) {
          clearInterval(stackInterval);
          // Start transformation after stacking is complete
          setTimeout(() => setIsTransforming(true), 300);
          return totalBlocks;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(stackInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        {/* ModX Logo */}
        <h1 className="text-6xl font-bold text-foreground tracking-wider">
          ModX
        </h1>

        {/* Building/Blocks Animation */}
        <div className="relative w-48 h-64 flex items-end justify-center">
          {/* Stacking Blocks */}
          <div className={`relative transition-all duration-1000 ${isTransforming ? 'scale-110' : 'scale-100'}`}>
            {[...Array(totalBlocks)].map((_, index) => (
              <div
                key={index}
                className={`
                  w-24 h-8 mb-0.5 mx-auto
                  transition-all duration-500 ease-out
                  ${index < stackedBlocks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  ${isTransforming ? 'bg-gradient-to-r from-primary/30 to-primary/20 border-2 border-primary/40' : 'bg-primary/60 border-2 border-primary/70'}
                  ${isTransforming ? 'rounded-none' : 'rounded-sm'}
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Windows appear during transformation */}
                {isTransforming && (
                  <div className="flex justify-evenly items-center h-full px-2 animate-fade-in">
                    <div className="w-3 h-4 bg-primary/60 rounded-sm" />
                    <div className="w-3 h-4 bg-primary/60 rounded-sm" />
                    <div className="w-3 h-4 bg-primary/60 rounded-sm" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Building roof appears after transformation */}
            {isTransforming && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-primary/50 clip-triangle animate-fade-in" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            )}
          </div>

          {/* Ground Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/50" />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {stackedBlocks < totalBlocks ? 'იტვირთება...' : 'მზადაა!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
