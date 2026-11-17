import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Counters } from './components/Counters';
import { About } from './components/About';
import { Services } from './components/Services';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      {/* 1. CINEMATIC PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. PORTFOLIO WEBSITE CONTENT - CLYDE THEME */}
      <div className="relative min-h-screen bg-white text-[#212529] selection:bg-[#b1b493] selection:text-white font-sans overflow-x-hidden">
        {/* Sticky Header Navbar */}
        <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        <main>
          {/* Hero Section (Clyde & Joyseno Style) */}
          <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
          
          {/* Clyde Impact Stat Counters Section */}
          <Counters />

          {/* About Section with Lanyard ID Badge & Clyde Profile Info Grid */}
          <About />

          {/* Clyde & Joyseno Services / Specializations Section */}
          <Services />
          
          {/* Process Timeline Section (White Grid S-Curve) */}
          <ProcessTimeline />

          {/* Academic Education Section */}
          <Education />

          {/* Works / Projects Section (Interactive 3D Circular Gallery) */}
          <Projects />

          {/* Skill Proficiency Section */}
          <Skills />

          {/* Certificates Training Section */}
          <Certifications />

          {/* Contact CTA Form Section */}
          <Contact />
        </main>

        {/* Agency editorial Footer */}
        <Footer />

        {/* PDF Resume Drawer Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
