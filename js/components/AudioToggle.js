import { invitationAudio } from "../config/audio.js?v=inv34";

const gestureEvents = ["pointerdown", "pointerup", "touchend", "wheel"];

export function attachInvitationAudio() {
  const audio = new Audio(invitationAudio);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.33;

  let started = false;
  let ending = false;
  let pending = false;

  function removeGestures() {
    for (const name of gestureEvents) {
      window.removeEventListener(name, begin, true);
    }
  }

  function markStarted() {
    started = true;
    pending = false;
    removeGestures();
  }

  function begin() {
    if (started || ending || pending) return;
    pending = true;
    audio.play().then(markStarted).catch(() => {
      pending = false;
    });
  }

  function fadeOut() {
    if (ending) return;
    ending = true;
    removeGestures();
    audio.loop = false;
    const from = audio.volume;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 1400);
      audio.volume = from * (1 - t);
      if (t < 1) {
        window.requestAnimationFrame(step);
        return;
      }
      audio.pause();
    };
    window.requestAnimationFrame(step);
  }

  function onScroll(event) {
    if (!started && navigator.userActivation?.isActive) begin(event);
    if (ending) return;
    const closing = document.querySelector("#closing");
    if (!closing) return;
    if (closing.getBoundingClientRect().top < window.innerHeight * 0.8) fadeOut();
  }

  begin();
  window.addEventListener("scroll", onScroll, { passive: true });
  for (const name of gestureEvents) {
    window.addEventListener(name, begin, { capture: true, passive: true });
  }
}
