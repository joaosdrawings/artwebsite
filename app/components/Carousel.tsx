'use client';
import { useEffect, useRef } from 'react';

interface CarouselProps {
  items: string[]; // Array of image URLs
  speed?: number;
}

export default function Carousel({ items, speed = 3000 }: CarouselProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!content || !prevBtn || !nextBtn) return;

    const carouselLength = items.length;
    const width = content.clientWidth / carouselLength; // Assuming full width per item
    let count = width;
    const counterIncrement = width;
    let int: NodeJS.Timeout;

    // Initial transform
    content.style.transform = `translateX(-${width}px)`;

    function timer() {
      if (count >= counterIncrement * (carouselLength - 1)) {
        count = 0;
        content.style.transform = `translateX(-${count}px)`;
      }
      count += counterIncrement;
      content.style.transform = `translateX(-${count}px)`;
    }

    int = setInterval(timer, speed);

    // Click events
    prevBtn.addEventListener('click', () => {
      count -= width;
      content.style.transform = `translateX(-${count}px)`;
      if (count < 0) {
        count = counterIncrement * (carouselLength - 2);
        content.style.transform = `translateX(-${count}px)`;
      }
    });

    nextBtn.addEventListener('click', () => {
      count += width;
      content.style.transform = `translateX(-${count}px)`;
      if (count >= counterIncrement * carouselLength) {
        count = counterIncrement;
        content.style.transform = `translateX(-${count}px)`;
      }
    });

    // Hover effects
    prevBtn.addEventListener('mouseenter', () => {
      content.style.transform = `translateX(-${count - 50}px)`;
      clearInterval(int);
    });
    prevBtn.addEventListener('mouseleave', () => {
      content.style.transform = `translateX(-${count}px)`;
      int = setInterval(timer, speed);
    });

    nextBtn.addEventListener('mouseenter', () => {
      content.style.transform = `translateX(-${count + 50}px)`;
      clearInterval(int);
    });
    nextBtn.addEventListener('mouseleave', () => {
      content.style.transform = `translateX(-${count}px)`;
      int = setInterval(timer, speed);
    });

    return () => {
      clearInterval(int);
      // Remove event listeners if needed, but since component unmounts, ok
    };
  }, [items, speed]);

  return (
    <div className="carousel">
      <span ref={prevBtnRef} className="carousel-control-left"></span>
      <div className="carousel-content" ref={contentRef}>
        {items.map((item, index) => (
          <img key={index} src={item} alt={`Slide ${index + 1}`} />
        ))}
      </div>
      <span ref={nextBtnRef} className="carousel-control-right"></span>
    </div>
  );
}