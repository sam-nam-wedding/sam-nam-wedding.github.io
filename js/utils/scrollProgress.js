import { clamp } from "./interpolate.js";

/**
 * Maps the sticky intro section's scroll position to 0–1.
 * progress = 0 at first pin, 1 when the section leaves the viewport.
 */
export function getSectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const scrollable = Math.max(rect.height - window.innerHeight, 1);
  return clamp(-rect.top / scrollable, 0, 1);
}
