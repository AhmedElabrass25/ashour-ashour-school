import { useState } from "react";
import { ChevronLeft, GraduationCap, ImageIcon, ShieldCheck } from "lucide-react";

type Profile = {
  name: string;
  position: string;
  department: string;
  bio: string;
};

type LeadershipHeroProps = {
  profile: Profile;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
};

export function LeadershipHero({ profile, onNavigate }: LeadershipHeroProps) {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 border-b border-slate-200/60"
      id="الرئيسية"
    >
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
            <a
              className="inline-flex items-center justify-center gap-2 h-11 rounded-sm px-6 font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 shadow-2xs transition-all w-full sm:w-auto"
              href="#النبذة"
              onClick={(e) => onNavigate(e, "النبذة")}
            >
              التعرف على المزيد <ChevronLeft size={16} />
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 h-11 rounded-sm px-6 font-bold text-xs border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all w-full sm:w-auto"
              href="#التواصل"
              onClick={(e) => onNavigate(e, "التواصل")}
            >
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
            <LeaderImage src="/leader-image.jpg" alt="صورة المدير" />
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
  );
}

function LeaderImage({ src, alt }: { src: string; alt: string }) {
  const [available, setAvailable] = useState(true);
  if (!available) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-100 font-medium">
        <ImageIcon size={28} className="text-slate-300" />
        <span className="text-[11px] absolute">صورة غير متوفرة</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className="w-full h-full object-cover block" onError={() => setAvailable(false)} />;
}
