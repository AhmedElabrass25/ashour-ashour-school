import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";

type FilterDropdownsProps = {
  typeFilter: string; setTypeFilter: (value: string) => void;
  statusFilter: string; setStatusFilter: (value: string) => void;
  areaFilter: string; setAreaFilter: (value: string) => void;
  isFiltered: boolean; onReset: () => void;
};

const btnCls = "h-11 w-full sm:w-auto bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 text-slate-800 rounded-sm px-3.5 flex items-center justify-between gap-2.5 text-xs md:text-sm font-bold shadow-2xs transition-colors cursor-pointer outline-none";

export function FilterDropdowns({ typeFilter, setTypeFilter, statusFilter, setStatusFilter, areaFilter, setAreaFilter, isFiltered, onReset }: FilterDropdownsProps) {
  return (
    <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
      <DropdownMenu trigger={
        <button type="button" className={`${btnCls} min-w-[150px]`}>
          <span className="flex items-center gap-2 truncate"><Filter size={15} className="text-slate-500 shrink-0" />{typeFilter === "الكل" ? "نوع المدرسة" : typeFilter}</span>
          <ChevronDown size={15} className="text-slate-500 shrink-0" />
        </button>
      }>
        {["الكل", "إعدادي", "تعليم أساسي", "متعدد المراحل"].map((o) => (
          <DropdownMenuItem key={o} onClick={() => setTypeFilter(o)}>{o === "الكل" ? "جميع الأنواع" : o}</DropdownMenuItem>
        ))}
      </DropdownMenu>

      <DropdownMenu trigger={
        <button type="button" className={`${btnCls} min-w-[140px]`}>
          <span className="flex items-center gap-2 truncate">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusFilter === 'مكتمل' ? 'bg-emerald-500' : statusFilter === 'مراجعة' ? 'bg-amber-500' : 'bg-slate-400'}`} />
            {statusFilter === "الكل" ? "حالة البيان" : statusFilter}
          </span>
          <ChevronDown size={15} className="text-slate-500 shrink-0" />
        </button>
      }>
        {["الكل", "مكتمل", "مراجعة"].map((o) => (
          <DropdownMenuItem key={o} onClick={() => setStatusFilter(o)}>{o === "الكل" ? "جميع الحالات" : o}</DropdownMenuItem>
        ))}
      </DropdownMenu>

      <DropdownMenu trigger={
        <button type="button" className={`${btnCls} min-w-[130px]`}>
          <span className="flex items-center gap-2 truncate">{areaFilter === "الكل" ? "النطاق الجغرافي" : areaFilter}</span>
          <ChevronDown size={15} className="text-slate-500 shrink-0" />
        </button>
      }>
        {["الكل", "حضر", "ريف"].map((o) => (
          <DropdownMenuItem key={o} onClick={() => setAreaFilter(o)}>{o === "الكل" ? "جميع النطاقات" : o}</DropdownMenuItem>
        ))}
      </DropdownMenu>

      {isFiltered && (
        <button onClick={onReset} className="h-11 w-full sm:w-auto px-3.5 rounded-sm border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-2xs cursor-pointer" type="button" title="إعادة ضبط الفلاتر">
          <RotateCcw size={14} /><span>إلغاء الفلاتر</span>
        </button>
      )}
    </div>
  );
}
