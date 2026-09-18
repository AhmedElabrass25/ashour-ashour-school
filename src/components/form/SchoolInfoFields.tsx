import { DropdownFieldInput, Field } from "./FormField";

export function SchoolInfoFields() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      <Field
        label="اسم المدرسة"
        name="schoolName"
        required
        placeholder="اكتب اسم المدرسة بالكامل"
      />
      <Field
        label="الكود التعريفي للمدرسة"
        name="schoolCode"
        placeholder="مثال: SCH-001"
      />
      <DropdownFieldInput
        label="نوع المدرسة"
        name="schoolType"
        options={["إعدادي", "تعليم أساسي", "متعدد المراحل"]}
      />
      <DropdownFieldInput
        label="النطاق الجغرافي"
        name="area"
        options={["حضر", "ريف"]}
      />
      <DropdownFieldInput
        label="نظام الدراسة"
        name="shift"
        options={["صباحية", "مسائية", "ممتدة", "يوم كامل"]}
      />
      <Field
        label="عدد الفراغات الصالحة للفصول"
        name="availableSpaces"
        type="number"
        placeholder="0"
      />
      <Field
        label="عدد خراطيم الحريق"
        name="fireHoses"
        type="number"
        placeholder="0"
      />
      <Field
        label="عدد خزانات المياه"
        name="waterTanks"
        type="number"
        placeholder="0"
      />
      <DropdownFieldInput
        label="صلاحية خزانات المياه"
        name="waterTanksStatus"
        options={["صالح", "غير صالح"]}
      />
      <Field
        label="عدد حنفيات الحريق"
        name="fireHydrants"
        type="number"
        placeholder="0"
      />
    </div>
  );
}
