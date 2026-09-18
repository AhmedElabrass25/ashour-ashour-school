import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type DropdownOption = { label: string; value: string };

type DropdownFieldProps = {
  value: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function DropdownField({
  value,
  options,
  onValueChange,
  placeholder = "اختر قيمة",
  ariaLabel,
}: DropdownFieldProps) {
  return (
    <DropdownMenuPrimitive.Root dir="rtl">
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold cursor-pointer"
          aria-label={ariaLabel}
        >
          <span>{value || placeholder}</span>
          <ChevronDown size={14} className="text-slate-400 opacity-60 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="z-[9999] min-w-[10rem] overflow-hidden rounded-sm border border-slate-200 bg-white p-1 text-slate-700 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          sideOffset={4}
          align="start"
        >
          <DropdownMenuPrimitive.RadioGroup value={value}>
            {options.map((option) => (
              <DropdownMenuPrimitive.RadioItem
                className="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2.5 text-xs font-bold outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-700"
                key={option.value}
                value={option.value}
                onSelect={() => onValueChange(option.value)}
              >
                <span>{option.label}</span>
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <DropdownMenuPrimitive.ItemIndicator>
                    <Check size={14} className="text-blue-600 font-bold" aria-hidden="true" />
                  </DropdownMenuPrimitive.ItemIndicator>
                </span>
              </DropdownMenuPrimitive.RadioItem>
            ))}
          </DropdownMenuPrimitive.RadioGroup>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownOptionGroup({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
