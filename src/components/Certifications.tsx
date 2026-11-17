import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, Calendar, X, Eye, ShieldCheck, Maximize2 } from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import FocusPullCarousel from './ui/focus-pull-carousel';

export const Certifications: React.FC = () => {
  const certs = PORTFOLIO_DATA.certifications;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Close enlarged certificate on Escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 relative z-10 bg-white overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b82a6]/15 border border-[#3b82a6]/35 text-[#163e54] text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#2c6585]" />
            <span>Professional Growth</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Certifications &amp; <span className="text-[#3b82a6]">Trainings</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
            Verified development programs in full-stack engineering, Bosch Industry 4.0 IoT, enterprise Java, cybersecurity techniques, and national-level hackathons.
          </p>
        </div>

        {/* INTERACTIVE FOCUS PULL CAROUSEL (LANDSCAPE CERTIFICATES FULLY VISIBLE) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <FocusPullCarousel<Certification>
            items={certs}
            cardWidth="min(94vw, 560px)"
            cardHeight="auto"
            height="670px"
            blur={6}
            autoplay={0}
            getItemMeta={(cert) => ({
              title: cert.title,
              caption: `Issuer: ${cert.issuer} • ${cert.period}`
            })}
            renderItem={(cert, idx, isCenter) => (
              <div
                className={`w-full h-full p-5 sm:p-6 rounded-[28px] bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden text-left ${
                  isCenter
                    ? 'border-[#3b82a6] shadow-[0_22px_50px_-10px_rgba(0,0,0,0.16)] ring-1 ring-[#3b82a6]/40'
                    : 'border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
                }`}
              >
                <div>
                  {/* ENTIRE LANDSCAPE CERTIFICATE (100% VISIBLE, NO CROPPING) */}
                  <div 
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full aspect-[1.4/1] rounded-2xl overflow-hidden mb-4 bg-[#f2f7fa] border border-neutral-200/90 cursor-pointer group shadow-sm hover:shadow-md transition-all flex items-center justify-center p-1.5"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    
                    {/* Hover Overlay with Centered Subtle Zoom Pill that never blocks signatures */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-mono font-semibold flex items-center gap-2 shadow-2xl border border-white/20">
                        <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Enlarge Certificate</span>
                      </span>
                    </div>

                    {cert.credentialId && (
                      <div className="absolute top-2.5 right-2.5 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[9px] font-mono font-bold text-neutral-800 border border-neutral-200 shadow-sm">
                          {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Header Row: Issuer + Period */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-[#2c6585] font-bold uppercase tracking-wider truncate">
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f7fa] border border-neutral-200 flex-shrink-0">
                      <Calendar className="w-3 h-3 text-[#3b82a6]" />
                      <span>{cert.date || cert.period}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#000000] tracking-tight mb-1.5 leading-snug line-clamp-1">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#6c757d] leading-relaxed line-clamp-2 mb-3">
                    {cert.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#f2f7fa] border border-neutral-200/80 text-neutral-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-[#3b82a6]/15 text-[#163e54] font-semibold">
                        +{cert.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 text-[#163e54] hover:text-black font-semibold transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2c6585]" />
                    <span className="text-[11px]">{cert.verificationBadge || 'Verified Certificate'}</span>
                  </button>
                  <span className="text-[#2c6585] font-bold text-[11px] opacity-80">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} / {certs.length < 10 ? `0${certs.length}` : certs.length}
                  </span>
                </div>
              </div>
            )}
          />
        </motion.div>

      </div>

      {/* ENLARGED CERTIFICATE LIGHTBOX MODAL - PURE FULLSCREEN CERTIFICATE ONLY */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[60000] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
            {/* Deep Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-md cursor-pointer"
            />

            {/* Floating Top Right Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedCert(null)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60010] p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-xl border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Close enlarged certificate"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Pure Certificate Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[60005] max-w-[96vw] max-h-[94vh] flex flex-col items-center justify-center"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/15 bg-white/5 p-1 sm:p-2 backdrop-blur-sm">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[85vh] max-w-[94vw] w-auto h-auto object-contain rounded-xl select-none shadow-2xl"
                />
              </div>

              {/* Clean bottom certificate title & issuer tag */}
              <div className="mt-2.5 text-center pointer-events-none">
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {selectedCert.title}
                </p>
                <p className="text-[11px] text-white/70 font-mono drop-shadow">
                  {selectedCert.issuer} {selectedCert.partner ? `• ${selectedCert.partner}` : ''}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
