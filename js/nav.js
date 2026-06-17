export function initNavigation() {
  const navbar = document.querySelector("[data-navbar]");
  const track = document.querySelector("[data-nav-links]");
  const indicator = document.querySelector("[data-nav-indicator]");
  const navLinks = track ? Array.from(track.querySelectorAll(".nav-link[data-section]")) : [];
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileLinks = Array.from(document.querySelectorAll("[data-mobile-link]"));
  const page = document.body.dataset.page || "home";

  if (!navbar) return;

  const updateNavHeight = () => {
    const rect = navbar.getBoundingClientRect();
    document.documentElement.style.setProperty("--nav-height", `${Math.ceil(rect.height + rect.top + 32)}px`);
  };

  const updateActivePill = () => {
    const activeLink = document.querySelector(".nav-link.is-active");
    if (!activeLink || !indicator || !track || track.offsetParent === null) return;
    const trackRect = track.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    indicator.style.left = `${linkRect.left - trackRect.left}px`;
    indicator.style.width = `${linkRect.width}px`;
  };

  const setActive = (sectionId) => {
    if (!sectionId) return;
    navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.section === sectionId));
    updateActivePill();
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    mobileMenu?.classList.remove("is-open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    navbar.classList.remove("nav-hidden");
    mobileMenu?.classList.add("is-open");
    mobileMenu?.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
  };

  menuToggle?.addEventListener("click", () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

    const url = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const samePage = url.pathname === current.pathname;
    const isInternalPage = url.origin === current.origin && /\.(html)?$/i.test(url.pathname);

    if (samePage && url.hash) {
      const target = document.querySelector(url.hash);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", url.hash);
      setActive(hashToSection(url.hash));
      return;
    }

    if (url.origin === current.origin && isInternalPage) {
      event.preventDefault();
      document.body.classList.add("page-transitioning");
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
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
        setActive(visible.target.id === "hero" ? "hero" : visible.target.dataset.section);
      },
      { rootMargin: "-22% 0px -52% 0px", threshold: [0.12, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    setActive(hashToSection(window.location.hash));
  } else {
    setActive(page);
  }

  let resizeTimer = 0;
  const refresh = () => {
    updateNavHeight();
    updateActivePill();
  };

  updateNavHeight();
  requestAnimationFrame(refresh);
  window.addEventListener("load", refresh);
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refresh, 120);
  });
  document.fonts?.ready?.then(refresh).catch(() => {});

  initSmartHide(navbar);
}

function initSmartHide(navbar) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current <= 100 || document.body.classList.contains("menu-open") || document.body.classList.contains("modal-open")) {
          navbar.classList.remove("nav-hidden");
        } else if (current > lastScrollY) {
          navbar.classList.add("nav-hidden");
        } else if (current < lastScrollY) {
          navbar.classList.remove("nav-hidden");
        }
        lastScrollY = Math.max(current, 0);
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener(
    "mousemove",
    (event) => {
      if (event.clientY < 80) navbar.classList.remove("nav-hidden");
    },
    { passive: true }
  );
}

function hashToSection(hash) {
  if (hash === "#about-preview") return "about";
  if (!hash || hash === "#hero") return "hero";
  return hash.replace("#", "");
}
