import { invitationAudio } from "../config/audio.js?v=inv32";

const startEvents = ["pointerdown", "keydown", "touchstart", "wheel"];

export function attachInvitationAudio() {
  const audio = new Audio(invitationAudio);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.55;

  let started = false;

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
      clearStartListeners();
    } catch {
      started = false;
    }
  }

  audio.play().then(() => {
    started = true;
  }).catch(() => {
    for (const eventName of startEvents) {
      window.addEventListener(eventName, startOnGesture, { passive: true });
    }
  });
}
