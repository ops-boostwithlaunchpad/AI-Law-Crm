import * as React from "react";
import { cn } from "@/lib/utils";

export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "indigo";

const STYLES: Record<StatusTone, string> = {
  success:
    "bg-[var(--status-success-bg)] text-[var(--status-success-fg)] border-[#bbf7d0]",
  warning:
    "bg-[var(--status-warning-bg)] text-[var(--status-warning-fg)] border-[#fed7aa]",
  danger:
    "bg-[var(--status-danger-bg)] text-[var(--status-danger-fg)] border-[#fecdd3]",
  info: "bg-[var(--status-info-bg)] text-[var(--status-info-fg)] border-[#c7d2fe]",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  indigo:
    "bg-[var(--chip-indigo)] text-[var(--chip-indigo-fg)] border-indigo-200",
};

export function StatusBadge({
  tone = "neutral",
  children,
  withDot = true,
  className,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10.5px] font-semibold border whitespace-nowrap",
        STYLES[tone],
        className
      )}
    >
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </span>
  );
}
