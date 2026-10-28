import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ExternalLink } from "./external-link";
import { StatusBadge } from "./status-badge";

type CaseStudyLayoutProps = { project: Project };

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  return (
    <main>
      <section className="case-hero">
        <div className="shell case-hero-grid">
          <div>
            <Link className="back-link" href="/work">← Engineering Work</Link>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="case-lede">{project.context}</p>
            <div className="case-meta"><StatusBadge status={project.status} /><span>Repository-backed project evidence</span></div>
          </div>
          <div className="case-side-card">
            <p className="mono-label">TECHNOLOGIES</p>
            <ul className="tag-list">
              {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
            {project.live && <ExternalLink className="button button-primary" href={project.live}>Open live demo</ExternalLink>}
            {project.slug === "cloudops-sentinel" && <ExternalLink className="text-link" href="https://cloudops-sentinel-three.vercel.app/linux.html">Linux VM workbench</ExternalLink>}
            <ExternalLink className="button button-quiet" href={project.repo}>View repository</ExternalLink>
          </div>
        </div>
      </section>

      <div className="shell case-body">
        {project.screenshot && <figure className="case-preview"><Image src={project.screenshot} alt={project.screenshotAlt || project.title} width={1200} height={800} sizes="(max-width: 800px) 95vw, 1100px" /><figcaption>Demo interface · October 2026{project.slug === "cloudops-sentinel" ? " · Browser simulation, not a live cluster" : ""}</figcaption></figure>}
        <section className="case-section">
          <p className="eyebrow">01 / Problem</p>
          <h2>What the project explores</h2>
          <p className="case-copy">{project.problem}</p>
        </section>

        <section className="case-section architecture-section">
          <div>
            <p className="eyebrow">02 / Architecture</p>
            <h2>System shape</h2>
            <p className="case-copy">A simplified view of the components documented in the public repository.</p>
          </div>
          <ArchitectureDiagram nodes={project.architecture} label={`${project.title} architecture`} />
        </section>

        <section className="case-section split-section">
          <div>
            <p className="eyebrow">03 / Implemented</p>
            <h2>What exists in the repository</h2>
          </div>
          <ul className="evidence-list">
            {project.contributions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        {project.slug === "cloudops-sentinel" && <section className="case-section">
          <p className="eyebrow">Recovery walkthrough / Reproducible local lab</p>
          <h2>Readiness failure: isolate, recover, verify</h2>
          <p className="case-copy">The repository drill deliberately creates /tmp/sentinel-not-ready in one container. Its readiness check fails while the process remains alive. Kubernetes marks that pod unready; the other replica remains available. This is a controlled kind exercise, separate from the browser simulator.</p>
          <ol className="evidence-list">
            <li><strong>Observe:</strong> inspect pod readiness, events, logs and Service endpoints before restarting anything. A running process alone does not prove it can serve traffic.</li>
            <li><strong>Root cause:</strong> the injected marker makes the readiness endpoint fail. Liveness and readiness answer different questions; restarting the deployment would hide the diagnostic signal.</li>
            <li><strong>Recover:</strong> remove the injected marker from the affected container. The readiness probe then allows that replica to rejoin service traffic.</li>
            <li><strong>Verify:</strong> wait for Ready=true, inspect EndpointSlices and check rollout status. The script also exercises pod replacement and rollback from a deliberately missing image.</li>
          </ol>
          <div className="terminal-note"><code>Repository diagnostic commands</code><pre style={{whiteSpace:"pre-wrap", overflowWrap:"anywhere"}}>{`# Use the isolated kind-sentinel context
kubectl --context kind-sentinel -n sentinel get pods,svc,endpointslices -o wide
kubectl --context kind-sentinel -n sentinel get events --sort-by=.lastTimestamp
kubectl --context kind-sentinel -n sentinel logs -l app=sentinel --tail=50 --prefix=true
# After removing the injected marker, verify all replicas
kubectl --context kind-sentinel -n sentinel wait --for=condition=Ready pod -l app=sentinel --timeout=120s
kubectl --context kind-sentinel -n sentinel rollout status deployment/sentinel`}</pre></div>
          <p className="case-copy">Reproduce with scripts/local-cluster.sh, scripts/diagnose.sh and scripts/drills.sh from the project directory. The drill enforces the kind-sentinel context. Evidence is the script assertions and CI logs, rather than an invented uptime or recovery-time metric.</p>
          <ExternalLink className="text-link" href="https://github.com/kushagrapandey-cmd/Devops-Learning/blob/main/projects/cloudops-sentinel/scripts/drills.sh">Read the recovery drill source</ExternalLink>
        </section>}

        <section className="case-section split-section limitation-panel">
          <div>
            <p className="eyebrow">04 / Current limitations</p>
            <h2>Constraints visible in the current repository</h2>
          </div>
          <ul className="evidence-list">
            {project.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-section split-section">
          <div>
            <p className="eyebrow">05 / Next iteration</p>
            <h2>What I would improve</h2>
          </div>
          <ul className="evidence-list">
            {project.improvements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
