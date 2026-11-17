import React from 'react';
import { motion } from 'framer-motion';
import { Award, Database, TrendingUp, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Counters: React.FC = () => {
  const counters = PORTFOLIO_DATA.counters;

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return Database;
      case 1: return TrendingUp;
      case 2: return Award;
      default: return GraduationCap;
    }
  };

  return (
    <section id="section-counter" className="relative py-16 px-4 md:px-8 bg-[#f8f9fa] border-y border-neutral-200/80 z-20 overflow-hidden">
      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#b1b493]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {counters.map((item, idx) => {
            const Icon = getIcon(idx);

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/80 hover:border-[#b1b493] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-5px_rgba(177,180,147,0.25)] hover:-translate-y-1"
              >
                {/* Ambient hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b1b493]/5 group-hover:bg-[#b1b493]/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#b1b493]/15 border border-[#b1b493]/30 flex items-center justify-center text-[#555a3c] group-hover:scale-110 group-hover:bg-[#b1b493] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                    0{idx + 1} // STAT
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight group-hover:text-[#555a3c] transition-colors flex items-baseline">
                    <span>{item.value}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#212529] mt-1.5 uppercase tracking-wide">
                    {item.label}
                  </h4>

                  <p className="text-xs text-[#6c757d] mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
