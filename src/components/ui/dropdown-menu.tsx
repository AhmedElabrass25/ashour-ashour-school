import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

type DropdownProps = { trigger: ReactNode; children: ReactNode };

export function DropdownMenu({ trigger, children }: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root dir="rtl">
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex h-10 items-center justify-between gap-2 rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-bold w-full sm:w-auto shadow-2xs cursor-pointer"
          aria-label="اختيار نوع المدرسة"
        >
          {trigger}
        </button>
      </DropdownMenuPrimitive.Trigger>
      
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="z-[9999] min-w-[180px] overflow-hidden rounded-sm border border-slate-200 bg-white p-1 text-slate-800 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          sideOffset={6}
          align="start"
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  danger = false,
}: {
  children: ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2.5 py-2 text-xs outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 font-bold ${danger ? 'text-red-600 focus:bg-red-50 hover:bg-red-50' : 'text-slate-700 hover:text-slate-900 focus:bg-slate-100 hover:bg-slate-100'}`}
      onSelect={onClick}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}
