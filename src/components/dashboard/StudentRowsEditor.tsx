import type { StudentRow } from "../../types";

type StudentRowsEditorProps = {
  rows: StudentRow[];
  onChange: (rows: StudentRow[]) => void;
};

type LevelGroup = {
  level: string;
  classes: string;
  firstIndex: number;
  genderRows: {
    index: number;
    gender: string;
    students: string;
  }[];
};

function getLevelGroups(rows: StudentRow[]): LevelGroup[] {
  const groups: LevelGroup[] = [];
  const map = new Map<string, LevelGroup>();

  rows.forEach((row, index) => {
    let group = map.get(row.level);
    if (!group) {
      group = {
        level: row.level,
        classes: row.classes || "",
        firstIndex: index,
        genderRows: [],
      };
      map.set(row.level, group);
      groups.push(group);
    }
    group.genderRows.push({
      index,
      gender: row.gender,
      students: row.students || "",
    });
    if (row.classes && !group.classes) {
      group.classes = row.classes;
    }
  });

  return groups;
}

export function StudentRowsEditor({ rows, onChange }: StudentRowsEditorProps) {
  const update = (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => {
    const targetLevel = rows[index]?.level;
    onChange(
      rows.map((row, rowIndex) => {
        if (key === "classes" && targetLevel && row.level === targetLevel) {
          return { ...row, classes: value };
        }
        if (rowIndex === index) {
          return { ...row, [key]: value };
        }
        return row;
      }),
    );
  };

  const groups = getLevelGroups(rows);

  return (
    <div className="w-full flex flex-col gap-3">
      {groups.map((group) => (
        <div
          key={group.level}
          className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-2xs"
        >
          {/* Grade Title Header */}
          <div className="bg-slate-100/90 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs md:text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              {group.level}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-sm">
              فصول مشتركة (بنين + بنات)
            </span>
          </div>

          {/* Content Grid */}
          <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Student Count Inputs */}
            <div className="md:col-span-7 flex flex-col gap-2.5">
              {group.genderRows.map((genderRow) => {
                const isBoys = genderRow.gender.includes("بنين");
                return (
                  <div
                    key={`${group.level}-${genderRow.gender}`}
                    className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200/80 rounded-sm"
                  >
                    <span
                      className={`w-14 text-center font-bold text-xs py-1 px-1.5 rounded-sm shrink-0 ${
                        isBoys
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-pink-50 text-pink-800 border border-pink-200"
                      }`}
                    >
                      {genderRow.gender}
                    </span>

                    <div className="flex-1 flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600 shrink-0">
                        الطلاب:
                      </label>
                      <input
                        className="w-full h-9 rounded-sm border border-slate-200 bg-white px-2.5 text-slate-800 font-bold placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-xs"
                        type="number"
                        min="0"
                        value={genderRow.students}
                        aria-label={`عدد طلاب ${group.level} ${genderRow.gender}`}
                        placeholder="عدد الطلاب"
                        onChange={(e) =>
                          update(genderRow.index, "students", e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vertical Separator */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center h-full">
              <div className="w-px bg-slate-200 h-16"></div>
            </div>

            {/* Shared Classes Input (Vertically Centered across both gender rows) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-blue-50/50 md:bg-transparent border border-blue-200 md:border-none rounded-sm text-center">
              <label className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                <span>عدد الفصول</span>
                <span className="text-blue-600 font-bold text-[10px] bg-blue-100 px-1 py-0.5 rounded">
                  (مشترك للصف)
                </span>
              </label>
              <input
                className="w-full max-w-[140px] h-9 rounded-sm border border-blue-300 md:border-slate-300 bg-white px-2.5 text-center text-slate-900 font-bold text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                type="number"
                min="0"
                value={group.classes}
                aria-label={`عدد الفصول المشتركة ${group.level}`}
                placeholder="الفصول"
                onChange={(e) =>
                  update(group.firstIndex, "classes", e.target.value)
                }
              />
              <span className="text-[10px] font-medium text-slate-500 mt-1">
                قيمة الفصول ممتدة بين البنين والبنات
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

