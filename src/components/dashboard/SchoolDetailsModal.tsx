import { useState } from "react";
import type { Submission } from "../../types";
import { DetailsField, DetailsSelect } from "./DetailsField";
import { StudentRowsEditor } from "./StudentRowsEditor";
import { Dialog, DialogContent } from "../ui/dialog";
import { ArrowRight, Trash2 } from "lucide-react";

type SchoolDetailsModalProps = {
  item: Submission;
  onClose: () => void;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete?: (id: number) => void | Promise<void>;
};

export function SchoolDetailsModal({
  item,
  onClose,
  onUpdate,
  onDelete,
}: SchoolDetailsModalProps) {
  const [draft, setDraft] = useState(item);
  
  const set = (changes: Partial<Submission>) =>
    setDraft((current) => ({ ...current, ...changes }));
    
  const save = async () => {
    await onUpdate(draft.id, draft);
    onClose();
  };

  const remove = async () => {
    if (window.confirm("هل تريد حذف هذه المدرسة نهائيًا؟")) {
      if (onDelete) {
        await onDelete(draft.id);
      }
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-none sm:max-w-none p-0 bg-white" dir="rtl">
        {/* Sticky header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-white border-b border-slate-200 shrink-0 shadow-2xs">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-slate-300 bg-slate-100 text-slate-800 text-sm font-bold hover:bg-slate-200 transition-colors shadow-2xs shrink-0"
            >
              <ArrowRight size={16} />
              رجوع
            </button>
            <div className="min-w-0">
              <span className="text-blue-700 font-bold text-xs uppercase tracking-wider block">
                تعديل تفاصيل المدرسة
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 m-0 leading-tight truncate">
                {draft.schoolName}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {onDelete && (
              <button
                type="button"
                className="px-4 py-2.5 h-10 rounded-sm bg-red-50 text-red-600 border border-red-200 text-xs sm:text-sm font-bold hover:bg-red-100 transition-colors inline-flex items-center gap-1.5"
                onClick={remove}
              >
                <Trash2 size={16} />
                <span>حذف</span>
              </button>
            )}
            <button
              className="px-4 py-2.5 h-10 rounded-sm border border-slate-300 bg-white text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors hidden sm:inline-flex"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              className="px-5 py-2.5 h-10 rounded-sm bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors shadow-2xs"
              onClick={save}
            >
              حفظ التعديلات
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <div className="w-full max-w-5xl mx-auto">
            {/* School info */}
            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-blue-600 inline-block"></span>
              بيانات المدرسة الأساسية
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 border border-slate-200 p-5 rounded-sm">
              <DetailsField
                label="اسم المدرسة"
                value={draft.schoolName}
                onChange={(value) => set({ schoolName: value })}
              />
              <DetailsField
                label="الكود التعريفي للمدرسة"
                value={draft.schoolCode || ""}
                onChange={(value) => set({ schoolCode: value })}
              />
              <DetailsField
                label="الفراغات الصالحة"
                type="number"
                value={draft.availableSpaces || 0}
                onChange={(value) => set({ availableSpaces: Number(value) })}
              />
              <DetailsField
                label="عدد خراطيم الحريق"
                type="number"
                value={draft.fireHoses || 0}
                onChange={(value) => set({ fireHoses: Number(value) })}
              />
              <DetailsField
                label="عدد خزانات المياه"
                type="number"
                value={draft.waterTanks || 0}
                onChange={(value) => set({ waterTanks: Number(value) })}
              />
              <DetailsSelect
                label="صلاحية خزانات المياه"
                value={draft.waterTanksStatus || "صالح"}
                options={["صالح", "غير صالح"]}
                onChange={(value) => set({ waterTanksStatus: value })}
              />
              <DetailsField
                label="عدد حنفيات الحريق"
                type="number"
                value={draft.fireHydrants || 0}
                onChange={(value) => set({ fireHydrants: Number(value) })}
              />
              <DetailsSelect
                label="نوع المدرسة"
                value={draft.schoolType}
                options={["إعدادي", "تعليم أساسي", "متعدد المراحل"]}
                onChange={(value) => set({ schoolType: value })}
              />
              <DetailsSelect
                label="النطاق"
                value={draft.area}
                options={["حضر", "ريف"]}
                onChange={(value) => set({ area: value })}
              />
              <DetailsSelect
                label="الفترة"
                value={draft.shift}
                options={["صباحية", "مسائية", "ممتدة", "يوم كامل"]}
                onChange={(value) => set({ shift: value })}
              />
            </div>

            {/* Principal info */}
            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
              <span className="w-1.5 h-6 rounded-full bg-emerald-600 inline-block"></span>
              بيانات المدير
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 border border-slate-200 p-5 rounded-sm">
              <DetailsField
                label="اسم المدير"
                value={draft.principal}
                onChange={(value) => set({ principal: value })}
              />
              <DetailsField
                label="كود المدير"
                value={draft.principalCode || ""}
                onChange={(value) => set({ principalCode: value })}
              />
              <DetailsField
                label="الرقم القومي"
                value={draft.principalNationalId || ""}
                onChange={(value) => set({ principalNationalId: value })}
              />
              <DetailsField
                label="الهاتف"
                value={draft.principalPhone || ""}
                onChange={(value) => set({ principalPhone: value })}
              />
              <DetailsSelect
                label="طبيعة العمل"
                value={draft.principalType || "أصلي"}
                options={["أصلي", "مكلف"]}
                onChange={(value) => set({ principalType: value })}
              />
              <DetailsSelect
                label="الحالة"
                value={draft.status}
                options={["مراجعة", "مكتمل"]}
                onChange={(value) => set({ status: value })}
              />
            </div>

            {/* Deputy info */}
            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
              <span className="w-1.5 h-6 rounded-full bg-amber-500 inline-block"></span>
              بيانات الوكيل
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 border border-slate-200 p-5 rounded-sm">
              <DetailsField
                label="اسم الوكيل"
                value={draft.deputyName || ""}
                onChange={(value) => set({ deputyName: value })}
              />
              <DetailsField
                label="كود الوكيل"
                value={draft.deputyCode || ""}
                onChange={(value) => set({ deputyCode: value })}
              />
              <DetailsField
                label="الرقم القومي"
                value={draft.deputyNationalId || ""}
                onChange={(value) => set({ deputyNationalId: value })}
              />
              <DetailsField
                label="الهاتف"
                value={draft.deputyPhone || ""}
                onChange={(value) => set({ deputyPhone: value })}
              />
              <DetailsSelect
                label="طبيعة العمل"
                value={draft.deputyType || "أصلي"}
                options={["أصلي", "مكلف"]}
                onChange={(value) => set({ deputyType: value })}
              />
            </div>

            {/* Students */}
            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
              <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block"></span>
              الطلاب والفصول
            </h3>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm">
              <StudentRowsEditor
                rows={draft.studentRows || []}
                onChange={(studentRows) => set({ studentRows })}
              />
            </div>
          </div>
        </div>

        {/* Sticky bottom bar (mobile) */}
        <div className="sm:hidden sticky bottom-0 z-10 flex items-center gap-2 px-4 py-3 bg-white border-t border-slate-200 shrink-0">
          <button
            className="flex-1 px-4 py-2.5 h-11 rounded-sm border border-slate-300 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="flex-1 px-4 py-2.5 h-11 rounded-sm bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-2xs"
            onClick={save}
          >
            حفظ التعديلات
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
