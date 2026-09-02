import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GlassPanel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { y: '100%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;
      const moveX = (e.clientX / window.innerWidth) * 2 - 1;
      const moveY = (e.clientY / window.innerHeight) * 2 - 1;

      gsap.to(panelRef.current, {
        x: moveX * 20,
        y: moveY * 20,
        rotationY: moveX * 4,
        rotationX: -moveY * 4,
        duration: 1,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  const brands = ['VOICEFLOW', 'ZENDESK', 'PENDO', 'GLIDE', 'CANVA'];
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-screen flex items-center justify-center p-4 md:p-8 pointer-events-none z-20"
    >
      <div
        className="w-full max-w-[1250px] h-[900px] max-h-[85vh] pointer-events-auto"
        style={{ perspective: '1000px' }}
      >
        <div
          ref={panelRef}
          className="w-full h-full flex flex-col justify-between rounded-3xl relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.16)',
            backdropFilter: 'blur(160px)',
            WebkitBackdropFilter: 'blur(160px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Main Centered Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center my-auto">
            <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
              About Us
            </p>
            <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-[96px] leading-[1.1] lg:leading-[92.6px] tracking-tight w-full max-w-[1000px] mx-auto">
              We transform sterile concrete into thriving <span className="italic">urban</span> jungles.
              Our innovative designs bring wild <span className="italic">nature</span> back to modern
              cities. Experience the <span className="italic">bloom</span>
            </h2>
          </div>

          {/* Bottom Infinite Marquee */}
          <div className="w-full border-t border-white/10 py-6 overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-marquee">
              {marqueeItems.map((brand, idx) => (
                <span
                  key={idx}
                  className="mx-8 uppercase font-sans font-semibold text-sm tracking-widest text-white opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none inline-block"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
