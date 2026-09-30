import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ExternalLink } from "./external-link";
import { StatusBadge } from "./status-badge";

type CaseStudyLayoutProps = { project: Project };

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  return (
    <main>
      <section className="case-hero">
        <div className="shell case-hero-grid">
          <div>
            <Link className="back-link" href="/work">← Engineering Work</Link>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="case-lede">{project.context}</p>
            <div className="case-meta"><StatusBadge status={project.status} /><span>Repository-backed project evidence</span></div>
          </div>
          <div className="case-side-card">
            <p className="mono-label">TECHNOLOGIES</p>
            <ul className="tag-list">
              {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
            <ExternalLink className="button button-primary" href={project.repo}>View repository</ExternalLink>
          </div>
        </div>
      </section>

      <div className="shell case-body">
        <section className="case-section">
          <p className="eyebrow">01 / Problem</p>
          <h2>What the project explores</h2>
          <p className="case-copy">{project.problem}</p>
        </section>

        <section className="case-section architecture-section">
          <div>
            <p className="eyebrow">02 / Architecture</p>
            <h2>System shape</h2>
            <p className="case-copy">A simplified view of the components documented in the public repository.</p>
          </div>
          <ArchitectureDiagram nodes={project.architecture} label={`${project.title} architecture`} />
        </section>

        <section className="case-section split-section">
          <div>
            <p className="eyebrow">03 / Implemented</p>
            <h2>What exists in the repository</h2>
          </div>
          <ul className="evidence-list">
            {project.contributions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-section split-section limitation-panel">
          <div>
            <p className="eyebrow">04 / Current limitations</p>
            <h2>Constraints visible in the current repository</h2>
          </div>
          <ul className="evidence-list">
            {project.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-section split-section">
          <div>
            <p className="eyebrow">05 / Next iteration</p>
            <h2>What I would improve</h2>
          </div>
          <ul className="evidence-list">
            {project.improvements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
