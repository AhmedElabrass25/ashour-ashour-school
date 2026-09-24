import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Submission } from "../../types";
import { LeadershipHeader } from "./LeadershipHeader";
import { LeadershipHero } from "./LeadershipHero";
import { LeadershipAbout, LeadershipResponsibilities } from "./LeadershipSections";
import { LeadershipFooter, LeadershipGallery, LeadershipStats } from "./LeadershipStatsGallery";

import { ContactSection } from "../common/ContactSection";

type LeadershipPageProps = { submissions: Submission[] };

const profile = {
  name: "الأستاذ عاشور السيد",
  position: "مدير التعليم الإعدادي",
  department: "إدارة سمنود التعليمية",
  bio: "قيادة تعليمية متميزة تعمل على النهوض بالتعليم الإعدادي في إدارة سمنود التعليمية، من خلال الإشراف المباشر على المدارس ومتابعة سير العملية التعليمية وتطوير أداء الكوادر التعليمية والإدارية. نؤمن بأن التعليم هو ركيزة بناء المستقبل، ونسعى لتوفير بيئة تعليمية محفزة وآمنة تُسهم في إعداد جيل واعٍ قادر على مواجهة تحديات العصر.",
};

const gallery = [
  { src: "/leader-image.jpg", title: "الصورة الرسمية للمدير" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80", title: "فعالية تعليمية" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80", title: "زيارة ميدانية" },
  { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80", title: "اجتماع رسمي" },
];

export function LeadershipPage({ submissions }: LeadershipPageProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("الرئيسية");

  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const totalClasses = submissions.reduce((sum, item) => {
    const cls = item.classes || 0;
    return sum + (cls > 100 ? Math.max(1, Math.round((item.students || 0) / 35)) : cls);
  }, 0);
  const reviewedSchools = submissions.filter((item) => item.status === "مكتمل").length;

  const goToDashboard = () => navigate("/dashboard");

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 md:pt-20 selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      <LeadershipHeader activeSection={activeSection} onNavigate={scrollToSection} onGoToDashboard={goToDashboard} />
      <LeadershipHero profile={profile} onNavigate={scrollToSection} />
      <LeadershipAbout imageSrc={gallery[1].src} />
      <LeadershipResponsibilities />
      <LeadershipStats totalSubmissions={submissions.length} totalStudents={totalStudents} totalClasses={totalClasses} reviewedSchools={reviewedSchools} />
      <LeadershipGallery gallery={gallery} />
      <ContactSection />
      <LeadershipFooter onGoToDashboard={goToDashboard} />
    </main>
  );
}
