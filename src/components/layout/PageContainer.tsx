import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`w-full max-w-[1240px] mx-auto ${className}`.trim()}>
      {children}
    </div>
  );
}
