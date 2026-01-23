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
              Gallery
            </h2>
            <p className="text-lg md:text-xl" style={{ color: '#666' }}>
              Explore my collection of artwork
            </p>
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

        <section className="py-16 px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Rosuuri</h2>
          <p className="text-lg mb-4">
            An illustrator who draws for game and publishing companies. She designs characters and illustrates for light novels, games, and art books.
          </p>
          <p className="text-lg mb-8">
            A VTuber who streams art and more every Saturday on Twitch.
          </p>
          <a href="#" style={{color: '#E64A4A'}}>・・ ALL LINKS</a>
        </section>

        <section className="py-16 px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <p className="text-lg mb-4">
            <a href="mailto:ART@ROSUURI.COM" style={{color: '#FF7E70'}}>ART@ROSUURI.COM</a>
          </p>
          <p className="mb-8">
            For business inquiries, I accept work for games, light novels, illustration books, exhibitions, album/EP art, music videos, official merch, promotional art and more.
          </p>
          <p className="mb-8">
            Please include the following in your email【Project Name, Materials, Schedule, and Budget】
          </p>
          <p className="mb-8">※English/日本語 = OK!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Art Books</h3>
              <div className="h-32 rounded-lg mb-4" style={{backgroundColor: '#F0EAD6'}}></div>
              <a href="#" style={{color: '#E64A4A'}}>VIEW BOOKS</a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Events</h3>
              <div className="h-32 rounded-lg mb-4" style={{backgroundColor: '#F0EAD6'}}></div>
              <a href="#" style={{color: '#E64A4A'}}>VIEW EVENTS</a>
            </div>
          </div>
        </section>

        <footer className="py-16 px-8" style={{backgroundColor: '#F0EAD6'}}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Clients</h3>
                <div className="space-y-2">
                  <div className="h-16 rounded" style={{backgroundColor: '#E8DCC4'}}></div>
                  <div className="h-16 rounded" style={{backgroundColor: '#E8DCC4'}}></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">FIGURE</h3>
                <div className="h-32 rounded" style={{backgroundColor: '#E8DCC4'}}></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">ARTBOOK</h3>
                <div className="h-32 rounded" style={{backgroundColor: '#E8DCC4'}}></div>
              </div>
            </div>
            <div className="border-t pt-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm">ART & DESIGN © 2015 Rosuuri. All rights reserved.</div>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-500">X</a>
                  <a href="#" className="text-pink-500">Instagram</a>
                  <a href="#" className="text-purple-500">Twitch</a>
                  <a href="#" className="text-green-500">Patreon</a>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Characters & relevant concepts in fanwork pieces belong to their respective owners.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
