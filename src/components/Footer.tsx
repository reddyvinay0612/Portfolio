import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for the centerpiece parallax reveal
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [0.1, 1]);

  return (
    <footer 
      ref={footerRef}
      className="relative z-20 w-full min-h-[50vh] bg-[#111111] text-[#F4F4F4] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none border-t border-white/5"
    >
      
      {/* 1. TOP INFORMATION GRID */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-20">
        
        {/* Left Column: Creative Services */}
        <div className="flex flex-col space-y-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          <div className="hover:text-white transition-colors duration-300">Cinematic Production</div>
          <div className="hover:text-white transition-colors duration-300">Motion Graphics</div>
          <div className="hover:text-white transition-colors duration-300">Web Development</div>
          <div className="hover:text-white transition-colors duration-300">UI/UX Design</div>
        </div>

        {/* Center Column: Experience & Projects Showcase */}
        <div className="flex flex-col space-y-3 items-start">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            Projects Showcase
          </span>
          <div className="text-lg font-bold text-white leading-none">
            2+ Years of Software Projects
          </div>
          <a 
            href="#projects" 
            className="text-xs font-semibold text-neutral-400 hover:text-white relative group py-1"
          >
            View Work
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF2A2A] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>

        {/* Right Column: Availability & Year */}
        <div className="flex flex-col space-y-2 md:items-end md:text-right">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            Availability Status
          </span>
          <div className="text-sm font-semibold text-[#FF2A2A] flex items-center md:justify-end gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-pulse" />
            Available Worldwide
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            EST. 2026
          </div>
        </div>

      </div>

      {/* 2. GIANT BRANDING TEXT CENTERPIECE */}
      <div className="w-full text-center my-6 relative overflow-hidden">
        <motion.h3
          style={{ y: yOffset, opacity }}
          className="text-[12vw] font-black tracking-tighter leading-none lowercase text-neutral-800/60 select-none cursor-default transition-all duration-700 hover:text-white hover:drop-shadow-[0_0_40px_rgba(255,42,42,0.6)]"
        >
          vinayprakash
        </motion.h3>
      </div>

      {/* 3. BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs text-neutral-500 font-light">
        
        {/* Left: Contact/Copyright */}
        <div className="flex flex-col space-y-1">
          <div>© {new Date().getFullYear()} VINAYPRAKASH. All Rights Reserved.</div>
          <div className="text-[10px] text-neutral-600">Built with React, Tailwind &amp; Framer Motion</div>
        </div>

        {/* Center: Email */}
        <div className="flex justify-start md:justify-center">
          <a 
            href="mailto:vinayprakashvg@gmail.com" 
            className="text-neutral-400 hover:text-white font-medium relative group transition-colors duration-300 py-1"
          >
            vinayprakashvg@gmail.com
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>

        {/* Right: Privacy Policy */}
        <div className="flex justify-start md:justify-end">
          <a 
            href="#home" 
            className="hover:text-white transition-colors duration-300 relative group py-1"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>

      </div>

    </footer>
  );
};
