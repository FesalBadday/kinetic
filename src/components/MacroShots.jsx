import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MacroShots() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    // Parallax background image
    gsap.to(imgRef.current, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cinematic text character reveal
    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true
        }
      }
    );
  }, { scope: sectionRef });

  // Helper to wrap characters for independent animation
  const splitText = (text) => {
    const words = text.split(' ');
    return words.map((word, wIdx) => {
      const isHighlight = word.includes("anticipates");
      return (
        <span key={wIdx} className="inline-block mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className={`char ${isHighlight ? 'text-cyan-400' : 'text-white'}`}>
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="relative h-[120vh] w-full bg-zinc-900 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* High-res close up of the shoe fabric/textures from imgs folder */}
        <img 
          ref={imgRef}
          src="/imgs/3.png" 
          alt="Macro detail" 
          className="absolute -top-[10%] left-0 w-full h-[120%] object-cover opacity-60 mix-blend-luminosity"
        />
        {/* Gradient overlay to blend with the #0B0B0F background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      </div>

      <div 
        className="absolute inset-0 flex items-center justify-center z-10 px-6"
      >
        <h2 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl text-center leading-[1.1] tracking-tight theme-adaptive"
        >
          {splitText("The Aura Kinetic doesn't just respond to your movement. It anticipates it.")}
        </h2>
      </div>
    </section>
  );
}