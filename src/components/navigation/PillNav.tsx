import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './PillNav.css';

gsap.registerPlugin(ScrollToPlugin);

interface NavItem {
  label: string;
  onClick?: () => void;
}

const PillButton: React.FC<{
  label: string;
  onClick?: () => void;
}> = ({ label, onClick }) => {
  const pillRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelHoverRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const pill = pillRef.current;
    const circle = circleRef.current;
    const labelEl = labelRef.current;
    const labelHover = labelHoverRef.current;

    if (!pill || !circle || !labelEl || !labelHover) return;

    const w = pill.offsetWidth;
    const h = pill.offsetHeight;

    const R = (w * w / 4 + h * h) / (2 * h);
    const D = 2 * R + 2;
    const delta = R - Math.sqrt(Math.max(0, R * R - w * w / 4)) + 1;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.left = `calc(50% - ${D / 2}px)`;
    circle.style.bottom = `-${delta}px`;
    circle.style.transformOrigin = `50% ${D - delta}px`;

    const tl = gsap.timeline({ paused: true });
    tl.to(circle, {
      scale: 3,
      duration: 0.3,
      ease: 'power2.out',
    })
      .to(
        labelEl,
        {
          yPercent: -120,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      )
      .to(
        labelHover,
        {
          yPercent: -100,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tlRef.current) {
      tlRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  return (
    <li>
      <button
        ref={pillRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="pill"
      >
        <span ref={circleRef} className="hover-circle" />
        <span className="label-stack">
          <span ref={labelRef} className="pill-label">
            {label}
          </span>
          <span ref={labelHoverRef} className="pill-label-hover">
            {label}
          </span>
        </span>
      </button>
    </li>
  );
};

export const PillNav: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const scrollToTop = () => {
    gsap.to(window, { duration: 3, scrollTo: 0, ease: 'power3.inOut' });
  };

  const scrollToBottom = () => {
    gsap.to(window, { duration: 3, scrollTo: document.body.scrollHeight, ease: 'power3.inOut' });
  };

  const navItems: NavItem[] = [
    { label: 'HOME', onClick: scrollToTop },
    { label: 'ABOUT', onClick: scrollToBottom },
    { label: 'SERVICES', onClick: scrollToTop },
    { label: 'CONTACT', onClick: scrollToBottom },
  ];

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );
    }

    if (itemsContainerRef.current) {
      gsap.fromTo(
        itemsContainerRef.current,
        { width: 0, opacity: 0 },
        { width: 'auto', opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  const handleLogoMouseEnter = () => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        rotation: '+=360',
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);

    if (line1Ref.current && line2Ref.current) {
      if (nextState) {
        gsap.to(line1Ref.current, { rotation: 45, y: 3, duration: 0.3 });
        gsap.to(line2Ref.current, { rotation: -45, y: -3, duration: 0.3 });
      } else {
        gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(line2Ref.current, { rotation: 0, y: 0, duration: 0.3 });
      }
    }
  };

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav">
        {/* Logo Button */}
        <div
          ref={logoRef}
          className="pill-logo"
          onClick={scrollToTop}
          onMouseEnter={handleLogoMouseEnter}
        >
          <div className="logo-svg-container">
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              width="24"
              height="24"
              fill="#fff"
            >
              <path d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z" />
              <path d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z" />
              <path d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z" />
              <path d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z" />
            </svg>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div ref={itemsContainerRef} className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {navItems.map((item, idx) => (
              <PillButton key={idx} label={item.label} onClick={item.onClick} />
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-only">
          <button onClick={toggleMobileMenu} className="mobile-menu-button">
            <span ref={line1Ref} className="hamburger-line" />
            <span ref={line2Ref} className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Popover */}
      <div className={`mobile-menu-popover ${mobileMenuOpen ? 'is-open' : ''} mobile-only`}>
        <ul className="mobile-menu-list">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                className="mobile-menu-link"
                onClick={() => {
                  item.onClick?.();
                  toggleMobileMenu();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
