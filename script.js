/*
  Ziqian Portfolio JavaScript
  Structure: shared navigation/menu behavior, page transitions, scroll reveal,
  timeline progress, projects tabs/modals, contact form validation, cursor,
  and the lightweight hero neural canvas.
  Replace project URLs/details in PROJECTS when final links are ready.
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PROJECTS = {
  piano: {
    title: "PIANO TILES",
    image: "images/project-piano-tiles.svg",
    imageAlt: "Piano Tiles rhythm game placeholder graphic",
    description: "A rhythm-based reaction game where players tap falling tiles in time, built with an additional alien-themed arcade mode.",
    problem: "Build a fast-paced, timing-based reactive game to practice real-time input handling, collision detection, and game-state/score management in Python.",
    approachHtml: "Designed a tile-spawning system with increasing difficulty, scoring logic based on accuracy and speed, and a game loop handling player input via Pygame. An additional <span class=\"inline-status inline-status-progress\">IN PROGRESS</span> Alien Invasion arcade mode was started as a companion project within the same repo.",
    results: "Fully playable Piano Tiles game with scoring and increasing difficulty; Alien Invasion mode in active development.",
    // CONFIRM: exact tech stack if different.
    tags: ["Python", "Pygame", "Game Dev"],
    github: "https://github.com/gohziqian1234-cmyk/piano-tiles-alien-",
    // CONFIRM: GitHub Pages must be enabled in repo Settings > Pages, then update this URL if GitHub gives a different address.
    playUrl: "https://gohziqian1234-cmyk.github.io/piano-tiles-alien-/",
    gallery: ["images/project-piano-tiles.svg", "images/project-alien-invasion.svg"]
  },
  erebus: {
    title: "EREBUS-7: FIRST SKIN",
    image: "images/project-erebus-7.svg",
    imageAlt: "Erebus-7 First Skin sci-fi game placeholder graphic",
    description: "A single-player social-horror stealth game about an alien parasite wearing a human host.",
    problem: "Design and build a narrative-driven stealth game exploring tension, suspicion mechanics, and atmosphere - combining storytelling with gameplay systems.",
    // CONFIRM/EXPAND: add specific mechanics, e.g. suspicion meter, dialogue choices, level design details once available.
    approach: "Built core stealth/suspicion mechanics, narrative pacing, and atmospheric presentation to create a tense single-player horror experience.",
    // CONFIRM: any additional results, e.g. number of levels/chapters.
    results: "Completed playable single-player game with full narrative arc.",
    // CONFIRM: actual stack.
    tags: ["Python", "Game Dev", "Stealth/Horror"],
    github: "https://github.com/gohziqian1234-cmyk/erebus-7",
    // CONFIRM: GitHub Pages must be enabled in repo Settings > Pages, then update this URL if GitHub gives a different address.
    playUrl: "https://gohziqian1234-cmyk.github.io/erebus-7/",
    gallery: ["images/project-erebus-7.svg"]
  },
  wheelchair: {
    title: "SMART WHEELCHAIR SYSTEM",
    image: "images/project-smart-wheelchair.svg",
    imageAlt: "Smart wheelchair system blueprint placeholder graphic",
    description: "An assistive hardware system designed to enhance mobility and safety for wheelchair users through embedded sensors and control systems.",
    // CONFIRM/EXPAND: specific problem this addresses, e.g. obstacle detection, fall prevention, navigation assistance.
    problem: "Improve safety and independence for wheelchair users by integrating sensor-based monitoring and/or assistive controls into a standard wheelchair frame.",
    // ADD: describe the system architecture - what sensors were used (ultrasonic, IR, accelerometer, etc.), what microcontroller, how data is processed, any output/alert mechanism.
    approach: "Placeholder architecture: document the microcontroller, sensor inputs, control logic, and alert or assistive output mechanism once exact build details are confirmed.",
    // ADD: outcome - e.g. successfully detects obstacles within X cm, alerts user via buzzer/vibration, etc.
    results: "Placeholder outcome: add measured testing results, safety behavior, and final build notes once available.",
    // CONFIRM: exact components/tech used (e.g. specific microcontroller, sensor types, motor drivers).
    tags: ["Arduino", "Sensors", "C++", "Embedded Systems"],
    github: "",
    gallery: ["images/project-smart-wheelchair.svg", "images/project-smart-wheelchair-build.svg", "images/project-smart-wheelchair-testing.svg"]
  },
  greenhouse: {
    title: "SMART GREENHOUSE SYSTEM",
    image: "images/project-smart-greenhouse.svg",
    imageAlt: "Smart greenhouse system technical placeholder graphic",
    description: "An automated greenhouse monitoring and control system using sensors to track environmental conditions and optimize plant growth.",
    // CONFIRM/EXPAND: specific goals, e.g. automated watering, temperature alerts.
    problem: "Automate environmental monitoring and control for a greenhouse to maintain optimal growing conditions with minimal manual intervention.",
    // ADD: describe system - sensors used, how data is collected/displayed (e.g. LCD screen, app, serial monitor), any automated actuators (water pump, fan, etc.).
    approach: "Placeholder architecture: document the sensor set, microcontroller, data display path, and any automated actuator logic once exact build details are confirmed.",
    // ADD: outcome - e.g. successfully monitors temp/humidity/soil moisture in real-time, automated irrigation triggers at threshold X.
    results: "Placeholder outcome: add monitoring results, threshold behavior, and automation performance once available.",
    // CONFIRM: exact components/tech (e.g. soil moisture sensor, DHT22 temp/humidity sensor, relay for irrigation, ESP32 for WiFi connectivity).
    tags: ["Arduino/ESP32", "Sensors", "C++", "IoT"],
    github: "",
    gallery: ["images/project-smart-greenhouse.svg", "images/project-smart-greenhouse-build.svg", "images/project-smart-greenhouse-testing.svg"]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function setNavHeightVar() {
  const nav = $(".navbar");
  if (!nav) return;

  const computed = getComputedStyle(nav);
  const navTop = Number.parseFloat(computed.top);
  const rect = nav.getBoundingClientRect();
  const topOffset = Number.isFinite(navTop) ? navTop : Math.max(0, rect.top);
  const totalOffset = Math.ceil(nav.offsetHeight + topOffset + 32);
  document.documentElement.style.setProperty("--nav-height", `${totalOffset}px`);

  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}

function getNavOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim();
  const parsed = Number.parseFloat(value);
  if (value.endsWith("rem")) {
    return parsed * Number.parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
  }
  return Number.isFinite(parsed) ? parsed : 112;
}

function isLocalUrl(url) {
  return url.origin === window.location.origin || (url.protocol === "file:" && window.location.protocol === "file:");
}

function isSameDocument(url) {
  return isLocalUrl(url) && url.pathname === window.location.pathname;
}

function initPageTransitions() {
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-transitioning");
  });

  $$("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;
      if (link.target || link.hasAttribute("download")) return;

      const targetUrl = new URL(rawHref, window.location.href);
      if (!isLocalUrl(targetUrl)) return;
      if (isSameDocument(targetUrl) && targetUrl.hash) return;

      event.preventDefault();
      closeMobileMenu();

      if (document.startViewTransition && !prefersReducedMotion) {
        document.body.classList.add("is-transitioning");
        window.setTimeout(() => {
          window.location.href = targetUrl.href;
        }, 180);
        return;
      }

      document.body.classList.add("is-transitioning");
      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, prefersReducedMotion ? 0 : 240);
    });
  });
}

function initSmoothAnchors() {
  $$("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || !rawHref.includes("#")) return;

      const targetUrl = new URL(rawHref, window.location.href);
      if (!isSameDocument(targetUrl) || !targetUrl.hash) return;

      const target = $(targetUrl.hash);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      setNavHeightVar();
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
      window.scrollTo({ top: Math.max(0, targetTop), behavior: prefersReducedMotion ? "auto" : "smooth" });
      history.pushState(null, "", targetUrl.hash);
    });
  });
}

function correctInitialHashOffset() {
  if (!window.location.hash) return;
  const target = $(window.location.hash);
  if (!target) return;
  setNavHeightVar();
  const targetTop = target.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
}

function initMobileMenu() {
  const toggle = $(".menu-toggle");
  const menu = $(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    setMobileMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  $$("[data-mobile-link]").forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

function setMobileMenu(open) {
  const toggle = $(".menu-toggle");
  const menu = $(".mobile-menu");
  const navbar = $(".navbar");
  if (!toggle || !menu) return;

  toggle.classList.toggle("is-open", open);
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (open) navbar?.classList.remove("nav-hidden", "nav-revealed-by-mouse");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.setAttribute("aria-hidden", String(!open));
}

function closeMobileMenu() {
  setMobileMenu(false);
}

function initAutoHideNav() {
  const navbar = $(".navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  let revealedByMouse = false;
  let hideTimer = null;

  const forceShow = () => {
    navbar.classList.remove("nav-hidden", "nav-revealed-by-mouse");
    revealedByMouse = false;
  };

  const hide = () => {
    if (window.scrollY <= 50 || document.body.classList.contains("menu-open") || document.body.classList.contains("modal-open")) return;
    navbar.classList.add("nav-hidden");
    navbar.classList.remove("nav-revealed-by-mouse");
    revealedByMouse = false;
  };

  const update = () => {
    const currentScrollY = window.scrollY;

    if (document.body.classList.contains("menu-open") || document.body.classList.contains("modal-open") || currentScrollY <= 50) {
      forceShow();
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      hide();
    } else if (currentScrollY < lastScrollY) {
      forceShow();
    }

    lastScrollY = Math.max(0, currentScrollY);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  document.addEventListener(
    "mousemove",
    (event) => {
      if (document.body.classList.contains("menu-open") || document.body.classList.contains("modal-open") || window.scrollY <= 50) {
        forceShow();
        return;
      }

      window.clearTimeout(hideTimer);

      if (event.clientY < 100 && navbar.classList.contains("nav-hidden")) {
        navbar.classList.remove("nav-hidden");
        navbar.classList.add("nav-revealed-by-mouse");
        revealedByMouse = true;
      } else if (event.clientY >= 100 && revealedByMouse) {
        hideTimer = window.setTimeout(hide, 800);
      }
    },
    { passive: true }
  );
}

function initActiveMenuLinks() {
  const page = document.body.dataset.page || "home";
  let currentTarget = page === "about" ? "about" : page === "projects" ? "projects" : (window.location.hash.replace("#", "") || "hero");

  const setActive = (target) => {
    currentTarget = target || "hero";
    updateNavIndicator(currentTarget);

    $$("[data-mobile-link]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isActive =
        (currentTarget === "about" && href.includes("about.html")) ||
        (currentTarget === "projects" && href.includes("projects.html")) ||
        (href.includes(`#${currentTarget}`) && currentTarget !== "about" && currentTarget !== "projects");
      link.classList.toggle("is-active", isActive);
    });
  };

  $$("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", () => setActive(link.dataset.section || link.dataset.sectionTarget));
  });

  setActive(currentTarget);
  window.addEventListener("resize", () => requestAnimationFrame(moveActivePill));
  window.addEventListener("load", () => requestAnimationFrame(moveActivePill));

  if (page !== "home" || !("IntersectionObserver" in window)) return;

  const sections = $$("[data-section]");
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { rootMargin: `-${getNavOffset()}px 0px -48% 0px`, threshold: [0.16, 0.32, 0.56] }
  );

  sections.forEach((section) => observer.observe(section));
}

function updateNavIndicator(activeSectionId) {
  const target = activeSectionId || "hero";
  const links = $$("[data-nav-link]");

  links.forEach((link) => {
    const matches = (link.dataset.section || link.dataset.sectionTarget) === target;
    link.classList.toggle("active", matches);
    link.classList.toggle("is-active", matches);
  });

  moveActivePill();
}

function moveActivePill() {
  const track = $(".nav-links-pill") || $(".nav-track");
  if (!track || getComputedStyle(track).display === "none") return;
  const pill = $(".nav-active-indicator", track) || $(".nav-active-pill", track);
  const active = $("a.is-active", track) || $(".nav-link.is-active", track);
  if (!pill || !active) return;

  const trackRect = track.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const left = activeRect.left - trackRect.left;
  const width = activeRect.width;

  if (window.gsap && !prefersReducedMotion) {
    gsap.to(pill, { left, width, opacity: 1, duration: 0.4, ease: "power2.out" });
    return;
  }

  pill.style.left = `${left}px`;
  pill.style.width = `${width}px`;
  pill.style.opacity = "1";
}

function initRevealAnimations() {
  const revealItems = $$("[data-reveal]");
  if (!revealItems.length) return;

  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 0.8 });

    if ($(".hero-word")) {
      gsap.from(".hero-word", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out"
      });
    }

    $$(".timeline-wrap").forEach((wrap) => {
      const progress = $(".timeline-progress", wrap);
      if (!progress) return;
      gsap.to(progress, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: `top+=${getNavOffset()} 72%`,
          end: "bottom 65%",
          scrub: true
        }
      });
    });

    $$(".timeline-item").forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: `top+=${getNavOffset()} 68%`,
        onEnter: () => item.classList.add("is-passed"),
        onLeaveBack: () => item.classList.remove("is-passed")
      });
    });
  } else {
    initTimelineFallback();
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: `-${getNavOffset()}px 0px -5% 0px` }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

function initTimelineFallback() {
  const wraps = $$(".timeline-wrap");
  if (!wraps.length) return;

  let ticking = false;

  const update = () => {
    wraps.forEach((wrap) => {
      const progress = $(".timeline-progress", wrap);
      if (!progress) return;

      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport * 0.45;
      const current = viewport * 0.78 - rect.top;
      const ratio = Math.max(0, Math.min(1, current / total));
      progress.style.height = `${ratio * 100}%`;

      $$(".timeline-item", wrap).forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        item.classList.toggle("is-passed", itemRect.top < viewport * 0.68);
      });
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function initProjectTabs() {
  const tabs = $$("[data-project-tab]");
  const grids = $$("[data-project-grid]");
  if (!tabs.length || !grids.length) return;

  const params = new URLSearchParams(window.location.search);
  const requested = (params.get("category") || window.location.hash.replace("#", "") || "software").toLowerCase();
  const initialCategory = requested === "hardware" ? "hardware" : "software";

  const setCategory = (category, updateUrl = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.projectTab === category;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    grids.forEach((grid) => {
      const active = grid.dataset.projectGrid === category;
      grid.hidden = !active;
      grid.classList.toggle("is-active", active);

      if (active) {
        $$("[data-project-card]", grid).forEach((card, index) => {
          card.classList.remove("is-visible");
          card.style.transitionDelay = `${index * 65}ms`;
          window.setTimeout(() => card.classList.add("is-visible"), 20);
        });
      }
    });

    if (updateUrl) {
      const nextUrl = `${window.location.pathname}?category=${category}`;
      history.replaceState(null, "", nextUrl);
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setCategory(tab.dataset.projectTab, true));
  });

  setCategory(initialCategory, false);
}

function initProjectModal() {
  const modal = $("#project-modal");
  if (!modal) return;

  const content = $(".modal-content", modal);
  const scrollArea = $(".modal-scroll-area", modal);
  let previousFocus = null;
  let closeFallback = null;

  if (!content || !scrollArea) return;

  const finishClose = () => {
    window.clearTimeout(closeFallback);
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "true");
    scrollArea.innerHTML = "";
    document.body.classList.remove("modal-open");
    previousFocus?.focus?.();
  };

  const closeModal = () => {
    if (!modal.classList.contains("active")) return;
    modal.classList.remove("active");
    modal.classList.add("is-closing");

    if (prefersReducedMotion) {
      finishClose();
      return;
    }

    const onTransitionEnd = (event) => {
      if (event.target !== content) return;
      content.removeEventListener("transitionend", onTransitionEnd);
      finishClose();
    };

    content.addEventListener("transitionend", onTransitionEnd);
    closeFallback = window.setTimeout(() => {
      content.removeEventListener("transitionend", onTransitionEnd);
      finishClose();
    }, 380);
  };

  const openModal = (project) => {
    previousFocus = document.activeElement;
    clearProjectCardMotion();
    scrollArea.innerHTML = createModalMarkup(project);
    wireModalGallery(scrollArea);
    wireModalActionRipples(scrollArea);
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => {
      modal.classList.add("active");
      $(".modal-close", modal)?.focus();
    });
  };

  $$("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = PROJECTS[button.dataset.openProject];
      if (project) openModal(project);
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function createModalMarkup(project) {
  const images = project.gallery?.length ? project.gallery : [project.image];
  const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const approach = project.approachHtml || escapeHtml(project.approach || "");
  const actions = createModalActions(project);
  const thumbs = images
    .map(
      (src, index) => `
        <button class="${index === 0 ? "is-active" : ""}" type="button" data-modal-thumb="${escapeHtml(src)}" aria-label="Show project image ${index + 1}">
          <img src="${escapeHtml(src)}" alt="" loading="lazy" />
        </button>
      `
    )
    .join("");

  return `
    <article class="modal-project-layout">
      <header class="modal-project-hero">
        <p class="section-kicker dark">Project</p>
        <h2 id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      <section class="modal-detail-grid" aria-label="Project details">
        <div class="modal-section"><h3>Problem</h3><p>${escapeHtml(project.problem)}</p></div>
        <div class="modal-section"><h3>Solution</h3><p>${approach}</p></div>
        <div class="modal-section"><h3>Results</h3><p>${escapeHtml(project.results)}</p></div>
      </section>

      <div class="tag-list" aria-label="Project tech stack">${tags}</div>

      <section class="modal-gallery" aria-label="Project image gallery">
        <div class="modal-main-image">
          <img src="${escapeHtml(images[0])}" alt="${escapeHtml(project.imageAlt || project.title)}" loading="lazy" data-modal-main-image />
        </div>
        <div class="modal-thumbs" aria-label="Project image thumbnails">${thumbs}</div>
      </section>

      ${actions}
    </article>
  `;
}

function createModalActions(project) {
  const buttons = [];

  if (project.github) {
    buttons.push(`
      <a class="modal-action-button modal-github-button" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" data-modal-action>
        <span aria-hidden="true">&lt;/&gt;</span>
        View on GitHub
      </a>
    `);
  }

  if (project.playUrl) {
    buttons.push(`
      <a class="modal-action-button modal-play-button" href="${escapeHtml(project.playUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
        <span aria-hidden="true">&#9654;</span>
        Try The Game
      </a>
    `);
  }

  if (!buttons.length) return "";

  const repoName = project.github ? `<p class="repo-tag">${escapeHtml(project.github.replace("https://github.com/", ""))}</p>` : "";
  return `
    <section class="modal-action-block" aria-label="Project links">
      ${repoName}
      <div class="modal-actions">${buttons.join("")}</div>
      <p class="modal-link-helper">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
    </section>
  `;
}

function wireModalGallery(root) {
  const mainImage = $("[data-modal-main-image]", root);
  const thumbs = $$("[data-modal-thumb]", root);
  if (!mainImage || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.dataset.modalThumb;
      thumbs.forEach((item) => item.classList.toggle("is-active", item === thumb));
    });
  });
}

function wireModalActionRipples(root) {
  if (prefersReducedMotion) return;
  $$("[data-modal-action]", root).forEach((target) => {
    target.addEventListener("pointerenter", (event) => createEnergyRipple(target, event));
    target.addEventListener("pointerdown", (event) => createEnergyRipple(target, event));
  });
}

function clearProjectCardMotion() {
  $$("[data-project-card]").forEach((card) => {
    card.style.removeProperty("transform");
    card.style.removeProperty("--glow-x");
    card.style.removeProperty("--glow-y");
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initContactForm() {
  const form = $("[data-contact-form]");
  if (!form) return;

  const submit = $(".submit-button", form);
  const submitText = $("span", submit);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = validateForm(form);
    if (!valid) return;

    submit.disabled = true;
    submit.classList.add("is-loading");
    submitText.textContent = "Sending...";

    window.setTimeout(() => {
      submit.classList.remove("is-loading");
      submit.classList.add("is-success");
      submitText.textContent = "Message Sent!";
      form.reset();
      window.setTimeout(() => {
        submit.classList.remove("is-success");
        submit.disabled = false;
        submitText.textContent = "Send Message";
      }, 3000);
    }, 900);
  });
}

function validateForm(form) {
  let valid = true;
  const name = $("#name", form);
  const email = $("#email", form);
  const message = $("#message", form);

  const setError = (field, messageText) => {
    const error = $(`#${field.id}-error`, form);
    field.setAttribute("aria-invalid", messageText ? "true" : "false");
    if (error) error.textContent = messageText;
    if (messageText) valid = false;
  };

  setError(name, name.value.trim() ? "" : "Please enter your name.");
  setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Please enter a valid email.");
  setError(message, message.value.trim().length >= 10 ? "" : "Please write a message of at least 10 characters.");

  return valid;
}

function initStatCounters() {
  const stats = $$(".hero-stat-grid [data-count]");
  if (!stats.length) return;

  const setValue = (item, value) => {
    const decimals = Number(item.dataset.decimals || 0);
    const prefix = item.dataset.prefix || "";
    item.textContent = `${prefix}${value.toFixed(decimals)}`;
  };

  const animate = (item) => {
    if (item.dataset.counted === "true") return;
    item.dataset.counted = "true";
    const target = Number(item.dataset.count || 0);
    const duration = prefersReducedMotion ? 0 : 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = duration ? Math.min(1, (now - start) / duration) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(item, target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    stats.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  stats.forEach((item) => observer.observe(item));
}

function initPhotoTilt() {
  const frame = $(".photo-frame");
  if (!frame || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-3px)`;
  });

  frame.addEventListener("pointerleave", () => {
    frame.style.transform = "";
  });
}

function initCustomCursor() {
  const cursor = $(".cursor-follower");
  if (!cursor || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const current = { x: pointer.x, y: pointer.y };
  let visible = false;

  const render = () => {
    current.x += (pointer.x - current.x) * 0.15;
    current.y += (pointer.y - current.y) * 0.15;
    cursor.style.opacity = visible ? "1" : "0";
    cursor.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      visible = true;
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => {
    visible = false;
  });

  $$("a, button, .project-card, .category-card, .quote-card, .info-card, input, textarea").forEach((item) => {
    item.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    item.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });

  requestAnimationFrame(render);
}

function initNeuralCanvas() {
  const canvas = $("#neural-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let points = [];
  let animationFrame = null;
  const pointer = { x: 0, y: 0, active: false };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(48, Math.min(110, Math.floor(width / 14)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const offsetX = pointer.active && width ? -((pointer.x / width) - 0.5) * 26 : 0;
    const offsetY = pointer.active && height ? -((pointer.y / height) - 0.5) * 18 : 0;
    context.save();
    context.translate(offsetX, offsetY);
    context.fillStyle = "rgba(244, 241, 234, 0.68)";
    context.strokeStyle = "rgba(61, 90, 254, 0.2)";
    context.lineWidth = 1;

    points.forEach((point) => {
      if (!prefersReducedMotion) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      }

      if (pointer.active) {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 130 && distance > 1) {
          point.x -= dx * 0.002;
          point.y -= dy * 0.002;
        }
      }

      context.beginPath();
      context.arc(point.x, point.y, 1.8, 0, Math.PI * 2);
      context.fill();
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 110) {
          context.globalAlpha = 1 - distance / 110;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }

    context.globalAlpha = 1;
    context.restore();
    animationFrame = requestAnimationFrame(draw);
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
}

function initCinematicIntro() {
  if (prefersReducedMotion || sessionStorage.getItem("ziqianIntroSeen") === "true") return;

  const intro = document.createElement("div");
  intro.className = "cinematic-intro";
  intro.setAttribute("aria-hidden", "true");
  intro.innerHTML = '<span>ZIQIAN</span><i></i>';
  document.body.appendChild(intro);
  document.body.classList.add("intro-running");
  sessionStorage.setItem("ziqianIntroSeen", "true");

  window.setTimeout(() => intro.classList.add("is-opening"), 120);
  window.setTimeout(() => {
    document.body.classList.remove("intro-running");
    intro.remove();
  }, 1550);
}

function initSceneDirector() {
  const sections = $$("[data-section]");
  if (!sections.length || prefersReducedMotion) return;

  let ticking = false;

  const update = () => {
    let active = sections[0];
    let bestDistance = Number.POSITIVE_INFINITY;
    const viewportCenter = window.innerHeight * 0.5;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height * 0.5;
      const distance = Math.abs(center - viewportCenter);
      const focus = Math.max(0, Math.min(1, 1 - distance / (window.innerHeight * 0.88)));
      section.style.setProperty("--scene-focus", focus.toFixed(3));
      section.style.setProperty("--scene-depth", ((viewportCenter - center) / window.innerHeight).toFixed(3));

      if (distance < bestDistance) {
        bestDistance = distance;
        active = section;
      }
    });

    document.body.dataset.scene = active?.id || "hero";
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function initThreeCinematicScene() {
  if (!window.THREE) return false;

  const THREE = window.THREE;
  const canvas = document.createElement("canvas");
  canvas.className = "cinematic-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    canvas.remove();
    return false;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
  const world = new THREE.Group();
  scene.add(world);

  const accent = new THREE.Color("#3d5afe");
  const violet = new THREE.Color("#7b61ff");
  const blush = new THREE.Color("#f4b7cc");
  const grid = new THREE.GridHelper(28, 42, accent, accent);
  grid.position.y = -2.2;
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  world.add(grid);

  const particleCount = 220;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    particlePositions[index * 3] = (Math.random() - 0.5) * 18;
    particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
    particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: accent, size: 0.035, transparent: true, opacity: 0.55 });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  world.add(particles);

  const objectGroup = new THREE.Group();
  const boxGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.08);
  for (let index = 0; index < 12; index += 1) {
    const edges = new THREE.EdgesGeometry(boxGeometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: index % 2 ? violet : accent, transparent: true, opacity: 0.32 }));
    line.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 5, -2 - Math.random() * 9);
    line.rotation.set(Math.random() * 0.8, Math.random() * 0.8, Math.random() * 0.8);
    objectGroup.add(line);
  }
  world.add(objectGroup);

  const scenes = [
    { color: accent, position: new THREE.Vector3(-0.8, 0.55, 7.2), target: new THREE.Vector3(0, -0.25, 0) },
    { color: new THREE.Color("#2381ff"), position: new THREE.Vector3(0.3, 0.36, 6.2), target: new THREE.Vector3(-0.2, -0.35, -0.8) },
    { color: violet, position: new THREE.Vector3(1.2, 0.18, 5.2), target: new THREE.Vector3(0.2, -0.45, -1.6) },
    { color: blush, position: new THREE.Vector3(-0.45, 0.42, 6), target: new THREE.Vector3(0, -0.3, -0.6) },
    { color: accent, position: new THREE.Vector3(0.05, -0.12, 4.8), target: new THREE.Vector3(0, -0.5, -2.2) }
  ];

  const pointer = new THREE.Vector2(0, 0);
  let frameAverage = 16;
  let lowPerformance = false;

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPerformance ? 1 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };

  const getScrollProgress = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(1, window.scrollY / maxScroll));
  };

  const render = (time) => {
    const delta = time - (render.lastTime || time);
    render.lastTime = time;
    frameAverage = frameAverage * 0.94 + delta * 0.06;
    if (!lowPerformance && frameAverage > 34) {
      lowPerformance = true;
      document.body.classList.add("low-performance");
      particleMaterial.opacity = 0.32;
      objectGroup.visible = false;
      resize();
    }

    const progress = getScrollProgress();
    const raw = progress * (scenes.length - 1);
    const index = Math.min(scenes.length - 2, Math.floor(raw));
    const t = raw - index;
    const from = scenes[index];
    const to = scenes[index + 1];
    const color = from.color.clone().lerp(to.color, t);
    const breath = Math.sin(time / 8000) * 0.025;

    camera.position.copy(from.position).lerp(to.position, t);
    camera.position.x += breath + pointer.x * 0.08;
    camera.position.y += breath * 0.55 + pointer.y * 0.05;
    const target = from.target.clone().lerp(to.target, t);
    camera.lookAt(target);

    grid.material.color.copy(color);
    particleMaterial.color.copy(color);
    world.rotation.y = progress * 0.32 + breath;
    particles.rotation.y += 0.0009;
    particles.rotation.x = Math.sin(time / 10000) * 0.04;
    objectGroup.children.forEach((object, objectIndex) => {
      object.rotation.x += 0.002 + objectIndex * 0.00008;
      object.rotation.y += 0.003;
      object.position.z += 0.008;
      if (object.position.z > 3) object.position.z = -10;
    });

    const [r, g, b] = color.toArray().map((value) => Math.round(value * 255));
    document.documentElement.style.setProperty("--scene-accent-rgb", `${r}, ${g}, ${b}`);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
    },
    { passive: true }
  );

  resize();
  requestAnimationFrame(render);
  window.addEventListener("resize", resize);
  return true;
}

function initCinematicCanvas() {
  if (prefersReducedMotion) return;
  if (initThreeCinematicScene()) return;

  const canvas = document.createElement("canvas");
  canvas.className = "cinematic-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const context = canvas.getContext("2d");
  if (!context) return;

  const scenes = [
    { id: "hero", color: [61, 90, 254], camera: { x: -0.4, y: 0.18, z: 1.4 }, density: 1 },
    { id: "about", color: [35, 129, 255], camera: { x: 0.15, y: 0.1, z: 1.1 }, density: 0.78 },
    { id: "projects", color: [123, 97, 255], camera: { x: 0.45, y: -0.05, z: 0.82 }, density: 1.1 },
    { id: "testimonials", color: [244, 183, 204], camera: { x: -0.18, y: 0.06, z: 1.02 }, density: 0.7 },
    { id: "contact", color: [61, 90, 254], camera: { x: 0.02, y: -0.15, z: 0.72 }, density: 1.2 }
  ];

  let width = 0;
  let height = 0;
  let ratio = 1;
  let particles = [];
  let objects = [];
  let animationFrame = null;
  let frameAverage = 16;
  let lowPerformance = false;
  let pointer = { x: 0, y: 0, active: false };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const particleCount = Math.max(36, Math.min(lowPerformance ? 70 : 150, Math.floor(width / (lowPerformance ? 20 : 10))));
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.2,
      speed: Math.random() * 0.002 + 0.001
    }));

    objects = Array.from({ length: lowPerformance ? 5 : 10 }, (_, index) => ({
      x: (Math.random() - 0.5) * 3.2,
      y: (Math.random() - 0.5) * 1.6,
      z: 0.6 + Math.random() * 2.8,
      size: 0.16 + Math.random() * 0.18,
      rot: Math.random() * Math.PI,
      type: index % 2
    }));
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const mixColor = (a, b, t) => a.map((value, index) => Math.round(lerp(value, b[index], t)));

  const getSceneState = (time) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    const raw = scrollProgress * (scenes.length - 1);
    const index = Math.min(scenes.length - 2, Math.floor(raw));
    const t = raw - index;
    const from = scenes[index];
    const to = scenes[index + 1];
    const breath = Math.sin(time / 8000) * 0.02;
    return {
      color: mixColor(from.color, to.color, t),
      density: lerp(from.density, to.density, t),
      camera: {
        x: lerp(from.camera.x, to.camera.x, t) + breath + (pointer.active ? (pointer.x / width - 0.5) * 0.06 : 0),
        y: lerp(from.camera.y, to.camera.y, t) + breath * 0.65 + (pointer.active ? (pointer.y / height - 0.5) * 0.04 : 0),
        z: lerp(from.camera.z, to.camera.z, t)
      }
    };
  };

  const project = (point, camera) => {
    const depth = Math.max(0.16, point.z + camera.z);
    const scale = Math.min(3.4, 1.18 / depth);
    return {
      x: width * 0.5 + (point.x - camera.x) * width * 0.22 * scale,
      y: height * 0.5 + (point.y - camera.y) * height * 0.25 * scale,
      scale
    };
  };

  const drawGrid = (state) => {
    const [r, g, b] = state.color;
    const horizon = height * (0.56 + state.camera.y * 0.12);
    context.save();
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.22)`;
    context.lineWidth = 1;

    for (let i = -10; i <= 10; i += 1) {
      const x = width * 0.5 + (i - state.camera.x * 1.8) * width * 0.07;
      context.beginPath();
      context.moveTo(width * 0.5, horizon);
      context.lineTo(x, height + 60);
      context.stroke();
    }

    for (let i = 1; i <= 11; i += 1) {
      const y = horizon + Math.pow(i / 11, 1.85) * height * 0.58;
      context.globalAlpha = 1 - i * 0.052;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    context.restore();
  };

  const drawObjects = (state, time) => {
    const [r, g, b] = state.color;
    context.save();
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.36)`;
    context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
    context.lineWidth = 1.4;

    objects.forEach((object, index) => {
      object.z -= 0.0025 * state.density;
      object.rot += 0.003 + index * 0.00015;
      if (object.z < 0.16) object.z = 3.2;

      const projected = project(object, state.camera);
      const size = object.size * width * 0.12 * projected.scale;
      const pulse = Math.sin(time / 1300 + index) * 0.12 + 1;

      context.save();
      context.translate(projected.x, projected.y);
      context.rotate(object.rot);
      context.scale(pulse, pulse);
      if (object.type) {
        context.strokeRect(-size * 0.5, -size * 0.34, size, size * 0.68);
        context.fillRect(-size * 0.5, -size * 0.34, size, size * 0.68);
      } else {
        context.beginPath();
        context.moveTo(0, -size * 0.56);
        context.lineTo(size * 0.56, 0);
        context.lineTo(0, size * 0.56);
        context.lineTo(-size * 0.56, 0);
        context.closePath();
        context.stroke();
        context.fill();
      }
      context.restore();
    });

    context.restore();
  };

  const drawParticles = (state) => {
    const [r, g, b] = state.color;
    context.save();
    context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
    particles.forEach((particle) => {
      particle.z -= particle.speed * state.density;
      if (particle.z < 0.08) {
        particle.z = 2.4;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }

      const size = Math.max(0.8, 2.4 / particle.z);
      context.globalAlpha = Math.min(0.78, 0.14 + (2.4 - particle.z) * 0.18);
      context.beginPath();
      context.arc(particle.x + (pointer.active ? (pointer.x / width - 0.5) * -14 : 0), particle.y, size, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  };

  const draw = (time) => {
    const delta = time - (draw.lastTime || time);
    draw.lastTime = time;
    frameAverage = frameAverage * 0.94 + delta * 0.06;
    if (!lowPerformance && frameAverage > 34) {
      lowPerformance = true;
      document.body.classList.add("low-performance");
      resize();
    }

    const state = getSceneState(time);
    const [r, g, b] = state.color;
    document.documentElement.style.setProperty("--scene-accent-rgb", `${r}, ${g}, ${b}`);
    context.clearRect(0, 0, width, height);
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${lowPerformance ? 0.018 : 0.028})`;
    context.fillRect(0, 0, width, height);
    drawGrid(state);
    if (!lowPerformance) drawObjects(state, time);
    drawParticles(state);

    animationFrame = requestAnimationFrame(draw);
  };

  document.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    pointer.active = false;
  }, { passive: true });

  resize();
  animationFrame = requestAnimationFrame(draw);
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
}

function initCinematicInteractions() {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  $$("[data-project-card]").forEach((card) => {
    let frame = null;

    const move = (event) => {
      if (document.body.classList.contains("low-performance") || document.body.classList.contains("modal-open")) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      window.cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${((0.5 - y) * 8).toFixed(2)}deg) rotateY(${((x - 0.5) * 8).toFixed(2)}deg) translateY(-8px) scale(1.012)`;
      });
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", () => {
      window.cancelAnimationFrame(frame);
      card.style.removeProperty("transform");
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
    });
  });
}

function initButtonRipples() {
  if (prefersReducedMotion) return;

  const targets = $$("a.button, button.button, .mini-button, .nav-action, .nav-cta, .tab-button, .back-link, .breadcrumb-link, .back-top, .submit-button, .modal-action-button, .continue-card");
  targets.forEach((target) => {
    target.addEventListener("pointerenter", (event) => createEnergyRipple(target, event));
    target.addEventListener("pointerdown", (event) => createEnergyRipple(target, event));
  });
}

function createEnergyRipple(target, event) {
  if (document.body.classList.contains("low-performance")) return;

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "energy-ripple";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  target.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 680);
}

document.addEventListener("DOMContentLoaded", () => {
  setNavHeightVar();
  window.addEventListener("resize", () => requestAnimationFrame(setNavHeightVar));
  window.addEventListener("load", () => {
    setNavHeightVar();
    correctInitialHashOffset();
  });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      setNavHeightVar();
      correctInitialHashOffset();
    });
  }

  initCinematicIntro();
  initCinematicCanvas();
  initPageTransitions();
  initSmoothAnchors();
  initMobileMenu();
  initAutoHideNav();
  initActiveMenuLinks();
  initRevealAnimations();
  initSceneDirector();
  initProjectTabs();
  initProjectModal();
  initContactForm();
  initStatCounters();
  initPhotoTilt();
  initCustomCursor();
  initNeuralCanvas();
  initCinematicInteractions();
  initButtonRipples();
  requestAnimationFrame(correctInitialHashOffset);
});
