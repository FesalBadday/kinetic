import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Simulate loading progress
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power3.inOut"
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8")
    // Slide up and away
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050508]">
      <div className="overflow-hidden mb-8">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase translate-y-full opacity-0">
          Aura
        </h1>
      </div>
      
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden theme-adaptive">
        <div ref={progressRef} className="w-full h-full bg-cyan-400 origin-left scale-x-0 shadow-[0_0_10px_#22d3ee]" />
      </div>
    </div>
  );
}