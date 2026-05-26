import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const specs = [
  { title: "Zero-G Midsole", desc: "Proprietary foam structure offering 85% energy return." },
  { title: "Carbon-Weave Upper", desc: "Adaptive fit with micro-ventilated obsidian threads." },
  { title: "Kinetic Outsole", desc: "Traction mapped to human biomechanical pressure points." }
];

export default function TechSpecs() {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // Smooth parallax for the ambient background
    gsap.to(bgRef.current, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.fromTo(
      gridRef.current.children,
      { y: 60, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.15,
        ease: "power4.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(target, { rotateX, rotateY, transformPerspective: 1000, ease: "power2.out", duration: 0.4 });
  };

  const handleMouseLeave = (target) => {
    gsap.to(target, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 bg-[#0B0B0F] overflow-hidden">
      {/* Ambient background image for Tech Specs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src={`${import.meta.env.BASE_URL}imgs/2.png`} 
          alt="Technology Background" 
          className="absolute -top-[10%] w-full h-[120%] object-cover opacity-10"
        />
        {/* Gradient overlays to smoothly blend the image edges into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-4xl md:text-6xl font-medium mb-16 text-white/90 theme-adaptive">
          Engineered for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Absolute Velocity.
          </span>
        </h3>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 theme-adaptive">
          {specs.map((spec, i) => (
            <div 
              key={i} 
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-default"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">{spec.title}</h4>
              <p className="text-white/50 text-sm">{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}