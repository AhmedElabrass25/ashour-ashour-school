import { useState, type FormEvent } from "react";
import { School, ArrowLeft, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";

const ADMIN_EMAIL = "ashour2030@admin.school";
const ADMIN_PASSWORD = "AshourAdmin@#$123";

type LoginProps = { onLogin: () => void };

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (
      email.trim().toLowerCase() !== ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("madarisna_admin_session", "active");
      onLogin();
    }, 5000);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-8" dir="rtl">
      <section className="relative z-10 w-full max-w-[400px] bg-white border border-slate-200 rounded-sm shadow-md p-6 md:p-8 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-sm bg-blue-600 text-white shadow-2xs flex items-center justify-center mb-4">
           <School size={24} />
        </div>
        
        <div className="mb-6">
           <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-sm mb-2 border border-slate-200">
             <ShieldCheck size={14} className="text-emerald-500" /> منطقة الإدارة
           </span>
           <h1 className="text-xl md:text-2xl font-bold text-slate-800">تسجيل دخول المدير</h1>
           <p className="text-xs font-semibold text-slate-500 mt-1">ادخل إلى لوحة البيانات لمراجعة وتعديل بيانات المدارس.</p>
        </div>

        <form onSubmit={submit} className="w-full flex flex-col gap-4 text-right">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700">البريد الإلكتروني</span>
            <input
              className="w-full h-10 rounded-sm border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-left text-xs font-medium"
              dir="ltr"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ashour2030@admin.school"
              disabled={isLoading}
              required
            />
          </label>
          <label className="flex flex-col gap-1 relative">
            <span className="text-xs font-bold text-slate-700">كلمة المرور</span>
             <div className="relative">
                <input
                  className="w-full h-10 rounded-sm border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-left pr-10 text-xs font-medium"
                  dir="ltr"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
             </div>
          </label>
          {error && (
            <div className="w-full rounded-sm bg-red-50 border border-red-200 p-2.5 text-xs font-bold text-red-600" role="alert">
              {error}
            </div>
          )}
          <button
            className="w-full h-10 mt-1 rounded-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 text-xs"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>جاري التحقق وتسجيل الدخول...</span>
              </>
            ) : (
              <>
                <span>دخول إلى لوحة الإدارة</span>
                <ArrowLeft size={16} />
              </>
            )}
          </button>
        </form>

        <a
          className={`mt-6 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors ${isLoading ? "pointer-events-none opacity-50" : ""}`}
          href="/form"
        >
          فتح نموذج المشاركة العام بدلاً من ذلك
        </a>
      </section>
    </main>
  );
}
