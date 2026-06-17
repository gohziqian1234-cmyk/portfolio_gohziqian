function initAnimations() {
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
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -14% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initHeroIntro() {
  const gsap = window.gsap;
  if (!gsap) return;

  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  gsap.fromTo(
    ".hero-title span, .hero-subtitle, .hero-cta-pill, .hero-panel",
    { opacity: 0, y: 34 },
    { opacity: 1, y: 0, stagger: 0.08, delay: 0.12 }
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
            start: "top 70%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          onEnter: () => item.classList.add("is-active"),
          onEnterBack: () => item.classList.add("is-active")
        });
      });
    } else {
      progress.style.height = "100%";
      items.forEach((item) => item.classList.add("is-active"));
    }
  });

  if (document.fonts?.ready && ScrollTrigger) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
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
    { threshold: 0.5 }
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

  const activate = (category) => {
    buttons.forEach((button) => {
      const active = button.dataset.tabButton === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    grids.forEach((grid) => {
      const active = grid.dataset.projectGrid === category;
      grid.hidden = !active;
      grid.classList.toggle("is-active", active);
      if (active) {
        grid.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
      }
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activate(button.dataset.tabButton);
      history.replaceState(null, "", `?category=${button.dataset.tabButton}`);
    });
  });

  const params = new URLSearchParams(window.location.search);
  activate(params.get("category") === "hardware" ? "hardware" : "software");
}

window.initAnimations = initAnimations;
