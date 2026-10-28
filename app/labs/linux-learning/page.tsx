import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { linuxLearning } from "@/data/projects";

export const metadata: Metadata = { title: "Cloud & Linux Engineering Lab" };

export default function LinuxLearningPage() {
  return (
    <main>
      <PageHero
        eyebrow="Applied foundations"
        title={linuxLearning.title}
        intro={linuxLearning.summary}
        aside={<><StatusBadge status="project" /><p className="aside-stat">Sentinel</p><p>Linux + container recovery</p></>}
      />
      <section className="section-block">
        <div className="shell evidence-columns two-columns">
          <article className="evidence-column">
            <p className="eyebrow">What is public now</p>
            <h2 className="medium-heading">Evidence</h2>
            <ul className="evidence-list">{linuxLearning.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="evidence-column">
            <p className="eyebrow">Learning scope</p>
            <h2 className="medium-heading">Topics tracked</h2>
            <ul className="clean-list">{linuxLearning.topics.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell boundary-panel">
          <div><p className="eyebrow">Current scope</p><h2>Foundations demonstrated through working code.</h2></div>
          <div>
            <p>CloudOps Sentinel includes a Python health API, Linux operations scripts, Docker and Kubernetes configuration, and CI recovery exercises. The browser simulator also includes a Linux VM workbench. Azure scripts remain an optional deployment path; deeper cloud operations and infrastructure as code are the next learning stage.</p>
            <ExternalLink className="button button-primary top-button" href={linuxLearning.repo}>Open repository</ExternalLink>
          </div>
        </div>
      </section>
    </main>
  );
}
