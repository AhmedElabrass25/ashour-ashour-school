const TOTAL_SCHOOLS = 48;

type ProgressCardProps = { registered: number; remaining: number; progressPct: number };

export function ProgressCard({ registered, remaining, progressPct }: ProgressCardProps) {
  return (
    <div className="col-span-2 lg:col-span-1 bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3 relative shadow-sm border-t-4 border-t-amber-500 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <span className="w-11 h-11 flex items-center justify-center rounded-sm text-emerald-700 bg-emerald-50 text-2xl font-bold">▦</span>
        <span className={`flex items-center gap-1 text-xs md:text-sm font-bold px-2.5 py-1 rounded-sm border ${remaining === 0 ? "text-emerald-700 bg-emerald-100/70 border-emerald-200" : "text-amber-700 bg-amber-100/70 border-amber-200"}`}>
          {remaining === 0 ? "✓ مكتمل" : `فضل ${remaining}`}
        </span>
      </div>
      <div>
        <span className="block text-sm font-bold text-slate-600 mb-1">المدارس المسجّلة</span>
        <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
          {registered}<span className="text-slate-400 text-lg font-bold"> / {TOTAL_SCHOOLS}</span>
        </strong>
        <span className="text-xs text-slate-500 font-bold block mt-1">تم تسجيل {registered} مدرسة من الـ{TOTAL_SCHOOLS}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
        <div className={`h-2 rounded-full transition-all duration-500 ${progressPct === 100 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${progressPct}%` }} />
      </div>
      <span className="text-xs text-slate-400 font-semibold">{progressPct}٪ من الهدف</span>
    </div>
  );
}

import type { ReactNode } from "react";

type StatCardProps = { icon: string; iconColor: string; label: string; value: ReactNode; subLabel: string };

export function StatCard({ icon, iconColor, label, value, subLabel }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <span className={`w-11 h-11 flex items-center justify-center rounded-sm text-2xl font-bold ${iconColor}`}>{icon}</span>
      </div>
      <div>
        <span className="block text-sm font-bold text-slate-600 mb-1">{label}</span>
        <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">{value}</strong>
        <span className="text-xs text-slate-500 font-bold block mt-1.5">{subLabel}</span>
      </div>
    </div>
  );
}

export { TOTAL_SCHOOLS };
