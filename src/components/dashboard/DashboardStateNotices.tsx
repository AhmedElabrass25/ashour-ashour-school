import { ChevronLeft, ChevronRight, Loader2, SearchX, ServerCrash } from "lucide-react";

type NoticesProps = {
  loading: boolean;
  loadError: string;
  count: number;
};

export function DashboardStateNotices({ loading, loadError, count }: NoticesProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-sm border border-blue-200 bg-blue-50/70 p-5 text-blue-900 shadow-2xs">
        <Loader2 className="animate-spin text-blue-600 shrink-0" size={22} />
        <strong className="font-bold text-base md:text-lg">جاري تحميل بيانات المدارس، يرجى الانتظار...</strong>
      </div>
    );
  }
  if (loadError) {
    return (
      <div className="flex items-center gap-3 rounded-sm border border-red-200 bg-red-50 p-5 text-red-900 shadow-2xs">
        <ServerCrash className="text-red-600 shrink-0" size={24} />
        <div className="flex flex-col">
          <strong className="font-bold text-base md:text-lg">تعذر تحميل البيانات</strong>
          <span className="text-sm font-medium opacity-90">{loadError}</span>
        </div>
      </div>
    );
  }
  if (count === 0) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-sm border border-slate-200 bg-white p-10 text-slate-600 shadow-2xs flex-col text-center">
        <div className="w-14 h-14 rounded-sm bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
          <SearchX size={28} />
        </div>
        <strong className="text-lg md:text-xl font-bold text-slate-800">لا توجد بيانات مدارس بعد</strong>
        <span className="text-sm text-slate-500 font-medium">أرسل أول نموذج من رابط <b>رابط المشاركة</b> العام.</span>
      </div>
    );
  }
  return null;
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function DashboardPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2 flex-wrap">
      <button
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-sm border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm text-xs sm:text-sm font-bold transition-colors shadow-2xs cursor-pointer ${
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
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-sm border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="الصفحة التالية"
      >
        <span className="hidden sm:inline">التالي</span>
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}
