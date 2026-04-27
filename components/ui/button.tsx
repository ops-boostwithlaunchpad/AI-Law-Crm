"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none",
    "font-medium tracking-tight",
    "transition-[background,color,box-shadow,transform,border-color] duration-200",
    "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--accent)] text-white",
          "hover:bg-[var(--accent-hover)]",
          "active:translate-y-[0.5px] active:bg-[var(--accent-strong)]",
          "shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_1px_2px_rgba(15,23,42,0.18),0_0_0_1px_rgba(37,99,235,0.5)]",
          "hover:shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_2px_8px_rgba(37,99,235,0.35),0_0_0_1px_rgba(29,78,216,0.6)]",
        ],
        secondary: [
          "bg-[var(--bg-elevated)] text-[var(--text-primary)]",
          "border border-[var(--border-strong)]",
          "shadow-[var(--shadow-xs)]",
          "hover:bg-[var(--bg-secondary)] hover:border-[var(--text-tertiary)]",
        ],
        ghost: [
          "bg-transparent text-[var(--text-secondary)]",
          "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
        ],
        outline: [
          "bg-transparent text-[var(--text-primary)]",
          "border border-[var(--border)]",
          "hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]",
        ],
        destructive: [
          "bg-[var(--danger)] text-white",
          "hover:bg-[#b91c1c]",
          "active:translate-y-[0.5px]",
          "shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_1px_2px_rgba(15,23,42,0.18)]",
        ],
        soft: [
          "bg-[var(--accent-subtle)] text-[var(--accent-strong)]",
          "border border-[var(--accent-border)]/60",
          "hover:bg-[var(--accent-soft)] hover:border-[var(--accent-border)]",
        ],
        link: [
          "bg-transparent text-[var(--accent)] underline-offset-4",
          "hover:underline decoration-[var(--accent)]/40",
        ],
      },
      size: {
        sm: "h-7 px-2.5 text-[12.5px] rounded-[5px]",
        md: "h-8.5 px-3 text-[13px] rounded-[6px]",
        lg: "h-10 px-4 text-[13.5px] rounded-[7px]",
        icon: "h-8 w-8 rounded-[6px]",
        "icon-sm": "h-7 w-7 rounded-[5px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
