import { TempleIntro } from "./components/TempleIntro.js?v=inv85";
import { attachInvitationAudio } from "./components/AudioToggle.js?v=inv86";
import { attachGlitterRain } from "./components/GlitterRain.js?v=inv33";
import { FormalInvitation, attachInvitation } from "./components/FormalInvitation.js?v=inv80";
import { EventSection, attachEvents } from "./components/EventSection.js?v=inv36";
import { Countdown, attachCountdown } from "./components/Countdown.js?v=inv24";
import { ClosingNote } from "./components/ClosingNote.js?v=inv25";
import { WeddingDetails } from "./components/WeddingDetails.js";
import { RSVPSection } from "./components/RSVPSection.js";

const app = document.querySelector("#app");

const intro = TempleIntro();
const invite = FormalInvitation();
const events = EventSection();
const countdown = Countdown();
const closing = ClosingNote();
const invitation = document.createElement("main");
invitation.className = "invitation";
invitation.append(invite, events, countdown, closing, WeddingDetails(), RSVPSection());

app.append(intro.root, invitation);
intro.attach();
attachInvitation(invite);
attachEvents(events);
attachCountdown(countdown);

attachInvitationAudio();
attachGlitterRain();

const skip = document.querySelector("[data-skip-intro]");
skip?.addEventListener("click", () => {
  intro.skipToEnd();
});
