import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Download, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 bg-[#f2f7fa] text-[#212529] flex items-center justify-center overflow-hidden z-20 border-b border-neutral-200/80"
    >
      {/* CLYDE AMBIENT LIGHT ACCENTS */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#3b82a6]/10 rounded-full blur-[130px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} 
        />
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HANGING EMPLOYEE ID BADGE */}
        <div className="lg:col-span-5 flex flex-col items-center relative h-[520px] justify-start pt-14">
          
          {/* LANYARD STRAP */}
          <div className="absolute top-0 w-2.5 h-36 bg-[#212529] z-0 rounded-b shadow-md" />
          
          {/* LANYARD CLIP / METAL CLASP */}
          <div className="absolute top-32 z-10 flex flex-col items-center">
            {/* Swivel metal loop */}
            <div className="w-6 h-6 rounded-full border-[3px] border-neutral-400 bg-neutral-200 shadow-sm" />
            {/* Swivel clasp */}
            <div className="w-3 h-5 bg-neutral-400 rounded-sm -mt-1 shadow-sm border border-neutral-300" />
            {/* Clasp clip holding the card */}
            <div className="w-5 h-2 bg-neutral-500 rounded-sm -mt-0.5 shadow-sm" />
          </div>

          {/* BADGE CARD CONTAINER (tilted -3deg, with hover effect) */}
          <motion.div
            initial={{ y: -50, rotate: -6, opacity: 0 }}
            whileInView={{ y: 0, rotate: -3, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="w-72 h-[385px] bg-[#1a1a1a] rounded-2xl p-5 border border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.18)] z-20 flex flex-col items-center mt-36 relative select-none origin-top"
          >
            {/* HOLE PUNCH DETAILED GRAPHIC */}
            <div className="w-10 h-3 bg-black border border-neutral-700 rounded-full mb-6 z-30" />
            
            {/* PROFILE PHOTO FRAME */}
            <div className="w-36 h-36 rounded-xl overflow-hidden bg-neutral-900 border-2 border-[#3b82a6]/50 shadow-inner mb-4">
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
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#3b82a6] uppercase block mb-1 font-mono">
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
                <span className="text-[9px] font-mono text-neutral-400 tracking-wider">
                  *80210002027*
                </span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: CLYDE INTRO & PERSONAL INFO TABLE */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          
          {/* Subheading Pill */}
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3b82a6]/15 border border-[#3b82a6]/35 text-[#163e54] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#3b82a6]" />
              <span>My Intro</span>
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#000000] tracking-tight mb-5">
            About <span className="text-[#3b82a6]">Me</span>
          </h2>

          {/* Intro Paragraphs */}
          <div className="space-y-4 text-[#6c757d] text-sm md:text-base leading-relaxed font-normal">
            <p>
              I am <strong className="text-[#000000] font-bold">VINAYPRAKASH</strong>, a dedicated Computer Science &amp; Design student at PES Institute of Technology and Management, Shivamogga, Karnataka. With a solid GPA of <strong className="text-[#000000] font-bold">8.02 / 10.00</strong>, I specialize in full-stack web engineering, explainable AI diagnostics, and modern cybersecurity defense.
            </p>
            <p>
              My engineering pathway integrates database connectivity, Python, deep learning algorithms, and modern frontend interfaces to construct secure, high-performance web products with clean aesthetics.
            </p>
          </div>

          {/* Clyde Structured Personal Details Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Degree</span>
              <span className="text-[#000000] font-bold text-sm mt-0.5">B.E. in Computer Science &amp; Design</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Institution</span>
              <span className="text-[#000000] font-bold text-sm mt-0.5">PESITM Shivamogga (VTU)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Cumulative GPA</span>
              <span className="text-[#163e54] font-bold text-sm mt-0.5">8.02 / 10.00</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Location</span>
              <span className="text-[#000000] font-bold text-sm mt-0.5">Kalaburgi, Karnataka, India</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Direct Email</span>
              <span className="text-[#000000] font-bold text-xs mt-0.5 truncate">vinayprakashvg@gmail.com</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Status</span>
              <span className="text-emerald-700 font-bold text-sm mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Roles
              </span>
            </div>
          </div>

          {/* Core Tech Stack Icons */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#6c757d] uppercase block mb-4">
              Core Tech Stack
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              
              {/* React SVG Logo */}
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                className="w-13 h-13 p-3 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center cursor-pointer hover:border-[#3b82a6]"
                title="React"
              >
                <svg className="w-8 h-8 text-cyan-600 fill-none" viewBox="-11.5 -10.23174 23 20.46348">
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
                whileHover={{ scale: 1.08, y: -2 }}
                className="w-13 h-13 p-3 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center cursor-pointer hover:border-[#3b82a6]"
                title="Node.js"
              >
                <svg className="w-8 h-8 text-green-600 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L4 6.6v9.2L12 22l8-4.6v-9.2L12 2zm6.7 13l-6.7 3.9v-7.8l6.7-3.9v7.8zm-8 3.9L4 15V7.2l6.7 3.9v7.8z"/>
                </svg>
              </motion.div>

              {/* Python SVG */}
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                className="w-13 h-13 p-3 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center cursor-pointer hover:border-[#3b82a6]"
                title="Python"
              >
                <svg className="w-8 h-8 text-amber-600 fill-current" viewBox="0 0 24 24">
                  <path d="M11.9 2c-3.5 0-3.3 1.5-3.3 1.5l.01 1.6h3.4v.5H5.2S2 5.3 2 9.5s2.8 4 2.8 4h1.7v-2.4s-.1-2.9 2.8-2.9h4.9s2.7.1 2.7-2.6V3.8S17.4 2 11.9 2zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM12 22c3.5 0 3.3-1.5 3.3-1.5l-.01-1.6h-3.4v-.5h6.8s3.2.3 3.2-3.9-2.8-4-2.8-4h-1.7v2.4s.1 2.9-2.8 2.9H9.7s-2.7-.1-2.7 2.6v1.7s-.5 1.8 5 1.8zm1.8-1.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
                </svg>
              </motion.div>

              {/* Database / SQL */}
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                className="w-13 h-13 p-3 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center cursor-pointer hover:border-[#3b82a6]"
                title="Database / SQL"
              >
                <svg className="w-8 h-8 text-emerald-600 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm8 8c0 .66-3.58 2-8 2s-8-1.34-8-2V8.91c1.86 1.06 4.77 1.69 8 1.69s6.14-.63 8-1.69V12zm0 6c0 .66-3.58 2-8 2s-8-1.34-8-2v-3.09c1.86 1.06 4.77 1.69 8 1.69s6.14-.63 8-1.69V18z"/>
                </svg>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
