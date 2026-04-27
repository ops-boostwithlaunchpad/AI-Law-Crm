import { ComingSoon } from "@/components/shared/coming-soon";

export default function InvestmentsPage() {
  return (
    <ComingSoon
      title="Portfolio"
      tagline="Your funded cases, performance, and projected payouts."
      description="Track every case you've funded, in one portfolio view. See active investments by stage, projected returns, realized gains, and the AI's updated risk score for each position. Get pinged when a case settles, when an offer comes in, or when an AI-revised forecast crosses your alerts."
      shipPhase="Phase 7"
      features={[
        {
          label: "Active positions",
          detail:
            "Per-case view of capital committed, projected return, current stage, and the AI's running risk score.",
        },
        {
          label: "Realized vs. projected",
          detail:
            "Settled cases roll into a realized-gains chart; active ones into a projected-IRR forecast.",
        },
        {
          label: "Alerts",
          detail:
            "Settlement offers, stage advances, and risk-score swings ping you as they happen.",
        },
        {
          label: "Tax-ready exports",
          detail:
            "End-of-year disbursements packaged into a 1099-ready CSV with per-case basis tracking.",
        },
      ]}
    />
  );
}
