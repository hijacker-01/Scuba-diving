'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const OceanScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00c6ac" intensity={0.5} />
        <Sphere args={[3, 32, 32]}>
          <meshStandardMaterial color="#00c6ac" emissive="#00c6ac" emissiveIntensity={0.2} transparent opacity={0.2} />
        </Sphere>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default OceanScene;
