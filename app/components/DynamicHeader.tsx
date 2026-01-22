'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <header className={`sticky top-0 z-[100] transition-all duration-300 flex justify-between items-center text-white p-4 ${
        isScrolled ? 'md:bg-[#FAF9F6] md:shadow-md' : 'md:p-8'
      }`} style={{color: isScrolled ? '#2C2C2C' : 'white'}}>
        {/* Logo Text */}
        <a href="/" className="flex items-center">
          <h1 
            className="font-bold transition-all duration-300"
            style={{
              fontSize: isScrolled ? '1.5rem' : '2rem',
              color: isScrolled ? '#2C2C2C' : 'white',
              textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '0.05em'
            }}
          >
            MOITA ARTWORK
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/" style={{color: isScrolled ? '#2C2C2C' : 'white', textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>Home</a>
          <a href="/gallery" style={{color: isScrolled ? '#2C2C2C' : 'white', textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>Gallery</a>
          <a href="/#events" style={{color: isScrolled ? '#2C2C2C' : 'white', textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>Convention Schedule</a>
          <a href="#" style={{color: '#FF7E70', textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'}}>SHOP</a>
          <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/USA_2x.png" alt="English" width={24} height={16} style={{filter: isScrolled ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'}} />
          <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/JPN_2x.png" alt="Japanese" width={24} height={16} style={{filter: isScrolled ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'}} />
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden z-[110] w-10 h-10 flex flex-col justify-center items-center relative ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={`absolute block w-7 h-0.5 transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: isScrolled ? '#2C2C2C' : 'white',
              transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-8px)',
              opacity: isMobileMenuOpen ? 1 : 1
            }}
          />
          <span 
            className={`absolute block w-7 h-0.5 transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: isScrolled ? '#2C2C2C' : 'white',
              opacity: isMobileMenuOpen ? 0 : 1
            }}
          />
          <span 
            className={`absolute block w-7 h-0.5 transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: isScrolled ? '#2C2C2C' : 'white',
              transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(8px)',
              opacity: isMobileMenuOpen ? 1 : 1
            }}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[90] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-80 transition-transform duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{backgroundColor: '#FAF9F6'}}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 p-8 pt-24 space-y-8">
              <a 
                href="/" 
                className="block text-2xl font-bold transition-colors hover:opacity-70"
                style={{color: '#2C2C2C'}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/gallery" 
                className="block text-2xl font-bold transition-colors hover:opacity-70"
                style={{color: '#2C2C2C'}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="/#events" 
                className="block text-2xl font-bold transition-colors hover:opacity-70"
                style={{color: '#2C2C2C'}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Convention Schedule
              </a>
              <a 
                href="#" 
                className="block text-2xl font-bold transition-colors hover:opacity-70"
                style={{color: '#FF7E70'}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SHOP
              </a>
            </div>
            
            <div className="p-8 border-t" style={{borderColor: '#E8DCC4'}}>
              <p className="text-sm mb-4" style={{color: '#666'}}>Language</p>
              <div className="flex space-x-4">
                <button className="transition-transform hover:scale-110">
                  <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/USA_2x.png" alt="English" width={40} height={27} />
                </button>
                <button className="transition-transform hover:scale-110">
                  <Image src="https://static.parastorage.com/services/linguist-flags/1.969.0/assets/flags/corner/JPN_2x.png" alt="Japanese" width={40} height={27} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}