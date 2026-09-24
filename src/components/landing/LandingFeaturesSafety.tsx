import type { ReactNode } from "react";
import { BarChart3, Building2, ClipboardCheck, Droplets, FileBarChart, Flame, ShieldCheck, Users } from "lucide-react";

type SafetyProps = {
  totalTanks: number;
  totalHydrants: number;
  totalHoses: number;
};

const safetyImage = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1100&q=85";

export function LandingFeatures() {
  return (
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

export function LandingSafety({ totalTanks, totalHydrants, totalHoses }: SafetyProps) {
  return (
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
          <img src={safetyImage} alt="معدات السلامة" className="h-full w-full object-cover min-h-[260px] md:min-h-[400px]" loading="lazy" />
        </div>
      </div>
    </section>
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
