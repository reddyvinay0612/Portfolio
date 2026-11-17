import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, FileText, Github, Linkedin, Mail, Phone, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
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
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white select-none pt-24 pb-16 z-10"
    >
      {/* CLYDE AMBIENT LIGHT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        {/* Warm olive-gold accent glow (Clyde's #b1b493) */}
        <div 
          className="absolute top-1/4 right-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#b1b493]/15 rounded-full blur-[140px] pointer-events-none" 
        />
        
        {/* Soft slate ambient accent */}
        <div className="absolute -bottom-20 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-neutral-200/40 rounded-full blur-[130px] pointer-events-none" />
        
        {/* Light dot/grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.06) 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px'
          }} 
        />

        {/* Soft edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#ffffff_95%)]" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/40 text-[#555a3c] text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#b1b493]" />
              <span>Hello! I am Vinayprakash</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8f9fa] border border-neutral-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b1b493] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b1b493]"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-neutral-600">
                Available for Projects
              </span>
            </div>
          </motion.div>

          {/* Clyde Prominent Hero Heading */}
          <motion.div variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#000000]">
            <span className="block font-medium text-[#6c757d] text-2xl sm:text-3xl mb-2">
              Creative Engineer
            </span>
            <span className="block">
              Full Stack <span className="text-[#b1b493]">&amp;</span> AI Architect
            </span>
          </motion.div>

          {/* Subheading / Introduction */}
          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-[#6c757d] max-w-xl text-base sm:text-lg leading-relaxed font-normal"
          >
            Engineering scalable web architectures, explainable machine learning systems, and proactive FinTech security against synthetic biometric spoofing.
          </motion.p>

          {/* Buttons CTA (Clyde Signature Buttons) */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-[#b1b493] hover:bg-[#9a9d7c] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#b1b493]/25 flex items-center gap-2"
            >
              <span>View My Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResumeModal}
              className="px-7 py-3 rounded-full bg-white hover:bg-neutral-50 text-[#212529] border border-neutral-300 hover:border-[#b1b493] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#b1b493]" />
              <span>Download CV</span>
            </button>

            <a
              href="#contact"
              className="px-7 py-3 rounded-full text-[#212529] bg-[#f8f9fa] hover:bg-neutral-100 border border-neutral-300 hover:border-[#b1b493] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Clyde / Joyseno Social Icons Strip */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-neutral-200 flex items-center gap-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold mr-1">
              Connect:
            </span>
            <a
              href="https://github.com/reddyvinay0612"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#f8f9fa] hover:bg-[#b1b493] border border-neutral-200 hover:border-[#b1b493] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#f8f9fa] hover:bg-[#b1b493] border border-neutral-200 hover:border-[#b1b493] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-9 h-9 rounded-full bg-[#f8f9fa] hover:bg-[#b1b493] border border-neutral-200 hover:border-[#b1b493] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="w-9 h-9 rounded-full bg-[#f8f9fa] hover:bg-[#b1b493] border border-neutral-200 hover:border-[#b1b493] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              title="Call Directly"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE DEV CARD & CODE TERMINAL (Clyde Elegant Light Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Subtle warm halo behind card */}
            <div className="absolute -inset-1 rounded-3xl bg-[#b1b493]/20 blur-xl opacity-60 pointer-events-none" />
            
            <div className="relative rounded-2xl bg-white border border-neutral-200/90 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] overflow-hidden p-6 text-left hover:border-[#b1b493]/50 transition-all duration-300">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                </div>
                <div className="text-[11px] font-mono text-neutral-500 tracking-wider font-semibold">
                  vinayprakash.tsx
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#b1b493]" />
              </div>

              {/* Code Snippet / Profile Highlights */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 text-neutral-700">
                <div>
                  <span className="text-[#b1b493] font-bold">const</span> <span className="text-neutral-900 font-bold">engineer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">name:</span> <span className="text-[#555a3c] font-semibold">"Vinayprakash"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">role:</span> <span className="text-[#555a3c] font-semibold">"Full Stack &amp; AI Engineer"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">degree:</span> <span className="text-[#555a3c] font-semibold">"B.E. (CSD) @ PESITM"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">gpa:</span> <span className="text-[#b1b493] font-bold">8.02</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">stack:</span> [
                  <span className="text-[#495057]">"React"</span>, <span className="text-[#495057]">"Node.js"</span>, <span className="text-[#495057]">"AI/ML"</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">status:</span> <span className="text-emerald-600 font-semibold">"Ready to deploy"</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#f8f9fa] border border-neutral-200 text-neutral-700">
                  ⚡ React.js
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#f8f9fa] border border-neutral-200 text-neutral-700">
                  🚀 Node / Express
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#555a3c] font-semibold">
                  🤖 AI Systems
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#f8f9fa] border border-neutral-200 text-neutral-700">
                  🛡️ FinTech
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* BOUNCING SCROLL INDICATOR */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-neutral-400"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 select-none text-neutral-400">Scroll</span>
          <ArrowDown className="w-4 h-4 text-[#b1b493]" />
        </motion.div>
      </div>
    </section>
  );
};
