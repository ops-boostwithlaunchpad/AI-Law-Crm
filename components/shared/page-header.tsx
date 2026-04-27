"use client";

import * as React from "react";
import { Bell, Share2, UserPlus } from "lucide-react";

export interface PageHeaderProps {
  title: string;
  collaborators?: { name: string; tone: "blue" | "indigo" | "peach" }[];
}

const AVATAR_BG = {
  blue: "from-[#3b82f6] to-[#1d4ed8]",
  indigo: "from-[#818cf8] to-[#6366f1]",
  peach: "from-[#fdba74] to-[#ea580c]",
} as const;

export function PageHeader({
  title,
  collaborators = [
    { name: "JI", tone: "indigo" },
    { name: "MK", tone: "blue" },
  ],
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 pt-8 pb-6 max-w-[1400px]">
      <h1 className="display-2 text-[var(--text-primary)]">{title}</h1>

      <div className="flex items-center gap-2">
        <IconBtn icon={<Share2 size={15} strokeWidth={1.9} />} />
        <IconBtn icon={<Bell size={15} strokeWidth={1.9} />} hasDot />

        <div className="flex items-center -space-x-1.5 mr-1">
          {collaborators.map((c, i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-full ring-2 ring-[var(--bg-primary)] bg-gradient-to-br ${AVATAR_BG[c.tone]} flex items-center justify-center text-white text-[11px] font-semibold tracking-wide`}
            >
              {c.name}
            </div>
          ))}
          <div className="h-8 w-8 rounded-full ring-2 ring-[var(--bg-primary)] bg-[var(--chip-peach)] text-[var(--chip-peach-fg)] flex items-center justify-center text-[10px] font-semibold tracking-tight">
            +3
          </div>
        </div>

        <IconBtn icon={<UserPlus size={15} strokeWidth={1.9} />} />
      </div>
    </header>
  );
}

function IconBtn({
  icon,
  hasDot,
  onClick,
}: {
  icon: React.ReactNode;
  hasDot?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative h-9 w-9 inline-flex items-center justify-center rounded-[10px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all shadow-[var(--shadow-xs)]"
    >
      {icon}
      {hasDot && (
        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-elevated)]" />
      )}
    </button>
  );
}
