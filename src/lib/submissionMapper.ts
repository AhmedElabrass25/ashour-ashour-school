import type { Submission } from "../types";

export function toSubmission(record: Record<string, unknown>): Submission {
  const rows = Array.isArray(record.students)
    ? record.students.filter((row) => {
        const level = String((row as { level?: unknown }).level || "");
        return !level.includes("الثانوي") && !level.includes("ثانوي");
      })
    : [];
  const students = rows.reduce(
    (sum, row) => sum + Number((row as { students?: string }).students || 0),
    0,
  );
  const seenLevels = new Set<string>();
  const classes = rows.reduce((sum, row) => {
    const level = String((row as { level?: string }).level || "");
    if (!seenLevels.has(level)) {
      seenLevels.add(level);
      const rawVal = Number((row as { classes?: string }).classes || 0);
      const sanitized = rawVal > 40 ? Math.max(1, Math.round(rawVal / 35)) : rawVal;
      return sum + sanitized;
    }
    return sum;
  }, 0);
  return {
    id: Number(record.id),
    schoolName: String(record.school_name || ""),
    schoolCode: String(record.school_code || ""),
    schoolType: String(record.school_type || ""),
    area: String(record.area || ""),
    shift: String(record.shift || ""),
    availableSpaces: Number(record.available_spaces || 0),
    fireHoses: Number(record.fire_hoses || 0),
    waterTanks: Number(record.water_tanks || 0),
    waterTanksStatus: String(record.water_tanks_status || "غير محدد"),
    fireHydrants: Number(record.fire_hydrants || 0),
    principal: String(record.principal_name || ""),
    principalCode: String(record.principal_code || ""),
    principalNationalId: String(record.principal_national_id || ""),
    principalPhone: String(record.principal_phone || ""),
    principalType: String(record.principal_type || ""),
    deputyName: String(record.deputy_name || ""),
    deputyCode: String(record.deputy_code || ""),
    deputyNationalId: String(record.deputy_national_id || ""),
    deputyPhone: String(record.deputy_phone || ""),
    deputyType: String(record.deputy_type || ""),
    studentRows: rows as Submission["studentRows"],
    students,
    classes,
    status: String(record.status || "مراجعة"),
  };
}
