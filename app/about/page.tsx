import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { education, profile } from "@/data/profile";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Software foundation. Infrastructure reality. Cloud direction."
        intro="A career path from software-development projects into infrastructure operations, Azure certification and cloud-focused learning."
      />
      <section className="section-block">
        <div className="shell about-story-layout">
          <figure className="about-portrait-card">
            <div className="about-portrait-frame">
              <Image
                className="about-portrait-image"
                src="/images/kushagra-formal.webp"
                alt="Formal portrait of Kushagra Pandey"
                width={400}
                height={600}
                sizes="(max-width: 820px) 210px, 240px"
              />
            </div>
            <figcaption>
              <span className="mono-label">ENGINEERING JOURNEY</span>
              <strong>From software projects to enterprise infrastructure.</strong>
            </figcaption>
          </figure>

          <div className="story-grid about-story-grid">
            <article><span className="story-number">01</span><StatusBadge status="project" /><h2>Software foundation</h2><p>Computer Science education and earlier projects built experience with React, Node.js, Express, MongoDB, Next.js and related application-development patterns.</p></article>
            <article><span className="story-number">02</span><StatusBadge status="professional" /><h2>Infrastructure exposure</h2><p>Professional work shifted the focus toward monitoring, Windows Server troubleshooting, health checks, incident handling and basic cloud-portal monitoring.</p></article>
            <article><span className="story-number">03</span><StatusBadge status="learning" /><h2>Cloud direction</h2><p>Azure certifications support a deliberate move toward deeper cloud administration, Linux, networking, automation and DevOps engineering.</p></article>
          </div>
        </div>
      </section>
      <section className="section-block section-contrast">
        <div className="shell">
          <p className="eyebrow">Education</p>
          <div className="education-grid top-gap">
            {education.map((item) => (
              <article key={item.qualification} className="education-card">
                <p className="mono-label">{item.period}</p><h3>{item.qualification}</h3><p>{item.institution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-block">
        <div className="shell boundary-panel">
          <div><p className="eyebrow">Engineering principle</p><h2>Understand more of the stack, then automate it responsibly.</h2></div>
          <p>My current direction is toward roles where operational understanding can grow into stronger Azure, infrastructure-as-code, delivery automation and platform skills. Technologies move from learning to stronger evidence categories only when there is project or professional work behind them.</p>
        </div>
      </section>
      <section className="contact-section compact-contact">
        <div className="shell contact-grid"><div><p className="eyebrow">Contact</p><h2>Professional links</h2></div><div className="contact-actions"><a className="button button-primary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span></a><a className="button button-quiet" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in a new tab)</span></a></div></div>
      </section>
    </main>
  );
}
