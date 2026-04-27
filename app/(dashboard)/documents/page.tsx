import { ComingSoon } from "@/components/shared/coming-soon";

export default function DocumentsPage() {
  return (
    <ComingSoon
      title="Documents"
      tagline="Every file across every case, with AI summaries baked in."
      description="A single library of every document attached to any case in your firm — medical records, police reports, demands, correspondence, expert reports. The AI tags, categorizes, and summarizes each file as it lands so you can search by what's inside, not just by filename."
      shipPhase="Phase 6"
      features={[
        {
          label: "Drag-and-drop upload",
          detail:
            "Drop files anywhere on the page and the AI starts categorizing within seconds. Supports PDF, DOCX, images, DICOM, and audio transcripts.",
        },
        {
          label: "Auto-categorization and tags",
          detail:
            "Each document is tagged by type (medical, police, financial, demand, etc.) and linked to the right case automatically.",
        },
        {
          label: "Full-text search across cases",
          detail:
            "Search 'C5–C6 herniation' and see every record, demand, or note that mentions it across your firm.",
        },
        {
          label: "Inline AI summary",
          detail:
            "Click any document to see a 3-line AI summary in a side panel — no need to open and skim the full PDF.",
        },
      ]}
    />
  );
}
