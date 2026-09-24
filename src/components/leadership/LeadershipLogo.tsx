import { Building2 } from "lucide-react";

type LogoProps = {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
};

export function LeadershipLogo({ onNavigate }: LogoProps) {
  return (
    <a
      className="flex items-center gap-2.5 shrink-0 text-slate-900 no-underline group"
      href="#الرئيسية"
      onClick={(e) => onNavigate(e, "الرئيسية")}
    >
      <span className="w-9 h-9 grid place-items-center rounded-sm bg-blue-600 text-white font-bold shadow-2xs group-hover:bg-blue-700 transition-colors">
        <Building2 size={18} />
      </span>
      <span>
        <strong className="block text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          الإدارة التعليمية
        </strong>
        <small className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          إدارة سمنود · القيادة
        </small>
      </span>
    </a>
  );
}
