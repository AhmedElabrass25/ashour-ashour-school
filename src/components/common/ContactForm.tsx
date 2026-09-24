import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", school: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", school: "", phone: "", message: "" });
    }, 4000);
  };

  if (sent) {
    return (
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-sm p-6 shadow-2xs">
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 text-center text-emerald-800 my-4">
          <CheckCircle2 size={36} className="mx-auto mb-2 text-emerald-600" />
          <strong className="block text-sm font-bold mb-1">تم إرسال الرسالة بنجاح!</strong>
          <p className="text-xs text-emerald-700">سيتم مراجعة طلبكم والتواصل معكم من قِبل إدارة التعليم الإعدادي.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-sm p-6 shadow-2xs">
      <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
        إرسال استفسار أو إشعـار عاجل
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">الاسم الكامل *</label>
            <input
              type="text"
              required
              placeholder="أدخل اسمك"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-1">المدرسة / الجـهة</label>
            <input
              type="text"
              placeholder="اسم المدرسة"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">رقم التواصل *</label>
          <input
            type="tel"
            required
            placeholder="010xxxxxxxx"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block mb-1">تفاصيل الرسالة أو الطلب *</label>
          <textarea
            rows={4}
            required
            placeholder="اكتب ملاحظاتك أو طلبك هنا..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-sm transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer shadow-2xs"
        >
          إرسال الرسالة للإدارة <Send size={14} />
        </button>
      </form>
    </div>
  );
}
