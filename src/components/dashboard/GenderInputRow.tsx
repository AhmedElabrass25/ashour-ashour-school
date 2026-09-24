type GenderInputRowProps = {
  gender: string;
  students: string;
  level: string;
  index: number;
  onUpdate: (index: number, key: "students" | "classes", value: string) => void;
};

export function GenderInputRow({ gender, students, level, index, onUpdate }: GenderInputRowProps) {
  const isBoys = gender.includes("بنين");
  return (
    <div className={`flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200/80 rounded-sm`}>
      <span className={`w-14 text-center font-bold text-xs py-1 px-1.5 rounded-sm shrink-0 ${isBoys ? "bg-blue-50 text-blue-800 border border-blue-200" : "bg-pink-50 text-pink-800 border border-pink-200"}`}>
        {gender}
      </span>
      <div className="flex-1 flex items-center gap-2">
        <label className="text-xs font-bold text-slate-600 shrink-0">الطلاب:</label>
        <input
          className="w-full h-9 rounded-sm border border-slate-200 bg-white px-2.5 text-slate-800 font-bold placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-xs"
          type="number" min="0" value={students}
          aria-label={`عدد طلاب ${level} ${gender}`}
          placeholder="عدد الطلاب"
          onChange={(e) => onUpdate(index, "students", e.target.value)}
        />
      </div>
    </div>
  );
}
