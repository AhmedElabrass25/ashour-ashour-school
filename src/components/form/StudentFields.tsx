import type { StudentRow } from "../../types";

type StudentFieldsProps = {
  rows: StudentRow[];
  updateRow: (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => void;
};

export function StudentFields({ rows, updateRow }: StudentFieldsProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700">
        <span className="col-span-1">المرحلة والصف</span>
        <span className="col-span-1">النوع</span>
        <span className="col-span-1">عدد الطلاب</span>
        <span className="col-span-1">عدد الفصول</span>
      </div>

      {rows.map((row, index) => (
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 md:p-2 bg-white border border-slate-200 md:border-transparent md:border-b-slate-100 rounded-xl md:rounded-none items-center" 
          key={`${row.level}-${row.gender}`}
        >
          {/* Mobile Labels + Values */}
          <div className="flex flex-col md:block col-span-1">
            <span className="md:hidden text-xs font-bold text-slate-500 mb-1">المرحلة والصف</span>
            <strong className="text-sm text-slate-800">{row.level}</strong>
          </div>
          
          <div className="flex flex-col md:block col-span-1">
             <span className="md:hidden text-xs font-bold text-slate-500 mb-1">النوع</span>
             <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded w-fit md:bg-transparent md:p-0 md:w-auto">{row.gender}</span>
          </div>
          
          <div className="flex flex-col col-span-1 gap-1">
             <span className="md:hidden text-xs font-bold text-slate-500">عدد الطلاب</span>
             <input
              className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
              type="number"
              min="0"
              value={row.students}
              aria-label={`عدد طلاب ${row.level} ${row.gender}`}
              placeholder="طلاب"
              onChange={(event) =>
                updateRow(index, "students", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col col-span-1 gap-1">
             <span className="md:hidden text-xs font-bold text-slate-500">عدد الفصول</span>
            <input
              className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
              type="number"
              min="0"
              value={row.classes}
              aria-label={`عدد فصول ${row.level} ${row.gender}`}
              placeholder="فصول"
              onChange={(event) =>
                updateRow(index, "classes", event.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
