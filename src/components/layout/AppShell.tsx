import { useState, type ReactNode, useEffect } from "react";
import { PageContainer } from "./PageContainer";
import { AppSidebar } from "./AppSidebar";
import { AppMobileTopbar } from "./AppMobileTopbar";
import { Home, LayoutDashboard } from "lucide-react";

type AppShellProps = {
  view: "form" | "dashboard";
  onViewChange: (view: "form" | "dashboard") => void;
  onLogout: () => void;
  children: ReactNode;
};

export function AppShell({ view, onViewChange, onLogout, children }: AppShellProps) {
  const [shareMessage, setShareMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  const shareForm = async () => {
    const shareUrl = `${window.location.origin}/form`;
    onViewChange("form");
    setMenuOpen(false);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("تم نسخ رابط نموذج المشاركة");
    } catch {
      setShareMessage(shareUrl);
    }
    window.setTimeout(() => setShareMessage(""), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-50 w-full relative font-sans text-base" dir="rtl">
      {menuOpen && (
        <button className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs cursor-default border-none w-full h-full animate-[fadeIn_0.2s_ease-out]" aria-label="إغلاق القائمة" onClick={() => setMenuOpen(false)} />
      )}
      <AppMobileTopbar menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <AppSidebar view={view} menuOpen={menuOpen} onViewChange={onViewChange} onLogout={onLogout} onShareForm={shareForm} onCloseMenu={() => setMenuOpen(false)} />
      {shareMessage && (
        <div className="fixed z-[60] top-4 left-1/2 -translate-x-1/2 bg-white text-slate-800 border border-slate-200 rounded-sm py-2.5 px-5 text-sm font-bold shadow-md flex items-center gap-2 animate-[toast-in_0.3s_ease-out]" role="status">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          {shareMessage}
        </div>
      )}
      <section className="lg:mr-[270px] min-h-screen flex flex-col w-full lg:w-[calc(100%-270px)] px-4 sm:px-6 lg:px-8 pb-12 pt-4 lg:pt-6">
        <PageContainer>
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-slate-200 mb-6">
            <div>
              <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-bold mb-1">
                <a href="/" className="hover:text-blue-600 transition-colors">الرئيسية</a>
                <span>/</span>
                <span className="text-slate-900">{view === "dashboard" ? "لوحة البيانات" : "نموذج الإرسال"}</span>
              </nav>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 m-0">
                {view === "dashboard" ? "نظرة عامة والتحكم" : "نموذج تسجيل بيانات المدرسة"}
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors shadow-2xs">
                <Home size={16} /> الرئيسية
              </a>
              <button onClick={() => onViewChange(view === "dashboard" ? "form" : "dashboard")} className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-2xs cursor-pointer">
                <LayoutDashboard size={16} /> {view === "dashboard" ? "النموذج" : "لوحة التحكم"}
              </button>
            </div>
          </header>
          <div className="w-full">{children}</div>
        </PageContainer>
      </section>
    </main>
  );
}
