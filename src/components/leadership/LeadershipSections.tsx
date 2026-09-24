import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

export type GalleryItem = { src: string; title: string };

export function LeadershipAbout({ imageSrc }: { imageSrc: string }) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" id="النبذة">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto grid md:grid-cols-[0.8fr_1fr] gap-10 items-center">
        <div className="h-[300px] md:h-[400px] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xs group">
          <img src={imageSrc} alt="فعالية" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
  );
}

export function LeadershipResponsibilities() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200" id="المسؤوليات">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-blue-700 font-bold tracking-wider text-xs mb-2 uppercase bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">الدور المؤسسي</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">المنصب والمسؤوليات</h2>
          <p className="text-slate-600 text-sm">تتركز مهام الإدارة في الإشراف الشامل والمتابعة الدقيقة لضمان سير العملية التعليمية بأعلى معايير الجودة.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mt-10">
          <FeatureCard icon={<BriefcaseBusiness size={20} />} title="الإدارة والإشراف" text="متابعة أداء المدارس، وتوجيه مديري المدارس لتحقيق الأهداف التعليمية، والإشراف المباشر على سير الامتحانات وأعمال الكنترول." color="blue" />
          <FeatureCard icon={<ShieldCheck size={20} />} title="السلامة والجودة" text="التأكد من التزام جميع المنشآت التعليمية بمعايير الأمن والسلامة، وتوافر التجهيزات الأساسية مثل طفايات الحريق وخزانات المياه." color="amber" />
          <FeatureCard icon={<GraduationCap size={20} />} title="دعم المبادرات" text="تبني ورعاية المبادرات التي تستهدف تطوير مهارات الطلاب والمعلمين، وتفعيل الأنشطة الصفية واللاصفية المتميزة." color="emerald" />
        </div>
      </div>
    </section>
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
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-4 border font-bold ${colors[color]}`}>{icon}</div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-xs">{text}</p>
    </article>
  );
}
