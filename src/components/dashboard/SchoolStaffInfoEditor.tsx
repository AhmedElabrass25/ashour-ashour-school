import type { Submission } from "../../types";
import { DetailsField, DetailsSelect } from "./DetailsField";

type Props = {
  draft: Submission;
  onChange: (changes: Partial<Submission>) => void;
};

export function SchoolStaffInfoEditor({ draft, onChange }: Props) {
  return (
    <>
      {/* Principal info */}
      <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5 border-t border-slate-200 pt-6">
        <span className="w-1.5 h-6 rounded-full bg-emerald-600 inline-block"></span>
        بيانات المدير
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 border border-slate-200 p-5 rounded-sm">
        <DetailsField
          label="اسم المدير"
          value={draft.principal}
          onChange={(value) => onChange({ principal: value })}
        />
        <DetailsField
          label="كود المدير"
          value={draft.principalCode || ""}
          onChange={(value) => onChange({ principalCode: value })}
        />
        <DetailsField
          label="الرقم القومي"
          value={draft.principalNationalId || ""}
          onChange={(value) => onChange({ principalNationalId: value })}
        />
        <DetailsField
          label="الهاتف"
          value={draft.principalPhone || ""}
          onChange={(value) => onChange({ principalPhone: value })}
        />
        <DetailsSelect
          label="طبيعة العمل"
          value={draft.principalType || "أصلي"}
          options={["أصلي", "مكلف"]}
          onChange={(value) => onChange({ principalType: value })}
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
          onChange={(value) => onChange({ deputyName: value })}
        />
        <DetailsField
          label="كود الوكيل"
          value={draft.deputyCode || ""}
          onChange={(value) => onChange({ deputyCode: value })}
        />
        <DetailsField
          label="الرقم القومي"
          value={draft.deputyNationalId || ""}
          onChange={(value) => onChange({ deputyNationalId: value })}
        />
        <DetailsField
          label="الهاتف"
          value={draft.deputyPhone || ""}
          onChange={(value) => onChange({ deputyPhone: value })}
        />
        <DetailsSelect
          label="طبيعة العمل"
          value={draft.deputyType || "أصلي"}
          options={["أصلي", "مكلف"]}
          onChange={(value) => onChange({ deputyType: value })}
        />
      </div>
    </>
  );
}
