'use client';

import { useState, useMemo } from 'react';
import CarouselSection from './components/CarouselSection';
import ParallaxContent from './components/ParallaxContent';
import DynamicHeader from './components/DynamicHeader';
import InstagramFeed from './components/InstagramFeed';
import EventsSchedule from './components/EventsSchedule';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const illustrationImages = useMemo(() => [
    '/images/Maka.JPG',
    '/images/Lum.JPG',
    '/images/Mitsuri.JPG',
    '/images/Scherezard.JPG',
    '/images/Yoko.JPG',
    '/images/Yor.jpg',
    '/images/Yoruichi.jpg',
    '/images/yumia.JPG',
    '/images/ryza.jpg'
  ], []);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FAF9F6', color: '#2C2C2C'}}>
      {/* Header - only show when modal is not open */}
      {!isModalOpen && <DynamicHeader />}

      {/* Hero */}
      <ParallaxContent />

      {/* Main Content Container */}
      <div className="relative z-10" style={{backgroundColor: '#FAF9F6'}}>
        <CarouselSection title="ILLUSTRATION" images={illustrationImages} onModalChange={setIsModalOpen} />
        
        <InstagramFeed />

        <EventsSchedule />

        <section className="py-16 px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Rosuuri</h2>
          <p className="text-lg mb-4">
            An illustrator who draws for game and publishing companies. She designs characters and illustrates for light novels, games, and art books.
          </p>
          <p className="text-lg mb-8">
            A VTuber who streams art and more every Saturday on Twitch.
          </p>
          <div className="flex space-x-4 mb-8">
            <a href="#" className="text-blue-500">Twitter</a>
            <a href="#" className="text-pink-500">Instagram</a>
            <a href="#" className="text-purple-500">Twitch</a>
            <a href="#" className="text-green-500">Patreon</a>
          </div>
          <a href="#" style={{color: '#E64A4A'}}>・・ ALL LINKS</a>
        </section>

        <section className="py-16 px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Notable Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 rounded-lg" style={{backgroundColor: '#F0EAD6'}}></div>
            <div className="h-64 rounded-lg" style={{backgroundColor: '#F0EAD6'}}></div>
            <div className="h-64 rounded-lg" style={{backgroundColor: '#F0EAD6'}}></div>
          </div>
          <div className="text-center mt-8">
            <a href="#" style={{color: '#FF7E70'}}>・・ VIEW WORK HISTORY</a>
          </div>
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
