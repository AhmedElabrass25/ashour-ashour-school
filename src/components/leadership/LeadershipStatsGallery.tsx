import { useState, type ReactNode } from "react";
import { Building2, ImageIcon, LayoutDashboard, ShieldCheck, Users, X } from "lucide-react";
import type { GalleryItem } from "./LeadershipSections";
import { LeadershipFooter } from "./LeadershipFooter";

export { LeadershipFooter };

type StatsProps = {
  totalSubmissions: number;
  totalStudents: number;
  totalClasses: number;
  reviewedSchools: number;
};

export function LeadershipStats({ totalSubmissions, totalStudents, totalClasses, reviewedSchools }: StatsProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200" id="الإحصائيات">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-xs mb-2 block bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm w-fit mx-auto">نظرة بالأرقام</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800">إحصائيات الإدارة التعليمية</h2>
          <p className="text-slate-600 text-sm">أرقام تعكس حجم المسؤولية والجهد المبذول في إدارة المنظومة التابعة للإدارة بناءً على قاعدة البيانات المحدثة.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard label="المدارس المسجلة" value={totalSubmissions} icon={<Building2 className="text-blue-600" size={24} />} />
          <StatCard label="إجمالي الطلاب" value={totalStudents} icon={<Users className="text-emerald-600" size={24} />} />
          <StatCard label="الفصول الدراسية" value={totalClasses} icon={<LayoutDashboard className="text-amber-600" size={24} />} />
          <StatCard label="تم مراجعتها" value={reviewedSchools} icon={<ShieldCheck className="text-purple-600" size={24} />} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="relative p-5 rounded-sm bg-white border border-slate-200 shadow-2xs flex flex-col justify-between min-h-[100px]">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-slate-600">{label}</span>
        {icon}
      </div>
      <strong className="block text-2xl md:text-3xl font-bold text-slate-800 font-mono tabular-nums tracking-tight mt-2">
        {value.toLocaleString("ar-EG")}
      </strong>
    </div>
  );
}

export function LeadershipGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white" id="الصور">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-blue-700 font-bold tracking-wider text-xs mb-2 uppercase bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">الحضور الميداني</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">من أرض الواقع</h2>
          <p className="text-slate-600 text-sm">لقطات توثق جانباً من الجولات والزيارات الميدانية المتابعة لسير العملية التعليمية ومشاركة الطلاب والمعلمين.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-10 [&>*:first-child]:md:col-span-8 [&>*:first-child]:md:row-span-2 [&>*:not(:first-child)]:md:col-span-4 h-[auto] md:h-[420px]">
          {gallery.map((item) => (
            <button
              className="relative overflow-hidden rounded-sm bg-slate-100 group cursor-pointer min-h-[200px] md:min-h-0 w-full h-full border border-slate-200 shadow-2xs hover:shadow-xs transition-all"
              type="button"
              key={item.src}
              onClick={() => setSelectedImage(item)}
            >
              <div className="absolute inset-0 bg-slate-900/30 opacity-40 group-hover:opacity-60 transition-opacity z-10"></div>
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-white/90 grid place-items-center text-slate-800">
                  <ImageIcon size={12} />
                </div>
                <span className="text-white font-bold text-xs drop-shadow-md">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 bg-slate-900/40 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="عرض الصورة" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-[850px] bg-white rounded-sm overflow-hidden shadow-xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50">
              <span className="text-slate-800 font-bold text-xs">{selectedImage.title}</span>
              <button type="button" className="grid place-items-center w-7 h-7 rounded-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="إغلاق الصورة" onClick={() => setSelectedImage(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[80vh] bg-slate-100 flex items-center justify-center p-2">
              <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[75vh] object-contain block mx-auto rounded-sm border border-slate-200" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
