import { invitationAudio } from "../config/audio.js?v=inv34";

export function attachInvitationAudio() {
  const audio = new Audio(invitationAudio);
  audio.loop = true;
  audio.preload = "auto";
  audio.playsInline = true;
  audio.volume = 0.33;
  audio.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;display:block";
  document.body.appendChild(audio);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "play-invite";
  button.setAttribute("aria-label", "Play");
  button.innerHTML = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M24 18.5v27l22-13.5z"></path>
    </svg>
    <span>Play</span>
  `;
  document.body.appendChild(button);

  let started = false;
  let ending = false;

  function hideButton() {
    button.hidden = true;
  }

  function fadeOut() {
    if (ending) return;
    ending = true;
    hideButton();
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

  button.addEventListener("click", () => {
    if (ending) return;
    audio.play().then(() => {
      started = true;
      hideButton();
    }).catch(() => {});
  });

  audio.play().then(() => {
    started = true;
    hideButton();
  }).catch(() => {});
  window.addEventListener("scroll", onScroll, { passive: true });
}
