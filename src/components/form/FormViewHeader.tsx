import { AlertCircle, CheckCircle2, ShieldCheck, X } from "lucide-react";
import type { ReactNode } from "react";

export function FormIntroHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-8 border-b border-slate-200">
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
          <ShieldCheck size={14} /> نموذج بيانات المدرسة · مشاركة آمنة
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">سجّل بيانات مدرستك</h2>
        <p className="text-slate-600 leading-relaxed max-w-xl">
          أدخل البيانات الأساسية ومرافق السلامة وأعداد الطلاب بدقة. الحقول المميزة بعلامة <span className="text-red-500 font-bold">*</span> إلزامية.
        </p>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0">
        <span className="text-3xl font-extrabold text-blue-600 -mb-1 font-serif">٠١</span>
        <small className="text-xs font-bold text-slate-500">بيانات المدرسة</small>
      </div>
    </div>
  );
}

export function FormSection({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative pt-12 md:pt-14">
      <legend className="absolute -top-5 right-6 md:right-8 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 font-bold text-sm md:text-base flex items-center gap-3">
        <span className="text-blue-200 font-serif font-black">{step}</span> {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function FormSuccessNotice() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-emerald-50 border border-emerald-100 p-8 rounded-2xl flex flex-col items-center text-center gap-4 shadow-sm animate-[fadeInUp_0.4s_ease-out]">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mb-2 shadow-inner">
        <CheckCircle2 size={40} />
      </div>
      <h3 className="text-2xl font-extrabold text-emerald-800 tracking-tight">تم إرسال البيانات بنجاح!</h3>
      <p className="text-emerald-700 text-base leading-relaxed max-w-md">
        شكراً لك، تم تسجيل بيانات المدرسة الخاصة بكم بكل نجاح وفي أمان. ستظهر البيانات في لوحة الإدارة قريباً بمجرد المراجعة.
      </p>
    </div>
  );
}

export function FormToast({ toast, onClose }: { toast: { type: "success" | "error"; message: string }; onClose: () => void }) {
  return (
    <div
      className={`fixed bottom-6 m-auto left-0 right-0 max-w-sm w-full mx-auto p-4 rounded-xl shadow-2xl flex items-start gap-3 transform animate-[toast-in_0.3s_ease-out] z-50 ${
        toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
      }`}
      role="status"
    >
      <span className="shrink-0 mt-0.5">{toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span>
      <strong className="flex-1 text-sm font-medium leading-snug">{toast.message}</strong>
      <button className="shrink-0 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" type="button" onClick={onClose} aria-label="إغلاق الرسالة">
        <X size={18} />
      </button>
    </div>
  );
}
