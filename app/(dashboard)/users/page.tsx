"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TabBar } from "@/components/shared/tab-bar";
import { MiniStat } from "@/components/shared/mini-stat";
import { UsersTable } from "@/components/users/users-table";
import { TEAM, TEAM_STATS } from "@/lib/mock/users";

const TABS = [
  { id: "all", label: "All" },
  { id: "lawyer", label: "Lawyers" },
  { id: "paralegal", label: "Paralegals" },
  { id: "admin", label: "Admins" },
  { id: "pending", label: "Pending invites" },
];

export default function UsersPage() {
  const [tab, setTab] = React.useState("all");

  const filtered = React.useMemo(() => {
    if (tab === "all") return TEAM;
    if (tab === "lawyer")
      return TEAM.filter((m) => m.role === "partner" || m.role === "associate");
    if (tab === "paralegal") return TEAM.filter((m) => m.role === "paralegal");
    if (tab === "admin") return TEAM.filter((m) => m.role === "admin");
    if (tab === "pending")
      return TEAM.filter((m) => m.status === "pending" || m.status === "invited");
    return TEAM;
  }, [tab]);

  const counts = React.useMemo(() => {
    return {
      all: TEAM.length,
      lawyer: TEAM.filter((m) => m.role === "partner" || m.role === "associate").length,
      paralegal: TEAM.filter((m) => m.role === "paralegal").length,
      admin: TEAM.filter((m) => m.role === "admin").length,
      pending: TEAM.filter((m) => m.status === "pending" || m.status === "invited").length,
    } as Record<string, number>;
  }, []);

  return (
    <>
      <PageHeader title="Team" />

      <TabBar
        tabs={TABS.map((t) => ({
          ...t,
          label: counts[t.id] !== undefined ? `${t.label} ${counts[t.id]}` : t.label,
        }))}
        active={tab}
        onChange={setTab}
        primaryAction={{ label: "Invite member" }}
      />

      <div className="px-4 sm:px-6 md:px-8 pb-10 md:pb-12 max-w-[1400px] space-y-5 md:space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <MiniStat
            label="Team members"
            value={TEAM_STATS.total}
            delta={2}
            deltaSuffix=""
            helpText="2 new joiners this quarter"
          />
          <MiniStat
            label="Cases assigned"
            value={TEAM_STATS.active_cases_assigned}
            delta={9}
            helpText="across all attorneys"
          />
          <MiniStat
            label="Avg utilization"
            value={TEAM_STATS.avg_utilization_pct}
            format={(n) => `${Math.round(n)}%`}
            delta={-4}
            helpText="hours billed vs target"
          />
          <MiniStat
            label="Pending invites"
            value={TEAM_STATS.pending_invites}
            delta={1}
            deltaSuffix=""
            helpText="awaiting acceptance"
          />
        </div>

        {/* Users table */}
        {filtered.length > 0 ? (
          <UsersTable members={filtered} />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-[20px] border border-dashed border-[var(--border-strong)] p-16 text-center shadow-[var(--shadow-card)]">
      <div className="display-4 text-[var(--text-primary)] mb-1.5">
        Nobody in this group yet
      </div>
      <p className="text-[13px] text-[var(--text-secondary)] max-w-[36ch] mx-auto mb-5">
        Invite a teammate by email and they'll show up here once they accept.
      </p>
      <button className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--accent)] text-white text-[12.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-[var(--shadow-blue)]">
        Invite member
      </button>
    </div>
  );
}
