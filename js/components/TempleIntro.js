import { nameRevealCopy, templeAssets } from "../config/templeAssets.js?v=inv25";
import { scrollTimeline } from "../config/scrollTimeline.js?v=inv11";
import { getSectionProgress } from "../utils/scrollProgress.js";
import { clamp, easeOutCubic, segmentProgress } from "../utils/interpolate.js";
import { TempleScene } from "./TempleScene.js?v=inv3";
import { DoorTransition } from "./DoorTransition.js?v=inv3";
import { HallwayReveal } from "./HallwayReveal.js?v=inv3";
import { NameReveal } from "./NameReveal.js?v=inv10";

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
    </div>
  `;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const skip = document.querySelector("[data-skip-intro]");

  function apply(progress) {
    progress = engageNameHold(progress);
    const temple = templeScene.compute(progress);
    const door = doorTransition.compute(progress);
    const hallway = hallwayReveal.compute(progress);
    const name = nameReveal.compute(progress);
    const exitVeil = easeOutCubic(segmentProgress(progress, ...scrollTimeline.exitIntro));
    const skyOpacity = 1 - easeOutCubic(segmentProgress(progress, ...scrollTimeline.skyLine));
    const hint = 1 - clamp(progress / 0.06, 0, 1);
    const stageCream = segmentProgress(
      progress,
      scrollTimeline.nameFadeOut[0],
      scrollTimeline.exitIntro[1]
    );

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

    if (skip) {
      skip.hidden = progress >= scrollTimeline.nameFadeOut[0];
      skip.classList.toggle("skip-intro--on-cream", exitVeil > 0.45);
    }

    if (nameLocked) return;

    if (progress < scrollTimeline.nameFadeOut[1] - 0.02) {
      jumped = false;
    } else if (!jumped && progress >= scrollTimeline.nameFadeOut[1]) {
      jumpToInvite();
    }
  }

  let frame = 0;
  let attached = false;
  let jumped = false;
  let nameLocked = false;
  let scrollsWhileLocked = 0;
  let lastGestureAt = 0;
  let lockY = 0;
  const gestureGap = 700;

  function holdScrollTop() {
    const scrollable = Math.max(root.offsetHeight - window.innerHeight, 1);
    return scrollTimeline.holdName[0] * scrollable;
  }

  function engageNameHold(progress) {
    if (prefersReduced || jumped || nameLocked) return progress;
    if (progress < scrollTimeline.holdName[0]) return progress;
    nameLocked = true;
    scrollsWhileLocked = 0;
    lastGestureAt = performance.now();
    lockY = holdScrollTop();
    if (window.scrollY > lockY + 1) window.scrollTo(0, lockY);
    return scrollTimeline.holdName[0];
  }

  function registerHoldGesture() {
    if (!nameLocked) return;
    const now = performance.now();
    if (now - lastGestureAt < gestureGap) return;
    lastGestureAt = now;
    scrollsWhileLocked += 1;
    if (scrollsWhileLocked >= 3) jumpToInvite();
  }

  function releaseNameHold() {
    nameLocked = false;
    scrollsWhileLocked = 0;
  }

  function onWheel(event) {
    if (!nameLocked) return;
    if (event.deltaY < 0) {
      releaseNameHold();
      return;
    }
    if (event.deltaY > 0) {
      event.preventDefault();
      registerHoldGesture();
    }
  }

  function onTouchMove(event) {
    if (!nameLocked) return;
    const touch = event.touches[0];
    if (!touch || touchStartY == null) return;
    const delta = touchStartY - touch.clientY;
    if (delta < -16) {
      releaseNameHold();
      return;
    }
    if (delta > 16) {
      event.preventDefault();
      registerHoldGesture();
    }
  }

  let touchStartY = null;

  function onTouchStart(event) {
    touchStartY = event.touches[0]?.clientY ?? null;
  }

  function onKeyDown(event) {
    if (!nameLocked) return;
    const down = event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
    const up = event.key === "ArrowUp" || event.key === "PageUp";
    if (up) {
      releaseNameHold();
      return;
    }
    if (!down || event.repeat) return;
    event.preventDefault();
    registerHoldGesture();
  }

  function onScroll() {
    if (nameLocked && window.scrollY < lockY - 48) {
      releaseNameHold();
    } else if (nameLocked && window.scrollY > lockY + 2) {
      registerHoldGesture();
      if (nameLocked) window.scrollTo(0, lockY);
      return;
    }
    schedule();
  }

  function jumpToInvite() {
    if (jumped) return;
    releaseNameHold();
    jumped = true;
    const invite = document.querySelector(".invitation");
    if (!invite) return;
    window.scrollTo({
      top: invite.getBoundingClientRect().top + window.scrollY,
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
  }

  function detach() {
    attached = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("keydown", onKeyDown);
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  }

  function skipToEnd() {
    releaseNameHold();
    jumpToInvite();
    apply(1);
  }

  return { root, attach, detach, skipToEnd, apply };
}
