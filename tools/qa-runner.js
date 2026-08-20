/*
  Portfolio QA Runner
  -------------------
  Runs a Playwright matrix against the static portfolio in outputs/fashion-portfolio.

  Usage:
    npm run qa
    (or: node tools/qa-runner.js from the repo root)

  Outputs:
    - qa-report.md
    - qa-results.json
    - qa-screenshots/*.png for failed configurations
*/

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

/*
  Playwright launches whatever browser build its own version pins. When the
  installed browsers do not match that pin -- common in prebuilt CI images that
  ship one Chromium and cannot re-download -- the default launch fails before a
  single test runs. Rather than pin a Playwright version to the image, resolve a
  usable Chromium at run time and only fall back to Playwright's own default
  when nothing else is found.
*/
function resolveChromiumExecutable() {
  const explicit = process.env.QA_CHROMIUM_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (explicit) {
    if (fs.existsSync(explicit)) return explicit;
    throw new Error(`Chromium path from the environment does not exist: ${explicit}`);
  }

  const pinned = (() => {
    try {
      return chromium.executablePath();
    } catch {
      return null;
    }
  })();
  if (pinned && fs.existsSync(pinned)) return null; // Playwright's default works.

  const browsersRoot = process.env.PLAYWRIGHT_BROWSERS_PATH
    || path.join(process.env.HOME || "", ".cache", "ms-playwright");
  if (!fs.existsSync(browsersRoot)) return null;

  // Newest build number first, so a matching install still wins if present.
  const buildOrder = (name) => Number(name.split("-").pop()) || 0;
  const installs = fs.readdirSync(browsersRoot)
    .filter((name) => name.startsWith("chromium"))
    .sort((a, b) => buildOrder(b) - buildOrder(a));

  const relativeCandidates = [
    path.join("chrome-linux", "chrome"),
    path.join("chrome-linux64", "chrome"),
    path.join("chrome-headless-shell-linux64", "chrome-headless-shell"),
    path.join("chrome-linux", "headless_shell"),
    path.join("chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium"),
    path.join("chrome-win", "chrome.exe")
  ];

  for (const install of installs) {
    for (const relative of relativeCandidates) {
      const candidate = path.join(browsersRoot, install, relative);
      if (fs.existsSync(candidate)) return candidate;
    }
  }

  return null;
}

const TOOLS_DIR = __dirname;
const ROOT = path.join(TOOLS_DIR, "..");
const OUTPUT_SITE_DIR = path.join(ROOT, "outputs", "fashion-portfolio");
const SITE_DIR = fs.existsSync(path.join(OUTPUT_SITE_DIR, "index.html")) ? OUTPUT_SITE_DIR : ROOT;
const SCREENSHOT_DIR = path.join(TOOLS_DIR, "qa-screenshots");
const REPORT_PATH = path.join(TOOLS_DIR, "qa-report.md");
const JSON_REPORT_PATH = path.join(TOOLS_DIR, "qa-results.json");
const PORT = Number(process.env.QA_PORT || 4177);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const QA_MATCH = (process.env.QA_MATCH || "").trim().toLowerCase();

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "mobile-landscape", width: 812, height: 375 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1920, height: 1080 },
  { name: "ultrawide", width: 2560, height: 1080 }
];

const PAGES = ["index.html", "about.html", "projects.html"];
const SCROLL_SEQUENCES = ["top", "scroll-down-slow", "scroll-down-then-up", "rapid-scroll"];
const BLOCKED_EXTERNAL_RESOURCE_PATTERNS = [
  "ERR_NETWORK_ACCESS_DENIED",
  "ERR_BLOCKED_BY_CLIENT",
  // Sandboxes that route egress through a proxy report blocked external hosts
  // (the Google Fonts stylesheet) with these instead. Not site defects.
  "ERR_TUNNEL_CONNECTION_FAILED",
  "ERR_CONNECTION_RESET",
  "ERR_PROXY_CONNECTION_FAILED",
  "ERR_NAME_NOT_RESOLVED"
];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf"
};

function safeName(value) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function emptyDir(dir) {
  ensureDir(dir);
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function startStaticServer() {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, BASE_URL);
    const decoded = decodeURIComponent(url.pathname);
    const requested = decoded === "/" ? "/index.html" : decoded;
    const filePath = path.resolve(SITE_DIR, `.${requested}`);

    if (!filePath.startsWith(SITE_DIR)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      response.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

function intersects(a, b, tolerance = 0) {
  return !(
    a.right <= b.left + tolerance ||
    a.left >= b.right - tolerance ||
    a.bottom <= b.top + tolerance ||
    a.top >= b.bottom - tolerance
  );
}

async function getPageMetrics(page) {
  return page.evaluate(() => {
    const rectOf = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        selector: element.tagName.toLowerCase(),
        text: element.textContent.trim().replace(/\s+/g, " ").slice(0, 120),
        className: element.className || "",
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        opacity: Number(style.opacity),
        display: style.display,
        visibility: style.visibility,
        pointerEvents: style.pointerEvents,
        position: style.position
      };
    };

    const nav = document.querySelector(".navbar");
    const importantElements = Array.from(
      document.querySelectorAll("h1, h2, .breadcrumb-link, .section-kicker")
    )
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .map(rectOf);

    const partiallyOpaque = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const opacity = Number(style.opacity);
        return (
          opacity > 0.01 &&
          opacity < 0.99 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0 &&
          !element.closest(".cinematic-canvas, .neural-canvas")
        );
      })
      .slice(0, 25)
      .map(rectOf);

    const visible = (element) => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
    };

    return {
      scrollY: window.scrollY,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      nav: nav ? rectOf(nav) : null,
      importantElements,
      partiallyOpaque,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      navVisibility: {
        hamburger: visible(document.querySelector(".nav-hamburger")),
        desktopLinks: visible(document.querySelector(".nav-links-pill")),
        navCta: visible(document.querySelector(".nav-cta"))
      },
      navHeightVar: getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim()
    };
  });
}

async function checkStuckOpacity(page) {
  const first = await getPageMetrics(page);
  if (!first.partiallyOpaque.length) return [];
  await page.waitForTimeout(500);
  const second = await getPageMetrics(page);
  const stuck = [];

  for (const before of first.partiallyOpaque) {
    const after = second.partiallyOpaque.find(
      (item) => item.text === before.text && item.className === before.className && Math.abs(item.top - before.top) < 2
    );
    if (after && Math.abs(after.opacity - before.opacity) < 0.01) {
      const isExpected =
        before.className.includes("navbar") ||
        before.className.includes("cinematic") ||
        before.className.includes("mesh") ||
        before.className.includes("quote") ||
        before.className.includes("modal") ||
        before.className.includes("card-particles") ||
        before.className.includes("project-number") ||
        before.className.includes("page-transition");
      if (!isExpected) stuck.push(before);
    }
  }

  return stuck;
}

function evaluateMetrics(metrics, pageName) {
  const failures = [];

  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    failures.push(`Horizontal overflow: scrollWidth ${metrics.scrollWidth} > clientWidth ${metrics.clientWidth}`);
  }

  const navIsShown =
    metrics.nav &&
    Number(metrics.nav.opacity) > 0.05 &&
    metrics.nav.bottom > 0 &&
    !String(metrics.nav.className).includes("nav-hidden");

  if (navIsShown) {
    for (const element of metrics.importantElements) {
      const elementInViewport = element.bottom > 0 && element.top < metrics.viewport.height;
      if (!elementInViewport) continue;
      if (intersects(metrics.nav, element, 1)) {
        failures.push(`Navbar overlaps ${element.selector}.${element.className || ""} "${element.text}"`);
      }
    }
  }

  const isDesktop = metrics.viewport.width >= 1024;
  if (navIsShown) {
    if (isDesktop) {
      if (!metrics.navVisibility.desktopLinks) failures.push("Desktop nav links are not visible on desktop viewport");
      if (!metrics.navVisibility.navCta) failures.push("Desktop Hire Me CTA is not visible on desktop viewport");
      if (metrics.navVisibility.hamburger) failures.push("Hamburger is visible on desktop viewport");
    } else {
      if (metrics.navVisibility.desktopLinks) failures.push("Desktop nav links are visible on mobile/tablet viewport");
      if (metrics.navVisibility.navCta) failures.push("Desktop Hire Me CTA is visible on mobile/tablet viewport");
      if (!metrics.navVisibility.hamburger) failures.push("Hamburger is not visible on mobile/tablet viewport");
    }
  }

  if (pageName === "projects.html" && metrics.navHeightVar && Number.parseFloat(metrics.navHeightVar) <= 0) {
    failures.push("--nav-height is zero/invalid");
  }

  return failures;
}

async function sample(page, result, label) {
  await page.waitForTimeout(320);
  const metrics = await getPageMetrics(page);
  result.samples.push({ label, metrics });
  result.failures.push(...evaluateMetrics(metrics, result.page).map((failure) => `${label}: ${failure}`));
}

async function performScrollSequence(page, sequence, result) {
  // QA samples fixed positions; disable the site's smooth-scroll interpolation
  // so measurements are not taken halfway through a scripted jump.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight));

  if (sequence === "top") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sample(page, result, "top");
    return;
  }

  if (sequence === "scroll-down-slow") {
    for (const ratio of [0.25, 0.5, 0.75, 1]) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(maxScroll * ratio));
      await sample(page, result, `${Math.round(ratio * 100)}%`);
    }
    return;
  }

  if (sequence === "scroll-down-then-up") {
    const down = Math.round(maxScroll * 0.6);
    await page.evaluate((y) => window.scrollTo(0, y), down);
    await sample(page, result, "60%");
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, down - 200));
    await sample(page, result, "up-200px");
    return;
  }

  if (sequence === "rapid-scroll") {
    const start = Date.now();
    await page.evaluate((y) => window.scrollTo(0, y), maxScroll);
    await page.waitForTimeout(80);
    await page.evaluate(() => window.scrollTo(0, 0));
    const elapsed = Date.now() - start;
    await sample(page, result, "rapid-bottom-top");
    if (elapsed > 500) result.warnings.push(`Rapid scroll actions took ${elapsed}ms`);
  }
}

async function runBaseConfig(browser, config) {
  const result = {
    id: `${config.page}-${config.viewport.name}-${config.sequence}`,
    type: "base",
    page: config.page,
    viewport: config.viewport.name,
    sequence: config.sequence,
    pass: true,
    failures: [],
    warnings: [],
    consoleErrors: [],
    consoleWarnings: [],
    exceptions: [],
    samples: [],
    screenshot: null
  };

  const page = await browser.newPage({ viewport: { width: config.viewport.width, height: config.viewport.height } });
  wireErrorCollection(page, result);

  try {
    await page.goto(`${BASE_URL}/${config.page}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(900);
    await performScrollSequence(page, config.sequence, result);
    const stuck = await checkStuckOpacity(page);
    if (stuck.length) result.warnings.push(`Potential stuck opacity animation: ${stuck.map((item) => item.className || item.selector).join(", ")}`);
  } catch (error) {
    result.failures.push(`Runner error: ${error.message}`);
  }

  result.failures.push(...result.consoleErrors.map((message) => `Console error: ${message}`));
  result.failures.push(...result.exceptions.map((message) => `Page exception: ${message}`));
  result.pass = result.failures.length === 0;
  if (!result.pass) result.screenshot = await saveFailureScreenshot(page, result.id);
  await page.close();
  return result;
}

function wireErrorCollection(page, result) {
  page.on("console", (message) => {
    const text = message.text();
    if (message.type() === "error") {
      if (BLOCKED_EXTERNAL_RESOURCE_PATTERNS.some((pattern) => text.includes(pattern))) {
        result.warnings.push(`Blocked external resource in local QA sandbox: ${text}`);
      } else {
        result.consoleErrors.push(text);
      }
    }
    if (message.type() === "warning") result.consoleWarnings.push(text);
  });
  page.on("pageerror", (error) => result.exceptions.push(error.message));
}

async function saveFailureScreenshot(page, id) {
  ensureDir(SCREENSHOT_DIR);
  const file = path.join(SCREENSHOT_DIR, `${safeName(id)}.png`);
  await page.screenshot({ path: file, fullPage: true });
  return path.relative(ROOT, file);
}

async function assertAnchor(page, result, linkSelector, targetSelector, label) {
  await page.click(linkSelector);
  await page.waitForTimeout(900);
  const metrics = await getPageMetrics(page);
  const nav = metrics.nav;
  const target = await page.$eval(targetSelector, (element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, text: element.textContent.trim() };
  });
  if (nav && target.top < nav.bottom + 8 && Number(nav.opacity) > 0.01) {
    result.failures.push(`${label}: target "${target.text}" is obscured by nav`);
  }
}

async function runInteractionConfig(browser, config) {
  const result = {
    id: `interaction-${config.name}-${config.viewport.name}`,
    type: "interaction",
    page: config.page,
    viewport: config.viewport.name,
    sequence: config.name,
    pass: true,
    failures: [],
    warnings: [],
    consoleErrors: [],
    consoleWarnings: [],
    exceptions: [],
    samples: [],
    screenshot: null
  };

  const page = await browser.newPage({ viewport: { width: config.viewport.width, height: config.viewport.height } });
  wireErrorCollection(page, result);

  try {
    await page.goto(`${BASE_URL}/${config.page}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(900);

    if (config.name === "index-ctas") {
      await assertAnchor(page, result, '.hero-actions a[href="#projects"]', "#projects-title", "View My Projects CTA");
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      await assertAnchor(page, result, '.hero-actions a[href="#about"]', "#about-title", "About Me CTA");
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      await assertAnchor(page, result, '.hero-actions a[href="#contact"]', "#contact-title", "Hire Me CTA");
    }

    if (config.name === "projects-tabs-modals") {
      await page.click('[data-project-tab="software"]');
      await page.waitForTimeout(350);
      await expectGrid(page, result, "software", true);
      await page.click('[data-project-tab="hardware"]');
      await page.waitForTimeout(350);
      await expectGrid(page, result, "hardware", true);
      await page.click('[data-project-tab="software"]');
      await page.waitForTimeout(350);

      for (const project of ["piano", "erebus"]) {
        await checkModal(page, result, project, "x");
      }

      await page.click('[data-project-tab="hardware"]');
      await page.waitForTimeout(350);
      await checkModal(page, result, "wheelchair", "escape");
      await checkModal(page, result, "greenhouse", "backdrop");
    }

    if (config.name === "projects-sequence-navigation") {
      await checkProjectSequenceNavigation(page, result);
    }

    if (config.name === "projects-quick-actions") {
      await checkProjectQuickActions(page, result);
    }

    if (config.name === "projects-modern-regressions") {
      await checkModernProjectRegressions(page, result, config.viewport.name === "mobile");
    }

    if (config.name === "certificate-lightbox") {
      await checkCertificateLightbox(page, result);
    }

    if (config.name === "index-to-about-journey") {
      await page.click('.learn-more-block a[href="about.html"]');
      await page.waitForURL("**/about.html");
      await page.waitForLoadState("load");
      await page.waitForTimeout(900);
      if (!page.url().endsWith("/about.html")) result.failures.push("See Full Journey did not navigate to about.html");
      const count = await page.locator("#education .timeline-item").count();
      if (count !== 5) result.failures.push(`Expected 5 full journey items, saw ${count}`);
      const metrics = await getPageMetrics(page);
      result.failures.push(...evaluateMetrics(metrics, "about.html").map((failure) => `about landing: ${failure}`));
    }

    if (config.name === "continue-exploring") {
      const cards = await page.locator(".continue-card").count();
      if (cards < 2) result.failures.push("Expected at least two Continue Exploring cards");
      const firstHref = await page.locator(".continue-card").first().getAttribute("href");
      if (!firstHref) result.failures.push("First Continue Exploring card has no href");
    }

    if (config.name === "mouse-top-reveal") {
      const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(maxScroll * 0.55));
      await page.waitForTimeout(500);
      await page.mouse.move(8, 160);
      await page.waitForTimeout(50);
      await page.mouse.move(8, 8);
      await page.waitForFunction(() => {
        const nav = document.querySelector(".navbar");
        if (!nav) return false;
        const style = getComputedStyle(nav);
        return Number(style.opacity) >= 0.5 && !nav.classList.contains("nav-hidden");
      }, { timeout: 1200 }).catch(() => {});
      const nav = await getPageMetrics(page).then((metrics) => metrics.nav);
      if (!nav || Number(nav.opacity) < 0.5) result.failures.push("Mouse-near-top did not reveal hidden nav");
    }
  } catch (error) {
    result.failures.push(`Runner error: ${error.message}`);
  }

  result.failures.push(...result.consoleErrors.map((message) => `Console error: ${message}`));
  result.failures.push(...result.exceptions.map((message) => `Page exception: ${message}`));
  result.pass = result.failures.length === 0;
  if (!result.pass) result.screenshot = await saveFailureScreenshot(page, result.id);
  await page.close();
  return result;
}

async function expectGrid(page, result, category, visible) {
  const isVisible = await page.$eval(`[data-project-grid="${category}"]`, (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return !element.hidden && style.display !== "none" && rect.width > 0 && rect.height > 0;
  });
  if (isVisible !== visible) result.failures.push(`${category} grid visibility expected ${visible}, saw ${isVisible}`);
}

async function checkModal(page, result, project, closeMode) {
  const navClickableBefore = await page.evaluate(() => (
    getComputedStyle(document.querySelector(".navbar")).pointerEvents !== "none"
  ));
  await page.click(`[data-open-project="${project}"]`);
  await page.waitForTimeout(450);
  const state = await page.evaluate(() => {
    const nav = document.querySelector(".navbar");
    const overlay = document.querySelector("#project-modal");
    const modal = document.querySelector("#project-modal .modal-content");
    const navStyle = getComputedStyle(nav);
    const modalRect = modal.getBoundingClientRect();
    const bodyStyle = getComputedStyle(document.body);
    return {
      navHidden: Number(navStyle.opacity) === 0 && navStyle.pointerEvents === "none",
      bodyLocked: bodyStyle.overflow === "hidden",
      overlayActive: overlay.classList.contains("active") && overlay.getAttribute("aria-hidden") === "false",
      centerDeltaX: Math.abs(modalRect.left + modalRect.width / 2 - window.innerWidth / 2),
      centerDeltaY: Math.abs(modalRect.top + modalRect.height / 2 - window.innerHeight / 2),
      modalWidth: modalRect.width,
      modalHeight: modalRect.height
    };
  });

  if (!state.navHidden) result.failures.push(`${project} modal: navbar is not hidden`);
  if (!state.bodyLocked) result.failures.push(`${project} modal: body is not scroll locked`);
  if (!state.overlayActive) result.failures.push(`${project} modal: overlay is not active`);
  if (state.centerDeltaX > Math.max(20, state.modalWidth * 0.1)) result.failures.push(`${project} modal: not horizontally centered`);
  if (state.centerDeltaY > Math.max(20, state.modalHeight * 0.1)) result.failures.push(`${project} modal: not vertically centered`);

  if (closeMode === "escape") {
    await page.keyboard.press("Escape");
  } else if (closeMode === "backdrop") {
    const point = await page.evaluate(() => ({
      x: Math.floor(window.innerWidth / 2),
      y: 24
    }));
    await page.mouse.click(point.x, point.y);
  } else {
    await page.click(".modal-close");
  }

  await page.waitForFunction(() => {
    const overlay = document.querySelector("#project-modal");
    return overlay && !overlay.classList.contains("active") && !overlay.classList.contains("is-closing");
  }, null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(150);
  const closed = await page.evaluate(() => {
    const overlay = document.querySelector("#project-modal");
    const bodyStyle = getComputedStyle(document.body);
    const navStyle = getComputedStyle(document.querySelector(".navbar"));
    return {
      hidden: !overlay.classList.contains("active") && overlay.getAttribute("aria-hidden") === "true",
      bodyUnlocked: bodyStyle.overflow !== "hidden",
      navClickable: navStyle.pointerEvents !== "none",
      // The navbar auto-hides once the page is scrolled past this threshold,
      // which is independent of the modal.
      nearTop: window.scrollY <= 50
    };
  });

  if (!closed.hidden) result.failures.push(`${project} modal: did not close`);
  if (!closed.bodyUnlocked) result.failures.push(`${project} modal: body stayed locked after close`);
  if (navClickableBefore && closed.nearTop && !closed.navClickable) {
    result.failures.push(`${project} modal: nav stayed disabled after close`);
  }
}

async function checkProjectSequenceNavigation(page, result) {
  await page.click('[data-project-tab="software"]');
  await page.waitForTimeout(350);
  await page.click('[data-open-project="mcfast"]');
  await page.waitForTimeout(550);

  const sequenceState = await page.evaluate(() => {
    const overlay = document.querySelector("#project-modal");
    const labels = Array.from(overlay.querySelectorAll(".project-category-label")).map((label) => label.textContent.trim());
    const cards = Array.from(overlay.querySelectorAll("[data-project-nav]")).map((card) => ({
      target: card.dataset.projectNav,
      text: card.textContent.replace(/\s+/g, " ").trim()
    }));
    return { labels, cards };
  });

  if (sequenceState.cards.length !== 2) result.failures.push(`McFast sequence nav expected 2 cards, saw ${sequenceState.cards.length}`);
  if (!sequenceState.labels.includes("Software Project")) result.failures.push("McFast sequence nav missing Software Project label");
  if (!sequenceState.labels.includes("Software Project")) result.failures.push("McFast sequence nav missing next project label");
  if (!sequenceState.cards.some((card) => card.target === "erebus")) result.failures.push("McFast sequence nav missing previous Erebus card");
  if (!sequenceState.cards.some((card) => card.target === "ecowaste")) result.failures.push("McFast sequence nav missing next EcoWaste card");

  await page.click('[data-project-nav="ecowaste"]');
  await page.waitForTimeout(550);
  const titleAfterNext = await page.locator("#modal-title").innerText();
  if (!titleAfterNext.includes("EcoWaste")) {
    result.failures.push(`Sequence Next card did not open EcoWaste modal; saw "${titleAfterNext}"`);
  }

  await page.click('[data-project-nav="mcfast"]');
  await page.waitForTimeout(550);
  const titleAfterPrevious = await page.locator("#modal-title").innerText();
  if (!titleAfterPrevious.includes("MCFAST ORDERING SYSTEM")) {
    result.failures.push(`Sequence Previous card did not return to McFast modal; saw "${titleAfterPrevious}"`);
  }

  await page.keyboard.press("Escape");
  await page.waitForTimeout(450);
}

function matchesQaFilter(config) {
  if (!QA_MATCH) return true;
  return [config.name, config.page, config.viewport?.name, config.sequence]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(QA_MATCH);
}

async function openProjectForQa(page, projectKey) {
  await page.locator(`[data-open-project="${projectKey}"]`).evaluate((card) => card.click());
  await page.locator("#project-modal.active").waitFor({ state: "visible" });
  await page.waitForTimeout(450);
}

async function expectProjectModalTitle(page, result, expected, context) {
  const title = await page.locator("#project-modal .modal-title").first().innerText();
  if (!title.toLowerCase().includes(expected.toLowerCase())) {
    result.failures.push(`${context}; saw "${title}"`);
  }
}

async function getProjectArrowState(page) {
  return page.locator("#project-modal .project-next-arrow").evaluateAll((arrows) => arrows.map((arrow) => {
    const rect = arrow.getBoundingClientRect();
    const style = getComputedStyle(arrow);
    return {
      opacity: Number(style.opacity),
      display: style.display,
      width: rect.width,
      height: rect.height
    };
  }));
}

async function checkProjectNavigationArrows(page, result, isMobile) {
  await openProjectForQa(page, "piano");
  const arrows = await getProjectArrowState(page);
  if (arrows.length !== 2) result.failures.push(`Expected two bottom project arrows, saw ${arrows.length}`);
  arrows.forEach((arrow, index) => {
    if (arrow.display === "none" || arrow.width < 40 || arrow.height < 40) {
      result.failures.push(`Bottom project arrow ${index + 1} is not visibly sized`);
    }
    if (arrow.opacity < 0.68 || arrow.opacity > 0.76) {
      result.failures.push(`Bottom project arrow ${index + 1} default opacity should be visibly present at about 72%, saw ${arrow.opacity}`);
    }
  });

  if (isMobile) {
    const nextArrow = page.locator("#project-modal .project-sequence-next .project-next-arrow");
    await nextArrow.scrollIntoViewIfNeeded();
    await nextArrow.click();
    await expectProjectModalTitle(page, result, "Erebus", "Mobile Piano next arrow did not open Erebus");
    return;
  }

  const pairs = [
    { from: "piano", fromTitle: "Alien Piano", toTitle: "Erebus" },
    { from: "mcfast", fromTitle: "McFast", toTitle: "EcoWaste" },
    { from: "construction", fromTitle: "Construction", toTitle: "Alien Piano" }
  ];

  for (const pair of pairs) {
    await openProjectForQa(page, pair.from);
    const nextCardBeforeNavigation = page.locator("#project-modal .project-sequence-next .project-next-card");
    await nextCardBeforeNavigation.scrollIntoViewIfNeeded();
    await nextCardBeforeNavigation.hover();
    await nextCardBeforeNavigation.locator(".project-next-arrow").evaluate((arrow) => {
      arrow.getAnimations().forEach((animation) => animation.finish());
    });
    const hoverOpacity = Number(await nextCardBeforeNavigation.locator(".project-next-arrow").evaluate((arrow) => getComputedStyle(arrow).opacity));
    if (hoverOpacity < 0.95) {
      result.failures.push(`${pair.fromTitle} next arrow did not highlight on hover (${hoverOpacity})`);
    }

    const nextArrow = page.locator("#project-modal .project-sequence-next .project-next-arrow");
    await nextArrow.scrollIntoViewIfNeeded();
    await nextArrow.click();
    await expectProjectModalTitle(page, result, pair.toTitle, `${pair.fromTitle} next arrow opened the wrong project`);

    const previousArrow = page.locator("#project-modal .project-sequence-previous .project-next-arrow");
    await previousArrow.scrollIntoViewIfNeeded();
    await previousArrow.click();
    await expectProjectModalTitle(page, result, pair.fromTitle, `${pair.toTitle} previous arrow opened the wrong project`);

    await openProjectForQa(page, pair.from);
    const previousCard = page.locator("#project-modal .project-sequence-previous .project-next-card");
    const nextCard = page.locator("#project-modal .project-sequence-next .project-next-card");
    await previousCard.scrollIntoViewIfNeeded();
    await previousCard.focus();
    await page.keyboard.press("Tab");
    await page.waitForTimeout(20);
    await nextCard.locator(".project-next-arrow").evaluate((arrow) => {
      arrow.getAnimations().forEach((animation) => animation.finish());
    });
    const nextFocusState = await nextCard.evaluate((card) => {
      const arrow = card.querySelector(".project-next-arrow");
      const style = getComputedStyle(arrow);
      return {
        active: document.activeElement === card,
        focused: card.matches(":focus"),
        focusVisible: card.matches(":focus-visible"),
        fullSelector: arrow.matches('body[data-page="projects"] .project-next-card:focus .project-next-arrow'),
        opacity: Number(style.opacity),
        inlineStyle: arrow.getAttribute("style"),
        transitionDuration: style.transitionDuration,
        animations: arrow.getAnimations().map((animation) => ({
          playState: animation.playState,
          currentTime: animation.currentTime,
          duration: animation.effect?.getTiming().duration
        }))
      };
    });
    if (nextFocusState.opacity < 0.95) {
      result.failures.push(`${pair.fromTitle} next arrow did not highlight on keyboard focus (${JSON.stringify(nextFocusState)})`);
    }
    if (!nextFocusState.active) {
      result.failures.push(`${pair.fromTitle} next card was not reached naturally by Tab from the previous card`);
    }
    await page.keyboard.press("Enter");
    await expectProjectModalTitle(page, result, pair.toTitle, `${pair.fromTitle} next card failed with Enter`);

    const previousCardAfterNavigation = page.locator("#project-modal .project-sequence-previous .project-next-card");
    const nextCardAfterNavigation = page.locator("#project-modal .project-sequence-next .project-next-card");
    await nextCardAfterNavigation.scrollIntoViewIfNeeded();
    await nextCardAfterNavigation.focus();
    await page.keyboard.press("Shift+Tab");
    await page.waitForTimeout(20);
    await previousCardAfterNavigation.locator(".project-next-arrow").evaluate((arrow) => {
      arrow.getAnimations().forEach((animation) => animation.finish());
    });
    const previousFocusState = await previousCardAfterNavigation.evaluate((card) => ({
      active: document.activeElement === card,
      focused: card.matches(":focus"),
      focusVisible: card.matches(":focus-visible"),
      opacity: Number(getComputedStyle(card.querySelector(".project-next-arrow")).opacity)
    }));
    if (previousFocusState.opacity < 0.95) {
      result.failures.push(`${pair.toTitle} previous arrow did not highlight on keyboard focus (${JSON.stringify(previousFocusState)})`);
    }
    if (!previousFocusState.active) {
      result.failures.push(`${pair.toTitle} previous card was not reached naturally by Shift+Tab from the next card`);
    }
    await page.keyboard.press("Space");
    await expectProjectModalTitle(page, result, pair.fromTitle, `${pair.toTitle} previous card failed with Space`);
  }
}

async function checkProjectModalAccessibility(page, result) {
  await page.keyboard.press("Escape");
  await page.waitForTimeout(450);

  const trigger = page.locator('[data-open-project="piano"]');
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.locator("#project-modal.active").waitFor({ state: "visible" });

  const semantics = await page.locator("#project-modal").evaluate((modal) => ({
    role: modal.getAttribute("role"),
    ariaModal: modal.getAttribute("aria-modal"),
    labelledBy: modal.getAttribute("aria-labelledby"),
    hasLabelTarget: Boolean(document.getElementById(modal.getAttribute("aria-labelledby") || ""))
  }));
  if (semantics.role !== "dialog") result.failures.push(`Project modal role should be dialog, saw ${semantics.role}`);
  if (semantics.ariaModal !== "true") result.failures.push(`Project modal aria-modal should be true, saw ${semantics.ariaModal}`);
  if (!semantics.labelledBy || !semantics.hasLabelTarget) result.failures.push("Project modal aria-labelledby does not resolve to its title");

  const focusableCount = await page.locator("#project-modal").evaluate((modal) => {
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "video[controls]",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");
    const focusable = Array.from(modal.querySelectorAll(selector)).filter((element) => (
      element.getAttribute("aria-hidden") !== "true"
      && !element.hasAttribute("hidden")
      && element.tabIndex >= 0
      && (element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0)
    ));
    focusable.at(-1)?.focus();
    return focusable.length;
  });
  if (focusableCount < 2) result.failures.push(`Project modal expected multiple focus targets, saw ${focusableCount}`);

  await page.keyboard.press("Tab");
  await page.waitForTimeout(120);
  const wrappedForward = await page.locator("#project-modal").evaluate((modal) => {
    const focusable = Array.from(modal.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex='-1'])")).filter((element) => (
      element.getAttribute("aria-hidden") !== "true"
      && !element.hasAttribute("hidden")
      && element.tabIndex >= 0
      && (element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0)
    ));
    return document.activeElement === focusable[0] && modal.contains(document.activeElement);
  });
  if (!wrappedForward) result.failures.push("Project modal Tab focus did not wrap from last to first control");

  await page.keyboard.press("Shift+Tab");
  await page.waitForTimeout(120);
  const wrappedBackward = await page.locator("#project-modal").evaluate((modal) => {
    const focusable = Array.from(modal.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex='-1'])")).filter((element) => (
      element.getAttribute("aria-hidden") !== "true"
      && !element.hasAttribute("hidden")
      && element.tabIndex >= 0
      && (element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0)
    ));
    return document.activeElement === focusable.at(-1) && modal.contains(document.activeElement);
  });
  if (!wrappedBackward) result.failures.push("Project modal Shift+Tab focus did not wrap from first to last control");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(450);
  const closeState = await page.evaluate(() => ({
    restoredProject: document.activeElement?.getAttribute("data-open-project") || "",
    bodyUnlocked: getComputedStyle(document.body).overflow !== "hidden",
    navClickable: getComputedStyle(document.querySelector(".navbar")).pointerEvents !== "none",
    navClasses: document.querySelector(".navbar")?.className || ""
  }));
  if (closeState.restoredProject !== "piano") result.failures.push("Project modal did not return focus to the opening card");
  if (!closeState.bodyUnlocked) result.failures.push("Project modal left body scroll locked after Escape");
  if (!closeState.navClickable || /nav-hidden|nav-revealed-by-mouse/.test(closeState.navClasses)) {
    result.failures.push("Project modal left the navbar hidden or disabled after Escape");
  }
}

async function checkProjectMediaGrids(page, result, isMobile) {
  const projectKeys = ["piano", "erebus", "mcfast", "wheelchair", "greenhouse", "keychain", "construction"];
  const expectedVideoCounts = { piano: 1, erebus: 1, mcfast: 1, wheelchair: 2, greenhouse: 1 };

  for (const projectKey of projectKeys) {
    await openProjectForQa(page, projectKey);
    const missingDimensions = await page.locator("#project-modal img").evaluateAll((images) => images
      .filter((image) => !image.hasAttribute("width") || !image.hasAttribute("height"))
      .map((image) => image.getAttribute("src") || image.getAttribute("alt") || "unnamed image"));
    if (missingDimensions.length) {
      result.failures.push(`${projectKey} modal images missing intrinsic dimensions: ${missingDimensions.join(", ")}`);
    }

    const grids = page.locator("#project-modal .modal-case-media-grid, #project-modal .modal-photo-gallery");

    for (let index = 0; index < await grids.count(); index += 1) {
      const grid = grids.nth(index);
      const imageCount = await grid.locator("img").count();

      if (imageCount === 1) {
        const image = grid.locator("img").first();
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode ? element.decode().catch(() => {}) : Promise.resolve());
        const singleState = await image.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            gallery: Boolean(element.closest(".modal-photo-gallery")),
            loaded: element.complete && element.naturalWidth > 0 && element.naturalHeight > 0,
            naturalRatio: element.naturalWidth / element.naturalHeight,
            renderedRatio: rect.width / rect.height,
            aspectRatio: style.aspectRatio,
            objectFit: style.objectFit
          };
        });
        if (!singleState.loaded) result.failures.push(`${projectKey} single gallery image did not load`);
        if (singleState.gallery) {
          if (singleState.aspectRatio !== "auto") {
            result.failures.push(`${projectKey} single gallery image still has forced aspect ratio ${singleState.aspectRatio}`);
          }
          if (singleState.objectFit !== "contain") {
            result.failures.push(`${projectKey} single gallery image should preserve its content with object-fit contain, saw ${singleState.objectFit}`);
          }
          if (Math.abs(singleState.naturalRatio - singleState.renderedRatio) > 0.03) {
            result.failures.push(`${projectKey} single gallery image is visibly cropped (${singleState.naturalRatio.toFixed(3)} natural vs ${singleState.renderedRatio.toFixed(3)} rendered)`);
          }
        }
        continue;
      }

      if (imageCount < 2) continue;

      for (let imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
        const image = grid.locator("img").nth(imageIndex);
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode ? element.decode().catch(() => {}) : Promise.resolve());
      }
      await page.mouse.move(1, 1);
      await page.waitForTimeout(250);
      // Lazy-loaded images settle their layout a frame or two after decode, so
      // sampling too early reported sub-pixel height differences as failures.
      await grid.evaluate(async (element) => {
        const images = Array.from(element.querySelectorAll("img"));
        images.forEach((image) => { image.loading = "eager"; });
        await Promise.all(images.map((image) => (
          image.complete && image.naturalWidth > 0
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
                setTimeout(resolve, 5000);
              })
        )));
        await Promise.all(images.map((image) => (
          image.decode ? image.decode().catch(() => {}) : Promise.resolve()
        )));
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });

      const state = await grid.evaluate((element) => {
        const frames = Array.from(element.querySelectorAll(".modal-case-image-link"));
        return {
          classes: element.className,
          equal: element.classList.contains("is-equal-media"),
          documentSafe: element.classList.contains("is-document-safe"),
          frameHeights: frames.map((frame) => frame.getBoundingClientRect().height),
          imageHeights: frames.map((frame) => frame.querySelector("img")?.getBoundingClientRect().height || 0),
          objectFits: frames.map((frame) => getComputedStyle(frame.querySelector("img")).objectFit),
          frameRatios: frames.map((frame) => {
            const rect = frame.getBoundingClientRect();
            return rect.width / rect.height;
          }),
          loaded: Array.from(element.querySelectorAll("img")).every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)
        };
      });

      if (!state.equal) result.failures.push(`${projectKey} has an unstandardized multi-image grid: ${state.classes}`);
      if (!state.loaded) result.failures.push(`${projectKey} multi-image grid contains an image that did not load`);
      if (state.frameHeights.length && Math.max(...state.frameHeights) - Math.min(...state.frameHeights) > 1) {
        result.failures.push(`${projectKey} multi-image grid has uneven frame heights: ${state.frameHeights.join(", ")}`);
      }
      if (state.imageHeights.length && Math.max(...state.imageHeights) - Math.min(...state.imageHeights) > 1) {
        result.failures.push(`${projectKey} multi-image grid has uneven rendered image heights: ${state.imageHeights.join(", ")}`);
      }
      if (state.frameRatios.length && Math.max(...state.frameRatios) - Math.min(...state.frameRatios) > 0.02) {
        result.failures.push(`${projectKey} multi-image grid has inconsistent frame ratios: ${state.frameRatios.join(", ")}`);
      }
      const expectedFit = state.documentSafe ? "contain" : "cover";
      if (state.objectFits.some((fit) => fit !== expectedFit)) {
        result.failures.push(`${projectKey} multi-image grid should use ${expectedFit} for this evidence type, saw ${state.objectFits.join(", ")}`);
      }
    }

    if (!isMobile && expectedVideoCounts[projectKey]) {
      const videoState = await page.locator("#project-modal .modal-video-frame").evaluateAll((frames) => frames.map((frame) => {
        const video = frame.querySelector("video");
        const frameStyle = getComputedStyle(frame);
        const videoStyle = video ? getComputedStyle(video) : null;
        return {
          frameAspectRatio: frameStyle.aspectRatio,
          videoAspectRatio: videoStyle?.aspectRatio || "",
          videoMaxHeight: videoStyle?.maxHeight || "",
          poster: video?.getAttribute("poster") || ""
        };
      }));
      if (videoState.length !== expectedVideoCounts[projectKey]) {
        result.failures.push(`${projectKey} expected ${expectedVideoCounts[projectKey]} video frame(s), saw ${videoState.length}`);
      }
      videoState.forEach((video, index) => {
        if (video.frameAspectRatio !== "auto") result.failures.push(`${projectKey} video ${index + 1} still uses forced frame aspect ratio ${video.frameAspectRatio}`);
        if (video.videoMaxHeight === "none" || !video.videoMaxHeight) result.failures.push(`${projectKey} video ${index + 1} has no responsive max-height`);
        if (!video.poster) result.failures.push(`${projectKey} video ${index + 1} is missing a poster image`);
      });
    }
  }
}

async function checkIoTCaseStudy(page, result) {
  await openProjectForQa(page, "greenhouse");
  const requiredSections = [
    "Demo Video",
    "Overview",
    "The Problem",
    "What I Built",
    "Key Features",
    "System Architecture",
    "Technical Implementation",
    "Flask Web Interface",
    "MariaDB Database",
    "Testing & Results",
    "Outcome",
    "Future Improvements",
    "Skills Demonstrated"
  ];
  const headings = await page.locator("#project-modal .modal-section-heading").allInnerTexts();
  requiredSections.forEach((heading) => {
    if (!headings.includes(heading)) result.failures.push(`IoT case study is missing section: ${heading}`);
  });

  const requiredMedia = [
    "iot-hardware-setup",
    "iot-labelled-components",
    "iot-lcd-closeup",
    "iot-system-architecture.svg",
    "iot-arduino-pin-map",
    "iot-arduino-serial-monitor",
    "iot-raspberry-pi-data-received",
    "iot-flask-web-interface",
    "iot-flask-server-running",
    "iot-database-update-confirmation",
    "iot-database-table-structure"
  ];
  const media = page.locator("#project-modal img");
  for (let index = 0; index < await media.count(); index += 1) {
    const image = media.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode ? element.decode().catch(() => {}) : Promise.resolve());
  }
  const mediaState = await page.locator("#project-modal img").evaluateAll((images) => images.map((image) => ({
    source: image.currentSrc || image.src,
    loaded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
  })));
  requiredMedia.forEach((name) => {
    const match = mediaState.find((image) => image.source.includes(name));
    if (!match) result.failures.push(`IoT case study is missing media: ${name}`);
    else if (!match.loaded) result.failures.push(`IoT media failed to load: ${name}`);
  });

  const annotationLabels = await page.locator("#project-modal .modal-media-annotation").allInnerTexts();
  ["Arduino Uno", "Ultrasonic sensor", "Breadboard", "LED + buzzer", "Rotary / sensor module"].forEach((label) => {
    if (!annotationLabels.includes(label)) result.failures.push(`IoT component evidence is missing annotation: ${label}`);
  });

  const modalText = await page.locator("#project-modal .project-modal-body").innerText();
  if (!modalText.includes("does not contain one wide frame showing the Raspberry Pi")) {
    result.failures.push("IoT overview does not disclose the verified Raspberry Pi wide-shot limitation");
  }

  const expectedTests = [
    "Buzzer stayed off when all conditions suitable",
    "Buzzer activated when temperature/light/water unsuitable",
    "LED brightness increased in darker conditions",
    "LED brightness decreased in brighter conditions",
    "Low water level detected correctly",
    "Manual LED control overrode automatic brightness adjustment"
  ];
  const testingRows = await page.locator("#project-modal .modal-data-table tbody tr td:first-child").allInnerTexts();
  expectedTests.forEach((test) => {
    if (!testingRows.includes(test)) result.failures.push(`IoT testing table is missing locked test label: ${test}`);
  });
}

async function checkModernProjectRegressions(page, result, isMobile) {
  await checkProjectNavigationArrows(page, result, isMobile);
  if (!isMobile) await checkProjectModalAccessibility(page, result);
  await checkProjectMediaGrids(page, result, isMobile);
  await checkIoTCaseStudy(page, result);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(120);
}

async function checkProjectQuickActions(page, result) {
  const expected = {
    piano: { label: "PLAY", href: "https://gohziqian1234-cmyk.github.io/piano-tiles-alien-/" },
    erebus: { label: "PLAY", href: "https://gohziqian1234-cmyk.github.io/erebus-7/" },
    mcfast: { label: "TRY APP", href: "https://gohziqian1234-cmyk-mcfast-app-app-hrwj7l.streamlit.app/" },
    wheelchair: { label: "WATCH DEMO", href: `${BASE_URL}/assets/videos/wheelchair-prototype-demo.mp4` },
    greenhouse: null
  };

  await page.click('[data-project-tab="software"]');
  await page.waitForTimeout(350);
  for (const project of ["piano", "erebus", "mcfast"]) {
    await assertProjectQuickAction(page, result, project, expected[project]);
  }

  await page.click('[data-project-tab="hardware"]');
  await page.waitForTimeout(350);
  for (const project of ["wheelchair", "greenhouse"]) {
    await assertProjectQuickAction(page, result, project, expected[project]);
  }

  await assertProjectQuickAction(page, result, "construction", {
    label: "WATCH DEMO",
    href: `${BASE_URL}/videos/live-near-miss-detection-demo.mp4`
  });

  for (const project of ["keychain"]) {
    const count = await page.locator(`[data-open-project="${project}"] .project-play-button`).count();
    if (count !== 0) result.failures.push(`${project} should not render a quick-action button`);
  }

  await page.click('[data-project-tab="software"]');
  await page.waitForTimeout(350);
  const mcfastAction = page.locator('[data-open-project="mcfast"] .project-play-button').first();
  const popupPromise = page.context().waitForEvent("page", { timeout: 2500 }).catch(() => null);
  await mcfastAction.click();
  const popup = await popupPromise;
  if (popup) await popup.close();
  const modalHidden = await page.locator("#project-modal").getAttribute("aria-hidden");
  if (modalHidden !== "true") result.failures.push("McFast TRY APP quick action also opened the detail modal");
}

async function assertProjectQuickAction(page, result, project, expected) {
  const action = page.locator(`[data-open-project="${project}"] .project-play-button`).first();
  const count = await action.count();
  if (!expected) {
    if (count !== 0) result.failures.push(`${project} should not render a duplicate quick-action button`);
    return;
  }
  if (count !== 1) {
    result.failures.push(`${project} quick action expected 1 button, saw ${count}`);
    return;
  }

  const label = (await action.innerText()).trim();
  if (label !== expected.label) result.failures.push(`${project} quick action label expected ${expected.label}, saw ${label}`);

  const href = await action.getAttribute("href");
  if (href !== expected.href && `${BASE_URL}/${href}` !== expected.href) {
    result.failures.push(`${project} quick action href expected ${expected.href}, saw ${href}`);
  }

  if (!(await action.isVisible())) result.failures.push(`${project} quick action is not visible`);
}

async function checkCertificateLightbox(page, result) {
  const firstCertificate = page.locator("[data-certificate-lightbox]").first();
  const count = await firstCertificate.count();
  if (!count) {
    result.failures.push("No certificate lightbox links found");
    return;
  }

  await firstCertificate.scrollIntoViewIfNeeded();
  await firstCertificate.click();
  await page.waitForTimeout(400);

  const openState = await page.evaluate(() => {
    const lightbox = document.querySelector(".image-lightbox");
    const image = document.querySelector("[data-lightbox-image]");
    return {
      active: lightbox?.classList.contains("active") || false,
      hidden: lightbox?.getAttribute("aria-hidden"),
      imageSrc: image?.getAttribute("src") || "",
      bodyLocked: getComputedStyle(document.body).overflow === "hidden"
    };
  });

  if (!openState.active || openState.hidden !== "false") result.failures.push("Certificate lightbox did not open");
  if (!openState.imageSrc.includes("cert-good-progress-award.jpg")) result.failures.push(`Certificate lightbox image src unexpected: ${openState.imageSrc}`);
  if (!openState.bodyLocked) result.failures.push("Certificate lightbox did not lock body scroll");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  const closed = await page.evaluate(() => {
    const lightbox = document.querySelector(".image-lightbox");
    return {
      active: lightbox?.classList.contains("active") || false,
      hidden: lightbox?.getAttribute("aria-hidden"),
      bodyUnlocked: getComputedStyle(document.body).overflow !== "hidden"
    };
  });

  if (closed.active || closed.hidden !== "true") result.failures.push("Certificate lightbox did not close with Escape");
  if (!closed.bodyUnlocked) result.failures.push("Certificate lightbox left body scroll locked");
}

function buildInteractionConfigs() {
  const desktop = VIEWPORTS.find((viewport) => viewport.name === "desktop");
  const mobile = VIEWPORTS.find((viewport) => viewport.name === "mobile");
  const tablet = VIEWPORTS.find((viewport) => viewport.name === "tablet");

  return [
    { name: "index-ctas", page: "index.html", viewport: desktop },
    { name: "index-ctas", page: "index.html", viewport: mobile },
    { name: "projects-tabs-modals", page: "projects.html", viewport: desktop },
    { name: "projects-tabs-modals", page: "projects.html", viewport: mobile },
    { name: "projects-sequence-navigation", page: "projects.html", viewport: desktop },
    { name: "projects-quick-actions", page: "projects.html", viewport: desktop },
    { name: "projects-modern-regressions", page: "projects.html", viewport: desktop },
    { name: "projects-modern-regressions", page: "projects.html", viewport: mobile },
    { name: "certificate-lightbox", page: "about.html", viewport: desktop },
    { name: "index-to-about-journey", page: "index.html", viewport: tablet },
    { name: "continue-exploring", page: "about.html", viewport: desktop },
    { name: "continue-exploring", page: "projects.html", viewport: desktop },
    { name: "mouse-top-reveal", page: "index.html", viewport: desktop },
    { name: "mouse-top-reveal", page: "about.html", viewport: desktop },
    { name: "mouse-top-reveal", page: "projects.html", viewport: desktop }
  ];
}

function buildMarkdownReport(results) {
  const total = results.length;
  const passed = results.filter((result) => result.pass).length;
  const failed = total - passed;
  const lines = [];
  lines.push("# Portfolio QA Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Total configurations: ${total}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push(`Pass rate: ${((passed / total) * 100).toFixed(1)}%`);
  lines.push("");
  lines.push("## Known Bug Regression Checks");
  lines.push("");
  lines.push("- Contact heading nav overlap: covered by `index.html` scroll sequences and `index-ctas` interactions.");
  lines.push("- Projects breadcrumb nav overlap: covered by all `projects.html` viewport/scroll splits.");
  lines.push("- Mid-page scroll-up nav reveal: covered by `scroll-down-then-up` splits and `mouse-top-reveal` interactions.");
  lines.push("- Previous/Next project cards and category labels: covered by `projects-sequence-navigation`.");
  lines.push("- Always-visible Previous/Next arrows, keyboard activation, wrapping, modal semantics, focus trapping, and focus return: covered by `projects-modern-regressions`.");
  lines.push("- Grid quick-action labels and click isolation: covered by `projects-quick-actions`.");
  lines.push("- Flexible project-video sizing, video posters, equal-height multi-image grids, and complete IoT evidence: covered by `projects-modern-regressions` on desktop and mobile.");
  lines.push("- Certificate lightbox open/close behavior: covered by `certificate-lightbox`.");
  lines.push("");
  lines.push("## Matrix Results");
  lines.push("");
  lines.push("| Status | Type | Page | Viewport | Sequence | Failures | Screenshot |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");

  for (const result of results) {
    const status = result.pass ? "PASS" : "FAIL";
    const failures = result.failures.length ? result.failures.join("<br>") : "";
    lines.push(`| ${status} | ${result.type} | ${result.page} | ${result.viewport} | ${result.sequence} | ${failures} | ${result.screenshot || ""} |`);
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  emptyDir(SCREENSHOT_DIR);
  const server = await startStaticServer();
  const executablePath = resolveChromiumExecutable();
  if (executablePath) console.log(`Using Chromium at ${executablePath}`);
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const results = [];

  try {
    const baseConfigs = [];
    for (const page of PAGES) {
      for (const viewport of VIEWPORTS) {
        for (const sequence of SCROLL_SEQUENCES) {
          baseConfigs.push({ page, viewport, sequence });
        }
      }
    }

    for (const config of baseConfigs.filter(matchesQaFilter)) {
      results.push(await runBaseConfig(browser, config));
    }

    for (const config of buildInteractionConfigs().filter(matchesQaFilter)) {
      results.push(await runInteractionConfig(browser, config));
    }
  } finally {
    await browser.close();
    server.close();
  }

  fs.writeFileSync(JSON_REPORT_PATH, JSON.stringify(results, null, 2));
  fs.writeFileSync(REPORT_PATH, buildMarkdownReport(results));

  const failed = results.filter((result) => !result.pass);
  if (failed.length) {
    console.error(`QA failed: ${failed.length}/${results.length} configurations failed. See qa-report.md.`);
    process.exit(1);
  }

  console.log(`QA passed: ${results.length}/${results.length} configurations passed. See qa-report.md.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
