import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Submission } from "../../types";
import { SchoolDetailsModal } from "./SchoolDetailsModal";
import { ArrowRight, Edit, Trash2, CheckCircle2, Building2, UserCircle, Shield, GraduationCap } from "lucide-react";

type SchoolDetailsPageProps = {
  item: Submission;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
};

export function SchoolDetailsPage({
  item,
  onUpdate,
  onDelete,
}: SchoolDetailsPageProps) {
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

        {/* Back + Actions Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-sm transition-colors hover:bg-blue-100 w-fit"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowRight size={14} /> العودة للمدارس
          </button>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
              onClick={() => setEditing(true)}
            >
              <Edit size={14} /> تعديل البيانات
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-sm bg-white text-red-600 border border-slate-200 text-xs font-bold hover:bg-red-50 hover:border-red-200 transition-colors"
              onClick={remove}
            >
              <Trash2 size={14} /> حذف
            </button>
          </div>
        </div>

        {/* School Title Card */}
        <div className="bg-white border border-slate-200 rounded-sm p-5 md:p-6 shadow-2xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
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
          </div>
        </div>

        {/* School Info Section */}
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

        {/* Principal Info Section */}
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

        {/* Deputy Info Section */}
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

        {/* Student Rows Section */}
        <section className="bg-white border border-slate-200 rounded-sm shadow-2xs mb-4">
          <div className="flex items-center justify-between gap-2.5 px-5 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={16} className="text-purple-600" />
              <h3 className="text-sm font-bold text-slate-800 m-0">تفاصيل الصفوف</h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
              <span>الطلاب: <b className="text-blue-700">{item.students}</b></span>
              <span>الفصول: <b className="text-slate-800">{item.classes}</b></span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 md:p-5">
            {(item.studentRows || []).map((row) => (
              <div
                className="flex flex-col gap-1.5 border border-slate-200 bg-slate-50 rounded-sm p-3.5 hover:bg-slate-100 transition-colors"
                key={`${row.level}-${row.gender}`}
              >
                <div className="flex justify-between items-center mb-1 border-b border-slate-200 pb-1.5">
                   <strong className="text-xs font-bold text-slate-800">{row.level}</strong>
                   <span className="text-[10px] font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded-sm text-slate-600">{row.gender}</span>
                </div>
                <div className="flex justify-between items-center px-0.5">
                   <span className="text-xs font-semibold text-slate-500">الطلاب:</span>
                   <b className="text-blue-700 font-bold text-xs">{row.students} طالب</b>
                </div>
                <div className="flex justify-between items-center px-0.5">
                   <span className="text-xs font-semibold text-slate-500">الفصول:</span>
                   <b className="text-slate-700 font-bold text-xs">{row.classes} فصول</b>
                </div>
              </div>
            ))}
          </div>
        </section>

        {notice && (
          <div
            className="fixed z-50 left-0 right-0 bottom-6 mx-auto w-fit max-w-[90vw] flex items-center gap-2.5 py-2.5 px-4 rounded-sm text-white shadow-md bg-emerald-600 animate-[toast-in_0.3s_ease-out]"
            role="status"
          >
            <CheckCircle2 size={18} />
            <strong className="text-xs font-bold">{notice}</strong>
          </div>
        )}

        {editing && (
          <SchoolDetailsModal
            item={item}
            onClose={() => setEditing(false)}
            onUpdate={save}
          />
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex flex-col justify-center min-h-[60px] bg-white p-3.5">
      <small className="text-slate-500 font-semibold text-[11px] mb-1">{label}</small>
      <strong className="text-slate-800 text-xs font-bold truncate leading-tight">
        {value || "غير مسجل"}
      </strong>
    </div>
  );
}
