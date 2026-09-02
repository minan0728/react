import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  className?: string;
}

export const ScrollFloat: React.FC<ScrollFloatProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: '50% 0%',
        },
        {
          opacity: 0,
          yPercent: 250,
          scaleY: 1.2,
          scaleX: 0.9,
          stagger: 0.05,
          ease: 'power2.inOut',
          duration: 1,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=1000',
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lines = children.split('\n');

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex flex-col justify-end p-4 md:p-8 pointer-events-none z-10 ${className}`}
    >
      <h1
        className="font-dirtyline text-white select-none"
        style={{
          fontSize: 'clamp(4rem, 15vw, 317px)',
          lineHeight: 0.85,
          letterSpacing: '0%',
        }}
      >
        {lines.map((line, lineIdx) => {
          const words = line.split(' ');
          return (
            <span key={lineIdx} style={{ display: 'block' }}>
              {words.map((word, wordIdx) => (
                <React.Fragment key={wordIdx}>
                  <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, charIdx) => (
                      <span key={charIdx} className="char">
                        {char}
                      </span>
                    ))}
                  </span>
                  {wordIdx < words.length - 1 && ' '}
                </React.Fragment>
              ))}
            </span>
          );
        })}
      </h1>
    </div>
  );
};
