"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  Download,
  ExternalLink,
  Database
} from "lucide-react";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/conferenceData";
import PdfModal from "./PdfModal";

export default function ResearchPapers() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <>
      <section id="papers" className="relative py-20 sm:py-28 bg-[#f5f5f7] overflow-hidden border-t border-slate-200/80">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
                <FileText className="w-4 h-4 text-[#059669]" />
                <span>Academic Publications</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
                Our Research Papers &amp; <br />
                <span className="text-[#047857]">Juridical Compendiums</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
                Scholarly contributions presented by the faculty and researchers of Usrah and Muamalah departments, advancing applied Islamic jurisprudence in contemporary society.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-xs">
              <Database className="w-3.5 h-3.5 text-[#047857]" />
              <span className="font-medium">Supabase &amp; Drive Ready</span>
            </div>
          </div>

          {/* Research Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {RESEARCH_PAPERS.map((paper) => (
              <div
                key={paper.id}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-emerald-50 text-[#047857] text-[11px] font-black uppercase tracking-wider border border-emerald-200">
                        {paper.department}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold">
                        {paper.year}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {paper.pages} Pages PDF
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#047857] transition-colors leading-snug mb-2">
                    {paper.title}
                  </h3>

                  {paper.arabicTitle && (
                    <div className="font-arabic text-base sm:text-lg text-emerald-800 mb-3 text-right">
                      {paper.arabicTitle}
                    </div>
                  )}

                  {/* Author */}
                  <div className="text-xs font-semibold text-slate-700 mb-4">
                    <span className="text-slate-900 font-bold">{paper.author}</span> • {paper.authorRole}
                  </div>

                  {/* Abstract Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {paper.abstract}
                  </p>
                </div>

                {/* Card Actions: Read Now & Download */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedPaper(paper)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#047857] hover:bg-[#065f46] shadow-md shadow-[#047857]/20 transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Now</span>
                    </button>

                    <a
                      href={paper.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                    >
                      <Download className="w-4 h-4 text-[#047857]" />
                      <span>Download PDF</span>
                    </a>
                  </div>

                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                    title="Open directly in tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive PDF Modal */}
      <PdfModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </>
  );
}
