import { DropdownFieldInput, Field } from "./FormField";

type StaffFieldsProps = { role: "principal" | "deputy" };

export function StaffFields({ role }: StaffFieldsProps) {
  const prefix = role === "principal" ? "principal" : "deputy";
  const label = role === "principal" ? "المدير" : "الوكيل";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      <Field
        label={`اسم ${label}`}
        name={prefix}
        required={role === "principal"}
        placeholder="الاسم رباعي"
      />
      <Field
        label={`كود ${label}`}
        name={`${prefix}Code`}
        placeholder="مثال: PR-102"
      />
      <Field
        label="الرقم القومي"
        name={role === "principal" ? "nationalId" : "deputyNationalId"}
        required={role === "principal"}
        pattern="[0-9]{14}"
        placeholder="١٤ رقمًا"
      />
      <Field
        label="رقم الهاتف"
        name={role === "principal" ? "phone" : "deputyPhone"}
        required={role === "principal"}
        pattern="01[0-9]{9}"
        placeholder="01xxxxxxxxx"
      />
      <DropdownFieldInput
        label="طبيعة العمل"
        name={`${prefix}Type`}
        options={["أصلي", "مكلف"]}
      />
    </div>
  );
}
