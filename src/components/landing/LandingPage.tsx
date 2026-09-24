import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  Droplets,
  FileBarChart,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Menu,
  School,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type { Submission } from "../../types";

type LandingPageProps = {
  submissions: Submission[];
};

const heroImage =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=85";
const storyImage =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85";
const safetyImage =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1100&q=85";

export function LandingPage({ submissions }: LandingPageProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const totalClasses = submissions.reduce((sum, item) => {
    const cls = item.classes || 0;
    return sum + (cls > 100 ? Math.max(1, Math.round((item.students || 0) / 35)) : cls);
  }, 0);
  const reviewedSchools = submissions.filter((item) => item.status === "مكتمل").length;
  const pendingSchools = submissions.filter((item) => item.status !== "مكتمل").length;
  const totalTanks = submissions.reduce((sum, item) => sum + (item.waterTanks || 0), 0);
  const totalHydrants = submissions.reduce((sum, item) => sum + (item.fireHydrants || 0), 0);
  const totalHoses = submissions.reduce((sum, item) => sum + (item.fireHoses || 0), 0);

  const closeMenu = () => setMenuOpen(false);
  const goToDashboard = () => {
    closeMenu();
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {["الرئيسية", "عن-النظام", "المميزات", "السلامة", "المتابعة", "التقارير"].map((id) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                {id.replace("-", " ")}
              </a>
            ))}
          </nav>

          <button className="hidden lg:inline-flex items-center justify-center gap-2 rounded-sm bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition-colors" type="button" onClick={goToDashboard}>
            الدخول إلى النظام <ChevronLeft size={14} aria-hidden="true" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="grid lg:hidden place-items-center rounded-sm border border-slate-200 bg-white p-2 text-slate-700 shrink-0 hover:bg-slate-50"
            type="button"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`absolute left-0 right-0 top-full origin-top border-b border-slate-200 bg-white p-4 shadow-md transition-all duration-200 lg:hidden ${menuOpen ? 'scale-y-100 opacity-100' : 'h-0 scale-y-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col gap-1">
            {["الرئيسية", "عن-النظام", "المميزات", "السلامة", "المتابعة", "التقارير"].map((id) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} className="rounded-sm px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
                {id.replace("-", " ")}
              </a>
            ))}
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 py-2.5 text-xs font-bold text-white shadow-2xs" type="button" onClick={goToDashboard}>
              الدخول إلى النظام <ChevronLeft size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-2xs hover:bg-blue-700 transition-colors" type="button" onClick={goToDashboard}>
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
              <img src={heroImage} alt="مبنى مدرسي منظم يمثل بيئة التعليم" className="h-[260px] w-full object-cover md:h-[400px]" />
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

      {/* About Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" id="عن-النظام">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 lg:gap-16 md:items-center md:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-sm border border-slate-200">
              <img src={storyImage} alt="طلاب داخل بيئة تعليمية" className="h-full w-full object-cover min-h-[260px] md:min-h-[380px]" loading="lazy" />
            </div>
            <span className="absolute -right-2 bottom-6 rounded-sm bg-blue-600 px-3 py-1.5 font-bold text-xs text-white shadow-sm">بيانات موحدة، قرار أفضل</span>
          </div>
          <div>
            <span className="inline-block rounded-sm bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-700 mb-3">عن النظام</span>
            <h2 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">نحو إدارة تعليمية أكثر تنظيمًا</h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              يهدف النظام إلى توفير منصة موحدة تساعد على إدارة ومتابعة بيانات المدارس التابعة للإدارة التعليمية، وتنظيم المعلومات الخاصة بالمدارس والتجهيزات ووسائل السلامة والمتابعة والتقارير، بما يساعد على سهولة الوصول إلى البيانات وتحسين كفاءة العمل الإداري.
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

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200" id="المميزات">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-sm bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">إمكانات متكاملة</span>
            <h2 className="mb-3 text-2xl font-bold text-slate-800 md:text-3xl">أهم مميزات النظام</h2>
            <p className="text-sm text-slate-600">أدوات عملية تساعد الإدارة التعليمية على العمل بدقة وسرعة.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<Building2 />} title="إدارة المدارس" text="إدارة بيانات المدارس ومعلوماتها الأساسية ومتابعة حالتها بشكل منظم." />
            <Feature icon={<ClipboardCheck />} title="تجهيزات المدارس" text="متابعة التجهيزات والمرافق والمعدات الموجودة داخل كل مدرسة." />
            <Feature icon={<ShieldCheck />} title="السلامة المدرسية" text="تسجيل ومتابعة بيانات وسائل السلامة ومكافحة الحريق داخل المدارس." />
            <Feature icon={<FileBarChart />} title="التقارير والإحصائيات" text="عرض البيانات والإحصائيات بطريقة واضحة تساعد في المتابعة واتخاذ الإجراءات المناسبة." />
            <Feature icon={<BarChart3 />} title="المتابعة" text="متابعة حالة المدارس والبيانات المسجلة وتحديثها بشكل مستمر." />
            <Feature icon={<Users />} title="قاعدة بيانات موحدة" text="تجميع بيانات المدارس في نظام مركزي يسهل الوصول إليها وإدارتها." />
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-24" id="السلامة">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <span className="mb-3 inline-block rounded-sm bg-red-50 border border-red-200 px-2.5 py-0.5 text-xs font-bold text-red-700">حماية واستعداد</span>
            <h2 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">متابعة السلامة المدرسية</h2>
            <p className="mb-8 text-sm leading-relaxed text-slate-600">
              يساعد النظام على تسجيل ومتابعة بيانات وتجهيزات السلامة ومكافحة الحريق داخل المدارس، مما يوفر رؤية واضحة لحالة تجهيزات السلامة.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <SafetyStat icon={<Droplets className="text-blue-600" />} label="خزانات المياه" value={totalTanks} />
              <SafetyStat icon={<Droplets className="text-teal-600" />} label="حنفيات الحريق" value={totalHydrants} />
              <SafetyStat icon={<Flame className="text-red-600" />} label="خراطيم الحريق" value={totalHoses} />
              <SafetyStat icon={<ShieldCheck className="text-emerald-600" />} label="بيانات السلامة" value={totalTanks + totalHydrants + totalHoses} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm border border-slate-200 bg-white">
            <img src={safetyImage} alt="معدات وتجهيزات مرتبطة بالسلامة" className="h-full w-full object-cover min-h-[260px] md:min-h-[400px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Additional UI/Preview Section (Light Only) */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200 overflow-hidden" id="المتابعة">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center pb-12">
           <span className="mb-3 inline-block rounded-sm bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">متابعة مباشرة</span>
           <h2 className="mb-4 text-2xl font-bold md:text-3xl text-slate-800">لوحة تحكم متكاملة</h2>
           <p className="mx-auto max-w-2xl text-sm text-slate-600">
              توفر لوحة التحكم رؤية واضحة ومباشرة لأهم بيانات المدارس والإحصائيات وحالات المتابعة بشكل سريع.
           </p>
        </div>
        <div className="mx-auto max-w-6xl px-4 md:px-8 relative mb-8">
            <div className="rounded-sm bg-slate-50 p-2 border border-slate-200 shadow-sm">
                <div className="rounded-sm bg-white border border-slate-200 shadow-2xs overflow-hidden flex flex-col min-h-[35vh] md:min-h-[45vh]">
                    <div className="h-9 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="p-5 md:p-6 flex-1 opacity-70">
                        <div className="h-6 w-40 bg-slate-200 rounded-sm mb-6"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-slate-100 rounded-sm border border-slate-200"></div>)}
                        </div>
                        <div className="h-48 bg-slate-50 rounded-sm border border-slate-200"></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
               <button className="flex items-center gap-2 rounded-sm bg-blue-600 px-6 py-3 font-bold text-xs text-white shadow-2xs hover:bg-blue-700 transition-colors" onClick={goToDashboard}>
                   الانتقال إلى لوحة التحكم <ChevronLeft size={16} />
               </button>
            </div>
        </div>
      </section>

      {/* Reports/Stats */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200" id="التقارير">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-800 md:text-3xl">إحصائيات النظام العام</h2>
            <p className="text-sm text-slate-600">ملخص مباشر للبيانات المتاحة في لوحة الإدارة.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 md:gap-4">
            <Stat label="عدد المدارس" value={submissions.length} />
            <Stat label="عدد الطلاب" value={totalStudents} />
            <Stat label="عدد الفصول" value={totalClasses} />
            <Stat label="تمت متابعتها" value={reviewedSchools} />
            <Stat label="تحتاج متابعة" value={pendingSchools} />
          </div>
        </div>
      </section>
      
      {/* Light Footer */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-6 text-slate-600">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6 pb-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-right">
          <div className="flex flex-col items-center md:items-start">
             <span className="grid h-10 w-10 place-items-center rounded-sm bg-blue-50 border border-blue-200 text-blue-600 mb-3">
                <School size={20} />
             </span>
             <strong className="text-base font-bold text-slate-800 mb-1">مدارسنا</strong>
             <small className="text-xs text-slate-500">نظام إدارة ومتابعة التعليم الإعدادي</small>
          </div>
          
          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col gap-2">
               <strong className="text-xs font-bold text-slate-800 mb-1">روابط سريعة</strong>
               {["الرئيسية", "عن-النظام", "المميزات"].map(id => <a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>)}
            </div>
            <div className="flex flex-col gap-2">
               <strong className="text-xs font-bold text-slate-800 mb-1">دعم ومساعدة</strong>
               {["السلامة", "التقارير"].map(id => <a key={id} href={`#${id}`} className="text-xs text-slate-600 hover:text-blue-600 transition-colors">{id.replace("-", " ")}</a>)}
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 font-medium">جميع الحقوق محفوظة © ٢٠٢٦</p>
      </footer>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-sm border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-start">
      <span className="mb-3 grid h-10 w-10 place-items-center rounded-sm bg-blue-50 text-blue-600 font-bold">{icon}</span>
      <h3 className="mb-1.5 text-base font-bold text-slate-800">{title}</h3>
      <p className="text-xs font-medium leading-relaxed text-slate-600">{text}</p>
    </article>
  );
}

function SafetyStat({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-4 shadow-2xs">
      <span className="mb-2">{icon}</span>
      <strong className="mb-1 text-2xl font-bold text-slate-800 tabular-nums tracking-tight">{value.toLocaleString("ar-EG")}</strong>
      <small className="text-[11px] font-bold text-slate-500 uppercase">{label}</small>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center text-center rounded-sm bg-white p-4 border border-slate-200 shadow-2xs py-6 hover:shadow-xs transition-shadow">
      <strong className="mb-1 text-3xl font-extrabold text-blue-600 tabular-nums">{value.toLocaleString("ar-EG")}</strong>
      <span className="text-xs font-bold text-slate-600">{label}</span>
    </div>
  );
}
