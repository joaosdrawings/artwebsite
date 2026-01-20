'use client';

import { useEffect, useRef } from 'react';

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.05 - 100;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle scroll for opacity
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 1.05 - 100;
      const fadeStart = heroHeight * 0.25;
      const fadeEnd = heroHeight * 0.8;
      const scrolled = window.pageYOffset;
      
      const progress = Math.min(1, Math.max(0, (scrolled - fadeStart) / (fadeEnd - fadeStart)));
      opacityRef.current = 1 - progress;
      
      canvas.style.opacity = opacityRef.current.toString();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }> = [];

    const createParticles = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.125,
          vy: (Math.random() - 0.5) * 0.125,
          life: Math.random() * 100 + 50,
          maxLife: Math.random() * 100 + 50,
          size: Math.random() * 2 + 0.5
        });
      }
    };

    const animate = () => {
      // Don't clear canvas - let particles accumulate
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Opacity based on life
        const opacity = (p.life / p.maxLife) * 0.6;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Create new particles occasionally
      if (Math.random() < 0.3) {
        createParticles();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'opacity 0.1s ease-out'
      }}
    />
  );
}
