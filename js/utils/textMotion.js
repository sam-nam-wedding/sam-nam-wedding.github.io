import { scrollTimeline } from "../config/scrollTimeline.js?v=inv69";
import { easeInOutCubic } from "./interpolate.js";

const EASE = "power2.out";
const DURATION = 0.32;

function trigger(el, start = "top 92%") {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
    return undefined;
  }
  return {
    trigger: el,
    start,
    toggleActions: "play none none none",
    once: true,
    fastScrollEnd: true,
  };
}

function motion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return null;
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function show(els) {
  els.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
  });
}

export function FadeUp(targets, options = {}) {
  const api = motion();
  const els = [...(typeof targets[Symbol.iterator] === "function" ? targets : [targets])];
  if (!els.length) return;
  if (reduced() || !api) {
    show(els);
    return;
  }
  const { gsap } = api;
  els.forEach((el) => {
  const track = el.hasAttribute("data-track") || options.track;
  const from = { opacity: 0, y: 12 };
  const to = {
    opacity: 1,
    y: 0,
    duration: options.duration || DURATION,
    ease: EASE,
    scrollTrigger: trigger(el, options.start || "top 90%"),
  };
  if (track) {
    from.letterSpacing = options.fromTracking || "0.28em";
    to.letterSpacing = options.toTracking || "0.06em";
  }
  gsap.fromTo(el, from, to);
  });
}

export function RevealText(targets, options = {}) {
  FadeUp(targets, options);
}

export function StaggerText(container, childSelector = "[data-line]", options = {}) {
  const api = motion();
  const kids = [...container.querySelectorAll(childSelector)];
  if (!kids.length) return;
  if (reduced() || !api) {
    show(kids);
    return;
  }
  const { gsap } = api;
  const tl = gsap.timeline({
    scrollTrigger: trigger(container, options.start || "top 88%"),
  });
  kids.forEach((el, i) => {
    const emphasize =
      el.classList.contains("invite__person") ||
      el.classList.contains("invite__date") ||
      el.classList.contains("event-scene__title");
    tl.fromTo(
      el,
      { opacity: 0, y: emphasize ? 12 : 8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.4,
        ease: EASE,
      },
      i === 0 ? 0 : `>${options.stagger ?? 0.12}`
    );
  });
}

export function LineDraw(target, options = {}) {
  const api = motion();
  if (!target) return;
  if (reduced() || !api) {
    target.style.transform = "scaleX(1)";
    return;
  }
  const { gsap } = api;
  gsap.fromTo(
    target,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: options.duration || 0.5,
      ease: "power2.out",
      transformOrigin: "center center",
      scrollTrigger: trigger(target, options.start || "top 90%"),
    }
  );
}

export function LetterReveal(target, options = {}) {
  const api = motion();
  if (!target) return;
  const text = target.textContent;
  target.textContent = "";
  const chars = [...text].map((char) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char === " " ? "\u00a0" : char;
    target.append(span);
    return span;
  });
  if (reduced() || !api) {
    show(chars);
    return;
  }
  const { gsap } = api;
  gsap.fromTo(
    chars,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.22,
      stagger: 0.008,
      ease: EASE,
      scrollTrigger: trigger(target, options.start || "top 90%"),
    }
  );
}

export function SoftScale(targets, options = {}) {
  const api = motion();
  const els = [...(typeof targets[Symbol.iterator] === "function" ? targets : [targets])];
  if (!els.length) return;
  if (reduced() || !api) {
    show(els);
    return;
  }
  const { gsap } = api;
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 12, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.36,
        ease: EASE,
        scrollTrigger: trigger(el, options.start || "top 90%"),
      }
    );
  });
}

export function FadeThrough(targets, options = {}) {
  const api = motion();
  const els = [...(typeof targets[Symbol.iterator] === "function" ? targets : [targets])];
  if (!els.length) return;
  if (reduced() || !api) {
    show(els);
    return;
  }
  const { gsap } = api;
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: options.duration || 0.45,
        ease: "power1.out",
        scrollTrigger: trigger(el, options.start || "top 90%"),
      }
    );
  });
}

export function StrokeDraw(svg, options = {}) {
  if (!svg) return;
  const paths = [...svg.querySelectorAll("path")];
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.dataset.length = String(length);
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
  });
  const api = motion();
  if (reduced() || !api) {
    paths.forEach((path) => {
      path.style.strokeDashoffset = "0";
    });
    return;
  }
  const { gsap } = api;
  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 0.12,
    stagger: 0.02,
    ease: "power1.out",
    scrollTrigger: trigger(svg, options.start || "top 90%"),
  });
}

export function InviteReveal(root) {
  if (!root) return;
  const stage = root.querySelector(".invite-stage");
  const card = root.querySelector(".invite-card");
  const ganesha = root.querySelector(".invite-ganesha img");
  const names = [...root.querySelectorAll(".invite__person, .invite__join")];
  const lines = [...root.querySelectorAll(".invite-card [data-line]")];
  const ornaments = [...root.querySelectorAll(".invite-ornament")];
  show([ganesha, ...names, ...lines].filter(Boolean));
  ornaments.forEach((el) => {
    el.style.transform = "scaleX(1)";
  });
  if (!stage || !card) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const place = () => {
    if (reduced) {
      card.style.opacity = "1";
      card.style.pointerEvents = "auto";
      return;
    }
    const intro = document.querySelector(".temple-intro");
    const vh = window.innerHeight || 1;
    const scrollable = Math.max((intro?.offsetHeight || vh) - vh, 1);
    const blurStartPx = scrollTimeline.blurToDark[0] * scrollable;
    const appearAt = blurStartPx + vh * 0.12;
    const fadeEnd = Math.min(scrollable, blurStartPx + vh * 0.92);
    const remain = Math.max(fadeEnd - appearAt, vh * 0.35);
    const travel = Math.min(1, Math.max(0, (window.scrollY - appearAt) / remain));
    const eased = easeInOutCubic(travel);
    card.style.opacity = eased.toFixed(3);
    card.style.pointerEvents = eased > 0.92 ? "auto" : "none";
    if (eased > 0.9) card.classList.add("is-settled");
  };
  place();
  window.addEventListener("scroll", place, { passive: true });
  window.addEventListener("resize", place);
}

export function attachScrollReveals(root) {
  root.querySelectorAll("[data-stagger]").forEach((block) => {
    StaggerText(block, "[data-line]");
  });
  FadeUp(root.querySelectorAll("[data-motion='fade-up']"));
  SoftScale(root.querySelectorAll("[data-motion='soft-scale']"));
  FadeThrough(root.querySelectorAll("[data-motion='fade-through']"));
  root.querySelectorAll("[data-motion='line-draw']").forEach((el) => LineDraw(el));
  root.querySelectorAll("[data-motion='letter-reveal']").forEach((el) => LetterReveal(el));
  root.querySelectorAll("[data-motion='stroke-draw']").forEach((el) => StrokeDraw(el));
}
