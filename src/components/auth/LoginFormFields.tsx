import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

type LoginFormFieldsProps = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function LoginFormFields({
  email, setEmail, password, setPassword,
  showPassword, setShowPassword, error, isLoading, onSubmit,
}: LoginFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 text-right">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-700">البريد الإلكتروني</span>
        <input
          className="w-full h-10 rounded-sm border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-left text-xs font-medium"
          dir="ltr" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ashour2030@admin.school" disabled={isLoading} required
        />
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="text-xs font-bold text-slate-700">كلمة المرور</span>
        <div className="relative">
          <input
            className="w-full h-10 rounded-sm border border-slate-200 bg-white px-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-left pr-10 text-xs font-medium"
            dir="ltr" type={showPassword ? "text" : "password"} value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" disabled={isLoading} required
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
        type="submit" disabled={isLoading}
      >
        {isLoading ? (<><Loader2 size={16} className="animate-spin" /><span>جاري التحقق وتسجيل الدخول...</span></>) : (<><span>دخول إلى لوحة الإدارة</span><ArrowLeft size={16} /></>)}
      </button>
    </form>
  );
}
