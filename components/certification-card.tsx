import type { certifications } from "@/data/profile";
import { StatusBadge } from "./status-badge";

type Certification = (typeof certifications)[number];

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <article className="certification-card">
      <div className="cert-mark" aria-hidden="true">AZ</div>
      <div>
        <StatusBadge status="certified" />
        <p className="cert-code">{certification.code}</p>
        <h3>{certification.name}</h3>
        <p>{certification.note}</p>
      </div>
    </article>
  );
}
