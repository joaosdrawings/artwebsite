'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [foregroundLoaded, setForegroundLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if images are already loaded (cached)
    if (backgroundRef.current?.querySelector('img')?.complete) {
      setBackgroundLoaded(true);
    }
    if (foregroundRef.current?.querySelector('img')?.complete) {
      setForegroundLoaded(true);
    }

    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;
    let latestScroll = 0;

    const updateOnScroll = () => {
      ticking = false;
      const scrolled = latestScroll;

      // Background scrolls slower (parallax effect) - scroll up
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translateY(${scrolled * -0.03}px)`;
      }

      // Foreground scrolls faster - scroll up
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translateY(${scrolled * -0.15}px)`;
      }

      // Fade out hero based on scroll: start at 25% height, finish at 80%
      if (containerRef.current) {
        const heroHeight = window.innerHeight * 1.05 - 100;
        const fadeStart = heroHeight * 0.25;
        const fadeEnd = heroHeight * 0.8;
        const progress = Math.min(1, Math.max(0, (scrolled - fadeStart) / (fadeEnd - fadeStart)));
        const opacity = 1 - progress;
        containerRef.current.style.opacity = opacity.toString();
      }

      // Fade out arrow based on scroll (start at 25% of viewport height)
      if (arrowRef.current) {
        const fadeStart = window.innerHeight * 0.25;
        const opacity = Math.max(0, 1 - (scrolled / fadeStart));
        arrowRef.current.style.opacity = opacity.toString();
      }
    };

    const handleScroll = () => {
      latestScroll = window.pageYOffset;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: 'calc(105vh - 100px)' }}
    >
      {/* Background layer - scrolls slower */}
      <div
        ref={backgroundRef}
        className="fixed left-0 right-0 w-full"
        style={{
          top: 0,
          height: '120vh',
          willChange: 'transform',
          zIndex: 0
        }}
      >
        <img
          src="/images/hero/background.PNG"
          alt="Hero background"
          className="w-full h-full object-cover object-top"
          style={{
            filter: backgroundLoaded ? 'blur(0px)' : 'blur(10px)',
            transition: 'filter 0.3s ease-out',
            transform: isMobile ? 'scale(1.1) translateY(-60px)' : 'scale(1.1) translateY(-80px)',
            transformOrigin: 'top center'
          }}
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      {/* Foreground layer - scrolls faster */}
      <div
        ref={foregroundRef}
        className="fixed left-0 right-0 w-full"
        style={{
          top: 0,
          height: '120vh',
          willChange: 'transform',
          zIndex: 1
        }}
      >
        <img
          src="/images/hero/foreground.PNG"
          alt="Hero foreground"
          className="w-full h-full object-cover object-top"
          style={{
            filter: foregroundLoaded ? 'blur(0px)' : 'blur(10px)',
            transition: 'filter 0.3s ease-out',
            transform: isMobile ? 'scale(1.15) translateY(30px) translateX(12px)' : 'scale(1.15) translateY(-30px) translateX(20px)',
            transformOrigin: 'center center'
          }}
          onLoad={() => setForegroundLoaded(true)}
        />
      </div>

      {/* Scroll Down Arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 cursor-pointer"
        style={{
          color: '#FF7E70',
          transition: 'opacity 0.3s ease-out',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
        }}
        onClick={() => {
          const illustrationSection = document.getElementById('illustration');
          if (illustrationSection) {
            illustrationSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="animate-bounce">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}