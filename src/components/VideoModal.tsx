"use client";

import { X, ExternalLink, Play } from "lucide-react";
import { VideoItem } from "@/data/conferenceData";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#062419] border-2 border-[#00e575]/40 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/60 bg-[#031c13]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#00e575] px-2.5 py-0.5 rounded-full bg-[#00e575]/15 border border-[#00e575]/30">
              {video.category}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">{video.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-[#00e575] transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#062c1e] text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Embed Frame */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Modal Bottom Details */}
        <div className="p-6 bg-[#062419]">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00e575] mb-3">
            <span>Speaker: {video.speaker}</span>
            <span>•</span>
            <span className="text-emerald-300/80">{video.designation}</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
