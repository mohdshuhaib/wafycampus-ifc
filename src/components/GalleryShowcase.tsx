"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Images, ArrowRight, X, ZoomIn } from "lucide-react";
import { GalleryData } from "@/lib/db";
import { getDriveImageUrl } from "@/lib/driveUtils";

export default function GalleryShowcase() {
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);
  const [topFive, setTopFive] = useState<GalleryData[]>([]);
  const [activeImage, setActiveImage] = useState<GalleryData | null>(null);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryItems(data);
          const featured = data.filter((g: GalleryData) => g.featured);
          const finalFive = featured.length >= 5 ? featured.slice(0, 5) : data.slice(0, 5);
          setTopFive(finalFive);
        }
      })
      .catch((err) => console.error("Error loading gallery:", err));
  }, []);

  return (
    <>
      <section id="gallery" className="relative py-20 sm:py-28 bg-white overflow-hidden border-t border-slate-200/80">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
                <Images className="w-4 h-4 text-[#059669]" />
                <span>Visual Retrospective</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
                Conference Moments &amp; <br />
                <span className="text-[#047857]">Campus Gallery</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
                Glimpses from Season 1 proceedings, dignitary dialogues, and the academic campus life at Wafy Campus kalikavu.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#047857] hover:bg-[#065f46] shadow-md shadow-[#047857]/20 transition-all duration-300 transform hover:-translate-y-0.5 shrink-0 self-start md:self-auto"
            >
              <span>View Full Gallery Grid</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 5-Image Mosaic Grid */}
          {topFive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {/* Image 1: Main Highlight */}
              {topFive[0] && (
                <div
                  onClick={() => setActiveImage(topFive[0])}
                  className="md:col-span-7 relative group rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-auto sm:h-[460px] border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer bg-slate-100"
                >
                  <Image
                    src={getDriveImageUrl(topFive[0].driveUrl)}
                    alt={topFive[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-[#047857] text-white text-xs font-black uppercase tracking-wider shadow-md">
                      Featured Top Photo
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">
                      {topFive[0].category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                      {topFive[0].title}
                    </h3>
                    {topFive[0].caption && (
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                        {topFive[0].caption}
                      </p>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              )}

              {/* Images 2 & 3: Stacked Right */}
              <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                {[topFive[1], topFive[2]].filter(Boolean).map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImage(img)}
                    className="relative group rounded-3xl overflow-hidden h-[218px] border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer bg-slate-100"
                  >
                    <Image
                      src={getDriveImageUrl(img.driveUrl)}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                        {img.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {img.title}
                      </h4>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Images 4 & 5: Bottom 2-col span */}
              {[topFive[3], topFive[4]].filter(Boolean).map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActiveImage(img)}
                  className="md:col-span-6 relative group rounded-3xl overflow-hidden h-[240px] border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer bg-slate-100"
                >
                  <Image
                    src={getDriveImageUrl(img.driveUrl)}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                      {img.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {img.title}
                    </h4>
                    {img.caption && (
                      <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                        {img.caption}
                      </p>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm max-w-xl mx-auto">
              <Images className="w-12 h-12 text-[#047857]/50 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Gallery Moments Coming Soon
              </h3>
              <p className="text-sm text-slate-500">
                Official photos from IFC and campus delegations will appear here once added in the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:text-[#10b981] transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={getDriveImageUrl(activeImage.driveUrl)}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="w-full text-center mt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {activeImage.category}
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {activeImage.title}
              </h3>
              {activeImage.caption && (
                <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
