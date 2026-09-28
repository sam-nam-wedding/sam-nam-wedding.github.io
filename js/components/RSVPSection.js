/** RSVP — reserved for the invitation phase. */
export function RSVPSection() {
  const section = document.createElement("section");
  section.className = "rsvp-section";
  section.setAttribute("hidden", "");
  return section;
}
