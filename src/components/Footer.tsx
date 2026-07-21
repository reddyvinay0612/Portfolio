import React from 'react';
import { ArrowUp, Heart, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 pt-16 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Column: Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <a href="#home" className="flex items-center gap-2 font-black text-xl text-white">
            <span>VINAYPRAKASH</span>
            <span className="text-purple-500">.</span>
          </a>
          <p className="text-xs text-gray-400 max-w-sm">
            {PORTFOLIO_DATA.personal.tagline}
          </p>
          <div className="text-[11px] text-gray-500 font-mono pt-1">
            © {new Date().getFullYear()} Vinayprakash. Built with React, Tailwind &amp; Framer Motion.
          </div>
        </div>

        {/* Center: Social & Email Links */}
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-semibold text-gray-300 hover:text-white hover:border-purple-500/40 transition-all hover:scale-105"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
