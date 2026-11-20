"use client";

import { Sparkles, Clock, BellRing } from "lucide-react";
import { CONFERENCE_INFO } from "@/data/conferenceData";

export default function AboutIFC() {
  return (
    <section id="about" className="relative pt-24 pb-16 md:py-28 bg-[#f5f5f7] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Container */}
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] text-center mb-12">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>Wafy Campus kalikavu • Faculty of Islamic Jurisprudence</span>
            </div>

            <div className="font-arabic text-xl text-[#047857] font-medium tracking-wide">
              كلية الشريعة الإسلامية
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#1d1d1f] leading-none mb-6">
            <span className="block text-2xl sm:text-4xl font-extrabold text-slate-400 tracking-wider mb-2">
              INTERNATIONAL
            </span>
            <span className="text-[#047857]">FIQH CONFERENCE</span> <br />
            <span className="text-slate-900 text-3xl sm:text-5xl font-black tracking-normal inline-block mt-2">
              SEASON 2
            </span>
          </h2>

          {/* Promotion / Coming Soon Showcase */}
          <div className="max-w-2xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-white border-2 border-emerald-500/30 shadow-sm">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#047857] text-white text-xs sm:text-sm font-black uppercase tracking-widest shadow-md shadow-[#047857]/20 mb-3 animate-pulse">
              <Clock className="w-4 h-4" />
              <span>COMING SOON</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-2">
              Official Promotion Phase
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
              Season 2 of the International Fiqh Conference is currently in its promotional phase. Official dates, detailed themes, and guest announcements will be revealed soon.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#047857]">
              <BellRing className="w-4 h-4" />
              <span>Stay tuned for the grand announcement</span>
            </div>
          </div>
        </div>

        {/* Stats Grid: 20+ Delegates, 25+ Papers, 10+ Scholars, 15+ Sessions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.04)]">
          {CONFERENCE_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#047857] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
