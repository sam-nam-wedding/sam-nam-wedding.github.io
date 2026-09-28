import { celebrationsCopy } from "../config/events.js";

export function StorySection() {
  const section = document.createElement("section");
  section.className = "celebrations";
  section.id = "celebrations";
  section.innerHTML = `
    <div class="celebrations__inner">
      <p class="celebrations__eyebrow">${celebrationsCopy.eyebrow}</p>
      <h2 class="celebrations__title">${celebrationsCopy.title}</h2>
    </div>
  `;
  return section;
}
