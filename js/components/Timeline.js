import { timelineEvents } from "../config/events.js?v=chapra";

function chapterMarkup(event, index) {
  const eager = index === 0;
  return `
    <article
      class="chapter chapter--${event.layout} chapter--${event.side}"
      data-chapter
      id="${event.id}"
    >
      <span class="chapter__marker" aria-hidden="true"></span>
      <figure class="chapter__figure" data-reveal="image">
        <img
          src="${event.image}"
          alt="${event.alt}"
          loading="${eager ? "eager" : "lazy"}"
          decoding="async"
          sizes="(max-width: 860px) 92vw, 46vw"
        />
      </figure>
      <div class="chapter__copy">
        <h3 class="chapter__title" data-reveal="title">${event.title}</h3>
        <p class="chapter__description" data-reveal="description">${event.description}</p>
        <div class="chapter__meta" data-reveal="meta">
          <p class="chapter__date">${event.date}</p>
          <p class="chapter__time">${event.time}</p>
          <p class="chapter__venue"><span>Venue</span> ${event.venue}</p>
        </div>
      </div>
    </article>
  `;
}

export function Timeline() {
  const section = document.createElement("section");
  section.className = "timeline";
  section.id = "timeline";
  section.setAttribute("aria-label", "Wedding celebrations");
  section.innerHTML = `
    <div class="timeline__rail" aria-hidden="true">
      <span class="timeline__line"></span>
    </div>
    ${timelineEvents.map(chapterMarkup).join("")}
  `;
  return section;
}

export function attachTimeline(timeline, celebrations) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chapters = timeline.querySelectorAll("[data-chapter]");

  if (reduced) {
    celebrations.classList.add("is-visible");
    chapters.forEach((chapter) => chapter.classList.add("is-visible"));
    timeline.style.setProperty("--line-progress", "1");
    return;
  }

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.22, rootMargin: "0px 0px -6% 0px" }
  );

  reveal.observe(celebrations);
  chapters.forEach((chapter) => reveal.observe(chapter));

  let frame = 0;

  function paintLine() {
    frame = 0;
    const rect = timeline.getBoundingClientRect();
    const start = window.innerHeight * 0.62;
    const travel = Math.max(timeline.offsetHeight - window.innerHeight * 0.2, 1);
    const progress = Math.min(1, Math.max(0, (start - rect.top) / travel));
    timeline.style.setProperty("--line-progress", progress.toFixed(4));
  }

  function schedule() {
    if (frame) return;
    frame = window.requestAnimationFrame(paintLine);
  }

  paintLine();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}
