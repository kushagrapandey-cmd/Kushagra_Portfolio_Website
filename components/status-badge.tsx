import type { EvidenceStatus } from "@/data/profile";

const labels: Record<EvidenceStatus, string> = {
  professional: "Professional",
  certified: "Certified",
  project: "Project experience",
  learning: "Currently learning",
  planned: "Direction",
};

export function StatusBadge({ status }: { status: EvidenceStatus }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
