import { ChevronDown, Filter, RotateCcw, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";

type DashboardToolbarProps = {
  filter: string;
  setFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
};

export function DashboardToolbar({
  filter,
  setFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  areaFilter,
  setAreaFilter,
}: DashboardToolbarProps) {
  const isFiltered = filter !== "" || typeFilter !== "الكل" || statusFilter !== "الكل" || areaFilter !== "الكل";

  const resetFilters = () => {
    setFilter("");
    setTypeFilter("الكل");
    setStatusFilter("الكل");
    setAreaFilter("الكل");
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-2 w-full">
      {/* Search Input */}
      <label className="flex-1 w-full bg-white border border-slate-300 rounded-sm flex items-center px-3.5 h-11 text-slate-500 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:text-blue-600 shadow-2xs">
        <Search size={18} aria-hidden="true" />
        <input
          className="border-none outline-none w-full py-2 px-3 text-sm font-semibold text-slate-900 bg-transparent placeholder-slate-400"
          placeholder="ابحث باسم المدرسة، الكود، أو المدير..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        {filter && (
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            type="button"
            onClick={() => setFilter("")}
            aria-label="مسح البحث"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </label>
      
      {/* Filters Dropdowns - Responsive Grid on Mobile / Flex on Desktop */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
        {/* Type Filter */}
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="h-11 w-full sm:w-auto min-w-[150px] bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 text-slate-800 rounded-sm px-3.5 flex items-center justify-between gap-2.5 text-xs md:text-sm font-bold shadow-2xs transition-colors cursor-pointer outline-none"
            >
              <span className="flex items-center gap-2 truncate">
                <Filter size={15} className="text-slate-500 shrink-0" />
                {typeFilter === "الكل" ? "نوع المدرسة" : typeFilter}
              </span>
              <ChevronDown size={15} className="text-slate-500 shrink-0" />
            </button>
          }
        >
          {["الكل", "إعدادي", "تعليم أساسي", "متعدد المراحل"].map((option) => (
            <DropdownMenuItem key={option} onClick={() => setTypeFilter(option)}>
              {option === "الكل" ? "جميع الأنواع" : option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="h-11 w-full sm:w-auto min-w-[140px] bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 text-slate-800 rounded-sm px-3.5 flex items-center justify-between gap-2.5 text-xs md:text-sm font-bold shadow-2xs transition-colors cursor-pointer outline-none"
            >
              <span className="flex items-center gap-2 truncate">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusFilter === 'مكتمل' ? 'bg-emerald-500' : statusFilter === 'مراجعة' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                {statusFilter === "الكل" ? "حالة البيان" : statusFilter}
              </span>
              <ChevronDown size={15} className="text-slate-500 shrink-0" />
            </button>
          }
        >
          {["الكل", "مكتمل", "مراجعة"].map((option) => (
            <DropdownMenuItem key={option} onClick={() => setStatusFilter(option)}>
              {option === "الكل" ? "جميع الحالات" : option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>

        {/* Area Filter */}
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="h-11 w-full sm:w-auto min-w-[130px] bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 text-slate-800 rounded-sm px-3.5 flex items-center justify-between gap-2.5 text-xs md:text-sm font-bold shadow-2xs transition-colors cursor-pointer outline-none"
            >
              <span className="flex items-center gap-2 truncate">
                {areaFilter === "الكل" ? "النطاق الجغرافي" : areaFilter}
              </span>
              <ChevronDown size={15} className="text-slate-500 shrink-0" />
            </button>
          }
        >
          {["الكل", "حضر", "ريف"].map((option) => (
            <DropdownMenuItem key={option} onClick={() => setAreaFilter(option)}>
              {option === "الكل" ? "جميع النطاقات" : option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>

        {/* Reset Button */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="h-11 w-full sm:w-auto px-3.5 rounded-sm border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            type="button"
            title="إعادة ضبط الفلاتر"
          >
            <RotateCcw size={14} />
            <span>إلغاء الفلاتر</span>
          </button>
        )}
      </div>
    </div>
  );
}
