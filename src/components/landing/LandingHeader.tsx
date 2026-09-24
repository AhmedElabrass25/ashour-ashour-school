import { useState } from "react";
import { ChevronLeft, Menu, School, X } from "lucide-react";

type LandingHeaderProps = {
  onGoToDashboard: () => void;
};

const navItems = [
  { id: "الرئيسية", label: "الرئيسية" },
  { id: "عن-النظام", label: "عن النظام" },
  { id: "المميزات", label: "المميزات" },
  { id: "السلامة", label: "السلامة" },
  { id: "المتابعة", label: "المتابعة" },
  { id: "التقارير", label: "التقارير" },
  { id: "التواصل", label: "التواصل" },
];

export function LandingHeader({ onGoToDashboard }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleGoToDashboard = () => {
    closeMenu();
    onGoToDashboard();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8 py-3">
        <a className="flex items-center gap-3 no-underline shrink-0 group" href="#الرئيسية" onClick={closeMenu}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-blue-600 text-white shadow-2xs">
            <School size={18} aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <strong className="block text-sm font-bold text-slate-800">مدارسنا</strong>
            <small className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">الإدارة التعليمية</small>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu} className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <button className="hidden lg:inline-flex items-center justify-center gap-2 rounded-sm bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer" type="button" onClick={handleGoToDashboard}>
          الدخول إلى النظام <ChevronLeft size={14} aria-hidden="true" />
        </button>

        <button
          className="grid lg:hidden place-items-center rounded-sm border border-slate-200 bg-white p-2 text-slate-700 shrink-0 hover:bg-slate-50 cursor-pointer"
          type="button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`absolute left-0 right-0 top-full origin-top border-b border-slate-200 bg-white p-4 shadow-md transition-all duration-200 lg:hidden ${menuOpen ? 'scale-y-100 opacity-100' : 'h-0 scale-y-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu} className="rounded-sm px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              {item.label}
            </a>
          ))}
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 py-2.5 text-xs font-bold text-white shadow-2xs cursor-pointer" type="button" onClick={handleGoToDashboard}>
            الدخول إلى النظام <ChevronLeft size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
