export function ClosingNote() {
  const section = document.createElement("footer");
  section.className = "closing";
  section.id = "closing";
  section.innerHTML = `
    <div class="invite-ornament closing__rule" aria-hidden="true">
      <span></span>
      <i></i>
      <span></span>
    </div>
    <p class="closing__lead">Come celebrate with us.</p>
    <p class="closing__line">Your presence, love and blessings are what make this celebration truly complete.</p>
    <p class="closing__sign">With love,</p>
    <p class="closing__names">Sam &amp; Nam</p>
  `;
  return section;
}
