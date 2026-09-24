import type { SchoolFormValues } from "../../validation/schoolSchema";
import { useController, useFormContext } from "react-hook-form";
import { DropdownField } from "../ui/dropdown";
import { AlertCircle } from "lucide-react";

type FieldProps = {
  label: string; name: keyof SchoolFormValues; required?: boolean;
  placeholder: string; type?: string; pattern?: string;
};

type DropdownFieldInputProps = {
  label: string; name: string; options: string[];
  required?: boolean; placeholder?: string;
};

export function Field({ label, name, required, placeholder, type = "text", pattern }: FieldProps) {
  const { register, formState: { errors } } = useFormContext<SchoolFormValues>();
  const error = errors[name]?.message;
  return (
    <label className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        className={`w-full h-11 rounded-lg border px-3 placeholder-slate-400 outline-none transition-all text-sm ${error ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-900" : "border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-800"}`}
        {...register(name)} type={type} min={type === "number" ? 0 : undefined}
        placeholder={placeholder} aria-invalid={Boolean(error)}
      />
      {pattern && !error && <input type="hidden" pattern={pattern} />}
      {error && (<span className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-0.5 animate-[fadeIn_0.2s_ease-out]"><AlertCircle size={14} /> {String(error)}</span>)}
    </label>
  );
}

export function DropdownFieldInput({ label, name, options, required, placeholder }: DropdownFieldInputProps) {
  const { control, formState: { errors } } = useFormContext<SchoolFormValues>();
  const { field } = useController({ control, name: name as keyof SchoolFormValues });
  const error = errors[name as keyof SchoolFormValues]?.message;
  const mergedOptions = field.value && !options.includes(String(field.value))
    ? [String(field.value), ...options] : options;

  return (
    <label className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className={error ? "ring-2 ring-red-300 rounded-lg" : ""}>
        <DropdownField
          value={String(field.value || "")}
          options={mergedOptions.map((o) => ({ label: o, value: o }))}
          onValueChange={field.onChange}
          ariaLabel={label}
          placeholder={placeholder || "اختر قيمة"}
        />
      </div>
      {error && (<span className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-0.5 animate-[fadeIn_0.2s_ease-out]"><AlertCircle size={14} /> {String(error)}</span>)}
    </label>
  );
}
