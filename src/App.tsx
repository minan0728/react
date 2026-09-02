import React from 'react';
import { ScrollVideo } from './components/hero/ScrollVideo';
import { PillNav } from './components/navigation/PillNav';
import { ScrollFloat } from './components/hero/ScrollFloat';
import { GlassPanel } from './components/hero/GlassPanel';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* Background Scroll Video */}
      <ScrollVideo src="https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8" />

      {/* Pill Navigation Bar */}
      <PillNav />

      {/* 500vh Scroll-driven Interactive Container */}
      <div style={{ position: 'relative', height: '500vh' }}>
        <ScrollFloat>{`Unleash The\nFull Power`}</ScrollFloat>
        <GlassPanel />
      </div>
    </div>
  );
};

export default App;
