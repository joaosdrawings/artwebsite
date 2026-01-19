'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const trigger = window.innerHeight * 0.75;
      setIsScrolled(scrolled > trigger);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 flex justify-between items-center text-white ${
      isScrolled ? 'p-4 shadow-md' : 'p-8'
    }`} style={{backgroundColor: isScrolled ? '#FAF9F6' : 'transparent', color: isScrolled ? '#2C2C2C' : 'white'}}>
      <div className={`font-bold transition-all duration-300 ${
        isScrolled ? 'text-xl' : 'text-2xl'
      }`} style={{textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>
        ILLUSTRATOR イラストレーター
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" style={{color: '#FF7E70', textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>SHOP</a>
        <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/USA_2x.png" alt="English" width={24} height={16} style={{filter: isScrolled ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'}} />
        <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/JPN_2x.png" alt="Japanese" width={24} height={16} style={{filter: isScrolled ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'}} />
      </div>
    </header>
  );
}