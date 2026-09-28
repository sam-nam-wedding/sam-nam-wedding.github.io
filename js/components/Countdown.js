import { celebrationsMapsUrl } from "../config/invitation.js?v=inv24";

const TARGET = new Date("2026-12-03T08:30:00+05:30");
const pinSvg = `
  <svg class="maps-link__pin" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 2.4a7.1 7.1 0 0 0-7.1 7.1c0 5.3 7.1 12.1 7.1 12.1s7.1-6.8 7.1-12.1A7.1 7.1 0 0 0 12 2.4zm0 9.6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
`;

function pad(value) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function remaining(now = new Date()) {
  const diff = Math.max(0, TARGET.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    done: diff <= 0,
  };
}

function unitMarkup(id, label) {
  return `
    <div class="countdown__unit">
      <span class="countdown__value" data-unit="${id}">00</span>
      <span class="countdown__label">${label}</span>
    </div>
  `;
}

export function Countdown() {
  const section = document.createElement("section");
  section.className = "countdown";
  section.id = "countdown";
  section.setAttribute("aria-label", "Countdown to the wedding");
  section.innerHTML = `
    <p class="countdown__kicker">Counting down to</p>
    <h2 class="countdown__title">The Big Day</h2>
    <span class="countdown__mark" aria-hidden="true">♥</span>
    <div class="countdown__grid" role="timer" aria-live="polite">
      ${unitMarkup("days", "Days")}
      ${unitMarkup("hours", "Hours")}
      ${unitMarkup("minutes", "Minutes")}
      ${unitMarkup("seconds", "Seconds")}
    </div>
    <p class="countdown__date">03 December 2026 · Shringar Palace Gardens</p>
    <p class="countdown__maps">
      <a class="maps-link" href="${celebrationsMapsUrl}" target="_blank" rel="noopener noreferrer">
        ${pinSvg}
        <span>View on Google Maps</span>
      </a>
    </p>
  `;
  return section;
}

export function attachCountdown(section) {
  const values = {
    days: section.querySelector('[data-unit="days"]'),
    hours: section.querySelector('[data-unit="hours"]'),
    minutes: section.querySelector('[data-unit="minutes"]'),
    seconds: section.querySelector('[data-unit="seconds"]'),
  };

  function paint() {
    const next = remaining();
    values.days.textContent = pad(next.days);
    values.hours.textContent = pad(next.hours);
    values.minutes.textContent = pad(next.minutes);
    values.seconds.textContent = pad(next.seconds);
    if (next.done) {
      window.clearInterval(timer);
    }
  }

  paint();
  const timer = window.setInterval(paint, 1000);
}
