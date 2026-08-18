import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    // Automatically trigger onComplete after the animation sequence finishes
    // 1.6s (text fill) + 0.3s (delay) + 0.8s (shutter slide) = 2.7s total duration
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion transition config for a premium cinematic feel
  const transitionConfig = {
    duration: 1.6,
    ease: [0.76, 0, 0.24, 1], // Custom premium ease (cubic-bezier)
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
      }}
      className="fixed inset-0 w-full h-full bg-[#ff2a2a] z-[100000] flex items-center justify-center overflow-hidden select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* TEXT LOGO CONTAINER */}
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          exit={{ 
            scale: 0.9, 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="relative text-center cursor-default"
        >
          {/* Background Layer: Dark transparent text */}
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter text-black/10">
            Vinayprakash.
          </div>

          {/* Foreground Layer: White text animated with clip-path water fill */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={transitionConfig}
            className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter text-white"
          >
            Vinayprakash.
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
