import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LiquidNavbar, NimbusIcons, LiquidNavItem } from './LiquidNavbar';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems: LiquidNavItem[] = [
    { label: 'Home', href: '#home', icon: NimbusIcons.home, fx: 'glow' },
    { label: 'About', href: '#about', icon: NimbusIcons.user, fx: 'wave' },
    { label: 'Projects', href: '#projects', icon: NimbusIcons.projects, fx: 'plane' },
    { label: 'Skills', href: '#skills', icon: NimbusIcons.code, fx: 'pop' },
    { label: 'Certifications', href: '#certifications', icon: NimbusIcons.certificate, fx: 'glow' },
    { label: 'Contact', href: '#contact', icon: NimbusIcons.contact, fx: 'drop' },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.href === `#${activeSection}`)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy for active section
      const scrollPos = window.scrollY + 120;
      for (const item of navItems) {
        if (!item.href) continue;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[50000] w-full transition-all duration-500 ease-out border-b border-transparent ${
        scrolled 
          ? 'py-2.5 bg-white/95 backdrop-blur-2xl border-neutral-200/80 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <a href="#home" className="flex items-center text-2xl font-black tracking-tight text-[#000000] select-none">
          Vinayprakash<span className="text-[#3b82a6]">.</span>
        </a>

        {/* CENTER NAVIGATION (DESKTOP) - LIQUID "WATERLINE" NAVBAR */}
        <div className="hidden md:flex items-center justify-center">
          <LiquidNavbar 
            items={navItems}
            active={activeIndex}
            tone="light"
            sound={true}
            onChange={(idx, item) => {
              if (item.href) {
                const targetId = item.href.substring(1);
                const el = document.getElementById(targetId);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />
        </div>

        {/* RIGHT CTA (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenResumeModal}
            className="px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-neutral-300 text-neutral-800 bg-[#f2f7fa] hover:bg-[#3b82a6] hover:text-white hover:border-[#3b82a6] transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Resume
          </button>
          
          <a
            href="#contact"
            className="relative px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#3b82a6] hover:bg-[#2d6785] border border-[#3b82a6] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#3b82a6]/30 active:scale-95 shadow-md shadow-[#3b82a6]/20"
          >
            Hire Me
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-800 hover:text-black transition-colors z-[60000]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MOBILE PANEL (Slide down full width, Clyde light theme) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full min-h-screen bg-white z-[40000] flex flex-col justify-center px-8 sm:px-16"
          >
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl sm:text-5xl font-black text-black hover:text-[#3b82a6] transition-colors duration-300 tracking-tighter"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="px-8 py-4 rounded-full text-base font-bold text-black bg-[#f2f7fa] border border-neutral-300 text-center shadow-lg hover:scale-105 transition-transform"
              >
                View Resume
              </button>
              
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-4 rounded-full text-base font-bold text-white bg-[#3b82a6] hover:bg-[#2d6785] text-center shadow-xl hover:scale-105 transition-transform"
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
