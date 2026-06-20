/*
  Ziqian Portfolio JavaScript
  Structure: shared navigation/menu behavior, page transitions, scroll reveal,
  timeline progress, projects tabs/modals, contact form validation, cursor,
  and the lightweight hero neural canvas.
  Replace project URLs/details in PROJECTS when final links are ready.
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window);
const MODAL_VIDEO_GAIN = 2.2;

const PROJECTS = {
  piano: {
    title: "Alien Piano Tiles",
    image: "images/project-piano-tiles.svg",
    imageAlt: "Alien Piano Tiles rhythm game placeholder graphic",
    modalVariant: "pianoCaseStudy",
    video: "assets/videos/piano-tiles-gameplay.mp4",
    poster: "images/piano-tiles-poster.svg",
    description: "Solo project - Designed and built the game logic, Canvas rendering, scoring system, keyboard controls, and difficulty progression.",
    problem: "Build a fast-paced, timing-based reactive game to practice real-time input handling, collision detection, and game-state/score management in the browser.",
    approachHtml: "Designed a tile-spawning system with increasing difficulty, scoring logic based on accuracy and speed, and a game loop handling player input with JavaScript and HTML5 Canvas. An additional <span class=\"inline-status inline-status-progress\">IN PROGRESS</span> Alien Invasion arcade mode was started as a companion project within the same repo.",
    results: "Fully playable Alien Piano Tiles game with scoring and increasing difficulty; Alien Invasion mode in active development.",
    // CONFIRM: exact tech stack if different.
    tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"],
    github: "https://github.com/gohziqian1234-cmyk/piano-tiles-alien-",
    // CONFIRM: GitHub Pages must be enabled in repo Settings > Pages, then update this URL if GitHub gives a different address.
    playUrl: "https://gohziqian1234-cmyk.github.io/piano-tiles-alien-/",
    gallery: ["images/project-piano-tiles.svg", "images/project-alien-invasion.svg"]
  },
  erebus: {
    title: "Erebus-7: Parasite Protocol",
    image: "images/project-erebus-7.png",
    imageAlt: "Erebus-7 Parasite Protocol horror corridor gameplay artwork",
    modalVariant: "erebusCaseStudy",
    video: "assets/videos/erebus-7-gameplay.mp4",
    poster: "images/erebus-7-poster.svg",
    description: "Solo project - Built the detection system, difficulty scaling, resource logic, story progression, and interactive gameplay flow.",
    problem: "Design and build a narrative-driven stealth game exploring tension, suspicion mechanics, and atmosphere - combining storytelling with gameplay systems.",
    // CONFIRM/EXPAND: add specific mechanics, e.g. suspicion meter, dialogue choices, level design details once available.
    approach: "Built core stealth/suspicion mechanics, narrative pacing, and atmospheric presentation to create a tense single-player horror experience.",
    // CONFIRM: any additional results, e.g. number of levels/chapters.
    results: "Completed playable single-player game with full narrative arc.",
    // CONFIRM: actual stack.
    tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"],
    github: "https://github.com/gohziqian1234-cmyk/erebus-7",
    // CONFIRM: GitHub Pages must be enabled in repo Settings > Pages, then update this URL if GitHub gives a different address.
    playUrl: "https://gohziqian1234-cmyk.github.io/erebus-7/",
    gallery: ["images/project-erebus-7.png"]
  },
  mcfast: {
    title: "McFast Ordering System",
    image: "images/project-mcfast-ordering.svg",
    imageAlt: "McFast Ordering System fast-food ordering app interface graphic",
    modalVariant: "mcfastCaseStudy",
    video: "videos/mcfast-demo.mp4",
    poster: "images/project-mcfast-ordering.svg",
    description: "A Streamlit-based fast-food ordering app that allows users to browse menu categories, add items to a cart, update or remove items, apply discounts, calculate 9% GST, and generate a final receipt. This project demonstrates Python application logic, cart management, calculation flow, and browser-based app deployment.",
    tags: ["Python", "Streamlit", "Cart System", "Session State", "Discount Logic", "GST Calculation", "Receipt Generation"],
    github: "https://github.com/gohziqian1234-cmyk/portfolio_gohziqian",
    streamlitUrl: "https://gohziqian1234-cmyk-mcfast-app-app-hrwj7l.streamlit.app/",
    gallery: ["images/project-mcfast-ordering.svg"]
  },
  wheelchair: {
    title: "Motor-Assisted Wheelchair Support Prototype",
    image: "images/project-smart-wheelchair.svg",
    imageAlt: "Motor-Assisted Wheelchair Support Prototype wireframe thumbnail",
    modalVariant: "wheelchairCaseStudy",
    slidesUrl: "assets/reports/wheelchair-prototype-slides.pdf",
    tinkercadUrl: "https://www.tinkercad.com/things/3lyqhQ6I2kl-terrific-wolt-kup/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard%2Fdesigns%2Fall",
    demoUrl: "assets/videos/wheelchair-prototype-demo.mp4",
    description: "An assistive hardware prototype designed to support self-propelled wheelchair users on slopes using motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control.",
    tags: ["Arduino", "DC Motor", "Ultrasonic Sensor", "Potentiometer", "Buzzer", "Tinkercad"],
    github: "",
    gallery: ["images/project-smart-wheelchair.svg"]
  },
  greenhouse: {
    title: "IoT-Based Smart Plant Monitoring System",
    image: "images/project-smart-greenhouse.svg",
    imageAlt: "IoT-Based Smart Plant Monitoring System technical placeholder graphic",
    modalVariant: "plantCaseStudy",
    reportUrl: "assets/reports/iot-smart-plant-monitoring-report.pdf",
    demoUrl: "assets/videos/iot-smart-plant-monitoring-demo.mp4",
    diagram: "images/iot-plant-monitoring-architecture.png",
    description: "Automated indoor farming system using Arduino, Raspberry Pi, sensors, MariaDB, and Flask to monitor plant conditions and alert users when the environment is unsuitable.",
    // CONFIRM/EXPAND: specific goals, e.g. automated watering, temperature alerts.
    problem: "Reduce manual indoor farming monitoring by using IoT technology to provide real-time feedback, automatic light adjustment, and alerts when plant conditions are unsuitable.",
    // ADD: describe system - sensors used, how data is collected/displayed (e.g. LCD screen, app, serial monitor), any automated actuators (water pump, fan, etc.).
    approach: "Arduino collects temperature, light, water level, and manual control readings, then sends processed data to Raspberry Pi for MariaDB storage and Flask web monitoring.",
    // ADD: outcome - e.g. successfully monitors temp/humidity/soil moisture in real-time, automated irrigation triggers at threshold X.
    results: "The system monitored temperature, light intensity, and water level in real time, adjusted LED brightness, triggered alerts, stored sensor data, and displayed readings through Flask.",
    // CONFIRM: exact components/tech (e.g. soil moisture sensor, DHT22 temp/humidity sensor, relay for irrigation, ESP32 for WiFi connectivity).
    tags: ["Arduino", "Raspberry Pi", "IoT", "Sensors", "MariaDB", "Flask", "Python", "Sustainability"],
    github: "",
    gallery: ["images/project-smart-greenhouse.svg", "images/project-smart-greenhouse-build.svg", "images/project-smart-greenhouse-testing.svg"]
  },
  keychain: {
    title: "Multifunctional 3D-Printed Keychain",
    image: "images/project-keychain-photo.png",
    imageAlt: "Multifunctional 3D-printed keychain with ruler, bottle opener, phone stand, and cable holder features",
    modalVariant: "keychainCaseStudy",
    keychainUrl: "images/project-keychain-photo.png",
    inventorUrl: "assets/cad/multifunctional-keychain-autodesk-inventor.ipt",
    reportUrl: "assets/reports/keychain-design-report.pdf",
    description: "A compact 3D-printed keychain designed with multiple daily-use functions, including a mini ruler, bottle-opener-style cut-out, phone stand, cable holder, bookmark clip, keyring hole, and magnet recess. This project focused on CAD modelling, 3D printing, product usability, and improving the design through print testing and refinement.",
    tags: ["Autodesk Inventor", "CAD Design", "3D Printing", "Product Design", "Prototyping", "Design Iteration"],
    github: "",
    gallery: ["images/project-keychain-photo.png"]
  },
  construction: {
    title: "Construction Safety Fall-Risk Detection System",
    image: "images/project-construction-safety.svg",
    imageAlt: "Construction Safety Fall-Risk Detection System construction site safety monitoring schematic",
    modalVariant: "constructionCaseStudy",
    video: "videos/construction-safety-demo.mp4",
    poster: "images/project-construction-safety.svg",
    github: "https://github.com/gohziqian1234-cmyk/REPLACE-WITH-CONSTRUCTION-SAFETY-REPO",
    reportUrl: "#",
    description: "A work-in-progress safety monitoring system designed to detect fall-from-height, slip-trip-fall, and near-miss risks in construction environments. The project uses sensor-based data collection, microcontroller processing, data pipeline development, database storage, and dashboard visualisation to support faster safety intervention.",
    tags: ["IoT", "Data Engineering", "Sensors", "Arduino Nesso N1", "Data Pipeline", "Database", "Dashboard", "Workplace Safety"],
    gallery: ["images/project-construction-safety.svg"]
  }
};

const ABOUT_DETAILS = {
  takashimaya: {
    title: "Part-Time Sales Advisor — Christofle, Takashimaya",
    sections: [
      {
        title: "The Role",
        paragraphs: [
          "I work as a part-time Sales Advisor at Christofle in Takashimaya during holidays and non-exam periods. Christofle is a luxury silverware brand, so the role requires professionalism, product knowledge, attention to detail, and the ability to communicate clearly with different types of customers."
        ]
      },
      {
        title: "A Typical Shift",
        paragraphs: [
          "During morning shifts, I usually report at 9:30am and attend the Takashimaya morning briefing conducted by the management team. After the briefing, I prepare the counter for daily operations by cleaning the display area, opening the sales system, checking stock, arranging products, and making sure the counter is ready before customers arrive. This taught me the importance of preparation, consistency, and maintaining a professional retail environment."
        ]
      },
      {
        title: "Working With Customers",
        paragraphs: [
          "A major part of my role is assisting customers who are interested in Christofle products. I answer product enquiries, explain product details, understand what the customer is looking for, and recommend suitable silverware items based on their needs. Since luxury products are usually higher-value purchases, I learned that selling is not only about promoting an item, but also about building trust, listening carefully, and helping customers feel confident in their decision."
        ]
      },
      {
        title: "Sales Experience",
        paragraphs: [
          "Through this role, I gained real experience in customer communication and sales responsibility. I have contributed to sales conversations involving high-value items, including assisted sales exceeding $4,000 individually and over $10,000 as part of a team effort with my manager. These experiences helped me become more confident when speaking to customers, explaining product value, and handling sales conversations professionally."
        ]
      },
      {
        title: "Handling Pressure",
        paragraphs: [
          "Working in retail also taught me how to manage pressure and difficult situations. There were times when customers became unhappy because of miscommunication, and I had to stay calm instead of reacting emotionally. From these situations, I learned to listen carefully, speak respectfully, clarify the issue, and handle the customer professionally."
        ]
      },
      {
        title: "What This Taught Me",
        paragraphs: [
          "This experience helped me grow beyond technical skills. It strengthened my communication, patience, responsibility, emotional control, and ability to adapt to different people. These are skills that also support my project work, especially when working in teams, explaining ideas, presenting solutions, and handling feedback."
        ]
      }
    ]
  },
  "peer-tutor": {
    eyebrow: "WORK EXPERIENCE",
    title: "Peer Tutor — Programming Support",
    meta: [
      { label: "Role", value: "Peer Tutor" },
      { label: "Duration", value: "2024 – 2025" }
    ],
    sections: [
      {
        paragraphs: [
          "I support a junior/student by helping him during exam and assessment periods, especially when he needs guidance with difficult topics. Before major tests or submissions, I would check in and ask whether he needed help, then guide him through the areas he was struggling with.",
          "The support covered modules such as mathematics, mechanical-related topics, electrical concepts, and general study preparation. Instead of only giving answers, I tried to explain the steps clearly, break down the problem, and help him understand how to approach similar questions in the future.",
          "There were also times when he needed urgent help late at night. On one occasion, he messaged me close to midnight before an assessment period, and I still guided him online for around two hours to help him understand the topic better. This showed me the importance of patience, responsibility, and being willing to support others outside normal study hours.",
          "Beyond academic explanation, I also shared advice on how to prepare for assessments, how to focus on high-mark areas, how to avoid common mistakes, and how to study more effectively. This experience strengthened my communication skills because I had to explain technical concepts in a simple way and adjust my explanation based on his understanding.",
          "Through peer support, I learned that helping others is not only about knowing the answer. It is also about being patient, listening carefully, encouraging the other person, and helping them build confidence in their own learning."
        ]
      }
    ]
  },
  citizenship: {
    title: "Singapore Citizenship Ceremony Volunteer",
    sections: [
      {
        title: "The Event",
        paragraphs: [
          "I volunteered at the Singapore Citizenship Ceremony held at Cheng San Community Club. The event ran from around 9am to 5pm and consisted of two ceremony sessions attended by newly approved Singapore citizens and their families. The ceremony was an important occasion that celebrated their official integration into Singapore society and recognised their commitment to becoming part of the nation."
        ]
      },
      {
        title: "Before the Ceremony",
        paragraphs: [
          "I assisted with venue preparation by arranging chairs, organising registration materials, checking seating arrangements, and ensuring that the event area was ready to receive participants."
        ]
      },
      {
        title: "During Registration",
        paragraphs: [
          "I welcomed attendees, verified their names and seating information, directed them to the appropriate locations, and answered basic enquiries to help the registration process run smoothly and efficiently."
        ]
      },
      {
        title: "During the Ceremony",
        paragraphs: [
          "Throughout the ceremony, I remained attentive and approachable so that participants could seek assistance whenever needed. As many attendees were experiencing a significant milestone in their lives, I made an effort to communicate politely, patiently, and respectfully. I understood that creating a positive and welcoming environment was important in helping participants feel comfortable and valued during the event."
        ]
      },
      {
        title: "Teamwork",
        paragraphs: [
          "Working alongside other volunteers and event organisers also taught me the importance of teamwork and coordination. We had to cooperate closely to manage participant flow, maintain order, and ensure that both ceremony sessions proceeded according to schedule. Through this experience, I learned how effective communication and collaboration contribute to the success of large-scale community events."
        ]
      },
      {
        title: "What This Taught Me",
        paragraphs: [
          "This volunteering experience strengthened my communication, interpersonal, and organisational skills. It improved my ability to interact confidently with members of the public, adapt to different situations, and take responsibility for assigned tasks. Most importantly, it gave me a deeper appreciation of community service and the role volunteers play in supporting meaningful national and community events."
        ]
      }
    ]
  },
  "cny-goodie": {
    eyebrow: "VOLUNTEER WORK",
    title: "CNY Goodie Bag Packing",
    meta: [
      { label: "Organisation", value: "AWWA Elderly Centre" },
      { label: "Duration", value: "2022" }
    ],
    sections: [
      {
        paragraphs: [
          "I participated in a Chinese New Year goodie bag packing activity for elderly beneficiaries from AWWA Elderly Centre. The activity involved collecting food items and packing them into goodie bags so they could be distributed to elderly residents during Chinese New Year.",
          "During the activity, I worked together with my peer to organise the items, pack the bags properly, and make sure the food items were prepared neatly for distribution. The packing session lasted around two hours and required teamwork, patience, and attention to detail so that the items were packed efficiently.",
          "This volunteering experience also gave me the opportunity to contribute to a meaningful community activity. Although the task was simple, it reminded me that small acts of service can still support others, especially elderly beneficiaries during festive periods.",
          "Through this activity, I learned the importance of teamwork, responsibility, and contributing time to help the community."
        ]
      }
    ]
  },
  "community-heart": {
    eyebrow: "VOLUNTEER WORK",
    title: "Community@Heart Volunteering",
    meta: [
      { label: "Programme", value: "Community@Heart" },
      { label: "Duration", value: "2022" }
    ],
    sections: [
      {
        paragraphs: [
          "I participated in a Community@Heart volunteering activity where I helped make mosquito repellent for distribution to others in the community. This was my first time taking part in this type of activity, so I had to learn the process step by step and follow the instructions carefully.",
          "During the activity, I worked with others to prepare the mosquito repellent properly and make sure the items were ready to be given out. Although the task was new to me, I was willing to learn, ask questions when needed, and contribute to the group effort.",
          "This experience helped me understand that volunteering does not always need to be a large or complex task. Even simple work, such as preparing useful items for others, can still support the community. It also helped me build teamwork, patience, and a stronger willingness to try new things."
        ]
      }
    ]
  },
  infocomm: {
    title: "Infocomm Media Club — Mayflower Secondary School",
    sections: [
      {
        title: "My Role",
        paragraphs: [
          "I was a member of the Infocomm Media Club during secondary school, where I supported school media, audio-visual operations, and event coverage. One of my regular responsibilities was helping with the school PA system during morning assembly, making sure the audio setup was ready and working properly."
        ]
      },
      {
        title: "Event Support",
        paragraphs: [
          "I also helped during school events such as CCA exhibitions and school open house activities by supporting media-related tasks, taking photos or videos, and helping with event operations when needed. These experiences taught me how to be responsible behind the scenes and support school activities in a professional way."
        ]
      },
      {
        title: "Competitions Through This CCA",
        paragraphs: [
          "As part of my CCA experience, I also participated in technology-related competitions and activities, including the DJI RoboMaster Online Challenge (2022) and Infocomm Media Club Youth Award (2022). Although these were not major award-winning achievements, they gave me early exposure to robotics, media, teamwork, and technical problem-solving.",
          "For the DJI RoboMaster Online Challenge specifically: I participated as part of my Infocomm Media Club experience. Although I do not have full details of the final outcome, the activity exposed me to robotics-related thinking, teamwork, and technology-based problem solving. This experience contributed to my early interest in engineering and technical projects, especially in areas involving systems, hardware, and problem-solving."
        ]
      },
      {
        title: "What This Taught Me",
        paragraphs: [
          "This CCA helped me build responsibility, attention to detail, confidence in handling technical equipment, and early interest in technology-related work."
        ]
      }
    ]
  },
  entrepreneurship: {
    eyebrow: "CO-CURRICULAR ACTIVITY",
    title: "Entrepreneurship Club",
    meta: [
      { label: "Role", value: "Member" },
      { label: "Duration", value: "2025 – Present" }
    ],
    sections: [
      {
        paragraphs: [
          "I joined the Entrepreneurship Club to gain exposure to entrepreneurship, business thinking, and innovation beyond my technical modules. Through the club, I was introduced to how ideas can be developed into practical solutions, how value is created for users, and how communication is important when presenting or explaining an idea.",
          "Although my involvement was mainly through club participation and event exposure, the experience helped me understand that a good solution is not only about building something technically. It also needs to solve a real problem, meet user needs, and be communicated clearly to others.",
          "This CCA supported my growth as an AI & Data Engineering student because it helped me think beyond coding and technical implementation. It reminded me to consider the user, the problem, the value of the solution, and how a project can create real-world impact."
        ]
      }
    ]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

let scrollTriggerRefreshTimer = null;
let smoothScrollFrame = null;

function scheduleScrollTriggerRefresh() {
  if (!window.ScrollTrigger) return;
  window.clearTimeout(scrollTriggerRefreshTimer);
  scrollTriggerRefreshTimer = window.setTimeout(() => {
    window.ScrollTrigger.refresh();
  }, 150);
}

function setNavHeightVar(refreshScrollTriggers = false) {
  const nav = $(".navbar");
  if (!nav) return;

  const computed = getComputedStyle(nav);
  const navTop = Number.parseFloat(computed.top);
  const rect = nav.getBoundingClientRect();
  const topOffset = Number.isFinite(navTop) ? navTop : Math.max(0, rect.top);
  const totalOffset = Math.ceil(nav.offsetHeight + topOffset + 32);
  document.documentElement.style.setProperty("--nav-height", `${totalOffset}px`);

  if (refreshScrollTriggers) scheduleScrollTriggerRefresh();
}

function getNavOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim();
  const parsed = Number.parseFloat(value);
  if (value.endsWith("rem")) {
    return parsed * Number.parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
  }
  return Number.isFinite(parsed) ? parsed : 112;
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function shouldSkipFineMotion() {
  return prefersReducedMotion || !finePointer || document.body.classList.contains("low-performance");
}

function smoothScrollToPosition(top) {
  const targetTop = Math.max(0, top);
  window.cancelAnimationFrame(smoothScrollFrame);

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    return;
  }

  const startTop = window.pageYOffset;
  const distance = targetTop - startTop;
  const duration = Math.min(850, Math.max(420, Math.abs(distance) * 0.35));
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startTop + distance * easeOutExpo(progress));
    if (progress < 1) {
      smoothScrollFrame = requestAnimationFrame(step);
    }
  };

  smoothScrollFrame = requestAnimationFrame(step);
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
      smoothScrollToPosition(targetTop);
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
  let mouseRevealUntil = 0;

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
    } else if (Date.now() < mouseRevealUntil && navbar.classList.contains("nav-revealed-by-mouse")) {
      navbar.classList.remove("nav-hidden");
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      hide();
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
        mouseRevealUntil = Date.now() + 800;
        hideTimer = window.setTimeout(hide, 800);
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
  const revealItems = $$("[data-reveal], .quote-card:not([aria-hidden='true'])");
  if (!revealItems.length) return;
  document.body.classList.add("reveal-ready");
  revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));
  applyRevealStaggers();

  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "expo.out", duration: 0.78 });

  }

  initTimelineProgress();

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

function applyRevealStaggers() {
  const groups = [
    ".timeline-wrap",
    ".category-grid",
    ".project-grid",
    ".info-grid",
    ".experience-list",
    ".skill-category-grid",
    ".continue-links",
    ".marquee-track"
  ];

  groups.forEach((selector) => {
    $$(selector).forEach((group) => {
      $$(".reveal-on-scroll, [data-reveal], .quote-card:not([aria-hidden='true'])", group).forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
      });
    });
  });
}

function initHeroEntrance() {
  const hero = $(".hero");
  if (!hero) return;

  const heroRevealItems = $$("[data-reveal]", hero);
  heroRevealItems.forEach((item) => item.classList.add("is-visible"));

  if (prefersReducedMotion) {
    hero.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
    return;
  }

  const kicker = $(".section-kicker", hero);
  const words = $$(".hero-word", hero);
  const accent = $(".hero-word.accent-word", hero);
  const subtitle = $(".hero-subtitle", hero);
  const buttons = $$(".hero-pill-actions .button", hero);
  const profile = $(".profile-showcase", hero);
  const stats = $$(".hero-stat-grid > div", hero);
  const overlay = document.createElement("div");
  overlay.className = "hero-aperture-overlay";
  overlay.setAttribute("aria-hidden", "true");
  hero.appendChild(overlay);

  words.forEach((word) => word.classList.add("hero-line-focus"));

  if (window.gsap) {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => overlay.remove()
    });
    const introItems = [kicker, subtitle, ...buttons].filter(Boolean);

    gsap.set(introItems, { opacity: 0, y: 12 });
    gsap.set(words, { opacity: 0, y: 30, filter: "blur(6px)" });
    if (profile) gsap.set(profile, { opacity: 0, x: 40, rotate: 3 });
    gsap.set(stats, { opacity: 0, y: 18, scale: 0.96 });

    tl.to(overlay, { opacity: 0, duration: 0.3 }, 0)
      .to(kicker, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to(words, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12, ease: "power4.out" }, 0.5)
      .to(accent, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, textShadow: "0 0 40px rgba(61,90,254,0.4)" }, 1.12)
      .to([subtitle, ...buttons].filter(Boolean), { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 1.2)
      .to(profile, { opacity: 1, x: 0, rotate: 0, duration: 0.75, ease: "power3.out" }, 1.0)
      .to(stats, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "back.out(1.4)" }, 1.34);
    return;
  }

  overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease-out" }).finished.finally(() => overlay.remove());
  [kicker, ...words, subtitle, ...buttons, profile, ...stats].filter(Boolean).forEach((item, index) => {
    item.animate(
      [{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }],
      { duration: 700, delay: 300 + index * 60, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" }
    );
  });
}

function initHeadingWordReveals() {
  if (prefersReducedMotion) return;

  const headings = $$([
    ".section-header h2",
    ".chapter-heading h2",
    ".subpage-hero h1",
    ".project-browser h1",
    ".page-cta h2",
    ".continue-inner h2",
    ".contact-copy h2"
  ].join(","));

  headings.forEach((heading) => {
    if (heading.dataset.wordRevealReady === "true" || heading.closest(".hero-title")) return;
    const original = heading.textContent;
    const tokens = original.match(/\S+|\s+/g);
    if (!tokens || tokens.length < 2) return;

    heading.dataset.wordRevealReady = "true";
    heading.setAttribute("aria-label", heading.getAttribute("aria-label") || original);
    heading.innerHTML = tokens.map((token) => {
      if (/^\s+$/.test(token)) return token;
      return `<span class="heading-word">${escapeHtml(token)}</span>`;
    }).join("");

    $$(".heading-word", heading).forEach((word, index) => {
      word.style.transitionDelay = `${index * 40}ms`;
    });
  });
}

function initTimelineProgress() {
  const wraps = $$(".timeline-wrap");
  if (!wraps.length) return;

  let ticking = false;

  const dotCenterY = (wrap, item) => {
    const before = getComputedStyle(item, "::before");
    const top = Number.parseFloat(before.top) || 0;
    const height = Number.parseFloat(before.height) || item.offsetHeight || 0;
    return item.offsetTop + top + height / 2;
  };

  const update = () => {
    wraps.forEach((wrap) => {
      const progress = $(".timeline-progress", wrap);
      if (!progress) return;

      const rect = wrap.getBoundingClientRect();
      const items = $$(".timeline-item", wrap);
      if (!items.length) return;

      const viewport = window.innerHeight;
      const firstDot = dotCenterY(wrap, items[0]);
      const lastDot = dotCenterY(wrap, items[items.length - 1]);
      const dotRange = Math.max(1, lastDot - firstDot);
      const triggerLine = viewport * 0.66;
      const current = triggerLine - (rect.top + firstDot);
      const ratio = Math.max(0, Math.min(1, current / dotRange));

      progress.style.top = `${firstDot}px`;
      progress.style.height = `${ratio * dotRange}px`;

      items.forEach((item) => {
        const itemDotViewportY = rect.top + dotCenterY(wrap, item);
        item.classList.toggle("is-passed", itemDotViewportY <= triggerLine);
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
  window.addEventListener("load", requestUpdate);
  document.fonts?.ready?.then(requestUpdate).catch(() => {});
  window.setTimeout(requestUpdate, 250);
  window.setTimeout(requestUpdate, 750);
}

function initProjectTabs() {
  const tabs = $$("[data-project-tab]");
  const grids = $$("[data-project-grid]");
  if (!tabs.length || !grids.length) return;

  const params = new URLSearchParams(window.location.search);
  const requested = (params.get("category") || window.location.hash.replace("#", "") || "software").toLowerCase();
  const initialCategory = requested === "hardware" ? "hardware" : "software";
  let activeCategory = "";
  let tabAnimationTimer = null;

  const setCategory = (category, updateUrl = false) => {
    if (category === activeCategory && updateUrl) return;
    const previousCategory = activeCategory;
    activeCategory = category;

    tabs.forEach((tab) => {
      const active = tab.dataset.projectTab === category;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    window.clearTimeout(tabAnimationTimer);
    const outgoing = grids.find((grid) => grid.dataset.projectGrid === previousCategory);
    const incoming = grids.find((grid) => grid.dataset.projectGrid === category);
    const animateSwap = Boolean(outgoing && incoming && outgoing !== incoming && !prefersReducedMotion);

    grids.forEach((grid) => {
      const active = grid.dataset.projectGrid === category;
      if (!animateSwap || grid === incoming) {
        grid.hidden = !active;
        grid.classList.toggle("is-active", active);
      }

      if (active) {
        $$("[data-project-card]", grid).forEach((card, index) => {
          card.classList.remove("is-visible");
          card.style.transitionDelay = `${index * 65}ms`;
          window.setTimeout(() => card.classList.add("is-visible"), 20);
        });
      }
    });

    if (animateSwap) {
      outgoing.classList.add("is-leaving");
      outgoing.classList.remove("is-active", "is-entering");
      incoming.hidden = false;
      incoming.classList.add("is-entering");
      incoming.classList.remove("is-leaving");

      $$("[data-project-card]", incoming).forEach((card, index) => {
        card.classList.remove("is-visible");
        card.style.transitionDelay = `${index * 60}ms`;
      });

      tabAnimationTimer = window.setTimeout(() => {
        outgoing.hidden = true;
        outgoing.classList.remove("is-leaving");
        incoming.classList.add("is-active");
        requestAnimationFrame(() => {
          $$("[data-project-card]", incoming).forEach((card) => card.classList.add("is-visible"));
          window.setTimeout(() => incoming.classList.remove("is-entering"), 420);
        });
      }, 150);
    }

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
    $$(".modal-video", modal).forEach((video) => {
      video.pause();
      video._portfolioAudioContext?.close?.();
      video._portfolioAudioContext = null;
      video._portfolioAudioReady = false;
    });
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
    wireModalScrollFade(modal);
    wireModalVideoBoost(scrollArea);
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

function initAboutModal() {
  const modal = $("#about-modal");
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

  const openModal = (detail) => {
    previousFocus = document.activeElement;
    scrollArea.innerHTML = createAboutModalMarkup(detail);
    wireModalActionRipples(scrollArea);
    wireModalScrollFade(modal);
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => {
      modal.classList.add("active");
      $(".modal-close", modal)?.focus();
    });
  };

  $$("[data-open-about]").forEach((button) => {
    button.addEventListener("click", () => {
      const detail = ABOUT_DETAILS[button.dataset.openAbout];
      if (detail) openModal(detail);
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-about-modal]")) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function createAboutModalMarkup(detail) {
  const meta = detail.meta?.length
    ? `
      <div class="modal-role-meta">
        ${detail.meta
          .map(
            (item) => `
              <div class="role-meta-item">
                <span class="role-meta-label">${escapeHtml(item.label)}</span>
                <span class="role-meta-value">${escapeHtml(item.value)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  const sections = detail.sections
    .map((section) => {
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const heading = section.title ? `<h3 class="modal-section-heading">${escapeHtml(section.title)}</h3>` : "";
      return `
        <section class="modal-section modal-case-section">
          ${heading}
          ${paragraphs}
        </section>
      `;
    })
    .join("");

  return `
    <article class="project-modal-body project-modal-body-long detail-modal-body">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">${escapeHtml(detail.eyebrow || "Detail")}</p>
        <h2 class="modal-title" id="about-modal-title">${escapeHtml(detail.title)}</h2>
      </header>
      ${meta}
      ${sections}
    </article>
  `;
}

function createModalMarkup(project) {
  if (project.modalVariant === "pianoCaseStudy") return createPianoModalMarkup(project);
  if (project.modalVariant === "erebusCaseStudy") return createErebusModalMarkup(project);
  if (project.modalVariant === "mcfastCaseStudy") return createMcfastModalMarkup(project);
  if (project.modalVariant === "plantCaseStudy") return createPlantModalMarkup(project);
  if (project.modalVariant === "wheelchairCaseStudy") return createWheelchairModalMarkup(project);
  if (project.modalVariant === "keychainCaseStudy") return createKeychainModalMarkup(project);
  if (project.modalVariant === "constructionCaseStudy") return createConstructionModalMarkup(project);

  const images = project.gallery?.length ? project.gallery : [project.image];
  const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const approach = project.approachHtml || escapeHtml(project.approach || "");
  const actions = createModalActions(project);
  const thumbs = images
    .map(
      (src, index) => `
        <button class="${index === 0 ? "is-active" : ""}" type="button" data-modal-thumb="${escapeHtml(src)}" aria-label="Show project image ${index + 1}">
          <img src="${escapeHtml(src)}" width="960" height="600" alt="" loading="lazy" />
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
          <img src="${escapeHtml(images[0])}" width="960" height="600" alt="${escapeHtml(project.imageAlt || project.title)}" loading="lazy" data-modal-main-image />
        </div>
        <div class="modal-thumbs" aria-label="Project image thumbnails">${thumbs}</div>
      </section>

      ${actions}
    </article>
  `;
}

function createRoleSection(projectType, role, body) {
  return `
    <section class="modal-section modal-role-section">
      <div class="modal-role-meta">
        <div class="role-meta-item">
          <span class="role-meta-label">Project Type</span>
          <span class="role-meta-value">${escapeHtml(projectType)}</span>
        </div>
        <div class="role-meta-item">
          <span class="role-meta-label">My Role</span>
          <span class="role-meta-value">${escapeHtml(role)}</span>
        </div>
      </div>
      <p>${escapeHtml(body)}</p>
    </section>
  `;
}

function createPianoModalMarkup(project) {
  const actions = createModalActions(project);
  const roleSection = createRoleSection(
    "Solo Software Project",
    "Game Developer / Front-End Developer",
    "I designed and developed the game logic, tile spawning system, keyboard input controls, scoring system, streak multiplier, lives system, and game state flow. I also worked on the visual feedback, difficulty progression, testing, and debugging to make the game feel responsive and playable."
  );

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      ${roleSection}

      <div class="modal-media modal-video-frame">
        <!-- ADD: path to gameplay video file, e.g. /assets/videos/piano-tiles-gameplay.mp4 -->
        <!-- ADD: path to poster thumbnail image, e.g. /assets/images/piano-tiles-poster.jpg -->
        <!-- RECOMMENDED VIDEO SPECS: keep the file under ~15-20MB and ideally under 60 seconds; compress with H.264 codec at 720p or 1080p so the portfolio stays fast. -->
        <video class="modal-video" controls poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          <!-- OPTIONAL: <track kind="captions" src="captions.vtt" srclang="en" label="English"> -->
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Nowadays, games are becoming more complex, competitive, and time-consuming. Many people lose the original feeling of playing games for fun - instead, they start playing mainly to win, which can make them feel more stressed or frustrated.</p>
        <p>I wanted to create a simple browser game that is fun, interesting, and nostalgic. The target users are mainly students, polytechnic students, young adults, and the elderly who want a quick way to relax, reduce stress, and enjoy a short nostalgic game during their break time. Adults can also show their children what games were like when they were young, which can help create a bond between them.</p>
        <p>The challenge of this project was to make the game slightly difficult but still simple at the same time, so users could understand it immediately and feel motivated to keep playing.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built a rhythm game where piano tiles fall into different lanes, and the player needs to press the correct key at the right time. If the player fails to do so, they lose one life - and lose the game after missing more than two times.</p>
        <p>The game includes tile spawning, keyboard input detection, scoring, streak multipliers, lives, pause control, and game-over logic.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Simple rhythm gameplay inspired by classic piano tile games</li>
          <li>Alien-themed visual style for a unique look and feel</li>
          <li>Keyboard controls using the D, F, J, K keys</li>
          <li>Randomized tile spawning across different lanes</li>
          <li>Speed that steadily increases for rising difficulty</li>
          <li>Scoring system with streak multiplier rewards</li>
          <li>Three-lives system for added challenge</li>
          <li>Clear visual feedback for hits, misses, score changes, and game states</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technologies Used</h3>
        <p>Built with HTML, CSS, vanilla JavaScript, and HTML5 Canvas.</p>
        <p><strong>HTML</strong> structured the game page - the canvas, start screen, game-over screen, and scoreboard display.</p>
        <p><strong>CSS</strong> styled the purple alien theme, including effects, buttons, and layout.</p>
        <p><strong>JavaScript</strong> powered the gameplay logic - falling tiles, keyboard and touch input, scoring, combo system, lives, levels, collision detection, and game-over handling.</p>
        <p><strong>HTML5 Canvas</strong> rendered the live graphics - falling tiles, alien effects, the lane board, stars, particles, and animations.</p>
        <div class="modal-tech-tags">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">HTML5 Canvas</span>
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Challenges &amp; How I Overcame Them</h3>
        <p>One challenge was making the game feel fair as the tiles became faster. Too strict a timing window felt frustrating; too loose made the game too easy and less engaging. I adjusted the hit-detection window and added clearer visual feedback so players could understand exactly when they hit or missed a tile.</p>
        <p>Another challenge was managing different game states - ready, playing, paused, and game over. To avoid logic errors, I organized the game around a clear state system so each action only fires when the game is in the correct state.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>JavaScript programming</li>
          <li>HTML5 Canvas rendering</li>
          <li>Keyboard event handling</li>
          <li>Game loop logic</li>
          <li>Game state management</li>
          <li>Scoring and multiplier logic</li>
          <li>Debugging and testing</li>
          <li>User interface feedback</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final result is a simple but engaging rhythm game with increasing difficulty, responsive controls, scoring feedback, and a nostalgic gameplay style. This project helped me understand how real-time interaction, game loops, and user feedback shape the overall player experience.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Future versions of Alien Piano Tiles could include a music-synchronised mode, where tile spawning follows the beat of an actual soundtrack instead of relying only on timed falling tiles. This would make the rhythm gameplay feel more natural and challenging.</p>
        <p>A leaderboard system could also be added to store high scores, longest streaks, and best accuracy — giving players a reason to replay the game and improve their performance.</p>
        <p>Another improvement would be difficulty customisation, such as adjustable tile speed, hit-window timing, and lane count, making the game more flexible for both beginner and advanced players.</p>
        <p>The game could also be improved with better visual and audio feedback, such as hit effects, miss effects, combo animations, and distinct sound effects for different actions, making the gameplay feel more polished and responsive.</p>
        <p>For a stronger final version, the game could support mobile touch controls, allowing users to play on both desktop and mobile devices.</p>
      </section>

      ${actions}
    </article>
  `;
}

function createErebusModalMarkup(project) {
  const actions = createModalActions(project);
  const roleSection = createRoleSection(
    "Solo Software Project",
    "Game Developer / Narrative Systems Developer",
    "I designed and developed the core gameplay systems, including player progression, detection logic, difficulty scaling, resource management, story flow, and game state control. I also worked on the narrative structure, interaction design, testing, and balancing so that the game felt tense but still fair for the player."
  );

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      ${roleSection}

      <div class="modal-media modal-video-frame">
        <!-- ADD: path to Erebus-7 gameplay video, e.g. /assets/videos/erebus-7-gameplay.mp4 -->
        <!-- ADD: path to poster thumbnail, e.g. /assets/images/erebus-7-poster.jpg -->
        <!-- RECOMMENDED VIDEO SPECS: keep under ~15-20MB, H.264, 720p/1080p, ideally under 60 seconds of representative gameplay. -->
        <video class="modal-video" controls poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          <!-- OPTIONAL: <track kind="captions" src="captions.vtt" srclang="en" label="English"> -->
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Among Us is usually a multiplayer game, but not every player wants to play with random people online - some don't have friends to play with, or simply prefer to play alone without depending on anyone else.</p>
        <p>This project set out to redesign the Among Us-style experience as a single-player game, built around solo gameplay, tasks, decision-making, and suspense rather than real players. The challenge was making the game genuinely interesting without any multiplayer interaction to fall back on.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built a single-player social-horror stealth game called <strong>Erebus-7: Parasite Protocol</strong>. Players take on the role of an alien parasite confined within a space station, controlling a human host who must infect crew members, evade detection, and gradually take over the station.</p>
        <p>The primary objective is to navigate through the station's various sections and reach SELENE, the station's AI. To succeed, players must complete tasks, use infected hosts as allies, avoid guards and surveillance systems, and survive until the final chapter at the AI Core.</p>
        <p>The game features movement mechanics, enemy patrols, detection systems, infection mechanics, a clone respawn option, varying difficulty levels, narrative scenes, sound effects, a tactical map, tutorials, save/load functionality, and multiple chapters.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Single-player horror stealth gameplay</li>
          <li>Branching storyline with narrative progression</li>
          <li>Detection bar that rises when guards or cameras spot the player</li>
          <li>Easy, Medium, and Hard difficulty modes</li>
          <li>Clone system letting the player respawn at a planted backup body</li>
          <li>Tactical map showing rooms, people, danger, objectives, and routes</li>
          <li>Distinct station zones - Crew Quarters, Med Bay, Security Hub, Command Deck, and AI Core</li>
          <li>Story scenes and blackbox logs revealing what happened on the station</li>
          <li>Sound design with alarms, footsteps, whispers, scanner sounds, and horror music</li>
          <li>Pause menu, settings, save/load, tutorial, and game-over screens</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technologies Used</h3>
        <p>Built with HTML, CSS, JavaScript, and HTML5 Canvas.</p>
        <p><strong>HTML</strong> established the framework of the game page - the canvas, intro screen, tutorial, HUD, pause menu, tactical map, story scenes, and game-over screens.</p>
        <p><strong>CSS</strong> shaped the visual style - a dark horror aesthetic in teal, red, green, and blue tones to match the space station and parasite theme.</p>
        <p><strong>JavaScript</strong> powered the game's functionality - player movement, enemy AI, the detection bar, infection system, abilities, map system, story progression, sound, save/load, and game rules.</p>
        <p><strong>HTML5 Canvas</strong> rendered the live game environment - the map, rooms, characters, vision cones, effects, lighting, particles, objectives, and animations in real time.</p>
        <div class="modal-tech-tags">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">HTML5 Canvas</span>
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Challenges &amp; Solutions</h3>
        <p>One challenge was creating a genuinely scary atmosphere rather than just a dark one. Early on, the game felt too simplistic - players were just navigating a map. To fix this, I added more detailed room art, horror effects, sound design, story scenes, and frightening events triggered when the player entered certain areas.</p>
        <p>Another challenge was balancing the detection system. If it filled too slowly, the game became too easy; too quickly, and it felt unfair. I addressed this by introducing difficulty levels and tuning the detection range, speed, and cooldown for each mode.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>HTML, CSS, and JavaScript programming</li>
          <li>HTML5 Canvas rendering</li>
          <li>Game loop logic</li>
          <li>Player movement and collision detection</li>
          <li>Enemy AI and patrol behaviour</li>
          <li>Detection and stealth systems</li>
          <li>Game state management</li>
          <li>UI and HUD design</li>
          <li>Sound and music handling in the browser</li>
          <li>Story writing and mission flow</li>
          <li>Save/load system</li>
          <li>Debugging and playtesting</li>
          <li>Git and GitHub Pages publishing</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The outcome is a playable horror game with a full story theme, multiple levels, enemies, objectives, sound, and a clear mission flow.</p>
        <p>This project opened my eyes to how much work goes into making a game actually feel good - gameplay is so much more than controls and rules. A good game also needs feedback, sound, pacing, story, balance, and clear instructions for the player.</p>
        <p>All in all, Erebus-7: Parasite Protocol became much more than a simple prototype - a full-fledged browser game, playable on the web and shareable with others.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Using real human voice acting instead of placeholder or text-based narration could make the experience feel more immersive and significantly increase the horror atmosphere of the game.</p>
        <p>The narrative system could also be expanded with more branching choices, alternate endings, and unlockable story paths. This would make the story feel more interactive and give players more reasons to replay the game.</p>
      </section>

      ${actions}
    </article>
  `;
}

function createMcfastModalMarkup(project) {
  const tags = project.tags.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("");

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">PROJECT: MCFAST ORDERING SYSTEM</h2>
      </header>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>McFast Ordering System is a Python-based food ordering app built with Streamlit. The app simulates a fast-food ordering flow where users can browse menu categories, add items to a cart, update quantities, apply discounts, calculate GST, and generate a final receipt.</p>
        <p>This project is a supporting software project that demonstrates my ability to build a functional Python application with a browser-based interface.</p>
      </section>

      <div class="modal-media modal-video-frame">
        <!-- Demo video file provided by Ziqian and placed at /videos/mcfast-demo.mp4. -->
        <video class="modal-video" controls playsinline poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Problem / Brief</h3>
        <p>A food ordering system needs a clear flow from menu browsing to checkout. If the logic is not structured properly, users may enter invalid quantities, the cart may calculate wrongly, or the final receipt may become unclear.</p>
        <p>The aim of this project was to build a simple ordering app that handles menu selection, cart management, discount application, GST calculation, and receipt generation in a clear and organised way.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">My Role</h3>
        <p>I developed the application logic and Streamlit interface. My work included structuring the menu data, building the cart system, handling quantity updates, applying discount rules, calculating GST, generating the final receipt, and testing the app flow.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built a Streamlit app where users can select food items, choose quantities, manage their cart, apply discount types, and complete checkout. The app calculates the subtotal, discount, GST, and final total before displaying the receipt.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Menu browsing by category</li>
          <li>Add-to-cart function with quantity selection</li>
          <li>Cart display with itemised order summary</li>
          <li>Update or remove cart items</li>
          <li>Discount options for Student, Staff, Loyalty Member, or None</li>
          <li>9% GST calculation</li>
          <li>Final receipt generation</li>
          <li>Browser-based interface using Streamlit</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technical Implementation</h3>
        <p>The project uses Python for the main application logic and Streamlit for the web interface. Menu items and prices are handled in the app so the system can calculate item subtotals, discounts, GST, and the final total.</p>
        <p>The cart logic keeps track of selected items and quantities before checkout. The checkout flow applies the selected discount first, then calculates GST, and finally generates the receipt.</p>
        <div class="modal-tech-tags">${tags}</div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>Python programming</li>
          <li>Streamlit app development</li>
          <li>Cart and order management</li>
          <li>Conditional logic</li>
          <li>Input handling</li>
          <li>Calculation flow</li>
          <li>Discount and GST logic</li>
          <li>Receipt generation</li>
          <li>Debugging and testing</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Testing Evidence</h3>
        <ul class="modal-feature-list">
          <li>Tested adding different items and quantities into the cart</li>
          <li>Tested updating and removing cart items</li>
          <li>Tested checkout with different discount types</li>
          <li>Tested 9% GST calculation after discount</li>
          <li>Tested receipt generation after checkout</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final app demonstrates a working food ordering system with a clear user flow from menu selection to final receipt. It helped me practise Python application logic, Streamlit interface design, cart management, and calculation accuracy.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Future versions can include a database to store menu items, prices, customer orders, and order history instead of keeping the data only inside the app code.</p>
        <p>An admin panel can also be added so menu items, prices, and discounts can be updated without editing the source code directly.</p>
        <p>The receipt system can be improved by allowing users to download the final receipt as a PDF or text file.</p>
        <p>The app interface can also be improved with food images, order numbers, a cleaner checkout page, and better visual styling.</p>
      </section>

      <section class="modal-action-block" aria-label="McFast project links">
        <div class="modal-actions modal-action-row">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">&lt;/&gt;</span>
            View Code on GitHub
          </a>
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.streamlitUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">&#9654;</span>
            Try App on Streamlit
          </a>
        </div>
        <p class="modal-link-helper modal-helper-text">Note: This app is hosted on a free tier and may take 30&ndash;60 seconds to load if it has been inactive. If you see a 'Zzzz' sleep screen, click to wake it up and wait briefly.</p>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function createPlantModalMarkup(project) {
  const roleSection = createRoleSection(
    "Team Project",
    "Co-developer / IoT System Developer",
    "I contributed to the development of the IoT plant monitoring system, including sensor integration, Arduino logic, Raspberry Pi data handling, MariaDB database implementation, Flask web monitoring, testing, troubleshooting, and system documentation."
  );

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>An automated indoor farming monitoring system designed to track plant-growing conditions in real time. The system monitors temperature, light intensity, and water level using sensors, then provides alerts, automatic LED control, database storage, and web-based monitoring.</p>
        <p>This project connects hardware, software, database management, and web development into one complete IoT solution for sustainable indoor farming.</p>
      </section>

      ${roleSection}

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Singapore has limited land for agriculture and aims to strengthen food security by increasing local food production. Indoor farming and vertical farming can help, but they require stable growing conditions - suitable temperature, sufficient light, and enough water.</p>
        <p>In many indoor farming setups, these conditions are still checked manually. This can lead to delayed responses, inconsistent plant care, inefficient resource use, and weaker plant growth. Vertical farming can also create uneven lighting, where upper plants block light from reaching lower plants.</p>
        <p>This project was built to reduce manual monitoring by using IoT technology to provide real-time feedback, automatic light adjustment, and alerts when plant conditions are unsuitable.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built an automated plant monitoring and alert system that uses sensors to check whether the plant environment is suitable for growth. The system uses:</p>
        <ul class="modal-feature-list">
          <li>A Grove temperature sensor to monitor whether the temperature is within the 20&deg;C-35&deg;C suitable range</li>
          <li>A Grove light sensor to measure ambient light intensity</li>
          <li>An ultrasonic sensor to estimate water level by measuring distance to the water surface</li>
          <li>A rotary angle sensor to allow manual LED brightness control</li>
          <li>An LED to simulate grow-light adjustment</li>
          <li>A buzzer to alert users when conditions are not suitable</li>
          <li>A 16x2 LCD display to show real-time readings and status</li>
          <li>Arduino to collect sensor data and control outputs</li>
          <li>Raspberry Pi to receive and process data</li>
          <li>MariaDB to store sensor readings</li>
          <li>Flask to display recorded data on a web interface</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Real-time temperature monitoring</li>
          <li>Light intensity monitoring</li>
          <li>Water level detection</li>
          <li>Automatic LED brightness adjustment</li>
          <li>Manual LED brightness override</li>
          <li>LCD display for live plant condition feedback</li>
          <li>Buzzer alert for unsuitable conditions</li>
          <li>Serial communication between Arduino and Raspberry Pi</li>
          <li>MariaDB database storage</li>
          <li>Flask web interface for monitoring recorded data</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">System Architecture</h3>
        <div class="modal-diagram">
          <!-- DIAGRAM: extracted/replaced with the project architecture flowchart image. -->
          <img src="${escapeHtml(project.diagram)}" alt="System architecture flowchart showing data flow from sensors through Arduino, Raspberry Pi, MariaDB, to the Flask web interface" loading="lazy" width="1200" height="520">
        </div>
        <p>The Arduino collects data from the temperature sensor, light sensor, ultrasonic sensor, and rotary angle sensor. It processes the readings, controls the LED and buzzer, and displays the status on the LCD screen.</p>
        <p>The processed data is then sent to the Raspberry Pi through serial communication. The Raspberry Pi stores the readings in a MariaDB database and displays the data through a Flask web page, allowing users to view plant condition data more clearly and use it for future analysis.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technical Implementation</h3>
        <p>The system uses predefined thresholds to decide whether the environment is suitable for plant growth.</p>
        <p>The temperature condition is suitable when the reading is between 20&deg;C and 35&deg;C. The light condition is evaluated using effective light, which combines ambient light and LED brightness - if the light level is too low, LED brightness increases automatically; if there's enough light, brightness decreases to save energy.</p>
        <p>The ultrasonic sensor measures the distance between the sensor and the water surface. If the distance is too high, the system treats the water level as low and activates an alert. The rotary angle sensor allows the user to manually override the automatic LED control when needed.</p>
        <div class="modal-tech-tags">
          <span class="tech-tag">Arduino</span>
          <span class="tech-tag">Raspberry Pi</span>
          <span class="tech-tag">IoT</span>
          <span class="tech-tag">Sensors</span>
          <span class="tech-tag">MariaDB</span>
          <span class="tech-tag">Flask</span>
          <span class="tech-tag">Python</span>
          <span class="tech-tag">Sustainability</span>
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Testing & Results</h3>
        <p>The system was tested under different environmental conditions to verify each function worked correctly. Test cases checked whether:</p>
        <ul class="modal-feature-list">
          <li>The buzzer stayed off when all conditions were suitable</li>
          <li>The buzzer activated when temperature, light, or water level was unsuitable</li>
          <li>LED brightness increased in darker conditions</li>
          <li>LED brightness decreased in brighter conditions</li>
          <li>Low water level was detected correctly</li>
          <li>Manual LED control overrode automatic brightness adjustment</li>
        </ul>
        <p>The system successfully responded to these test conditions, showing that the hardware, software, database, and web interface could work together as one complete IoT system.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>IoT system design</li>
          <li>Sensor integration</li>
          <li>Arduino programming</li>
          <li>Raspberry Pi data processing</li>
          <li>Serial communication</li>
          <li>Python scripting</li>
          <li>MariaDB database implementation</li>
          <li>Flask web development</li>
          <li>Real-time monitoring</li>
          <li>Testing and troubleshooting</li>
          <li>Sustainability-focused engineering</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final system successfully monitored temperature, light intensity, and water level in real time. It could automatically adjust LED brightness, alert users when plant conditions were unsuitable, store sensor data in a database, and display the readings through a Flask web interface.</p>
        <p>This project helped me understand how hardware, software, databases, and web technologies can be integrated into a practical IoT solution - and how technology can support more efficient and sustainable indoor farming.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Although the system successfully monitors temperature, light intensity, and water level in real time, the current version mainly provides alerts when conditions are not suitable. A stronger future version could respond automatically instead of only notifying the user.</p>
        <p>The first improvement would be an automatic watering system. At the moment, the ultrasonic sensor can detect when the water level is low and trigger an alert, but the user still needs to refill the water manually. A future version could include a water pump that automatically adds water when the level falls below the acceptable range.</p>
        <p>The second improvement would be automatic temperature control. The current system can detect when the temperature is below 20&deg;C or above 35&deg;C and activate the buzzer, but it does not directly control the temperature. A future version could include a fan, heater, or cooling system to automatically adjust the temperature and keep the plant environment within the suitable range.</p>
        <p>The third improvement would be a stronger web dashboard. The current Flask web interface displays recorded sensor data in a table format. A future version could improve this by adding charts, trend analysis, and warning history so users can understand how the plant environment changes over time.</p>
        <p>Overall, the next version should move from a monitoring-and-alert system to a more complete automated control system. This would reduce manual work further, improve plant growth consistency, and make the system more useful for real indoor farming.</p>
      </section>

      <section class="modal-action-block" aria-label="Project report and demo">
        <!-- REPORT: converted from the co-authored DOCX project report to a web-friendly PDF. -->
        <!-- DEMO: linked to the provided project demo MP4. -->
        <div class="modal-actions modal-action-row">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.reportUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">PDF</span>
            View Full Report
          </a>
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">&#9654;</span>
            Watch Demo
          </a>
        </div>
        <p class="modal-coauthor-note">Co-authored with Li Heng as a joint project submission.</p>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function createWheelchairModalMarkup(project) {
  const roleSection = createRoleSection(
    "Team Project",
    "Technical Lead / Prototype Developer",
    "I led the main technical development and refinement of the prototype. My contribution included planning the solution, building and integrating the hardware components, developing the Arduino control logic, testing the system, identifying design weaknesses, and refining the final prototype."
  );

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      ${roleSection}

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>An assistive hardware prototype designed to support self-propelled wheelchair users when travelling on slopes. The system combines motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control to reduce user effort and improve safety awareness.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Problem / Brief</h3>
        <p>Self-propelled wheelchair users face greater difficulty when moving up slopes because more physical effort is required compared to flat ground. Moving down slopes can also be harder to control and may increase the risk of collision, tipping, or falling.</p>
        <p>This project aimed to create a low-cost assistive prototype that demonstrates three core functions: motor assistance, user-adjustable speed control, and obstacle alert feedback.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>The prototype uses a DC motor to support forward movement, a potentiometer to control motor speed, an ultrasonic sensor to detect nearby obstacles, a buzzer to alert the user, and a switch to turn the system on or off.</p>
        <p>The goal was not to build a commercial wheelchair product, but to demonstrate a practical assistive concept that could reduce user effort and improve safety awareness.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>DC motor assistance to support wheelchair movement</li>
          <li>Potentiometer speed control for adjustable motor output</li>
          <li>Ultrasonic sensor for obstacle detection</li>
          <li>Buzzer alert when an object is detected</li>
          <li>Switch control for manual system on/off</li>
          <li>Prototype refinement through testing</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Design Process</h3>
        <p>The project started with Crazy 8 brainstorming to generate multiple possible solutions. The team then used a value-effort map to compare ideas and selected the motor-assist wheelchair concept because it provided high user value while still being achievable within the project constraints.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Testing &amp; Evidence</h3>
        <div class="modal-table-wrapper">
          <table class="modal-data-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>What Was Checked</th>
                <th>Observation</th>
                <th>What This Proved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Motor Assist Test</td>
                <td>Whether the DC motor could rotate and support forward movement</td>
                <td>Motor spun consistently when the system was switched on and the potentiometer was adjusted</td>
                <td>Core drive function was operational</td>
              </tr>
              <tr>
                <td>Speed Control Test</td>
                <td>Whether the potentiometer could adjust motor output</td>
                <td>Motor speed increased or decreased when the knob was turned</td>
                <td>User-adjustable speed control worked</td>
              </tr>
              <tr>
                <td>Obstacle Detection Test</td>
                <td>Whether the ultrasonic sensor could detect nearby objects</td>
                <td>Buzzer activated when an object was placed in front of the sensor</td>
                <td>Obstacle alert function was working</td>
              </tr>
              <tr>
                <td>Switch Control Test</td>
                <td>Whether the user could turn the system on and off</td>
                <td>Motor and buzzer stopped when the switch was turned off</td>
                <td>User had direct control and could cut off the system when needed</td>
              </tr>
              <tr>
                <td>Feedback Comparison</td>
                <td>Whether LED or buzzer feedback was more useful</td>
                <td>Buzzer feedback was clearer and more noticeable than the LED</td>
                <td>Audio feedback was more practical, so the LED was removed</td>
              </tr>
              <tr>
                <td>Sensor Placement Test</td>
                <td>Whether ultrasonic sensor placement affected detection</td>
                <td>Sensor placement was adjusted after testing</td>
                <td>Placement affected detection quality and needed refinement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final prototype demonstrated a functional assistive concept that combines motor support, speed control, and obstacle alert feedback. The strongest part of this project was the refinement process: removing unnecessary LED feedback, adding manual switch control, and improving ultrasonic sensor placement based on testing.</p>
        <p>Each decision directly improved the user experience - simpler feedback, safer control, and more reliable obstacle detection without adding unnecessary cost or complexity.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Refinement Decisions</h3>
        <p>During testing, the LED was removed because it added less practical value than the buzzer. The buzzer provided clearer feedback through sound, while the LED made the design more complex without improving the user experience.</p>
        <p>A switch was added because users needed direct control to turn the system on or off. The ultrasonic sensor placement was also adjusted after testing to improve front obstacle detection.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Known Limitation</h3>
        <p>The prototype demonstrated the core assistive functions, but it was not ready for real wheelchair deployment. The motor, power supply, and mounting structure would need to be improved before the system could support heavier loads or longer real-world use.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Future versions require a higher-torque motor for stronger slope support, a dedicated battery system for longer operation, a stronger mounting structure, and a slope detection sensor to adjust motor assistance more automatically.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>Assistive technology design</li>
          <li>Hardware prototyping</li>
          <li>Arduino programming</li>
          <li>Circuit planning</li>
          <li>Sensor integration</li>
          <li>Motor control logic</li>
          <li>User-centred design</li>
          <li>Testing and refinement</li>
          <li>Market comparison</li>
          <li>Engineering decision-making</li>
        </ul>
      </section>

      <section class="modal-action-block" aria-label="Project slides, circuit, and demo">
        <!-- SLIDES: exported from PG_Group3_PROJ2.pptx to a web-friendly PDF. -->
        <!-- TINKERCAD: public/shareable Tinkercad circuit URL provided by Ziqian. -->
        <!-- DEMO: linked to the provided wheelchair prototype demo MP4. -->
        <div class="modal-action-row modal-action-row-triple">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.slidesUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">PDF</span>
            View Project Slides (PDF)
          </a>
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.tinkercadUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">Tools</span>
            View Circuit in Tinkercad
          </a>
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">&#9654;</span>
            Watch Demo
          </a>
        </div>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function createKeychainModalMarkup(project) {
  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      <section class="modal-section modal-role-section">
        <div class="modal-role-meta">
          <div class="role-meta-item">
            <span class="role-meta-label">Project Type</span>
            <span class="role-meta-value">Individual Design Project</span>
          </div>
          <div class="role-meta-item">
            <span class="role-meta-label">My Role</span>
            <span class="role-meta-value">CAD Designer / 3D Printing Prototype Developer</span>
          </div>
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>A compact 3D-printed keychain designed to combine multiple daily-use functions into one portable product. The design focuses on convenience, safety, and manufacturability while keeping the product slim, lightweight, and easy to carry.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Problem / Brief</h3>
        <p>Many small everyday tools are useful but inconvenient to carry separately. This project aimed to design a compact keychain that combines several practical functions while still being printable, lightweight, and comfortable for daily use.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I designed and 3D-printed a multifunctional keychain with several integrated features, including a keyring hole, mini ruler, bottle-opener-style cut-out, phone stand, cable holder, bookmark clip, magnet recess for name-tag use, rounded edges, and chamfered functional areas.</p>
        <p>The design was created to be flat and portable so it could be attached to a bag or carried in a pocket without taking up much space.</p>
        <div class="modal-photo-gallery">
          <img src="${escapeHtml(project.gallery[0])}" alt="Finished 3D-printed keychain, full view showing ruler markings and keyring hole" loading="lazy">
          <!-- ACTION REQUIRED: add additional close-up photos here as they become available - e.g. bottle-opener cutout, phone stand in use, magnet recess. Currently only 1 photo is provided; gallery supports 1-4 images gracefully. -->
        </div>
        <p class="modal-media-caption">The finished, 3D-printed keychain prototype.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Keyring hole for attachment</li>
          <li>Mini ruler markings for quick measurement</li>
          <li>Bottle-opener-style feature</li>
          <li>Phone stand support</li>
          <li>Cable holder area for organising wires</li>
          <li>Bookmark clip function</li>
          <li>Magnet recess for name-tag use</li>
          <li>Filleted edges to reduce sharp corners</li>
          <li>Chamfered areas for functional grip and usability</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Design & Manufacturing Process</h3>
        <p>The first print revealed several design problems. Some engraved details were unclear, the ruler markings were too close together, and the name engraving was too deep, affecting the back of the keychain.</p>
        <p>To improve the second version, I increased the spacing between ruler markings, adjusted the detail size, and reduced the depth of the name engraving. This made the final print cleaner and more readable.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Testing & Refinement</h3>
        <p>The prototype was tested through physical use and visual inspection. The second print showed clearer ruler markings, better engraving quality, and improved overall appearance compared to the first version.</p>
        <p>This project helped me understand that a design may look correct on screen but still fail during manufacturing if feature size, spacing, depth, and tolerance are not considered properly.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>CAD modelling</li>
          <li>Autodesk Inventor features</li>
          <li>Extrude, cut, fillet, chamfer, and emboss</li>
          <li>3D printing preparation</li>
          <li>Product prototyping</li>
          <li>Design refinement</li>
          <li>Manufacturing awareness</li>
          <li>Problem-solving through iteration</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final keychain prototype showed improvement from the first print to the second print. The project strengthened my ability to design with manufacturing in mind, not just appearance. It also taught me to consider print quality, engraving depth, spacing, and usability before finalizing a physical product.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Learned</h3>
        <p>This project taught me that designing for the screen is different from designing for manufacturing. Some features looked clear in Autodesk Inventor, but became too small or unclear after 3D printing because I had not fully considered printer resolution, minimum feature size, spacing, and material behaviour.</p>
        <p>The first print revealed several problems: the ruler markings were too close together, the engraved details were unclear, and the name engraving was too deep. For the second print, I increased the spacing between markings, adjusted the feature size, and reduced the engraving depth. These changes improved the readability and overall print quality.</p>
        <p>This strengthened my ability to use Autodesk Inventor tools such as extrude, cut, fillet, chamfer, and emboss with manufacturing intent, not just visual design intent. I learned that a good product is not only about how it looks on screen, but also whether it can be printed, used, and improved in real life.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Future versions can improve the ruler markings by adding stronger contrast, such as painted engraving or a clearer colour-fill method, so the markings are easier to read.</p>
        <p>The phone stand and cable holder can be refined to support different phone sizes and cable thicknesses more securely. The magnet recess can also be improved by testing different tolerance fits so the magnet sits firmly without becoming too loose or too tight.</p>
        <p>The edge comfort can be improved by testing different fillet and chamfer sizes to make the keychain smoother when carried in a pocket or bag. A stronger material, such as PETG, could also be considered if the keychain is meant for daily use.</p>
        <p>The emergency-tool-inspired features should be treated as design exploration only unless they are tested with proper materials and safety standards. A stronger version would require better material strength, safer edge geometry, and proper functional testing before being described as a real emergency tool.</p>
        <p>Overall, the next improvement would focus on making the keychain more readable, durable, comfortable to carry, and reliable as a daily-use product.</p>
      </section>

      <div class="modal-tech-tags">
        <span class="tech-tag">Autodesk Inventor</span>
        <span class="tech-tag">CAD Design</span>
        <span class="tech-tag">3D Printing</span>
        <span class="tech-tag">Product Design</span>
        <span class="tech-tag">Prototyping</span>
        <span class="tech-tag">Design Iteration</span>
      </div>

      <section class="modal-action-block" aria-label="Keychain project links">
        <!-- ACTION REQUIRED: replace View the Keychain with a 3D model viewer or multi-angle gallery when ready. -->
        <div class="modal-actions modal-action-row modal-action-row-triple">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.keychainUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">Key</span>
            View the Keychain
          </a>
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.inventorUrl)}" target="_blank" rel="noopener noreferrer" download="multifunctional-keychain-autodesk-inventor.ipt" data-modal-action>
            <span aria-hidden="true">CAD</span>
            View in Autodesk Inventor
          </a>
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.reportUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">PDF</span>
            View Full Report
          </a>
        </div>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function createConstructionModalMarkup(project) {
  const tags = project.tags.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("");

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">PROJECT: CONSTRUCTION SAFETY FALL-RISK DETECTION SYSTEM</h2>
      </header>

      <div class="modal-status-callout" role="status">
        &#9888; Work In Progress — This project is currently under active development. Sections marked [Planned] describe intended design and architecture that has not yet been fully built.
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>The Construction Safety Fall-Risk Detection System is a work-in-progress IoT and data engineering project built to monitor construction environments and detect fall-from-height, slip-trip-fall, and near-miss incidents in real time.</p>
        <p>The system collects sensor data from an Arduino Nesso N1 microcontroller, processes it through a data pipeline, stores readings in a database, and visualises alerts on a safety dashboard. The goal is to support faster intervention and improve on-site safety awareness.</p>
        <p>This project demonstrates my ability to work across the full stack of an IoT data system — from physical sensor integration at the edge to structured data storage and operator-facing visualisation.</p>
      </section>

      <div class="modal-media modal-video-frame">
        <!-- TODO: Replace src with actual Construction Safety demo video (place file at /videos/construction-safety-demo.mp4) -->
        <video class="modal-video" controls playsinline poster="${escapeHtml(project.poster)}" preload="none" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Problem / Brief</h3>
        <p>Construction sites are one of the most hazardous working environments, with falls from height being a leading cause of serious injury and fatality. Traditional safety monitoring relies heavily on manual supervision, which cannot always detect near-miss events in time for intervention.</p>
        <p>The brief for this project was to design and begin building a sensor-based system that can automatically monitor construction environments, detect fall-risk events, and surface alerts to a safety dashboard — reducing the reliance on manual observation and enabling faster response times.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">My Role</h3>
        <p>I am developing this project independently. My responsibilities include designing the sensor integration, writing the microcontroller data collection code, building the data pipeline, setting up the database schema, and developing the dashboard for visualising safety alerts.</p>
        <p>This is a solo project covering the full scope from edge hardware to data infrastructure to front-end visualisation.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Am Building</h3>
        <p>I am building a multi-layer IoT safety monitoring system with the following components:</p>
        <p>An Arduino Nesso N1 microcontroller connected to sensors that measure motion, acceleration, and positional data relevant to fall-risk detection on construction sites.</p>
        <p>A data pipeline that receives sensor readings, processes and validates the data, and routes it into structured storage.</p>
        <p>A database that logs sensor events, timestamps, alert levels, and incident classifications for ongoing analysis.</p>
        <p>A safety dashboard that visualises real-time readings, flags high-risk events, and provides a historical record of near-miss and alert incidents.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Sensor-based fall-from-height detection using Arduino Nesso N1</li>
          <li>Slip-trip-fall and near-miss risk event classification</li>
          <li>Real-time data collection from construction environment sensors</li>
          <li>Data pipeline for processing and routing sensor readings</li>
          <li>Database storage for events, alerts, and incident history</li>
          <li>Safety dashboard for real-time monitoring and alert visualisation</li>
          <li>Designed for construction site deployment</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technical Implementation</h3>
        <p>The Arduino Nesso N1 is used as the primary microcontroller for sensor data collection. It reads motion, acceleration, and environmental data from connected sensors and transmits the data through the pipeline layer.</p>
        <p>The data pipeline receives raw sensor output, applies processing and validation logic, and stores structured records in the database. The pipeline is designed to handle continuous sensor readings and route alert-level events for priority display on the dashboard.</p>
        <p>The database schema organises sensor readings by timestamp, location, alert type, and severity level, making it possible to query historical incident data as well as real-time events.</p>
        <p>The dashboard layer reads from the database and renders readings, alert flags, and incident trends in a format suited for a construction site safety operator.</p>
        <div class="modal-tech-tags">${tags}</div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>IoT sensor integration</li>
          <li>Microcontroller programming (Arduino Nesso N1)</li>
          <li>Data pipeline design and development</li>
          <li>Database schema design and management</li>
          <li>Dashboard development and data visualisation</li>
          <li>Construction safety domain understanding</li>
          <li>End-to-end system architecture (edge to dashboard)</li>
          <li>Iterative prototyping and testing</li>
        </ul>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Current Progress</h3>
        <p>The project is currently in active development. The following progress has been made so far:</p>
        <ul class="modal-feature-list">
          <li>Sensor selection and hardware setup with Arduino Nesso N1 underway</li>
          <li>Data pipeline architecture designed and partially implemented</li>
          <li>Database schema defined</li>
          <li>Dashboard design and structure planned</li>
        </ul>
        <p>Remaining work includes completing sensor integration, finalising the pipeline and database connection, and building out the full dashboard interface.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The intended outcome of this project is a working fall-risk detection system that demonstrates a complete IoT data pipeline — from physical sensor readings on a construction site through to a live safety dashboard.</p>
        <p>This project represents my ability to connect hardware, data engineering, and visualisation into one unified system, applied to a real-world safety problem in the construction industry.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Once the core system is complete, future development could include integrating additional sensor types such as environmental monitors, pressure sensors, and wearable biometric devices for a more complete safety profile.</p>
        <p>The alert system could be extended with SMS or push notification delivery so safety officers receive real-time incident alerts without needing to monitor the dashboard continuously.</p>
        <p>Machine learning classification could be added to improve the accuracy of fall-risk event detection by learning from historical sensor patterns rather than relying on fixed threshold rules.</p>
        <p>A mobile-responsive version of the safety dashboard could also be developed for use on tablets or smartphones on-site.</p>
      </section>

      <section class="modal-action-block" aria-label="Construction safety project links">
        <div class="modal-actions modal-action-row">
          <!-- TODO: Replace with actual GitHub repo URL for Construction Safety Fall-Risk Detection System -->
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">&lt;/&gt;</span>
            View Code on GitHub
          </a>
          <!-- TODO: Replace href with link to project report or documentation when available -->
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.reportUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">PDF</span>
            View Project Report
          </a>
        </div>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
      </section>
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

function wireModalScrollFade(modal) {
  const scrollArea = $(".modal-scroll-area", modal);
  if (!scrollArea) return;

  const update = () => {
    const remaining = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight;
    modal.classList.toggle("is-scroll-end", remaining <= 50);
    modal.classList.toggle("has-scroll-overflow", scrollArea.scrollHeight > scrollArea.clientHeight + 8);
  };

  scrollArea.removeEventListener("scroll", scrollArea._modalScrollFadeUpdate);
  scrollArea._modalScrollFadeUpdate = update;
  scrollArea.addEventListener("scroll", update, { passive: true });
  $$("img, video", scrollArea).forEach((media) => {
    media.addEventListener("load", update, { once: true });
    media.addEventListener("loadedmetadata", update, { once: true });
  });
  requestAnimationFrame(() => {
    update();
    requestAnimationFrame(update);
  });
  window.setTimeout(update, 120);
  window.setTimeout(update, 420);
  window.setTimeout(update, 900);
}

function wireModalVideoBoost(root) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  $$(".modal-video", root).forEach((video) => {
    video.volume = 1;

    if (!AudioContextClass) return;

    const boostAudio = () => {
      if (video._portfolioAudioReady) {
        video._portfolioAudioContext?.resume?.();
        return;
      }

      try {
        const audioContext = new AudioContextClass();
        const source = audioContext.createMediaElementSource(video);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = MODAL_VIDEO_GAIN;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        video._portfolioAudioContext = audioContext;
        video._portfolioAudioReady = true;
        audioContext.resume?.();
      } catch {
        video.volume = 1;
      }
    };

    video.addEventListener("play", boostAudio);
  });
}

function clearProjectCardMotion() {
  $$("[data-project-card], .category-card").forEach((card) => {
    card.style.removeProperty("transform");
    card.style.removeProperty("--glow-x");
    card.style.removeProperty("--glow-y");
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
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
  const status = $("[data-form-status]", form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = validateForm(form);
    if (!valid) return;

    submit.disabled = true;
    submit.classList.add("is-loading");
    submitText.textContent = "Sending...";
    if (status) status.textContent = "";

    const action = form.getAttribute("action") || "";
    const formspreeAction = form.dataset.formspreeAction || action;
    const hasFormspreeEndpoint = formspreeAction.includes("formspree.io/f/") && !formspreeAction.includes("REPLACE_WITH_FORM_ID");

    if (!hasFormspreeEndpoint) {
      const emailAddress = form.dataset.contactEmail || "gohziqian1234@gmail.com";
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get("subject") || "Portfolio Contact Message");
      const body = encodeURIComponent(
        `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\n\n${data.get("message") || ""}`
      );
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      submit.classList.remove("is-loading");
      submit.disabled = false;
      submitText.textContent = "Send Message";
      if (status) status.textContent = "Opening your email app to send this message.";
      return;
    }

    try {
      const response = await fetch(formspreeAction, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");

      submit.classList.remove("is-loading");
      submit.classList.add("is-success");
      submitText.textContent = "Message Sent!";
      if (status) status.textContent = "Thanks. Your message has been sent.";
      form.reset();
      window.setTimeout(() => {
        submit.classList.remove("is-success");
        submit.disabled = false;
        submitText.textContent = "Send Message";
        if (status) status.textContent = "";
      }, 3000);
    } catch {
      submit.classList.remove("is-loading");
      submit.disabled = false;
      submitText.textContent = "Send Message";
      if (status) status.textContent = "Message could not be sent. Please email gohziqian1234@gmail.com directly.";
    }
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

  const finalText = (item) => item.dataset.finalText || item.textContent.trim();

  stats.forEach((item) => {
    item.dataset.finalText = finalText(item);
  });

  const setValue = (item, value) => {
    const decimals = Number(item.dataset.decimals || 0);
    const prefix = item.dataset.prefix || "";
    item.textContent = `${prefix}${value.toFixed(decimals)}`;
  };

  const setFinalValue = (item) => {
    item.textContent = finalText(item);
    item.dataset.countComplete = "true";
  };

  const animate = (item) => {
    if (item.dataset.counted === "true") {
      setFinalValue(item);
      return;
    }
    item.dataset.counted = "true";
    const target = Number(item.dataset.count || 0);
    const duration = prefersReducedMotion ? 0 : 1200;
    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setFinalValue(item);
    };

    const tick = (now) => {
      const progress = duration ? Math.min(1, (now - start) / duration) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(item, target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }
      finish();
    };

    window.setTimeout(finish, duration + 150);
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

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stats.forEach((item) => {
        if (item.dataset.counted === "true") setFinalValue(item);
      });
    }
  });
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
  if (prefersReducedMotion || initCinematicIntro.played || !$(".hero")) return;

  const intro = document.createElement("div");
  intro.className = "cinematic-intro cinematic-aperture";
  intro.setAttribute("aria-hidden", "true");
  document.body.appendChild(intro);
  document.body.classList.add("intro-running");
  initCinematicIntro.played = true;

  window.setTimeout(() => intro.classList.add("is-opening"), 40);
  window.setTimeout(() => {
    document.body.classList.remove("intro-running");
    intro.remove();
  }, 360);
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

    const activeId = active?.id || "hero";
    const sceneTints = {
      hero: "61, 90, 254",
      about: "35, 129, 255",
      projects: "123, 97, 255",
      testimonials: "244, 183, 204",
      contact: "123, 97, 255"
    };
    document.body.dataset.scene = activeId;
    document.documentElement.style.setProperty("--ambient-rgb", sceneTints[activeId] || sceneTints.hero);
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

  const particleCount = 150;
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
  let activeParticleCount = particleCount;
  let perfStage = 0;
  let fpsWindowStart = 0;
  let fpsFrames = 0;
  let animationFrame = null;
  let allowPointerParallax = true;
  let lowPerformance = false;

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPerformance ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };

  const getScrollProgress = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(1, window.scrollY / maxScroll));
  };

  const reduceSceneLoad = () => {
    perfStage += 1;

    if (perfStage === 1) {
      activeParticleCount = Math.max(60, Math.floor(particleCount / 2));
      particleGeometry.setDrawRange(0, activeParticleCount);
      particleMaterial.opacity = 0.42;
      return;
    }

    if (perfStage === 2) {
      allowPointerParallax = false;
      return;
    }

    lowPerformance = true;
    document.body.classList.add("low-performance");
    particleMaterial.opacity = 0.32;
    objectGroup.visible = false;
    resize();
  };

  const watchFrameRate = (time) => {
    if (!fpsWindowStart) fpsWindowStart = time;
    fpsFrames += 1;
    const elapsed = time - fpsWindowStart;

    if (elapsed < 2000) return;

    const fps = (fpsFrames * 1000) / elapsed;
    if (fps < 40 && perfStage < 3) reduceSceneLoad();
    fpsWindowStart = time;
    fpsFrames = 0;
  };

  const render = (time) => {
    if (document.visibilityState === "hidden") {
      animationFrame = null;
      return;
    }

    const delta = time - (render.lastTime || time);
    render.lastTime = time;
    if (delta > 0) watchFrameRate(time);

    const progress = getScrollProgress();
    const raw = progress * (scenes.length - 1);
    const index = Math.min(scenes.length - 2, Math.floor(raw));
    const t = raw - index;
    const from = scenes[index];
    const to = scenes[index + 1];
    const color = from.color.clone().lerp(to.color, t);
    const breath = Math.sin(time / 8000) * 0.025;

    camera.position.copy(from.position).lerp(to.position, t);
    camera.position.x += breath + (allowPointerParallax ? pointer.x * 0.08 : 0);
    camera.position.y += breath * 0.55 + (allowPointerParallax ? pointer.y * 0.05 : 0);
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
    animationFrame = requestAnimationFrame(render);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
    },
    { passive: true }
  );

  const startRenderLoop = () => {
    if (animationFrame || document.visibilityState === "hidden") return;
    render.lastTime = performance.now();
    fpsWindowStart = 0;
    fpsFrames = 0;
    animationFrame = requestAnimationFrame(render);
  };

  const stopRenderLoop = () => {
    if (!animationFrame) return;
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  resize();
  startRenderLoop();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopRenderLoop();
    } else {
      startRenderLoop();
    }
  });
  window.addEventListener("beforeunload", stopRenderLoop);
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
  let perfStage = 0;
  let fpsWindowStart = 0;
  let fpsFrames = 0;
  let allowPointerParallax = true;
  let lowPerformance = false;
  let pointer = { x: 0, y: 0, active: false };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, lowPerformance ? 1 : 1.5);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const particleLimit = perfStage >= 1 ? 70 : 150;
    const particleCount = Math.max(36, Math.min(particleLimit, Math.floor(width / (perfStage >= 1 ? 20 : 10))));
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
        x: lerp(from.camera.x, to.camera.x, t) + breath + (allowPointerParallax && pointer.active ? (pointer.x / width - 0.5) * 0.06 : 0),
        y: lerp(from.camera.y, to.camera.y, t) + breath * 0.65 + (allowPointerParallax && pointer.active ? (pointer.y / height - 0.5) * 0.04 : 0),
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
      context.arc(particle.x + (allowPointerParallax && pointer.active ? (pointer.x / width - 0.5) * -14 : 0), particle.y, size, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  };

  const reduceCanvasLoad = () => {
    perfStage += 1;

    if (perfStage === 1) {
      resize();
      return;
    }

    if (perfStage === 2) {
      allowPointerParallax = false;
      return;
    }

    lowPerformance = true;
    document.body.classList.add("low-performance");
    resize();
  };

  const watchFrameRate = (time) => {
    if (!fpsWindowStart) fpsWindowStart = time;
    fpsFrames += 1;
    const elapsed = time - fpsWindowStart;

    if (elapsed < 2000) return;

    const fps = (fpsFrames * 1000) / elapsed;
    if (fps < 40 && perfStage < 3) reduceCanvasLoad();
    fpsWindowStart = time;
    fpsFrames = 0;
  };

  const draw = (time) => {
    if (document.visibilityState === "hidden") {
      animationFrame = null;
      return;
    }

    const delta = time - (draw.lastTime || time);
    draw.lastTime = time;
    if (delta > 0) watchFrameRate(time);

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
  const startDrawLoop = () => {
    if (animationFrame || document.visibilityState === "hidden") return;
    draw.lastTime = performance.now();
    fpsWindowStart = 0;
    fpsFrames = 0;
    animationFrame = requestAnimationFrame(draw);
  };

  const stopDrawLoop = () => {
    if (!animationFrame) return;
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  startDrawLoop();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopDrawLoop();
    } else {
      startDrawLoop();
    }
  });
  window.addEventListener("beforeunload", stopDrawLoop);
}

function initCinematicInteractions() {
  if (shouldSkipFineMotion()) return;

  $$("[data-project-card], .category-card").forEach((card) => {
    let frame = null;
    const maxTilt = card.classList.contains("category-card") ? 5 : 6;

    const move = (event) => {
      if (document.body.classList.contains("low-performance") || document.body.classList.contains("modal-open")) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      window.cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.transform = `perspective(1200px) rotateX(${((0.5 - y) * maxTilt * 2).toFixed(2)}deg) rotateY(${((x - 0.5) * maxTilt * 2).toFixed(2)}deg) translateZ(8px)`;
      });
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", () => {
      window.cancelAnimationFrame(frame);
      card.style.removeProperty("transform");
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });
}

function initAmbientParallax() {
  if (initAmbientParallax.initialized) return;
  if (shouldSkipFineMotion()) return;

  const layers = [
    [".neural-canvas", 0.3],
    [".mesh-wash", 0.45],
    [".cinematic-canvas", 0.35],
    [".category-card .category-art", 0.55],
    [".category-card .card-particles", 0.95]
  ];
  const parallaxItems = [];

  layers.forEach(([selector, depth]) => {
    $$(selector).forEach((element) => {
      element.dataset.parallaxDepth = String(depth);
      parallaxItems.push(element);
    });
  });

  if (!parallaxItems.length) return;
  initAmbientParallax.initialized = true;

  let frame = null;
  let pointer = { x: 0, y: 0 };

  document.addEventListener("pointermove", (event) => {
    pointer = {
      x: (event.clientX / window.innerWidth - 0.5) * 2,
      y: (event.clientY / window.innerHeight - 0.5) * 2
    };

    if (frame) return;
    frame = requestAnimationFrame(() => {
      parallaxItems.forEach((element) => {
        const depth = Number.parseFloat(element.dataset.parallaxDepth) || 1;
        element.style.transform = `translate(${(pointer.x * depth * 15).toFixed(2)}px, ${(pointer.y * depth * 15).toFixed(2)}px)`;
      });
      frame = null;
    });
  }, { passive: true });
}

function initMagneticButtons() {
  if (shouldSkipFineMotion()) return;

  $$(".hero-pill-actions .button, .category-card .button").forEach((button) => {
    let frame = null;
    let point = { x: 0, y: 0 };

    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      point = {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2
      };

      if (frame) return;
      frame = requestAnimationFrame(() => {
        button.style.transform = `translate(${(point.x * 0.15).toFixed(2)}px, ${(point.y * 0.15 - 3).toFixed(2)}px) scale(1.02)`;
        frame = null;
      });
    });

    button.addEventListener("pointerleave", () => {
      window.cancelAnimationFrame(frame);
      frame = null;
      button.style.removeProperty("transform");
    });
  });
}

function initMarqueeDepth() {
  if (prefersReducedMotion) return;

  const cards = $$(".quote-card");
  if (!cards.length) return;

  let frame = null;
  const update = () => {
    const center = window.innerWidth / 2;
    const falloff = Math.max(320, window.innerWidth * 0.46);

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.min(1, Math.abs(cardCenter - center) / falloff);
      const scale = 1 - distance * 0.08;
      const opacity = 1 - distance * 0.4;
      card.style.setProperty("--marquee-scale", scale.toFixed(3));
      card.style.setProperty("--marquee-opacity", opacity.toFixed(3));
    });

    frame = requestAnimationFrame(update);
  };

  const start = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const stop = () => {
    window.cancelAnimationFrame(frame);
    frame = null;
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stop();
    else start();
  });
  start();
}

function initButtonRipples() {
  if (prefersReducedMotion) return;

  const targets = $$("a.button, button.button, .mini-button, .nav-action, .nav-cta, .tab-button, .back-link, .breadcrumb-link, .back-top, .submit-button, .modal-action-button, .continue-card, .nav-link, .mobile-menu nav a, .menu-socials a, .contact-socials a");
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
  let navResizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(navResizeTimer);
    navResizeTimer = window.setTimeout(() => requestAnimationFrame(() => setNavHeightVar(true)), 150);
  });
  window.addEventListener("load", () => {
    requestAnimationFrame(() => setNavHeightVar(true));
    correctInitialHashOffset();
  });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      setNavHeightVar(true);
      correctInitialHashOffset();
    });
  }

  initCinematicIntro();
  initHeroEntrance();
  const startCinematicCanvas = () => {
    initCinematicCanvas();
    initAmbientParallax();
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(startCinematicCanvas, { timeout: 800 });
  } else {
    window.setTimeout(startCinematicCanvas, 120);
  }
  initPageTransitions();
  initSmoothAnchors();
  initMobileMenu();
  initAutoHideNav();
  initActiveMenuLinks();
  initHeadingWordReveals();
  initRevealAnimations();
  initSceneDirector();
  initProjectTabs();
  initProjectModal();
  initAboutModal();
  initContactForm();
  initStatCounters();
  initPhotoTilt();
  initCustomCursor();
  initNeuralCanvas();
  initCinematicInteractions();
  initMagneticButtons();
  initMarqueeDepth();
  initButtonRipples();
  requestAnimationFrame(correctInitialHashOffset);
});
