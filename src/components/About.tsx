import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 bg-[#FF2A2A] text-white flex items-center justify-center overflow-hidden z-20"
    >
      {/* FLOATING DECORATIONS: ABSTRACT BLACK STARS WITH SOFT PULSE */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-black pointer-events-none"
      >
        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-[15%] text-black pointer-events-none"
      >
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* LEFT COLUMN: HANGING EMPLOYEE ID BADGE */}
        <div className="lg:col-span-5 flex flex-col items-center relative h-[520px] justify-start pt-16">
          
          {/* LANYARD STRAP */}
          <div className="absolute top-0 w-2.5 h-36 bg-black z-0 rounded-b shadow-lg" />
          
          {/* LANYARD CLIP / METAL CLASP */}
          <div className="absolute top-32 z-10 flex flex-col items-center">
            {/* Swivel metal loop */}
            <div className="w-6 h-6 rounded-full border-[3px] border-neutral-600 bg-neutral-800 shadow" />
            {/* Swivel clasp */}
            <div className="w-3 h-5 bg-neutral-500 rounded-sm -mt-1 shadow-sm border border-neutral-600" />
            {/* Clasp clip holding the card */}
            <div className="w-5 h-2 bg-neutral-400 rounded-sm -mt-0.5" />
          </div>

          {/* BADGE CARD CONTAINER (tilted -3deg, with hover effect) */}
          <motion.div
            initial={{ y: -50, rotate: -6, opacity: 0 }}
            whileInView={{ y: 0, rotate: -3, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="w-72 h-[380px] bg-neutral-950 rounded-2xl p-5 border border-neutral-800 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 flex flex-col items-center mt-36 relative select-none origin-top"
          >
            {/* HOLE PUNCH DETAILED GRAPHIC */}
            <div className="w-10 h-3 bg-neutral-900 border border-neutral-800 rounded-full mb-6 z-30" />
            
            {/* PROFILE PHOTO FRAME */}
            <div className="w-36 h-36 rounded-xl overflow-hidden bg-neutral-900 border-2 border-neutral-700 shadow-inner mb-4">
              <img
                src={profileImg}
                alt="Vinayprakash"
                className="w-full h-full object-cover object-top"
                draggable="false"
              />
            </div>

            {/* BADGE METADATA */}
            <div className="text-center w-full flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-1">
                  Developer ID
                </span>
                <h4 className="text-lg font-black tracking-tight text-white uppercase">
                  VINAYPRAKASH
                </h4>
                <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                  CSD STUDENT | CLASS OF 2027
                </p>
              </div>

              {/* BARCODE GRAPHIC */}
              <div className="mt-4 flex flex-col items-center gap-1 w-full bg-white/5 py-2.5 rounded-lg border border-white/5">
                <div className="h-6 flex items-center justify-between w-4/5">
                  {/* Generate visual barcode lines */}
                  {[1.5, 3, 1, 4, 1.5, 3, 2, 1, 3.5, 1, 2.5, 4, 1.5, 2, 3].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-300 h-full rounded-sm"
                      style={{ width: `${w}px`, opacity: idx % 4 === 0 ? 0.3 : 0.8 }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider">
                  *80210002027*
                </span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: BIOGRAPHY & TECH SKILLS */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          {/* Heading */}
          <h3 className="text-6xl md:text-7xl font-black text-black tracking-tighter select-none mb-6">
            Hello!
          </h3>

          {/* Intro Paragraph */}
          <div className="space-y-6 text-white text-base md:text-lg leading-relaxed font-light">
            <p>
              I am <strong className="text-black font-extrabold">VINAYPRAKASH</strong>, a dedicated Computer Science & Design student at PES Institute of Technology and Management, Shivamogga, Karnataka. With a GPA of <strong className="text-black font-extrabold">8.02/10.00</strong>, I focus on engineering intelligent web systems and tackling modern security challenges in tech.
            </p>
            <p className="text-white/80">
              My engineering pathway integrates database connectivity, Python, deep learning algorithms, and full-stack interfaces to construct secure, high-performance web products. I am highly motivated by designing beautiful editorial UIs and developing scalable architectures.
            </p>
          </div>

          {/* Technology Skills Logos (React, Node, Mongo) */}
          <div className="mt-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-black uppercase block mb-6">
              Core Tech Stack
            </span>
            <div className="flex items-center gap-8">
              
              {/* React SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.15, y: -5 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg group cursor-pointer"
                title="React"
              >
                <svg className="w-10 h-10 text-cyan-400 fill-none" viewBox="-11.5 -10.23174 23 20.46348">
                  <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              </motion.div>

              {/* Node.js SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.15, y: -5 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg cursor-pointer"
                title="Node.js"
              >
                <svg className="w-10 h-10 text-green-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L4 6.6v9.2L12 22l8-4.6v-9.2L12 2zm6.7 13l-6.7 3.9v-7.8l6.7-3.9v7.8zm-8 3.9L4 15V7.2l6.7 3.9v7.8z"/>
                </svg>
              </motion.div>

              {/* MongoDB SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.15, y: -5 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg cursor-pointer"
                title="MongoDB"
              >
                <svg className="w-10 h-10 text-emerald-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C10.5 5 6 9.5 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.5-4.5-8-6-13zm0 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0 6c-3.3 0-6-1.5-6-3h12c0 1.5-2.7 3-6 3z"/>
                </svg>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* JAGGED TORN PAPER BOTTOM DIVIDER (White, separates red about from white timeline) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[2px]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 text-white fill-current">
          <path d="M0,80 L40,85 L80,75 L120,82 L160,78 L200,85 L240,80 L280,83 L320,74 L360,82 L400,85 L440,78 L480,82 L520,79 L560,84 L600,76 L640,82 L680,85 L720,78 L760,81 L800,76 L840,84 L880,80 L920,83 L960,75 L1000,82 L1040,78 L1080,84 L1120,80 L1160,83 L1200,76 L1240,81 L1280,77 L1320,84 L1360,79 L1400,83 L1440,75 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>
  );
};
