import { ChevronLeft } from "lucide-react";
import { navItems } from "./LeadershipDesktopNav";

type MobileMenuProps = {
  menuOpen: boolean;
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  onGoToDashboard: () => void;
};

export function LeadershipMobileMenu({ menuOpen, activeSection, onNavigate, onGoToDashboard }: MobileMenuProps) {
  return (
    <div
      className={`absolute top-full right-0 left-0 bg-white border-b border-slate-200 shadow-md overflow-hidden transition-all duration-200 ${
        menuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
      }`}
    >
      <div className="flex flex-col p-4 gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => onNavigate(e, item.id)}
            className={`py-2 px-3 text-xs font-bold rounded-sm transition-colors ${
              activeSection === item.id
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            {item.label}
          </a>
        ))}
        <button
          className="mt-2 w-full inline-flex items-center justify-center gap-2 h-10 rounded-sm font-bold text-xs bg-blue-600 text-white shadow-2xs cursor-pointer"
          onClick={onGoToDashboard}
        >
          لوحة البيانات <ChevronLeft size={14} />
        </button>
      </div>
    </div>
  );
}
