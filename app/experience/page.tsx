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
        intro="This page stays close to documented responsibilities: Windows Server L1 troubleshooting, infrastructure monitoring, health checks, cloud-portal monitoring and incident escalation."
        aside={<><StatusBadge status="professional" /><p className="aside-stat">{role.period}</p><p>{role.company} · {role.context}</p></>}
      />
      <section className="section-block">
        <div className="shell experience-detail-grid">
          <article className="experience-detail-card">
            <p className="mono-label">CURRENT ROLE CONTEXT</p>
            <h2>{role.company}</h2>
            <p className="project-context">{role.context}</p>
            <p className="experience-label">{role.label}</p>
            <StatusBadge status="professional" />
          </article>
          <article>
            <p className="eyebrow">Documented responsibilities</p>
            <ul className="numbered-evidence">
              {role.responsibilities.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell">
          <p className="eyebrow">Operational pattern</p>
          <h2 className="medium-heading">How the work is framed</h2>
          <p className="case-copy">A simplified L1 workflow is shown to explain the nature of operational support. It is not a claim that every incident follows an identical internal process.</p>
          <OperationsFlow />
        </div>
      </section>
      <section className="section-block">
        <div className="shell boundary-panel">
          <div><p className="eyebrow">Boundary</p><h2>What this experience does not claim.</h2></div>
          <p>Basic Azure and AWS portal monitoring exposure is not presented as cloud architecture ownership, production platform engineering or senior cloud administration. Those are directions for growth, not retroactive job titles.</p>
        </div>
      </section>
    </main>
  );
}
