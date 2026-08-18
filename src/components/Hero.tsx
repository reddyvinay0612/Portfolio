import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ArrowDown } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Framer Motion containers for staggered fade-in animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-black select-none z-10"
    >
      {/* FULLSCREEN BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        loop
        playsInline
      />

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/75 z-10 transition-opacity duration-700" 
           style={{ opacity: isPlaying ? 0.5 : 0.8 }} />

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-20 flex flex-col md:flex-row items-center justify-between gap-12 mt-16 md:mt-0">
        
        {/* LEFT COLUMN: HERO HEADLINE & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-3/5 text-left flex flex-col"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            <span className="block font-medium text-white/90 text-2xl sm:text-3xl mb-2">Hi, I'm a</span>
            <span 
              className="block uppercase tracking-tighter text-transparent"
              style={{
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.95)',
                fontFamily: 'system-ui, sans-serif'
              }}
            >
              Full Stack Developer
            </span>
          </motion.div>

          {/* Subheading / Introduction */}
          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-white/80 max-w-xl text-base sm:text-lg leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            I focus on React.js, Node.js, and modern web applications with a strong emphasis on performance, clean aesthetics, and database scalability.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full text-white bg-black/40 hover:bg-white/10 border border-white/20 hover:border-white/50 backdrop-blur-md text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: CIRCULAR PLAY REEL GLASS BUTTON */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="flex flex-col items-center justify-center shrink-0"
        >
          <div className="relative group">
            {/* Glow effect back layer */}
            <div className="absolute inset-0 rounded-full bg-transparent group-hover:bg-[#FF2A2A]/20 blur-xl transition-all duration-500 scale-95 group-hover:scale-110" />

            <button
              onClick={handlePlayToggle}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center border border-white/20 hover:border-[#FF2A2A] bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:text-[#FF2A2A] transition-colors duration-300" />
              ) : (
                <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white group-hover:text-[#FF2A2A] group-hover:fill-transparent transition-colors duration-300 ml-1.5" />
              )}
            </button>
          </div>
          
          <span className="mt-4 text-xs font-bold tracking-[0.25em] text-white/60 uppercase select-none">
            {isPlaying ? 'PAUSE' : 'PLAY REEL'}
          </span>
        </motion.div>

      </div>

      {/* BOUNCING SCROLL INDICATOR (Desktop only) */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/50"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 select-none">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
};
