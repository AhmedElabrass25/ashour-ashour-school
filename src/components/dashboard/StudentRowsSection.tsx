import { GraduationCap } from "lucide-react";
import type { Submission } from "../../types";

export function StudentRowsSection({ item }: { item: Submission }) {
  const groupedRows = (item.studentRows || []).reduce<
    Array<{
      level: string;
      classes: string;
      genders: Array<{ gender: string; students: string }>;
    }>
  >((acc, row) => {
    let existing = acc.find((g) => g.level === row.level);
    if (!existing) {
      existing = { level: row.level, classes: row.classes || "0", genders: [] };
      acc.push(existing);
    }
    existing.genders.push({ gender: row.gender, students: row.students || "0" });
    if (row.classes && existing.classes === "0") existing.classes = row.classes;
    return acc;
  }, []);

  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-2xs mb-4">
      <div className="flex items-center justify-between gap-2.5 px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <GraduationCap size={16} className="text-purple-600" />
          <h3 className="text-sm font-bold text-slate-800 m-0">تفاصيل الصفوف</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
          <span>الطلاب: <b className="text-blue-700">{item.students}</b></span>
          <span>الفصول: <b className="text-slate-800">{item.classes}</b></span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 md:p-5">
        {groupedRows.map((group) => (
          <div key={group.level} className="flex flex-col gap-2 border border-slate-200 bg-slate-50 rounded-sm p-3.5 hover:bg-slate-100 transition-colors">
            <div className="flex justify-between items-center mb-1 border-b border-slate-200 pb-1.5">
              <strong className="text-xs font-bold text-slate-800">{group.level}</strong>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-sm">
                {group.classes} فصول مشتركة
              </span>
            </div>
            {group.genders.map((g) => (
              <div key={g.gender} className="flex justify-between items-center px-0.5 text-xs">
                <span className="font-semibold text-slate-600">الطلاب ({g.gender}):</span>
                <b className="text-blue-700 font-bold">{g.students} طالب</b>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
