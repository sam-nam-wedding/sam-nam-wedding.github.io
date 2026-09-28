import { invitationAudio } from "../config/audio.js?v=inv34";

const startEvents = ["pointerdown", "keydown", "touchstart", "wheel"];

export function attachInvitationAudio() {
  const audio = new Audio(invitationAudio);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.55;

  const hint = document.querySelector("[data-music-hint]");
  let started = false;

  function hideHint() {
    if (hint) hint.hidden = true;
  }

  function clearStartListeners() {
    for (const eventName of startEvents) {
      window.removeEventListener(eventName, startOnGesture);
    }
  }

  async function startOnGesture() {
    if (started) return;
    try {
      await audio.play();
      started = true;
      hideHint();
      clearStartListeners();
    } catch {
      started = false;
    }
  }

  audio.play().then(() => {
    started = true;
    hideHint();
  }).catch(() => {
    for (const eventName of startEvents) {
      window.addEventListener(eventName, startOnGesture, { passive: true });
    }
  });
}
