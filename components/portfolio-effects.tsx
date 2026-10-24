"use client";

import { useEffect, useRef, useState } from "react";

/** Small, finite animations: no polling loop and no replacement of native scrolling. */
export function PortfolioEffects() {
  const layer = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const sound = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const [effectsOn, setEffectsOn] = useState(true);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let lastTrail = 0;
    function particle(x: number, y: number, click: boolean) {
      const host = layer.current;
      if (!host || !effectsOn || reduced.matches || host.childElementCount >= 24) return;
      const dot = document.createElement("span");
      dot.className = click ? "click-orbit" : "cursor-spark";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      host.appendChild(dot);
      const animation = dot.animate(
        [{ transform: "translate(-50%, -50%) scale(.4)", opacity: .8 },
         { transform: `translate(-50%, -50%) scale(${click ? 2.8 : .05})`, opacity: 0 }],
        { duration: click ? 550 : 420, easing: "ease-out" },
      );
      animation.onfinish = () => dot.remove();
    }
    function pointer(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse" || performance.now() - lastTrail < 40) return;
      lastTrail = performance.now();
      particle(event.clientX, event.clientY, false);
    }
    function click(event: MouseEvent) {
      if (event.detail > 0) particle(event.clientX, event.clientY, true);
      if (!sound.current || document.hidden || !audio.current) return;
      // Skip the sound switch itself so turning audio off is always silent.
      if (event.target instanceof Element && event.target.closest("[data-sound-toggle]")) return;
      const context = audio.current;
      void context.resume().then(() => {
        if (!sound.current || context.state !== "running") return;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(620, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(340, context.currentTime + .065);
        gain.gain.setValueAtTime(.025, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .08);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + .09);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      }).catch(() => { /* Audio is optional, navigation must always work. */ });
    }
    function clear() { layer.current?.replaceChildren(); }
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("click", click);
    reduced.addEventListener("change", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("click", click);
      reduced.removeEventListener("change", clear);
      document.removeEventListener("visibilitychange", clear);
      clear();
    };
  }, [effectsOn]);

  useEffect(() => () => { void audio.current?.close(); }, []);

  async function toggleSound() {
    if (sound.current) { sound.current = false; setSoundOn(false); return; }
    try {
      audio.current ??= new AudioContext();
      await audio.current.resume();
      sound.current = audio.current.state === "running";
      setSoundOn(sound.current);
    } catch { sound.current = false; setSoundOn(false); }
  }

  return (
    <>
      <div ref={layer} className="interaction-layer" aria-hidden="true" />
      <aside className="experience-controls" aria-label="Interaction preferences">
        <button type="button" aria-pressed={effectsOn} onClick={() => setEffectsOn(!effectsOn)}>Effects {effectsOn ? "on" : "off"}</button>
        <button type="button" data-sound-toggle aria-pressed={soundOn} onClick={toggleSound}>Sound {soundOn ? "on" : "off"}</button>
      </aside>
    </>
  );
}
