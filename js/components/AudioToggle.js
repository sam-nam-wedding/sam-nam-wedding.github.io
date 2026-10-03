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
    if (ending || audio.paused) return;
    ending = true;
    hideButton();
    audio.loop = false;
    audio.preservesPitch = true;
    const fromVolume = audio.volume;
    const fromRate = audio.playbackRate || 1;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 3600);
      const eased = t * t * (3 - 2 * t);
      audio.playbackRate = fromRate + (0.4 - fromRate) * eased;
      audio.volume = fromVolume * (1 - eased);
      if (t < 1) {
        window.requestAnimationFrame(step);
        return;
      }
      audio.pause();
      audio.playbackRate = 1;
    };
    window.requestAnimationFrame(step);
  }

  function onScroll() {
    if (ending) return;
    const closing = document.querySelector("#closing");
    if (!closing) return;
    const names = closing.querySelector(".closing__names") || closing;
    const top = names.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.9) fadeOut();
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
