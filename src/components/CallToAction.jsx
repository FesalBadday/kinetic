import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const productColors = [
  { name: 'Cyan Core', hex: '#22d3ee', img: 'cyan' },
  { name: 'Amethyst', hex: '#a855f7', img: 'amethyst' },
  { name: 'Crimson Drop', hex: '#ef4444', img: 'crimson' },
  { name: 'Volt Green', hex: '#4ade80', img: 'volt' }
];

export default function CallToAction() {
  const btnRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(productColors[0]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3; // Magnetic pull strength
    const y = (e.clientY - top - height / 2) * 0.3;

    gsap.to(btnRef.current, { x, y, duration: 0.6, ease: "power3.out" });
    gsap.to(textRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.6, ease: "power3.out" }); // Parallax text
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
  };

  useGSAP(() => {
    gsap.fromTo('.reveal-item',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 bg-[#0B0B0F] flex flex-col items-center justify-center overflow-hidden z-10">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_50%)] pointer-events-none theme-adaptive" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Product Image Customizer */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-md bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden p-8">
            {/* Dynamic glow matching selected color */}
            <div 
              className="absolute inset-0 opacity-20 blur-3xl rounded-full scale-50 transition-colors duration-500"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <img 
              key={selectedColor.img}
              src={`${import.meta.env.BASE_URL}imgs/${selectedColor.img}.png`} 
              alt={`Aura Kinetic in ${selectedColor.name}`}
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-2xl animate-fade-in"
            />
          </div>

          {/* Swatch Selector */}
          <div className="flex flex-col items-center mt-8 gap-4">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Select Color: <span className="text-white">{selectedColor.name}</span></p>
            <div className="flex items-center gap-4">
              {productColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${selectedColor.name === color.name ? 'scale-110 border-white' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Text and CTA */}
        <div className="flex-1 text-center md:text-left theme-adaptive">
          <div className="overflow-hidden mb-6">
            <h2 className="reveal-item text-5xl md:text-7xl font-medium text-white tracking-tight">
              Step into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Future.</span>
            </h2>
          </div>
          <div className="overflow-hidden mb-12 max-w-xl mx-auto md:mx-0">
            <p className="reveal-item text-lg text-white/50">
              The Aura Kinetic is available in limited quantities. Secure your pair today and experience absolute velocity.
            </p>
          </div>
          
          <button 
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="reveal-item group relative px-8 py-4 bg-cyan-500 text-black font-semibold tracking-wide uppercase rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span ref={textRef} className="relative z-10 inline-block pointer-events-none">Pre-Order Now - $299</span>
          </button>
        </div>
      </div>
    </section>
  );
}