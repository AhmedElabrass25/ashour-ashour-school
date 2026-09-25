import { useState } from "react";
import type { Submission } from "../../types";
import { TOTAL_SCHOOLS, ProgressCard, StatCard } from "./DashboardStatCards";
import { hasSafetyIssue } from "../../lib/safetyAuditHelpers";
import { UnregisteredSchoolsModal } from "./UnregisteredSchoolsModal";

type DashboardStatsProps = { submissions: Submission[] };

export function DashboardStats({ submissions }: DashboardStatsProps) {
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const reviewCount = submissions.filter((item) => item.status !== "مكتمل").length;
  const safetyIssueCount = submissions.filter((item) => hasSafetyIssue(item)).length;
  const registered = submissions.length;
  const remaining = Math.max(0, TOTAL_SCHOOLS - registered);
  const progressPct = Math.min(100, Math.round((registered / TOTAL_SCHOOLS) * 100));

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        <ProgressCard
          registered={registered}
          remaining={remaining}
          progressPct={progressPct}
          onOpenUnregistered={() => setShowUnregisteredModal(true)}
        />
        <StatCard
          icon="◷" iconColor="text-blue-700 bg-blue-50"
          label="المدارس المسجلة" value={registered} subLabel="مدرسة مسجّلة"
        />
        <StatCard
          icon="!" iconColor="text-amber-700 bg-amber-50"
          label="تحتاج مراجعة" value={reviewCount} subLabel="مدرسة بانتظار المراجعة"
        />
        <StatCard
          icon="⚠️" iconColor="text-red-700 bg-red-50"
          label="تنبيهات السلامة"
          value={<span className={safetyIssueCount > 0 ? "text-red-600 font-bold" : "text-emerald-600 font-bold"}>{safetyIssueCount}</span>}
          subLabel={safetyIssueCount > 0 ? "مدارس بها ملاحظات سلامة" : "جميع المدارس آمنة"}
        />
        <StatCard
          icon="♧" iconColor="text-indigo-700 bg-indigo-50"
          label="إجمالي الطلاب"
          value={<span className="text-blue-700">{totalStudents.toLocaleString("ar-EG")}</span>}
          subLabel="طالب وطالبة"
        />
      </div>

      {showUnregisteredModal && (
        <UnregisteredSchoolsModal
          submissions={submissions}
          onClose={() => setShowUnregisteredModal(false)}
        />
      )}
    </>
  );
}
