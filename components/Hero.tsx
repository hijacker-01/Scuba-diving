'use client';

import { useRef, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useVideoTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ExpandingRippleShader = shaderMaterial(
  {
    uTime: 0,
    uVideoTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uRippleStartTime: 0.0,
    uMaxRadius: 0.9,
    uStrength: 0.045,
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
    uniform sampler2D uVideoTexture;
    uniform vec2 uMouse;
    uniform float uRippleStartTime;
    uniform float uMaxRadius;
    uniform float uStrength;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      float elapsed = uTime - uRippleStartTime;
      float currentRadius = elapsed * 0.7;
      float wave = 0.0;

      if (dist < currentRadius && currentRadius < uMaxRadius) {
        float bandWidth = 0.25;
        if (dist > currentRadius - bandWidth) {
          float factor = smoothstep(currentRadius, currentRadius - bandWidth, dist);
          float fade = max(0.0, 1.0 - (currentRadius / uMaxRadius));
          wave = sin((dist - currentRadius) * 45.0) * uStrength * factor * fade;
        }
      }

      vec2 distortedUV = uv + wave;
      vec4 color = texture2D(uVideoTexture, distortedUV);
      gl_FragColor = color;
    }
  `
);

extend({ ExpandingRippleShader });

function ExpandingRipplePlane() {
  const materialRef = useRef<any>(null);
  const videoTexture = useVideoTexture('/videos/hero-video.mp4', {
    muted: true,
    loop: true,
    autoPlay: true,
    playsInline: true,
  });
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.playbackRate = 0.4;

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (materialRef.current) {
        materialRef.current.uMouse.set(
          e.clientX / window.innerWidth,
          1.0 - e.clientY / window.innerHeight
        );
        materialRef.current.uRippleStartTime = performance.now() * 0.001;
      }
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[16, 9, 1, 1]} />
      <expandingRippleShader ref={materialRef} uVideoTexture={videoTexture} />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#0a2540']} />
          <ExpandingRipplePlane />
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
    </section>
  );
}
