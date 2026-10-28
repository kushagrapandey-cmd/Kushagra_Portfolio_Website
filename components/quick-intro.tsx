export function QuickIntro() {
  return (
    <details className="quick-intro">
      <summary><span className="intro-indicator" aria-hidden="true" />A little about me <span className="intro-duration">30-second intro +</span></summary>
      <div className="intro-body">
        <p>Hi, I&apos;m Kushagra. I work at HCLTech, where my experience spans Ericsson L1.5 infrastructure support and ICC shift leadership for Benchmark Electronics.</p>
        <p>I enjoy figuring out how systems work, from Linux and networking to Azure. I apply Linux, Bash, Python and container fundamentals in CloudOps Sentinel, alongside deployed full-stack projects and AZ-900 and AZ-104 certifications.</p>
        <a className="text-link" href="#contact">Let&apos;s connect <span aria-hidden="true">↗</span></a>
      </div>
    </details>
  );
}
