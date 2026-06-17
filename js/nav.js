function initNavigation() {
  const nav = document.querySelector("[data-navbar]");
  const linksWrap = document.querySelector("[data-nav-links]");
  const indicator = document.querySelector("[data-nav-indicator]");
  const navLinks = linksWrap ? Array.from(linksWrap.querySelectorAll("[data-nav-link][data-section]")) : [];
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileLinks = Array.from(document.querySelectorAll("[data-mobile-link]"));
  const page = document.body.dataset.page || "home";

  if (!nav) return;

  const setNavHeight = () => {
    const rect = nav.getBoundingClientRect();
    const total = Math.ceil(rect.height + rect.top + 24);
    document.documentElement.style.setProperty("--nav-height", `${total}px`);
  };

  const setActive = (sectionId) => {
    if (!sectionId) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === sectionId);
    });

    const active = navLinks.find((link) => link.dataset.section === sectionId);
    if (!active || !linksWrap || !indicator || linksWrap.offsetParent === null) return;

    const activeRect = active.getBoundingClientRect();
    const wrapRect = linksWrap.getBoundingClientRect();
    indicator.style.left = `${activeRect.left - wrapRect.left}px`;
    indicator.style.width = `${activeRect.width}px`;
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    mobileMenu?.classList.remove("is-open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    mobileMenu?.classList.add("is-open");
    mobileMenu?.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
  };

  menuToggle?.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"], a[href^="index.html#"]');
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    if (url.pathname !== window.location.pathname && !url.pathname.endsWith("/index.html")) return;

    const target = document.querySelector(url.hash);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", url.hash);
  });

  if (page === "home") {
    const sections = Array.from(
      document.querySelectorAll(
        "main #hero, main [data-section='about'], main [data-section='projects'], main [data-section='testimonials'], main [data-section='contact']"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const section = visible.target.id === "hero" ? "hero" : visible.target.dataset.section;
        setActive(section);
      },
      {
        rootMargin: "-22% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
    setActive(window.location.hash ? hashToSection(window.location.hash) : "hero");
  } else {
    setActive(page);
  }

  let resizeTimer = 0;
  const refresh = () => {
    setNavHeight();
    setActive(page === "home" ? currentHomeSection() : page);
  };

  setNavHeight();
  requestAnimationFrame(refresh);
  window.addEventListener("load", refresh);
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refresh, 140);
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {});
  }
}

function hashToSection(hash) {
  if (hash === "#hero") return "hero";
  if (hash === "#about-preview") return "about";
  return hash.replace("#", "") || "hero";
}

function currentHomeSection() {
  const candidates = [
    ["hero", document.querySelector("#hero")],
    ["about", document.querySelector("main [data-section='about']")],
    ["projects", document.querySelector("main [data-section='projects']")],
    ["testimonials", document.querySelector("main [data-section='testimonials']")],
    ["contact", document.querySelector("main [data-section='contact']")]
  ].filter(([, element]) => element);

  const midpoint = window.innerHeight * 0.38;
  let best = candidates[0]?.[0] || "hero";
  let bestDistance = Infinity;

  candidates.forEach(([id, element]) => {
    const distance = Math.abs(element.getBoundingClientRect().top - midpoint);
    if (distance < bestDistance) {
      best = id;
      bestDistance = distance;
    }
  });

  return best;
}

window.initNavigation = initNavigation;
