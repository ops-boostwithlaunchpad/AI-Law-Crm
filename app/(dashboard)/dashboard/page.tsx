"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TabBar } from "@/components/shared/tab-bar";
import { PipelineChartCard } from "@/components/dashboard/pipeline-chart-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { LeadSourcesCard } from "@/components/dashboard/lead-sources-card";
import { ApprovalsTable } from "@/components/dashboard/approvals-table";
import { formatCurrency } from "@/lib/utils";
import {
  PENDING_APPROVALS,
  REVENUE_TREND,
  ACTIVE_CASES_TREND,
  WIN_RATE_TREND,
  SETTLEMENTS_DONUT,
  LEAD_SOURCES,
} from "@/lib/mock/dashboard";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "pipeline", label: "Pipeline" },
  { id: "ai", label: "AI Activity" },
];

export default function DashboardPage() {
  const [tab, setTab] = React.useState("overview");

  const total =
    REVENUE_TREND.reduce(
      (s, r) => s + r.demand + r.negotiation + r.settlement,
      0
    ) / 12;

  return (
    <>
      <PageHeader title="Dashboard" />

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <div className="px-8 pb-12 max-w-[1400px] space-y-6">
        {/* Hero pipeline chart */}
        <PipelineChartCard
          data={REVENUE_TREND}
          total={total}
          vsLastMonthPct={9}
          highlightMonth="May"
        />

        {/* 3-stat row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Active Cases"
            value={47}
            format={(n) => Math.round(n).toString()}
            delta={12}
            visualization="bars"
            data={ACTIVE_CASES_TREND}
          />
          <StatCard
            label="Settlements (this month)"
            value={2_355_000}
            format={(n) => formatCurrency(n, { compact: true })}
            delta={7}
            visualization="donut"
            donut={{
              value: SETTLEMENTS_DONUT.closed,
              total: SETTLEMENTS_DONUT.target,
              tone: "var(--accent)",
            }}
          />
          <StatCard
            label="Win Rate"
            value={87.2}
            format={(n) => `${n.toFixed(1)}%`}
            delta={-2}
            visualization="line"
            data={WIN_RATE_TREND}
          />
        </div>

        {/* Bottom row: lead sources + approvals table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LeadSourcesCard total={142} delta={8.5} sources={LEAD_SOURCES} />
          </div>
          <div className="lg:col-span-2">
            <ApprovalsTable items={PENDING_APPROVALS} />
          </div>
        </div>
      </div>
    </>
  );
}
