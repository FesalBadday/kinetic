import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const wrapper = wrapperRef.current;
    
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });
    gsap.set(wrapper, { opacity: 0 }); // Hidden until mouse moves
    
    let hasMoved = false;
    
    const xToCursor = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    const yToCursor = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
    
    const xToFollower = gsap.quickTo(follower, "x", {duration: 0.6, ease: "power3"});
    const yToFollower = gsap.quickTo(follower, "y", {duration: 0.6, ease: "power3"});

    const handleMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.3 });
      }
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    // Expanding hover effect for links & buttons
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, .gallery-item')) {
        const isGallery = e.target.closest('.gallery-item');
        gsap.to(follower, { scale: isGallery ? 2.5 : 1.5, backgroundColor: isGallery ? 'rgba(6, 182, 212, 0.9)' : 'rgba(6, 182, 212, 0.1)', borderColor: 'transparent', duration: 0.3 });
        if (isGallery) gsap.to(textRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, .gallery-item')) {
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(6, 182, 212, 0.5)', duration: 0.3 });
        gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-[9999] theme-adaptive">
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none shadow-[0_0_10px_#22d3ee]" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/50 rounded-full pointer-events-none flex items-center justify-center overflow-hidden">
        <span ref={textRef} className="text-[10px] font-bold text-[#0B0B0F] opacity-0 tracking-widest pointer-events-none">VIEW</span>
      </div>
    </div>
  );
}