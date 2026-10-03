import { invitationCopy } from "../config/invitation.js?v=inv14";
import { InviteReveal } from "../utils/textMotion.js?v=inv69";

export function FormalInvitation() {
  const section = document.createElement("section");
  section.className = "invite";
  section.id = "invitation";
  section.innerHTML = `
    <div class="invite-stage">
      <div class="invite-card">
        <div class="invite__opening">
          <div class="invite-ganesha" aria-hidden="true">
            <img src="./images/ganesha.png?v=inv14" alt="" />
          </div>
          <div class="invite-ornament" aria-hidden="true">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        <div class="invite__couple">
          <h2 class="invite__person">
            <span class="invite__person-text">${invitationCopy.groom.name}</span>
          </h2>
          <p class="invite__join">&amp;</p>
          <h2 class="invite__person">
            <span class="invite__person-text">${invitationCopy.bride.name}</span>
          </h2>
        </div>

        <div class="invite__body">
          <p class="invite__line" data-line>${invitationCopy.inviteLine}</p>
          <p class="invite__line" data-line>${invitationCopy.journeyLine}</p>
        </div>
      </div>
    </div>
  `;
  return section;
}

export function attachInvitation(root) {
  InviteReveal(root);
}
