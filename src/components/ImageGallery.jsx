import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ImageGallery() {
  const galleryRef = useRef(null);
  const [activeImg, setActiveImg] = useState(null);

  useGSAP(() => {
    const images = gsap.utils.toArray('.gallery-item');
    
    // Staggered Entrance
    gsap.fromTo(images, 
      { y: 100, clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        stagger: 0.15,
        ease: "power4.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%",
        }
      }
    );

    // Asymmetric Parallax Scroll on images
    const innerImages = gsap.utils.toArray('.inner-img');
    innerImages.forEach((img, i) => {
      gsap.to(img, {
        yPercent: i === 1 ? 15 : -15, // Center column moves opposite to outer columns
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, { scope: galleryRef });

  return (
    <section ref={galleryRef} className="w-full py-32 px-6 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-medium mb-16 text-center text-white/90">
          Form Meets Function.
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mapping through images 4, 5, and 6 */}
          {[4, 5, 6].map((num, i) => (
            <div 
              key={num} 
              className={`gallery-item relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden group cursor-pointer ${i === 1 ? 'md:mt-16' : ''}`}
              onClick={() => setActiveImg(num)}
            >
              <div className="w-full h-[130%] absolute -top-[15%] left-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                <img 
                  src={`${import.meta.env.BASE_URL}imgs/${num}.png`} 
                  alt={`Gallery view ${num}`} 
                  className="inner-img w-full h-full object-cover"
                />
              </div>
              {/* Cyan overlay on hover */}
              <div className="absolute inset-0 bg-cyan-900/0 group-hover:bg-cyan-900/20 transition-colors duration-500 mix-blend-overlay theme-adaptive" />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {activeImg && (
        <div 
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-[#0B0B0F]/95 backdrop-blur-xl cursor-pointer"
          onClick={() => setActiveImg(null)}
        >
          <div className="relative w-[90%] max-w-6xl h-[90vh] flex items-center justify-center p-4">
            <img 
                src={`${import.meta.env.BASE_URL}imgs/${activeImg}.png`} 
              alt={`Expanded view ${activeImg}`} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_100px_rgba(6,182,212,0.15)]"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] uppercase pointer-events-none">Click anywhere to close</p>
          </div>
        </div>
      )}
    </section>
  );
}