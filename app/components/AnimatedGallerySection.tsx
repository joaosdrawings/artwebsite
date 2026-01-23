'use client';

import Gallery from './Gallery';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLandscape?: boolean;
}

interface AnimatedGallerySectionProps {
  images: GalleryImage[];
  onModalChange?: (isOpen: boolean) => void;
}

export default function AnimatedGallerySection({ images, onModalChange }: AnimatedGallerySectionProps) {
  return (
    <section id="gallery" className="relative py-16 overflow-hidden animated-gallery-bg">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Content on top */}
      <div className="relative z-10">
        <div className="text-center mb-8 px-4">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4" 
            style={{ color: '#FF7E70', textTransform: 'uppercase' }}
          >
            Gallery
          </h2>
          <p className="text-lg md:text-xl" style={{ color: '#666' }}>
            Explore my collection of artwork
          </p>
        </div>
        <Gallery images={images} onModalChange={onModalChange} />
      </div>

      <style jsx>{`
        .animated-gallery-bg {
          background: linear-gradient(
            -45deg,
            #f3e7d7,
            #f8d7e6,
            #e6d7f3,
            #f3e7d7
          );
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
