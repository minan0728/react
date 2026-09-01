import React from 'react';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EssaySection } from './components/sections/EssaySection';
import { ContactFooter } from './components/sections/ContactFooter';
import { SecretKeyDialog } from './components/admin/SecretKeyDialog';
import { AdminWorkspaceModal } from './components/admin/AdminWorkspaceModal';

export const AppContent: React.FC = () => {
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

      {/* Admin Secret Verification Dialog & Visual Workspace */}
      <SecretKeyDialog />
      <AdminWorkspaceModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
};

export default App;
