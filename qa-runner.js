/*
  Portfolio QA Runner
  -------------------
  Runs a Playwright matrix against the static portfolio in outputs/fashion-portfolio.

  Usage:
    node qa-runner.js

  Outputs:
    - qa-report.md
    - qa-results.json
    - qa-screenshots/*.png for failed configurations
*/

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = __dirname;
const OUTPUT_SITE_DIR = path.join(ROOT, "outputs", "fashion-portfolio");
const SITE_DIR = fs.existsSync(path.join(OUTPUT_SITE_DIR, "index.html")) ? OUTPUT_SITE_DIR : ROOT;
const SCREENSHOT_DIR = path.join(ROOT, "qa-screenshots");
const REPORT_PATH = path.join(ROOT, "qa-report.md");
const JSON_REPORT_PATH = path.join(ROOT, "qa-results.json");
const PORT = Number(process.env.QA_PORT || 4177);
const BASE_URL = `http://127.0.0.1:${PORT}`;

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
  "ERR_BLOCKED_BY_CLIENT"
];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
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

    if (config.name === "index-to-about-journey") {
      await page.click('.learn-more-block a[href="about.html"]');
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
      await page.waitForTimeout(450);
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
    await page.click(".modal-backdrop", { position: { x: 10, y: 10 } });
  } else {
    await page.click(".modal-close");
  }

  await page.waitForTimeout(450);
  const closed = await page.evaluate(() => {
    const overlay = document.querySelector("#project-modal");
    const bodyStyle = getComputedStyle(document.body);
    const navStyle = getComputedStyle(document.querySelector(".navbar"));
    return {
      hidden: !overlay.classList.contains("active") && overlay.getAttribute("aria-hidden") === "true",
      bodyUnlocked: bodyStyle.overflow !== "hidden",
      navClickable: navStyle.pointerEvents !== "none"
    };
  });

  if (!closed.hidden) result.failures.push(`${project} modal: did not close`);
  if (!closed.bodyUnlocked) result.failures.push(`${project} modal: body stayed locked after close`);
  if (!closed.navClickable) result.failures.push(`${project} modal: nav stayed disabled after close`);
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
  const browser = await chromium.launch({ headless: true });
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

    for (const config of baseConfigs) {
      results.push(await runBaseConfig(browser, config));
    }

    for (const config of buildInteractionConfigs()) {
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
