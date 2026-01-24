'use client';

import { useState, useEffect, useRef } from 'react';
import DynamicHeader from './DynamicHeader';
import ParallaxContent from './ParallaxContent';
import Gallery from './Gallery';
import ConventionTableGallery from './ConventionTableGallery';
import EventsSchedule from './EventsSchedule';
import InstagramFeed from './InstagramFeed';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLandscape?: boolean;
}

interface HomeClientProps {
  galleryImages: GalleryImage[];
  conventionTableImages: GalleryImage[];
}

export default function HomeClient({ galleryImages, conventionTableImages }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const latestScroll = useRef(0);

  useEffect(() => {
    const updateContentOpacity = () => {
      scrollFrame.current = null;
      const heroHeight = window.innerHeight * 1.05 - 100;
      const fadeEndScroll = heroHeight * 0.8;
      const opacity = Math.min(1, latestScroll.current / fadeEndScroll);
      if (contentRef.current) {
        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.pointerEvents = opacity < 0.5 ? 'none' : 'auto';
      }
    };

    const handleScroll = () => {
      latestScroll.current = window.pageYOffset;
      if (scrollFrame.current === null) {
        scrollFrame.current = window.requestAnimationFrame(updateContentOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Kick off initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FAF9F6', color: '#2C2C2C'}}>
      {/* Header - only show when modal is not open */}
      {!isModalOpen && <DynamicHeader />}

      {/* Hero */}
      <ParallaxContent />

      {/* Main Content Container */}
      <div 
        ref={contentRef}
        className="relative"
        style={{
          backgroundColor: 'transparent',
          color: '#2C2C2C',
          opacity: 0,
          transition: 'opacity 0.1s ease-out',
          pointerEvents: 'none'
        }}
      >
        {/* Gallery Section - replaces illustration section */}
        <section id="gallery" className="py-16">
          <div className="text-center mb-8 px-4">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4" 
              style={{ color: '#FF7E70', textTransform: 'uppercase' }}
            >
              ILLUSTRATIONS
            </h2>
          </div>
          <Gallery images={galleryImages} onModalChange={setIsModalOpen} />
        </section>

        {/* Past Convention Tables Section */}
        <section id="past-conventions" className="py-16">
          <div className="text-center mb-8 px-4">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4" 
              style={{ color: '#FF7E70', textTransform: 'uppercase' }}
            >
              Past Convention Tables
            </h2>
            <p className="text-lg md:text-xl" style={{ color: '#666' }}>
              Convention tables and appearances
            </p>
          </div>
          <ConventionTableGallery images={conventionTableImages} onModalChange={setIsModalOpen} />
        </section>

        <EventsSchedule />

        <InstagramFeed />

        <footer id="contact" className="py-16 px-8" style={{backgroundColor: '#F0EAD6'}}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
              {/* About Section */}
              <div>
                <h3 className="text-3xl font-bold mb-6">About Mo</h3>
                <p className="text-lg mb-4">
                  Mo is a US based artist born in California. Mo specializes in highly detailed character work of characters from anime, manga, and video game fandoms as well as original characters.
                </p>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-3xl font-bold mb-6">Contact</h3>
                <p className="text-lg mb-4">
                  <a href="mailto:JOAOSDRAWINGS@GMAIL.COM" style={{color: '#FF7E70'}}>JOAOSDRAWINGS@GMAIL.COM</a>
                </p>
                <p className="mb-4">
                  For business inquiries, please reach out via email with details about your project.
                </p>
                <p>※English/日本語 = OK!</p>
              </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="border-t pt-8" style={{borderColor: '#E8DCC4'}}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                <div className="text-sm">ART & DESIGN © 2026 Moita Artwork. All rights reserved.</div>
                <div className="flex space-x-4">
                  <a href="https://www.pixiv.net/en/users/81398708" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <img src="/images/socials/pixiv.png" alt="Pixiv" className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://www.instagram.com/moitaartwork/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <img src="/images/socials/ig.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://x.com/moitaartwork" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <img src="/images/socials/x.png" alt="X (Twitter)" className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://cara.app/notifications" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <img src="/images/socials/cara.png" alt="Cara" className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://www.youtube.com/@MoitaArtwork" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <img src="/images/socials/yt.png" alt="YouTube" className="w-10 h-10 rounded-lg" />
                  </a>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center md:text-left">
                Characters & relevant concepts in fanwork pieces belong to their respective owners.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
