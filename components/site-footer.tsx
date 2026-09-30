import Link from "next/link";
import { profile } from "@/data/profile";
import { ExternalLink } from "./external-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Kushagra Pandey</p>
          <p className="footer-statement">
            Infrastructure support, Azure certification, cloud learning and a software-engineering foundation.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          <Link href="/resume">Resume</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Kushagra Pandey.</span>
        <span>Built with Next.js + TypeScript.</span>
      </div>
    </footer>
  );
}
