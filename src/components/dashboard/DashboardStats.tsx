import type { Submission } from "../../types";

const TOTAL_SCHOOLS = 48;

type DashboardStatsProps = { submissions: Submission[] };

export function DashboardStats({ submissions }: DashboardStatsProps) {
  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const reviewCount = submissions.filter((item) => item.status !== "مكتمل").length;
  const registered = submissions.length;
  const remaining = Math.max(0, TOTAL_SCHOOLS - registered);
  const progressPct = Math.min(100, Math.round((registered / TOTAL_SCHOOLS) * 100));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {/* Progress Card — registered vs. fixed total */}
      <div className="col-span-2 lg:col-span-1 bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3 relative shadow-sm border-t-4 border-t-amber-500 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <span className="w-11 h-11 flex items-center justify-center rounded-sm text-emerald-700 bg-emerald-50 text-2xl font-bold">
            ▦
          </span>
          <span
            className={`flex items-center gap-1 text-xs md:text-sm font-bold px-2.5 py-1 rounded-sm border ${
              remaining === 0
                ? "text-emerald-700 bg-emerald-100/70 border-emerald-200"
                : "text-amber-700 bg-amber-100/70 border-amber-200"
            }`}
          >
            {remaining === 0 ? "✓ مكتمل" : `فضل ${remaining}`}
          </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            المدارس المسجّلة
          </span>
          <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
            {registered}
            <span className="text-slate-400 text-lg font-bold"> / {TOTAL_SCHOOLS}</span>
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1">
            تم تسجيل {registered} مدرسة من الـ{TOTAL_SCHOOLS}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              progressPct === 100 ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{progressPct}٪ من الهدف</span>
      </div>

      {/* Received */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col gap-3.5 relative shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <span className="w-11 h-11 flex items-center justify-center rounded-sm text-blue-700 bg-blue-50 text-2xl font-bold">
            ◷
            </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-600 mb-1">
            تم استلام البيانات
          </span>
          <strong className="block text-slate-900 text-3xl font-extrabold tracking-tight">
            {registered}
          </strong>
          <span className="text-xs text-slate-500 font-bold block mt-1.5">
            مدرسة مسجّلة
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
