'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import RippleCanvas from '@/components/RippleCanvas';

const WaterRippleMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uRippleIntensity: 0.0,
    uWaveSpeed: 6.0,
    uWaveScale: 40.0,
    uDecay: 4.0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uRippleIntensity;
    uniform float uWaveSpeed;
    uniform float uWaveScale;
    uniform float uDecay;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      float dist = distance(uv, uMouse);

      float wave = sin(dist * uWaveScale - uTime * uWaveSpeed) * 0.02;

      float decay = exp(-dist * uDecay);

      vec2 distortedUV = uv + (wave * decay * uRippleIntensity);

      vec4 texColor = texture2D(uTexture, distortedUV);

      gl_FragColor = texColor;
    }
  `
);

extend({ WaterRippleMaterial });

function RippleMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useVideoTexture('/videos/hero-video.mp4');

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as any;
      mat.uTime = state.clock.getElapsedTime();
      mat.uMouse.set(
        (state.pointer.x + 1.0) / 2.0,
        (state.pointer.y + 1.0) / 2.0
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[16, 9, 32, 32]} />
      <waterRippleMaterial
        uTexture={texture}
        uRippleIntensity={0.8}
        uWaveSpeed={6.0}
        uWaveScale={40.0}
        uDecay={4.0}
        toneMapped={false}
      />
    </mesh>
  );
}

function HeroScene() {
  return (
    <>
      <color attach="background" args={['#0a2540']} />
      <ambientLight intensity={0.6} />
      <RippleMesh />
      <fog attach="fog" color="#0a2540" near={1} far={25} />
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
          <HeroScene />
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
