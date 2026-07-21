import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadClick = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 }
    });

    // Create a print window or trigger print formatted text
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel p-6 sm:p-10 rounded-3xl border-purple-500/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl my-8 text-gray-200 print:text-black print:bg-white print:p-0 print:border-none print:shadow-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Action Bar Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Curriculum Vitae</h2>
                <p className="text-xs text-gray-400 font-mono">VINAYPRAKASH.pdf</p>
              </div>
            </div>

            <button
              onClick={handleDownloadClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Print / Download Resume</span>
            </button>
          </div>

          {/* RESUME PAPER CONTENT */}
          <div className="space-y-6 text-sm">
            
            {/* Header */}
            <div className="text-center pb-6 border-b border-white/10 print:border-black">
              <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300 print:text-black mt-2 font-mono">
                <span>{PORTFOLIO_DATA.personal.location}</span>
                <span>•</span>
                <span>{PORTFOLIO_DATA.personal.email}</span>
                <span>•</span>
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 print:text-black font-bold mb-3 pb-1 border-b border-purple-500/30 print:border-black">
                Education
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-start font-semibold text-white print:text-black">
                  <span>{PORTFOLIO_DATA.education.institution}</span>
                  <span className="text-xs font-mono text-gray-400 print:text-black">{PORTFOLIO_DATA.education.location}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-300 print:text-black">
                  <span>{PORTFOLIO_DATA.education.degree}</span>
                  <span className="font-mono text-purple-300 print:text-black">{PORTFOLIO_DATA.education.graduation}</span>
                </div>
                <div className="text-xs text-gray-400 print:text-black">
                  Concentrations: {PORTFOLIO_DATA.education.concentrations.join(', ')} | <strong>GPA: {PORTFOLIO_DATA.education.gpa}</strong>
                </div>
                <div className="text-xs text-gray-400 print:text-black">
                  Coursework: {PORTFOLIO_DATA.education.coursework.join(', ')}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 print:text-black font-bold mb-3 pb-1 border-b border-purple-500/30 print:border-black">
                Projects
              </h3>
              <div className="space-y-4">
                {PORTFOLIO_DATA.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-white print:text-black">
                        {proj.title} {proj.role && <span className="text-xs font-normal text-cyan-400">({proj.role})</span>}
                      </span>
                      <span className="text-xs font-mono text-gray-400 print:text-black">{proj.period}</span>
                    </div>
                    <p className="text-xs text-gray-300 print:text-black leading-relaxed">
                      {proj.longDescription || proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Participated */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 print:text-black font-bold mb-3 pb-1 border-b border-purple-500/30 print:border-black">
                Events Participated &amp; Industrial Exposure
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-bold text-white print:text-black mb-1">Student Development Programs:</div>
                  <ul className="list-disc list-inside text-xs text-gray-300 print:text-black space-y-0.5">
                    {PORTFOLIO_DATA.certifications.map(c => (
                      <li key={c.title}><strong>{c.title}</strong> — {c.issuer} ({c.period})</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-bold text-white print:text-black mb-1">Hackathons:</div>
                  <ul className="list-disc list-inside text-xs text-gray-300 print:text-black space-y-0.5">
                    {PORTFOLIO_DATA.eventsAndVisits.filter(e => e.category === 'Hackathon').map(h => (
                      <li key={h.title}><strong>{h.title}</strong>: {h.description}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-bold text-white print:text-black mb-1">Industrial Visits:</div>
                  <ul className="list-disc list-inside text-xs text-gray-300 print:text-black space-y-0.5">
                    {PORTFOLIO_DATA.eventsAndVisits.filter(e => e.category === 'Industrial Visit').map(iv => (
                      <li key={iv.title}><strong>{iv.title}</strong>: {iv.description}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 print:text-black font-bold mb-3 pb-1 border-b border-purple-500/30 print:border-black">
                Skills &amp; Languages
              </h3>
              <div className="text-xs text-gray-300 print:text-black space-y-1">
                <div>
                  <strong>Programming Languages:</strong> {PORTFOLIO_DATA.skillCategories[0].skills.map(s => s.name).join(', ')}
                </div>
                <div>
                  <strong>Frameworks &amp; Platforms:</strong> {PORTFOLIO_DATA.skillCategories[1].skills.concat(PORTFOLIO_DATA.skillCategories[2].skills).map(s => s.name).join(', ')}
                </div>
                <div>
                  <strong>Languages Known:</strong> {PORTFOLIO_DATA.personal.spokenLanguages.join(', ')}
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
