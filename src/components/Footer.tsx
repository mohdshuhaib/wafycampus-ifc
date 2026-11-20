"use client";

import Link from "next/link";
import {
  MapPin,
  Mail,
  Calendar,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { CONFERENCE_INFO } from "@/data/conferenceData";

export default function Footer() {
  return (
    <footer className="relative bg-[#064e3b] text-emerald-100 overflow-hidden border-t-2 border-[#047857]">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Arabic Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#064e3b] font-black text-2xl shadow-lg">
                IFC
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wide block">
                  INTERNATIONAL FIQH CONFERENCE
                </span>
                <span className="text-xs font-bold text-emerald-300 tracking-widest uppercase">
                  SEASON 2 • WAFY CAMPUS kalikavu
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#043d2e] border border-emerald-700/80">
              <div className="font-arabic text-xl text-white leading-relaxed mb-1 font-medium">
                كلية الشريعة الإسلامية - حرم الوافي الجامعي
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                Faculty of Islamic Jurisprudence under the Coordination of Islamic Colleges (CIC), nurturing scholarly leadership in contemporary Muslim Personal Law (Usrah) and Commercial Jurisprudence (Muamalah).
              </p>
            </div>

            <div className="text-xs font-medium text-emerald-200">
              Wafy Campus kalikavu • Malappuram District, Kerala
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-300 pb-2 border-b border-emerald-700/60">
              Conference Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#hero" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Hero Video</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>About IFC Season 2</span>
                </a>
              </li>
              <li>
                <a href="#department" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Sharee&apos;ah Dept (Usrah &amp; Muamalah)</span>
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Season 1 YouTube Highlights</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Photo Gallery</span>
                </a>
              </li>
              <li>
                <a href="#papers" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Research Papers (PDFs)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Campus Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-300 pb-2 border-b border-emerald-700/60">
              Campus &amp; Department Desk
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span className="text-emerald-100 leading-relaxed">
                  Wafy Campus, Kalikavu, Malappuram District, Kerala, India - Pin: 676525
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                <a href="mailto:shareeah@wafycampuskalikavu.edu" className="hover:text-white transition-colors truncate">
                  dept.ofshareea@wafycampuskalikavu.edu
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Season 2 Promotion Phase</span>
              </div>
            </div>

            {/* Social follow card */}
            <div className="pt-3">
              <a
                href={CONFERENCE_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#043d2e] border border-emerald-700 hover:border-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  <span className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Follow on Instagram
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-300 flex items-center gap-1">
                  @dept.ofshareea
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="pt-8 border-t border-emerald-700/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/90">
          <div>
            © 2026 Department of Sharee&apos;ah, Wafy Campus kalikavu. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#043d2e] border border-emerald-700 text-[10px] font-mono text-emerald-200">
              Affiliated with CIC
            </span>
            <span>IFC Season 2 Official Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
