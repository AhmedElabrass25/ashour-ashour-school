import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LeadershipLogo } from "./LeadershipLogo";
import { LeadershipDesktopNav } from "./LeadershipDesktopNav";
import { LeadershipMobileMenu } from "./LeadershipMobileMenu";

type LeadershipHeaderProps = {
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  onGoToDashboard: () => void;
};

export function LeadershipHeader({
  activeSection,
  onNavigate,
  onGoToDashboard,
}: LeadershipHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false);
    onNavigate(e, id);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto min-h-[64px] flex items-center justify-between gap-4">
        <LeadershipLogo onNavigate={handleNav} />
        <LeadershipDesktopNav
          activeSection={activeSection}
          onNavigate={handleNav}
          onGoToDashboard={onGoToDashboard}
        />
        <button
          className="md:hidden grid place-items-center border border-slate-200 rounded-sm bg-white text-blue-600 p-2 shadow-2xs cursor-pointer"
          type="button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <LeadershipMobileMenu
        menuOpen={menuOpen}
        activeSection={activeSection}
        onNavigate={handleNav}
        onGoToDashboard={onGoToDashboard}
      />
    </header>
  );
}
