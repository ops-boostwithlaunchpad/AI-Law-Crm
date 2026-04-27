"use client";

import * as React from "react";
import { Bell, Search, Slash } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export interface TopbarProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function Topbar({ breadcrumb = [{ label: "Dashboard" }] }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-[var(--border)] bg-[var(--bg-primary)]/85 backdrop-blur-md">
      <div className="h-full flex items-center justify-between px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px]">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <Slash
                  size={12}
                  strokeWidth={1.5}
                  className="text-[var(--text-tertiary)] -rotate-12"
                />
              )}
              <span
                className={cn(
                  i === breadcrumb.length - 1
                    ? "text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                )}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            className={cn(
              "group flex items-center gap-2 h-8 pl-2.5 pr-1.5",
              "bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[6px]",
              "text-[12.5px] text-[var(--text-tertiary)]",
              "hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]",
              "transition-[background,border-color,color] duration-200",
              "min-w-[240px] shadow-[var(--shadow-xs)]"
            )}
          >
            <Search size={13} strokeWidth={1.8} />
            <span className="flex-1 text-left">Search cases, leads…</span>
            <Kbd>⌘K</Kbd>
          </button>

          {/* Notifications */}
          <button
            className={cn(
              "relative h-8 w-8 flex items-center justify-center rounded-[6px]",
              "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
              "transition-colors duration-200"
            )}
          >
            <Bell size={15} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-primary)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
