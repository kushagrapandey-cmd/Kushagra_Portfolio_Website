import type { Metadata } from "next";
import { OperationsFlow } from "@/components/operations-flow";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { experience } from "@/data/profile";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const role = experience[0];
  return (
    <main>
      <PageHero
        eyebrow="Professional experience"
        title="Infrastructure support in an enterprise environment."
        intro="Two HCLTech assignments: Ericsson Rhythm Team L1.5 infrastructure support, followed by Benchmark Electronics ICC shift leadership and operational go-live support."
        aside={<><StatusBadge status="professional" /><p className="aside-stat">Dec 2024 – Present</p><p>{role.company} · Two project assignments</p></>}
      />
      {experience.map((assignment) => (
        <section className="section-block" key={assignment.project}>
          <div className="shell experience-detail-grid">
            <article className="experience-detail-card">
              <p className="mono-label">{assignment.period}</p>
              <h2>{assignment.project}</h2>
              <p className="project-context">{assignment.company} · {assignment.context}</p>
              <p className="experience-label">{assignment.label}</p>
              <StatusBadge status="professional" />
              <p className="eyebrow top-gap">Tools & workflows</p>
              <ul className="tag-list">{assignment.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </article>
            <article>
              <p className="eyebrow">Responsibilities & contributions</p>
              <ul className="numbered-evidence">
                {assignment.responsibilities.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ))}
      <section className="section-block section-contrast">
        <div className="shell">
          <p className="eyebrow">Operational pattern</p>
          <h2 className="medium-heading">How the work is framed</h2>
          <p className="case-copy">From alert validation and initial troubleshooting to documented escalation and shift handover, the focus is reliable operational support and clear ownership.</p>
          <OperationsFlow />
        </div>
      </section>
      <section className="section-block">
        <div className="shell boundary-panel">
          <div><p className="eyebrow">Boundary</p><h2>What this experience does not claim.</h2></div>
          <p>These assignments cover infrastructure support and operational coordination. Cloud architecture ownership and production DevOps platform engineering remain career-development goals.</p>
        </div>
      </section>
    </main>
  );
}
