import Image from "next/image";
import { ProjectRail } from "@/components/project-rail";
import { QuickIntro } from "@/components/quick-intro";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ExternalLink } from "@/components/external-link";
import { FocusGrid } from "@/components/focus-grid";
import { OperationsFlow } from "@/components/operations-flow";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function HomePage() {
  const role = experience[0];

  return (
    <main>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">ENGINEERING PROFILE / 2026</p>
            <h1>{profile.name}</h1>
            <p className="hero-role">{profile.headline}</p>
            <p className="hero-direction">{profile.direction}</p>
            <p className="hero-summary">{profile.summary}</p>
            <QuickIntro />
            <div className="hero-actions">
              <Link className="button button-primary" href="/work/cloudops-sentinel">Explore CloudOps Sentinel</Link>
              <Link className="button button-quiet" href="/resume">Resume view</Link>
              <a className="button button-quiet" href={profile.resumePdf} download>Download PDF</a>
            </div>
            <ul className="hero-proof" aria-label="Profile evidence summary">
              <li><span>01</span><strong>Professional</strong><small>Infrastructure support</small></li>
              <li><span>02</span><strong>Certified</strong><small>AZ-104 · AZ-900</small></li>
              <li><span>03</span><strong>Hands-on</strong><small>Linux · Cloud · DevOps</small></li>
            </ul>
          </div>
          <div className="hero-visual-column">
            <figure className="hero-portrait-card">
              <div className="hero-portrait-frame">
                <Image
                  className="hero-portrait-image"
                  src="/images/kushagra-headshot.webp"
                  alt="Portrait of Kushagra Pandey"
                  width={300}
                  height={308}
                  priority
                  sizes="(max-width: 560px) 92px, 132px"
                />
              </div>
              <figcaption>
                <p className="mono-label">KUSHAGRA PANDEY</p>
                <strong>Infrastructure operations + cloud projects</strong>
                <span>Production support experience, Azure certifications and working software and cloud labs.</span>
              </figcaption>
            </figure>
            <div className="case-side-card"><p className="mono-label">OPERATIONS SCOPE</p><h2>Enterprise support. Applied cloud skills.</h2><p>HCLTech · Ericsson L1.5 support · Benchmark ICC shift leadership.</p><p>AZ-104 + AZ-900 · Linux diagnostics · Container recovery labs.</p><Link className="text-link" href="/cloud">Cloud &amp; DevOps evidence →</Link></div>
          </div>
        </div>
      </section>

      <section className="section-block section-contrast">
        <div className="shell">
          <SectionHeading
            eyebrow="01 / Engineering work"
            title="Selected builds. Real interfaces. Live demos."
            description="Explore cloud operations, semantic search, patient-controlled records and interactive web applications. Each case study explains the architecture, features and current scope."
          />
          <ProjectRail>
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </ProjectRail>
          <div className="section-action"><Link className="button button-quiet" href="/work">View engineering work archive</Link></div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="02 / Current focus"
            title="Skills shown with their evidence."
            description="Production operations, Azure credentials and applied project skills across Linux, automation and containers."
          />
          <FocusGrid />
        </div>
      </section>

      <section className="section-block section-contrast">
        <div className="shell">
          <SectionHeading
            eyebrow="03 / Professional experience"
            title="Operating in production environments."
            description="HCLTech experience spans Ericsson Rhythm Team L1.5 support and Benchmark Electronics ICC shift leadership."
          />
          <div className="experience-feature">
            <div className="experience-copy">
              <div className="experience-heading-row">
                <div>
                  <p className="mono-label">{role.period}</p>
                  <h3>{role.project}</h3>
                  <p className="project-context">{role.company} · {role.context}</p>
                </div>
                <StatusBadge status="professional" />
              </div>
              <p className="experience-label">{role.label}</p>
              <ul className="evidence-list compact-list">
                {role.responsibilities.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="project-context">Previously: Ericsson · Dec 2024 – Oct 2025 · Rhythm Team L1.5 support and MFL coordination.</p>
              <Link className="text-link" href="/experience">Full experience breakdown <span aria-hidden="true">→</span></Link>
            </div>
            <div className="operations-panel">
              <p className="mono-label">L1 OPERATIONS FLOW</p>
              <OperationsFlow />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell contact-form-grid">
          <div className="contact-form-copy">
            <p className="eyebrow">04 / Contact</p>
            <h2>Let&apos;s talk infrastructure, Azure, cloud or engineering work.</h2>
            <p>Send a short message from this page. It is delivered to my personal inbox, and you can also reach me through LinkedIn or GitHub.</p>
            <div className="contact-actions contact-actions-left">
              <ExternalLink className="button button-primary" href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink className="button button-quiet" href={profile.github}>GitHub</ExternalLink>
              <a className="button button-quiet" href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
