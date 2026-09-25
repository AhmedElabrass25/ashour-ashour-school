import type { Submission } from "../types";

export function getSafetyIssues(school: Partial<Submission>): string[] {
  const issues: string[] = [];

  // 1. Water Tanks Count Check
  if (school.waterTanks !== undefined && Number(school.waterTanks) === 0) {
    issues.push("عدم وجود خزانات مياه بالمدرسة (عدد خزانات المياه: 0)");
  }

  // 2. Water Tanks Status Check
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

  // 3. Fire Hoses Check
  if (school.fireHoses !== undefined && Number(school.fireHoses) === 0) {
    issues.push("عدم وجود خراطيم حريق بالمدرسة (عدد خراطيم الحريق: 0)");
  }

  // 4. Fire Hydrants Check
  if (school.fireHydrants !== undefined && Number(school.fireHydrants) === 0) {
    issues.push("عدم وجود حنفيات حريق بالمدرسة (عدد حنفيات الحريق: 0)");
  }

  return issues;
}

export function hasSafetyIssue(school: Partial<Submission>): boolean {
  return getSafetyIssues(school).length > 0;
}
