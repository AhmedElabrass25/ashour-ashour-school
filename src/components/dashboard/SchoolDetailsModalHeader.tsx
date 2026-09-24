import { ArrowRight, Trash2 } from "lucide-react";

type Props = {
  schoolName: string;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
};

export function SchoolDetailsModalHeader({ schoolName, onClose, onSave, onDelete }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shrink-0 shadow-2xs">
      <div className="flex items-center justify-between gap-2 px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-sm border border-slate-300 bg-slate-100 text-slate-800 text-sm font-bold hover:bg-slate-200 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <ArrowRight size={15} />
            <span className="hidden xs:inline">رجوع</span>
          </button>
          <div className="min-w-0 hidden sm:block">
            <span className="text-blue-700 font-bold text-xs uppercase tracking-wider block">
              تعديل
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 m-0 leading-tight truncate">
              {schoolName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onDelete && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 h-9 sm:h-10 rounded-sm bg-red-50 text-red-600 border border-red-200 text-xs sm:text-sm font-bold hover:bg-red-100 transition-colors cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">حذف</span>
            </button>
          )}
          <button
            className="hidden sm:inline-flex px-4 py-2 h-10 rounded-sm border border-slate-300 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 h-9 sm:h-10 rounded-sm bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            onClick={onSave}
          >
            حفظ التعديلات
          </button>
        </div>
      </div>

      <div className="sm:hidden px-4 pb-2.5 flex items-center gap-1.5">
        <span className="text-blue-700 font-bold text-[10px] uppercase tracking-wider shrink-0">تعديل:</span>
        <span className="text-slate-800 font-bold text-sm truncate">{schoolName}</span>
      </div>
    </div>
  );
}
