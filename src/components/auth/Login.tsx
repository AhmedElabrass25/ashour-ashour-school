import { useState, type FormEvent } from "react";
import { School, ShieldCheck } from "lucide-react";
import { LoginFormFields } from "./LoginFormFields";

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
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
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
        <LoginFormFields
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          showPassword={showPassword} setShowPassword={setShowPassword}
          error={error} isLoading={isLoading} onSubmit={submit}
        />
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
