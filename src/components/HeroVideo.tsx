"use client";

import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Browser autoplay requirement fallback
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch((e) => console.log("Autoplay error:", e));
        }
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[500px] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* 100% Pure Motion Video with Zero Shading or Overlays */}
      <video
        ref={videoRef}
        src="/motion.mp4"
        poster="/poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center"
      />

      {/* Floating Scroll Indicator (Bottom Center Only) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <a
          href="#about"
          className="group flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105"
          aria-label="Scroll down to explore conference"
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md text-white/90 px-3.5 py-1 rounded-full border border-white/20 shadow-lg group-hover:border-[#00e575] group-hover:text-[#00e575] transition-all">
            Scroll to Explore
          </span>
          <ChevronDown className="w-5 h-5 text-[#00e575] animate-bounce mt-0.5" />
        </a>
      </div>
    </section>
  );
}
