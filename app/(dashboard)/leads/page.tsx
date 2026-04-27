"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TabBar } from "@/components/shared/tab-bar";
import { MiniStat } from "@/components/shared/mini-stat";
import { LeadsTable } from "@/components/leads/leads-table";
import { LEADS, LEAD_STATS } from "@/lib/mock/leads";

const TABS = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "qualified", label: "Qualified" },
  { id: "needs_review", label: "Needs review" },
  { id: "converted", label: "Converted" },
  { id: "rejected", label: "Rejected" },
];

export default function LeadsPage() {
  const [tab, setTab] = React.useState("all");

  const filtered = React.useMemo(() => {
    if (tab === "all") return LEADS;
    return LEADS.filter((l) => l.status === tab);
  }, [tab]);

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: LEADS.length };
    LEADS.forEach((l) => {
      c[l.status] = (c[l.status] ?? 0) + 1;
    });
    return c;
  }, []);

  return (
    <>
      <PageHeader title="Leads" />

      <TabBar
        tabs={TABS.map((t) => ({
          ...t,
          label: counts[t.id] !== undefined ? `${t.label} ${counts[t.id]}` : t.label,
        }))}
        active={tab}
        onChange={setTab}
        primaryAction={{ label: "Add lead" }}
      />

      <div className="px-4 sm:px-6 md:px-8 pb-10 md:pb-12 max-w-[1400px] space-y-5 md:space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <MiniStat
            label="Leads this week"
            value={LEAD_STATS.total_week}
            delta={12}
            helpText="vs 21 last week"
          />
          <MiniStat
            label="Conversion rate"
            value={LEAD_STATS.conversion_rate}
            format={(n) => `${Math.round(n)}%`}
            delta={5}
            helpText="qualified → converted"
          />
          <MiniStat
            label="Avg AI risk score"
            value={LEAD_STATS.avg_risk_score}
            delta={3}
            deltaSuffix=" pts"
            helpText="across qualified leads"
          />
          <MiniStat
            label="Avg time to decision"
            value={LEAD_STATS.avg_decision_hours}
            format={(n) => `${n.toFixed(1)}h`}
            delta={-18}
            helpText="↓ 18% since AI triage"
          />
        </div>

        {/* Leads table */}
        {filtered.length > 0 ? (
          <LeadsTable leads={filtered} />
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
        Nothing here yet
      </div>
      <p className="text-[13px] text-[var(--text-secondary)] max-w-[36ch] mx-auto mb-5">
        No leads in this status. New intakes appear here within seconds of being submitted through any of your channels.
      </p>
      <button className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--accent)] text-white text-[12.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-[var(--shadow-blue)]">
        Add lead manually
      </button>
    </div>
  );
}
