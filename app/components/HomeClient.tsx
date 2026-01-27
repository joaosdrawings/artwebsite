'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

  const computeContentOpacity = () => {
    const heroHeight = window.innerHeight * 1.05 - 100;
    const fadeStartScroll = heroHeight * 0.6; // Start fading at 60%
    const fadeEndScroll = heroHeight * 0.95; // Complete at 95%
    const scrollProgress = Math.max(0, latestScroll.current - fadeStartScroll);
    const fadeRange = fadeEndScroll - fadeStartScroll;
    const opacity = Math.min(1, fadeRange > 0 ? scrollProgress / fadeRange : 1);
    if (contentRef.current) {
      contentRef.current.style.opacity = opacity.toString();
      contentRef.current.style.pointerEvents = opacity < 0.5 ? 'none' : 'auto';
    }
  };

  useEffect(() => {
    const updateContentOpacity = () => {
      scrollFrame.current = null;
      computeContentOpacity();
    };

    const handleScroll = () => {
      if (isModalOpen) {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.pointerEvents = 'auto';
        }
        return;
      }
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
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && contentRef.current) {
      contentRef.current.style.opacity = '1';
      contentRef.current.style.pointerEvents = 'auto';
      return;
    }
    computeContentOpacity();
  }, [isModalOpen]);

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
        <div className="relative z-10">
        {/* Gallery Section - replaces illustration section */}
        <section id="gallery" className="py-16" style={{scrollMarginTop: '120px'}}>
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
        <section id="past-conventions" className="py-16" style={{scrollMarginTop: '120px'}}>
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

        <footer id="contact" className="py-16 px-8" style={{backgroundColor: '#F0EAD6', scrollMarginTop: '120px'}}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* About Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-1 rounded-full" style={{backgroundColor: '#FF7E70'}}></div>
                  <h3 className="text-3xl font-bold" style={{color: '#2C2C2C'}}>About Mo</h3>
                </div>
                <p className="text-lg leading-relaxed" style={{color: '#4A4A4A'}}>
                  Mo is a <span className="font-semibold" style={{color: '#FF7E70'}}>US-based artist</span> specializing in highly detailed character work from anime, manga, and video game fandoms — as well as original characters.
                </p>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-1 rounded-full" style={{backgroundColor: '#FF7E70'}}></div>
                  <h3 className="text-3xl font-bold" style={{color: '#2C2C2C'}}>Contact</h3>
                </div>
                <div className="space-y-3">
                  <a 
                    href="mailto:JOAOSDRAWINGS@GMAIL.COM" 
                    className="text-xl font-semibold block transition-colors hover:opacity-80"
                    style={{color: '#FF7E70'}}
                  >
                    JOAOSDRAWINGS@GMAIL.COM
                  </a>
                  <p className="leading-relaxed" style={{color: '#4A4A4A'}}>
                    For business inquiries, commissions, and collaborations.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="border-t pt-8" style={{borderColor: '#E8DCC4'}}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                <div className="text-sm" style={{color: '#666'}}>
                  © 2026 <span className="font-semibold" style={{color: '#2C2C2C'}}>Moita Artwork</span>. All rights reserved.
                </div>
                <div className="flex space-x-3">
                  <a href="https://www.pixiv.net/en/users/81398708" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <Image src="/images/socials/pixiv.png" alt="Pixiv" width={40} height={40} className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://www.instagram.com/moitaartwork/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <Image src="/images/socials/ig.png" alt="Instagram" width={40} height={40} className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://x.com/moitaartwork" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <Image src="/images/socials/x.png" alt="X (Twitter)" width={40} height={40} className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://cara.app/notifications" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <Image src="/images/socials/cara.png" alt="Cara" width={40} height={40} className="w-10 h-10 rounded-lg" />
                  </a>
                  <a href="https://www.youtube.com/@MoitaArtwork" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                    <Image src="/images/socials/yt.png" alt="YouTube" width={40} height={40} className="w-10 h-10 rounded-lg" />
                  </a>
                </div>
              </div>
              <div className="text-xs text-center md:text-left" style={{color: '#999'}}>
                Characters & relevant concepts in fanwork pieces belong to their respective owners.
              </div>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
}
