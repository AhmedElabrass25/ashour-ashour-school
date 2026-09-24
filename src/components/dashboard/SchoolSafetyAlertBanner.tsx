import { AlertOctagon, CheckCircle2 } from "lucide-react";
import type { Submission } from "../../types";
import { getSafetyIssues } from "../../lib/safetyAuditHelpers";

export function SchoolSafetyAlertBanner({ school }: { school: Partial<Submission> }) {
  const issues = getSafetyIssues(school);

  if (issues.length === 0) {
    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-sm p-3.5 mb-6 flex items-center gap-3">
        <span className="grid place-items-center w-8 h-8 rounded-sm bg-emerald-100 text-emerald-700 shrink-0">
          <CheckCircle2 size={18} />
        </span>
        <div>
          <strong className="block text-xs font-bold text-emerald-900">حالة السلامة: آمنة ومطابقة</strong>
          <small className="block text-xs text-emerald-700 font-medium">جميع التجهيزات وخزانات المياه وحنفيات الحريق مسجلة وسليمة.</small>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-6 shadow-2xs">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="grid place-items-center w-7 h-7 rounded-sm bg-red-100 text-red-700 shrink-0">
          <AlertOctagon size={18} />
        </span>
        <h4 className="text-sm font-bold text-red-900">تنبيه ذكي: توجد ملاحظات سلامة حرجـة بالمدرسة!</h4>
      </div>
      <ul className="mr-9 space-y-1.5 list-disc text-xs font-bold text-red-800">
        {issues.map((issue, idx) => (
          <li key={idx}>{issue}</li>
        ))}
      </ul>
      <p className="mr-9 mt-2 text-[11px] font-medium text-red-600">
        يرجى المتابعة العاجلة مع قسم السلامة والصحة المهنية بالتنسيق مع مدير المدرسة.
      </p>
    </div>
  );
}
