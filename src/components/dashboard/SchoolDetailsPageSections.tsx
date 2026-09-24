import { Building2, Shield, UserCircle } from "lucide-react";
import type { Submission } from "../../types";

export function Detail({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex flex-col justify-center min-h-[60px] bg-white p-3.5">
      <small className="text-slate-500 font-semibold text-[11px] mb-1">{label}</small>
      <strong className="text-slate-800 text-xs font-bold truncate leading-tight">
        {value || "غير مسجل"}
      </strong>
    </div>
  );
}

export function SchoolInfoSection({ item }: { item: Submission }) {
  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-2xs mb-4">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
        <Building2 size={16} className="text-blue-600" />
        <h3 className="text-sm font-bold text-slate-800 m-0">بيانات المدرسة</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-slate-100 p-px rounded-b-sm overflow-hidden">
        <Detail label="اسم المدرسة" value={item.schoolName} />
        <Detail label="الكود التعريفي" value={item.schoolCode} />
        <Detail label="نوع المدرسة" value={item.schoolType} />
        <Detail label="النطاق" value={item.area} />
        <Detail label="الفترة" value={item.shift} />
        <Detail label="الفراغات الصالحة" value={item.availableSpaces} />
        <Detail label="خراطيم الحريق" value={item.fireHoses} />
        <Detail label="خزانات المياه" value={item.waterTanks} />
        <Detail label="صلاحية الخزانات" value={item.waterTanksStatus} />
        <Detail label="حنفيات الحريق" value={item.fireHydrants} />
      </div>
    </section>
  );
}

export function PrincipalInfoSection({ item }: { item: Submission }) {
  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-2xs mb-4">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
        <UserCircle size={16} className="text-emerald-600" />
        <h3 className="text-sm font-bold text-slate-800 m-0">بيانات المدير</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 p-px rounded-b-sm overflow-hidden">
        <Detail label="اسم المدير" value={item.principal} />
        <Detail label="كود المدير" value={item.principalCode} />
        <Detail label="الرقم القومي" value={item.principalNationalId} />
        <Detail label="هاتف المدير" value={item.principalPhone} />
        <Detail label="طبيعة العمل" value={item.principalType} />
      </div>
    </section>
  );
}

export function DeputyInfoSection({ item }: { item: Submission }) {
  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-2xs mb-4">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
        <Shield size={16} className="text-amber-600" />
        <h3 className="text-sm font-bold text-slate-800 m-0">بيانات الوكيل</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 p-px rounded-b-sm overflow-hidden">
        <Detail label="اسم الوكيل" value={item.deputyName} />
        <Detail label="كود الوكيل" value={item.deputyCode} />
        <Detail label="الرقم القومي" value={item.deputyNationalId} />
        <Detail label="هاتف الوكيل" value={item.deputyPhone} />
        <Detail label="طبيعة العمل" value={item.deputyType} />
      </div>
    </section>
  );
}

