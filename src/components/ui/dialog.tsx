import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};
type DialogContentProps = { children: ReactNode; className?: string; dir?: string };

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onOpenChange, open]);
  if (!open) return null;
  return createPortal(
    <div
      data-dialog-root
      className="fixed inset-0 z-[100] flex bg-white"
    >
      {children}
    </div>,
    document.body,
  );
}

export function DialogContent({
  children,
  className = "",
  dir
}: DialogContentProps) {
  return (
    <div
      className={`relative z-[101] w-full h-screen bg-white text-right flex flex-col overflow-hidden ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      dir={dir}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-3 shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <h2
      id="dialog-title"
      className={`m-0 text-base md:text-lg font-bold text-slate-800 ${className}`}
    >
      {children}
    </h2>
  );
}

export function DialogFooter({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`mt-5 flex flex-col-reverse items-stretch gap-2.5 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function DialogClose({ onClick, className = "" }: { onClick: () => void, className?: string }) {
  return (
    <button
      type="button"
      className={`rounded-sm border border-slate-200 bg-slate-50 px-3 py-1 text-base leading-none text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 font-bold ${className}`}
      aria-label="إغلاق"
      onClick={onClick}
    >
      ×
    </button>
  );
}
