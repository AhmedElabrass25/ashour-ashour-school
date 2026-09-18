import type { StudentRow } from "../../types";

type StudentRowsEditorProps = {
  rows: StudentRow[];
  onChange: (rows: StudentRow[]) => void;
};

export function StudentRowsEditor({ rows, onChange }: StudentRowsEditorProps) {
  const update = (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => {
    onChange(
      rows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row,
      ),
    );
  };
  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-4 gap-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-bold text-slate-700">
        <span className="col-span-1">المرحلة والصف</span>
        <span className="col-span-1">النوع</span>
        <span className="col-span-1">عدد الطلاب</span>
        <span className="col-span-1">عدد الفصول</span>
      </div>

      {rows.map((row, index) => (
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 md:p-2 bg-slate-50 md:bg-white border md:border-transparent md:border-b-slate-100 border-slate-200 rounded-sm md:rounded-none items-center" 
          key={`${row.level}-${row.gender}`}
        >
          {/* Mobile Labels + Values */}
          <div className="flex flex-col md:block col-span-1">
            <span className="md:hidden text-[10px] font-bold text-slate-500 mb-0.5">المرحلة والصف</span>
            <strong className="text-xs text-slate-800">{row.level}</strong>
          </div>
          
          <div className="flex flex-col md:block col-span-1">
             <span className="md:hidden text-[10px] font-bold text-slate-500 mb-0.5">النوع</span>
             <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-sm shadow-2xs w-fit md:border-none md:shadow-none md:bg-transparent md:p-0 md:w-auto">{row.gender}</span>
          </div>
          
          <div className="flex flex-col col-span-1 gap-1">
             <span className="md:hidden text-[10px] font-bold text-slate-500">عدد الطلاب</span>
             <input
              className="w-full h-9 rounded-sm border border-slate-200 bg-white px-2.5 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-xs font-bold"
              type="number"
              min="0"
              value={row.students}
              aria-label={`عدد طلاب ${row.level} ${row.gender}`}
              placeholder="طلاب"
              onChange={(event) => update(index, "students", event.target.value)}
            />
          </div>

          <div className="flex flex-col col-span-1 gap-1">
             <span className="md:hidden text-[10px] font-bold text-slate-500">عدد الفصول</span>
            <input
              className="w-full h-9 rounded-sm border border-slate-200 bg-white px-2.5 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-xs font-bold"
              type="number"
              min="0"
              value={row.classes}
              aria-label={`عدد فصول ${row.level} ${row.gender}`}
              placeholder="فصول"
              onChange={(event) => update(index, "classes", event.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
