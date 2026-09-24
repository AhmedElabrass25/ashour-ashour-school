import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfoCards() {
  return (
    <div className="lg:col-span-5 space-y-4">
      <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-2xs flex items-start gap-4">
        <span className="grid place-items-center w-10 h-10 rounded-sm bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
          <MapPin size={20} />
        </span>
        <div>
          <strong className="block text-sm font-bold text-slate-800 mb-0.5">العنوان والمقر الرسمي</strong>
          <p className="text-xs text-slate-600 leading-relaxed">
            مبنى إدارة سمنود التعليمية - قسم التعليم الإعدادي - مدينة سمنود - محافظة الغربية.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-2xs flex items-start gap-4">
        <span className="grid place-items-center w-10 h-10 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
          <Phone size={20} />
        </span>
        <div>
          <strong className="block text-sm font-bold text-slate-800 mb-0.5">الهاتف والتواصل المباشر</strong>
          <p className="text-xs text-slate-600 leading-relaxed dir-ltr text-right">
            040-2970000 | 010-00000000
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-2xs flex items-start gap-4">
        <span className="grid place-items-center w-10 h-10 rounded-sm bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
          <Mail size={20} />
        </span>
        <div>
          <strong className="block text-sm font-bold text-slate-800 mb-0.5">البريد الإلكتروني الرسمي</strong>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            prep.samannoud@edu.gov.eg
          </p>
        </div>
      </div>
    </div>
  );
}
