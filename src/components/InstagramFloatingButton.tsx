"use client";

import { useState } from "react";
import { CONFERENCE_INFO } from "@/data/conferenceData";

export default function InstagramFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Social media link"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#062419]/95 border border-[#00e575]/40 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 transform ${
          isHovered
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#00e575] animate-ping" />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#00e575]">Official Instagram</div>
          <div className="text-emerald-100 font-mono text-xs">{CONFERENCE_INFO.instagram.handle}</div>
        </div>
      </div>

      {/* Floating Instagram Button */}
      <a
        href={CONFERENCE_INFO.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Department of Sharee'a on Instagram"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#f97316] via-[#ec4899] to-[#8b5cf6] p-[2px] shadow-2xl shadow-[#ec4899]/30 hover:shadow-[#00e575]/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        {/* Glow Ping Ring */}
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#00e575] to-[#10b981] opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse-glow" />

        {/* Inner container */}
        <div className="relative flex items-center justify-center w-full h-full rounded-[14px] bg-[#02100b] group-hover:bg-[#031d14] transition-colors overflow-hidden">
          {/* Subtle Instagram Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f43f5e]/20 via-[#ec4899]/20 to-[#a855f7]/20 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Instagram SVG Icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#00e575] transition-colors relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      </a>
    </aside>
  );
}
