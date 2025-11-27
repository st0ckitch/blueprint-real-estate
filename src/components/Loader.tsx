import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Modex Logo */}
        <h1 className="text-5xl font-bold text-foreground animate-fade-in">
          MODEX
        </h1>

        {/* Building Animation */}
        <div className="relative w-48 h-64">
          {/* Building Structure */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 bg-card border-2 border-primary/30 rounded-t-lg overflow-hidden">
            {/* Building Fill - animates from bottom to top */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/20 to-primary/10 transition-all duration-300 ease-out"
              style={{ height: `${progress}%` }}
            >
              {/* Windows */}
              <div className="grid grid-cols-3 gap-2 p-2">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square bg-primary/40 rounded-sm transition-opacity duration-300 ${
                      (i + 1) * 11 <= progress ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Building Outline */}
            <div className="relative h-64 border-x-2 border-primary/30" />
          </div>

          {/* Construction Crane */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-[swing_2s_ease-in-out_infinite]">
            <div className="w-1 h-16 bg-primary/60 mx-auto" />
            <div className="w-24 h-1 bg-primary/60" />
            <div className="absolute right-0 top-0 w-4 h-6 bg-primary/80 animate-[bounce_1s_ease-in-out_infinite]" />
          </div>

          {/* Ground Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border" />
        </div>

        {/* Progress Text */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            იტვირთება... {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
