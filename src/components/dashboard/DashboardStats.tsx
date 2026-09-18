import type { Submission } from "../../types";

type DashboardStatsProps = { submissions: Submission[] };

export function DashboardStats({ submissions }: DashboardStatsProps) {
  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const reviewCount = submissions.filter((item) => item.status !== "مكتمل").length;
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {/* Total Schools */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm border-t-4 border-t-amber-500 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <span className="w-11 h-11 flex items-center justify-center rounded-sm text-emerald-700 bg-emerald-50 text-2xl font-bold">
            ▦
            </span>
            <span className="flex items-center gap-1 text-emerald-700 text-xs md:text-sm font-bold bg-emerald-100/70 border border-emerald-200 px-2.5 py-1 rounded-sm">
            ↗ ٦٪
            </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            إجمالي المدارس
          </span>
          <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
            {submissions.length + 47}
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1.5">
            من أصل ٥٠ مدرسة
          </span>
        </div>
      </div>

      {/* Received */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <span className="w-11 h-11 flex items-center justify-center rounded-sm text-blue-700 bg-blue-50 text-2xl font-bold">
            ◷
            </span>
            <span className="flex items-center gap-1 text-emerald-700 text-xs md:text-sm font-bold bg-emerald-100/70 border border-emerald-200 px-2.5 py-1 rounded-sm">
            ↗ ١٢٪
            </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            تم استلام البيانات
          </span>
          <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
            {submissions.length}
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1.5">
            هذا الشهر
          </span>
        </div>
      </div>

      {/* Needs Review */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <span className="w-11 h-11 flex items-center justify-center rounded-sm text-amber-700 bg-amber-50 text-2xl font-black">
            !
            </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            تحتاج مراجعة
          </span>
          <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
            {reviewCount}
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1.5">
            مدرسة بانتظار المراجعة
          </span>
        </div>
      </div>

      {/* Total Students */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <span className="w-11 h-11 flex items-center justify-center rounded-sm text-indigo-700 bg-indigo-50 text-2xl font-bold">
            ♧
            </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            إجمالي الطلاب
          </span>
          <strong className="block text-blue-700 text-3xl font-extrabold tracking-tight">
            {totalStudents.toLocaleString("ar-EG")}
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1.5">
            طالب وطالبة
          </span>
        </div>
      </div>
    </div>
  );
}
