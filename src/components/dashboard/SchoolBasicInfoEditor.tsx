import type { Submission } from "../../types";
import { DetailsField, DetailsSelect } from "./DetailsField";
import { SCHOOL_NAMES } from "../../data/schoolData";

type Props = {
  draft: Submission;
  onChange: (changes: Partial<Submission>) => void;
};

export function SchoolBasicInfoEditor({ draft, onChange }: Props) {
  return (
    <>
      <h3 className="text-slate-900 text-base sm:text-lg font-bold mb-4 flex items-center gap-2.5">
        <span className="w-1.5 h-6 rounded-full bg-blue-600 inline-block"></span>
        بيانات المدرسة الأساسية
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 border border-slate-200 p-5 rounded-sm">
        <DetailsSelect
          label="اسم المدرسة"
          value={draft.schoolName}
          options={SCHOOL_NAMES}
          onChange={(value) => onChange({ schoolName: value })}
        />
        <DetailsField
          label="الكود التعريفي للمدرسة"
          value={draft.schoolCode || ""}
          onChange={(value) => onChange({ schoolCode: value })}
        />
        <DetailsField
          label="الفراغات الصالحة"
          type="number"
          value={draft.availableSpaces || 0}
          onChange={(value) => onChange({ availableSpaces: Number(value) })}
        />
        <DetailsField
          label="عدد خراطيم الحريق"
          type="number"
          value={draft.fireHoses || 0}
          onChange={(value) => onChange({ fireHoses: Number(value) })}
        />
        <DetailsField
          label="عدد خزانات المياه"
          type="number"
          value={draft.waterTanks || 0}
          onChange={(value) => onChange({ waterTanks: Number(value) })}
        />
        <DetailsSelect
          label="صلاحية خزانات المياه"
          value={draft.waterTanksStatus || "صالح"}
          options={["صالح", "غير صالح"]}
          onChange={(value) => onChange({ waterTanksStatus: value })}
        />
        <DetailsField
          label="عدد حنفيات الحريق"
          type="number"
          value={draft.fireHydrants || 0}
          onChange={(value) => onChange({ fireHydrants: Number(value) })}
        />
        <DetailsSelect
          label="نوع المدرسة"
          value={draft.schoolType}
          options={["إعدادي", "تعليم أساسي", "متعدد المراحل"]}
          onChange={(value) => onChange({ schoolType: value })}
        />
        <DetailsSelect
          label="النطاق"
          value={draft.area}
          options={["حضر", "ريف"]}
          onChange={(value) => onChange({ area: value })}
        />
        <DetailsSelect
          label="الفترة"
          value={draft.shift}
          options={["صباحية", "مسائية", "ممتدة", "يوم كامل"]}
          onChange={(value) => onChange({ shift: value })}
        />
      </div>
    </>
  );
}
