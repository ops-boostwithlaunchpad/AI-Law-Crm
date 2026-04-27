import { ComingSoon } from "@/components/shared/coming-soon";

export default function MarketplacePage() {
  return (
    <ComingSoon
      title="Marketplace"
      tagline="Available cases, ranked by AI for risk and return."
      description="The investor side of LegalAI. Browse cases that lawyers have listed for funding, see the AI's risk grade and projected return profile, filter by case type and check size, and commit capital in a few clicks. Investors fund — lawyers win — clients recover faster."
      shipPhase="Phase 7"
      features={[
        {
          label: "AI-graded listings",
          detail:
            "Every case is scored on risk (A through D) with a transparent breakdown — defendant strength, damages model, time-to-settle estimate.",
        },
        {
          label: "Filters",
          detail:
            "By case type, jurisdiction, risk grade, minimum check size, and projected IRR.",
        },
        {
          label: "One-click commitment",
          detail:
            "Reserve, sign, and wire — all in-platform with escrow handling.",
        },
        {
          label: "Diligence pack",
          detail:
            "Each listing has an AI-generated diligence brief plus the redacted demand letter and key supporting docs.",
        },
      ]}
    />
  );
}
