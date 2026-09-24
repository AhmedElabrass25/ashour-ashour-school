import { Home, LogOut, Plus, School, Share2, Table2 } from "lucide-react";
import { AppSidebarUser } from "./AppSidebarUser";

type AppSidebarProps = {
  view: "form" | "dashboard";
  menuOpen: boolean;
  onViewChange: (view: "form" | "dashboard") => void;
  onLogout: () => void;
  onShareForm: () => void;
  onCloseMenu: () => void;
};

export function AppSidebar({ view, menuOpen, onViewChange, onLogout, onShareForm, onCloseMenu }: AppSidebarProps) {
  const navBtn = (active: boolean) =>
    `w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold transition-colors cursor-pointer ${active ? "bg-blue-600 text-white shadow-2xs" : "hover:bg-blue-900 hover:text-white text-blue-200"}`;

  return (
    <aside className={`fixed top-0 right-0 bottom-0 z-50 flex w-[270px] flex-col bg-blue-950 border-l border-blue-900 text-blue-200 transition-transform duration-250 ease-in-out lg:translate-x-0 ${menuOpen ? "translate-x-0 shadow-2xl" : "translate-x-[110%] lg:translate-x-0"}`}>
      <div className="flex items-center gap-3 px-5 pt-6 pb-6 text-white border-b border-blue-900 shrink-0">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue-600 text-white font-bold shadow-2xs">
          <School size={20} />
        </span>
        <div className="min-w-0">
          <strong className="block text-base font-bold truncate text-white">مدارسنا</strong>
          <small className="block text-xs font-semibold text-blue-300 mt-0.5 truncate">إدارة التعليم الإعدادي</small>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-blue-400">الملاحة العامة</div>
        <a href="/" className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-blue-200 hover:bg-blue-900 hover:text-white transition-colors">
          <Home size={18} className="text-blue-400" /> الرئيسية
        </a>
        <button className={navBtn(view === "dashboard")} onClick={() => { onViewChange("dashboard"); onCloseMenu(); }}>
          <Table2 size={18} className={view === "dashboard" ? "text-white" : "text-blue-400"} /> لوحة البيانات
        </button>
        <button className={navBtn(view === "form")} onClick={() => { onViewChange("form"); onCloseMenu(); }}>
          <Plus size={18} className={view === "form" ? "text-white" : "text-blue-400"} /> نموذج الإرسال
        </button>
        <div className="px-3 pt-5 pb-2 text-xs font-bold uppercase tracking-wider text-blue-400">الإدارة والتحكم</div>
        <button className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-blue-200 hover:bg-blue-900 hover:text-white transition-colors cursor-pointer" onClick={onShareForm}>
          <Share2 size={18} className="text-blue-400" /> رابط المشاركة
        </button>
        <button className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm md:text-base font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" onClick={() => { onCloseMenu(); onLogout(); }}>
          <LogOut size={18} className="text-red-400" /> تسجيل الخروج
        </button>
      </div>

      <AppSidebarUser name="أ. عاشور السيد" title="مدير التعليم الإعدادي بسمنود" imageSrc="/leader-image.jpg" />
    </aside>
  );
}
