import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, ExternalLink, Github, ChevronRight, X, Users } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Machine Learning & XAI',
    'FinTech & AI Security',
    'Full Stack & AI',
    'Deep Learning & Computer Vision',
    'AI & Sustainability'
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
        selectedCategory.toLowerCase().includes(p.category.toLowerCase())
      );

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10 bg-[#070709]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5 text-[#FF2A2A]" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-[#FF2A2A]">Projects</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-2xl text-sm md:text-base">
            Innovative engineering work spanning AI financial security against synthetic biometrics, explainable real estate valuation, institutional early-warning systems, and computer vision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#FF2A2A] text-white shadow-lg shadow-[#FF2A2A]/30'
                  : 'glass-panel text-neutral-400 hover:text-white hover:border-[#FF2A2A]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-7 rounded-3xl border-white/10 glass-panel-hover flex flex-col justify-between relative group overflow-hidden hover:border-[#FF2A2A]/40"
            >
              {/* Subtle red background glow on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2A2A]/5 rounded-full blur-3xl group-hover:bg-[#FF2A2A]/15 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header Badge & Period */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {project.role && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-neutral-200 border border-white/10 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#FF2A2A]" />
                        {project.role}
                      </span>
                    )}
                    <span className="text-xs font-mono text-neutral-400">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF2A2A] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>

                {/* Status Badge */}
                {project.statusBadge && (
                  <div className="inline-block mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                      {project.statusBadge}
                    </span>
                  </div>
                )}

                {/* Short Description */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-neutral-400">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Tech Stack & View Details CTA */}
              <div className="pt-5 border-t border-white/10 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 hover:border-[#FF2A2A]/50 transition-all flex items-center gap-1.5 text-xs font-mono font-semibold shrink-0"
                      title="Open GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 text-[#FF2A2A]" />
                      <span>Code</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF2A2A]/10 hover:bg-[#FF2A2A] border border-[#FF2A2A]/30 text-white text-xs font-semibold transition-all group-hover:border-[#FF2A2A]/60"
                  >
                    <span>View Technical Details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 rounded-3xl border-[#FF2A2A]/30 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl bg-[#0F0F14]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-[#FF2A2A]/20 border border-[#FF2A2A]/30 text-white text-xs font-mono mb-3">
                {selectedProject.category}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-6">
                <span>Period: {selectedProject.period}</span>
                {selectedProject.role && <span className="text-[#FF2A2A]">Role: {selectedProject.role}</span>}
              </div>

              <div className="space-y-4 text-neutral-300 text-sm leading-relaxed mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                Key Technical Innovations &amp; Features:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-[#FF2A2A] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                Technologies &amp; Libraries:
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/15 hover:border-[#FF2A2A]/50"
                  >
                    <Github className="w-4 h-4 text-[#FF2A2A]" />
                    <span>View GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF2A2A] hover:bg-red-600 text-white font-semibold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
