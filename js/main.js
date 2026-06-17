document.addEventListener("DOMContentLoaded", () => {
  window.initNavigation?.();
  window.initTilt?.();
  window.initProjectModal?.();
  initContactForm();
  window.initThreeScene?.();

  loadGsapAssets().finally(() => {
    window.initAnimations?.();
  });
});

function loadGsapAssets() {
  if (window.gsap && window.ScrollTrigger) return Promise.resolve();

  return loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
    .then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"))
    .catch(() => {});
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });
}

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
