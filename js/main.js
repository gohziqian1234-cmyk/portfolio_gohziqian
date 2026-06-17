/* Main entry point. No build step required. */

import { initNavigation } from "./nav.js";
import { initThreeScene } from "./three-scene.js";
import { initAnimations } from "./animations.js";
import { initCursorGlow, initTilt } from "./tilt.js";
import { initProjectModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  initNavigation();
  initTilt();
  initCursorGlow();
  initProjectModal();
  initContactForm();
  initThreeScene();
  await initAnimations();
});

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const button = form.querySelector("[data-submit-button]");
  const status = form.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";

    window.setTimeout(() => {
      button.textContent = "Message Sent!";
      status.textContent = "Thanks. This static form is ready to connect to a backend or Formspree endpoint.";
      form.reset();

      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send Message";
      }, 2600);
    }, 850);
  });
}
