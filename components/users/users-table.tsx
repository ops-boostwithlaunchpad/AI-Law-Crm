"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import type { TeamMember } from "@/lib/mock/users";

const ROLE_LABEL: Record<TeamMember["role"], string> = {
  partner: "Partner",
  associate: "Associate",
  paralegal: "Paralegal",
  admin: "Admin",
};

const ROLE_TONE: Record<
  TeamMember["role"],
  { bg: string; fg: string }
> = {
  partner: { bg: "bg-[var(--chip-blue)]", fg: "text-[var(--chip-blue-fg)]" },
  associate: { bg: "bg-[var(--chip-indigo)]", fg: "text-[var(--chip-indigo-fg)]" },
  paralegal: { bg: "bg-[var(--chip-mint)]", fg: "text-[var(--chip-mint-fg)]" },
  admin: { bg: "bg-[var(--chip-lavender)]", fg: "text-[var(--chip-lavender-fg)]" },
};

const STATUS_TONE: Record<
  TeamMember["status"],
  React.ComponentProps<typeof StatusBadge>["tone"]
> = {
  active: "success",
  away: "warning",
  pending: "info",
  invited: "indigo",
};

const STATUS_LABEL: Record<TeamMember["status"], string> = {
  active: "Active",
  away: "Away",
  pending: "Pending",
  invited: "Invited",
};

const AVATAR_BG = {
  blue: "from-[#3b82f6] to-[#1d4ed8]",
  indigo: "from-[#a5b4fc] to-[#6366f1]",
  peach: "from-[#fdba74] to-[#ea580c]",
  mint: "from-[#86efac] to-[#16a34a]",
  lavender: "from-[#c4b5fd] to-[#7c3aed]",
  amber: "from-[#fcd34d] to-[#d97706]",
  rose: "from-[#fda4af] to-[#e11d48]",
} as const;

export function UsersTable({ members }: { members: TeamMember[] }) {
  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] border-b border-[var(--border)] bg-[var(--bg-primary)]/40">
              <th className="px-6 py-3 font-medium w-[5%]">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-[3px] border-[var(--border-strong)] accent-[var(--accent)]"
                />
              </th>
              <th className="px-3 py-3 font-medium">Member</th>
              <th className="px-3 py-3 font-medium">Role</th>
              <th className="px-3 py-3 font-medium tabular text-right">Cases</th>
              <th className="px-3 py-3 font-medium tabular text-right">Active value</th>
              <th className="px-3 py-3 font-medium tabular text-right">Win rate</th>
              <th className="px-3 py-3 font-medium">2FA</th>
              <th className="px-3 py-3 font-medium">Last active</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="pr-6 pl-3 py-3 font-medium text-right w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => {
              const role = ROLE_TONE[m.role];
              return (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="group border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-primary)]/40 transition-colors"
                >
                  <td className="pl-6 pr-1 py-3.5">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded-[3px] border-[var(--border-strong)] accent-[var(--accent)]"
                    />
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center text-white text-[11px] font-semibold tracking-wide bg-gradient-to-br shrink-0",
                          AVATAR_BG[m.avatarTone]
                        )}
                      >
                        {m.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                            {m.name}
                          </span>
                          {m.pendingAIReviews > 0 && (
                            <span className="font-mono text-[10px] tabular text-[var(--ai)] bg-[var(--ai-subtle)] px-1.5 py-0.5 rounded-[4px] border border-[#c7d2fe] font-semibold">
                              {m.pendingAIReviews} AI
                            </span>
                          )}
                        </div>
                        <div className="text-[11.5px] text-[var(--text-tertiary)] truncate">
                          {m.email} · {m.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-[5px] text-[10.5px] font-semibold uppercase tracking-[0.05em]",
                        role.bg,
                        role.fg
                      )}
                    >
                      {ROLE_LABEL[m.role]}
                    </span>
                  </td>

                  <td className="px-3 py-3.5 text-right tabular text-[12.5px] font-semibold text-[var(--text-primary)]">
                    {m.casesAssigned > 0 ? (
                      m.casesAssigned
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-normal">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5 text-right tabular text-[12.5px] font-semibold text-[var(--text-primary)]">
                    {m.activeValue > 0 ? (
                      formatCurrency(m.activeValue, { compact: true })
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-normal">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5 text-right tabular text-[12.5px] font-semibold text-[var(--text-primary)]">
                    {m.winRate !== undefined ? (
                      `${m.winRate.toFixed(1)}%`
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-normal">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    {m.twoFactor ? (
                      <span className="font-mono text-[10.5px] font-semibold text-[var(--success)] bg-[var(--status-success-bg)] px-1.5 py-0.5 rounded-[5px] border border-[#bbf7d0]">
                        ON
                      </span>
                    ) : (
                      <span className="font-mono text-[10.5px] font-semibold text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[5px] border border-[var(--border)]">
                        OFF
                      </span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    {m.lastActive ? (
                      <span className="text-[12px] tabular text-[var(--text-secondary)] whitespace-nowrap">
                        {formatRelativeTime(m.lastActive)}
                      </span>
                    ) : (
                      <span className="text-[12px] text-[var(--text-tertiary)]">never</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    <StatusBadge tone={STATUS_TONE[m.status]}>
                      {STATUS_LABEL[m.status]}
                    </StatusBadge>
                  </td>

                  <td className="pr-6 pl-3 py-3.5 text-right">
                    <button className="inline-flex items-center justify-center h-7 px-2.5 rounded-[7px] text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      Manage
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
