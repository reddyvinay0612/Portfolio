import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy for active section
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[50000] w-full transition-all duration-500 ease-out border-b border-transparent ${
        scrolled 
          ? 'py-3 bg-black/60 backdrop-blur-xl border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#home" className="flex items-center text-2xl font-black tracking-tight text-white select-none">
          Vinayprakash<span className="text-[#FF2A2A]">.</span>
        </a>

        {/* CENTER NAVIGATION (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 group ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {/* Underline grows from left to right */}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#FF2A2A] transition-all duration-300 origin-left ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* RIGHT CTA (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenResumeModal}
            className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide border border-white/10 text-white/95 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            Resume
          </button>
          
          <a
            href="#contact"
            className="relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide text-white bg-white/10 hover:bg-[#FF2A2A] border border-white/20 hover:border-[#FF2A2A] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] active:scale-95 backdrop-blur-md"
          >
            Hire Me
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/90 hover:text-white transition-colors z-[60000]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MOBILE PANEL (Slide down full width, bright red) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full min-h-screen bg-[#FF2A2A] z-[40000] flex flex-col justify-center px-8 sm:px-16"
          >
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl sm:text-5xl font-black text-black hover:text-white transition-colors duration-300 tracking-tighter"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="px-8 py-4 rounded-full text-base font-bold text-[#FF2A2A] bg-white border border-white text-center shadow-xl hover:scale-105 transition-transform"
              >
                View Resume
              </button>
              
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-4 rounded-full text-base font-bold text-white bg-black hover:bg-neutral-900 text-center shadow-xl hover:scale-105 transition-transform"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
