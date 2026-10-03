import { invitationAudio } from "../config/audio.js?v=inv34";

const gestureEvents = ["pointerdown", "touchend", "wheel"];

export function attachInvitationAudio() {
  const audio = new Audio(invitationAudio);
  audio.loop = true;
  audio.preload = "auto";
  audio.playsInline = true;
  audio.volume = 0.33;
  audio.hidden = true;
  document.body.appendChild(audio);

  let started = false;
  let ending = false;
  let attempt = false;

  function removeGestures() {
    for (const name of gestureEvents) {
      window.removeEventListener(name, onGesture, true);
    }
  }

  function onGesture() {
    if (started || ending || attempt) return;
    attempt = true;
    audio.play().then(() => {
      started = true;
      removeGestures();
    }).catch(() => {
      attempt = false;
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

  function onScroll() {
    if (ending) return;
    const closing = document.querySelector("#closing");
    if (!closing) return;
    if (closing.getBoundingClientRect().top < window.innerHeight * 0.8) fadeOut();
  }

  audio.play().then(() => {
    started = true;
    removeGestures();
  }).catch(() => {});
  window.addEventListener("scroll", onScroll, { passive: true });
  for (const name of gestureEvents) {
    window.addEventListener(name, onGesture, { capture: true, passive: true });
  }
}
