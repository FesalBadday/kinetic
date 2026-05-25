import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroReveal from './components/HeroReveal';
import TechSpecs from './components/TechSpecs';
import MacroShots from './components/MacroShots';
import ImageGallery from './components/ImageGallery';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [hue, setHue] = useState(0);
  const [shoeImg, setShoeImg] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-hue', `${hue}deg`);
  }, [hue]);

  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger on mount to calculate heights perfectly
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroReveal />
        <TechSpecs />
        <MacroShots />
        <ImageGallery />
        <Marquee />
        <Testimonials />
        <CallToAction />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}