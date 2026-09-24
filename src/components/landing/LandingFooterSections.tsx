import type { Submission } from "../../types";
import { LandingPreview } from "./LandingPreviewFooter";

export { LandingPreview };

type LandingFooterStatsProps = {
  submissions: Submission[];
  totalStudents: number;
  totalClasses: number;
  reviewedSchools: number;
  pendingSchools: number;
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center text-center rounded-sm bg-white p-4 border border-slate-200 shadow-2xs py-6 hover:shadow-xs transition-shadow">
      <strong className="mb-1 text-3xl font-extrabold text-blue-600 tabular-nums">{value.toLocaleString("ar-EG")}</strong>
      <span className="text-xs font-bold text-slate-600">{label}</span>
    </div>
  );
}

export function LandingFooterStats({ submissions, totalStudents, totalClasses, reviewedSchools, pendingSchools }: LandingFooterStatsProps) {
  return (
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
  );
}

export function LandingPageFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-6 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6 pb-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-right">
        <div className="flex flex-col gap-2">
          <strong className="text-xs font-bold text-slate-800 mb-1">روابط سريعة</strong>
          {["الرئيسية", "عن-النظام", "المميزات"].map((id) => (
            <a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <strong className="text-xs font-bold text-slate-800 mb-1">دعم ومساعدة</strong>
          {["السلامة", "التقارير"].map((id) => (
            <a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 font-medium">جميع الحقوق محفوظة © ٢٠٢٦</p>
    </footer>
  );
}
