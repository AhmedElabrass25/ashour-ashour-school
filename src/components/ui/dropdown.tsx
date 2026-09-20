import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Search } from "lucide-react";
import { useState, type ReactNode } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  return (
    <DropdownMenuPrimitive.Root
      dir="rtl"
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setSearchQuery("");
      }}
    >
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-between rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold cursor-pointer text-right"
          aria-label={ariaLabel}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            size={16}
            className="text-slate-400 opacity-60 shrink-0 mr-1"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="z-[9999] min-w-[14rem] max-w-[calc(100vw-2rem)] w-[var(--radix-dropdown-menu-trigger-width)] max-h-[320px] overflow-hidden rounded-sm border border-slate-200 bg-white p-1.5 text-slate-700 shadow-xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          sideOffset={4}
          align="start"
        >
          {options.length > 8 && (
            <div className="p-1 border-b border-slate-100 mb-1 sticky top-0 bg-white z-10">
              <div className="flex items-center px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-xs">
                <Search size={14} className="text-slate-400 shrink-0 ml-1.5" />
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-xs text-slate-800 placeholder-slate-400 font-medium"
                  placeholder="ابحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto max-h-[250px] flex-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400 font-medium">
                لا توجد نتائج
              </div>
            ) : (
              <DropdownMenuPrimitive.RadioGroup value={value}>
                {filteredOptions.map((option) => (
                  <DropdownMenuPrimitive.RadioItem
                    className="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2.5 text-xs font-bold outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-700"
                    key={option.value}
                    value={option.value}
                    onSelect={() => onValueChange(option.value)}
                  >
                    <span className="truncate">{option.label}</span>
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <DropdownMenuPrimitive.ItemIndicator>
                        <Check
                          size={14}
                          className="text-blue-600 font-bold"
                          aria-hidden="true"
                        />
                      </DropdownMenuPrimitive.ItemIndicator>
                    </span>
                  </DropdownMenuPrimitive.RadioItem>
                ))}
              </DropdownMenuPrimitive.RadioGroup>
            )}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownOptionGroup({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

