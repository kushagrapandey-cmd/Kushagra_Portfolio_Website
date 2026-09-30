import { certifications, focusAreas } from "@/data/profile";
import { StatusBadge } from "./status-badge";

export function FocusGrid() {
  return (
    <div className="focus-grid">
      <article className="focus-card focus-professional">
        <div className="card-topline"><StatusBadge status="professional" /><span>Current work context</span></div>
        <h3>Infrastructure operations</h3>
        <ul className="clean-list">
          {focusAreas.professional.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>
      <article className="focus-card focus-certified">
        <div className="card-topline"><StatusBadge status="certified" /><span>Microsoft Azure</span></div>
        <h3>Azure credentials</h3>
        <div className="credential-mini-grid">
          {certifications.map((cert) => (
            <div className="credential-mini" key={cert.code}>
              <strong>{cert.code}</strong><span>{cert.name}</span>
            </div>
          ))}
        </div>
      </article>
      <article className="focus-card focus-learning">
        <div className="card-topline"><StatusBadge status="learning" /><span>Direction in progress</span></div>
        <h3>Cloud / DevOps foundations</h3>
        <ul className="clean-list">
          {focusAreas.learning.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>
    </div>
  );
}
