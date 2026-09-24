import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Submission } from "../../types";
import { SchoolDetailsModal } from "./SchoolDetailsModal";
import { ArrowRight, CheckCircle2, Edit, Trash2 } from "lucide-react";
import { DeputyInfoSection, PrincipalInfoSection, SchoolInfoSection } from "./SchoolDetailsPageSections";
import { StudentRowsSection } from "./StudentRowsSection";
import { SchoolSafetyAlertBanner } from "./SchoolSafetyAlertBanner";

type SchoolDetailsPageProps = {
  item: Submission;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
};

export function SchoolDetailsPage({ item, onUpdate, onDelete }: SchoolDetailsPageProps) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const remove = async () => {
    if (window.confirm("هل تريد حذف هذه المدرسة نهائيًا؟")) {
      await onDelete(item.id);
      setNotice("تم حذف المدرسة بنجاح");
      window.setTimeout(() => navigate("/dashboard"), 1200);
    }
  };

  const save = async (id: number, changes: Partial<Submission>) => {
    await onUpdate(id, changes);
    setEditing(false);
    setNotice("تم حفظ التعديلات بنجاح");
    window.setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12" dir="rtl">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-sm transition-colors hover:bg-blue-100 w-fit cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowRight size={14} /> العودة للمدارس
          </button>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              onClick={() => setEditing(true)}
            >
              <Edit size={14} /> تعديل البيانات
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-sm bg-white text-red-600 border border-slate-200 text-xs font-bold hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
              onClick={remove}
            >
              <Trash2 size={14} /> حذف
            </button>
          </div>
        </div>

        <SchoolSafetyAlertBanner school={item} />

        <div className="bg-white border border-slate-200 rounded-sm p-5 md:p-6 shadow-2xs mb-6">
          <span className="inline-block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 bg-slate-100 px-2 py-0.5 rounded-sm">
            ملف المدرسة الكامل
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
            {item.schoolName}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">{item.schoolType}</span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">{item.area}</span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">{item.shift}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-sm border ${item.status === 'مكتمل' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              {item.status}
            </span>
          </div>
        </div>

        <SchoolInfoSection item={item} />
        <PrincipalInfoSection item={item} />
        <DeputyInfoSection item={item} />
        <StudentRowsSection item={item} />

        {notice && (
          <div className="fixed z-50 left-0 right-0 bottom-6 mx-auto w-fit max-w-[90vw] flex items-center gap-2.5 py-2.5 px-4 rounded-sm text-white shadow-md bg-emerald-600 animate-[toast-in_0.3s_ease-out]">
            <CheckCircle2 size={18} />
            <strong className="text-xs font-bold">{notice}</strong>
          </div>
        )}

        {editing && <SchoolDetailsModal item={item} onClose={() => setEditing(false)} onUpdate={save} />}
      </div>
    </div>
  );
}
