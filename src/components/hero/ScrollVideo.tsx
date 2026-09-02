import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  className?: string;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let seekPending = false;
    let currentTarget = 0;

    const doSeek = () => {
      if (!video) return;
      if (video.duration && !isNaN(video.duration)) {
        if (!video.seeking) {
          video.currentTime = Math.min(Math.max(0, currentTarget), video.duration - 0.05);
          seekPending = false;
        } else {
          seekPending = true;
        }
      }
    };

    const handleSeeked = () => {
      if (seekPending) {
        doSeek();
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hls && hls.levels.length > 0) {
          const maxLevel = hls.levels.length - 1;
          hls.currentLevel = maxLevel;
          hls.startLevel = maxLevel;
        }
      });

      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        if (video.buffered.length > 0 && video.duration) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
          setLoadingProgress(percent);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration)) {
          currentTarget = self.progress * video.duration;
          doSeek();
        }
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const moveX = (e.clientX / window.innerWidth) * 2 - 1;
      const moveY = (e.clientY / window.innerHeight) * 2 - 1;

      gsap.to(wrapperRef.current, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('canplay', handleCanPlay);
      window.removeEventListener('mousemove', handleMouseMove);
      st.kill();
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
          <p className="text-white text-2xl font-sans tracking-wide">
            Loading... {loadingProgress}%
          </p>
        </div>
      )}

      <div
        ref={wrapperRef}
        className={`fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center pointer-events-none ${className}`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.35]"
          muted
          playsInline
          crossOrigin="anonymous"
          preload="auto"
        />
      </div>
    </>
  );
};
