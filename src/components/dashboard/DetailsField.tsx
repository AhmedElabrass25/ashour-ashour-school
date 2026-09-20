type DetailsFieldProps = {
  label: string;
  value: string | number;
  type?: string;
  onChange: (value: string) => void;
};

export function DetailsField({
  label,
  value,
  type = "text",
  onChange,
}: DetailsFieldProps) {
  return (
    <label className="text-slate-800 text-sm font-bold flex flex-col gap-1.5 w-full">
      {label}
      <input
        className="w-full h-11 rounded-sm border border-slate-300 bg-white px-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all font-semibold text-sm md:text-base"
        type={type}
        min={type === "number" ? 0 : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type DetailsSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

import { DropdownField } from "../ui/dropdown";

export function DetailsSelect({
  label,
  value,
  options,
  onChange,
}: DetailsSelectProps) {
  const mergedOptions =
    value && !options.includes(value) ? [value, ...options] : options;

  return (
    <label className="text-slate-800 text-sm font-bold flex flex-col gap-1.5 w-full">
      {label}
      <DropdownField
        value={value}
        options={mergedOptions.map((option) => ({ label: option, value: option }))}
        onValueChange={onChange}
        ariaLabel={label}
        placeholder="اختر اسم المدرسة"
      />
    </label>
  );
}
