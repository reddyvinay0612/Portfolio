import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Code2, CheckCircle2, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="certifications" className="py-20 px-4 md:px-8 relative z-10 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
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

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#b1b493] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b1b493]/15 border border-[#b1b493]/30 flex items-center justify-center text-[#5a5d40]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#6c757d] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#b1b493]" />
                    {cert.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#000000] mb-1">
                  {cert.title}
                </h3>

                <div className="text-xs font-mono text-[#8e916c] font-semibold mb-3">
                  Issuer: {cert.issuer}
                </div>

                <p className="text-xs text-[#6c757d] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-[#5a5d40]">
                <CheckCircle2 className="w-4 h-4 text-[#b1b493]" />
                <span>Verified Certificate</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
