import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Send, Coffee, Terminal, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Container } from '../layout/Container';
import { profileData } from '../../data/profile';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-warm-bg via-[#FFFDF9] to-warm-bg"
    >
      {/* Ambient background glow & soft floating bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Peach Glow Top Right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-warm-peach/15 blur-[120px]" />
        {/* Soft Coral Glow Bottom Left */}
        <div className="absolute -bottom-40 -left-40 w-[650px] h-[650px] rounded-full bg-warm-coral/10 blur-[130px]" />
        {/* Matcha Glow Center */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-warm-matcha/10 blur-[140px]" />

        {/* Delicate background decorative grid/dots */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(rgba(45, 38, 33, 0.12) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <Container className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Top Status Pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <Badge variant="peach" dot className="px-4 py-1.5 text-xs md:text-sm">
            <span>{profileData.status}</span>
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-warm-text leading-[1.1] md:leading-[1.15] mb-6">
            Building with <br className="hidden sm:inline" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-warm-peach via-warm-coral to-warm-peach">
              warmth & curiosity
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-warm-peach/20 -rotate-1 -z-10 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
            .
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-warm-text-muted font-normal max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10">
            Hi, I'm <span className="text-warm-text font-semibold underline decoration-warm-peach/50 decoration-wavy">{profileData.name}</span> ✦ 计算机系在读本科生。
            致力于探索富有美感、细腻温润的前端工程与人机交互体验。
          </p>
        </motion.div>

        {/* Floating Tag Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 md:mb-12 max-w-2xl"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl glass-panel text-xs md:text-sm text-warm-text font-medium shadow-warm-sm hover:scale-105 transition-transform">
            <Terminal className="w-3.5 h-3.5 text-warm-peach" />
            <span>Creative Coder</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl glass-panel text-xs md:text-sm text-warm-text font-medium shadow-warm-sm hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-warm-coral" />
            <span>UI & Motion Explorer</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl glass-panel text-xs md:text-sm text-warm-text font-medium shadow-warm-sm hover:scale-105 transition-transform">
            <Coffee className="w-3.5 h-3.5 text-warm-matcha" />
            <span>Latte & Life Log</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl glass-panel text-xs md:text-sm text-warm-text font-medium shadow-warm-sm hover:scale-105 transition-transform">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Warm & Gentle</span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
        >
          <Button
            size="lg"
            variant="primary"
            icon={<Sparkles className="w-5 h-5 text-white/90" />}
            onClick={() => scrollTo('experience')}
          >
            探索我的历程
          </Button>

          <Button
            size="lg"
            variant="secondary"
            icon={<Send className="w-4 h-4 text-warm-peach" />}
            onClick={() => scrollTo('contact')}
          >
            打个招呼
          </Button>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <motion.button
          onClick={() => scrollTo('experience')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
          }}
          className="mt-16 md:mt-24 inline-flex flex-col items-center gap-2 text-xs font-medium text-warm-text-muted hover:text-warm-peach transition-colors group cursor-pointer"
        >
          <span>Scroll down to explore</span>
          <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center group-hover:border-warm-peach/40">
            <ArrowDown className="w-4 h-4 text-warm-peach" />
          </div>
        </motion.button>
      </Container>
    </section>
  );
};
