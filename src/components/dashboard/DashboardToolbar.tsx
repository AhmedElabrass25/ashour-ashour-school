import { ChevronDown, Filter, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";

type DashboardToolbarProps = {
  filter: string;
  setFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
};

export function DashboardToolbar({
  filter,
  setFilter,
  typeFilter,
  setTypeFilter,
}: DashboardToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-2 w-full">
      <label className="flex-1 w-full sm:max-w-lg bg-white border border-slate-300 rounded-sm flex items-center px-3.5 h-11 text-slate-500 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:text-blue-600 shadow-2xs">
        <Search size={18} aria-hidden="true" />
        <input
          className="border-none outline-none w-full py-2 px-3 text-sm md:text-base font-semibold text-slate-900 bg-transparent placeholder-slate-400"
          placeholder="ابحث باسم المدرسة، الكود، أو اسم المدير..."
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
      
      <div className="flex items-center gap-3 w-full sm:w-auto h-11 shrink-0">
        <DropdownMenu
          trigger={
            <div className="h-full bg-white border border-slate-300 hover:border-slate-400 text-slate-800 rounded-sm px-4 flex items-center gap-2.5 text-sm md:text-base font-bold shadow-2xs transition-colors w-full sm:w-auto justify-between cursor-pointer min-w-[180px]">
              <span className="flex items-center gap-2.5">
                <Filter size={16} className="text-slate-500" aria-hidden="true" />
                {typeFilter === "الكل" ? "كل أنواع المدارس" : typeFilter}
              </span>
              <ChevronDown size={16} className="text-slate-500 shrink-0" aria-hidden="true" />
            </div>
          }
        >
          {["الكل", "إعدادي", "تعليم أساسي", "متعدد المراحل"].map((option) => (
            <DropdownMenuItem key={option} onClick={() => setTypeFilter(option)}>
              {option === "الكل" ? "جميع الأنواع" : option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
}
