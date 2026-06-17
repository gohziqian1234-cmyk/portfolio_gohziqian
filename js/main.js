import { initNavigation } from "./nav.js";
import { initThreeScene } from "./three-scene.js";
import { initAnimations } from "./animations.js";
import { initTilt } from "./tilt.js";
import { initProjectModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.body.classList.add("is-ready");
  initNavigation();
  initTilt();
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
  const defaultText = button?.textContent || "Send Message";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!button) return;
    button.disabled = true;
    button.classList.add("is-loading");
    button.textContent = "Sending...";
    if (status) status.textContent = "";

    window.setTimeout(() => {
      button.classList.remove("is-loading");
      button.classList.add("is-success");
      button.textContent = "Message Sent!";
      createButtonBurst(button);
      if (status) {
        status.textContent = "Thanks. This static form is ready to connect to a backend or Formspree endpoint.";
      }
      form.reset();

      window.setTimeout(() => {
        button.disabled = false;
        button.classList.remove("is-success");
        button.textContent = defaultText;
      }, 3000);
    }, 900);
  });
}

function createButtonBurst(button) {
  const rect = button.getBoundingClientRect();
  for (let i = 0; i < 14; i += 1) {
    const particle = document.createElement("span");
    particle.className = "submit-particle";
    const angle = (Math.PI * 2 * i) / 14;
    const distance = 26 + Math.random() * 24;
    particle.style.left = `${rect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top + rect.height / 2}px`;
    particle.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  }
}
