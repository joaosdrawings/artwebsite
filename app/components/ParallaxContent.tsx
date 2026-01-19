'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [foregroundLoaded, setForegroundLoaded] = useState(false);

  useEffect(() => {
    // Check if images are already loaded (cached)
    if (backgroundRef.current?.querySelector('img')?.complete) {
      setBackgroundLoaded(true);
    }
    if (foregroundRef.current?.querySelector('img')?.complete) {
      setForegroundLoaded(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && backgroundRef.current && foregroundRef.current) {
        const scrolled = window.pageYOffset;
        
        // Background scrolls slower (parallax effect) - scroll up
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${scrolled * -0.05}px)`;
        }
        
        // Foreground scrolls faster - scroll up
        if (foregroundRef.current) {
          foregroundRef.current.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {/* Background layer - scrolls slower */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          zIndex: 0
        }}
      >
        <img
          src="/images/hero/background.PNG"
          alt="Hero background"
          className="w-full h-full object-cover object-top"
          style={{
            filter: backgroundLoaded ? 'blur(0px)' : 'blur(20px)',
            transition: 'filter 0.3s ease-out',
            transform: 'scale(1.2) translateY(-100px)',
            transformOrigin: 'top center'
          }}
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      {/* Foreground layer - scrolls faster */}
      <div
        ref={foregroundRef}
        className="fixed inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          zIndex: 1
        }}
      >
        <img
          src="/images/hero/foreground.PNG"
          alt="Hero foreground"
          className="w-full h-full object-cover object-top"
          style={{
            filter: foregroundLoaded ? 'blur(0px)' : 'blur(20px)',
            transition: 'filter 0.3s ease-out',
            transform: 'scale(1.3) translateY(-40px) translateX(30px)',
            transformOrigin: 'center center'
          }}
          onLoad={() => setForegroundLoaded(true)}
        />
      </div>
    </div>
  );
}