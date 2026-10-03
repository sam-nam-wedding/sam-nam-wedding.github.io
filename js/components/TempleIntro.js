import { nameRevealCopy, templeAssets } from "../config/templeAssets.js?v=inv25";
import { scrollTimeline } from "../config/scrollTimeline.js?v=inv69";
import { getSectionProgress } from "../utils/scrollProgress.js";
import { clamp, easeInOutCubic, easeOutCubic, segmentProgress } from "../utils/interpolate.js";
import { TempleScene } from "./TempleScene.js?v=inv69";
import { DoorTransition } from "./DoorTransition.js?v=inv69";
import { HallwayReveal } from "./HallwayReveal.js?v=inv69";
import { NameReveal } from "./NameReveal.js?v=inv69";

export function TempleIntro() {
  const templeScene = TempleScene();
  const doorTransition = DoorTransition();
  const hallwayReveal = HallwayReveal();
  const nameReveal = NameReveal();

  const root = document.createElement("section");
  root.className = "temple-intro";
  root.setAttribute("aria-label", "Cinematic temple entrance");
  root.innerHTML = `
    <div class="temple-intro__sticky">
      <div class="temple-intro__stage">
        <div class="temple-layer temple-layer--sky">
          <img src="${templeAssets.sky.src}" alt="${templeAssets.sky.alt}" draggable="false" />
        </div>
        <div class="temple-layer temple-layer--temple">
          <img src="${templeAssets.temple.src}" alt="${templeAssets.temple.alt}" draggable="false" />
        </div>
        <div class="temple-layer temple-layer--door">
          <img src="${templeAssets.door.src}" alt="${templeAssets.door.alt}" draggable="false" />
        </div>
        <div class="temple-layer temple-layer--hallway">
          <img src="${templeAssets.hallway.src}" alt="${templeAssets.hallway.alt}" draggable="false" />
        </div>
        <div class="temple-intro__vignette" aria-hidden="true"></div>
        <img class="sky-line" src="${nameRevealCopy.monogram}" alt="SN" draggable="false" />
        <div class="name-reveal">
          <div class="name-reveal__inner">
            <h1 class="name-reveal__title" aria-label="SAM-NAM">
              <span class="name-reveal__word">${nameRevealCopy.first}</span>
              <span class="name-reveal__dash" aria-hidden="true">-</span>
              <span class="name-reveal__word">${nameRevealCopy.second}</span>
            </h1>
            <div class="name-reveal__rule" aria-hidden="true">
              <span class="name-reveal__rule-line"></span>
              <svg class="name-reveal__lotus" viewBox="0 0 48 36" fill="none">
                <path fill="currentColor" d="M24 34c.2-6.4 2.8-11.2 7.6-14.6 1.6-1.1 3.6-.6 4.6 1 1.8 2.8.6 6.6-2.4 8.4-3.4 2-6.8 3.6-9.8 5.2z"/>
                <path fill="currentColor" d="M24 34c-.2-6.4-2.8-11.2-7.6-14.6-1.6-1.1-3.6-.6-4.6 1-1.8 2.8-.6 6.6 2.4 8.4 3.4 2 6.8 3.6 9.8 5.2z"/>
                <path fill="currentColor" d="M24 33.6c2.2-7.4 1.4-13.8-1.8-19.2-.9-1.6.1-3.6 1.8-4.1 1.7-.5 3.5.6 3.9 2.3 1.6 5.8 1.2 12.4-3.9 21z"/>
                <path fill="currentColor" d="M24 32c4.8-5.2 10.6-8 16.8-8.4 1.8-.1 3.2 1.4 3.1 3.1-.1 1.7-1.6 3-3.4 2.9-6 .4-11.4 1.6-16.5 4.4z"/>
                <path fill="currentColor" d="M24 32c-4.8-5.2-10.6-8-16.8-8.4-1.8-.1-3.2 1.4-3.1 3.1.1 1.7 1.6 3 3.4 2.9 6 .4 11.4 1.6 16.5 4.4z"/>
                <circle cx="24" cy="14.2" r="2.1" fill="currentColor"/>
              </svg>
              <span class="name-reveal__rule-line"></span>
            </div>
          </div>
        </div>
        <div class="temple-intro__exit" aria-hidden="true"></div>
        <div class="scroll-hint" aria-hidden="true">
          <span class="scroll-hint__label">Scroll to enter</span>
          <span class="scroll-hint__line"></span>
        </div>
      </div>
      <div class="temple-intro__night" aria-hidden="true"></div>
    </div>
  `;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const skip = document.querySelector("[data-skip-intro]");

  function apply(progress) {
    const temple = templeScene.compute(progress);
    const door = doorTransition.compute(progress);
    const hallway = hallwayReveal.compute(progress);
    const name = nameReveal.compute(progress);
    const darkT = easeInOutCubic(segmentProgress(progress, ...scrollTimeline.blurToDark)) * 0.28;
    const exitVeil = 0;
    const skyOpacity = 1 - easeOutCubic(segmentProgress(progress, ...scrollTimeline.skyLine));
    const hint = 1 - clamp(progress / 0.06, 0, 1);
    const stageCream = 0;

    root.style.setProperty("--gopura-top", `${temple.top}vh`);
    root.style.setProperty("--temple-scale", String(temple.scale));
    root.style.setProperty("--sky-shift", `${temple.skyShift}vh`);
    root.style.setProperty("--sky-scale", String(temple.skyScale));
    root.style.setProperty("--temple-opacity", String(temple.opacity));
    root.style.setProperty("--sky-opacity", String(skyOpacity));
    root.style.setProperty("--door-scale", String(door.scale));
    root.style.setProperty("--door-opacity", String(door.opacity));
    root.style.setProperty("--hallway-scale", String(hallway.scale));
    root.style.setProperty("--hallway-opacity", String(hallway.opacity));
    root.style.setProperty("--name-opacity", String(name.title));
    root.style.setProperty("--rule-opacity", String(name.rule));
    root.style.setProperty("--subtitle-opacity", String(name.subtitle));
    root.style.setProperty("--exit-veil", String(exitVeil));
    root.style.setProperty("--hint-opacity", String(hint));
    root.style.setProperty("--stage-cream", String(stageCream));
    root.style.setProperty("--scene-dark", darkT.toFixed(3));
    root.style.setProperty("--scene-blur", `${(darkT * 22).toFixed(2)}px`);

    if (skip) {
      skip.hidden = progress >= scrollTimeline.blurToDark[0];
      skip.classList.toggle("skip-intro--on-cream", exitVeil > 0.45);
    }

  }

  let frame = 0;
  let attached = false;
  let jumped = false;

  function jumpToInvite() {
    if (jumped) return;
    jumped = true;
    const intro = document.querySelector(".temple-intro");
    const vh = window.innerHeight || 1;
    const scrollable = Math.max((intro?.offsetHeight || 0) - vh, 1);
    window.scrollTo({
      top: scrollTimeline.blurToDark[1] * scrollable + vh * 0.9,
      behavior: "auto",
    });
    window.ScrollTrigger?.refresh();
  }

  function schedule() {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      apply(getSectionProgress(root));
    });
  }

  function attach() {
    if (attached) return;
    attached = true;
    if (prefersReduced) {
      apply(1);
      return;
    }
    apply(0);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function detach() {
    attached = false;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  }

  function skipToEnd() {
    jumpToInvite();
    apply(1);
  }

  return { root, attach, detach, skipToEnd, apply };
}
