import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, Mail, Phone, Github, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[60000] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl border border-neutral-200/90 max-w-5xl w-full max-h-[96vh] h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        >
          {/* Action Bar Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-b border-neutral-200 bg-[#f8fafc]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3b82a6]/15 text-[#163e54] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#2c6585]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                  Vinayprakash — Resume
                </h2>
                <p className="text-xs text-[#2c6585] font-mono">
                  VINAYPRAKASH_Resume.pdf • Computer Science &amp; Design
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-mono font-medium transition-all hover:scale-105 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>

              <a
                href="/resume.pdf"
                download="Vinayprakash_Resume.pdf"
                onClick={handleDownloadConfetti}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82a6] hover:bg-[#2c6585] text-white text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#3b82a6]/30"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-neutral-200/70 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors ml-1"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full bg-neutral-100 p-2 sm:p-4 overflow-hidden flex flex-col">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-neutral-300/80 bg-white shadow-inner relative flex flex-col">
              <object
                data="/resume.pdf#view=FitH"
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback if browser doesn't natively render PDFs */}
                <iframe
                  src="/resume.pdf#view=FitH"
                  title="Vinayprakash Resume"
                  className="w-full h-full border-0"
                >
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <FileText className="w-12 h-12 text-[#3b82a6] mb-3" />
                    <p className="text-sm font-semibold text-neutral-800 mb-1">
                      Resume PDF Ready for Viewing
                    </p>
                    <p className="text-xs text-neutral-500 mb-4 max-w-sm">
                      Your browser does not support embedded PDF previewing.
                    </p>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#3b82a6] text-white text-xs font-semibold shadow-md"
                    >
                      Open PDF in New Window
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </div>

          {/* Clean Footer Bar with verified contact info */}
          <div className="px-5 sm:px-8 py-2.5 border-t border-neutral-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-4">
              <a 
                href="mailto:vinayprakashvg@gmail.com" 
                className="hover:text-[#3b82a6] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#2c6585]" />
                <span>vinayprakashvg@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <span className="hidden sm:inline flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#2c6585]" />
                <span>+91 9353642283</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/reddyvinay0612"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3b82a6] transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-neutral-300">•</span>
              <a
                href="https://linkedin.com/in/vinayprakash-gummat-8495b3396"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3b82a6] transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
