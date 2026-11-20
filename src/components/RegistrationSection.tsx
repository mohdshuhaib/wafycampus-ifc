"use client";

import { Calendar, User, Mail, Phone, Building, Clock, AlertCircle } from "lucide-react";

export default function RegistrationSection() {
  return (
    <section id="register" className="relative py-20 sm:py-28 bg-white overflow-hidden border-t border-slate-200/80">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-black uppercase tracking-widest mb-4">
            <Calendar className="w-4 h-4 text-[#059669]" />
            <span>Delegate Registration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
            Register for <span className="text-[#047857]">IFC Season 2</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
            Registration for delegates, scholars, and students for the upcoming Season 2 at Wafy Campus Kalikkavu.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#f5f5f7] border border-slate-200 shadow-sm relative">
          {/* Status Notice Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              <strong>Notice:</strong> Season 2 is currently in its promotional phase. Official registration dates and delegate quotas will be announced shortly.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled
                    placeholder="Will open soon..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 placeholder-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    placeholder="Will open soon..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 placeholder-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    disabled
                    placeholder="Will open soon..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 placeholder-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  College / Institution
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled
                    placeholder="Will open soon..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 placeholder-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              {/* Button showing: Registration not started yet */}
              <button
                type="button"
                disabled
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-600 bg-slate-200/90 border border-slate-300 shadow-sm cursor-not-allowed flex items-center justify-center gap-2.5 transition-all"
              >
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Registration Not Started Yet</span>
              </button>

              <p className="text-[11px] text-center text-slate-500 mt-3 font-medium">
                Delegate portal will become active as soon as Season 2 dates are formally released.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
