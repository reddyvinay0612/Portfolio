import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Code, BrainCircuit, Cpu, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'BrainCircuit': return BrainCircuit;
      case 'Wrench': return Wrench;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 md:px-8 relative z-10 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Skills &amp; <span className="text-[#b1b493]">Technologies</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
            Languages, artificial intelligence frameworks, and developer tooling mastered through coursework, hackathons, and major projects.
          </p>
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => {
            const IconComp = getCategoryIcon(cat.iconName);

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.15 }}
                className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#b1b493] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                    <div className="w-10 h-10 rounded-xl bg-[#b1b493]/15 border border-[#b1b493]/30 flex items-center justify-center text-[#5a5d40]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#000000]">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill List with Progress Bars */}
                  <div className="space-y-5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#212529] flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#b1b493]" />
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="font-mono text-[11px] text-[#6c757d]">
                              {skill.level}%
                            </span>
                          )}
                        </div>

                        {/* Progress Bar (Clyde Sage) */}
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden p-[1px] border border-neutral-200/60">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level || 85}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#b1b493] to-[#9a9d7c] shadow-sm shadow-[#b1b493]/30"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
