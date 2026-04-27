"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TabBar } from "@/components/shared/tab-bar";
import { MiniStat } from "@/components/shared/mini-stat";
import { PipelineStrip } from "@/components/cases/pipeline-strip";
import { CasesTable } from "@/components/cases/cases-table";
import { CASES, CASE_STATS, PIPELINE_BREAKDOWN } from "@/lib/mock/cases";
import { formatCurrency } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "stalled", label: "Stalled" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
  { id: "closed", label: "Closed" },
];

export default function CasesPage() {
  const [tab, setTab] = React.useState("all");

  const filtered = React.useMemo(() => {
    if (tab === "all") return CASES;
    return CASES.filter((c) => c.status === tab);
  }, [tab]);

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: CASES.length };
    CASES.forEach((x) => {
      c[x.status] = (c[x.status] ?? 0) + 1;
    });
    return c;
  }, []);

  return (
    <>
      <PageHeader title="Cases" />

      <TabBar
        tabs={TABS.map((t) => ({
          ...t,
          label: counts[t.id] !== undefined ? `${t.label} ${counts[t.id]}` : t.label,
        }))}
        active={tab}
        onChange={setTab}
        primaryAction={{ label: "Add case" }}
      />

      <div className="px-8 pb-12 max-w-[1400px] space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MiniStat
            label="Active cases"
            value={CASE_STATS.active}
            delta={12}
            helpText="across 5 stages"
          />
          <MiniStat
            label="Pipeline value"
            value={CASE_STATS.pipeline_value}
            format={(n) => formatCurrency(n, { compact: true })}
            delta={9}
            helpText="projected gross recovery"
          />
          <MiniStat
            label="Avg case age"
            value={CASE_STATS.avg_age_days}
            format={(n) => `${Math.round(n)}d`}
            delta={-7}
            helpText="↓ 7d vs Q1"
          />
          <MiniStat
            label="Win rate (12mo)"
            value={CASE_STATS.win_rate}
            format={(n) => `${n.toFixed(1)}%`}
            delta={-2}
            helpText="settlement + judgment wins"
          />
        </div>

        {/* Pipeline strip */}
        <PipelineStrip stages={PIPELINE_BREAKDOWN} />

        {/* Cases table */}
        {filtered.length > 0 ? (
          <CasesTable cases={filtered} />
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
        No cases here
      </div>
      <p className="text-[13px] text-[var(--text-secondary)] max-w-[36ch] mx-auto">
        Try switching tabs or open a new case from a qualified lead.
      </p>
    </div>
  );
}
