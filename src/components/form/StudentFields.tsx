import type { StudentRow } from "../../types";

type StudentFieldsProps = {
  rows: StudentRow[];
  updateRow: (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => void;
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

export function StudentFields({ rows, updateRow }: StudentFieldsProps) {
  const groups = getLevelGroups(rows);

  return (
    <div className="w-full flex flex-col gap-4">
      {groups.map((group) => (
        <div
          key={group.level}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
        >
          {/* Grade Title Header */}
          <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-2xs"></span>
              {group.level}
            </span>
          </div>

          {/* Group Content Layout */}
          <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Student Count Inputs (Boys & Girls) */}
            <div className="md:col-span-7 flex flex-col gap-3">
              {group.genderRows.map((genderRow) => {
                const isBoys = genderRow.gender.includes("بنين");
                return (
                  <div
                    key={`${group.level}-${genderRow.gender}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/70"
                  >
                    <span
                      className={`w-16 text-center font-bold text-xs py-1.5 px-2 rounded-md shrink-0 ${
                        isBoys
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-pink-100 text-pink-800 border border-pink-200"
                      }`}
                    >
                      {genderRow.gender}
                    </span>

                    <div className="flex-1 flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600 shrink-0">
                        عدد الطلاب:
                      </label>
                      <input
                        className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-800 font-bold placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        type="number"
                        min="0"
                        value={genderRow.students}
                        aria-label={`عدد طلاب ${group.level} ${genderRow.gender}`}
                        placeholder="عدد الطلاب"
                        onChange={(e) =>
                          updateRow(genderRow.index, "students", e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vertical Separator (Desktop) */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center h-full">
              <div className="w-px bg-slate-200 h-20"></div>
            </div>

            {/* Shared Classes Input (Vertically Centered across both gender rows) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-blue-50/40 md:bg-transparent border border-blue-200 md:border-none rounded-lg text-center">
              <input
                className="w-full max-w-[160px] h-11 rounded-lg border border-blue-300 md:border-slate-300 bg-white px-3 text-center text-slate-900 font-extrabold text-base placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-xs"
                type="number"
                min="0"
                value={group.classes}
                aria-label={`عدد الفصول المشتركة ${group.level}`}
                placeholder="الفصول"
                onChange={(e) =>
                  updateRow(group.firstIndex, "classes", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

