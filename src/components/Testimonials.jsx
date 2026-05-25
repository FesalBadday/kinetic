import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const reviews = [
  { 
    quote: "The most responsive footwear I've ever tested. It feels like an extension of my body.", 
    author: "Marcus T., Pro Athlete" 
  },
  { 
    quote: "A masterclass in industrial design. The carbon-weave upper is revolutionary.", 
    author: "Design Weekly" 
  },
  { 
    quote: "Finally, a shoe that anticipates movement rather than just reacting to it.", 
    author: "Tech & Form Magazine" 
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.testimonial-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
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

    gsap.to(target, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (target) => {
    gsap.to(target, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  };

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 bg-[#0B0B0F] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="testimonial-card flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-8">
                "{review.quote}"
              </p>
              <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest theme-adaptive">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}