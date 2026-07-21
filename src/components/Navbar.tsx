import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience & Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section indicator
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 }
    });
    onOpenResumeModal();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
        scrolled 
          ? 'glass-panel py-3 px-6 border-purple-500/20 shadow-2xl shadow-purple-950/20' 
          : 'bg-transparent py-4 px-4'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-lg group-hover:shadow-purple-500/50 transition-all">
              <div className="w-full h-full bg-[#0d0d14] rounded-[11px] flex items-center justify-center font-extrabold text-sm text-white">
                VP
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              VINAY<span className="text-purple-500">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#10101a]/70 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md shadow-purple-900/20"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Resume</span>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 text-xs font-semibold text-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 hover:opacity-90 px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white glass-pill"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 mx-4 p-5 glass-panel rounded-2xl border-purple-500/20 shadow-2xl space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleResumeClick();
                }}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 py-2.5 rounded-xl"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-purple-400 py-2.5 rounded-xl"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
