import {
  celebrationsHeading,
  celebrationsAddress,
  celebrationsMapsUrl,
  weddingEvents,
} from "../config/invitation.js?v=inv36";
import { attachScrollReveals } from "../utils/textMotion.js?v=inv24";

const pinSvg = `
  <svg class="maps-link__pin" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 2.4a7.1 7.1 0 0 0-7.1 7.1c0 5.3 7.1 12.1 7.1 12.1s7.1-6.8 7.1-12.1A7.1 7.1 0 0 0 12 2.4zm0 9.6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
`;

function mapsLink(href, label = "View on Google Maps") {
  if (!href) return "";
  return `
    <a class="maps-link" href="${href}" target="_blank" rel="noopener noreferrer">
      ${pinSvg}
      <span>${label}</span>
    </a>
  `;
}

function venueMarkup(event) {
  const extra = event.extra
    ? `<p class="event-scene__extra" data-line>${event.extra}</p>`
    : "";
  const lines = event.venueLines
    .map((line) => `<p class="event-scene__place" data-line>${line}</p>`)
    .join("");
  const hint = event.mapsUrl
    ? `<p class="event-scene__maps" data-line>${mapsLink(event.mapsUrl)}</p>`
    : "";
  return `
    <p class="event-scene__venue" data-line>${event.venue}</p>
    ${lines}
    ${hint}
    ${extra}
  `;
}

function sceneMarkup(event, index) {
  return `
    <article class="event-scene event-scene--${event.side} event-scene--${event.id}" id="${event.id}">
      <figure class="event-scene__atmosphere">
        <img src="${event.image}" alt="${event.alt}" loading="${index === 0 ? "eager" : "lazy"}" />
      </figure>
      <div class="event-scene__copy" data-stagger>
        <p class="event-scene__date" data-line>${event.date}</p>
        <p class="event-scene__weekday" data-line>${event.weekday}</p>
        <span class="event-scene__diamond" aria-hidden="true"></span>
        <h3 class="event-scene__title" data-line>${event.title}</h3>
        <p class="event-scene__time" data-line>${event.time}</p>
        ${venueMarkup(event)}
      </div>
    </article>
  `;
}

export function EventSection() {
  const section = document.createElement("section");
  section.className = "celebrations-block";
  section.id = "celebrations";
  section.innerHTML = `
    <header class="celebrations-heading">
      <div class="celebrations-heading__crest" aria-hidden="true">
        <span></span>
        <svg viewBox="0 0 48 36" fill="none">
          <path fill="currentColor" d="M24 34c.2-6.4 2.8-11.2 7.6-14.6 1.6-1.1 3.6-.6 4.6 1 1.8 2.8.6 6.6-2.4 8.4-3.4 2-6.8 3.6-9.8 5.2z"/>
          <path fill="currentColor" d="M24 34c-.2-6.4-2.8-11.2-7.6-14.6-1.6-1.1-3.6-.6-4.6 1-1.8 2.8-.6 6.6 2.4 8.4 3.4 2 6.8 3.6 9.8 5.2z"/>
          <path fill="currentColor" d="M24 33.6c2.2-7.4 1.4-13.8-1.8-19.2-.9-1.6.1-3.6 1.8-4.1 1.7-.5 3.5.6 3.9 2.3 1.6 5.8 1.2 12.4-3.9 21z"/>
          <path fill="currentColor" d="M24 32c4.8-5.2 10.6-8 16.8-8.4 1.8-.1 3.2 1.4 3.1 3.1-.1 1.7-1.6 3-3.4 2.9-6 .4-11.4 1.6-16.5 4.4z"/>
          <path fill="currentColor" d="M24 32c-4.8-5.2-10.6-8-16.8-8.4-1.8-.1-3.2 1.4-3.1 3.1.1 1.7 1.6 3 3.4 2.9 6 .4 11.4 1.6 16.5 4.4z"/>
          <circle cx="24" cy="14.2" r="2.1" fill="currentColor"/>
        </svg>
        <span></span>
      </div>
      <h2 class="celebrations-heading__title" data-motion="fade-up">${celebrationsHeading}</h2>
    </header>
    ${weddingEvents.map(sceneMarkup).join("")}
    <p class="celebrations-address" data-motion="fade-up">${celebrationsAddress}</p>
    <p class="celebrations-maps" data-motion="fade-up">${mapsLink(celebrationsMapsUrl)}</p>
    <span class="celebrations-end" aria-hidden="true">
      <svg viewBox="0 0 48 36" fill="none">
        <path fill="currentColor" d="M24 34c.2-6.4 2.8-11.2 7.6-14.6 1.6-1.1 3.6-.6 4.6 1 1.8 2.8.6 6.6-2.4 8.4-3.4 2-6.8 3.6-9.8 5.2z"/>
        <path fill="currentColor" d="M24 34c-.2-6.4-2.8-11.2-7.6-14.6-1.6-1.1-3.6-.6-4.6 1-1.8 2.8-.6 6.6 2.4 8.4 3.4 2 6.8 3.6 9.8 5.2z"/>
        <circle cx="24" cy="14.2" r="2.1" fill="currentColor"/>
      </svg>
    </span>
  `;
  return section;
}

export function attachEvents(section) {
  attachScrollReveals(section);
}
