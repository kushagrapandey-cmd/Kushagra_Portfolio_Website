"use client";

import { useRef, type ReactNode } from "react";

export function ProjectRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * (node.clientWidth * .85), behavior: reduced ? "instant" : "smooth" });
  }
  return (
    <div className="project-rail-shell">
      <div className="rail-toolbar">
        <p id="project-rail-help">Explore the builds <span aria-hidden="true">↔</span> <small>Swipe, scroll sideways or use the arrows.</small></p>
        <div className="rail-buttons">
          <button type="button" className="button button-quiet" aria-label="Previous projects" aria-controls="project-rail" onClick={() => move(-1)}>←</button>
          <button type="button" className="button button-quiet" aria-label="Next projects" aria-controls="project-rail" onClick={() => move(1)}>→</button>
        </div>
      </div>
      <div ref={rail} id="project-rail" className="project-rail" tabIndex={0} role="region" aria-label="Software project showcase" aria-describedby="project-rail-help">{children}</div>
    </div>
  );
}
