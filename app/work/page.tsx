import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { StatusBadge } from "@/components/status-badge";
import { linuxLearning, projects } from "@/data/projects";

export const metadata: Metadata = { title: "Engineering Work" };

export default function WorkPage() {
  return (
    <main>
      <PageHero
        eyebrow="Engineering work"
        title="Engineering projects you can explore."
        intro="Live applications and cloud labs, with interface previews, source code and architecture walkthroughs."
        aside={<><span className="aside-stat">04</span><p>Selected engineering case studies</p></>}
      />
      <section className="section-block">
        <div className="shell">
          <div className="work-category-header"><div><p className="eyebrow">Cloud / DevOps</p><h2 className="medium-heading">Linux and automation foundations</h2></div><StatusBadge status="project" /></div>
          <article className="lab-feature top-gap">
            <div>
              <p className="mono-label">{linuxLearning.eyebrow}</p>
              <h3>{linuxLearning.title}</h3>
              <p>{linuxLearning.summary}</p>
            </div>
            <Link className="button button-primary" href="/labs/linux-learning">Inspect tracker</Link>
          </article>
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell">
          <div className="work-category-header"><div><p className="eyebrow">Selected builds</p><h2 className="medium-heading">Cloud & full-stack projects</h2></div><StatusBadge status="project" /></div>
          <div className="project-grid top-gap">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
