'use client';

import { useEffect, useRef, useState } from 'react';
import Birds from './Birds';

export default function ParallaxContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
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

  // Morphing arrow animation
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const path = svg.querySelector('#path') as SVGPathElement;
    if (!path) return;

    const pathLength = path.getTotalLength();
    const startingPoint = path.getPointAtLength(0);
    const PATH_SEGMENTS = 600;

    let pathPoints: Array<{ type: string; x: number; y: number }> = [
      { type: 'M', x: startingPoint.x, y: startingPoint.y }
    ];

    for (
      let i = pathLength / PATH_SEGMENTS;
      i <= pathLength;
      i += pathLength / PATH_SEGMENTS
    ) {
      const p = path.getPointAtLength(i);
      pathPoints.push({ type: 'L', x: p.x, y: p.y });
    }

    function createNewPathElement(
      pointsArray: Array<{ type: string; x: number; y: number }>,
      percentageComplete: number
    ) {
      const pointsToInclude = Math.ceil(pointsArray.length * percentageComplete);
      let pathString = '';

      for (let i = 0; i < pointsToInclude; i++) {
        pathString += `${pointsArray[i].type}${pointsArray[i].x} ${pointsArray[i].y}`;
      }

      const pathElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      pathElement.setAttribute('d', pathString);
      pathElement.setAttribute('id', 'temporarySVGArrowPath');
      pathElement.setAttribute('stroke', '#FFFFFF');
      pathElement.setAttribute('fill', 'none');
      pathElement.setAttribute('stroke-width', '3');
      pathElement.setAttribute('stroke-linecap', 'round');
      pathElement.setAttribute('stroke-linejoin', 'round');

      return pathElement;
    }

    function easeOut(x: number) {
      return x < 0.95 ? Math.sin(((x * 1) / 0.95) * (Math.PI / 2)) : 1.0;
    }

    const duration = 4000;
    let start: number | undefined;
    let previousTimeStamp: number | undefined;
    let isReverse = false;

    function step(timestamp: number) {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;

      if (previousTimeStamp !== timestamp) {
        let rawPercentage = Math.min((1 / duration) * elapsed, 1.0);
        const percentage = isReverse ? 1 - easeOut(rawPercentage) : easeOut(rawPercentage);

        const animatedPathElement = createNewPathElement(pathPoints, percentage);

        const oldpath = document.getElementById('temporarySVGArrowPath');
        if (oldpath !== null) oldpath.parentNode?.removeChild(oldpath);

        svg.appendChild(animatedPathElement);
      }

      previousTimeStamp = timestamp;

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Toggle direction and restart animation
        isReverse = !isReverse;
        start = undefined;
        previousTimeStamp = undefined;
        window.requestAnimationFrame(step);
      }
    }

    const animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
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

      // Birds scroll at same rate as background for parallax
      if (birdsRef.current) {
        birdsRef.current.style.transform = `translateY(${scrolled * -0.03}px)`;
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
        const opacity = Math.max(0, 1 - scrolled / fadeStart);
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

      {/* Birds layer - between background and foreground */}
      <Birds ref={birdsRef} />

      {/* Foreground layer - scrolls faster */}
      <div
        ref={foregroundRef}
        className="fixed left-0 right-0 w-full"
        style={{
          top: 0,
          height: '120vh',
          willChange: 'transform',
          zIndex: 2
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

      {/* Morphing Arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-24 right-8 z-40 flex flex-col items-center gap-3"
        style={{
          transition: 'opacity 0.3s ease-out',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
        }}
      >
        <div
          className="font-black text-2xl bouncing-text"
          style={{
            writingMode: 'vertical-rl',
            color: '#FFFFFF'
          }}
        >
          <span className="hidden lg:inline">SCROLL FOR MORE</span>
          <span className="lg:hidden">SWIPE FOR MORE</span>
        </div>
        <svg
          ref={svgRef}
          className="arrow animated-arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 70 85"
          fill="none"
          style={{ width: '80px', height: '80px', transform: 'scaleX(-1)' }}
        >
          <path
            stroke="none"
            strokeWidth="3"
            fill="none"
            id="path"
            d="M6.6 1.8C.2 37 2.8 55.8 37.4 47 72.4 39.4 53.8 5.4 33.2 22 11 41.6 17.4 69.8 29.4 83.4M29.4 83.4 32.6 74.2M29.4 83.4 19.8 79.8"
          ></path>
        </svg>
      </div>
    </div>
  );
}