import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EssaySection } from './components/sections/EssaySection';
import { ContactFooter } from './components/sections/ContactFooter';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-bg text-warm-text font-sans selection:bg-warm-peach/25 selection:text-warm-text">
      {/* Floating Capsule Navigation */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main>
        <HeroSection />
        <ExperienceSection />
        <EssaySection />
      </main>

      {/* Full-Page Climax Contact Footer */}
      <ContactFooter />
    </div>
  );
};

export default App;
