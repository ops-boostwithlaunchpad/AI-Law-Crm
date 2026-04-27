import { ComingSoon } from "@/components/shared/coming-soon";

export default function AIWorkspacePage() {
  return (
    <ComingSoon
      title="AI Workspace"
      tagline="One queue for every AI decision waiting on you."
      description="The AI Workspace is the unified review surface for everything the system has drafted, analyzed, or recommended across all your active cases. You skim the queue, approve good drafts in one click, edit inline when they need a tweak, and reject anything off-base — and the AI learns from every signal."
      shipPhase="Phase 5"
      features={[
        {
          label: "Unified approval queue",
          detail:
            "Demand letters, settlement counters, client emails, document summaries, deposition prep — all in one ranked list, sorted by impact and confidence.",
        },
        {
          label: "Inline editing",
          detail:
            "Drafts open in-place — edit the AI's text right in the queue without losing your spot, then approve and ship.",
        },
        {
          label: "Confidence and reasoning",
          detail:
            "Every AI output ships with a confidence score and the sources it pulled from, so you know what it considered and what it didn't.",
        },
        {
          label: "Auto-approval thresholds",
          detail:
            "Set policies per action type — auto-approve document summaries above 95% confidence, but always require sign-off on outbound demands.",
        },
      ]}
    />
  );
}
