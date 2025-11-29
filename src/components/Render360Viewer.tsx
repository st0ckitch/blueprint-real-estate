import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Move, RotateCw } from 'lucide-react';

function Sphere360() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const texture = useTexture('/src/assets/render-1.png');
  
  // Auto-rotate slowly
  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      scale={[-1, 1, 1]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
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
            <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
            
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
              minDistance={0.1}
              maxDistance={300}
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
