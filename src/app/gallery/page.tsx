"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Images,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { GalleryData } from "@/lib/db";
import { getDriveImageUrl } from "@/lib/driveUtils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramFloatingButton from "@/components/InstagramFloatingButton";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Inaugural", "Academic Sessions", "Dignitaries", "Audience", "Campus Life"];

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGalleryItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredImages = galleryItems.filter((img) => {
    return selectedCategory === "All" || img.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#047857] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
            <Images className="w-4 h-4 text-[#059669]" />
            <span>Visual Retrospective Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] uppercase tracking-tight">
            Conference &amp; Campus <span className="text-[#047857]">Image Gallery</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
            A photographic showcase celebrating the vibrant moments of IFC Season 1, the academic rigor of Wafy Campus kalikavu, and the scholars of Usrah and Muamalah departments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#047857] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modern Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Image
                src={getDriveImageUrl(img.driveUrl)}
                alt={img.title}
                fill
                priority={idx < 4}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-0.5 rounded-md bg-[#047857] text-white text-[10px] font-black uppercase tracking-wider">
                  {img.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {img.title}
                </h3>
                {img.caption && (
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                    {img.caption}
                  </p>
                )}
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:text-[#10b981] transition-colors z-50"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#10b981] transition-all z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#10b981] transition-all z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={getDriveImageUrl(filteredImages[lightboxIndex].driveUrl)}
                alt={filteredImages[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="w-full text-center mt-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300">
                {filteredImages[lightboxIndex].category} • Image {lightboxIndex + 1} of {filteredImages.length}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {filteredImages[lightboxIndex].title}
              </h2>
              {filteredImages[lightboxIndex].caption && (
                <p className="text-sm text-slate-300 mt-1 max-w-2xl mx-auto">
                  {filteredImages[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <InstagramFloatingButton />
    </div>
  );
}
