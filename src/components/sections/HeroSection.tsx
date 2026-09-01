import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';

export const HeroSection: React.FC = () => {
  const { profile } = useContent();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 overflow-hidden bg-warm-bg"
    >
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-warm-peach/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-warm-coral/10 blur-[130px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-center">
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
              ✦ {profile.roleDescription}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Bottom Banner Area: 3D Interactive Perspective Cutout Masked Typography */}
      <div className="relative w-full mt-4 sm:mt-8 select-none">
        <CardContainer className="w-full py-4 cursor-pointer" containerClassName="w-full">
          <CardBody className="w-full flex items-center justify-center">
            {/* Cutout Masked Big Text with 3D Float Item (左高右低：顺时针旋转 rotate-3) */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotate: 3 }}
              animate={{ y: 0, opacity: 1, rotate: 3 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative h-48 sm:h-72 md:h-96 lg:h-[30rem] flex items-center justify-center transform rotate-3 scale-105"
            >
              {/* CardItem with subtle translateZ for depth and 3D floating effect */}
              <CardItem
                translateZ={24}
                className="w-full h-full flex items-center justify-center font-display font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text text-[26vw] sm:text-[24vw] lg:text-[23vw] filter drop-shadow-2xl select-none transition-transform duration-200"
                style={{
                  backgroundImage: `url(${profile.avatarUrl})`,
                  backgroundPosition: '55% 48%',
                  backgroundSize: '115% auto',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                }}
              >
                {profile.name.toUpperCase()}
              </CardItem>

              {/* Bottom soft gradient blend */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-warm-bg to-transparent pointer-events-none" />
            </motion.div>
          </CardBody>
        </CardContainer>

        {/* Scroll indicator */}
        <div className="flex justify-center -mt-2">
          <button
            onClick={() => scrollTo('experience')}
            className="inline-flex items-center gap-2 text-xs font-medium text-warm-text-muted hover:text-warm-peach transition-colors"
          >
            <span>向下探索</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
