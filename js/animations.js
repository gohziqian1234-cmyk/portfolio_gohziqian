export async function initAnimations() {
  await loadGsapAssets();
  initHeroTitleReveal();
  initScrollReveals();
  initTimelineAnimation();
  initCounters();
  initProjectTabs();
  initButtonInteractions();
  initTestimonialCylinder();
}

function initHeroTitleReveal() {
  const title = document.querySelector(".hero-title");
  if (!title) return;

  const lineSpans = Array.from(title.children);
  lineSpans.forEach((line) => {
    const original = line.textContent;
    line.setAttribute("aria-label", original);
    line.textContent = "";
    Array.from(original).forEach((char) => {
      const span = document.createElement("span");
      span.className = `char${char === " " ? " char-space" : ""}${line.classList.contains("blue-text") ? " char-accent" : ""}`;
      span.textContent = char === " " ? "\u00a0" : char;
      line.appendChild(span);
    });
  });

  const chars = title.querySelectorAll(".char");
  const gsap = window.gsap;
  if (!gsap) {
    chars.forEach((char) => {
      char.style.opacity = "1";
      char.style.transform = "none";
    });
    return;
  }

  gsap.set(chars, {
    opacity: 0,
    rotateX: 90,
    z: -200,
    transformOrigin: "center bottom"
  });

  gsap.to(chars, {
    opacity: 1,
    rotateX: 0,
    z: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    stagger: 0.03,
    delay: 0.3
  });
}

function initScrollReveals() {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealItems.length) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    revealItems.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => el.classList.add("is-visible")
        }
      });
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -14% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initTimelineAnimation() {
  const timelines = Array.from(document.querySelectorAll("[data-timeline]"));
  if (!timelines.length) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  timelines.forEach((timeline) => {
    const progress = timeline.querySelector(".timeline-progress");
    const items = Array.from(timeline.querySelectorAll(".timeline-item"));

    if (progress && gsap && ScrollTrigger) {
      gsap.fromTo(
        progress,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 74%",
            end: "bottom 74%",
            scrub: true
          }
        }
      );
    } else if (progress) {
      progress.style.height = "100%";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          item.classList.add("is-active", "is-visible");
          if (gsap) {
            const index = items.indexOf(item);
            gsap.fromTo(
              item,
              { opacity: 0, x: index % 2 === 0 ? -42 : 42, rotateY: index % 2 === 0 ? -10 : 10 },
              { opacity: 1, x: 0, rotateY: 0, duration: 0.75, ease: "power3.out" }
            );
            gsap.fromTo(item.querySelector(".timeline-dot"), { scale: 0.2 }, { scale: 1, duration: 0.55, ease: "back.out(1.7)" });
          }
          observer.unobserve(item);
        });
      },
      { threshold: 0.28 }
    );

    items.forEach((item) => observer.observe(item));
  });

  document.fonts?.ready?.then(() => window.ScrollTrigger?.refresh()).catch(() => {});
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
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = finalText;
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
      if (active) {
        grid.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
      }
    });

    if (updateUrl) history.replaceState(null, "", `?category=${category}`);
  };

  buttons.forEach((button) => button.addEventListener("click", () => activate(button.dataset.tabButton)));

  const params = new URLSearchParams(window.location.search);
  activate(params.get("category") === "hardware" ? "hardware" : "software", false);
}

function initButtonInteractions() {
  const targets = Array.from(
    document.querySelectorAll(".button, .pill-button, .mini-button, .submit-button, .tab-button, .modal-button, .nav-cta, .mobile-hire")
  );

  targets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance > Math.max(rect.width, rect.height) / 2 + 50) return;
      target.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
    });

    target.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });

    target.addEventListener("click", (event) => {
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "button-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    });
  });
}

function initTestimonialCylinder() {
  const marquee = document.querySelector(".marquee");
  if (!marquee || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = Array.from(marquee.querySelectorAll(".marquee-track:first-child .quote-card"));
  if (cards.length < 4) return;

  const radius = Math.max(360, cards.length * 58);
  cards.forEach((card, index) => {
    card.style.setProperty("--cylinder-angle", `${(360 / cards.length) * index}deg`);
    card.style.setProperty("--cylinder-radius", `${radius}px`);
  });

  marquee.classList.add("is-cylinder");
}

function loadGsapAssets() {
  if (window.gsap && window.ScrollTrigger) return Promise.resolve();
  return loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js")
    .then(() => loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"))
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
