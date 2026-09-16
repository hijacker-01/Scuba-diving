'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import RippleCanvas from '@/components/RippleCanvas';

function VideoPlane() {
  const texture = useVideoTexture('/videos/hero-video.mp4', {
    muted: true,
    loop: true,
    autoPlay: true,
    playsInline: true,
  });
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.playbackRate = 0.4;

  return (
    <mesh position={[0, 0, -6]}>
      <planeGeometry args={[18, 10.125]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function AnimatedFog() {
  const fogColorRef = useRef<THREE.Color>(new THREE.Color('#00c3ff'));

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const duration = 30;
    const progress = (t % duration) / duration;
    const color = new THREE.Color()
      .lerpColors(new THREE.Color('#00c3ff'), new THREE.Color('#0a2540'), progress);
    fogColorRef.current.copy(color);
  });

  return null;
}

function DoFEffect() {
  const dofRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const duration = 30;
    const progress = (t % duration) / duration;
    if (dofRef.current) {
      dofRef.current.focusDistance = THREE.MathUtils.lerp(1.5, 0.1, progress);
      dofRef.current.bokehScale = THREE.MathUtils.lerp(2.5, 0.05, progress);
    }
  });

  return (
    <DepthOfField
      ref={dofRef}
      focusDistance={1.5}
      focalLength={0.5}
      bokehScale={2.5}
      height={720}
      width={1280}
    />
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" color="#00c3ff" near={1} far={25} />
      <ambientLight intensity={0.6} />
      <VideoPlane />
      <EffectComposer>
        <DoFEffect />
      </EffectComposer>
    </>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(10,37,64,0.4) 0%, rgba(0,80,147,0.3) 40%, rgba(10,37,64,0.7) 100%)',
        zIndex: 1,
      }} />
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <span className="hero-badge">PADI 5-Star Dive Center</span>
        <h1 className="hero-title">Discover the Underwater Paradise</h1>
        <p className="hero-subtitle">
          Explore crystal-clear waters, vibrant coral reefs, and marine life at Havelock Island. Your adventure starts here.
        </p>
        <div className="hero-buttons">
          <a href="#courses" className="btn btn-primary">Explore Courses</a>
          <a href="#contact" className="btn btn-outline" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)' }}>
            Book a Dive
          </a>
        </div>
      </div>
      <div className="hero-image" />
      <RippleCanvas />
    </section>
  );
}
