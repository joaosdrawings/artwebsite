'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLandscape?: boolean;
}

interface GalleryProps {
  images: GalleryImage[];
  onModalChange?: (isOpen: boolean) => void;
}

export default function Gallery({ images, onModalChange }: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(images.length).fill(false));
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [inView, setInView] = useState<boolean[]>(new Array(images.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setShowModal(true);
    setImageLoaded(false);
    setIsInitialLoad(true);
    document.body.style.overflow = 'hidden';
    onModalChange?.(true);
  };

  const closeLightbox = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
    onModalChange?.(false);
  }, [onModalChange]);

  const goToPrevious = useCallback(() => {
    if (selectedImage === null) return;
    const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1;
    setSelectedImage(newIndex);
    setIsInitialLoad(false);
    setImageLoaded(false);
  }, [selectedImage, images.length]);

  const goToNext = useCallback(() => {
    if (selectedImage === null) return;
    const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(newIndex);
    setIsInitialLoad(false);
    setImageLoaded(false);
  }, [selectedImage, images.length]);

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
          closeLightbox();
          break;
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, goToPrevious, goToNext, closeLightbox]);

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

  // Reveal items on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setInView(prev => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [images.length]);

  return (
    <>
      <div className="masonry-gallery">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            data-index={index}
            className={`masonry-item ${loadedImages[index] ? 'loaded' : ''} ${inView[index] ? 'in-view' : ''} ${image.isLandscape ? 'landscape' : 'portrait'}`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              onLoad={() => handleImageLoad(index)}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {/* Modal - same as CarouselSection */}
      {showModal && selectedImage !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Blurred background image */}
          <img
            src={images[selectedImage].src}
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
            onClick={closeLightbox}
          ></div>
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
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
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
            >
              ×
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .masonry-gallery {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 40px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .masonry-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .masonry-gallery {
            /* Use 6 columns: 3 cols for tall images (2 cols each), 3 cols for wide pairs (3 cols each) */
            grid-template-columns: repeat(6, 1fr);
            /* Let height be determined by aspect ratio */
            grid-auto-rows: auto;
            grid-auto-flow: dense;
          }

          /* Portrait/tall images span 2 columns (equivalent to 1 of 3 original columns) */
          .masonry-item.portrait {
            grid-column: span 2;
          }

          /* Landscape/wide images span 3 columns (1/2 of a row when paired) */
          .masonry-item.landscape {
            grid-column: span 3;
          }
        }

        .masonry-item {
          cursor: pointer;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .masonry-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .masonry-item:hover {
          z-index: 10;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease-out;
        }

        .masonry-item:hover .gallery-image {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
