import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, FileText, Github, Linkedin, Mail, Phone, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070709] select-none pt-24 pb-16 z-10"
    >
      {/* LUXURY AMBIENT BACKGROUND (Replacing video with modern glowing mesh & tech grid) */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        {/* Ambient crimson glow (Vinay's signature red) */}
        <div 
          className="absolute top-1/4 right-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#FF2A2A]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" 
          style={{ animationDuration: '6s' }} 
        />
        
        {/* Subtle indigo/violet ambient accent */}
        <div className="absolute -bottom-20 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-900/15 rounded-full blur-[130px] pointer-events-none" />
        
        {/* High-tech dot/grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} 
        />

        {/* Radial vignette mask for smooth edge falloff */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070709_95%)]" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-20 flex flex-col md:flex-row items-center justify-between gap-12 mt-12 md:mt-0">
        
        {/* LEFT COLUMN: HERO HEADLINE & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-3/5 text-left flex flex-col"
        >
          {/* Clyde Subheading & Available Pill */}
          <motion.div variants={itemVariants} className="mb-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span>Hello! I am Vinayprakash</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2A2A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2A2A]"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-neutral-300">
                Available for Projects
              </span>
            </div>
          </motion.div>

          {/* Clyde & Joyseno Prominent Hero Heading */}
          <motion.div variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            <span className="block font-medium text-neutral-300 text-2xl sm:text-3xl mb-2">
              Creative Engineer
            </span>
            <span className="block">
              Full Stack <span className="text-[#FF2A2A]">&amp;</span> AI Architect
            </span>
          </motion.div>

          {/* Subheading / Introduction */}
          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-white/80 max-w-xl text-base sm:text-lg leading-relaxed font-light"
          >
            Engineering scalable web architectures, explainable machine learning systems, and proactive FinTech security against synthetic biometric spoofing.
          </motion.p>

          {/* Buttons CTA (Clyde Style with View Work, Contact Me, and Download CV) */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-[#FF2A2A] hover:bg-red-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#FF2A2A]/30 flex items-center gap-2"
            >
              <span>View My Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResumeModal}
              className="px-7 py-3 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/10 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Download CV</span>
            </button>

            <a
              href="#contact"
              className="px-7 py-3 rounded-full text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 hover:border-[#FF2A2A]/40 backdrop-blur-md text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Joyseno Social Icons Strip */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold mr-1">
              Connect:
            </span>
            <a
              href="https://github.com/reddyvinay0612"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF2A2A] border border-white/10 hover:border-[#FF2A2A] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF2A2A] border border-white/10 hover:border-[#FF2A2A] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF2A2A] border border-white/10 hover:border-[#FF2A2A] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF2A2A] border border-white/10 hover:border-[#FF2A2A] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="Call Directly"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE DEV CARD & CODE TERMINAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Ambient red halo behind card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF2A2A]/20 via-purple-600/10 to-[#FF2A2A]/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            
            <div className="relative rounded-2xl bg-[#0F0F12]/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden p-6 text-left hover:border-white/20 transition-all duration-300">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400 tracking-wider">
                  vinayprakash.tsx
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A]" />
              </div>

              {/* Code Snippet / Profile Highlights */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 text-neutral-300">
                <div>
                  <span className="text-[#FF2A2A]">const</span> <span className="text-purple-300">engineer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">name:</span> <span className="text-emerald-400">"Vinayprakash"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">role:</span> <span className="text-emerald-400">"Full Stack & AI Engineer"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">degree:</span> <span className="text-emerald-400">"B.E. (CSD) @ PESITM"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">gpa:</span> <span className="text-amber-300">8.02</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">stack:</span> [
                  <span className="text-sky-300">"React"</span>, <span className="text-sky-300">"Node.js"</span>, <span className="text-sky-300">"AI/ML"</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">status:</span> <span className="text-emerald-400">"Ready to deploy"</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-neutral-300">
                  ⚡ React.js
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-neutral-300">
                  🚀 Node / Express
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-red-300">
                  🤖 AI Systems
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-neutral-300">
                  🛡️ FinTech
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* BOUNCING SCROLL INDICATOR (Desktop only) */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/40"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 select-none">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
};
