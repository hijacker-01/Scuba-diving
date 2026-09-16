'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  strength: number;
}

export default function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const dprRef = useRef(1);
  const pointsRef = useRef<Point[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const THROTTLE_MS = 180;
  const MIN_MOVE_PX = 120;
  const WAVE_SPEED = 0.55;
  const DAMPING = 0.99;
  const SMOOTHING = 0.25;
  const GRID_STEP = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hero = canvas.parentElement;
    if (!hero) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    let cols = Math.ceil(hero.offsetWidth / GRID_STEP);
    let rows = Math.ceil(hero.offsetHeight / GRID_STEP);
    const totalCells = cols * rows;

    let buffer1 = new Float32Array(totalCells);
    let buffer2 = new Float32Array(totalCells);

    const resize = () => {
      cols = Math.ceil(hero.offsetWidth / GRID_STEP);
      rows = Math.ceil(hero.offsetHeight / GRID_STEP);
      widthRef.current = hero.offsetWidth;
      heightRef.current = hero.offsetHeight;
      canvas.width = hero.offsetWidth * dpr;
      canvas.height = hero.offsetHeight * dpr;
      canvas.style.width = `${hero.offsetWidth}px`;
      canvas.style.height = `${hero.offsetHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buffer1 = new Float32Array(cols * rows);
      buffer2 = new Float32Array(cols * rows);
    };

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();
      const last = lastSpawnRef.current;

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MIN_MOVE_PX && now - last.time < THROTTLE_MS) return;
      }

      lastSpawnRef.current = { x, y, time: now };

      const col = Math.floor(x / GRID_STEP);
      const row = Math.floor(y / GRID_STEP);
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const idx = (row + r) * cols + (col + c);
          if (idx >= 0 && idx < totalCells) {
            const distFromCenter = Math.sqrt(r * r + c * c);
            const strength = Math.max(0, 8 - distFromCenter * 2);
            buffer1[idx] = strength;
          }
        }
      }
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });

    const simulate = () => {
      const newBuf = new Float32Array(totalCells);
      for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
          const idx = i * cols + j;
          const left = buffer1[idx - 1];
          const right = buffer1[idx + 1];
          const up = buffer1[idx - cols];
          const down = buffer1[idx + cols];
          const center = buffer1[idx];

          newBuf[idx] = (left + right + up + down) * SMOOTHING - buffer2[idx];
          newBuf[idx] *= DAMPING;
        }
      }

      const temp = buffer2;
      buffer2 = buffer1;
      buffer1 = newBuf;
    };

    const render = () => {
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);
      simulate();

      const colsLocal = cols;
      const rowsLocal = rows;
      const buf1 = buffer1;

      for (let i = 0; i < rowsLocal; i++) {
        for (let j = 0; j < colsLocal; j++) {
          const val = buf1[i * colsLocal + j];
          if (Math.abs(val) < 0.01) continue;

          const x = j * GRID_STEP;
          const y = i * GRID_STEP;
          const brightness = Math.min(1, Math.abs(val) * 0.3);
          const alpha = Math.min(0.5, Math.abs(val) * 0.15);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(x, y, GRID_STEP, GRID_STEP);
        }
      }

      // Draw concentric rings from points
      const points = pointsRef.current;
      for (let p = points.length - 1; p >= 0; p--) {
        const pt = points[p];
        pt.strength *= DAMPING;
        if (pt.strength < 0.001) {
          points.splice(p, 1);
          continue;
        }

        const radius = pt.strength * 3;
        const alpha = pt.strength * 0.4;
        if (alpha > 0.005 && radius > 1 && radius < 200) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 195, 255, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inner ring
          const innerRadius = radius * 0.6;
          if (innerRadius > 1) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, innerRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 195, 255, ${alpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

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
