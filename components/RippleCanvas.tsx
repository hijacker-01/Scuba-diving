'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  echoRadius: number;
  echoOpacity: number;
  active: boolean;
}

export default function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const dprRef = useRef(1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const MAX_RADIUS = 160;
  const INITIAL_RADIUS = 8;
  const BASE_OPACITY = 0.65;
  const ECHO_OPACITY = 0.22;
  const THROTTLE_MS = 180;
  const MIN_MOVE_PX = 120;

  const spawnRipple = useCallback((x: number, y: number) => {
    const now = Date.now();
    const last = lastSpawnRef.current;

    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MIN_MOVE_PX && now - last.time < THROTTLE_MS) return;
    }

    lastSpawnRef.current = { x, y, time: now };

    ripplesRef.current.push({
      x, y,
      radius: INITIAL_RADIUS,
      maxRadius: MAX_RADIUS,
      opacity: BASE_OPACITY,
      echoRadius: INITIAL_RADIUS * 2.5,
      echoOpacity: ECHO_OPACITY,
      active: true,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const hero = canvas.parentElement;
    if (!hero) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      widthRef.current = rect.width;
      heightRef.current = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      // Reset transform to avoid accumulation
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(x, y);
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      const alive: Ripple[] = [];
      const ripples = ripplesRef.current;

      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i];

        r.radius += 0.3;
        r.opacity = BASE_OPACITY * Math.max(0, 1 - r.radius / r.maxRadius);

        r.echoRadius += 0.2;
        r.echoOpacity = ECHO_OPACITY * Math.max(0, 1 - r.echoRadius / r.maxRadius);

        if (r.echoRadius < r.maxRadius && r.echoOpacity > 0.005) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.echoRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${r.echoOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        if (r.radius < r.maxRadius && r.opacity > 0.005) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${r.opacity})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        if (r.radius < r.maxRadius) {
          alive.push(r);
        }
      }

      ripplesRef.current = alive;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [spawnRipple]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        display: 'block',
      }}
    />
  );
}
