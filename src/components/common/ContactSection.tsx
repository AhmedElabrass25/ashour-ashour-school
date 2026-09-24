import { ContactInfoCards } from "./ContactInfoCards";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="التواصل" className="py-16 md:py-24 bg-slate-100/70 border-t border-slate-200 scroll-mt-20">
      <div className="w-[min(1160px,calc(100%-32px))] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-700 font-bold uppercase tracking-wider text-xs mb-2 block bg-blue-50 border border-blue-200 px-3 py-1 rounded-sm w-fit mx-auto">
            تواصل مباشر
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">التواصل والإنذار العاجل</h2>
          <p className="text-slate-600 text-sm">
            يمكنكم التواصل المباشر مع مكتب مدير التعليم الإعدادي بإدارة سمنود التعليمية لأي استفسارات أو بلاغات عاجلة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ContactInfoCards />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
