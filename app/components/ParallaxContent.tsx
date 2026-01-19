'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxContent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [arrowOpacity, setArrowOpacity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if image is already loaded (cached)
    if (imageRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        // Only apply parallax when the container is in view
        if (containerTop < window.innerHeight && containerTop + containerHeight > 0) {
          const scrolled = window.pageYOffset;
          const scale = 1 + (scrolled * 0.0005); // Subtle zoom
          imageRef.current.style.transform = `scale(${scale})`;
        }

        // Calculate opacity based on scroll position
        // At 50% of viewport height, opacity should be 0
        const fadeThreshold = window.innerHeight * 0.5;
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - (scrolled / fadeThreshold));
        setArrowOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{height: 'calc(100vh - 100px)'}}>
      {/* Parallax background with image */}
      <div 
        ref={parallaxRef}
        className="fixed inset-0 w-full h-full transition-transform duration-75 ease-out"
        style={{ 
          transformOrigin: 'center center'
        }}
      >
        <img
          ref={imageRef}
          src="/images/ryza.jpg"
          alt="Hero background"
          className="w-full h-full object-cover object-top"
          style={{
            filter: imageLoaded ? 'blur(0px)' : 'blur(20px)',
            transition: 'filter 0.3s ease-out'
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Animated scroll indicator arrow */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-100"
        style={{ opacity: arrowOpacity }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FF7E70" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}