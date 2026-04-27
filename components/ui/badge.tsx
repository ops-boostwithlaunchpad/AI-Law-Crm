import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 px-1.5 py-px",
    "font-mono text-[10px] font-medium uppercase tracking-[0.07em]",
    "rounded-[4px] border whitespace-nowrap",
  ],
  {
    variants: {
      tone: {
        neutral:
          "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)]",
        lawyer:
          "bg-[var(--accent-subtle)] text-[var(--accent-strong)] border-[var(--accent-border)]/70",
        investor:
          "bg-[var(--investor-subtle)] text-[var(--investor)] border-[#FCD34D]/60",
        ai: "bg-[var(--ai-subtle)] text-[var(--ai)] border-[#C7D2FE]",
        success:
          "bg-[var(--success-subtle)] text-[var(--success)] border-[#BBF7D0]",
        warning:
          "bg-[var(--warning-subtle)] text-[var(--warning)] border-[#FDE68A]",
        danger:
          "bg-[var(--danger-subtle)] text-[var(--danger)] border-[#FECACA]",
        outline:
          "bg-transparent text-[var(--text-secondary)] border-[var(--border)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
