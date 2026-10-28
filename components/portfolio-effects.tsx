"use client";

import { useEffect, useRef, useState } from "react";

/** Small, finite animations: no polling loop and no replacement of native scrolling. */
export function PortfolioEffects() {
  const layer = useRef<HTMLDivElement>(null);
  const [effectsOn, setEffectsOn] = useState(true);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let lastTrail = 0;
    function particle(x: number, y: number) {
      const host = layer.current;
      if (!host || !effectsOn || reduced.matches || host.childElementCount >= 24) return;
      const dot = document.createElement("span");
      dot.className = "cursor-spark";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      host.appendChild(dot);
      const animation = dot.animate(
        [{ transform: "translate(-50%, -50%) scale(.4)", opacity: .8 },
         { transform: "translate(-50%, -50%) scale(.05)", opacity: 0 }],
        { duration: 420, easing: "ease-out" },
      );
      animation.onfinish = () => dot.remove();
    }
    function pointer(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse" || performance.now() - lastTrail < 40) return;
      lastTrail = performance.now();
      particle(event.clientX, event.clientY);
    }
    function clear() { layer.current?.replaceChildren(); }
    document.addEventListener("pointermove", pointer, { passive: true });
    reduced.addEventListener("change", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      document.removeEventListener("pointermove", pointer);
      reduced.removeEventListener("change", clear);
      document.removeEventListener("visibilitychange", clear);
      clear();
    };
  }, [effectsOn]);

  return (
    <>
      <div ref={layer} className="interaction-layer" aria-hidden="true" />
      <aside className="experience-controls" aria-label="Interaction preferences">
        <button type="button" aria-pressed={effectsOn} onClick={() => setEffectsOn(!effectsOn)}>Cursor trail {effectsOn ? "on" : "off"}</button>
      </aside>
    </>
  );
}
