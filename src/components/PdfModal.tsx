"use client";

import { X, Download, ExternalLink, FileText } from "lucide-react";
import { getDrivePdfPreviewUrl, getDrivePdfDownloadUrl } from "@/lib/driveUtils";
import { PaperData } from "@/lib/db";

interface PdfModalProps {
  paper: PaperData | null;
  onClose: () => void;
}

export default function PdfModal({ paper, onClose }: PdfModalProps) {
  if (!paper) return null;

  const previewUrl = getDrivePdfPreviewUrl(paper.driveUrl);
  const downloadUrl = getDrivePdfDownloadUrl(paper.driveUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#064e3b] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#064e3b] px-2 py-0.5 rounded bg-emerald-100 mr-2">
                {paper.department}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate inline-block max-w-[280px] sm:max-w-md">
                {paper.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#064e3b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#043d2e] shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={paper.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Open Drive Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer (Google Drive Embed) */}
        <div className="relative flex-1 w-full bg-slate-100">
          <iframe
            src={previewUrl}
            title={paper.title}
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="truncate">
            <span className="font-semibold text-slate-900">{paper.author}</span> • {paper.authorRole}
          </div>
          <div className="text-[11px] font-mono text-emerald-800 font-bold shrink-0">
            {paper.pages} Pages • Wafy Campus Research
          </div>
        </div>
      </div>
    </div>
  );
}
