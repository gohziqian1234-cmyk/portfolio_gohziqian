/* Scroll and UI animation. Base CSS stays visible if JS fails. */

export async function initAnimations() {
  await loadGsapAssets();

  document.body.classList.add("reveal-ready");
  initRevealObserver();
  initHeroIntro();
  initTimelineProgress();
  initCounters();
  initProjectTabs();
}

function initRevealObserver() {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initHeroIntro() {
  const gsap = window.gsap;
  if (!gsap) return;

  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  gsap.fromTo(
    ".hero-title span, .hero-subtitle, .hero-pill-actions, .hero-profile",
    { opacity: 0, y: 34 },
    { opacity: 1, y: 0, stagger: 0.08, delay: 0.1 }
  );
}

function initTimelineProgress() {
  const timelines = Array.from(document.querySelectorAll("[data-timeline]"));
  if (!timelines.length) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  timelines.forEach((timeline) => {
    const progress = timeline.querySelector(".timeline-progress");
    const items = Array.from(timeline.querySelectorAll(".timeline-item"));
    if (!progress) return;

    if (gsap && ScrollTrigger) {
      gsap.fromTo(
        progress,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 72%",
            end: "bottom 72%",
            scrub: true
          }
        }
      );

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 74%",
          onEnter: () => item.classList.add("is-active"),
          onEnterBack: () => item.classList.add("is-active")
        });
      });
    } else {
      progress.style.height = "100%";
      items.forEach((item) => item.classList.add("is-active"));
    }
  });

  if (document.fonts?.ready && window.ScrollTrigger) {
    document.fonts.ready.then(() => window.ScrollTrigger.refresh()).catch(() => {});
  }
}

function initCounters() {
  const counters = Array.from(document.querySelectorAll("[data-count]"));
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted === "true") return;
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const finalText = element.dataset.count;
  const target = Number.parseFloat(finalText);
  if (Number.isNaN(target)) {
    element.textContent = finalText;
    return;
  }

  const isDecimal = finalText.includes(".");
  const start = performance.now();
  const duration = 1050;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    element.textContent = isDecimal ? value.toFixed(1) : String(Math.round(value));

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = finalText;
    }
  };

  requestAnimationFrame(tick);
}

function initProjectTabs() {
  const buttons = Array.from(document.querySelectorAll("[data-tab-button]"));
  const grids = Array.from(document.querySelectorAll("[data-project-grid]"));
  if (!buttons.length || !grids.length) return;

  const activate = (category, updateUrl = true) => {
    buttons.forEach((button) => {
      const active = button.dataset.tabButton === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    grids.forEach((grid) => {
      const active = grid.dataset.projectGrid === category;
      grid.hidden = !active;
      grid.classList.toggle("is-active", active);
      if (active) grid.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
    });

    if (updateUrl) history.replaceState(null, "", `?category=${category}`);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => activate(button.dataset.tabButton));
  });

  const params = new URLSearchParams(window.location.search);
  activate(params.get("category") === "hardware" ? "hardware" : "software", false);
}

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
