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
        title="A transition with visible evidence and clear next steps."
        intro="The direction is Azure Cloud and DevOps engineering. Current evidence combines infrastructure-support experience, Azure certifications and active Linux/networking learning."
        aside={<><StatusBadge status="learning" /><p className="aside-stat">In progress</p><p>Cloud / DevOps foundations</p></>}
      />
      <section className="section-block">
        <div className="shell journey-layout">
          <div>
            <p className="eyebrow">Progression</p>
            <h2 className="medium-heading">Where each capability sits today</h2>
            <p className="case-copy">Statuses are contextual, not percentage scores. Professional means used in current work; certified means credentialed; learning means actively developing; direction identifies the next stage.</p>
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
            <StatusBadge status="learning" />
            <h3>Currently developing</h3>
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
          <div className="lab-actions"><Link className="button button-primary" href="/labs/linux-learning">Review Linux tracker</Link></div>
        </div>
      </section>
    </main>
  );
}
