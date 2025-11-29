import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, PerspectiveCamera, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Move, RotateCw, X, Maximize2, Home, Bath, Utensils, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import panorama360 from '@/assets/panorama-360.jpg';

interface Hotspot {
  position: [number, number, number];
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const hotspots: Hotspot[] = [
  {
    position: [200, 30, 100],
    title: 'სასტუმრო ოთახი',
    description: 'ფართო და ნათელი სასტუმრო ოთახი თანამედროვე დიზაინით',
    icon: <Home className="h-5 w-5" />,
    details: ['25 მ² ფართობი', 'ბუნებრივი განათება', 'პანორამული ფანჯრები', 'თანამედროვე მეურნეობა']
  },
  {
    position: [-150, 20, -180],
    title: 'საძინებელი',
    description: 'კომფორტული საძინებელი მდიდარი გარდერობით',
    icon: <Bed className="h-5 w-5" />,
    details: ['18 მ² ფართობი', 'გარდერობი', 'კონდიციონერი', 'ხალიჩიანი იატაკი']
  },
  {
    position: [100, -20, -200],
    title: 'სააბაზანო',
    description: 'თანამედროვე სააბაზანო პრემიუმ აღჭურვილობით',
    icon: <Bath className="h-5 w-5" />,
    details: ['6 მ² ფართობი', 'წყლის გამათბობელი', 'ხარისხიანი სანტექნიკა', 'კერამიკული ფილები']
  },
  {
    position: [-180, 10, 120],
    title: 'სამზარეულო',
    description: 'სრულად აღჭურვილი თანამედროვე სამზარეულო',
    icon: <Utensils className="h-5 w-5" />,
    details: ['12 მ² ფართობი', 'ჩაშენებული ტექნიკა', 'მარმარილოს ზედაპირი', 'სრული აღჭურვილობა']
  }
];

function Hotspot({ position, title, description, icon, details, onClick }: Hotspot & { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#4F46E5" : "#ffffff"} 
          transparent 
          opacity={hovered ? 0.9 : 0.7}
        />
      </mesh>
      
      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 12, 32]} />
        <meshBasicMaterial 
          color="#4F46E5" 
          transparent 
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Html
        distanceFactor={80}
        position={[0, 15, 0]}
        center
        style={{
          transition: 'all 0.2s',
          opacity: hovered ? 1 : 0,
          transform: `scale(${hovered ? 1 : 0.8})`,
          pointerEvents: 'none'
        }}
      >
        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <span className="font-semibold text-sm text-foreground">{title}</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Sphere360({ onHotspotClick }: { onHotspotClick: (hotspot: Hotspot) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const texture = useTexture(panorama360);
  
  // Auto-rotate slowly
  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <mesh 
        ref={meshRef} 
        scale={[-1, 1, 1]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {hotspots.map((hotspot, index) => (
        <Hotspot
          key={index}
          {...hotspot}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </>
  );
}

export default function Render360Viewer() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  return (
    <section className="relative mt-24 mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <RotateCw className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            ინტერაქტიული ტური
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            360° ხედი
          </span>
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          გადაათრიეთ თაგუნა ან შეეხეთ ეკრანს სივრცის სრულად დასათვალიერებლად
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card group">
        {/* Interactive Hint - Fades out after interaction */}
        <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur-md border border-border rounded-xl px-4 py-3 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-500">
          <Move className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">გადაათრიეთ ხედი</span>
        </div>

        {/* Gradient Overlays for depth */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/10 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/10 to-transparent" />
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-[600px] md:h-[700px] lg:h-[800px]">
          <Canvas
            className="cursor-grab active:cursor-grabbing"
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={90} />
            
            {/* Lighting */}
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {/* 360 Sphere */}
            <Sphere360 onHotspotClick={setSelectedHotspot} />
            
            {/* Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={-0.5}
              minDistance={50}
              maxDistance={400}
              autoRotate={false}
            />
          </Canvas>
        </div>

        {/* Hotspot Detail Modal */}
        {selectedHotspot && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 max-w-md mx-4 shadow-2xl animate-scale-in">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {selectedHotspot.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedHotspot.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedHotspot.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedHotspot(null)}
                  className="h-8 w-8 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {selectedHotspot.details.map((detail, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setSelectedHotspot(null)}
                className="w-full mt-6 rounded-xl"
              >
                დახურვა
              </Button>
            </div>
          </div>
        )}

        {/* Property Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">ფასი</p>
              <p className="text-xl font-bold text-foreground">65,000₾</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">ფართობი</p>
              <p className="text-xl font-bold text-foreground">45 მ²</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">ოთახები</p>
              <p className="text-xl font-bold text-foreground">2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">მდებარეობა</p>
              <p className="text-xl font-bold text-foreground truncate">ვაჟა-ფშაველა</p>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      </div>
    </section>
  );
}
