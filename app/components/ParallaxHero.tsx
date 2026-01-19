'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // Adjust this value to control parallax speed
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-96 overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] bg-gradient-to-t from-pink-300 to-red-300"
        style={{ top: '-10%' }}
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Optional: Add content overlay here */}
      </div>
    </section>
  );
}