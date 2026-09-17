'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MechanicalSwitch from './MechanicalSwitch';
import { ChevronDown } from 'lucide-react';

interface TransitionProps {
  heroContent: React.ReactNode;
  nextSectionContent: React.ReactNode;
  onTransitionComplete?: () => void;
  transitionLabel?: string;
}

const MechanicalSwitchTransition: React.FC<TransitionProps> = ({
  heroContent,
  nextSectionContent,
  onTransitionComplete,
  transitionLabel = 'INITIATE DIVE SEQUENCE',
}) => {
  const [isTransitioned, setIsTransitioned] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwitchToggle = (state: boolean) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioned(state);
    if (state) {
      setTimeout(() => {
        onTransitionComplete?.();
        setIsAnimating(false);
      }, 1000);
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <div ref={null} className="relative w-full">
      <motion.div
        className="relative w-screen h-screen overflow-hidden"
        animate={{ opacity: isTransitioned ? 0 : 1, y: isTransitioned ? -100 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isTransitioned ? 'none' : 'auto' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540] to-[#005093]" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {heroContent}
        </div>
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: !isTransitioned ? Infinity : 0, repeatType: 'loop' }}
          style={{ pointerEvents: 'none' }}
        >
          <ChevronDown className="w-8 h-8 text-ocean-300" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#005093] to-transparent" />
      </motion.div>

      <motion.section
        className="relative w-screen min-h-screen bg-gradient-to-b from-[#005093] via-[#0a2540] to-[#0a2540] flex items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isTransitioned ? 1 : 0, y: isTransitioned ? 0 : 100 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isTransitioned ? 'auto' : 'none' }}
      >
        <motion.div
          className="z-20 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isTransitioned ? 1 : 0, scale: isTransitioned ? 1 : 0.95 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {nextSectionContent}
        </motion.div>

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ opacity: isTransitioned ? 0.15 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`lh-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                style={{ top: `${i * 10}%` }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.div
        className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        animate={{ top: isTransitioned ? '50%' : '80%', opacity: isAnimating ? 0.5 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="flex flex-col items-center gap-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <motion.div animate={{ opacity: isTransitioned ? 0 : 1 }} transition={{ duration: 0.3 }}>
            <p className="text-sm text-ocean-300 uppercase tracking-widest mb-3">{transitionLabel}</p>
            <p className="text-xs text-ocean-400">Click the switch below</p>
          </motion.div>
          <MechanicalSwitch onToggle={handleSwitchToggle} initialState={isTransitioned} size="large" soundEnabled={true} />
          <motion.p className="text-xs text-ocean-500 text-center max-w-xs" animate={{ opacity: isTransitioned ? 0 : 0.7 }} transition={{ duration: 0.3 }}>
            Engage the mechanical switch to activate the next dive sequence
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.button
        className="fixed right-8 top-8 z-50 px-4 py-2 rounded-lg bg-ocean-600/50 hover:bg-ocean-600 text-white text-sm font-semibold transition-colors"
        onClick={() => handleSwitchToggle(false)}
        animate={{ opacity: isTransitioned ? 1 : 0, pointerEvents: isTransitioned ? 'auto' : 'none' }}
        transition={{ duration: 0.3 }}
      >
        ← Back to Hero
      </motion.button>

      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{ top: '50%' }}
        animate={{ opacity: isTransitioned ? 1 : 0, scaleX: isTransitioned ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </div>
  );
};

export default MechanicalSwitchTransition;
