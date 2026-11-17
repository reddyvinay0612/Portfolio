import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import FocusPullCarousel from './ui/focus-pull-carousel';

export const Certifications: React.FC = () => {
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="certifications" className="py-20 px-4 md:px-8 relative z-10 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Professional Growth</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Certifications &amp; <span className="text-[#b1b493]">Trainings</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
            Verified development programs in full-stack engineering, enterprise Java, and cybersecurity techniques.
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
            cardWidth="min(88vw, 460px)"
            cardHeight="360px"
            blur={6}
            autoplay={0}
            getItemMeta={(cert, idx) => ({
              title: cert.title,
              caption: `Issuer: ${cert.issuer} • ${cert.period} Program`
            })}
            renderItem={(cert, idx, isCenter) => (
              <div
                className={`w-full h-full p-7 rounded-[28px] bg-white border transition-all duration-300 flex flex-col justify-between ${
                  isCenter
                    ? 'border-[#b1b493] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)]'
                    : 'border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#b1b493]/15 border border-[#b1b493]/35 flex items-center justify-center text-[#5a5d40] shadow-sm">
                      <Award className="w-6 h-6 text-[#8e916c]" />
                    </div>
                    <span className="text-xs font-mono text-[#6c757d] flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f9fa] border border-neutral-200/80">
                      <Calendar className="w-3.5 h-3.5 text-[#b1b493]" />
                      <span>{cert.period}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] tracking-tight mb-1.5">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div className="text-xs font-mono text-[#8e916c] font-bold mb-3 uppercase tracking-wider">
                    Issuer: {cert.issuer}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6c757d] leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#5a5d40]">
                  <span className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#8e916c]" />
                    <span>Verified Certificate</span>
                  </span>
                  <span className="text-[#8e916c] font-bold opacity-80">
                    0{idx + 1} / 03
                  </span>
                </div>
              </div>
            )}
          />
        </motion.div>

      </div>
    </section>
  );
};
