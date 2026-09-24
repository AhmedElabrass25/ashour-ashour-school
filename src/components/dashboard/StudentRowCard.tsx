import type { StudentRow } from "../../types";
import { GenderInputRow } from "./GenderInputRow";

export type LevelGroup = {
  level: string;
  classes: string;
  firstIndex: number;
  genderRows: { index: number; gender: string; students: string }[];
};

export function getLevelGroups(rows: StudentRow[]): LevelGroup[] {
  const groups: LevelGroup[] = [];
  const map = new Map<string, LevelGroup>();
  rows.forEach((row, index) => {
    let group = map.get(row.level);
    if (!group) {
      group = { level: row.level, classes: row.classes || "", firstIndex: index, genderRows: [] };
      map.set(row.level, group);
      groups.push(group);
    }
    group.genderRows.push({ index, gender: row.gender, students: row.students || "" });
    if (row.classes && !group.classes) group.classes = row.classes;
  });
  return groups;
}

type CardProps = {
  group: LevelGroup;
  onUpdate: (index: number, key: "students" | "classes", value: string) => void;
};

export function StudentRowCard({ group, onUpdate }: CardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-2xs">
      <div className="bg-slate-100/90 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
        <span className="font-bold text-slate-800 text-xs md:text-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          {group.level}
        </span>
        <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-sm">فصول مشتركة (بنين + بنات)</span>
      </div>
      <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-7 flex flex-col gap-2.5">
          {group.genderRows.map((gr) => (
            <GenderInputRow key={`${group.level}-${gr.gender}`} gender={gr.gender} students={gr.students} level={group.level} index={gr.index} onUpdate={onUpdate} />
          ))}
        </div>
        <div className="hidden md:flex md:col-span-1 justify-center items-center h-full">
          <div className="w-px bg-slate-200 h-16"></div>
        </div>
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-blue-50/50 md:bg-transparent border border-blue-200 md:border-none rounded-sm text-center">
          <label className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
            <span>عدد الفصول</span>
            <span className="text-blue-600 font-bold text-[10px] bg-blue-100 px-1 py-0.5 rounded">(مشترك للصف)</span>
          </label>
          <input
            className="w-full max-w-[140px] h-9 rounded-sm border border-blue-300 md:border-slate-300 bg-white px-2.5 text-center text-slate-900 font-bold text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
            type="number" min="0" value={group.classes}
            aria-label={`عدد الفصول المشتركة ${group.level}`}
            placeholder="الفصول"
            onChange={(e) => onUpdate(group.firstIndex, "classes", e.target.value)}
          />
          <span className="text-[10px] font-medium text-slate-500 mt-1">قيمة الفصول ممتدة بين البنين والبنات</span>
        </div>
      </div>
    </div>
  );
}
