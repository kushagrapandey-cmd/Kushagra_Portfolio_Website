import { careerJourney } from "@/data/profile";
import { StatusBadge } from "./status-badge";

export function JourneyMap() {
  return (
    <ol className="journey-map">
      {careerJourney.map((step, index) => (
        <li key={step.title} className="journey-node">
          <div className="journey-rail" aria-hidden="true">
            <span className={`journey-point journey-${step.status}`} />
            {index < careerJourney.length - 1 ? <span className="journey-line" /> : null}
          </div>
          <div className="journey-copy">
            <div className="journey-title">
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <StatusBadge status={step.status} />
            </div>
            <p>{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
