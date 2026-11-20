"use client";

import { useState } from "react";
import {
  GraduationCap,
  Users2,
  Scale,
  Calendar,
  Building2,
  CheckCircle,
  Layers
} from "lucide-react";
import { SHAREEAH_DEPT_INFO } from "@/data/conferenceData";

export default function ShareeahDept() {
  const [activeTab, setActiveTab] = useState<"overview" | "usrah" | "muamalah" | "classes">("overview");

  return (
    <section id="department" className="relative py-20 sm:py-28 bg-white overflow-hidden border-t border-slate-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
            <GraduationCap className="w-4 h-4 text-[#059669]" />
            <span>Academic Heritage &amp; Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
            Department of Sharee&apos;ah <br />
            <span className="font-arabic text-3xl sm:text-4xl text-[#047857] font-normal inline-block pt-2">
              كلية الشريعة الإسلامية
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
            Wafy Campus kalikavu • 2-Year Advanced Postgraduate Program
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {SHAREEAH_DEPT_INFO.description}
          </p>
        </div>

        {/* Apple Style Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "overview", label: "Program Overview", icon: Layers },
            { id: "usrah", label: "Dept. of Usrah (Family Law)", icon: Scale },
            { id: "muamalah", label: "Dept. of Muamalah (Finance)", icon: Building2 },
            { id: "classes", label: "4 Academic Classes (USR & MUL)", icon: Users2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#047857] text-white shadow-md shadow-[#047857]/20"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2-Year Postgraduate Structure */}
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#047857] mb-5 shadow-xs">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#047857] mb-1">
                  Duration &amp; Degree
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  2-Year Master of Sharee&apos;ah
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Intensive postgraduate curriculum under the Coordination of Islamic Colleges (CIC), training erudite jurists capable of delivering research suited for the modern world.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-[#047857]">
                  Affiliated with CIC System
                </span>
              </div>
            </div>

            {/* Two Distinct Specializations */}
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#047857] mb-5 shadow-xs">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#047857] mb-1">
                  Specialized Wings
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  Usrah &amp; Muamalah
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Students choose between <strong>Usrah</strong> (Personal and Family Jurisprudence) and <strong>Muamalah</strong> (Commercial Jurisprudence and Islamic Banking), ensuring focused mastery.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-[#047857]">
                  2 Dedicated Departments
                </span>
              </div>
            </div>

            {/* Four Cohort Classes */}
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#047857] mb-5 shadow-xs">
                  <Users2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#047857] mb-1">
                  Cohort System
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  4 Active Classes
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Operating four distinct classes across two years: <strong>USR 1 &amp; MUL 1</strong> (First Year) and <strong>USR 2 &amp; MUL 2</strong> (Second Year), nurturing collaborative seminars.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-[#047857]">
                  USR 1, MUL 1, USR 2, MUL 2
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Usrah */}
        {activeTab === "usrah" && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-[#047857] text-xs font-black uppercase tracking-widest">
                  Department of Usrah • قسم الأحوال الشخصية
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Family Jurisprudence &amp; Contemporary Matrimonial Law
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  The Usrah wing delves deeply into the Islamic family unit, matrimonial rights, divorce protocols, custody dispute mediation, and complex inheritance (Mawaarith) algorithms. Scholars are equipped with both classical texts and modern court dispute arbitration practices.
                </p>

                <div className="pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#047857] mb-3">
                    Core Focus &amp; Curriculum Pillars:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SHAREEAH_DEPT_INFO.specializations[0].focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <CheckCircle className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-800">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold text-[#047857] uppercase tracking-wider mb-1">
                    First Year Cohort
                  </div>
                  <div className="text-xl font-black text-slate-900">USR 1</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Foundational personal status, jurisprudence of marriage &amp; family contracts.
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold text-[#047857] uppercase tracking-wider mb-1">
                    Second Year Cohort
                  </div>
                  <div className="text-xl font-black text-slate-900">USR 2</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Advanced Mawaarith computation, civil court arbitration &amp; master&apos;s thesis.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Muamalah */}
        {activeTab === "muamalah" && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-[#047857] text-xs font-black uppercase tracking-widest">
                  Department of Muamalah • قسم المعاملات المالية
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Commercial Jurisprudence, Contracts &amp; Islamic Finance
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  The Muamalah wing prepares scholars to tackle modern economic systems, non-interest banking frameworks, FinTech applications, cryptocurrency compliance, and structured ethical investments. It is the driving force behind the theme of IFC Season 2.
                </p>

                <div className="pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#047857] mb-3">
                    Core Focus &amp; Curriculum Pillars:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SHAREEAH_DEPT_INFO.specializations[1].focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <CheckCircle className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-800">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold text-[#047857] uppercase tracking-wider mb-1">
                    First Year Cohort
                  </div>
                  <div className="text-xl font-black text-slate-900">MUL 1</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Classical commercial contracts (Bay, Ijarah, Salam, Istisna, Musharakah).
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold text-[#047857] uppercase tracking-wider mb-1">
                    Second Year Cohort
                  </div>
                  <div className="text-xl font-black text-slate-900">MUL 2</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Applied modern banking, FinTech Shariah audits, Sukuk &amp; Indian market equity models.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Classes Overview */}
        {activeTab === "classes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHAREEAH_DEPT_INFO.classesOverview.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#f5f5f7] border border-slate-200 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#047857] px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {item.strength}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h4>
                <div className="text-xs font-semibold text-emerald-700 mb-3">{item.year}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {item.coreTheme}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
