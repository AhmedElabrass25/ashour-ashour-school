import { CheckCircle2, ChevronLeft, ClipboardCheck, GraduationCap, LayoutDashboard, ShieldCheck } from "lucide-react";

type LandingHeroAboutProps = {
  onGoToDashboard: () => void;
};

const heroImage = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=85";
const storyImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85";

export function LandingHero({ onGoToDashboard }: LandingHeroAboutProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-white" id="الرئيسية">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:items-center md:px-8">
        <div className="flex flex-col items-start order-2 md:order-1">
          <span className="inline-flex items-center gap-2 rounded-sm border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> بوابة الإدارة التعليمية
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl mb-4">
            نظام إدارة ومتابعة <span className="text-blue-600">التعليم الإعدادي</span>
          </h1>
          <p className="text-base leading-relaxed text-slate-600 mb-6 max-w-lg">
            منصة إلكترونية متكاملة لإدارة ومتابعة بيانات المدارس وتجهيزاتها وأعمال السلامة والتقارير والمتابعة الإدارية في مكان واحد.
          </p>
          <div className="flex w-full flex-col sm:flex-row gap-3 mb-8">
            <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer" type="button" onClick={onGoToDashboard}>
              الدخول إلى النظام <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <a className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors" href="#عن-النظام">
              التعرف على النظام
            </a>
          </div>
          <div className="flex items-center gap-5 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> بيانات منظمة</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-500" /> متابعة موثوقة</span>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100 shadow-sm">
            <img src={heroImage} alt="مبنى مدرسي" className="h-[260px] w-full object-cover md:h-[400px]" />
          </div>
          <div className="absolute -bottom-4 -left-2 md:-left-4 flex max-w-[240px] items-center gap-3 rounded-sm border border-slate-200 bg-white p-3 shadow-md">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-amber-50 text-amber-600 font-bold">
              <GraduationCap size={20} />
            </div>
            <div>
              <strong className="block text-xs font-bold text-slate-800">إدارة أكثر وضوحًا</strong>
              <small className="block text-[11px] font-medium text-slate-500">كل بيانات مدارسكم في متناولكم</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingAbout() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" id="عن-النظام">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 lg:gap-16 md:items-center md:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-sm border border-slate-200">
            <img src={storyImage} alt="طلاب داخل فصل" className="h-full w-full object-cover min-h-[260px] md:min-h-[380px]" loading="lazy" />
          </div>
          <span className="absolute -right-2 bottom-6 rounded-sm bg-blue-600 px-3 py-1.5 font-bold text-xs text-white shadow-sm">بيانات موحدة، قرار أفضل</span>
        </div>
        <div>
          <span className="inline-block rounded-sm bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-700 mb-3">عن النظام</span>
          <h2 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">نحو إدارة تعليمية أكثر تنظيمًا</h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            يهدف النظام إلى توفير منصة موحدة تساعد على إدارة ومتابعة بيانات المدارس التابعة للإدارة التعليمية، وتنظيم المعلومات الخاصة بالمدارس والتجهيزات ووسائل السلامة والمتابعة والتقارير.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="flex items-center gap-2.5 rounded-sm bg-white p-3.5 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs">
              <ClipboardCheck size={20} className="text-blue-600" /> تحديث مستمر للبيانات
            </span>
            <span className="flex items-center gap-2.5 rounded-sm bg-white p-3.5 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs">
              <LayoutDashboard size={20} className="text-blue-600" /> رؤية واضحة للمسؤولين
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
