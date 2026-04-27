import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-[6px] px-3 py-1.5",
          "bg-[var(--bg-elevated)] border border-[var(--border)]",
          "text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "shadow-[var(--shadow-xs)]",
          "transition-[border-color,box-shadow] duration-200",
          "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
          "hover:border-[var(--border-strong)]",
          "focus:outline-none focus:border-[var(--accent)]",
          "focus:shadow-[0_0_0_3px_rgba(37,99,235,0.18)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
