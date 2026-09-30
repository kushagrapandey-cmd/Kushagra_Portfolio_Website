import { careerJourney } from "@/data/profile";
import { StatusBadge } from "./status-badge";

export function CareerTopology() {
  return (
    <div className="topology-card" aria-label="Career transition from software development toward cloud and DevOps engineering">
      <div className="topology-header">
        <span className="mono-label">CAREER TOPOLOGY</span>
        <span className="live-indicator">Evidence mapped</span>
      </div>
      <ol className="topology-list">
        {careerJourney.map((step, index) => (
          <li key={step.title} className="topology-item">
            <div className="topology-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <div className="topology-content">
              <div className="topology-title-row">
                <h3>{step.title}</h3>
                <StatusBadge status={step.status} />
              </div>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
