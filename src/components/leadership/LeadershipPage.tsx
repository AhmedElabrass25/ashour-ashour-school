import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  School,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import type { Submission } from "../../types";

type LeadershipPageProps = { submissions: Submission[] };

type GalleryItem = { src: string; title: string };

const profile = {
  name: "الأستاذ عاشور السيد",
  position: "مدير التعليم الإعدادي",
  department: "إدارة سمنود التعليمية",
  bio: "قيادة تعليمية متميزة تعمل على النهوض بالتعليم الإعدادي في إدارة سمنود التعليمية، من خلال الإشراف المباشر على المدارس ومتابعة سير العملية التعليمية وتطوير أداء الكوادر التعليمية والإدارية. نؤمن بأن التعليم هو ركيزة بناء المستقبل، ونسعى لتوفير بيئة تعليمية محفزة وآمنة تُسهم في إعداد جيل واعٍ قادر على مواجهة تحديات العصر.",
};

const gallery: GalleryItem[] = [
  { src: "/leader-image.jpg", title: "الصورة الرسمية للمدير" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80", title: "فعالية تعليمية" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80", title: "زيارة ميدانية" },
  { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80", title: "اجتماع رسمي" },
];

export function LeadershipPage({ submissions }: LeadershipPageProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeSection, setActiveSection] = useState("الرئيسية");

  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const totalClasses = submissions.reduce((sum, item) => {
    const cls = item.classes || 0;
    // Fallback protection: if a school has > 100 classes (invalid entry in DB), estimate based on students
    return sum + (cls > 100 ? Math.max(1, Math.round((item.students || 0) / 35)) : cls);
  }, 0);
  const reviewedSchools = submissions.filter((item) => item.status === "مكتمل").length;

  const closeMenu = () => setMenuOpen(false);
  const goToDashboard = () => {
    closeMenu();
    navigate("/dashboard");
  };

  const navItems = [
    { id: "الرئيسية", label: "الرئيسية" },
    { id: "النبذة", label: "النبذة" },
    { id: "المسؤوليات", label: "المسؤوليات" },
    { id: "الإحصائيات", label: "الإحصائيات" },
    { id: "الصور", label: "الصور" },
    { id: "التواصل", label: "التواصل" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 md:pt-20 selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      {/* Fixed Glassmorphism Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto min-h-[64px] flex items-center justify-between gap-4">
          <a className="flex items-center gap-2.5 shrink-0 text-slate-900 no-underline group" href="#الرئيسية" onClick={(e) => scrollToSection(e, "الرئيسية")}>
            <span className="w-9 h-9 grid place-items-center rounded-sm bg-blue-600 text-white font-bold shadow-2xs group-hover:bg-blue-700 transition-colors">
              <Building2 size={18} />
            </span>
            <span>
              <strong className="block text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">الإدارة التعليمية</strong>
              <small className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">إدارة سمنود · القيادة</small>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center items-center gap-1.5 flex-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
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

          {/* Action Buttons */}
          <div className="hidden md:flex items-center">
            <button className="inline-flex items-center justify-center gap-2 h-9 border-0 rounded-sm px-4 font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors cursor-pointer" type="button" onClick={goToDashboard}>
              لوحة البيانات <ChevronLeft size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden grid place-items-center border border-slate-200 rounded-sm bg-white text-blue-600 p-2 shadow-2xs cursor-pointer" type="button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full right-0 left-0 bg-white border-b border-slate-200 shadow-md overflow-hidden transition-all duration-200 ${menuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"}`}>
          <div className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`py-2 px-3 text-xs font-bold rounded-sm transition-colors ${
                  activeSection === item.id ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.label}
              </a>
            ))}
            <button className="mt-2 w-full inline-flex items-center justify-center gap-2 h-10 rounded-sm font-bold text-xs bg-blue-600 text-white shadow-2xs" onClick={goToDashboard}>
              لوحة البيانات <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 border-b border-slate-200/60" id="الرئيسية">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto grid md:grid-cols-[1fr_0.85fr] gap-10 items-center">
          <div className="order-2 md:order-1 flex flex-col items-start">
            <span className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 bg-blue-50 border border-blue-200 px-3 py-1 rounded-sm shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              بوابة القيادة التعليمية
            </span>
            <h1 className="my-2 text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {profile.name}
            </h1>
            <h2 className="m-0 text-lg md:text-xl font-bold text-blue-600 flex items-center gap-2">
              {profile.position}
            </h2>
            <p className="mt-1 text-amber-600 text-xs font-bold tracking-wide">
              {profile.department}
            </p>
            <p className="max-w-[540px] mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
              <a className="inline-flex items-center justify-center gap-2 h-11 rounded-sm px-6 font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 shadow-2xs transition-all w-full sm:w-auto" href="#النبذة" onClick={(e) => scrollToSection(e, "النبذة")}>
                التعرف على المزيد <ChevronLeft size={16} />
              </a>
              <a className="inline-flex items-center justify-center gap-2 h-11 rounded-sm px-6 font-bold text-xs border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all w-full sm:w-auto" href="#التواصل" onClick={(e) => scrollToSection(e, "التواصل")}>
                التواصل المباشر
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6 text-slate-500 text-xs font-semibold">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>صفحة رسمية معتمدة عبر نظام الإدارة التعليمية بسمنود</span>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative min-h-[320px] md:min-h-[420px] group">
            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100 shadow-sm h-full transition-transform duration-500 group-hover:shadow-md">
              <ProfileImage src="/leader-image.jpg" alt="صورة المدير" />
            </div>
            <div className="absolute right-3 bottom-3 z-10 flex items-center gap-3 p-3.5 rounded-sm bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
              <div className="w-9 h-9 rounded-sm bg-blue-50 border border-blue-100 grid place-items-center text-blue-600 font-bold shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-900">{profile.position}</strong>
                <small className="block text-[10px] text-slate-500 font-bold">{profile.department}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" id="النبذة">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto grid md:grid-cols-[0.8fr_1fr] gap-10 items-center">
          <div className="h-[300px] md:h-[400px] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xs group">
            <img src={gallery[1].src} alt="صورة الفعالية التعليمية" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <span className="inline-block text-blue-700 text-xs font-bold tracking-wider uppercase mb-2 px-2.5 py-0.5 bg-blue-50 border border-blue-200 rounded-sm">النبذة التعريفية</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">مسيرة مهنية رائدة في خدمة وتطوير التعليم</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              يتميز السيد المدير بخبرة واسعة في مجال التعليم وإدارته، حيث تدرج في عدة مناصب قيادية أثبت من خلالها كفاءة عالية في إدارة الموارد التعليمية وتطوير استراتيجيات التعلم. 
            </p>
            <p className="text-slate-700 text-sm leading-relaxed border-r-4 border-amber-400 pr-4 bg-amber-50/70 py-3 rounded-sm font-semibold">
              يعمل دائمًا على توجيه طاقات المعلمين والكوادر الإدارية نحو الابتكار وتعزيز جودة البيئة المدرسية، مع التركيز على التحول الرقمي والتكنولوجيا في المدارس.
            </p>
            <div className="flex flex-wrap gap-3 mt-6 p-3 bg-white rounded-sm border border-slate-200">
              <span className="inline-flex items-center gap-2 text-slate-800 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-sm border border-slate-200">
                <Target size={16} className="text-blue-600" /> رؤية استراتيجية واضحة
              </span>
              <span className="inline-flex items-center gap-2 text-slate-800 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-sm border border-slate-200">
                <Users size={16} className="text-blue-600" /> تنمية الكوادر المدرسية
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200" id="المسؤوليات">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
          <SectionHeading eyebrow="الدور المؤسسي" title="المنصب والمسؤوليات" description="تتركز مهام الإدارة في الإشراف الشامل والمتابعة الدقيقة لضمان سير العملية التعليمية بأعلى معايير الجودة." />
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mt-10">
            <FeatureCard icon={<BriefcaseBusiness size={20} />} title="الإدارة والإشراف" text="متابعة أداء المدارس، وتوجيه مديري المدارس لتحقيق الأهداف التعليمية، والإشراف المباشر على سير الامتحانات وأعمال الكنترول." color="blue" />
            <FeatureCard icon={<ShieldCheck size={20} />} title="السلامة والجودة" text="التأكد من التزام جميع المنشآت التعليمية بمعايير الأمن والسلامة، وتوافر التجهيزات الأساسية مثل طفايات الحريق وخزانات المياه." color="amber" />
            <FeatureCard icon={<GraduationCap size={20} />} title="دعم المبادرات" text="تبني ورعاية المبادرات التي تستهدف تطوير مهارات الطلاب والمعلمين، وتفعيل الأنشطة الصفية واللاصفية المتميزة." color="emerald" />
          </div>
        </div>
      </section>

      {/* Light-Only Stats Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200" id="الإحصائيات">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs mb-2 block bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm w-fit mx-auto">نظرة بالأرقام</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800">إحصائيات الإدارة التعليمية</h2>
            <p className="text-slate-600 text-sm">أرقام تعكس حجم المسؤولية والجهد المبذول في إدارة المنظومة التابعة للإدارة بناءً على قاعدة البيانات المحدثة.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard label="المدارس المسجلة" value={submissions.length} icon={<Building2 className="text-blue-600" size={24} />} />
            <StatCard label="إجمالي الطلاب" value={totalStudents} icon={<Users className="text-emerald-600" size={24} />} />
            <StatCard label="الفصول الدراسية" value={totalClasses} icon={<LayoutDashboard className="text-amber-600" size={24} />} />
            <StatCard label="تم مراجعتها" value={reviewedSchools} icon={<ShieldCheck className="text-purple-600" size={24} />} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white" id="الصور">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
          <SectionHeading eyebrow="الحضور الميداني" title="من أرض الواقع" description="لقطات توثق جانباً من الجولات والزيارات الميدانية المتابعة لسير العملية التعليمية ومشاركة الطلاب والمعلمين." />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-10 [&>*:first-child]:md:col-span-8 [&>*:first-child]:md:row-span-2 [&>*:not(:first-child)]:md:col-span-4 h-[auto] md:h-[420px]">
            {gallery.map((item) => (
              <button
                className="relative overflow-hidden rounded-sm bg-slate-100 group cursor-pointer min-h-[200px] md:min-h-0 w-full h-full border border-slate-200 shadow-2xs hover:shadow-xs transition-all"
                type="button"
                key={item.src}
                onClick={() => setSelectedImage(item)}
              >
                <div className="absolute inset-0 bg-slate-900/30 opacity-40 group-hover:opacity-60 transition-opacity z-10"></div>
                <ProfileImage src={item.src} alt={item.title} className="w-full h-full object-cover" />
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
      </section>

      {/* Light CTA Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200" id="التواصل">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-200 rounded-sm p-6 md:p-10 shadow-2xs">
          <div className="max-w-xl text-right">
            <span className="inline-block text-blue-700 font-bold tracking-wider text-xs mb-2 uppercase bg-blue-50 px-2 py-0.5 rounded-sm">نظام إدارة المدارس</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800">بوابة المتابعة والإدارة المركزية</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-0">يمكنكم من خلال النظام الوصول المباشر إلى جميع البيانات، الإحصائيات، ونماذج إدخال المعلومات الخاصة بمدارس الإدارة وتحديثها لحظياً.</p>
          </div>
          <button className="whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 h-11 rounded-sm px-6 font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 shadow-2xs transition-colors w-full md:w-auto" type="button" onClick={goToDashboard}>
            تسجيل الدخول للنظام <ChevronLeft size={16} />
          </button>
        </div>
      </section>

      {/* Light Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="w-[min(1160px,calc(100%-32px))] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-blue-50 border border-blue-200 grid place-items-center text-blue-600 font-bold">
              <School size={16} />
            </div>
            <div>
              <strong className="block text-slate-800 text-xs font-bold">بوابة الإدارة التعليمية</strong>
              <span className="text-slate-500 text-[10px] mt-0.5 block">النظام المركزي لمتابعة المدارس ٢٠٢٦</span>
            </div>
          </div>
          <p className="m-0 text-slate-500 text-[11px] font-semibold">تطوير وتصميم حصري © جميع الحقوق محفوظة لوزارة التربية والتعليم</p>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 bg-slate-900/40 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="عرض الصورة" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-[850px] bg-white rounded-sm overflow-hidden shadow-xl border border-slate-200" onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50">
              <span className="text-slate-800 font-bold text-xs">{selectedImage.title}</span>
              <button type="button" className="grid place-items-center w-7 h-7 rounded-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="إغلاق الصورة" onClick={() => setSelectedImage(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[80vh] bg-slate-100 flex items-center justify-center p-2">
              <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[75vh] object-contain block mx-auto rounded-sm border border-slate-200" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProfileImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [available, setAvailable] = useState(true);
  const ImgTag = 'img' as any;
  if (!available)
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-100 font-medium ${className}`}>
        <ImageIcon size={28} className="text-slate-300" />
        <span className="text-[11px] absolute">صورة غير متوفرة</span>
      </div>
    );
  return <ImgTag src={src} alt={alt} className={`w-full h-full object-cover block ${className}`} onError={() => setAvailable(false)} />;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <span className="inline-block text-blue-700 font-bold tracking-wider text-xs mb-2 uppercase bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">{eyebrow}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text, color }: { icon: ReactNode; title: string; text: string; color: 'blue' | 'amber' | 'emerald' }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };
  
  return (
    <article className="bg-white p-6 rounded-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-start">
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-4 border font-bold ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-xs">{text}</p>
    </article>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number, icon: ReactNode }) {
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
