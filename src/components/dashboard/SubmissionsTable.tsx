import type { Submission } from "../../types";
import { Edit2, Building2 } from "lucide-react";

type SubmissionsTableProps = {
  submissions: Submission[];
  onOpen: (item: Submission) => void;
};

export function SubmissionsTable({
  submissions,
  onOpen,
}: SubmissionsTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-sm shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm md:text-base text-slate-700">
            <thead className="bg-slate-100/80 border-b-2 border-slate-200 text-slate-800">
              <tr>
                <th className="py-4 px-5 font-bold text-base md:text-lg text-slate-900 w-1/3">اسم المدرسة</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">النوع</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">النطاق</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">الفترة</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">المدير</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">الطلاب</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800">الحالة</th>
                <th className="py-4 px-5 font-bold text-sm md:text-base text-slate-800 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissions.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                  onClick={() => onOpen(item)}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-bold group-hover:text-blue-700 transition-colors text-base md:text-lg">
                          {item.schoolName}
                        </strong>
                        <span className="text-slate-500 block text-xs md:text-sm mt-0.5 font-medium">
                          كود: {item.schoolCode || "غير مسجل"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-800 text-sm md:text-base">{item.schoolType}</td>
                  <td className="py-4 px-5 font-bold text-slate-800 text-sm md:text-base">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block shrink-0" />
                      {item.area}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-800 text-sm md:text-base">{item.shift}</td>
                  <td className="py-4 px-5 font-bold text-slate-800 text-sm md:text-base">{item.principal}</td>
                  <td className="py-4 px-5 font-bold text-blue-700 text-base md:text-lg tabular-nums">
                    {item.students.toLocaleString('ar-EG')}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={
                        item.status === "مكتمل"
                          ? "inline-flex items-center px-3 py-1 rounded-sm text-xs md:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300"
                          : "inline-flex items-center px-3 py-1 rounded-sm text-xs md:text-sm font-bold text-amber-800 bg-amber-100 border border-amber-300"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold transition-colors shadow-2xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen(item);
                      }}
                    >
                      <Edit2 size={14} /> تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden flex flex-col gap-3.5">
        {submissions.map((item) => (
          <article
            className="bg-white border border-slate-200 rounded-sm p-4 shadow-sm flex flex-col gap-3.5 cursor-pointer active:scale-[0.99] transition-transform"
            key={item.id}
            onClick={() => onOpen(item)}
          >
            <div className="flex justify-between items-start gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-1">
                  {item.schoolType}
                </span>
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
              className="mt-1 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-sm text-sm font-bold transition-colors shadow-2xs"
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
    </>
  );
}
