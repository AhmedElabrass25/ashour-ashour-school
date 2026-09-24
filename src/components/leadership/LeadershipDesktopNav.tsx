import { ChevronLeft } from "lucide-react";

const navItems = [
  { id: "الرئيسية", label: "الرئيسية" },
  { id: "النبذة", label: "النبذة" },
  { id: "المسؤوليات", label: "المسؤوليات" },
  { id: "الإحصائيات", label: "الإحصائيات" },
  { id: "الصور", label: "الصور" },
  { id: "التواصل", label: "التواصل" },
];

type NavProps = {
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  onGoToDashboard: () => void;
};

export function LeadershipDesktopNav({ activeSection, onNavigate, onGoToDashboard }: NavProps) {
  return (
    <>
      <nav className="hidden md:flex justify-center items-center gap-1.5 flex-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => onNavigate(e, item.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all ${
              activeSection === item.id
                ? "bg-blue-50 text-blue-700 font-bold border border-blue-100"
                : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="hidden md:flex items-center">
        <button
          className="inline-flex items-center justify-center gap-2 h-9 border-0 rounded-sm px-4 font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors cursor-pointer"
          type="button"
          onClick={onGoToDashboard}
        >
          لوحة البيانات <ChevronLeft size={14} />
        </button>
      </div>
    </>
  );
}

export { navItems };
