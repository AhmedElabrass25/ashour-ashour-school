import type { Submission } from "../../types";
import { Edit2 } from "lucide-react";
import { SchoolSafetyAlertBadge } from "./SchoolSafetyAlertBadge";

type Props = {
  submissions: Submission[];
  onOpen: (item: Submission) => void;
};

export function MobileSubmissionsCards({ submissions, onOpen }: Props) {
  return (
    <div className="md:hidden flex flex-col gap-3.5">
      {submissions.map((item) => (
        <article
          className="bg-white border border-slate-200 rounded-sm p-4 shadow-sm flex flex-col gap-3.5 cursor-pointer active:scale-[0.99] transition-transform"
          key={item.id}
          onClick={() => onOpen(item)}
        >
          <div className="flex justify-between items-start gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block">
                  {item.schoolType}
                </span>
                <SchoolSafetyAlertBadge school={item} />
              </div>
              <h3 className="text-slate-900 text-lg font-bold leading-tight">
                {item.schoolName}
              </h3>
            </div>
            <span
              className={
                item.status === "مكتمل"
                  ? "shrink-0 inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300"
                  : "shrink-0 inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300"
              }
            >
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold mb-0.5">المدير</span>
              <b className="text-slate-800 font-bold text-sm">{item.principal}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold mb-0.5">النطاق</span>
              <b className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 block shrink-0" />
                {item.area}
              </b>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold mb-0.5">الفترة</span>
              <b className="text-slate-800 font-bold text-sm">{item.shift}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold mb-0.5">إجمالي الطلاب</span>
              <b className="text-blue-700 font-bold text-base">{item.students.toLocaleString('ar-EG')}</b>
            </div>
          </div>

          <button
            className="mt-1 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-sm text-sm font-bold transition-colors shadow-2xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
          >
            <Edit2 size={16} /> تعديل بيانات المدرسة
          </button>
        </article>
      ))}
    </div>
  );
}
