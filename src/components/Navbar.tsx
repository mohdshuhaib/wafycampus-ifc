"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calendar, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About IFC", href: "#about" },
    { name: "Sharee'ah Dept", href: "#department" },
    { name: "Season 1 Highlights", href: "#videos" },
    { name: "Gallery", href: "#gallery" },
    { name: "Research Papers", href: "#papers" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#064e3b] shadow-md border-b border-[#047857] py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#064e3b] shadow-md transition-transform duration-300 group-hover:scale-105">
                <span className="text-base font-black tracking-tighter">IFC</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full animate-ping opacity-75"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white">
                    IFC <span className="text-emerald-300">SEASON 2</span>
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 uppercase tracking-wider border border-emerald-600/50">
                    Kalikkavu
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-arabic text-sm text-emerald-200 font-medium">كلية الشريعة الإسلامية</span>
                  <span className="hidden md:inline text-[11px] text-emerald-100/70">
                    • Wafy Campus
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#043d2e] px-4 py-1.5 rounded-full border border-emerald-700/60">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-100 hover:text-white hover:bg-emerald-700/50 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#register"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#064e3b] bg-white hover:bg-emerald-50 shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Season 2 Info</span>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#043d2e] border border-emerald-700 text-white"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed top-20 right-4 left-4 p-6 rounded-3xl bg-[#064e3b] border border-emerald-700 shadow-2xl flex flex-col gap-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-700">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Navigation</span>
              <span className="font-arabic text-sm text-emerald-100">جامعة وافي كليكافو</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base font-semibold text-emerald-100 hover:text-white transition-colors"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </a>
            ))}
            <div className="pt-3 border-t border-emerald-700">
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider text-[#064e3b] bg-white shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Season 2 Registration
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
