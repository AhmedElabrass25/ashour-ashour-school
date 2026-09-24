import { Search, X } from "lucide-react";
import { FilterDropdowns } from "./FilterDropdowns";

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
      <label className="flex-1 w-full bg-white border border-slate-300 rounded-sm flex items-center px-3.5 h-11 text-slate-500 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:text-blue-600 shadow-2xs">
        <Search size={18} aria-hidden="true" />
        <input
          className="border-none outline-none w-full py-2 px-3 text-sm font-semibold text-slate-900 bg-transparent placeholder-slate-400"
          placeholder="ابحث باسم المدرسة، الكود، أو المدير..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        {filter && (
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer" type="button" onClick={() => setFilter("")} aria-label="مسح البحث">
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </label>

      <FilterDropdowns
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        isFiltered={isFiltered}
        onReset={resetFilters}
      />
    </div>
  );
}
