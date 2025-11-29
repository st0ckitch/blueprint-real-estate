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

function Hotspot({ position, title, description, icon, details }: Hotspot) {
  const [hovered, setHovered] = useState(false);
  const lineRef = useRef<THREE.Line>(null);

  useFrame(() => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = hovered ? 0.6 : 0;
    }
  });

  // Calculate info box position (offset to the side)
  const infoOffset: [number, number, number] = [
    position[0] > 0 ? 80 : -80,
    position[1] + 40,
    position[2] > 0 ? 30 : -30
  ];

  // Line points from hotspot to info box
  const linePoints = [
    new THREE.Vector3(...position),
    new THREE.Vector3(position[0], position[1] + 15, position[2]),
    new THREE.Vector3(...infoOffset)
  ];

  return (
    <group>
      {/* Hotspot sphere */}
      <group position={position}>
        <mesh
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
            opacity={hovered ? 1 : 0.7}
          />
        </mesh>
        
        {/* Pulsing ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10, 12, 32]} />
          <meshBasicMaterial 
            color="#4F46E5" 
            transparent 
            opacity={hovered ? 0.8 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Icon label always visible */}
        <Html
          distanceFactor={100}
          position={[0, -20, 0]}
          center
          style={{
            transition: 'all 0.3s',
            pointerEvents: 'none'
          }}
        >
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-lg px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1.5">
              <div className="scale-75">{icon}</div>
            </div>
          </div>
        </Html>
      </group>

      {/* Connecting line */}
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        new THREE.LineBasicMaterial({ 
          color: 0x4F46E5, 
          transparent: true, 
          opacity: 0 
        })
      )} ref={lineRef} />

      {/* Info box on hover */}
      {hovered && (
        <Html
          position={infoOffset}
          distanceFactor={100}
          style={{
            transition: 'all 0.3s ease-out',
            pointerEvents: 'none',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-background/98 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-5 shadow-2xl min-w-[320px] animate-scale-in">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground leading-tight">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
            
            <div className="space-y-2.5">
              {details.map((detail, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 text-base"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Sphere360() {
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
        />
      ))}
    </>
  );
}

export default function Render360Viewer() {
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
            <Sphere360 />
            
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
