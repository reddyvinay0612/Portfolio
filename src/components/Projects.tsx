import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ShieldAlert, Sparkles, Flame, ExternalLink, Github, ChevronRight, X, Users } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'FinTech & AI Security', 'Deep Learning & Computer Vision', 'Full Stack & AI', 'AI & Sustainability'];

  const filteredProjects = selectedCategory === 'All' 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.includes(p.category));

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-purple-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl text-sm md:text-base">
            Innovative engineering work spanning AI financial security against synthetic biometrics, computer vision, energy prediction ML, and full-stack web systems.
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
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'glass-panel text-gray-400 hover:text-white hover:border-purple-500/30'
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
              className="glass-panel p-7 rounded-3xl border-purple-500/20 glass-panel-hover flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-500" />

              <div>
                {/* Header Badge & Period */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {project.role && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.role}
                      </span>
                    )}
                    <span className="text-xs font-mono text-gray-400">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>

                {/* Status Badge */}
                {project.statusBadge && (
                  <div className="inline-block mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {project.statusBadge}
                    </span>
                  </div>
                )}

                {/* Short Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-400">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
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
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all group-hover:border-purple-500/60"
                >
                  <span>View Technical Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 rounded-3xl border-purple-500/30 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
                {selectedProject.category}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-6">
                <span>Period: {selectedProject.period}</span>
                {selectedProject.role && <span className="text-cyan-400">Role: {selectedProject.role}</span>}
              </div>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
                Key Technical Innovations &amp; Features:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
                Technologies &amp; Libraries:
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-200 text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
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
