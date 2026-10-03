import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { linuxLearning } from "@/data/projects";

export const metadata: Metadata = { title: "DevOps Learning Journey" };

export default function LinuxLearningPage() {
  return (
    <main>
      <PageHero
        eyebrow="Active learning"
        title={linuxLearning.title}
        intro={linuxLearning.summary}
        aside={<><StatusBadge status="learning" /><p className="aside-stat">Aug 2026</p><p>Public tracker created</p></>}
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
          <div><p className="eyebrow">Current scope</p><h2>A growing DevOps learning workspace.</h2></div>
          <div>
            <p>The Devops-Learning README now covers Linux, networking, Azure, scripting and Git alongside a broader DevOps roadmap. Current practice and planned topics are distinguished; completed infrastructure projects will be added as repository-backed evidence becomes available.</p>
            <ExternalLink className="button button-primary top-button" href={linuxLearning.repo}>Open repository</ExternalLink>
          </div>
        </div>
      </section>
    </main>
  );
}
