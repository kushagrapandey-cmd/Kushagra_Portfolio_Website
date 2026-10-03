import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { certifications, education, experience, focusAreas, internship, profile, softwareFoundation } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main>
      <PageHero
        eyebrow="Resume view"
        title={profile.name}
        intro={`${profile.headline}. ${profile.direction}.`}
        aside={<><p className="mono-label">LATEST PDF</p><p>Two-page ATS-oriented resume aligned with this portfolio.</p><a className="button button-primary resume-download-action" href={profile.resumePdf} download>Download resume PDF</a></>}
      />
      <section className="section-block resume-section">
        <div className="shell resume-layout">
          <aside className="resume-sidebar">
            <div><p className="eyebrow">Contact</p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in a new tab)</span></a><a href={`mailto:${profile.email}`}>Email</a><a href={profile.resumePdf} download>Download PDF ↓</a></div>
            <div><p className="eyebrow">Certifications</p>{certifications.map((cert) => <div className="resume-cert" key={cert.code}><strong>{cert.code}</strong><span>{cert.name}</span></div>)}</div>
            <div><p className="eyebrow">Education</p>{education.map((item) => <div className="resume-education" key={item.qualification}><strong>{item.qualification}</strong><span>{item.institution}</span><small>{item.period}</small></div>)}</div>
          </aside>
          <div className="resume-main">
            <section><p className="eyebrow">Profile</p><h2 className="sr-only">Professional profile</h2><p className="resume-summary">{profile.summary}</p></section>
            <section>
              <p className="eyebrow">Skills</p>
              <h2>Skills by evidence</h2>
              <div className="resume-skill-grid top-gap">
                <div><StatusBadge status="professional" /><h3>Professional</h3><p>{focusAreas.professional.join(" · ")}</p></div>
                <div><StatusBadge status="certified" /><h3>Certified</h3><p>{focusAreas.certified.join(" · ")}</p></div>
                <div><StatusBadge status="learning" /><h3>Developing</h3><p>{focusAreas.learning.join(" · ")}</p></div>
                <div><StatusBadge status="project" /><h3>Software foundation</h3><p>{softwareFoundation.join(" · ")}</p></div>
              </div>
            </section>
            {experience.map((role) => <section key={role.project}><div className="resume-heading"><p className="eyebrow">HCLTech · {role.period}</p><StatusBadge status="professional" /></div><h2>{role.project}</h2><p className="project-context">{role.context}</p><p className="mono-label">{role.tools.join(" · ")}</p><ul className="evidence-list">{role.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
            <section><div className="resume-heading"><div><p className="eyebrow">Projects</p><h2>Selected projects</h2></div><StatusBadge status="project" /></div>{projects.map((project) => <article className="resume-project" key={project.slug}><h3>{project.title}</h3><p>{project.summary}</p><small>{project.stack.join(" · ")}</small></article>)}</section>
            <section><p className="eyebrow">Internship</p><h2>{internship.title} · {internship.organization}</h2><p className="mono-label">{internship.period}</p><ul className="evidence-list">{internship.details.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
        </div>
      </section>
    </main>
  );
}
