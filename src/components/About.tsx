import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-28 bg-[#FF2A2A] text-white flex items-center justify-center overflow-hidden z-20"
    >
      {/* FLOATING DECORATIONS: ABSTRACT BLACK STARS WITH SOFT PULSE */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-20 left-[8%] text-black pointer-events-none"
      >
        <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-28 right-[12%] text-black pointer-events-none"
      >
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HANGING EMPLOYEE ID BADGE */}
        <div className="lg:col-span-5 flex flex-col items-center relative h-[520px] justify-start pt-14">
          
          {/* LANYARD STRAP */}
          <div className="absolute top-0 w-2.5 h-36 bg-black z-0 rounded-b shadow-2xl" />
          
          {/* LANYARD CLIP / METAL CLASP */}
          <div className="absolute top-32 z-10 flex flex-col items-center">
            {/* Swivel metal loop */}
            <div className="w-6 h-6 rounded-full border-[3px] border-neutral-700 bg-neutral-900 shadow-md" />
            {/* Swivel clasp */}
            <div className="w-3 h-5 bg-neutral-600 rounded-sm -mt-1 shadow-sm border border-neutral-700" />
            {/* Clasp clip holding the card */}
            <div className="w-5 h-2 bg-neutral-400 rounded-sm -mt-0.5 shadow-sm" />
          </div>

          {/* BADGE CARD CONTAINER (tilted -3deg, with hover effect) */}
          <motion.div
            initial={{ y: -50, rotate: -6, opacity: 0 }}
            whileInView={{ y: 0, rotate: -3, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="w-72 h-[385px] bg-[#111111] rounded-2xl p-5 border border-neutral-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 flex flex-col items-center mt-36 relative select-none origin-top"
          >
            {/* HOLE PUNCH DETAILED GRAPHIC */}
            <div className="w-10 h-3 bg-black border border-neutral-800 rounded-full mb-6 z-30" />
            
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
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-1 font-mono">
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
          
          {/* Main Heading */}
          <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black text-black tracking-tighter select-none mb-6">
            Hello!
          </h3>

          {/* Intro Paragraphs */}
          <div className="space-y-6 text-white text-base md:text-lg leading-relaxed font-light">
            <p>
              I am <strong className="text-black font-black">VINAYPRAKASH</strong>, a dedicated Computer Science & Design student at PES Institute of Technology and Management, Shivamogga, Karnataka. With a GPA of <strong className="text-black font-black">8.02/10.00</strong>, I focus on engineering intelligent web systems and tackling modern security challenges in tech.
            </p>
            <p className="text-white/90">
              My engineering pathway integrates database connectivity, Python, deep learning algorithms, and full-stack interfaces to construct secure, high-performance web products. I am highly motivated by designing beautiful editorial UIs and developing scalable architectures.
            </p>
          </div>

          {/* Clyde Personal Details Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Degree</span>
              <span className="text-white font-bold text-sm mt-0.5">B.E. in CS &amp; Design</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Institution</span>
              <span className="text-white font-bold text-sm mt-0.5">PESITM Shivamogga</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Cumulative GPA</span>
              <span className="text-white font-bold text-sm mt-0.5">8.02 / 10.00</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Location</span>
              <span className="text-white font-bold text-sm mt-0.5">Karnataka, India</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Email</span>
              <span className="text-white font-bold text-xs mt-0.5 truncate">reddyvinayprakash@gmail.com</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/20 border border-black/25 flex flex-col justify-center">
              <span className="text-[10px] text-black/70 uppercase font-bold tracking-wider">Status</span>
              <span className="text-emerald-200 font-bold text-sm mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>
          </div>

          {/* Core Tech Stack Icons */}
          <div className="mt-12">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-black uppercase block mb-6">
              Core Tech Stack
            </span>
            <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
              
              {/* React SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.12, y: -4 }}
                className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-xl cursor-pointer"
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
                whileHover={{ scale: 1.12, y: -4 }}
                className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-xl cursor-pointer"
                title="Node.js"
              >
                <svg className="w-10 h-10 text-green-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L4 6.6v9.2L12 22l8-4.6v-9.2L12 2zm6.7 13l-6.7 3.9v-7.8l6.7-3.9v7.8zm-8 3.9L4 15V7.2l6.7 3.9v7.8z"/>
                </svg>
              </motion.div>

              {/* MongoDB SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.12, y: -4 }}
                className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-xl cursor-pointer"
                title="MongoDB"
              >
                <svg className="w-10 h-10 text-emerald-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C10.5 5 6 9.5 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.5-4.5-8-6-13zm0 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0 6c-3.3 0-6-1.5-6-3h12c0 1.5-2.7 3-6 3z"/>
                </svg>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
