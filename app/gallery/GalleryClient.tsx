'use client';

import { useState } from 'react';
import Gallery from '../components/Gallery';
import DynamicHeader from '../components/DynamicHeader';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLandscape?: boolean;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {!isModalOpen && <DynamicHeader />}
      
      <main className="pt-24">
        <div className="text-center mb-12 px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4" 
            style={{ color: 'var(--salmon)', textTransform: 'uppercase' }}
          >
            Gallery
          </h1>
          <p className="text-lg md:text-xl" style={{ color: '#666' }}>
            Explore my collection of artwork
          </p>
        </div>
        
        <Gallery images={images} onModalChange={setIsModalOpen} />
      </main>
    </div>
  );
}
