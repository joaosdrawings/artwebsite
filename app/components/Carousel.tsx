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
    const contentEl = contentRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!contentEl || !prevBtn || !nextBtn) return;

    const el = contentEl; // Non-null after guard

    const carouselLength = items.length;
    if (carouselLength === 0) return;

    const width = el.clientWidth / carouselLength; // Assuming full width per item
    let count = width;
    const counterIncrement = width;
    let int: NodeJS.Timeout;

    // Initial transform
    el.style.transform = `translateX(-${width}px)`;

    function timer() {
      if (count >= counterIncrement * (carouselLength - 1)) {
        count = 0;
        el.style.transform = `translateX(-${count}px)`;
      }
      count += counterIncrement;
      el.style.transform = `translateX(-${count}px)`;
    }

    int = setInterval(timer, speed);

    // Click events
    const handlePrevClick = () => {
      count -= width;
      el.style.transform = `translateX(-${count}px)`;
      if (count < 0) {
        count = counterIncrement * (carouselLength - 2);
        el.style.transform = `translateX(-${count}px)`;
      }
    };

    const handleNextClick = () => {
      count += width;
      el.style.transform = `translateX(-${count}px)`;
      if (count >= counterIncrement * carouselLength) {
        count = counterIncrement;
        el.style.transform = `translateX(-${count}px)`;
      }
    };

    // Hover effects
    const handlePrevEnter = () => {
      el.style.transform = `translateX(-${count - 50}px)`;
      clearInterval(int);
    };

    const handlePrevLeave = () => {
      el.style.transform = `translateX(-${count}px)`;
      int = setInterval(timer, speed);
    };

    const handleNextEnter = () => {
      el.style.transform = `translateX(-${count + 50}px)`;
      clearInterval(int);
    };

    const handleNextLeave = () => {
      el.style.transform = `translateX(-${count}px)`;
      int = setInterval(timer, speed);
    };

    prevBtn.addEventListener('click', handlePrevClick);
    prevBtn.addEventListener('mouseenter', handlePrevEnter);
    prevBtn.addEventListener('mouseleave', handlePrevLeave);

    nextBtn.addEventListener('click', handleNextClick);
    nextBtn.addEventListener('mouseenter', handleNextEnter);
    nextBtn.addEventListener('mouseleave', handleNextLeave);

    return () => {
      clearInterval(int);
      prevBtn.removeEventListener('click', handlePrevClick);
      prevBtn.removeEventListener('mouseenter', handlePrevEnter);
      prevBtn.removeEventListener('mouseleave', handlePrevLeave);
      nextBtn.removeEventListener('click', handleNextClick);
      nextBtn.removeEventListener('mouseenter', handleNextEnter);
      nextBtn.removeEventListener('mouseleave', handleNextLeave);
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