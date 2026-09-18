import { useState, type ReactNode, useEffect } from "react";
import { LogOut, Menu, Plus, Share2, Table2, X, School, Home, LayoutDashboard } from "lucide-react";
import { PageContainer } from "./PageContainer";

type AppShellProps = {
  view: "form" | "dashboard";
  onViewChange: (view: "form" | "dashboard") => void;
  onLogout: () => void;
  children: ReactNode;
};

export function AppShell({
  view,
  onViewChange,
  onLogout,
  children,
}: AppShellProps) {
  const [shareMessage, setShareMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
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
      
      {/* Mobile Menu Backdrop */}
      {menuOpen && (
        <button
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs cursor-default border-none w-full h-full animate-[fadeIn_0.2s_ease-out]"
          aria-label="إغلاق القائمة"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      {/* Mobile Top Header */}
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
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Distinct Fixed Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 flex w-[270px] flex-col bg-blue-950 border-l border-blue-900 text-blue-200 transition-transform duration-250 ease-in-out lg:translate-x-0 ${menuOpen ? "translate-x-0 shadow-2xl" : "translate-x-[110%] lg:translate-x-0"}`}
      >
        <div className="flex items-center gap-3 px-5 pt-6 pb-6 text-white border-b border-blue-900 shrink-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue-600 text-white font-bold shadow-2xs">
            <School size={20} />
          </span>
          <div className="min-w-0">
            <strong className="block text-base font-bold truncate text-white">مدارسنا</strong>
            <small className="block text-xs font-semibold text-blue-300 mt-0.5 truncate">
              إدارة التعليم الإعدادي
            </small>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 py-4 space-y-1">
           <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-blue-400">
             الملاحة العامة
           </div>
           
           <a
             href="/"
             className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-blue-200 hover:bg-blue-900 hover:text-white transition-colors"
           >
             <Home size={18} className="text-blue-400" />
             الرئيسية
           </a>

           <button
             className={`w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold transition-colors ${view === "dashboard" ? "bg-blue-600 text-white shadow-2xs" : "hover:bg-blue-900 hover:text-white text-blue-200"}`}
             onClick={() => {
               onViewChange("dashboard");
               setMenuOpen(false);
             }}
           >
             <Table2 size={18} className={view === "dashboard" ? "text-white" : "text-blue-400"} />
             لوحة البيانات
           </button>
           
           <button
             className={`w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold transition-colors ${view === "form" ? "bg-blue-600 text-white shadow-2xs" : "hover:bg-blue-900 hover:text-white text-blue-200"}`}
             onClick={() => {
               onViewChange("form");
               setMenuOpen(false);
             }}
           >
             <Plus size={18} className={view === "form" ? "text-white" : "text-blue-400"} />
             نموذج الإرسال
           </button>

           <div className="px-3 pt-5 pb-2 text-xs font-bold uppercase tracking-wider text-blue-400">
             الإدارة والتحكم
           </div>
           
           <button
             className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-blue-200 hover:bg-blue-900 hover:text-white transition-colors"
             onClick={shareForm}
           >
             <Share2 size={18} className="text-blue-400" />
             رابط المشاركة
           </button>
           
           <button
             className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-red-400 hover:bg-red-500/10 transition-colors"
             onClick={() => {
               setMenuOpen(false);
               onLogout();
             }}
           >
             <LogOut size={18} className="text-red-400" />
             تسجيل الخروج
           </button>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-blue-900 p-4 bg-blue-950/80 shrink-0">
          <div className="relative shrink-0">
             <img src="/leader-image.jpg" alt="الأستاذ عاشور السيد" className="w-9 h-9 rounded-sm object-cover border border-blue-800" />
             <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-950" />
          </div>
          <div className="min-w-0">
            <strong className="block text-sm font-bold text-white truncate">أ. عاشور السيد</strong>
            <small className="block text-xs text-blue-300 truncate">
              مدير التعليم الإعدادي بسمنود
            </small>
          </div>
        </div>
      </aside>
      
      {/* Share Toast */}
      {shareMessage && (
        <div
          className="fixed z-[60] top-4 left-1/2 -translate-x-1/2 bg-white text-slate-800 border border-slate-200 rounded-sm py-2.5 px-5 text-sm font-bold shadow-md flex items-center gap-2 animate-[toast-in_0.3s_ease-out]"
          role="status"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          {shareMessage}
        </div>
      )}

      {/* Main Content Area (Offset for fixed sidebar) */}
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
              <button onClick={() => onViewChange(view === "dashboard" ? "form" : "dashboard")} className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-2xs">
                 <LayoutDashboard size={16} /> {view === "dashboard" ? "النموذج" : "لوحة التحكم"}
              </button>
            </div>
          </header>
          
          <div className="w-full">
            {children}
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
