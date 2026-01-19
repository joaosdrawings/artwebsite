'use client';

import { useEffect } from 'react';

export default function ScrollbarController() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const body = document.body;

      // If scrolled more than 50px, make scrollbar thinner
      if (scrolled > 50) {
        body.classList.add('scrollbar-thin');
      } else {
        body.classList.remove('scrollbar-thin');
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // This component doesn't render anything
}