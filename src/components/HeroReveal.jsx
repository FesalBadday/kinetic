import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroReveal({ shoeImg = 6 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  // Frame Sequence Configuration
  const frameCount = 80; // Change this to your exact total number of frames
  const videoDetails = { frame: 0 };
  // Update `.png` to `.jpg` if your frames do not have a transparent background
  const currentFrame = (index) => `${import.meta.env.BASE_URL}frames/${(index + 1).toString().padStart(2, '0')}.png`;

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Dimensions of your extracted frames (adjust if your images are a different size)
    canvas.width = 1920;
    canvas.height = 1080;

    const images = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Draw the very first frame once it finishes loading
    images[0].onload = render;
    if (images[0].complete) render();

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const frameIndex = Math.round(videoDetails.frame);
      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        // Add a margin to prevent the shadow from being clipped at the canvas edges
        const margin = 100;
        const availableWidth = canvas.width - 2 * margin;
        const availableHeight = canvas.height - 2 * margin;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const availableAspect = availableWidth / availableHeight;

        let drawWidth, drawHeight;

        if (imgAspect > availableAspect) {
          drawWidth = availableWidth;
          drawHeight = drawWidth / imgAspect;
        } else {
          drawHeight = availableHeight;
          drawWidth = drawHeight * imgAspect;
        }

        // Center the image
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        context.drawImage(img, x, y, drawWidth, drawHeight);
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Determines how long the scroll pinning lasts
        scrub: 1,
        pin: true,
      }
    });

    // The camera moves forward: Text scales up and blurs out
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power2.inOut"
    }, 0);

    // The shoe emerges from deep behind the text into the foreground
    tl.fromTo(canvasRef.current, 
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      0
    );

    // Animate the frames sequence on scroll
    tl.to(videoDetails, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 2,
      onUpdate: render
    }, 0.5); // Starts rotating smoothly halfway through the scale-up

    // Continuous "breathing" floating animation
    gsap.to(canvasRef.current, {
      y: "-=15",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Cinematic entrance for typography (delayed to wait for Preloader)
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out", delay: 1.2 }
    );
    
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 1.5 }
    );

    // Ambient breathing effect for the title
    gsap.to('.hero-title', {
      scale: 1.03,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.7
    });

    // Attention-grabbing pulse for the scroll prompt
    gsap.to('.hero-subtitle', {
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.7
    });

    // Mouse interaction for Hero Title
    const handleTitleMouseMove = (e) => {
      // We want the effect to be based on the center of the screen
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      const rotateX = yPercent * -8; // Max rotation of 8 degrees
      const rotateY = xPercent * 8;
      const moveX = xPercent * 30; // Max move of 30px
      const moveY = yPercent * 30;

      gsap.to(textRef.current, {
        rotateX,
        rotateY,
        x: moveX,
        y: moveY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.8,
      });
    };

    const handleTitleMouseLeave = () => {
      gsap.to(textRef.current, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
    };

    const section = containerRef.current;
    section.addEventListener('mousemove', handleTitleMouseMove);
    section.addEventListener('mouseleave', handleTitleMouseLeave);

    // Cleanup function to remove event listeners
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleTitleMouseMove);
        section.removeEventListener('mouseleave', handleTitleMouseLeave);
      }
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center bg-[#0B0B0F]"
    >
      {/* Editorial Typography */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
      >
        <h2 className="hero-title text-[12vw] font-bold text-white/20 tracking-tighter mix-blend-screen opacity-0">
          KINETIC
        </h2>
        <p className="hero-subtitle mt-4 text-sm uppercase tracking-[0.3em] text-white/60 opacity-0">
          Scroll to Ignite
        </p>
      </div>

      {/* The Shoe Silhouette & Reveal Target */}
      <div className="relative w-[80%] max-w-4xl z-20 theme-adaptive">
        {/* Frame Sequence Canvas */}
        <canvas 
          ref={canvasRef}
          className="w-full h-auto object-contain aspect-video opacity-0"
          style={{ filter: "drop-shadow(0px 0px 60px rgba(6, 182, 212, 0.5))" }}
        />
      </div>
    </section>
  );
}