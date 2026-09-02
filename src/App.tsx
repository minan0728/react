import React from 'react';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EssaySection } from './components/sections/EssaySection';
import { ContactFooter } from './components/sections/ContactFooter';
import { SecretKeyDialog } from './components/admin/SecretKeyDialog';
import { AdminWorkspaceModal } from './components/admin/AdminWorkspaceModal';

export const App: React.FC = () => {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-warm-bg text-warm-text font-sans selection:bg-warm-peach/20 selection:text-warm-peach relative">
        {/* Floating Capsule Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Experience & Timeline Section */}
        <ExperienceSection />

        {/* Essays Section */}
        <EssaySection />

        {/* Footer & Contact Climax */}
        <ContactFooter />

        {/* Admin Secret Dialog & Visual Workspace */}
        <SecretKeyDialog />
        <AdminWorkspaceModal />
      </div>
    </ContentProvider>
  );
};

export default App;
