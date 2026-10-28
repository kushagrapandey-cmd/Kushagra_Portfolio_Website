import type { Metadata } from "next";
import Link from "next/link";
import { CertificationCard } from "@/components/certification-card";
import { JourneyMap } from "@/components/journey-map";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { certifications, focusAreas } from "@/data/profile";
import { linuxLearning } from "@/data/projects";

export const metadata: Metadata = { title: "Cloud Journey" };

export default function CloudPage() {
  return (
    <main>
      <PageHero
        eyebrow="Cloud journey"
        title="Cloud foundations, applied to real operational problems."
        intro="Azure-certified infrastructure professional with practical foundations in Linux, Bash, Python, Docker, Kubernetes and CI. CloudOps Sentinel connects those skills through diagnostics and recovery exercises."
        aside={<><StatusBadge status="project" /><p className="aside-stat">Hands-on</p><p>Cloud / DevOps foundations</p></>}
      />
      <section className="section-block">
        <div className="shell journey-layout">
          <div>
            <p className="eyebrow">Progression</p>
            <h2 className="medium-heading">Where each capability sits today</h2>
            <p className="case-copy">Professional experience covers infrastructure support and incident coordination. Project work demonstrates foundational automation and container skills. The continuing path focuses on deeper Azure deployment, infrastructure as code and observability.</p>
          </div>
          <JourneyMap />
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell">
          <p className="eyebrow">Credentials</p>
          <h2 className="medium-heading">Microsoft Azure certifications</h2>
          <div className="cert-grid top-gap">
            {certifications.map((cert) => <CertificationCard key={cert.code} certification={cert} />)}
          </div>
        </div>
      </section>
      <section className="section-block">
        <div className="shell evidence-columns">
          <article className="evidence-column">
            <StatusBadge status="professional" />
            <h3>Used professionally</h3>
            <ul className="clean-list">{focusAreas.professional.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="evidence-column">
            <StatusBadge status="certified" />
            <h3>Credentialed</h3>
            <ul className="clean-list">{focusAreas.certified.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="evidence-column">
            <StatusBadge status="project" />
            <h3>Hands-on foundations</h3>
            <ul className="clean-list">{focusAreas.learning.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell lab-feature">
          <div>
            <p className="eyebrow">Current public evidence</p>
            <h2>{linuxLearning.title}</h2>
            <p>{linuxLearning.summary}</p>
          </div>
          <div className="lab-actions"><Link className="button button-primary" href="/labs/linux-learning">Review cloud lab</Link></div>
        </div>
      </section>
    </main>
  );
}
