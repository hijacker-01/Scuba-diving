'use client';

import { useRef } from 'react';
import RippleCanvas from '@/components/RippleCanvas';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-bg" style={{
        backgroundImage: "url('/images/hero1.jpg')",
      }} />
      <video
        ref={videoRef}
        className="hero-video"
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div className="hero-video-overlay" />
      <div className="hero-content">
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
