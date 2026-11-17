import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  const edu = PORTFOLIO_DATA.education;

  return (
    <section id="education" className="py-24 px-4 md:px-8 relative z-10 bg-[#070709]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#FF2A2A]" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-[#FF2A2A]">Coursework</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-xl text-sm md:text-base">
            Formal education focused on Computer Science principles, software engineering, and visual design.
          </p>
        </div>

        {/* Education Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-10 rounded-3xl border-white/10 hover:border-[#FF2A2A]/30 shadow-2xl relative overflow-hidden max-w-4xl mx-auto transition-colors"
        >
          {/* Top Decorative Banner Accent (Red & Black gradient) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF2A2A] via-red-600 to-black" />

          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A2A] uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{edu.graduation}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {edu.degree}
              </h3>

              <div className="flex items-center gap-2 text-gray-200 font-semibold text-base mt-2">
                <span>{edu.institution}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF2A2A]" />
                <span>{edu.location}</span>
              </div>
            </div>

            {/* GPA Badge */}
            <div className="flex flex-col items-end shrink-0">
              <div className="glass-panel px-5 py-3 rounded-2xl border-[#FF2A2A]/30 bg-[#FF2A2A]/10 flex flex-col items-center shadow-lg shadow-[#FF2A2A]/10">
                <div className="flex items-center gap-1 text-xs text-red-300 font-mono uppercase tracking-wider mb-0.5">
                  <Award className="w-3.5 h-3.5 text-[#FF2A2A]" />
                  <span>Cumulative GPA</span>
                </div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {edu.gpa}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            
            {/* Concentrations */}
            <div>
              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF2A2A]" />
                <span>Specialized Concentrations</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.concentrations.map((conc) => (
                  <span
                    key={conc}
                    className="px-4 py-2 rounded-xl bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white text-sm font-semibold shadow-md"
                  >
                    {conc}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Coursework */}
            <div>
              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF2A2A]" />
                <span>Related Core Coursework</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium hover:border-[#FF2A2A]/40 transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
