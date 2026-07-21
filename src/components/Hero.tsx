import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Sparkles, FileText, Send, Award, GraduationCap, FolderGit2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LiveClock } from './LiveClock';
import Ballpit from './Ballpit';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-28 pb-16 overflow-hidden bg-[#070709]">
      
      {/* 3D BALLPIT BACKGROUND CANVAS - HIGH VISIBILITY & INTERACTIVE */}
      <div className="absolute inset-0 z-0 opacity-85 overflow-hidden">
        <Ballpit
          count={120}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x9d4edf, 0x7b2cbf, 0x00f5d4, 0xf72585, 0x480ca8, 0xc77dff]}
          minSize={0.6}
          maxSize={1.6}
          ambientIntensity={2.5}
          lightIntensity={350}
        />
      </div>

      {/* GRADIENT OVERLAY MASK TO ENSURE TEXT LEGIBILITY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#070709]/60 via-[#070709]/40 to-[#070709]/90 pointer-events-none" />

      {/* HERO CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center relative">
        
        {/* TIME & LOCATION BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <LiveClock />
        </motion.div>

        {/* ROLE BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs tracking-widest uppercase font-semibold mb-6 backdrop-blur-md shadow-lg shadow-purple-950/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Computer Science &amp; Design Engineer</span>
        </motion.div>

        {/* MASSIVE NAME HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tight leading-none text-center select-none drop-shadow-2xl"
        >
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            {PORTFOLIO_DATA.personal.name}
          </span>
        </motion.h1>

        {/* ELEGANT TAGLINE WITH PLAYFAIR ITALIC ACCENT */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-100 drop-shadow-lg"
        >
          Engineering intelligent <span className="font-serif italic font-normal text-purple-400">AI systems</span> &amp; digital solutions
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed font-normal drop-shadow-md"
        >
          B.E. student at <span className="text-white font-semibold">PESITM</span> specializing in Deep Learning, FinTech security against Agentic AI threats, and full-stack web applications.
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-purple-600/40 hover:shadow-purple-600/60 hover:scale-105 active:scale-95 transition-all"
          >
            <Code2 className="w-4 h-4 text-cyan-300" />
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <button
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel text-gray-200 hover:text-white font-semibold text-sm border-purple-500/30 hover:border-purple-500/60 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>View Resume</span>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-gray-300 hover:text-white text-sm font-medium hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* QUICK STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-center text-purple-400 mb-1">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">8.02 / 10</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">B.E. GPA</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">4 Major</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">AI &amp; Web Projects</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-center text-pink-400 mb-1">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">3 Hackathons</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">Team Lead</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-center text-indigo-400 mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">PESITM</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">Class of 2027</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
