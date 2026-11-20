"use client";

import { X, Download, ExternalLink, FileText } from "lucide-react";
import { ResearchPaper } from "@/data/conferenceData";

interface PdfModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export default function PdfModal({ paper, onClose }: PdfModalProps) {
  if (!paper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-[#062419] border-2 border-[#00e575]/40 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/60 bg-[#031c13]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#00e575]/20 flex items-center justify-center text-[#00e575] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00e575] px-2 py-0.5 rounded bg-[#00e575]/15 mr-2">
                {paper.department}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate inline-block max-w-[280px] sm:max-w-md">
                {paper.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={paper.downloadUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e575] text-[#02100b] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md shadow-[#00e575]/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#062c1e] text-emerald-300 hover:text-white transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#062c1e] text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              aria-label="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="relative flex-1 w-full bg-slate-900">
          <iframe
            src={`${paper.pdfUrl}#toolbar=1&navpanes=0`}
            title={paper.title}
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#031c13] border-t border-emerald-900/60 flex items-center justify-between text-xs text-emerald-300">
          <div className="truncate">
            <span className="font-semibold text-white">{paper.author}</span> • {paper.authorRole}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 shrink-0">
            {paper.pages} Pages • Wafy Campus Research
          </div>
        </div>
      </div>
    </div>
  );
}
