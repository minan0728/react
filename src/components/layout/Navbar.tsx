import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, User, BookOpen, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'experience', 'essays', 'contact'];
      const scrollPosition = window.scrollY + 200;

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
    { id: 'hero', label: '首页', icon: <Compass className="w-4 h-4" /> },
    { id: 'experience', label: '经历', icon: <User className="w-4 h-4" /> },
    { id: 'essays', label: '随笔', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: '联系', icon: <Send className="w-4 h-4" /> },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pointer-events-auto flex items-center gap-1.5 md:gap-3 px-3.5 md:px-5 py-2 md:py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-warm-md border-warm-peach/25 bg-white/85'
            : 'glass-panel-subtle shadow-warm-sm border-white/40'
        }`}
      >
        {/* Brand/Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 pr-2 md:pr-3 border-r border-warm-border/60 group"
        >
          <span className="w-7 h-7 rounded-full bg-warm-peach/20 text-warm-peach flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-display font-bold text-sm md:text-base text-warm-text tracking-wide">
            Minan
          </span>
        </button>

        {/* Navigation links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-warm-text font-semibold'
                    : 'text-warm-text-muted hover:text-warm-text'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-warm-peach/20 border border-warm-peach/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline-block">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Say Hi CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:inline-flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold shadow-warm-sm hover:bg-[#E8924F] transition-colors"
        >
          <span>Say Hi</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </button>
      </motion.nav>
    </header>
  );
};
