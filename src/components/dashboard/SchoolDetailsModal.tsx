import { useState } from "react";
import type { Submission } from "../../types";
import { DetailsSelect } from "./DetailsField";
import { StudentRowsEditor } from "./StudentRowsEditor";
import { SchoolBasicInfoEditor } from "./SchoolBasicInfoEditor";
import { SchoolStaffInfoEditor } from "./SchoolStaffInfoEditor";
import { SchoolDetailsModalHeader } from "./SchoolDetailsModalHeader";
import { Dialog, DialogContent } from "../ui/dialog";
import { SchoolSafetyAlertBanner } from "./SchoolSafetyAlertBanner";

type SchoolDetailsModalProps = {
  item: Submission;
  onClose: () => void;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete?: (id: number) => void | Promise<void>;
};

export function SchoolDetailsModal({ item, onClose, onUpdate, onDelete }: SchoolDetailsModalProps) {
  const [draft, setDraft] = useState(item);

  const set = (changes: Partial<Submission>) => setDraft((current) => ({ ...current, ...changes }));

  const save = async () => {
    await onUpdate(draft.id, draft);
    onClose();
  };

  const remove = async () => {
    if (window.confirm("هل تريد حذف هذه المدرسة نهائيًا؟")) {
      if (onDelete) await onDelete(draft.id);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-none sm:max-w-none p-0 bg-white" dir="rtl">
        <SchoolDetailsModalHeader
          schoolName={draft.schoolName}
          onClose={onClose}
          onSave={save}
          onDelete={onDelete ? remove : undefined}
        />

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <div className="w-full max-w-5xl mx-auto">
            <SchoolSafetyAlertBanner school={draft} />
            <SchoolBasicInfoEditor draft={draft} onChange={set} />
            <SchoolStaffInfoEditor draft={draft} onChange={set} />

            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
              <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block"></span>
              الطلاب والفصول
            </h3>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm mb-8">
              <StudentRowsEditor
                rows={draft.studentRows || []}
                onChange={(studentRows) => set({ studentRows })}
              />
            </div>

            <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
              <span className="w-1.5 h-6 rounded-full bg-indigo-600 inline-block"></span>
              حالة مراجعة البيانات
            </h3>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm">
              <DetailsSelect
                label="حالة الطلب"
                value={draft.status}
                options={["مراجعة", "مكتمل"]}
                onChange={(value) => set({ status: value })}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
