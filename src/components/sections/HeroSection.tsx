import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, ArrowDown } from 'lucide-react';
import { profileData } from '../../data/profile';

export const HeroSection: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-warm-bg"
    >
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-warm-peach/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-warm-coral/10 blur-[130px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:pl-32 lg:pr-16 flex-1 flex flex-col justify-center">
        {/* Main Headline Group (Editorial Serif + Flowing Script) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Top Line: Serif Editorial Heading */}
          <h1 className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-warm-text tracking-tight leading-[1.05]">
            Let's create things
          </h1>

          {/* Bottom Line: Bold Flowing Script Accent */}
          <div className="mt-1 sm:mt-2 -ml-1 sm:-ml-2">
            <span className="font-script font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-warm-text leading-[0.85] tracking-wide inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              together<span className="text-warm-peach">.</span>
            </span>
          </div>

          {/* Subtitle / Positioning Statement */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 sm:mt-8 max-w-xl"
          >
            <p className="text-sm sm:text-base md:text-lg text-warm-text-muted leading-relaxed">
              We help businesses find their voice, shape their identity, and connect with their audience.{' '}
              <strong className="text-warm-text font-bold">Less talk, more craft.</strong>
            </p>
            <p className="mt-2 text-xs sm:text-sm text-warm-text-muted/80">
              ✦ {profileData.roleDescription}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Bottom Banner Area: Huge Cutout Masked Typography + Floating Badge */}
      <div className="relative w-full mt-8 sm:mt-12 select-none">
        {/* Giant Masked Text Container */}
        <div className="relative w-full overflow-hidden bg-transparent">
          {/* Circular "PLAY REEL" Floating Badge (Absolute top-right of the giant text) */}
          <motion.button
            onClick={() => setIsPlayingReel(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="absolute top-0 right-8 sm:right-16 lg:right-32 -translate-y-1/2 z-20 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#1C1815] text-white flex flex-col items-center justify-center shadow-2xl hover:bg-warm-peach transition-colors group cursor-pointer"
            aria-label="Play Reel Demo"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-center px-2">
              PLAY REEL
            </span>
          </motion.button>

          {/* Cutout Masked Big Text with Cinematic Photography Background */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative h-40 sm:h-64 md:h-80 lg:h-96"
          >
            {/* The Text Cutout Container using background-clip: text */}
            <div
              className="w-full h-full flex items-center justify-center font-display font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text text-[26vw] sm:text-[24vw] lg:text-[22vw] filter drop-shadow-sm"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85')`,
                backgroundPosition: 'center 40%',
                backgroundSize: 'cover',
                WebkitBackgroundClip: 'text',
              }}
            >
              MINAN
            </div>

            {/* Bottom soft gradient blend */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-warm-bg to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => scrollTo('experience')}
            className="inline-flex items-center gap-2 text-xs font-medium text-warm-text-muted hover:text-warm-peach transition-colors"
          >
            <span>向下探索</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Video Reel Modal */}
      <AnimatePresence>
        {isPlayingReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsPlayingReel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-[#1C1815] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPlayingReel(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-warm-peach text-white flex items-center justify-center mb-4 shadow-warm-glow">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                Minan ✦ Creative Works & Reel
              </h3>
              <p className="text-white/60 max-w-md text-sm sm:text-base">
                专注于设计感、细腻动效与现代交互工程。浏览下方内容继续了解我的技术栈与随笔文章。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
