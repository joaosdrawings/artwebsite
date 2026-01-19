'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface CarouselSectionProps {
  title: string;
  images: string[]; // placeholder URLs or just count
  onModalChange?: (isOpen: boolean) => void;
}

export default function CarouselSection({ title, images, onModalChange }: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(new Set());

  const colors = [
    'bg-gray-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-red-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-teal-300',
    'bg-orange-300'
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 300;
      
      // Check if at the beginning
      if (container.scrollLeft <= 0) {
        // Jump to end
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 300;
      
      // Check if at or near the end
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Jump to beginning
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Check for already loaded images on mount
  useEffect(() => {
    const imgElements = scrollRef.current?.querySelectorAll('img');
    imgElements?.forEach((img, index) => {
      if (img.complete) {
        setLoadedThumbnails(prev => new Set(prev).add(index));
      }
    });
  }, [images]);

  const openModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setCurrentImageIndex(index);
    setShowModal(true);
    setImageLoaded(false);
    setIsInitialLoad(true);
    onModalChange?.(true);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
    onModalChange?.(false);
  }, [onModalChange]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex] || `/images/placeholder-${newIndex + 1}.jpg`);
    setIsInitialLoad(false);
    setImageLoaded(false);
  }, [currentImageIndex, images]);

  const goToNext = useCallback(() => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex] || `/images/placeholder-${newIndex + 1}.jpg`);
    setIsInitialLoad(false);
    setImageLoaded(false);
  }, [currentImageIndex, images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showModal) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Escape':
          event.preventDefault();
          closeModal();
          break;
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, goToPrevious, goToNext, closeModal]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ‹
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {images.map((imageSrc, index) => (
            <div
              key={index}
              className={`shrink-0 cursor-pointer ${imageSrc ? '' : colors[index % colors.length]}`}
              style={{ scrollSnapAlign: 'start', height: '450px', width: 'auto' }}
              onClick={() => openModal(imageSrc || `/images/placeholder-${index + 1}.jpg`, index)}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={`Illustration ${index + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  style={{
                    filter: loadedThumbnails.has(index) ? 'blur(0px)' : 'blur(20px)',
                    transition: 'filter 0.3s ease-out'
                  }}
                  onLoad={(e) => {
                    setLoadedThumbnails(prev => new Set(prev).add(index));
                    // Also check if already complete (cached)
                    if (e.currentTarget.complete) {
                      setLoadedThumbnails(prev => new Set(prev).add(index));
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ›
        </button>
      </div>
      <div className="text-center mt-8">
        <button className="text-white px-6 py-2 rounded-full transition-colors" style={{backgroundColor: '#FF7E70'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E64A4A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7E70'}>
          View Gallery
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Blurred background image */}
          <img
            src={selectedImage}
            alt="Blurred background"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'blur(15px) brightness(0.4)',
              transform: 'scale(1.5)',
              zIndex: 0
            }}
          />
          
          {/* Semi-transparent overlay */}
          <div 
            className="absolute inset-0"
            style={{ zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={closeModal}
          ></div>
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <img
              src={selectedImage}
              alt="Full size illustration"
              className={`w-full h-full object-contain ${
                isInitialLoad ? 'transition-all duration-500 ease-out' : ''
              } ${
                isInitialLoad && imageLoaded ? 'scale-100 opacity-100' : isInitialLoad ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{
                filter: imageLoaded ? 'blur(0px)' : 'blur(20px)',
                transition: 'filter 0.3s ease-out, opacity 0.35s ease'
              }}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Left Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75"
            >
              ‹
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75"
            >
              ›
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
            >
              ×
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}