import * as React from "react";
import { cn } from "@/lib/utils";

export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
        "font-mono text-[10px] font-medium",
        "bg-[var(--bg-secondary)] text-[var(--text-tertiary)]",
        "border border-[var(--border)] rounded-[3px]",
        "shadow-[0_1px_0_var(--border)]",
        className
      )}
    >
      {children}
    </kbd>
  );
}
