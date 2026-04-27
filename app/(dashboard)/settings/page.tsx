import { ComingSoon } from "@/components/shared/coming-soon";

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      tagline="Tune how the AI works on your behalf."
      description="Profile, team, billing, and the part you'll spend the most time on — AI behavior preferences. Decide what the AI can act on autonomously, what needs your review, and what it should never touch without your sign-off."
      shipPhase="Phase 8"
      features={[
        {
          label: "Profile and firm details",
          detail:
            "Your bio, signature blocks, firm letterhead, and default jurisdictions for new cases.",
        },
        {
          label: "Team members",
          detail:
            "Invite paralegals and other lawyers, assign cases, and set per-role permissions.",
        },
        {
          label: "AI behavior preferences",
          detail:
            "Auto-approval thresholds per action type, tone of voice presets, escalation rules, and which case types the AI is allowed to handle.",
        },
        {
          label: "Integrations",
          detail:
            "Outlook / Gmail, e-sign, Westlaw / Lexis, court PACER access, and accounting platforms.",
        },
      ]}
    />
  );
}
