import { ChevronLeft, School } from "lucide-react";
import type { Submission } from "../../types";

type LandingPreviewFooterProps = {
  submissions: Submission[];
  totalStudents: number;
  totalClasses: number;
  reviewedSchools: number;
  pendingSchools: number;
  onGoToDashboard: () => void;
};

export function LandingPreview({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200 overflow-hidden" id="المتابعة">
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center pb-12">
        <span className="mb-3 inline-block rounded-sm bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">متابعة مباشرة</span>
        <h2 className="mb-4 text-2xl font-bold md:text-3xl text-slate-800">لوحة تحكم متكاملة</h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600">توفر لوحة التحكم رؤية واضحة ومباشرة لأهم بيانات المدارس والإحصائيات وحالات المتابعة بشكل سريع.</p>
      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-8 relative mb-8">
        <div className="rounded-sm bg-slate-50 p-2 border border-slate-200 shadow-sm">
          <div className="rounded-sm bg-white border border-slate-200 shadow-2xs overflow-hidden flex flex-col min-h-[35vh] md:min-h-[45vh]">
            <div className="h-9 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
            <div className="p-5 md:p-6 flex-1 opacity-70">
              <div className="h-6 w-40 bg-slate-200 rounded-sm mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[1, 2, 3, 4].map((i) => (<div key={i} className="h-20 bg-slate-100 rounded-sm border border-slate-200"></div>))}
              </div>
              <div className="h-48 bg-slate-50 rounded-sm border border-slate-200"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 rounded-sm bg-blue-600 px-6 py-3 font-bold text-xs text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer" onClick={onGoToDashboard}>
            الانتقال إلى لوحة التحكم <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center text-center rounded-sm bg-white p-4 border border-slate-200 shadow-2xs py-6 hover:shadow-xs transition-shadow">
      <strong className="mb-1 text-3xl font-extrabold text-blue-600 tabular-nums">{value.toLocaleString("ar-EG")}</strong>
      <span className="text-xs font-bold text-slate-600">{label}</span>
    </div>
  );
}

export function LandingFooter({ submissions, totalStudents, totalClasses, reviewedSchools, pendingSchools }: LandingPreviewFooterProps) {
  return (
    <>
      <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200" id="التقارير">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-800 md:text-3xl">إحصائيات النظام العام</h2>
            <p className="text-sm text-slate-600">ملخص مباشر للبيانات المتاحة في لوحة الإدارة.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 md:gap-4">
            <Stat label="عدد المدارس" value={submissions.length} />
            <Stat label="عدد الطلاب" value={totalStudents} />
            <Stat label="عدد الفصول" value={totalClasses} />
            <Stat label="تمت متابعتها" value={reviewedSchools} />
            <Stat label="تحتاج متابعة" value={pendingSchools} />
          </div>
        </div>
      </section>
      <footer className="bg-white border-t border-slate-200 pt-12 pb-6 text-slate-600">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6 pb-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-right">
          <div className="flex flex-col items-center md:items-start">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-blue-50 border border-blue-200 text-blue-600 mb-3"><School size={20} /></span>
            <strong className="text-base font-bold text-slate-800 mb-1">مدارسنا</strong>
            <small className="text-xs text-slate-500">نظام إدارة ومتابعة التعليم الإعدادي</small>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col gap-2">
              <strong className="text-xs font-bold text-slate-800 mb-1">روابط سريعة</strong>
              {["الرئيسية", "عن-النظام", "المميزات"].map((id) => (<a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>))}
            </div>
            <div className="flex flex-col gap-2">
              <strong className="text-xs font-bold text-slate-800 mb-1">دعم ومساعدة</strong>
              {["السلامة", "التقارير"].map((id) => (<a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>))}
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 font-medium">جميع الحقوق محفوظة © ٢٠٢٦</p>
      </footer>
    </>
  );
}
