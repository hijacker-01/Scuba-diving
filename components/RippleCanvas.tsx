'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  echoOpacity: number;
  echoRadius: number;
  active: boolean;
}

export default function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_RADIUS = 70;
  const INITIAL_RADIUS = 4;
  const BASE_OPACITY = 0.4;
  const ECHO_OPACITY = 0.15;
  const THROTTLE_MS = 80;
  const MIN_MOVE_PX = 25;

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
      x,
      y,
      radius: INITIAL_RADIUS,
      maxRadius: MAX_RADIUS,
      opacity: BASE_OPACITY,
      echoOpacity: ECHO_OPACITY,
      echoRadius: INITIAL_RADIUS * 1.5,
      active: true,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const resizeCanvas = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const alive: Ripple[] = [];
      for (let i = 0; i < ripplesRef.current.length; i++) {
        const r = ripplesRef.current[i];
        if (!r.active) continue;

        const speed = 1.2;
        const easeFactor = 0.98;

        // Update primary ring
        r.radius += speed;
        r.opacity = BASE_OPACITY * (1 - r.radius / r.maxRadius);

        // Update echo ring (lags behind)
        r.echoRadius += speed * 0.7;
        r.echoOpacity = ECHO_OPACITY * (1 - r.echoRadius / r.maxRadius);

        // Draw echo ring (secondary, fainter)
        if (r.echoRadius < r.maxRadius && r.echoOpacity > 0.005) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(0.1, r.echoRadius), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.echoOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw primary ring
        if (r.radius < r.maxRadius && r.opacity > 0.005) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(0.1, r.radius), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Keep alive if not fully faded
        if (r.radius < r.maxRadius) {
          alive.push(r);
        }
      }

      ripplesRef.current = alive;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [spawnRipple]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
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
        }}
      />
    </div>
  );
}
