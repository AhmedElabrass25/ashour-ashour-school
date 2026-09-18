import type { StudentRow } from "../../types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schoolSchema,
  type SchoolFormValues,
} from "../../validation/schoolSchema";
import { SchoolInfoFields } from "./SchoolInfoFields";
import { StaffFields } from "./StaffFields";
import { StudentFields } from "./StudentFields";
import { CheckCircle2, AlertCircle, ShieldCheck, Loader2, Send, X } from "lucide-react";

type FormViewProps = {
  rows: StudentRow[];
  updateRow: (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => void;
  submitForm: (
    values: SchoolFormValues,
  ) =>
    | { ok: boolean; message?: string }
    | Promise<{ ok: boolean; message?: string }>;
  submitted: boolean;
};

export function FormView({
  rows,
  updateRow,
  submitForm,
  submitted,
}: FormViewProps) {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const methods = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    mode: "onBlur",
    defaultValues: {
      schoolType: "إعدادي",
      area: "حضر",
      shift: "صباحية",
      fireHoses: "0",
      waterTanks: "0",
      waterTanksStatus: "صالح",
      fireHydrants: "0",
      principalType: "أصلي",
      deputy: "",
      deputyCode: "",
      deputyNationalId: "",
      deputyPhone: "",
      deputyType: "أصلي",
    },
  });

  return (
    <div className="w-full max-w-[1000px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[calc(100vh-100px)]">
      {/* Intro */}
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

      {submitted ? (
        <SuccessMessage />
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-10"
            onSubmit={methods.handleSubmit(async (values) => {
              try {
                const result = await submitForm(values);
                setToast(
                  result.ok
                    ? { type: "success", message: "تم إرسال البيانات بنجاح" }
                    : {
                        type: "error",
                        message: result.message || "فشل إرسال البيانات. راجع اتصال الموقع وحاول مرة أخرى.",
                      },
                );
              } catch {
                setToast({
                  type: "error",
                  message: "حدث خطأ غير متوقع أثناء إرسال البيانات.",
                });
              }
            })}
          >
            {/* Fieldsets */}
            <FormSection step="٠١" title="البيانات الأساسية للمدرسة">
               <SchoolInfoFields />
            </FormSection>
            
            <FormSection step="٠٢" title="بيانات مدير المدرسة">
               <StaffFields role="principal" />
            </FormSection>
            
            <FormSection step="٠٣" title="بيانات الوكيل (إن وجد)">
               <StaffFields role="deputy" />
            </FormSection>
            
            <FormSection step="٠٤" title="أعداد الطلاب والفصول بالتفصيل">
               <StudentFields rows={rows} updateRow={updateRow} />
            </FormSection>

            {/* Form Footer */}
            <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 pb-20">
              <p className="text-sm font-medium text-slate-500 max-w-sm text-center sm:text-right flex items-center gap-2">
                 <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                 سيتم حفظ البيانات بأمان ويمكن تعديلها لاحقاً من لوحة الإدارة.
              </p>
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all"
                type="submit"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال البيانات <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      )}

      {toast && (
        <div className={`fixed bottom-6 m-auto left-0 right-0 max-w-sm w-full mx-auto p-4 rounded-xl shadow-2xl flex items-start gap-3 transform animate-[toast-in_0.3s_ease-out] z-50 ${toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`} role="status">
          <span className="shrink-0 mt-0.5">{toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span>
          <strong className="flex-1 text-sm font-medium leading-snug">{toast.message}</strong>
          <button
            className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            type="button"
            onClick={() => setToast(null)}
            aria-label="إغلاق الرسالة"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function FormSection({ step, title, children }: { step: string, title: string, children: React.ReactNode }) {
  return (
    <fieldset className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative pt-12 md:pt-14">
      <legend className="absolute -top-5 right-6 md:right-8 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 font-bold text-sm md:text-base flex items-center gap-3">
        <span className="text-blue-200 font-serif font-black">{step}</span> {title}
      </legend>
      {children}
    </fieldset>
  );
}

function SuccessMessage() {
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
