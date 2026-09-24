import { School, Menu, X } from "lucide-react";

type AppMobileTopbarProps = {
  menuOpen: boolean;
  onToggle: () => void;
};

export function AppMobileTopbar({ menuOpen, onToggle }: AppMobileTopbarProps) {
  return (
    <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 border-b border-slate-200 shadow-2xs">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-600 text-white font-bold shadow-2xs">
          <School size={18} />
        </span>
        <strong className="text-base font-bold text-slate-900">مدارسنا</strong>
      </div>
      <button
        className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-sm bg-white text-slate-800 shadow-2xs hover:bg-slate-50 transition-colors"
        aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        onClick={onToggle}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
