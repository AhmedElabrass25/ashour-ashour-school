import type { Submission } from "../types";

export function getSafetyIssues(school: Partial<Submission>): string[] {
  const issues: string[] = [];
  const status = (school.waterTanksStatus || "").trim();

  const isProblematicStatus =
    status.includes("غير") ||
    status.includes("تالف") ||
    status.includes("عطل") ||
    status.includes("صيانة") ||
    status.includes("سيء") ||
    status.includes("لا يعمل");

  if (isProblematicStatus) {
    issues.push(`حالة خزانات المياه تحتاج متابعة معتمدة (${status})`);
  }

  if (school.waterTanks !== undefined && Number(school.waterTanks) === 0 && isProblematicStatus) {
    issues.push("المدرسة بدون خزانات مياه صالحة للاستخدام");
  }

  return issues;
}

export function hasSafetyIssue(school: Partial<Submission>): boolean {
  return getSafetyIssues(school).length > 0;
}
