import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const progressRef = useRef(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2, // Small lag for a liquid catching-up effect
      }
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true);  // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Cinematic Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[#0B0B0F]/60 backdrop-blur-lg border-b border-white/5 pointer-events-none" />
      
      <div className="relative flex items-center justify-between max-w-7xl mx-auto theme-adaptive">
        <button className="text-white/70 hover:text-cyan-400 transition-colors">
          <Menu size={20} />
        </button>
        
        <h1 className="text-xl font-medium tracking-widest text-white uppercase">
          Aura
        </h1>
        
        <button className="text-white/70 hover:text-cyan-400 transition-colors">
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Global Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 theme-adaptive">
        <div ref={progressRef} className="h-full bg-cyan-400 origin-left scale-x-0 shadow-[0_0_10px_#22d3ee]" />
      </div>
    </nav>
    </>
  );
}