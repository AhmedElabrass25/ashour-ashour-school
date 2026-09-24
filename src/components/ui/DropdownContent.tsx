import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, Search } from "lucide-react";

type DropdownOption = { label: string; value: string };

type DropdownContentProps = {
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredOptions: DropdownOption[];
};

export function DropdownContent({
  options, value, onValueChange, searchQuery, setSearchQuery, filteredOptions,
}: DropdownContentProps) {
  return (
    <DropdownMenuPrimitive.Content
      className="z-[9999] min-w-[14rem] max-w-[calc(100vw-2rem)] w-[var(--radix-dropdown-menu-trigger-width)] max-h-[320px] overflow-hidden rounded-sm border border-slate-200 bg-white p-1.5 text-slate-700 shadow-xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      sideOffset={4} align="start"
    >
      {options.length > 8 && (
        <div className="p-1 border-b border-slate-100 mb-1 sticky top-0 bg-white z-10">
          <div className="flex items-center px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-xs">
            <Search size={14} className="text-slate-400 shrink-0 ml-1.5" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-xs text-slate-800 placeholder-slate-400 font-medium"
              placeholder="ابحث..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      <div className="overflow-y-auto max-h-[250px] flex-1">
        {filteredOptions.length === 0 ? (
          <div className="p-3 text-center text-xs text-slate-400 font-medium">لا توجد نتائج</div>
        ) : (
          <DropdownMenuPrimitive.RadioGroup value={value}>
            {filteredOptions.map((option) => (
              <DropdownMenuPrimitive.RadioItem
                className="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2.5 text-xs font-bold outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-700"
                key={option.value} value={option.value}
                onSelect={() => onValueChange(option.value)}
              >
                <span className="truncate">{option.label}</span>
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <DropdownMenuPrimitive.ItemIndicator>
                    <Check size={14} className="text-blue-600 font-bold" aria-hidden="true" />
                  </DropdownMenuPrimitive.ItemIndicator>
                </span>
              </DropdownMenuPrimitive.RadioItem>
            ))}
          </DropdownMenuPrimitive.RadioGroup>
        )}
      </div>
    </DropdownMenuPrimitive.Content>
  );
}
