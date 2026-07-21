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
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-28 pb-16 overflow-hidden">
      
      {/* 3D BALLPIT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-45 overflow-hidden">
        <Ballpit
          count={90}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x9d4edf, 0x7b2cbf, 0x00f5d4, 0xf72585, 0x3a0ca3]}
          minSize={0.4}
          maxSize={1.1}
        />
      </div>

      {/* BACKGROUND GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[750px] h-[500px] md:h-[750px] bg-gradient-to-tr from-purple-700/30 via-indigo-600/20 to-cyan-500/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-pink-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* HERO CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center pointer-events-none">
        
        {/* TIME & LOCATION BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 pointer-events-auto"
        >
          <LiveClock />
        </motion.div>

        {/* ROLE BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs tracking-widest uppercase font-semibold mb-6 shadow-inner pointer-events-auto"
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
          className="mt-6 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-200"
        >
          Engineering intelligent <span className="font-serif italic font-normal text-purple-400">AI systems</span> &amp; digital solutions
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed font-normal"
        >
          B.E. student at <span className="text-gray-200 font-medium">PESITM</span> specializing in Deep Learning, FinTech security against Agentic AI threats, and full-stack web applications.
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all"
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-gray-400 hover:text-white text-sm font-medium hover:bg-white/5 transition-all"
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
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl pointer-events-auto"
        >
          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-center text-purple-400 mb-1">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">8.02 / 10</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">B.E. GPA</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">4 Major</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">AI &amp; Web Projects</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-center text-pink-400 mb-1">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-white">3 Hackathons</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">Team Lead</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center border-purple-500/10 hover:border-purple-500/30 transition-all">
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
