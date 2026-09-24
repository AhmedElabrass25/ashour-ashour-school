import { DownloadCloud } from "lucide-react";
import type { Submission } from "../../types";
import { exportSchoolsToExcel } from "../../lib/exportSchools";

type DashboardHeaderProps = {
  submissions: Submission[];
  loading: boolean;
};

export function DashboardHeader({ submissions, loading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mt-2">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          أهلًا بك، الأستاذ عاشور السيد <span className="text-amber-500">✦</span>
        </h2>
        <p className="text-slate-600 font-semibold text-base sm:text-lg">
          إدارة التعليم الإعدادي بسمنود — متابعة وتعديل بيانات المدارس
        </p>
      </div>
      <button
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-700 px-5 py-3 text-base font-bold text-white shadow-xs transition-colors disabled:opacity-50 w-full sm:w-auto cursor-pointer"
        onClick={() => exportSchoolsToExcel(submissions)}
        disabled={loading || submissions.length === 0}
      >
        <DownloadCloud size={18} /> <span>تصدير ملف Excel</span>
      </button>
    </div>
  );
}
