import { useState, useEffect } from "react";
import { DownloadCloud, Loader2, SearchX, ServerCrash, ChevronRight, ChevronLeft } from "lucide-react";
import type { Submission } from "../../types";
import { DashboardStats } from "./DashboardStats";
import { DashboardToolbar } from "./DashboardToolbar";
import { SubmissionsTable } from "./SubmissionsTable";
import { SchoolDetailsModal } from "./SchoolDetailsModal";
import { exportSchoolsToExcel } from "../../lib/exportSchools";

const PAGE_SIZE = 6;

type DashboardProps = {
  submissions: Submission[];
  filter: string;
  setFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
  loading: boolean;
  loadError: string;
};

export function Dashboard({
  submissions,
  filter,
  setFilter,
  typeFilter,
  setTypeFilter,
  onUpdate,
  onDelete,
  loading,
  loadError,
}: DashboardProps) {
  const [selectedSchool, setSelectedSchool] = useState<Submission | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, typeFilter, submissions.length]);

  const totalPages = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE));
  const pagedSubmissions = submissions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-12">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mt-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            أهلًا بك، الأستاذ عاشور السيد <span className="text-amber-500">✦</span>
          </h2>
          <p className="text-slate-600 font-semibold text-base sm:text-lg">
            إدارة التعليم الإعدادي بسمنود — متابعة وتعديل بيانات المدارس
          </p>
        </div>
        <button
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-700 px-5 py-3 text-base font-bold text-white shadow-xs transition-colors disabled:opacity-50 w-full sm:w-auto"
          onClick={() => exportSchoolsToExcel(submissions)}
          disabled={loading || submissions.length === 0}
        >
          <DownloadCloud size={18} /> <span>تصدير ملف Excel</span>
        </button>
      </div>

      <DashboardStats submissions={submissions} />

      {/* State Messages */}
      {loading && (
        <div className="flex items-center gap-3 rounded-sm border border-blue-200 bg-blue-50/70 p-5 text-blue-900 shadow-2xs">
          <Loader2 className="animate-spin text-blue-600 shrink-0" size={22} />
          <strong className="font-bold text-base md:text-lg">جاري تحميل بيانات المدارس، يرجى الانتظار...</strong>
        </div>
      )}
      {!loading && loadError && (
        <div className="flex items-center gap-3 rounded-sm border border-red-200 bg-red-50 p-5 text-red-900 shadow-2xs">
           <ServerCrash className="text-red-600 shrink-0" size={24} />
           <div className="flex flex-col">
              <strong className="font-bold text-base md:text-lg">تعذر تحميل البيانات</strong>
              <span className="text-sm font-medium opacity-90">{loadError}</span>
           </div>
        </div>
      )}
      {!loading && !loadError && submissions.length === 0 && (
        <div className="flex items-center justify-center gap-3 rounded-sm border border-slate-200 bg-white p-10 text-slate-600 shadow-2xs flex-col text-center">
            <div className="w-14 h-14 rounded-sm bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
              <SearchX size={28} />
            </div>
            <strong className="text-lg md:text-xl font-bold text-slate-800">لا توجد بيانات مدارس بعد</strong>
            <span className="text-sm text-slate-500 font-medium">أرسل أول نموذج من رابط <b>رابط المشاركة</b> العام.</span>
        </div>
      )}

      {/* Table Section */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              البيانات الواردة للمدارس
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              اضغط على أي مدرسة لمراجعة وتعديل بياناتها فورًا
            </p>
          </div>
          {submissions.length > 0 && (
            <span className="text-sm font-semibold text-slate-500">
              {submissions.length} مدرسة · صفحة {currentPage} من {totalPages}
            </span>
          )}
        </div>
        
        <DashboardToolbar
          filter={filter}
          setFilter={setFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        
        <SubmissionsTable submissions={pagedSubmissions} onOpen={(item) => setSelectedSchool(item)} />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2 flex-wrap">
            <button
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-sm border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
            >
              <ChevronRight size={16} />
              <span className="hidden sm:inline">السابق</span>
            </button>

            <div className="flex items-center gap-1 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm text-xs sm:text-sm font-bold transition-colors shadow-2xs ${
                    page === currentPage
                      ? "bg-blue-600 text-white border border-blue-600"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                  }`}
                  aria-label={`صفحة ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-sm border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              aria-label="الصفحة التالية"
            >
              <span className="hidden sm:inline">التالي</span>
              <ChevronLeft size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal Direct Open */}
      {selectedSchool && (
        <SchoolDetailsModal
          item={selectedSchool}
          onClose={() => setSelectedSchool(null)}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
