'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const createSpringPhysics = (stiffness = 200, damping = 30, mass = 1) => ({
  type: 'spring',
  stiffness,
  damping,
  mass,
});

const mechanicalEasing = [0.34, 1.56, 0.64, 1];

interface MechanicalSwitchProps {
  onToggle?: (state: boolean) => void;
  initialState?: boolean;
  size?: 'small' | 'medium' | 'large';
  soundEnabled?: boolean;
}

const sizeConfig = {
  small: { width: 80, height: 140, lever: 35 },
  medium: { width: 100, height: 180, lever: 45 },
  large: { width: 130, height: 230, lever: 60 },
};

const MechanicalSwitch: React.FC<MechanicalSwitchProps> = ({
  onToggle,
  initialState = false,
  size = 'medium',
  soundEnabled = true,
}) => {
  const [isActive, setIsActive] = useState(initialState);
  const [isHovered, setIsHovered] = useState(false);

  const config = sizeConfig[size];
  const leverRotation = isActive ? 35 : -35;
  const gearRotation = isActive ? 360 : 0;

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = 'sine';
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
        className="relative cursor-pointer select-none"
        style={{ width: config.width, height: config.height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggle}
        role="switch"
        aria-checked={isActive}
        aria-label="Mechanical switch toggle"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          className="absolute left-4 top-1/2 w-3 h-3 rounded-full -translate-y-1/2"
          animate={{
            boxShadow: isActive
              ? ['0 0 10px rgba(16,185,129,0.5)', '0 0 20px rgba(16,185,129,0.8)', '0 0 10px rgba(16,185,129,0.5)']
              : '0 0 0px rgba(239,68,68,0)',
            backgroundColor: isActive ? '#10b981' : '#ef4444',
          }}
          transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: 'loop' }}
        />

        <motion.svg
          className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          animate={{ rotate: gearRotation }}
          transition={{ duration: 4, repeat: isActive ? Infinity : 0, repeatType: 'loop', ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <circle cx="16" cy="16" r="14" fill="none" stroke="#666" strokeWidth="1.5" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`t-${i}`} x1="16" y1="2" x2="16" y2="4" stroke="#888" strokeWidth="1" transform={`rotate(${(i * 360) / 12} 16 16)`} />
          ))}
          <circle cx="16" cy="16" r="4" fill="#666" />
        </motion.svg>

        <motion.div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{ width: config.lever, height: config.lever * 2.2, x: '-50%', y: '-50%' }}
          animate={{ rotateZ: leverRotation }}
          transition={createSpringPhysics(250, 35, 1)}
          whileHover={{ scale: isHovered ? 1.05 : 1 }}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center relative"
            style={{
              background: isActive
                ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                : 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
              boxShadow: isActive
                ? '0 8px 20px rgba(59,130,246,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)'
                : '0 8px 20px rgba(239,68,68,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <motion.div className="absolute inset-2 rounded-full border border-white/20" style={{ pointerEvents: 'none' }} />
          </motion.div>
        </motion.div>

        <motion.svg
          className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-1/2"
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          animate={{ rotate: -gearRotation }}
          transition={{ duration: 4, repeat: isActive ? Infinity : 0, repeatType: 'loop', ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <circle cx="16" cy="16" r="12" fill="none" stroke="#666" strokeWidth="1.5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`ts-${i}`} x1="16" y1="2" x2="16" y2="4" stroke="#888" strokeWidth="1" transform={`rotate(${(i * 360) / 8} 16 16)`} />
          ))}
          <circle cx="16" cy="16" r="4" fill="#666" />
        </motion.svg>

        <motion.div
          className="absolute right-4 top-1/2 w-3 h-3 rounded-full -translate-y-1/2"
          animate={{
            boxShadow: !isActive
              ? ['0 0 10px rgba(239,68,68,0.5)', '0 0 20px rgba(239,68,68,0.8)', '0 0 10px rgba(239,68,68,0.5)']
              : '0 0 0px rgba(16,185,129,0)',
            backgroundColor: !isActive ? '#ef4444' : '#10b981',
          }}
          transition={{ duration: 1.5, repeat: !isActive ? Infinity : 0, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/4"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      <motion.div
        key={isActive ? 'active' : 'inactive'}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-400 mb-2">Switch Status</p>
        <p className={`text-2xl font-bold ${isActive ? 'text-blue-400' : 'text-red-400'}`}>
          {isActive ? 'ACTIVE' : 'INACTIVE'}
        </p>
      </motion.div>

      <p className="text-xs text-gray-500 mt-4">Press Enter or Space to toggle • Click to switch</p>
    </div>
  );
};

export default MechanicalSwitch;
