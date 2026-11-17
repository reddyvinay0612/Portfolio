import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, Calendar, ExternalLink, X, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import FocusPullCarousel from './ui/focus-pull-carousel';

export const Certifications: React.FC = () => {
  const certs = PORTFOLIO_DATA.certifications;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 relative z-10 bg-white overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Professional Growth</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Certifications &amp; <span className="text-[#b1b493]">Trainings</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
            Verified development programs in full-stack engineering, Bosch Industry 4.0 IoT, enterprise Java, and cybersecurity techniques.
          </p>
        </div>

        {/* INTERACTIVE FOCUS PULL CAROUSEL (OPTICAL CAMERA LENS) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <FocusPullCarousel<Certification>
            items={certs}
            cardWidth="min(90vw, 470px)"
            cardHeight="530px"
            height="620px"
            blur={6}
            autoplay={0}
            getItemMeta={(cert) => ({
              title: cert.title,
              caption: `Issuer: ${cert.issuer} • ${cert.period}`
            })}
            renderItem={(cert, idx, isCenter) => (
              <div
                className={`w-full h-full p-6 sm:p-7 rounded-[28px] bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden text-left ${
                  isCenter
                    ? 'border-[#b1b493] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)] ring-1 ring-[#b1b493]/30'
                    : 'border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
                }`}
              >
                <div>
                  {/* Certificate Image Thumbnail with Quick Preview Overlay */}
                  <div 
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-neutral-100 border border-neutral-200 cursor-pointer group shadow-inner"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                      <span className="text-white text-xs font-mono font-semibold flex items-center gap-1.5 drop-shadow">
                        <Eye className="w-4 h-4 text-[#b1b493]" />
                        <span>Click to view certificate</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono border border-white/30">
                        HD View
                      </span>
                    </div>

                    {/* Partner / Credential Pill over image */}
                    {cert.credentialId && (
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-neutral-800 border border-neutral-200/80 shadow-sm">
                        {cert.credentialId}
                      </div>
                    )}
                  </div>

                  {/* Header Row: Issuer + Period */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#8e916c] font-bold uppercase tracking-wider truncate">
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f8f9fa] border border-neutral-200 flex-shrink-0">
                      <Calendar className="w-3 h-3 text-[#b1b493]" />
                      <span>{cert.date || cert.period}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#000000] tracking-tight mb-2 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#6c757d] leading-relaxed line-clamp-2 mb-3">
                    {cert.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#f8f9fa] border border-neutral-200/80 text-neutral-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-[#b1b493]/15 text-[#5a5d40] font-semibold">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-3.5 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 text-[#5a5d40] hover:text-black font-semibold transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8e916c]" />
                    <span className="text-[11px]">{cert.verificationBadge || 'Verified Certificate'}</span>
                  </button>
                  <span className="text-[#8e916c] font-bold text-[11px] opacity-80">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} / {certs.length < 10 ? `0${certs.length}` : certs.length}
                  </span>
                </div>
              </div>
            )}
          />
        </motion.div>

      </div>

      {/* ENLARGED CERTIFICATE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[60000] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#fafafa]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#b1b493]/15 border border-[#b1b493]/35 flex items-center justify-center text-[#5a5d40]">
                    <ShieldCheck className="w-5 h-5 text-[#8e916c]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 leading-tight">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs font-mono text-[#8e916c]">
                      {selectedCert.issuer} {selectedCert.partner ? `• ${selectedCert.partner}` : ''}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-neutral-200/70 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Full-Resolution Image */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)] flex flex-col items-center bg-neutral-950/5">
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 shadow-lg bg-white">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[62vh] w-auto object-contain mx-auto"
                  />
                </div>

                {/* Certificate Meta Details */}
                <div className="w-full mt-4 p-4 rounded-2xl bg-white border border-neutral-200 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#8e916c] uppercase">
                      Period: {selectedCert.period}
                    </span>
                    {selectedCert.credentialId && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f8f9fa] border border-neutral-200 text-xs font-mono font-medium text-neutral-700">
                        {selectedCert.credentialId}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {selectedCert.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#f8f9fa] border border-neutral-200 text-neutral-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
