import type { StudentRow } from "../../types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolSchema, type SchoolFormValues } from "../../validation/schoolSchema";
import { SchoolInfoFields } from "./SchoolInfoFields";
import { StaffFields } from "./StaffFields";
import { StudentFields } from "./StudentFields";
import { ShieldCheck, Loader2, Send } from "lucide-react";
import { FormIntroHeader, FormSection, FormSuccessNotice, FormToast } from "./FormViewHeader";

type FormViewProps = {
  rows: StudentRow[];
  updateRow: (index: number, key: "students" | "classes", value: string) => void;
  submitForm: (values: SchoolFormValues) => { ok: boolean; message?: string } | Promise<{ ok: boolean; message?: string }>;
  submitted: boolean;
};

export function FormView({ rows, updateRow, submitForm, submitted }: FormViewProps) {
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

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
      <FormIntroHeader />
      {submitted ? (
        <FormSuccessNotice />
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
                    : { type: "error", message: result.message || "فشل إرسال البيانات. راجع اتصال الموقع وحاول مرة أخرى." },
                );
              } catch {
                setToast({ type: "error", message: "حدث خطأ غير متوقع أثناء إرسال البيانات." });
              }
            })}
          >
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

            <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 pb-20">
              <p className="text-sm font-medium text-slate-500 max-w-sm text-center sm:text-right flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                سيتم حفظ البيانات بأمان ويمكن تعديلها لاحقاً من لوحة الإدارة.
              </p>
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer"
                type="submit"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" /> جاري الإرسال...</>
                ) : (
                  <>إرسال البيانات <Send size={18} /></>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      )}
      {toast && <FormToast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
