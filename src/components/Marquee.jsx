import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Marquee() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Continuous horizontal scroll
    gsap.to('.marquee-track', {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });

    // Scroll-based velocity shift (moves faster when scrolling)
    gsap.to('.marquee-scroll-wrapper', {
      x: -300,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-20 bg-[#0B0B0F] overflow-hidden border-y border-white/5 relative z-10 flex items-center">
      <div className="marquee-scroll-wrapper">
        <div className="marquee-track flex whitespace-nowrap w-max theme-adaptive">
          {/* Duplicating content enough times to ensure seamless infinite looping */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <h2 className="text-5xl md:text-7xl font-bold text-outline uppercase tracking-wider">
                Absolute Velocity
              </h2>
              <span className="text-cyan-400 text-3xl">✦</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-wider">
                Pure Kinetic
              </h2>
              <span className="text-cyan-400 text-3xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}