'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    let latestScroll = 0;

    const updateParallax = () => {
      ticking = false;
      if (parallaxRef.current) {
        const rate = latestScroll * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    const handleScroll = () => {
      latestScroll = window.pageYOffset;
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative h-96 overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] bg-gradient-to-t from-pink-300 to-red-300"
        style={{ top: '-10%', willChange: 'transform' }}
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Optional: Add content overlay here */}
      </div>
    </section>
  );
}