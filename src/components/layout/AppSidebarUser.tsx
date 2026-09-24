type AppSidebarUserProps = {
  name: string;
  title: string;
  imageSrc: string;
};

export function AppSidebarUser({ name, title, imageSrc }: AppSidebarUserProps) {
  return (
    <div className="mt-auto flex items-center gap-3 border-t border-blue-900 p-4 bg-blue-950/80 shrink-0">
      <div className="relative shrink-0">
        <img src={imageSrc} alt={name} className="w-9 h-9 rounded-sm object-cover border border-blue-800" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-950" />
      </div>
      <div className="min-w-0">
        <strong className="block text-sm font-bold text-white truncate">{name}</strong>
        <small className="block text-xs text-blue-300 truncate">{title}</small>
      </div>
    </div>
  );
}
