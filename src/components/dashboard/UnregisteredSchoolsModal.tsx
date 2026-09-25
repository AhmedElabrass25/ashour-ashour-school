import { useState } from "react";
import { X, Search, School, Building2 } from "lucide-react";
import { SCHOOL_NAMES } from "../../data/schoolData";
import type { Submission } from "../../types";

type Props = {
  submissions: Submission[];
  onClose: () => void;
};

export function UnregisteredSchoolsModal({ submissions, onClose }: Props) {
  const [search, setSearch] = useState("");

  const registeredSet = new Set(
    submissions.map((s) => s.schoolName.trim().toLowerCase())
  );

  const unregisteredSchools = SCHOOL_NAMES.filter(
    (name) => !registeredSet.has(name.trim().toLowerCase())
  );

  const filtered = unregisteredSchools.filter((name) =>
    name.includes(search.trim())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-sm border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-sm bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <School size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                المدارس المتبقية (لم تسجّل بعد)
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي {unregisteredSchools.length} مدرسة من أصل {SCHOOL_NAMES.length} مدرسة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="ابحث عن مدرسة غير مسجلة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold text-slate-900 outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm font-semibold">
              {search ? "لا توجد نتائج تطابق بحثك" : "🎉 جميع المدارس قامت بالتسجيل!"}
            </div>
          ) : (
            filtered.map((schoolName, idx) => (
              <div
                key={schoolName}
                className="pt-2 first:pt-0 flex items-center justify-between text-sm font-bold text-slate-800 hover:bg-slate-50 p-2 rounded-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2 size={16} className="text-slate-400" />
                    {schoolName}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  بانتظار التسجيل
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
