import type { StudentRow } from "../types";
import { ArrowRight, ClipboardPenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormView } from "../components/form/FormView";
import type { SchoolFormValues } from "../validation/schoolSchema";

type PublicFormRouteProps = {
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

export function PublicFormRoute({
  rows,
  updateRow,
  submitForm,
  submitted,
}: PublicFormRouteProps) {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-12" dir="rtl">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold shadow-2xs shrink-0">
              <ClipboardPenLine size={18} aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <strong className="text-sm font-bold text-slate-800 leading-tight">مدارسنا</strong>
              <span className="text-[11px] font-semibold text-slate-500 mt-0.5">بوابة بيانات المدارس</span>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowRight size={15} aria-hidden="true" />
            العودة
          </button>
        </div>
      </header>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <FormView
          rows={rows}
          updateRow={updateRow}
          submitForm={submitForm}
          submitted={submitted}
        />
      </div>
    </main>
  );
}
