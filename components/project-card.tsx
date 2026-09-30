import Link from "next/link";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./external-link";
import { StatusBadge } from "./status-badge";

type ProjectCardProps = { project: Project; featured?: boolean };

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? "project-featured" : ""}`}>
      <div className="project-meta-row">
        <span className="mono-label">{project.eyebrow}</span>
        <StatusBadge status={project.status} />
      </div>
      <h3>{project.title}</h3>
      <p className="project-context">{project.context}</p>
      <p>{project.summary}</p>
      <ul className="tag-list" aria-label={`${project.title} technologies`}>
        {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      <div className="card-actions">
        <Link className="text-link" href={`/work/${project.slug}`}>View case study <span aria-hidden="true">→</span></Link>
        <ExternalLink className="text-link" href={project.repo}>Repository</ExternalLink>
      </div>
    </article>
  );
}
