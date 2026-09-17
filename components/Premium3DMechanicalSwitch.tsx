'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Gear3D = ({
  position,
  scale,
  teeth = 12,
  isActive = false,
  reverse = false,
}: {
  position: [number, number, number];
  scale: number;
  teeth?: number;
  isActive: boolean;
  reverse?: boolean;
}) => {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.z += reverse ? -0.02 : 0.02;
    }
  });
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.2, teeth, 1]} />
      <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} emissive="#333333" />
      {Array.from({ length: teeth }).map((_, i) => (
        <mesh key={`tooth-${i}`} position={[Math.cos((i / teeth) * Math.PI * 2), Math.sin((i / teeth) * Math.PI * 2), 0.15]} scale={[0.15, 0.3, 0.2]}>
          <boxGeometry />
          <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.15]} scale={0.3}>
        <cylinderGeometry args={[1, 1, 0.4, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
      </mesh>
    </mesh>
  );
};

const Lever3D = ({ rotation, isActive }: { rotation: number; isActive: boolean }) => {
  const meshRef = useRef<Mesh>(null);
  return (
    <mesh ref={meshRef} rotation={[0, 0, (rotation * Math.PI) / 180]}>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 1.5, 4, 8]} />
        <meshStandardMaterial
          color={isActive ? '#3b82f6' : '#ef4444'}
          metalness={0.7}
          roughness={0.3}
          emissive={isActive ? '#1e40af' : '#991b1b'}
          emissiveIntensity={0.2}
        />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`ridge-${i}`} position={[0, -0.5 + (i * 0.15), 0.25]} scale={[0.15, 0.05, 0.1]}>
          <boxGeometry />
          <meshStandardMaterial color={isActive ? '#1e40af' : '#7f1d1d'} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </mesh>
  );
};

const MechanicalSwitchScene = ({ isActive }: { isActive: boolean }) => (
  <>
    <ambientLight intensity={0.6} color="#ffffff" />
    <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
    <pointLight position={[-5, -5, 5]} intensity={0.4} color="#4f46e5" />
    <pointLight position={[0, 0, -5]} intensity={0.3} color="#ef4444" />
    <Gear3D position={[-2, 0, 0]} scale={1.2} teeth={16} isActive={isActive} />
    <Gear3D position={[2, 0, 0]} scale={0.9} teeth={12} isActive={isActive} reverse />
    <Lever3D rotation={isActive ? 35 : -35} isActive={isActive} />
    <mesh position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry />
      <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
    </mesh>
  </>
);

interface Premium3DSwitchProps {
  onToggle?: (state: boolean) => void;
  initialState?: boolean;
  soundEnabled?: boolean;
}

const Premium3DMechanicalSwitch: React.FC<Premium3DSwitchProps> = ({
  onToggle,
  initialState = false,
  soundEnabled = true,
}) => {
  const [isActive, setIsActive] = useState(initialState);

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  };

  const handleToggle = () => {
    const next = !isActive;
    setIsActive(next);
    playSound();
    onToggle?.(next);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <motion.div
        className="w-80 h-96 rounded-2xl overflow-hidden cursor-pointer border-2 border-gray-700 shadow-2xl"
        onClick={handleToggle}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
      >
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5], fov: 50 }}>
          <MechanicalSwitchScene isActive={isActive} />
        </Canvas>
      </motion.div>
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-400 mb-2">3D Mechanical Switch</p>
        <p className={`text-2xl font-bold ${isActive ? 'text-blue-400' : 'text-red-400'}`}>
          {isActive ? 'ON' : 'OFF'}
        </p>
        <p className="text-xs text-gray-500 mt-3">Click to toggle switch</p>
      </motion.div>
    </div>
  );
};

export default Premium3DMechanicalSwitch;
