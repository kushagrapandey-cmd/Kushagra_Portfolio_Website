import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./external-link";
import { StatusBadge } from "./status-badge";

type ProjectCardProps = { project: Project; featured?: boolean };

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? "project-featured" : ""}`}>
      {project.screenshot && <Link href={`/work/${project.slug}`} className="project-preview" aria-label={`Explore ${project.title}`}><Image src={project.screenshot} alt={project.screenshotAlt || project.title} width={1200} height={800} sizes="(max-width: 700px) 90vw, 540px" /></Link>}
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
        {project.live && <ExternalLink className="button button-primary" href={project.live}>Live demo</ExternalLink>}
        <Link className="text-link" href={`/work/${project.slug}`}>View case study <span aria-hidden="true">→</span></Link>
        <ExternalLink className="text-link" href={project.repo}>Repository</ExternalLink>
      </div>
    </article>
  );
}
