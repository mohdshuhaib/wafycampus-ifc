"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ExternalLink, ArrowRight, Video, Clock } from "lucide-react";
import { FEATURED_VIDEOS, VideoItem } from "@/data/conferenceData";
import VideoModal from "./VideoModal";

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const featuredFive = FEATURED_VIDEOS.slice(0, 5);
  const leadVideo = featuredFive[0];
  const sideVideos = featuredFive.slice(1);

  return (
    <>
      <section id="videos" className="relative py-20 sm:py-28 bg-[#f5f5f7] overflow-hidden border-t border-slate-200/80">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
                <Video className="w-4 h-4 text-[#059669]" />
                <span>Season 1 Programme Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
                Latest News &amp; <br />
                <span className="text-[#047857]">Conference Broadcasts</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
                Revisit the historic discourses of IFC Season 1. Stream keynote lectures, panel debates, and scholarly deliberations with one tap or watch directly on YouTube.
              </p>
            </div>

            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#047857] hover:bg-[#065f46] shadow-md shadow-[#047857]/20 transition-all duration-300 transform hover:-translate-y-0.5 shrink-0 self-start md:self-auto"
            >
              <span>View All Videos ({FEATURED_VIDEOS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Layout: 1 Lead Video + 4 Companion Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lead Large Video Card */}
            {leadVideo && (
              <div className="lg:col-span-7 group rounded-3xl bg-white border border-slate-200 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
                {/* Thumbnail Container */}
                <div
                  className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(leadVideo)}
                >
                  <Image
                    src={leadVideo.thumbnailUrl}
                    alt={leadVideo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                  {/* Play Center Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#047857] text-white shadow-xl shadow-[#047857]/40 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Top Category and Duration */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#047857] text-white text-[11px] font-black uppercase tracking-wider">
                      Featured Lead
                    </span>
                    <span className="px-3 py-1 rounded-md bg-black/60 text-white text-[11px] font-bold backdrop-blur-md">
                      {leadVideo.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 text-white text-xs font-mono font-bold backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>{leadVideo.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                    <span>{leadVideo.speaker} • {leadVideo.designation}</span>
                    <span className="text-[#047857] font-bold">{leadVideo.views}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug mb-3">
                    {leadVideo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {leadVideo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedVideo(leadVideo)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#047857] hover:bg-[#065f46] shadow-md shadow-[#047857]/20 transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Watch On Site</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${leadVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-[#047857]" />
                      <span>Open on YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Companion Video Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {sideVideos.map((video) => (
                <div
                  key={video.id}
                  className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 p-4 flex flex-col sm:flex-row gap-4 items-start shadow-sm hover:shadow-md"
                >
                  {/* Miniature Thumbnail */}
                  <div
                    className="relative w-full sm:w-40 aspect-video rounded-2xl overflow-hidden bg-black shrink-0 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-[#047857] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-bold backdrop-blur-xs">
                      {video.duration}
                    </div>
                  </div>

                  {/* Miniature Content */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#047857] px-2 py-0.5 rounded bg-emerald-50">
                          {video.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {video.views}
                        </span>
                      </div>
                      <h4
                        className="text-sm font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug line-clamp-2 cursor-pointer"
                        onClick={() => setSelectedVideo(video)}
                      >
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {video.speaker}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="text-[11px] font-bold text-[#047857] hover:underline"
                      >
                        Watch Now
                      </button>
                      <span className="text-slate-300">•</span>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}
