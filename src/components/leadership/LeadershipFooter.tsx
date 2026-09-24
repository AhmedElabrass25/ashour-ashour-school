import { ChevronLeft, School } from "lucide-react";

export function LeadershipFooter({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  return (
    <footer className="bg-white border-t border-slate-200 py-10" dir="rtl">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-blue-50 border border-blue-200 text-blue-600">
            <School size={18} />
          </span>
          <div>
            <strong className="block text-sm font-bold text-slate-800">الإدارة التعليمية</strong>
            <small className="block text-xs text-slate-500">إدارة سمنود · القيادة</small>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
          onClick={onGoToDashboard}
        >
          لوحة البيانات <ChevronLeft size={14} />
        </button>
        <p className="text-xs text-slate-500 font-medium">جميع الحقوق محفوظة © ٢٠٢٦</p>
      </div>
    </footer>
  );
}
