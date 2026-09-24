import { AlertTriangle, ShieldCheck } from "lucide-react";
import type { Submission } from "../../types";
import { getSafetyIssues } from "../../lib/safetyAuditHelpers";

export function SchoolSafetyAlertBadge({ school }: { school: Partial<Submission> }) {
  const issues = getSafetyIssues(school);
  if (issues.length > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-red-50 text-red-700 border border-red-200 text-xs font-bold shadow-2xs animate-[pulse_3s_infinite]" title={issues.join(" · ")}>
        <AlertTriangle size={14} className="text-red-600 shrink-0" />
        <span>مخاطر سلامة ({issues.length})</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
      <span>مطابق للسلامة</span>
    </span>
  );
}
