'use client';

import Image from 'next/image';
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [inView, setInView] = useState<boolean[]>(new Array(images.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const preloadedRef = useRef(new Set<number>());
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Preload images in background after page load
  useEffect(() => {
    // Wait for page to be idle, then preload images
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          images.forEach((image, index) => {
            if (!preloadedRef.current.has(index)) {
              const img = new window.Image();
              img.src = image.src;
              preloadedRef.current.add(index);
            }
          });
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          images.forEach((image, index) => {
            if (!preloadedRef.current.has(index)) {
              const img = new window.Image();
              img.src = image.src;
              preloadedRef.current.add(index);
            }
          });
        }, 2000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [images]);

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
    // Lightbox opens with preloaded images; no loading state needed
    onModalChange?.(true);
  };

  const closeLightbox = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
    onModalChange?.(false);
  }, [onModalChange]);

  const goToPrevious = useCallback(() => {
    if (selectedImage === null) return;
    const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1;
    setSelectedImage(newIndex);
    // Don't reset loading state - image is already preloaded
  }, [selectedImage, images.length]);

  const goToNext = useCallback(() => {
    if (selectedImage === null) return;
    const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(newIndex);
    // Don't reset loading state - image is already preloaded
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!showModal) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

  // Tilted page scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset;
      const wh = window.innerHeight;

      sectionRefs.current.forEach((section) => {
        if (!section) return;

        const wrapper = section.querySelector('.tps-wrapper') as HTMLElement;
        const containers = section.querySelectorAll('.page_container');
        if (!wrapper || containers.length === 0) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Calculate transforms based on scroll position
        let deg = ((sectionTop - sectionHeight) - st) / wh * 60; // angle multiplier
        let scale = ((st + wh - (sectionTop - sectionHeight)) / wh);
        let opacity = 1;
        let containerOpacity = 1;

        if (scale > 1) scale = 1;
        if (deg < 0) deg = 0;

        // When section is above viewport (scrolled past)
        if (st > sectionTop) {
          opacity = ((sectionTop + (wh * 1.2) - st)) / wh;
          containerOpacity = opacity;
          opacity = Math.pow(opacity, 25);
          containerOpacity = Math.pow(containerOpacity, 25);
          deg = (sectionTop - st) / wh * 60;
          scale = ((st + wh - sectionTop) / wh);
        } else {
          // Section is coming into view from below
          opacity = ((st + wh - sectionTop + (sectionHeight / 2)) / wh);
          containerOpacity = opacity / 2;
          containerOpacity = containerOpacity < 0.4 ? containerOpacity / 2 : containerOpacity;
          if (opacity > 1) {
            opacity = 1;
            containerOpacity = 1;
          }
        }

        if (scale > 1) scale = 1;
        if (scale < 0.8) scale = 0.8;

        // Apply transforms to wrapper
        wrapper.style.transform = `rotateX(${deg}deg) scale(${scale})`;
        wrapper.style.opacity = opacity.toString();
        
        // Apply opacity to all containers in this section
        containers.forEach((container) => {
          (container as HTMLElement).style.opacity = containerOpacity.toString();
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  return (
    <>
      {/* Pixelate filter removed */}
      <div className="gallery-main">
        {(() => {
          const sections = [];
          let sectionIndex = 0;
          let i = 0;
          
          // Clear refs before rebuilding
          sectionRefs.current = [];
          
          while (i < images.length) {
            const img = images[i];
            const isWide = img.width > img.height;
            const currentSectionIndex = sectionIndex;
            
            if (isWide) {
              // Wide image: takes full width section
              sections.push(
                <section className="tps-section" key={`section-${currentSectionIndex}`} ref={(el) => { sectionRefs.current[currentSectionIndex] = el; }}>
                  <div className="tps-wrapper">
                    <div className="page_container" onClick={() => openLightbox(i)}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="gallery-img wide-img"
                        onLoad={() => handleImageLoad(i)}
                      />
                      <div className="img-caption">
                        {img.src.split('/').pop()?.replace(/\.jpg$/i, '')}
                      </div>
                    </div>
                  </div>
                </section>
              );
              i++;
            } else {
              // Tall images: group in pairs of 2
              const pair = [];
              pair.push(i);
              if (i + 1 < images.length && images[i + 1].width <= images[i + 1].height) {
                pair.push(i + 1);
              }
              
              sections.push(
                <section className="tps-section" key={`section-${currentSectionIndex}`} ref={(el) => { sectionRefs.current[currentSectionIndex] = el; }}>
                  <div className="tps-wrapper tps-wrapper-pair">
                    {pair.map((imgIdx) => (
                      <div className="page_container page_container-tall" key={imgIdx} onClick={() => openLightbox(imgIdx)}>
                        <Image
                          src={images[imgIdx].src}
                          alt={images[imgIdx].alt}
                          width={images[imgIdx].width}
                          height={images[imgIdx].height}
                          className="gallery-img tall-img"
                          onLoad={() => handleImageLoad(imgIdx)}
                        />
                        <div className="img-caption">
                          {images[imgIdx].src.split('/').pop()?.replace(/\.jpg$/i, '')}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
              i += pair.length;
            }
            sectionIndex++;
          }
          return sections;
        })()}
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
          <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <Image
              src={images[selectedImage].src}
              alt="Blurred background"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'blur(15px) brightness(0.4)',
                transform: 'scale(1.5)'
              }}
            />
          </div>
          
          {/* Semi-transparent overlay */}
          <div 
            className="absolute inset-0"
            style={{ zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={closeLightbox}
          ></div>
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width}
              height={images[selectedImage].height}
              className={`w-full h-full object-contain`}
              style={{
                filter: 'blur(0px)',
                transition: 'none'
              }}
              priority
              
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
        .gallery-main {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .tps-section {
          width: 100%;
          height: 60vh;
          perspective: 1000px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          margin-bottom: 20px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tps-wrapper {
          width: 100%;
          max-width: 100%;
          border-radius: 8px;
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        .tps-wrapper-pair {
          display: flex;
          gap: 2rem;
          justify-content: center;
          align-items: flex-start;
        }

        .page_container {
          position: relative;
          cursor: pointer;
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: box-shadow 300ms ease;
          will-change: opacity;
        }

        .page_container:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .page_container-tall {
          flex: 1;
          max-width: 500px;
        }

        .gallery-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .wide-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        .tall-img {
          object-fit: cover;
        }

        .img-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          color: white;
          padding: 1rem;
          text-align: center;
          font-size: 14px;
          transform: translateY(100%);
          transition: transform 300ms ease;
        }

        .page_container:hover .img-caption {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .tps-section {
            height: 50vh;
            margin-bottom: 10px;
          }

          .tps-wrapper-pair {
            flex-direction: column;
            gap: 1rem;
          }

          .page_container-tall {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
