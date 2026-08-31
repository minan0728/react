import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Mail } from 'lucide-react';
import { profileData } from '../../data/profile';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'essays', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME', count: '' },
    { id: 'experience', label: 'JOURNEY', count: '(12)' },
    { id: 'essays', label: 'JOURNAL', count: '(20)' },
    { id: 'contact', label: 'CONTACT', count: '' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Header Bar (Fixed & Minimal) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-14 py-6 bg-transparent pointer-events-none">
        {/* Brand Logo - Top Left */}
        <button
          onClick={() => scrollTo('hero')}
          className="pointer-events-auto group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-warm-text uppercase">
            MINAN
          </span>
          <span className="w-2 h-2 rounded-full bg-warm-peach group-hover:scale-125 transition-transform" />
        </button>

        {/* Hamburger / Menu button - Top Right */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-warm-text/80 hover:text-warm-text transition-colors"
          >
            <span>Say Hi</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-warm-peach" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-warm-card border border-warm-border/60 shadow-warm-sm flex items-center justify-center text-warm-text hover:border-warm-text transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="flex flex-col gap-1 items-end w-4">
                <span className="w-4 h-[2px] bg-warm-text rounded-full" />
                <span className="w-2.5 h-[2px] bg-warm-text rounded-full" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Left Vertical Sidebar Navigation (Desktop >= lg screens) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-24 flex-col justify-between items-center py-10 pointer-events-none">
        {/* Top spacer to align below brand logo */}
        <div className="h-10" />

        {/* Center: Vertical Rotated Nav Links */}
        <nav className="pointer-events-auto flex flex-col items-center gap-12">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group relative text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform -rotate-90 origin-center whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-warm-text font-black scale-105'
                    : 'text-warm-text-muted/60 hover:text-warm-text'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="text-[9px] font-mono text-warm-peach/90">
                      {item.count}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-warm-peach rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: Social Icons */}
        <div className="pointer-events-auto flex flex-col items-center gap-4 text-warm-text-muted hover:text-warm-text">
          <a
            href={profileData.socials.find((s) => s.iconName === 'github')?.url || 'https://github.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:text-warm-peach hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.find((s) => s.iconName === 'mail')?.url || 'mailto:minan@example.com'}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:text-warm-peach hover:scale-110 transition-transform"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* Fullscreen Overlay Menu (when hamburger is clicked) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl flex flex-col justify-center px-10 sm:px-20 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-display font-bold text-3xl sm:text-5xl text-warm-text hover:text-warm-peach transition-colors flex items-baseline justify-between border-b border-warm-border/40 pb-4"
                >
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="text-base font-mono text-warm-text-muted">
                      {item.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="mt-12 flex items-center gap-6 text-warm-text-muted">
              {profileData.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-warm-peach transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
