import { ComingSoon } from "@/components/shared/coming-soon";

export default function CommunicationsPage() {
  return (
    <ComingSoon
      title="Communications"
      tagline="Every email, call, and letter, in one threaded view."
      description="A unified inbox across all your cases. Inbound emails route to the right case automatically, AI drafts replies for you to approve, and outbound mail is logged with delivery status. No more digging through Outlook for that one Adjuster email from three weeks ago."
      shipPhase="Phase 6"
      features={[
        {
          label: "Auto-routed inbox",
          detail:
            "Incoming email is matched to the correct case by sender, subject, and content — no manual filing.",
        },
        {
          label: "AI-drafted replies",
          detail:
            "When opposing counsel pings you, the AI drafts a response based on your tone and case context. Edit and send.",
        },
        {
          label: "Call log and transcripts",
          detail:
            "Click-to-dial logs the call and (with consent) attaches an AI-generated transcript and summary.",
        },
        {
          label: "Letter generator",
          detail:
            "Standard demand and disclosure letters are pre-filled from case data — just review and send to print.",
        },
      ]}
    />
  );
}
