"use client";

import { useRef, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for browsers requiring user gesture/explicit muted
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
      className="relative w-full h-[100dvh] min-h-[520px] overflow-hidden bg-[#064e3b] flex items-center justify-center"
    >
      {/* 1. BIG SCREEN DEVICES (Laptop, Desktop, TV): VIDEO ONLY */}
      <div className="hidden md:block absolute inset-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          src="/motion.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. MOBILE SCREEN DEVICES: TEXT ONLY */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 w-full h-full bg-gradient-to-b from-[#064e3b] via-[#043d2e] to-[#022c22]">
        {/* Ambient Decorative Glows */}
        <div className="absolute top-1/4 -left-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-12 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Wafy Campus & Department Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Wafy Campus Kalikavu</span>
        </div>

        {/* Coming Soon.. */}
        <div className="mb-4">
          <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[#00e575] font-black text-sm uppercase tracking-widest animate-pulse shadow-lg shadow-emerald-950/40">
            Coming Soon..
          </span>
        </div>

        {/* International Fiqh Conference */}
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight max-w-sm mx-auto mt-2">
          International <br />
          <span className="text-[#00e575]">Fiqh Conference</span>
        </h1>

        {/* Season 2 */}
        <div className="mt-4">
          <span className="text-2xl sm:text-3xl font-black tracking-wider text-emerald-200 uppercase bg-emerald-950/60 px-6 py-2 rounded-2xl border border-emerald-600/40 inline-block shadow-inner">
            Season 2
          </span>
        </div>

        {/* Department subtitle */}
        <p className="mt-6 text-xs text-emerald-200/80 font-medium tracking-wide">
          Department of Sharee&apos;ah • كلية الشريعة الإسلامية
        </p>
      </div>

      {/* Floating Scroll Indicator (Visible on both viewports) */}
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
