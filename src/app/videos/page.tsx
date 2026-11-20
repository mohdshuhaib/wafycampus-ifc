"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  ExternalLink,
  Search,
  Clock,
  Video
} from "lucide-react";
import { VideoData } from "@/lib/db";
import { getYoutubeThumbnail } from "@/lib/driveUtils";
import VideoModal from "@/components/VideoModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramFloatingButton from "@/components/InstagramFloatingButton";

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<any>(null);

  const categories = ["All", "Inaugural", "Keynote", "Panel Discussion", "Academic Paper", "Valedictory"];

  useEffect(() => {
    fetch("/api/videos", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVideos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <Video className="w-4 h-4 text-[#059669]" />
            <span>Complete Video Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] uppercase tracking-tight">
            IFC Season 1 <span className="text-[#047857]">Broadcasts &amp; Sessions</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
            Stream full sessions, paper presentations, and keynote lectures from the International Fiqh Conference at Wafy Campus kalikavu. Watch online or redirect directly to YouTube.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic or speaker name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#047857]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#047857] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Thumbnail */}
                <div
                  className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() =>
                    setActiveVideo({
                      ...video,
                      thumbnailUrl: getYoutubeThumbnail(video.youtubeId),
                      description: `${video.speaker} • ${video.designation}`
                    })
                  }
                >
                  <Image
                    src={getYoutubeThumbnail(video.youtubeId)}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Play Center Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#047857] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#047857] text-white text-[10px] font-black uppercase tracking-wider">
                      {video.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-mono font-bold backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-[#10b981]" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="text-xs text-[#047857] font-semibold mb-1">
                    {video.speaker}
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug line-clamp-2 cursor-pointer mb-2"
                    onClick={() =>
                      setActiveVideo({
                        ...video,
                        thumbnailUrl: getYoutubeThumbnail(video.youtubeId),
                        description: `${video.speaker} • ${video.designation}`
                      })
                    }
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    {video.designation}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() =>
                    setActiveVideo({
                      ...video,
                      thumbnailUrl: getYoutubeThumbnail(video.youtubeId),
                      description: `${video.speaker} • ${video.designation}`
                    })
                  }
                  className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch In Modal</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-semibold">No videos found matching your filter.</p>
          </div>
        )}
      </main>

      <Footer />
      <InstagramFloatingButton />

      {/* Video Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
