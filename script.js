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

/*
  Project image pipeline: keep raster assets flat in /images/ with a
  project-prefixed filename. Every raster image requires a WebP source,
  a PNG/JPG fallback, and real width/height attributes. Reuse an image only
  when the repeated placement has a deliberate narrative purpose.
*/

const PROJECTS = {
  piano: {
    category: "software",
    title: "Alien Piano Tiles",
    image: "images/project-piano-tiles.svg",
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: "Illustrated Alien Piano Tiles rhythm game scene",
    modalVariant: "pianoCaseStudy",
    video: "assets/videos/piano-tiles-gameplay.mp4",
    poster: "images/piano-tiles-poster.svg",
    description: "Solo project – Designed and built the game logic, Canvas rendering, scoring system, keyboard controls, and difficulty progression.",
    problem: "Build a fast-paced, timing-based reactive game to practise real-time input handling, collision detection, and game-state/score management in the browser.",
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
    category: "software",
    title: "Erebus-7: First Skin",
    image: "images/project-erebus-7.webp",
    imageWidth: 1024,
    imageHeight: 1536,
    imageAlt: "Erebus-7 First Skin horror corridor gameplay artwork",
    modalVariant: "erebusCaseStudy",
    video: "assets/videos/erebus-7-gameplay.mp4",
    poster: "images/erebus-7-poster.svg",
    description: "Solo project – Built the detection system, difficulty scaling, resource logic, story progression, and interactive gameplay flow.",
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
    gallery: ["images/project-erebus-7.webp"]
  },
  mcfast: {
    category: "software",
    title: "McFast Ordering System",
    image: "images/project-mcfast-ordering.svg",
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: "McFast Ordering System fast-food ordering app interface graphic",
    modalVariant: "mcfastCaseStudy",
    video: "videos/mcfast-demo.mp4",
    poster: "images/project-mcfast-ordering.svg",
    description: "A Streamlit-based fast-food ordering app that allows users to browse menu categories, add items to a cart, update or remove items, apply discounts, calculate 9% GST, and generate a final receipt. This project demonstrates Python application logic, cart management, calculation flow, and browser-based app deployment.",
    tags: ["Python", "Streamlit", "Cart System", "Session State", "Discount Logic", "GST Calculation", "Receipt Generation", "Testing"],
    github: "https://github.com/gohziqian1234-cmyk/mcfast_app",
    streamlitUrl: "https://gohziqian1234-cmyk-mcfast-app-app-hrwj7l.streamlit.app/",
    gallery: ["images/project-mcfast-ordering.svg"]
  },
  ecowaste: {
    category: "software",
    title: "EcoWaste — Singapore Waste & Recycling Data Analysis",
    image: "images/ecowaste/return-and-save-scheme-infographic.png",
    imageWidth: 881,
    imageHeight: 499,
    imageAlt: "Return & Save Takeaway Scheme infographic showing the pay-deposit, use, return and refund cycle",
    modalVariant: "ecowasteCaseStudy",
    reportUrl: "assets/EcoWaste-Report-A4.pdf",
    presentationUrl: "assets/EcoWaste-Presentation.pdf",
    dashboardUrl: "assets/EcoWaste-PowerBI-Dashboard-ZiQian.pbix",
    description: "Group data-analytics project investigating Singapore’s waste generation and recycling trends. Built the OECD international benchmarking dashboard and developed the Return & Save policy recommendation.",
    tags: ["Python", "Power BI", "Data Cleaning", "Data Visualisation", "Forecasting", "Policy Benchmarking"],
    github: "",
    gallery: ["images/ecowaste/return-and-save-scheme-infographic.png"]
  },
  wheelchair: {
    category: "hardware",
    title: "Motor-Assisted Wheelchair Support Prototype",
    image: "images/project-smart-wheelchair.svg",
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: "Motor-Assisted Wheelchair Support Prototype wireframe thumbnail",
    modalVariant: "wheelchairCaseStudy",
    slidesUrl: "assets/reports/wheelchair-prototype-slides.pdf",
    tinkercadUrl: "https://www.tinkercad.com/things/3lyqhQ6I2kl-terrific-wolt-kup/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard%2Fdesigns%2Fall&sharecode=3Qn25QWAI689o87zddpgFPoEakVv2-UABNXr-nJq8bE",
    demoUrl: "assets/videos/wheelchair-prototype-demo.mp4",
    demoPoster: "images/wheelchair-demo-poster.jpg",
    pitchUrl: "assets/videos/wheelchair-pitch.mp4",
    pitchPoster: "images/wheelchair-pitch-poster.jpg",
    description: "An assistive hardware prototype designed to support self-propelled wheelchair users on slopes using motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control.",
    tags: ["Arduino", "DC Motor", "Ultrasonic Sensor", "Potentiometer", "Buzzer", "Tinkercad"],
    github: "",
    gallery: ["images/project-smart-wheelchair.svg"]
  },
  greenhouse: {
    category: "hardware",
    title: "IoT-Based Smart Plant Monitoring System",
    image: "images/project-smart-greenhouse.svg",
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: "IoT-Based Smart Plant Monitoring System technical diagram",
    modalVariant: "plantCaseStudy",
    reportUrl: "assets/reports/iot-smart-plant-monitoring-report.pdf",
    demoUrl: "assets/videos/iot-smart-plant-monitoring-demo.mp4",
    demoPoster: "images/iot-plant-monitoring-demo-poster.jpg",
    diagram: "images/iot-system-architecture.svg",
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
    category: "hardware",
    title: "Multifunctional 3D-Printed Keychain",
    image: "images/project-keychain-photo.webp",
    imageWidth: 900,
    imageHeight: 1200,
    imageAlt: "Multifunctional 3D-printed keychain with ruler, bottle opener, phone stand, and cable holder features",
    modalVariant: "keychainCaseStudy",
    keychainUrl: "images/project-keychain-photo.png",
    inventorUrl: "assets/cad/multifunctional-keychain-autodesk-inventor.ipt",
    reportUrl: "assets/reports/keychain-design-report.pdf",
    description: "A compact 3D-printed keychain designed with multiple daily-use functions, including a mini ruler, bottle-opener-style cut-out, phone stand, cable holder, bookmark clip, keyring hole, and magnet recess. This project focused on CAD modelling, 3D printing, product usability, and improving the design through print testing and refinement.",
    tags: ["Autodesk Inventor", "CAD Design", "3D Printing", "Product Design", "Prototyping", "Design Iteration"],
    github: "",
    gallery: ["images/project-keychain-photo.webp"]
  },
  construction: {
    category: "hardware",
    title: "Construction Safety Fall-Risk Detection System",
    image: "images/project-construction-safety.svg",
    imageWidth: 960,
    imageHeight: 600,
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

const PROJECT_ORDER = Object.keys(PROJECTS);

const ABOUT_DETAILS = {
  takashimaya: {
    title: "Part-Time Sales Advisor — Christofle, Takashimaya",
    sections: [
      {
        title: "The Role",
        paragraphs: [
          "I work as a part-time Sales Advisor at Christofle in Takashimaya during holidays and non-exam periods. Christofle is a luxury silverware brand, so the role requires professionalism, product knowledge, attention to detail, and the ability to communicate clearly with different types of customers."
        ],
        figure: {
          file: "work-takashimaya", extension: "jpg", width: 663, height: 595,
          alt: "Zi Qian working as a Sales Advisor at Takashimaya",
          caption: "At work — Takashimaya"
        }
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
    title: "Peer Tutor — Nanyang Polytechnic",
    meta: [
      { label: "Role", value: "Peer Tutor" },
      { label: "Duration", value: "2025 – Present" }
    ],
    sections: [
      {
        title: "My Role",
        paragraphs: [
          "I’ve been tutoring Year 1 students online since 2025, almost entirely through chat. When someone gets stuck on a topic, I explain the concept myself first, then follow up with a short sequence of curated video resources so they have something to revisit afterwards."
        ]
      },
      {
        title: "How a Session Works",
        paragraphs: [
          "When a Year 1 student got stuck on trigonometry, I didn’t just send one video — I built a short learning path: a basic introduction to trigonometry, then trigonometric identities, then double angle identities and formulas, and finally worked examples on solving trigonometric equations using those identities. Each one builds on the last, so they could work through it at their own pace."
        ]
      },
      {
        title: "Why I Tutor This Way",
        paragraphs: [
          "Explaining something once often isn’t enough. Sending resources afterwards means they can re-learn a step they missed without having to ask again."
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
        ],
        figure: {
          file: "volunteer-citizenship", extension: "jpg", width: 1400, height: 788,
          alt: "Volunteering at the Singapore Citizenship Ceremony, Cheng San Community Club, April 2026",
          caption: "Citizenship Ceremony — Cheng San CC"
        }
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
        ],
        figure: {
          file: "volunteer-cny", extension: "jpg", width: 1400, height: 1050,
          alt: "CNY goodie bag packing for AWWA Elderly Centre, 2022",
          caption: "CNY volunteering — AWWA Elderly Centre"
        }
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
        ],
        figure: {
          file: "volunteer-community-heart", extension: "jpg", width: 1200, height: 1400, modifier: "is-portrait",
          alt: "Community@Heart volunteering activity making mosquito repellent for the community, 2022",
          caption: "Community@Heart volunteering"
        }
      }
    ]
  },
  "running-club": {
    eyebrow: "VOLUNTEER WORK",
    title: "Running Club Volunteer — Cheng San Sunrise Sprint",
    meta: [
      { label: "Organisation", value: "Cheng San Sunrise Sprint" },
      { label: "Role", value: "Volunteer" },
      { label: "Meeting point", value: "Cheng San CC (Community Club)" },
      { label: "Duration", value: "2026 – Present" }
    ],
    sections: [
      {
        title: "My Role",
        paragraphs: [
          "I volunteer with Cheng San CC’s running group — recently renamed Cheng San Sunrise Sprint — helping the Saturday sessions run safely and smoothly. My responsibilities include marshalling the route, monitoring participants’ safety during the run, and running alongside them to keep them company and support them through the session."
        ]
      },
      {
        title: "What This Involves",
        bullets: [
          "Marshalling the running route to guide participants",
          "Monitoring participant safety throughout the session",
          "Running alongside participants for support and encouragement",
          "Supporting a weekly Saturday community running session"
        ],
        gallery: [
          {
            file: "running-club-event-gathering", width: 1600, height: 900,
            alt: "Runners and walkers gathering at a void deck before a Saturday running club session",
            caption: "Participants gathering before a Saturday session."
          },
          {
            file: "running-club-group-selfie", width: 1600, height: 1200,
            alt: "Group selfie with running club participants after a Saturday session",
            caption: "With other participants after a session."
          }
        ],
        galleryLabel: "Running club session photos"
      },
      {
        title: "Route Check",
        video: {
          src: "videos/running-club.mp4",
          poster: "images/running-club-video-poster.jpg",
          caption: "Route check ahead of a weekly Saturday session, 27 June 2026."
        }
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
        ],
        gallery: [
          {
            file: "cca-infocomm-workshop-session", width: 1600, height: 1200,
            alt: "Infocomm Media Club members seated with laptops during a design-thinking workshop, with facilitators presenting an Ideate slide at the front of the classroom",
            caption: "Design-thinking workshop session run with external facilitators."
          },
          {
            file: "cca-infocomm-group-certificates", width: 1600, height: 1200,
            alt: "Infocomm Media Club members gathered for a group photo holding their completion certificates",
            caption: "Members with completion certificates at the end of the programme."
          },
          {
            file: "cca-infocomm-camera-gear", width: 899, height: 1600, modifier: "is-portrait",
            alt: "Two Canon DSLR cameras with zoom lenses and neck straps laid out beside a laptop at a school event",
            caption: "DSLR gear used for photo and video coverage at school events."
          }
        ],
        galleryLabel: "Infocomm Media Club activity photos"
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

/*
  Background scroll lock for overlays (project modal, about modal, certificate
  lightbox, mobile menu).

  `body { overflow: hidden }` alone does not work on this site: the CSS
  overflow spec only propagates the body's overflow to the viewport when the
  root element's own overflow is `visible`, and `html` here sets
  `overflow-x: clip` for horizontal-overflow protection. That makes `html` the
  scroll container, so the page kept scrolling behind every overlay.

  Pinning the body with `position: fixed` at a negative offset locks the
  viewport regardless of which element scrolls, and also works on iOS Safari,
  where `overflow: hidden` is unreliable.

  Keyed by owner rather than counted, because some overlays re-run their open
  path while already open (the project modal does this for prev/next
  navigation). A plain counter would accumulate locks that never unwind and
  leave the page permanently frozen.
*/
const scrollLock = (() => {
  const owners = new Set();
  let savedY = 0;
  let savedPaddingRight = "";

  return {
    lock(owner) {
      if (owners.has(owner)) return;
      owners.add(owner);
      if (owners.size > 1) return;
      savedY = window.scrollY || document.documentElement.scrollTop || 0;
      // Compensate for the scrollbar disappearing so the page does not shift.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      savedPaddingRight = document.body.style.paddingRight;
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.top = `-${savedY}px`;
      document.body.classList.add("scroll-locked");
    },
    unlock(owner) {
      if (!owners.delete(owner) || owners.size > 0) return;
      const root = document.documentElement;
      // html has scroll-behavior: smooth, which would animate the restore.
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";
      document.body.style.paddingRight = savedPaddingRight;
      window.scrollTo(0, savedY);
      root.style.scrollBehavior = previousBehavior;
    }
  };
})();

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
  if (open) scrollLock.lock("mobile-menu");
  else scrollLock.unlock("mobile-menu");
  if (open) navbar?.classList.remove("nav-hidden", "nav-revealed-by-mouse");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.setAttribute("aria-hidden", String(!open));
  menu.toggleAttribute("inert", !open);
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

  const handlePointerReveal = (event) => {
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
  };

  document.addEventListener(
    "pointermove",
    handlePointerReveal,
    { passive: true }
  );

  document.addEventListener(
    "mousemove",
    handlePointerReveal,
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
    ".continue-links"
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
  let closeTransitionHandler = null;
  let currentProjectKey = null;
  let touchStartX = null;

  if (!content || !scrollArea) return;

  const getFocusableElements = () => $$([
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "video[controls]",
    "[tabindex]:not([tabindex='-1'])"
  ].join(","), modal).filter((element) => (
    element.getAttribute("aria-hidden") !== "true"
    && !element.hasAttribute("hidden")
    && element.tabIndex >= 0
    && (element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0)
  ));

  const trapFocus = (event) => {
    if (event.key !== "Tab" || !modal.classList.contains("active")) return;
    const focusable = getFocusableElements();
    if (!focusable.length) {
      event.preventDefault();
      content.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  };

  const finishClose = () => {
    window.clearTimeout(closeFallback);
    if (closeTransitionHandler) {
      content.removeEventListener("transitionend", closeTransitionHandler);
      closeTransitionHandler = null;
    }
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "true");
    scrollArea.innerHTML = "";
    document.body.classList.remove("modal-open");
    scrollLock.unlock("project-modal");
    previousFocus?.focus?.({ preventScroll: true });
    $(".navbar")?.classList.remove("nav-hidden", "nav-revealed-by-mouse");
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

    if (closeTransitionHandler) content.removeEventListener("transitionend", closeTransitionHandler);
    closeTransitionHandler = (event) => {
      if (event.target !== content) return;
      finishClose();
    };

    content.addEventListener("transitionend", closeTransitionHandler);
    closeFallback = window.setTimeout(() => {
      finishClose();
    }, 380);
  };

  const openModal = (project, projectKey = getProjectKey(project), opener = null) => {
    if (!modal.classList.contains("active")) previousFocus = opener || document.activeElement;
    window.clearTimeout(closeFallback);
    if (closeTransitionHandler) {
      content.removeEventListener("transitionend", closeTransitionHandler);
      closeTransitionHandler = null;
    }
    currentProjectKey = projectKey;
    clearProjectCardMotion();
    scrollArea.innerHTML = createModalMarkup(project);
    decorateProjectModal(scrollArea, project);
    wireModalGallery(scrollArea);
    wireModalActionRipples(scrollArea);
    wireModalScrollFade(modal);
    wireModalVideoBoost(scrollArea);
    scrollArea.scrollTop = 0;
    updateProjectEdgeNavigation(modal, currentProjectKey);
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    scrollLock.lock("project-modal");
    requestAnimationFrame(() => {
      modal.classList.add("active");
      $(".modal-close", modal)?.focus();
    });
  };

  $$("[data-open-project]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const nestedControl = event.target.closest("a, button");
      if (nestedControl && nestedControl !== trigger) return;
      const projectKey = trigger.dataset.openProject;
      const project = PROJECTS[projectKey];
      if (project) openModal(project, projectKey, trigger);
    });

    if (trigger.matches('[role="button"]')) {
      trigger.addEventListener("keydown", (event) => {
        if (event.target.closest("a, button")) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const projectKey = trigger.dataset.openProject;
        const project = PROJECTS[projectKey];
        if (project) openModal(project, projectKey, trigger);
      });
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeModal();

    const projectNav = event.target.closest("[data-project-nav]");
    if (projectNav) {
      const projectKey = projectNav.dataset.projectNav;
      const project = PROJECTS[projectKey];
      if (project) openModal(project, projectKey);
    }
  });

  $("[data-project-prev]", modal)?.addEventListener("click", () => {
    const projectKey = getAdjacentProjectKey(currentProjectKey, -1);
    if (projectKey) openModal(PROJECTS[projectKey], projectKey);
  });

  $("[data-project-next]", modal)?.addEventListener("click", () => {
    const projectKey = getAdjacentProjectKey(currentProjectKey, 1);
    if (projectKey) openModal(PROJECTS[projectKey], projectKey);
  });

  if (!finePointer && !prefersReducedMotion) {
    content.addEventListener("touchstart", (event) => {
      if (event.target.closest("a, button, video")) return;
      touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });

    content.addEventListener("touchend", (event) => {
      if (touchStartX === null || event.target.closest("a, button, video")) return;
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const distance = touchEndX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 70) return;
      const projectKey = getAdjacentProjectKey(currentProjectKey, distance < 0 ? 1 : -1);
      if (projectKey) openModal(PROJECTS[projectKey], projectKey);
    }, { passive: true });
  }

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    trapFocus(event);
  });
}

function initAboutModal() {
  const modal = $("#about-modal");
  if (!modal) return;

  const content = $(".modal-content", modal);
  const scrollArea = $(".modal-scroll-area", modal);
  let previousFocus = null;
  let closeFallback = null;
  let closeTransitionHandler = null;

  if (!content || !scrollArea) return;

  const finishClose = () => {
    window.clearTimeout(closeFallback);
    if (closeTransitionHandler) {
      content.removeEventListener("transitionend", closeTransitionHandler);
      closeTransitionHandler = null;
    }
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "true");
    scrollArea.innerHTML = "";
    document.body.classList.remove("modal-open");
    scrollLock.unlock("about-modal");
    previousFocus?.focus?.({ preventScroll: true });
    $(".navbar")?.classList.remove("nav-hidden", "nav-revealed-by-mouse");
  };

  const closeModal = () => {
    if (!modal.classList.contains("active")) return;
    modal.classList.remove("active");
    modal.classList.add("is-closing");

    if (prefersReducedMotion) {
      finishClose();
      return;
    }

    if (closeTransitionHandler) content.removeEventListener("transitionend", closeTransitionHandler);
    closeTransitionHandler = (event) => {
      if (event.target !== content) return;
      finishClose();
    };

    content.addEventListener("transitionend", closeTransitionHandler);
    closeFallback = window.setTimeout(() => {
      finishClose();
    }, 380);
  };

  const openModal = (detail) => {
    previousFocus = document.activeElement;
    window.clearTimeout(closeFallback);
    if (closeTransitionHandler) {
      content.removeEventListener("transitionend", closeTransitionHandler);
      closeTransitionHandler = null;
    }
    scrollArea.innerHTML = createAboutModalMarkup(detail);
    wireModalActionRipples(scrollArea);
    wireModalScrollFade(modal);
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    scrollLock.lock("about-modal");
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

function initImageLightbox() {
  // One lightbox powers every zoomable image on the site. Triggers are matched
  // by delegation so images rendered later (inside project/about modals) work
  // without rebinding.
  const TRIGGER_SELECTOR = "[data-lightbox], [data-certificate-lightbox], .modal-case-image-link";
  const MAX_SCALE = 6;

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image preview");
  lightbox.innerHTML = `
    <button class="image-lightbox-backdrop" type="button" data-close-lightbox aria-label="Close image preview"></button>
    <div class="image-lightbox-stage" data-lightbox-stage>
      <img class="image-lightbox-image" src="" alt="" data-lightbox-image draggable="false">
    </div>
    <div class="image-lightbox-toolbar" role="group" aria-label="Image zoom controls">
      <button class="image-lightbox-tool" type="button" data-lightbox-zoom="-1" aria-label="Zoom out">&minus;</button>
      <button class="image-lightbox-tool image-lightbox-reset" type="button" data-lightbox-reset>Reset</button>
      <button class="image-lightbox-tool" type="button" data-lightbox-zoom="1" aria-label="Zoom in">+</button>
    </div>
    <button class="image-lightbox-close" type="button" data-close-lightbox aria-label="Close image preview">&times;</button>
    <p class="image-lightbox-hint" data-lightbox-hint></p>
  `;
  document.body.appendChild(lightbox);

  const stage = $("[data-lightbox-stage]", lightbox);
  const image = $("[data-lightbox-image]", lightbox);
  const hint = $("[data-lightbox-hint]", lightbox);
  const closeButton = $(".image-lightbox-close", lightbox);
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  hint.textContent = coarsePointer
    ? "Pinch to zoom · drag to pan · double-tap to reset"
    : "Scroll to zoom · drag to pan · double-click to reset";

  let previousFocus = null;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let frame = null;
  const pointers = new Map();
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragMoved = false;

  const render = () => {
    frame = null;
    image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    lightbox.classList.toggle("is-zoomed", scale > 1.001);
  };

  const scheduleRender = () => {
    if (frame === null) frame = window.requestAnimationFrame(render);
  };

  // Keep at least part of the image on screen: panning is capped at the amount
  // of the scaled image that actually overflows its fit-to-screen box.
  const clampTranslation = () => {
    const rect = image.getBoundingClientRect();
    const baseWidth = rect.width / scale;
    const baseHeight = rect.height / scale;
    const maxX = Math.max(0, (baseWidth * scale - baseWidth) / 2);
    const maxY = Math.max(0, (baseHeight * scale - baseHeight) / 2);
    translateX = Math.min(maxX, Math.max(-maxX, translateX));
    translateY = Math.min(maxY, Math.max(-maxY, translateY));
  };

  const resetView = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    scheduleRender();
  };

  // Zoom around a viewport point so the pixel under the cursor stays put.
  const zoomTo = (nextScale, originX, originY) => {
    const clamped = Math.min(MAX_SCALE, Math.max(1, nextScale));
    if (clamped === scale) return;
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pointX = (originX - centerX) / scale;
    const pointY = (originY - centerY) / scale;
    translateX += pointX * (scale - clamped);
    translateY += pointY * (scale - clamped);
    scale = clamped;
    clampTranslation();
    scheduleRender();
  };

  const closeLightbox = () => {
    if (!lightbox.classList.contains("active")) return;
    lightbox.classList.remove("active", "is-zoomed", "is-dragging");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    scrollLock.unlock("image-lightbox");
    pointers.clear();
    dragPointerId = null;
    resetView();
    image.removeAttribute("src");
    previousFocus?.focus?.({ preventScroll: true });
  };

  const openLightbox = (source, alt, trigger) => {
    previousFocus = trigger || null;
    resetView();
    render();
    image.src = source;
    image.alt = alt || "";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    scrollLock.lock("image-lightbox");
    closeButton?.focus({ preventScroll: true });
  };

  // Full-size source for a trigger: an anchor points at it, a bare image uses
  // whatever the browser actually picked (so <picture>/webp is respected).
  const resolveTrigger = (trigger) => {
    if (trigger.tagName === "A" && trigger.getAttribute("href")) {
      const thumbnail = $("img", trigger);
      return { source: trigger.href, alt: thumbnail?.alt || trigger.getAttribute("aria-label") || "" };
    }
    if (trigger.tagName === "IMG") {
      return { source: trigger.currentSrc || trigger.src, alt: trigger.alt || "" };
    }
    const nested = $("img", trigger);
    return nested ? { source: nested.currentSrc || nested.src, alt: nested.alt || "" } : null;
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(TRIGGER_SELECTOR);
    if (!trigger || lightbox.contains(trigger)) return;
    const media = resolveTrigger(trigger);
    if (!media?.source) return;
    event.preventDefault();
    openLightbox(media.source, media.alt, trigger);
  });


  lightbox.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-lightbox]")) {
      if (dragMoved) return;
      closeLightbox();
      return;
    }
    const zoomButton = event.target.closest("[data-lightbox-zoom]");
    if (zoomButton) {
      const direction = Number(zoomButton.dataset.lightboxZoom);
      const rect = stage.getBoundingClientRect();
      zoomTo(scale * (direction > 0 ? 1.4 : 1 / 1.4), rect.left + rect.width / 2, rect.top + rect.height / 2);
      return;
    }
    if (event.target.closest("[data-lightbox-reset]")) {
      resetView();
      return;
    }
    // Tapping the empty area around a fit-to-screen image closes, matching the
    // backdrop. While zoomed that area is pannable, so it must not close.
    if (event.target === stage && scale <= 1.001 && !dragMoved) closeLightbox();
  });

  stage.addEventListener("wheel", (event) => {
    if (!lightbox.classList.contains("active")) return;
    event.preventDefault();
    zoomTo(scale * Math.exp(-event.deltaY * 0.002), event.clientX, event.clientY);
  }, { passive: false });

  stage.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (scale > 1.001) resetView();
    else zoomTo(2.5, event.clientX, event.clientY);
  });

  stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-lightbox-zoom], [data-lightbox-reset], .image-lightbox-close")) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStartDistance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      pinchStartScale = scale;
      dragPointerId = null;
      return;
    }

    if (pointers.size === 1) {
      dragMoved = false;
      dragPointerId = event.pointerId;
      dragStartX = event.clientX - translateX;
      dragStartY = event.clientY - translateY;
      stage.setPointerCapture?.(event.pointerId);
      if (scale > 1.001) lightbox.classList.add("is-dragging");
    }
  });

  stage.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      dragMoved = true;
      zoomTo(pinchStartScale * (distance / pinchStartDistance), (a.x + b.x) / 2, (a.y + b.y) / 2);
      return;
    }

    if (event.pointerId !== dragPointerId || scale <= 1.001) return;
    event.preventDefault();
    translateX = event.clientX - dragStartX;
    translateY = event.clientY - dragStartY;
    if (Math.abs(translateX) + Math.abs(translateY) > 4) dragMoved = true;
    clampTranslation();
    scheduleRender();
  });

  const endPointer = (event) => {
    pointers.delete(event.pointerId);
    if (event.pointerId === dragPointerId) {
      dragPointerId = null;
      stage.releasePointerCapture?.(event.pointerId);
    }
    if (pointers.size < 2) pinchStartDistance = 0;
    lightbox.classList.remove("is-dragging");
    // Let the click handler above see the drag, then clear it.
    window.setTimeout(() => { dragMoved = false; }, 0);
  };
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  // Capture phase: while the lightbox is open its keys must win over the
  // project/about modal handlers listening on the same node, so Escape closes
  // only the lightbox and leaves the modal underneath open.
  document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("active")) {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        closeLightbox();
      }
      if (event.key === "0") resetView();
      return;
    }
    // Bare images are not focusable on their own, so give keyboard users the
    // same entry point the pointer has.
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest?.("img[data-lightbox]");
    if (!trigger) return;
    const media = resolveTrigger(trigger);
    if (!media?.source) return;
    event.preventDefault();
    openLightbox(media.source, media.alt, trigger);
  }, true);

  window.addEventListener("resize", () => {
    if (lightbox.classList.contains("active")) resetView();
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
      const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const heading = section.title ? `<h3 class="modal-section-heading">${escapeHtml(section.title)}</h3>` : "";
      const bullets = section.bullets?.length
        ? `<ul class="modal-feature-list">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      const figure = section.figure ? createProjectCaseFigure(section.figure) : "";
      const gallery = section.gallery?.length
        ? `
          <div class="modal-case-media-grid is-equal-media is-document-safe" role="group" aria-label="${escapeHtml(section.galleryLabel || "Supporting photos")}">
            ${section.gallery.map((media) => createProjectCaseFigure(media)).join("")}
          </div>
        `
        : "";
      const video = section.video
        ? `
          <div class="modal-media modal-video-frame">
            <video class="modal-video" controls playsinline poster="${escapeHtml(section.video.poster)}" preload="none" data-volume-boost="${MODAL_VIDEO_GAIN}">
              <source src="${escapeHtml(section.video.src)}" type="video/mp4">
              Your browser does not support video playback.
            </video>
          </div>
          ${section.video.caption ? `<p class="modal-media-caption">${escapeHtml(section.video.caption)}</p>` : ""}
        `
        : "";
      return `
        <section class="modal-section modal-case-section">
          ${heading}
          ${paragraphs}
          ${bullets}
          ${figure}
          ${gallery}
          ${video}
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
  if (project.modalVariant === "ecowasteCaseStudy") return createEcowasteModalMarkup(project);
  if (project.modalVariant === "plantCaseStudy") return createPlantCaseStudyMarkup(project);
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
          <img src="${escapeHtml(images[0])}" width="960" height="600" alt="${escapeHtml(project.imageAlt || project.title)}" loading="lazy" data-lightbox data-modal-main-image />
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
  const hitDetectionCode = `function tapLane(lane) {
  if (!game || game.mode !== "running") return;
  const candidates = game.tiles
    .filter(tile => !tile.hit && tile.lane === lane)
    .sort((a, b) => b.y - a.y);
  let selected = null;
  for (const tile of candidates) {
    const top = tile.y;
    const bottom = tile.y + tile.h;
    if (bottom >= hitLineY - 118 && top <= H - 34) {
      selected = tile;
      break;
    }
  }
  if (!selected) {
    wrongTap(lane);
    return;
  }
  selected.hit = true;
  game.combo += 1;
  game.bestCombo = Math.max(game.bestCombo, game.combo);
  game.tilesHit += 1;
  let gain = 100 + game.combo * 7 + game.level * 6;
  if (selected.type === "bonus") gain *= 2;
  game.score += gain;
  updateLevel();
}`;
  const progressionCode = `function spawnTile() {
  let lane = Math.floor(Math.random() * laneCount);
  if (Math.random() < 0.68) {
    while (lane === game.nextLane) lane = Math.floor(Math.random() * laneCount);
  }
  game.nextLane = lane;

  const specialRoll = Math.random();
  let type = "normal";
  if (game.level >= 3 && specialRoll > 0.86) type = "bonus";
  if (game.level >= 5 && specialRoll < 0.11) type = "hazard";

  game.tiles.push({
    lane,
    y: -tileH - 8,
    h: tileH,
    type,
    hit: false,
    glow: Math.random() * Math.PI * 2
  });
}

function updateLevel() {
  const newLevel = Math.min(12, Math.floor(game.tilesHit / 15) + 1);
  if (newLevel === game.level) return;

  game.level = newLevel;
  game.speed = 268 + (game.level - 1) * 37;
  game.spawnEvery = Math.max(0.42, 0.82 - (game.level - 1) * 0.035);
  showMessage(\`LEVEL \${game.level}\`);
  playTone(760, 0.18, "sawtooth", 0.035);
  burst(W / 2, H / 2, 46, "#5eead4");
}`;

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
        <video class="modal-video" controls playsinline poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          <!-- OPTIONAL: <track kind="captions" src="captions.vtt" srclang="en" label="English"> -->
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Nowadays, games are becoming more complex, competitive, and time-consuming. Many people lose the original feeling of playing games for fun &mdash; instead, they start playing mainly to win, which can make them feel more stressed or angry. Hence, I wanted to create a simple browser game that is fun, interesting, and nostalgic. The target users are mainly students, polytechnic students, young adults, and the elderly who want a quick way to relax, reduce stress, and enjoy a short nostalgic game during their break time. Adults can also show their children what games were like when they were young, which can help create a bond between them. The challenge of this project was to make the game slightly challenging but still simple at the same time, so users can understand it immediately and feel motivated to continue playing.</p>
        ${createCaseStudyFigure("assets/piano-start-screen.png", "Alien Piano Tiles start screen with DFJK controls and Start Mission button", "Start screen showing the purple alien theme, DFJK controls, and Start Mission button.", "is-portrait")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built a rhythm game where piano tiles fall into different lanes, and the player needs to press the correct key at the right time. If the player fails to do so, they will lose one life. If the player misses more than two times, they will lose the game. The game includes tile spawning, keyboard input detection, scoring, streak multipliers, lives, pause control, and game-over logic.</p>
        ${createCaseStudyFigure("assets/piano-main-gameplay.png", "Alien Piano Tiles main gameplay with falling tiles and four keyboard lanes", "Main gameplay screen showing falling tiles, lane layout, score, streak, lives, level, and keyboard controls.", "is-portrait")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Simple rhythm gameplay inspired by classic piano tile games</li>
          <li>Alien-themed visual style</li>
          <li>Keyboard controls using the DFJK keys</li>
          <li>Randomised tile spawning across different lanes</li>
          <li>Increasing speed over time</li>
          <li>Scoring system with streak multiplier rewards</li>
          <li>Three-lives system</li>
          <li>Clear visual feedback for hits, misses, score changes, and game states</li>
        </ul>
        ${createCaseStudyFigure("assets/piano-signal-lost.png", "Alien Piano Tiles gameplay showing Signal Lost feedback after a missed tile", "Miss feedback screen showing the \"Signal Lost\" message and lives system when the player fails to hit a tile.", "is-portrait")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technologies Used</h3>
        <p>I used HTML, CSS, vanilla JavaScript, and HTML5 Canvas to build this project. HTML was used to build the basic structure of the game page, such as the game canvas, start page, game-over screen, and scoreboard display. CSS was used to design the appearance of the game &mdash; I used a purple alien theme and CSS to style the game effects, buttons, and layout. JavaScript was used to make the game work: it controls the falling tiles, keyboard and touch input, scoring system, combo system, lives, levels, collision detection, and game-over logic. HTML5 Canvas was used to draw the actual game graphics &mdash; falling tiles, alien effects, lane board, stars, particles, and animations in real time.</p>
        <div class="modal-tech-tags">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">HTML5 Canvas</span>
        </div>
        ${createCodeBlock("javascript", hitDetectionCode, "JavaScript hit-detection logic showing how the game checks the selected lane, detects whether a tile is within the hit window, updates combo, calculates score, handles bonus tiles, and increases difficulty through level updates.")}
        ${createEvidenceComingSoon("Bonus-tile miss screenshot coming soon. The supplied gameplay captures do not show the teal diamond bonus tile clearly enough to label as evidence.")}
        ${createCodeBlock("javascript", progressionCode, "Tile-spawning and difficulty-scaling logic - shows how tiles are randomly assigned to lanes, how bonus and hazard tiles are introduced, and how spawn speed increases as the player levels up.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Challenges &amp; How I Overcame Them</h3>
        <p>One challenge was making the game feel fair as the tiles became faster. If the timing window was too strict, the game felt frustrating. If it was too loose, the game became too easy. To solve this, I adjusted the hit detection window and added clearer visual feedback so players could understand when they hit or missed a tile. Another challenge was managing different game states, such as ready, playing, paused, and game over. To avoid logic errors, I organised the game around a clear state system so that each action only happens when the game is in the correct state.</p>
        ${createCaseStudyFigure("assets/piano-pause-screen.png", "Alien Piano Tiles paused state with Resume and Restart controls", "Pause screen showing the game state system with resume and restart options.", "is-portrait")}
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
        <p>The final result is a simple but engaging rhythm game with increasing difficulty, responsive controls, scoring feedback, and a nostalgic gameplay style. This project helped me understand how real-time interaction, game loops, and user feedback affect the overall player experience.</p>
        ${createCaseStudyMediaGrid([
          { src: "assets/piano-game-over.png", alt: "Alien Piano Tiles Mission Failed screen with run statistics and Try Again button", caption: "Game-over screen shown when the player runs out of lives. Displays the run’s final score alongside personal best, streak, level reached, and miss count, with an immediate Try Again button &ndash; closing the loop from Start Mission to Mission Failed.", modifier: "is-portrait" },
          { src: "assets/piano-mission-failed-summary.png", alt: "Alternate Alien Piano Tiles Mission Failed summary screen", caption: "Alternate Mission Failed summary capture confirming the same score, best-score, tile, streak, level, and miss reporting across the responsive game view.", modifier: "is-portrait" }
        ], "Alien Piano Tiles outcome screens", "is-portrait-pair")}
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

const CASE_STUDY_MEDIA_DIMENSIONS = Object.freeze({
  "images/keychain-report/01_ruler_markings_and_engraving.jpg": [827, 340],
  "images/keychain-report/02_keychain_full_profile.jpg": [1316, 555],
  "images/keychain-report/03_sd_card_as_magnet_simulation.jpg": [1200, 1600],
  "images/keychain-report/04_nametag_clipped_on_shirt.jpg": [1483, 855],
  "images/keychain-report/05_bottle_opener_demo.jpg": [1200, 1600],
  "images/keychain-report/06_seatbelt_cutter_paper_demo.jpg": [1200, 1600],
  "images/keychain-report/07_window_breaker_point_demo.jpg": [1200, 1600],
  "images/keychain-report/08_bookmark_feature_side_view.jpg": [1200, 1600],
  "images/keychain-report/09_bookmark_paper_insert_demo.jpg": [1200, 1600],
  "images/keychain-report/10_phone_stand_demo.jpg": [1600, 1200],
  "images/keychain-report/11_cable_wrap_holder_demo.jpg": [1200, 1600],
  "images/keychain-report/12_print_comparison_first_vs_second.jpg": [1600, 1200],
  "images/keychain-report/13_print_comparison_closeup_detail.jpg": [1200, 1600],
  "assets/erebus-detection-alert.png": [1722, 908],
  "assets/erebus-difficulty-selection.png": [1628, 458],
  "assets/erebus-ending-detected.png": [1135, 702],
  "assets/erebus-instinct-choice.png": [1592, 767],
  "assets/erebus-interaction-infection.png": [1907, 902],
  "assets/erebus-intro-story.png": [1722, 898],
  "assets/erebus-main-hud.png": [1907, 902],
  "assets/erebus-story-scene.png": [1291, 566],
  "assets/erebus-tactical-map.png": [1545, 881],
  "assets/mcfast-cart-management.png": [798, 707],
  "assets/mcfast-discount-dropdown.png": [767, 257],
  "assets/mcfast-empty-cart.png": [840, 300],
  "assets/mcfast-final-receipt.png": [257, 215],
  "assets/mcfast-menu-browsing.png": [1877, 815],
  "assets/piano-game-over.png": [522, 822],
  "assets/piano-main-gameplay.png": [535, 866],
  "assets/piano-mission-failed-summary.png": [510, 870],
  "assets/piano-pause-screen.png": [516, 822],
  "assets/piano-signal-lost.png": [536, 822],
  "assets/piano-start-screen.png": [518, 750]
});

function createCaseStudyFigure(src, alt, caption, modifier = "") {
  const modifierClass = modifier ? ` ${escapeHtml(modifier)}` : "";
  const dimensions = CASE_STUDY_MEDIA_DIMENSIONS[src];
  const dimensionAttributes = dimensions ? ` width="${dimensions[0]}" height="${dimensions[1]}"` : "";
  return `
    <figure class="modal-case-figure${modifierClass}">
      <a class="modal-case-image-link" href="${escapeHtml(src)}" target="_blank" rel="noopener noreferrer" aria-label="Open image: ${escapeHtml(alt)}">
        <img src="${escapeHtml(src)}"${dimensionAttributes} alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
      </a>
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `;
}

function createCaseStudyMediaGrid(items, label, variant = "is-landscape-pair") {
  const variantClass = variant ? ` ${escapeHtml(variant)}` : "";
  return `
    <div class="modal-case-media-grid is-equal-media${variantClass}" role="group" aria-label="${escapeHtml(label)}">
      ${items.map((item) => createCaseStudyFigure(item.src, item.alt, item.caption, item.modifier || "")).join("")}
    </div>
  `;
}

function createEvidenceComingSoon(message) {
  return `<div class="modal-evidence-pending" role="status"><span aria-hidden="true">+</span>${escapeHtml(message)}</div>`;
}

function highlightCode(code, language) {
  const keywords = language === "python"
    ? /^(def|return|for|in|if|else|elif|sum|from|import|True|False|None)$/
    : /^(function|const|let|var|return|for|of|if|else|while|new|true|false|null)$/;
  const tokenPattern = language === "python"
    ? /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:def|return|for|in|if|else|elif|sum|from|import|True|False|None)\b|\b\d+(?:\.\d+)?\b)/g
    : /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\b(?:function|const|let|var|return|for|of|if|else|while|new|true|false|null)\b|\b\d+(?:\.\d+)?\b)/g;
  let highlighted = "";
  let lastIndex = 0;

  for (const match of code.matchAll(tokenPattern)) {
    highlighted += escapeHtml(code.slice(lastIndex, match.index));
    const token = match[0];
    let tokenClass = "code-number";
    if (token.startsWith("//") || token.startsWith("#")) tokenClass = "code-comment";
    else if (token.startsWith('"') || token.startsWith("'")) tokenClass = "code-string";
    else if (keywords.test(token)) tokenClass = "code-keyword";
    highlighted += `<span class="${tokenClass}">${escapeHtml(token)}</span>`;
    lastIndex = match.index + token.length;
  }
  highlighted += escapeHtml(code.slice(lastIndex));
  return highlighted;
}

function createCodeBlock(language, code, caption) {
  return `
    <figure class="modal-code-block" data-language="${escapeHtml(language.toUpperCase())}">
      <pre tabindex="0"><code>${highlightCode(code, language)}</code></pre>
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `;
}

function createErebusModalMarkup(project) {
  const actions = createModalActions(project);
  const roleSection = createRoleSection(
    "Solo Software Project",
    "Game Developer / Narrative Systems Developer",
    "I designed and developed the core gameplay systems, including player progression, detection logic, difficulty scaling, resource management, story flow, and game state control. I also worked on the narrative structure, interaction design, testing, and balancing so that the game felt tense but still fair for the player."
  );
  const inputHandlingCode = `if(k==="v")talk();
if(k==="e")tryInfect();
if(k==="q")hide();
if(k==="f")terror();
if(k==="r")vent();
if(k==="c")commandHosts();
if(k==="z")decoy();
if(k==="b")blindPulse();
if(k==="g")sacrificeHost();
if(k==="t")sabotageTerminal();
if(k==="x")openEvolve();
if(k==="m")openTacticalMap();
if(k==="j")openCodex();
if(k==="escape"||k==="p")openPause();`;

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
        <video class="modal-video" controls playsinline poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          <!-- OPTIONAL: <track kind="captions" src="captions.vtt" srclang="en" label="English"> -->
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Among Us is usually a multiplayer game, but not every player wants to play with random people online. Some players may not have friends available to play with, while others may simply prefer a single-player experience where they can progress alone without depending on other players. This project was intended to redesign an Among Us-style experience into a single-player horror stealth game. Instead of relying on real players, the game focuses on solo gameplay, tasks, decision-making, suspense, and survival. The main challenge was making the game interesting without multiplayer interaction.</p>
        ${createCaseStudyFigure("assets/erebus-intro-story.png", "Erebus-7 clear story brief introducing what happened on the station", "Intro screen showing the dark space-station horror atmosphere and narrative setup for Erebus-7: First Skin - \"Erebus-7 is a research station\" title card with Start Audio / Start Transmission options.")}
        ${createCaseStudyFigure("assets/erebus-story-scene.png", "Erebus-7 tutorial story step explaining the premise", "Narrative story-log scene (\"What Happened on Erebus-7\") showing how mission lore and blackbox logs are presented to the player between gameplay segments.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built a single-player social-horror stealth game called <strong>Erebus-7: First Skin</strong>. In this game, players take on the role of an alien parasite confined within a space station. The player controls a human host and must infect crew members, evade detection, and gradually take control of the station. The main objective is to navigate through different sections of the station and reach SELENE, the station AI. To succeed, players must complete tasks, use infected hosts as allies, avoid guards and surveillance systems, and survive until the final AI Core chapter. The game includes movement mechanics, enemy patrols, detection systems, infection mechanics, clone respawn options, difficulty levels, narrative scenes, sound effects, a tactical map, tutorials, save/load functionality, and multiple chapters.</p>
        ${createCaseStudyFigure("assets/erebus-main-hud.png", "Erebus-7 main gameplay HUD in Crew Quarters", "Main gameplay screen showing the player, station environment, mission objective, detection meter, alert meter, abilities, and HUD elements.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Key Features</h3>
        <ul class="modal-feature-list">
          <li>Single-player horror stealth gameplay</li>
          <li>Story-driven mission flow with narrative scenes and blackbox logs</li>
          <li>Detection bar that increases when guards, cameras, or scanners notice the player</li>
          <li>Easy, Medium, and Hard difficulty modes</li>
          <li>Clone system that lets the player respawn at a planted backup body</li>
          <li>Tactical map showing rooms, people, danger, objectives, and routes</li>
          <li>Different station zones, including Crew Quarters, Med Bay, Security Hub, Command Deck, and AI Core</li>
          <li>Sound design with alarms, footsteps, whispers, scanner sounds, and horror music</li>
          <li>Pause menu, settings, save/load, tutorial, and game-over screens</li>
        </ul>
        ${createCaseStudyFigure("assets/erebus-tactical-map.png", "Erebus-7 tactical map showing Crew Quarters rooms and route information", "Tactical map showing Crew Quarters zone layout - rooms, routes, danger indicators, and mission objectives available for route planning.")}
        ${createCaseStudyMediaGrid([
          { src: "assets/erebus-instinct-choice.png", alt: "Erebus-7 parasite instinct choice screen", caption: "Parasite-instinct choice screen showing how the player’s opening decision changes the first gameplay advantage." },
          { src: "assets/erebus-difficulty-selection.png", alt: "Erebus-7 Easy Medium and Hard difficulty selection", caption: "Difficulty selection showing the Easy, Medium, and Hard modes used to tune detection, resources, and campaign pressure.", modifier: "is-position-left" }
        ], "Erebus-7 player setup screens", "is-ultrawide-pair")}
        ${createCaseStudyFigure("assets/erebus-interaction-infection.png", "Erebus-7 gameplay showing an infection target and interaction controls", "Interaction screen showing how the player communicates with crew members, infects targets, or manages detection risk.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technologies Used</h3>
        <p>I used HTML, CSS, JavaScript, and HTML5 Canvas to develop this project. HTML was used to structure the game page, including the canvas, introduction screen, tutorial, HUD, pause menu, tactical map, story scenes, and game-over screens. CSS was used to design the visual appearance of the game &mdash; I used a dark horror aesthetic with teal, red, green, and blue tones to match the space-station and parasite theme. JavaScript was used to power the game functionality: it manages player movement, enemy AI, detection, infection, abilities, map logic, story progression, sound, save/load features, and game rules. HTML5 Canvas was used to render the actual game environment, including the map, rooms, characters, vision cones, lighting, effects, particles, objectives, and animations in real time.</p>
        <div class="modal-tech-tags">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">HTML5 Canvas</span>
        </div>
        ${createCodeBlock("javascript", inputHandlingCode, "JavaScript input-handling logic showing how the player activates core gameplay actions - talking, infecting, hiding, using abilities, opening the tactical map, opening the codex, and pausing - all mapped to distinct keys in a single-player stealth-horror system.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Challenges &amp; Solutions</h3>
        <p>One challenge was creating a genuinely scary atmosphere rather than simply making the screen dark. Early versions felt too simple because the player was mostly navigating a map. To improve this, I added detailed room art, horror effects, sound design, story scenes, and frightening events triggered by the player entering certain areas. Another challenge was balancing the detection system. If detection filled too slowly, the game became too easy. If it filled too quickly, the game felt unfair. To solve this, I introduced difficulty modes and adjusted detection range, speed, and cooldown according to the selected mode.</p>
        ${createCaseStudyFigure("assets/erebus-detection-alert.png", "Erebus-7 detection report showing You Were Identified", "Detection and alert system showing \"You Were Identified\" tension moment &ndash; the game’s response when guards, cameras, or scanners notice the player, with retreat/hide options presented.")}
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
        <p>The outcome is a playable horror stealth game with a full story theme, several levels, enemies, objectives, sound, and a clear mission flow. This project helped me understand that gameplay is more than controls and rules &mdash; a good game also needs feedback, sound, pacing, story, balance, and clear instructions for the player. Overall, Erebus-7: First Skin became more than a simple prototype. It became a full browser game that is playable on the web and shareable with others.</p>
        ${createCaseStudyFigure("assets/erebus-ending-detected.png", "Erebus-7 DETECTED failure state with checkpoint and restart options", "\"DETECTED\" failure-state screen showing the detection bar filled to maximum, last objective, current zone/alert level, a next-step tip, and Load Checkpoint / Restart Run options - closing the loop on the stealth-detection system described above.")}
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
  const roleSection = createRoleSection(
    "Solo Supporting Software Project",
    "Python / Streamlit App Developer",
    "I developed the application logic and Streamlit interface, including menu data, cart management, discount rules, GST calculation, receipt generation, and end-to-end testing."
  );
  const calculationCode = `GST_RATE = 0.09

def calculate_totals(cart, discount_name):
    subtotal = sum(MENU_BY_CODE[item_code].price * quantity for item_code, quantity in cart.items())
    discount_amount = subtotal * DISCOUNTS.get(discount_name, 0.00)
    discounted_subtotal = subtotal - discount_amount
    gst = discounted_subtotal * GST_RATE
    total = discounted_subtotal + gst
    return subtotal, discount_amount, gst, total


def build_receipt(cart, discount_name):
    subtotal, discount_amount, gst, total = calculate_totals(cart, discount_name)
    lines = [
        "McFast Ordering System",
        datetime.now().strftime("%Y-%m-%d %H:%M"),
        "-" * 42,
    ]
    for item_code, quantity in cart.items():
        item = MENU_BY_CODE[item_code]
        lines.append(f"{item.name}")
        lines.append(f"  {money(item.price)} x {quantity} = {money(item.price * quantity)}")
    lines.extend([
        "-" * 42,
        f"Subtotal: {money(subtotal)}",
        f"Discount ({discount_name}): -{money(discount_amount)}",
        f"GST 9%: {money(gst)}",
        f"Total: {money(total)}",
        "",
        "Thank you. Please come again.",
    ])`;

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">PROJECT: MCFAST ORDERING SYSTEM</h2>
      </header>

      ${roleSection}

      <div class="modal-media modal-video-frame">
        <!-- Demo video file provided by Ziqian and placed at /videos/mcfast-demo.mp4. -->
        <video class="modal-video" controls playsinline poster="${escapeHtml(project.poster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
          <source src="${escapeHtml(project.video)}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>McFast Ordering System is a Python-based food ordering app built with Streamlit. The app simulates a fast-food ordering flow where users can browse menu categories, add items to a cart, update quantities, apply discounts, calculate GST, and generate a final receipt.</p>
        <p>This project is a supporting software project that demonstrates my ability to build a functional Python application with a browser-based interface.</p>
        ${createCaseStudyFigure("assets/mcfast-menu-browsing.png", "McFast menu browsing interface with food items quantity controls and empty cart", "Menu browsing screen showing food items, item names, prices, quantity controls, Add buttons, discount selection, and empty cart state.")}
      </section>

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
          <li>9 percent GST calculation</li>
          <li>Final receipt generation</li>
          <li>Browser-based interface using Streamlit</li>
        </ul>
        ${createCaseStudyFigure("assets/mcfast-cart-management.png", "McFast cart with itemised order controls and calculated totals", "Cart management screen showing itemised order details, quantity update buttons, remove options, subtotal, GST, discount, and final total.")}
        ${createCaseStudyFigure("assets/mcfast-discount-dropdown.png", "McFast discount dropdown showing None Student Staff and Loyalty Member", "Discount type dropdown expanded, showing all available options - None, Student, Staff, and Loyalty Member - selected here on Staff, which is applied before GST.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technical Implementation</h3>
        <p>The project uses Python for the main application logic and Streamlit for the web interface. Menu items and prices are handled in the app so the system can calculate item subtotals, discounts, GST, and the final total.</p>
        <p>The cart logic keeps track of selected items and quantities before checkout. The checkout flow applies the selected discount first, then calculates GST, and finally generates the receipt.</p>
        <div class="modal-tech-tags">${tags}</div>
        ${createCodeBlock("python", calculationCode, "Python logic showing how the cart’s subtotal, discount, and 9% GST are calculated in sequence &ndash; discount applied first, then GST on the discounted amount &ndash; before the final receipt is generated line by line.")}
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
        <p>Tested adding different items and quantities into the cart. Tested updating and removing cart items. Tested checkout with different discount types. Tested 9 percent GST calculation after discount. Tested receipt generation after checkout.</p>
        ${createCaseStudyFigure("assets/mcfast-empty-cart.png", "McFast cleared cart empty state", "Cleared cart screen showing that the app can reset the order and return the user to an empty-cart state.", "is-compact")}
        ${createCaseStudyFigure("assets/mcfast-final-receipt.png", "McFast final receipt with subtotal discount GST and total", "Final receipt screen showing selected items, subtotal, discount type, GST calculation, final total, and receipt output.", "is-compact")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome and Future Improvements</h3>
        <p>The final app demonstrates a working food ordering system with a clear user flow from menu selection to final receipt. It helped me practise Python application logic, Streamlit interface design, cart management, and calculation accuracy.</p>
        <p>Future improvements: add a database to store menu items, prices, customer orders, and order history instead of keeping the data only inside the app code; add an admin panel so menu items, prices, and discounts can be updated without editing the source code directly; improve the receipt system by allowing users to download the final receipt as a PDF or text file; improve the app interface with food images, order numbers, a cleaner checkout page, and stronger visual styling.</p>
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
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

const IOT_MEDIA = Object.freeze({
  hardwareSetup: {
    file: "iot-hardware-setup", extension: "jpg", width: 464, height: 832, modifier: "is-portrait",
    alt: "Arduino-side hardware setup for the IoT plant monitoring prototype",
    caption: "Overall Arduino-side hardware setup showing the controller, connected sensors, LCD display, LED, buzzer, breadboard, and wiring used in the plant monitoring prototype."
  },
  labelledComponents: {
    file: "iot-labelled-components", extension: "jpg", width: 464, height: 832, modifier: "is-portrait",
    alt: "Labelled IoT plant monitoring components connected around an Arduino and breadboard",
    caption: "Labelled component overview identifying the Arduino Uno, ultrasonic sensor, breadboard, LED and buzzer, rotary control, and connected sensor modules visible in the selected video frame."
  },
  lcdCloseup: {
    file: "iot-lcd-closeup", extension: "jpg", width: 464, height: 832, modifier: "is-portrait",
    alt: "LCD display showing live temperature light water and LED readings",
    caption: "LCD display showing legible real-time temperature, light, water-level, and LED status feedback from the sensors."
  },
  pinMap: {
    file: "iot-arduino-pin-map", width: 672, height: 538,
    alt: "Arduino Uno pin map for the IoT plant monitoring system",
    caption: "Hardware pin map documenting temperature on A0, light on A1, rotary angle on A2, LCD SDA and SCL on A4 and A5, ultrasonic signal on D7, buzzer on D4, and LED on D3."
  },
  arduinoSerial: {
    file: "iot-arduino-serial-monitor", width: 755, height: 366,
    alt: "Arduino Serial Monitor showing temperature light water LED and alert readings",
    caption: "Arduino Serial Monitor evidence showing live sensor values, LED output, and alert-state messages before transmission to the Raspberry Pi."
  },
  raspberryPiData: {
    file: "iot-raspberry-pi-data-received", width: 910, height: 359,
    alt: "Raspberry Pi terminal showing sensor data received from Arduino",
    caption: "Raspberry Pi processing evidence showing temperature, light, water, LED, and alert values received from the Arduino."
  },
  flaskInterface: {
    file: "iot-flask-web-interface", width: 894, height: 318,
    alt: "Flask web interface displaying recorded IoT plant monitoring data",
    caption: "Flask web interface showing recorded plant monitoring data collected from the IoT system."
  },
  flaskServer: {
    file: "iot-flask-server-running", width: 888, height: 343,
    alt: "Python shell showing the IoT Flask development server running locally",
    caption: "Flask server running on the Raspberry Pi development environment before the monitoring page is opened in the browser."
  },
  databaseUpdate: {
    file: "iot-database-update-confirmation", width: 820, height: 346,
    alt: "Python shell confirming IoT sensor readings were stored in the database",
    caption: "Database update evidence showing processed sensor readings followed by successful MariaDB insert confirmations."
  },
  databaseStructure: {
    file: "iot-database-table-structure", width: 871, height: 252,
    alt: "MariaDB table structure for stored plant monitoring records",
    caption: "MariaDB table structure showing fields for identity, timestamp, temperature, light, water, LED, and alert records."
  }
});

function createPlantCaseStudyMarkup(project) {
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

      ${roleSection}

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Demo Video</h3>
        <div class="modal-media modal-video-frame">
          <video class="modal-video" controls playsinline poster="${escapeHtml(project.demoPoster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
            <source src="${escapeHtml(project.demoUrl)}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>
        <p class="modal-media-caption">Project demo showing sensor readings, hardware responses, database storage, and the web monitoring workflow.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>An automated indoor farming monitoring system designed to track plant-growing conditions in real time. The system monitors temperature, light intensity, and water level using sensors, then provides alerts, automatic LED control, database storage, and web-based monitoring.</p>
        <p>This project connects hardware, software, database management, and web development into one complete IoT solution for sustainable indoor farming.</p>
        ${createProjectCaseFigure(IOT_MEDIA.hardwareSetup)}
        ${createEvidenceComingSoon("The supplied demo does not contain one wide frame showing the Raspberry Pi beside the complete Arduino circuit. This genuine frame therefore documents the Arduino-side setup; the Raspberry Pi data-receipt evidence is shown later under Technical Implementation.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">The Problem</h3>
        <p>Singapore has limited land for agriculture and aims to strengthen food security by increasing local food production. Indoor farming and vertical farming can help, but they require stable growing conditions &mdash; suitable temperature, sufficient light, and enough water.</p>
        <p>In many indoor farming setups, these conditions are still checked manually. This can lead to delayed responses, inconsistent plant care, inefficient resource use, and weaker plant growth. Vertical farming can also create uneven lighting, where upper plants block light from reaching lower plants.</p>
        <p>This project was built to reduce manual monitoring by using IoT technology to provide real-time feedback, automatic light adjustment, and alerts when plant conditions are unsuitable.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I built an automated plant monitoring and alert system that uses sensors to check whether the plant environment is suitable for growth. The system uses:</p>
        <ul class="modal-feature-list">
          <li>A Grove temperature sensor to monitor whether the temperature is within the 20&deg;C&ndash;35&deg;C suitable range</li>
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
        ${createAnnotatedProjectCaseFigure(IOT_MEDIA.labelledComponents, [
          { label: "Arduino Uno", x: 29, y: 39 },
          { label: "Ultrasonic sensor", x: 62, y: 38 },
          { label: "Breadboard", x: 49, y: 52 },
          { label: "LED + buzzer", x: 80, y: 48 },
          { label: "Rotary / sensor module", x: 58, y: 68 }
        ])}
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
        ${createProjectCaseFigure(IOT_MEDIA.lcdCloseup)}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">System Architecture</h3>
        <div class="modal-diagram">
          <img src="${escapeHtml(project.diagram)}" alt="System architecture flowchart showing data flow from sensors through Arduino, serial communication, Raspberry Pi, MariaDB, the Flask web interface, and user monitoring" loading="lazy" width="1440" height="780">
        </div>
        <p class="modal-media-caption">System architecture flowchart showing how sensor data moves from the hardware layer through Arduino and Raspberry Pi into MariaDB and the Flask web interface.</p>
        <p>The Arduino collects data from the temperature sensor, light sensor, ultrasonic sensor, and rotary angle sensor. It processes the readings, controls the LED and buzzer, and displays the status on the LCD screen.</p>
        <p>The processed data is then sent to the Raspberry Pi through serial communication. The Raspberry Pi stores the readings in a MariaDB database and displays the data through a Flask web page, allowing users to view plant condition data more clearly and use it for future analysis.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technical Implementation</h3>
        <p>The system uses predefined thresholds to decide whether the environment is suitable for plant growth.</p>
        <p>The temperature condition is suitable when the reading is between 20&deg;C and 35&deg;C. The light condition is evaluated using effective light, which combines ambient light and LED brightness &mdash; if the light level is too low, LED brightness increases automatically; if there is enough light, brightness decreases to save energy.</p>
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
        ${createProjectCaseFigure(IOT_MEDIA.pinMap)}
        <div class="modal-case-media-grid is-equal-media is-document-safe is-landscape-pair" role="group" aria-label="Arduino to Raspberry Pi data transfer evidence">
          ${createProjectCaseFigure(IOT_MEDIA.arduinoSerial)}
          ${createProjectCaseFigure(IOT_MEDIA.raspberryPiData)}
        </div>
        ${createEvidenceComingSoon("Source code evidence is pending because no public IoT repository or local source file was supplied. No code has been reconstructed or invented from the screenshots.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Flask Web Interface</h3>
        <div class="modal-case-media-grid is-equal-media is-flask-pair" role="group" aria-label="Flask monitoring interface evidence">
          ${createProjectCaseFigure(IOT_MEDIA.flaskInterface)}
          ${createProjectCaseFigure(IOT_MEDIA.flaskServer)}
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">MariaDB Database</h3>
        <div class="modal-case-media-grid is-equal-media is-document-safe is-landscape-pair" role="group" aria-label="MariaDB storage evidence">
          ${createProjectCaseFigure(IOT_MEDIA.databaseUpdate)}
          ${createProjectCaseFigure(IOT_MEDIA.databaseStructure)}
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Testing &amp; Results</h3>
        <p>The system was tested under different environmental conditions to verify each function worked correctly. Test cases checked whether:</p>
        <div class="modal-table-wrapper">
          <table class="modal-data-table">
            <thead><tr><th>Test</th><th>Checked</th><th>Result</th></tr></thead>
            <tbody>
              <tr><td>Buzzer stayed off when all conditions suitable</td><td>&#10003;</td><td>Passed</td></tr>
              <tr><td>Buzzer activated when temperature/light/water unsuitable</td><td>&#10003;</td><td>Passed</td></tr>
              <tr><td>LED brightness increased in darker conditions</td><td>&#10003;</td><td>Passed</td></tr>
              <tr><td>LED brightness decreased in brighter conditions</td><td>&#10003;</td><td>Passed</td></tr>
              <tr><td>Low water level detected correctly</td><td>&#10003;</td><td>Passed</td></tr>
              <tr><td>Manual LED control overrode automatic brightness adjustment</td><td>&#10003;</td><td>Passed</td></tr>
            </tbody>
          </table>
        </div>
        <p>The system successfully responded to these test conditions, showing that the hardware, software, database, and web interface could work together as one complete IoT system.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final system successfully monitored temperature, light intensity, and water level in real time. It could automatically adjust LED brightness, alert users when plant conditions were unsuitable, store sensor data in a database, and display the readings through a Flask web interface.</p>
        <p>This project helped me understand how hardware, software, databases, and web technologies can be integrated into a practical IoT solution &mdash; and how technology can support more efficient and sustainable indoor farming.</p>
        <div class="modal-case-media-grid is-equal-media is-document-safe is-landscape-pair" role="group" aria-label="Final IoT system evidence">
          ${createProjectCaseFigure(IOT_MEDIA.hardwareSetup)}
          ${createProjectCaseFigure(IOT_MEDIA.flaskInterface)}
        </div>
        <p class="modal-media-caption">Final system evidence showing the completed IoT workflow from sensor monitoring to web-based data display.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Future Improvements</h3>
        <p>Although the system successfully monitors temperature, light intensity, and water level in real time, the current version mainly provides alerts when conditions are not suitable. A stronger future version could respond automatically instead of only notifying the user.</p>
        <p>The first improvement would be an automatic watering system. At the moment, the ultrasonic sensor can detect when the water level is low and trigger an alert, but the user still needs to refill the water manually. A future version could include a water pump that automatically adds water when the level falls below the acceptable range.</p>
        <p>The second improvement would be automatic temperature control. The current system can detect when the temperature is below 20&deg;C or above 35&deg;C and activate the buzzer, but it does not directly control the temperature. A future version could include a fan, heater, or cooling system to automatically adjust the temperature and keep the plant environment within the suitable range.</p>
        <p>The third improvement would be a stronger web dashboard. The current Flask web interface displays recorded sensor data in a table format. A future version could improve this by adding charts, trend analysis, and warning history so users can understand how the plant environment changes over time.</p>
        <p>Overall, the next version should move from a monitoring-and-alert system to a more complete automated control system. This would reduce manual work further, improve plant growth consistency, and make the system more useful for real indoor farming.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Skills Demonstrated</h3>
        <ul class="modal-feature-list modal-skills-list">
          <li>IoT system design</li><li>Sensor integration</li><li>Arduino programming</li>
          <li>Raspberry Pi data processing</li><li>Serial communication</li><li>Python scripting</li>
          <li>MariaDB database implementation</li><li>Flask web development</li><li>Real-time monitoring</li>
          <li>Testing and troubleshooting</li><li>Sustainability-focused engineering</li>
        </ul>
      </section>

      <section class="modal-action-block" aria-label="Project report and demo">
        <!-- REPORT: converted from the co-authored DOCX project report to a web-friendly PDF. -->
        <!-- DEMO: linked to the provided project demo MP4. -->
        <div class="modal-actions modal-action-row">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.reportUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action><span aria-hidden="true">PDF</span>View Full Report</a>
          <a class="modal-action-button modal-play-button btn-primary" href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action><span aria-hidden="true">&#9654;</span>Watch Demo</a>
        </div>
        <p class="modal-coauthor-note">Co-authored with Li Heng as a joint project submission.</p>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
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
        <h3 class="modal-section-heading">Demo Video</h3>
        <div class="modal-media modal-video-frame">
          <video class="modal-video" controls playsinline poster="${escapeHtml(project.demoPoster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
            <source src="${escapeHtml(project.demoUrl)}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>
        <p class="modal-media-caption">Project demo showing sensor readings, hardware responses, database storage, and the web monitoring workflow.</p>
      </section>

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
        <p>The temperature condition is suitable when the reading is between 20&deg;C and 35&deg;C. The light condition is evaluated using effective light, which combines ambient light and LED brightness - if the light level is too low, LED brightness increases automatically; if there’s enough light, brightness decreases to save energy.</p>
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
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

const WHEELCHAIR_MEDIA = Object.freeze({
  overviewAssembly: {
    file: "wheelchair-hardware-assembly-process", width: 1066, height: 338,
    alt: "Wheelchair prototype parts arranged beside the assembled chain drive mechanism",
    caption: "Overall prototype setup showing the motor-assisted wheelchair support concept and the main hardware components used in the system. Parts were selected and arranged before being assembled into the final mechanism."
  },
  flowchart: {
    file: "wheelchair-software-flowchart", width: 1434, height: 1011,
    alt: "Flowchart showing ultrasonic sensor, buzzer, switch, motor, and potentiometer logic",
    caption: "System flow showing how the switch, potentiometer, DC motor, ultrasonic sensor, and buzzer work together in the prototype."
  },
  ultrasonicBuzzer: {
    file: "wheelchair-component-ultrasonic-buzzer", width: 947, height: 413,
    alt: "Ultrasonic sensor input linked to piezo buzzer output",
    caption: "Ultrasonic sensor input and piezo buzzer obstacle-alert output."
  },
  potentiometer: {
    file: "wheelchair-component-potentiometer", width: 976, height: 411,
    alt: "Potentiometer input used to control wheelchair motor speed",
    caption: "Potentiometer input used to adjust the motor-assist speed."
  },
  switchControl: {
    file: "wheelchair-component-switch", width: 1008, height: 390,
    alt: "Slide switch used to turn the wheelchair support system on and off",
    caption: "Manual switch input for direct system on/off control."
  },
  dcMotor: {
    file: "wheelchair-component-dc-motor", width: 232, height: 227,
    alt: "DC motor used for the wheelchair movement-assistance output",
    caption: "DC motor output used to demonstrate assisted movement."
  },
  arduino: {
    file: "wheelchair-component-arduino", width: 312, height: 177,
    alt: "Arduino Uno used as the controller for the wheelchair prototype",
    caption: "Arduino Uno controller coordinating the sensor, controls, buzzer, and motor."
  },
  crazyEight: {
    file: "wheelchair-crazy-8-brainstorming", width: 1944, height: 886,
    alt: "Crazy 8 brainstorming sketches for wheelchair support ideas",
    caption: "Crazy 8 brainstorming generated multiple possible assistive wheelchair concepts."
  },
  valueEffort: {
    file: "wheelchair-value-effort-map", width: 950, height: 618,
    alt: "Value effort map comparing wheelchair support prototype ideas",
    caption: "Design process evidence showing how different ideas were compared before selecting the motor-assisted wheelchair support concept."
  },
  tinkercad: {
    file: "wheelchair-tinkercad-circuit", width: 1830, height: 1007,
    alt: "Tinkercad circuit showing Arduino, ultrasonic sensor, potentiometer, buzzer, switch, motor, and wiring",
    caption: "Tinkercad circuit design showing the Arduino, ultrasonic sensor, potentiometer, buzzer, switch, motor, and wiring used in the wheelchair support prototype."
  },
  comparison: {
    file: "wheelchair-design-comparison", width: 1097, height: 607,
    alt: "Design comparison table showing button, switch, LED, buzzer, ultrasonic sensor, and potentiometer decisions",
    caption: "Prototype refinement evidence showing how the LED was removed, switch control was added, and ultrasonic sensor placement was improved after testing."
  },
  outcome: {
    file: "wheelchair-final-hardware-prototype", width: 1028, height: 665,
    alt: "Final chain and wheel prototype for the motor-assisted wheelchair support project",
    caption: "Final version of the prototype showing the refined hardware setup after testing and improvement. The completed hardware prototype shows the final chain, wheel, and support structure."
  },
  hardwareSketch: {
    file: "wheelchair-hardware-sketch", width: 1313, height: 889,
    alt: "Hand-drawn sketch of the motor and chain drive concept",
    caption: "Initial sketch used to plan the drive layout and movement transfer."
  },
  softwareComponents: {
    file: "wheelchair-software-components", width: 1102, height: 607,
    alt: "Software design component list for the Arduino wheelchair support prototype",
    caption: "Component logic showing the inputs and outputs used by the software control system."
  },
  softwareCircuit: {
    file: "wheelchair-software-circuit-build", width: 893, height: 450,
    alt: "Arduino circuit build with ultrasonic sensor, DC motor, potentiometer, buzzer, and switch wiring",
    caption: "The final circuit build connects the Arduino logic to the physical motor, sensor, buzzer, switch, and speed control components."
  }
});

function createProjectCaseFigure(media) {
  const fallbackExtension = media.extension || "png";
  const fallbackPath = `images/${media.file}.${fallbackExtension}`;
  const webpPath = `images/${media.file}.webp`;
  const modifierClass = media.modifier ? ` ${escapeHtml(media.modifier)}` : "";
  return `
    <figure class="modal-case-figure${modifierClass}">
      <a class="modal-case-image-link" href="${fallbackPath}" target="_blank" rel="noopener noreferrer">
        <picture>
          <source srcset="${webpPath}" type="image/webp">
          <img src="${fallbackPath}" width="${media.width}" height="${media.height}" alt="${escapeHtml(media.alt)}" loading="lazy" decoding="async">
        </picture>
      </a>
      <figcaption>${escapeHtml(media.caption)}</figcaption>
    </figure>
  `;
}

function createAnnotatedProjectCaseFigure(media, annotations) {
  const fallbackExtension = media.extension || "png";
  const fallbackPath = `images/${media.file}.${fallbackExtension}`;
  const webpPath = `images/${media.file}.webp`;
  const modifierClass = media.modifier ? ` ${escapeHtml(media.modifier)}` : "";
  return `
    <figure class="modal-case-figure${modifierClass}">
      <a class="modal-case-image-link modal-annotated-media" href="${fallbackPath}" target="_blank" rel="noopener noreferrer">
        <picture>
          <source srcset="${webpPath}" type="image/webp">
          <img src="${fallbackPath}" width="${media.width}" height="${media.height}" alt="${escapeHtml(media.alt)}" loading="lazy" decoding="async">
        </picture>
        ${annotations.map(({ label, x, y }) => `<span class="modal-media-annotation" style="--annotation-x:${Number(x)}%;--annotation-y:${Number(y)}%">${escapeHtml(label)}</span>`).join("")}
      </a>
      <figcaption>${escapeHtml(media.caption)}</figcaption>
    </figure>
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
        <h3 class="modal-section-heading">Demo Video</h3>
        <div class="modal-media modal-video-frame">
          <video class="modal-video" controls playsinline poster="${escapeHtml(project.demoPoster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
            <source src="${escapeHtml(project.demoUrl)}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>
        <p class="modal-media-caption">Prototype demo showing motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Overview</h3>
        <p>An assistive hardware prototype designed to support self-propelled wheelchair users when travelling on slopes. The system combines motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control to reduce user effort and improve safety awareness.</p>
        ${createProjectCaseFigure(WHEELCHAIR_MEDIA.overviewAssembly)}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Problem / Brief</h3>
        <p>Self-propelled wheelchair users face greater difficulty when moving up slopes because more physical effort is required compared to flat ground. Moving down slopes can also be harder to control and may increase the risk of collision, tipping, or falling.</p>
        <p>This project aimed to create a low-cost assistive prototype that demonstrates three core functions: motor assistance, user-adjustable speed control, and obstacle alert feedback.</p>
        <div class="modal-media modal-video-frame">
          <video class="modal-video" controls playsinline poster="${escapeHtml(project.pitchPoster)}" preload="metadata" data-volume-boost="${MODAL_VIDEO_GAIN}">
            <source src="${escapeHtml(project.pitchUrl)}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>
        <p class="modal-media-caption">Pitch video presenting the wheelchair user problem, proposed motor-assist solution, target users, design reasoning, and project value.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>The prototype uses a DC motor to support forward movement, a potentiometer to control motor speed, an ultrasonic sensor to detect nearby obstacles, a buzzer to alert the user, and a switch to turn the system on or off.</p>
        <p>The goal was not to build a commercial wheelchair product, but to demonstrate a practical assistive concept that could reduce user effort and improve safety awareness.</p>
        ${createProjectCaseFigure(WHEELCHAIR_MEDIA.flowchart)}
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
        <div class="modal-case-media-grid is-equal-media is-document-safe is-landscape-pair">
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.ultrasonicBuzzer)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.potentiometer)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.switchControl)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.dcMotor)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.arduino)}
        </div>
        <p class="modal-media-caption">Key hardware components used in the prototype, including motor assistance, obstacle detection, speed control, alert feedback, and manual system control.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Design Process</h3>
        <p>The project started with Crazy 8 brainstorming to generate multiple possible solutions. The team then used a value-effort map to compare ideas and selected the motor-assist wheelchair concept because it provided high user value while still being achievable within the project constraints.</p>
        <div class="modal-case-media-grid is-equal-media is-document-safe is-document-pair">
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.crazyEight)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.valueEffort)}
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Technologies / Technical Implementation</h3>
        ${createProjectCaseFigure(WHEELCHAIR_MEDIA.tinkercad)}
        <div class="modal-actions modal-action-row modal-inline-action-row">
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.tinkercadUrl)}" target="_blank" rel="noopener noreferrer" data-modal-action>
            <span aria-hidden="true">CAD</span>
            View live circuit on Tinkercad &rarr;
          </a>
        </div>
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
        <p>The system uses a switch to turn the prototype on or off. When the system is active, the potentiometer allows the user to adjust the motor output, giving the user control over the level of assistance. The ultrasonic sensor measures the distance of objects in front of the wheelchair, and the buzzer provides an audio alert when an obstacle is detected.</p>
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
        ${createProjectCaseFigure(WHEELCHAIR_MEDIA.comparison)}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome</h3>
        <p>The final prototype demonstrated a functional assistive concept that combines motor support, speed control, and obstacle alert feedback. The strongest part of this project was the refinement process: removing unnecessary LED feedback, adding manual switch control, and improving ultrasonic sensor placement based on testing.</p>
        <p>Each decision directly improved the user experience &ndash; simpler feedback, safer control, and more reliable obstacle detection without adding unnecessary cost or complexity.</p>
        ${createProjectCaseFigure(WHEELCHAIR_MEDIA.outcome)}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Final Hardware Design</h3>
        <p>The final hardware design was developed by moving from a simple mechanical sketch into a physical prototype that could show the motor-assist idea clearly. The sketch helped define the main drive logic: a motor would transfer movement through a wheel-and-chain mechanism, while the assembled prototype used available structural parts, gears, wheels, and a chain to demonstrate how assisted movement could be supported in a real wheelchair concept.</p>
        <div class="modal-case-media-grid">
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.hardwareSketch)}
        </div>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Final Software Design</h3>
        <p>The final software design was based on separating the prototype into clear input and output logic. The switch decides whether the system is active, the potentiometer controls the motor speed, and the ultrasonic sensor checks for obstacles. The Arduino then controls the motor and buzzer based on those readings, which made the system easier to test because each component had a clear role in the final control flow.</p>
        <div class="modal-case-media-grid is-equal-media is-landscape-pair">
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.softwareComponents)}
          ${createProjectCaseFigure(WHEELCHAIR_MEDIA.softwareCircuit)}
        </div>
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
          <a class="modal-action-button modal-github-button btn-secondary" href="${escapeHtml(project.slidesUrl)}" download data-modal-action>
            <span aria-hidden="true">PDF</span>
            Download Slides (PDF)
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
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function createEcowasteModalMarkup(project) {
  const tags = project.tags.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("");
  const dimensions = {
    "oecd-benchmark-ranking-chart": [566, 335],
    "policy-scenario-forecast-dashboard": [1303, 272],
    "policy-timeline-japan": [516, 329],
    "policy-timeline-spain": [519, 333],
    "policy-timeline-uk": [519, 335],
    "return-and-save-scheme-infographic": [881, 499]
  };
  const figure = (file, alt, caption, modifier = "") => {
    const [width, height] = dimensions[file];
    return createProjectCaseFigure({ file: `ecowaste/${file}`, extension: "png", width, height, alt, caption, modifier });
  };

  return `
    <article class="project-modal-body project-modal-body-long">
      <header class="modal-project-hero modal-case-header">
        <p class="modal-eyebrow section-kicker dark">Project</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </header>

      ${createRoleSection(
        "Group Project — EG2A12 Data Preparation, Team A4 (5 members)",
        "OECD Benchmarking Dashboard & Policy Recommendation",
        "The project was divided by dashboard. My specific responsibility was the OECD waste-reduction benchmarking and policy-scenario dashboard, and I authored the project’s first policy recommendation, the Return & Save Takeaway Scheme."
      )}

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Project Scope / Problem</h3>
        <p>This was a 5-person group project for the EG2A12 Data Preparation module at Nanyang Polytechnic (Team A4: Lim Hong Jean, Zi Qian, Kwan Teng, Pierre, and Emmanuel). The brief was to investigate a real Singapore data problem end-to-end &mdash; sourcing data, cleaning it, analysing it, and turning the findings into policy recommendations.</p>
        <p>The problem we investigated: Singapore relies on Pulau Semakau as its only landfill, and at the current disposal rate it is projected to run out of space by around 2035. Singapore’s Zero Waste Masterplan targets a 70% overall recycling rate and a 30% cut in daily per-capita waste sent to landfill, both by 2030. Our guiding question was: <strong>how can Singapore improve its waste management and recycling efficiency?</strong></p>
        <p>We worked with three datasets: Singapore’s waste-management and recycling statistics (2000&ndash;2024) and annual population figures, both from data.gov.sg, plus OECD municipal waste statistics (1995&ndash;2020) for international comparison.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">My Role &amp; Solution</h3>
        <p>The project was divided by dashboard. My specific responsibility was the <strong>OECD waste-reduction benchmarking and policy-scenario dashboard</strong>, and I authored the project’s first policy recommendation, the <strong>Return &amp; Save Takeaway Scheme</strong> (Sections 2.4&ndash;2.6.1 of the team report).</p>
        <p>I ranked OECD countries by their percentage reduction in municipal waste generated per person between 2000 and 2020, using a formula I derived: (waste in 2000 &minus; waste in 2020) &divide; waste in 2000 &times; 100. Spain (28.82%), Japan (23.57%), and the United Kingdom (19.94%) came out as the three strongest performers, well ahead of the rest of the field.</p>
        ${figure("oecd-benchmark-ranking-chart", "Horizontal bar chart ranking OECD countries by percentage reduction in municipal waste per person from 2000 to 2020, led by Spain at 28.82 percent, Japan at 23.57 percent and the United Kingdom at 19.94 percent", "OECD countries ranked by waste reduction per person, 2000–2020.")}
        <p>I then researched what each of those three countries had actually done &mdash; Spain’s single-use shopping bag reduction measures (2008), Japan’s waste-collection charging policy (2005), and the UK’s Courtauld Commitment on food waste and packaging (2005) &mdash; and pulled out one transferable principle from each: waste prevention at source, financial incentives for behaviour change, and shared responsibility with businesses.</p>
        <div class="modal-case-media-grid is-equal-media is-document-safe" role="group" aria-label="Benchmark country policy timelines">
          ${figure("policy-timeline-spain", "Line chart of Spain's waste per person from 2000 to 2020 with a marker at 2008, the year its single-use shopping bag reduction measures took effect", "Spain — single-use bag measures, 2008.")}
          ${figure("policy-timeline-japan", "Line chart of Japan's waste per person from 2000 to 2020 with a marker at 2005, the year its waste-collection charging policy took effect", "Japan — waste-collection charging, 2005.")}
          ${figure("policy-timeline-uk", "Line chart of the United Kingdom's waste per person from 2000 to 2020 with a marker at 2005, the year the Courtauld Commitment took effect", "UK — Courtauld Commitment, 2005.")}
        </div>
        <p>I combined those three principles into an original recommendation for Singapore: the <strong>Return &amp; Save Takeaway Scheme</strong>, a S$2 refundable-deposit system for reusable takeaway containers. Customers pay a $2 deposit, use the reusable container, return it at a return point, and get the full deposit back. I designed the full operating model (Deposit &rarr; Use &rarr; Return &rarr; Refund &rarr; Clean &rarr; Reuse), worked through consumer participation, business participation, and the government’s role, and identified practical risks &mdash; container return rate, return-point convenience, hygiene, operating cost, business uptake &mdash; with a mitigation for each.</p>
        ${figure("return-and-save-scheme-infographic", "Infographic for the Return and Save Takeaway Scheme showing the four-step cycle: pay a two dollar refundable deposit, use the reusable container, return it at a return machine, and receive the full deposit back", "The Return & Save Takeaway Scheme operating model.")}
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Work Process</h3>
        <p>I followed the CRISP-DM data-preparation approach the team used throughout. For the OECD dataset specifically: I checked for missing years country-by-country and excluded countries with large gaps (e.g. Canada, Costa Rica) rather than interpolating two decades of missing data, since that would introduce more error than it removes. I standardised column names and units (the OECD file used machine-readable codes like <code>REF_AREA</code> and <code>TIME_PERIOD</code>, which I renamed to descriptive labels), then filtered to countries with sufficiently complete 2000&ndash;2020 coverage so the ranking was not distorted by uneven data quality.</p>
        <p>After calculating and ranking the reduction percentages, I chose a horizontal bar chart specifically because several country names are long &mdash; horizontal labels stay readable where a vertical column chart would crowd them. For the three benchmark countries, I built individual trend-line charts marking the year each country’s key policy took effect, to connect the quantitative ranking to a real policy moment rather than just showing a number.</p>
        <p>For the forecast, I applied the benchmark countries’ average annual reduction rate cumulatively to Singapore’s existing baseline projection in Power BI, producing two comparable trajectories through 2034 &mdash; with policy, and without.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Outcome &amp; Results Achieved</h3>
        <p>The benchmarking identified Spain, Japan, and the UK as the three strongest OECD performers on waste reduction, and the policy analysis behind them directly shaped the Return &amp; Save Scheme’s design.</p>
        <p>The forecast dashboard I built shows that if Singapore achieved a reduction rate comparable to those benchmark countries, per-capita waste in 2034 could fall from a baseline of <strong>653.05 kg/person to 571.03 kg/person</strong> &mdash; a reduction of <strong>82.02 kg per person, or 12.56%</strong> relative to the do-nothing baseline. I was careful in the report to frame this correctly: it is a scenario-based benchmark of potential improvement, not a guaranteed causal prediction, since real-world outcomes depend on implementation quality, participation, and business adoption.</p>
        ${figure("policy-scenario-forecast-dashboard", "Power BI dashboard showing Singapore waste per capita from 2000 to 2034 with two forecast trajectories, alongside cards reading 571.03 forecast with policy, 653.05 forecast without policy, 12.56 percent policy reduction and 82.02 waste prevented", "Policy-scenario forecast to 2034: with policy vs. without.")}
        <p>The team’s combined recommendations (my Return &amp; Save Scheme alongside a teammate’s separate recycling-side proposal) were presented as a “Reduce &rarr; Separate &rarr; Recycle” strategy in the final submission.</p>
      </section>

      <div class="modal-tech-tags">${tags}</div>

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
        <h3 class="modal-section-heading">Brief Explanation of Design: Three Unique Added Features</h3>
        <p>My design is a compact, multi-functional keychain that integrates several everyday tools into a single flat, pocket-sized part. It keeps a slim profile so it can be carried in a pocket or clipped to a bag without adding bulk or discomfort, while still being rigid enough at 3&ndash;4 mm thickness to survive daily use.</p>
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/01_ruler_markings_and_engraving.jpg", alt: "Front of the revised yellow keychain showing the engraved ruler scale and Ziqian PB name engraving", caption: "Revised front face showing the 0&ndash;30 mm ruler, enlarged scale numerals, keyring hole, and name engraving." },
          { src: "images/keychain-report/02_keychain_full_profile.jpg", alt: "Back of the revised yellow keychain showing its full tool profile and rectangular magnet recess", caption: "Back profile showing the flat body, combined utility edge, keyring hole, and recessed rectangular magnet pocket." }
        ], "Keychain front and back design evidence", "is-document-safe is-ultrawide-pair")}
        <p><strong>Feature 1 &mdash; Engraved ruler scale.</strong> A 0&ndash;30 mm ruler is engraved along one edge, turning the keychain into an always-on-hand measuring tool for small objects or straight-line marking. This required balancing engraving depth and marking spacing against the printer's nozzle resolution &mdash; a constraint discussed further in the reflection.</p>
        <p><strong>Feature 2 &mdash; Combined emergency and utility cutting profile.</strong> A single contoured edge does three jobs: a bottle-opener hook for prying off glass caps, a shielded seatbelt-cutter notch for slicing through webbing in an emergency, and a reinforced pointed tip that concentrates force into a small contact area for breaking a car window if the user is trapped. Housing all three in one profile keeps the part compact instead of needing separate tools.</p>
        <p><strong>Feature 3 &mdash; Rear magnetic name-tag / bookmark slot.</strong> A recessed rectangular pocket on the back accepts a small magnet, letting the keychain clip onto clothing as a name tag without piercing the fabric. Beside it, a raised rectangular block with a hollow gap functions as a bookmark, gripping a page firmly by friction.</p>
        <p>Every sharp transition on the part &mdash; the outer edges, the phone-stand corner, and the tool-profile corners &mdash; was filleted or chamfered so the finished print is safer to handle and less likely to scratch a phone screen or the user's hand.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Built</h3>
        <p>I designed and 3D-printed a multifunctional keychain with several integrated features, including a keyring hole, mini ruler, bottle-opener-style cut-out, phone stand, cable holder, bookmark clip, magnet recess for name-tag use, rounded edges, and chamfered functional areas.</p>
        <p>The design was created to be flat and portable so it could be attached to a bag or carried in a pocket without taking up much space.</p>
        <div class="modal-photo-gallery">
          <img src="${escapeHtml(project.gallery[0])}" width="900" height="1200" alt="Finished 3D-printed keychain, full view showing ruler markings and keyring hole" loading="lazy" decoding="async">
          <!-- ACTION REQUIRED: add additional close-up photos here as they become available - e.g. bottle-opener cutout, phone stand in use, magnet recess. Currently only 1 photo is provided; gallery supports 1-4 images gracefully. -->
          <!-- Additional close-up and function evidence appears in the report sections below. -->
        </div>
        <p class="modal-media-caption">The finished, 3D-printed keychain prototype.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">Added Function: Rear Magnet Mount</h3>
        <p>The centrepiece added function is the <strong>rear magnet mount</strong>, which converts the keychain into a clip-on name tag or badge holder. A small rectangular recess on the back face is sized to hold a thin magnet flush with the surface; when a magnet is inserted, the keychain can be pressed onto the outside of a shirt or jacket with a second magnet, or attached to a ferrous surface, without using a pin or clip that would damage the fabric.</p>
        <p>In the test photos, a microSD card was used to simulate the magnet's thin, flat form factor and verify the recess fit before committing to the actual insert. The clipped-on demonstration shows how the keychain can sit against clothing without the insert protruding from the recess.</p>
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/03_sd_card_as_magnet_simulation.jpg", alt: "MicroSD card placed inside the keychain's rear rectangular recess to simulate a thin magnet insert", caption: "Fit check using a microSD card to simulate the thin, flat form of the planned magnet insert." },
          { src: "images/keychain-report/04_nametag_clipped_on_shirt.jpg", alt: "Green 3D-printed keychain held against a shirt as a name-tag placement demonstration", caption: "Name-tag placement demonstration showing how the keychain is intended to sit against clothing." }
        ], "Rear magnet mount and name-tag demonstrations", "is-document-safe is-landscape-pair")}
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
        <h3 class="modal-section-heading">Purpose and Mechanical Operation</h3>
        <p>The purpose of this design is to consolidate several small, frequently needed tools into one compact object, so the user is not carrying or forgetting separate items for each task.</p>
        <ul class="modal-feature-list">
          <li><strong>Ruler.</strong> The engraved 0&ndash;30 mm scale lets the user measure a small object or draw a straight edge whenever a proper ruler is not at hand &mdash; useful for quick checks on packages, craft work, or stationery tasks.</li>
          <li><strong>Bottle opener.</strong> A hook-shaped cut-out engages under a metal bottle cap; pressing down while lifting the keychain levers the cap off, using the same mechanical principle as a standard bottle opener.</li>
          <li><strong>Seatbelt cutter / window breaker concept.</strong> In the design concept, the shielded notch is drawn across seatbelt webbing while the reinforced pointed tip concentrates force into a small contact area. These functions require appropriate materials and controlled safety testing before real use.</li>
          <li><strong>Bookmark.</strong> A page is slid into the hollow gap beneath the raised block; the raised section increases local thickness just enough to grip the paper by friction, holding the user's place without folding or damaging the page.</li>
          <li><strong>Phone stand.</strong> The same ring-hole end doubles as a stand, propping a phone in landscape orientation for watching a video hands-free.</li>
          <li><strong>Cable wrap holder.</strong> At that same phone-stand location, a wired earphone cable or another short cable can be wound around the stand's neck so it stays untangled when not in use.</li>
        </ul>
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/05_bottle_opener_demo.jpg", alt: "Yellow keychain hook positioned beneath the lip of a bottle cap to demonstrate the opener geometry", caption: "Bottle-opener demonstration: the upper hook engages beneath the cap so the body can act as a lever.", modifier: "is-portrait" },
          { src: "images/keychain-report/06_seatbelt_cutter_paper_demo.jpg", alt: "Green keychain utility notch demonstrated against a strip of paper", caption: "Shielded-notch concept demonstrated with paper to show where webbing would be guided; this is not a certified seatbelt-cutting test.", modifier: "is-portrait" }
        ], "Bottle opener and shielded notch demonstrations", "is-portrait-pair")}
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/07_window_breaker_point_demo.jpg", alt: "Pointed corner of the yellow keychain placed against a glass surface as a window-breaker concept demonstration", caption: "Pointed-tip placement demonstration showing the intended small contact area; no glass-breaking performance is claimed.", modifier: "is-portrait" },
          { src: "images/keychain-report/08_bookmark_feature_side_view.jpg", alt: "Yellow keychain clipped over the edge of cardboard to show the bookmark position", caption: "Bookmark position from the front, showing the keychain held over a page-like edge by the raised rear feature.", modifier: "is-portrait" }
        ], "Pointed tip and bookmark position demonstrations", "is-portrait-pair")}
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/09_bookmark_paper_insert_demo.jpg", alt: "Side view of paper inserted into the narrow bookmark gap on the keychain", caption: "Side view of paper inserted beneath the raised bookmark block, showing the friction-fit gap." },
          { src: "images/keychain-report/10_phone_stand_demo.jpg", alt: "Smartphone supported in landscape orientation by the yellow keychain stand feature", caption: "Phone-stand demonstration with a smartphone supported in landscape orientation." }
        ], "Bookmark grip and phone stand demonstrations", "is-document-safe is-landscape-pair")}
        ${createCaseStudyFigure("images/keychain-report/11_cable_wrap_holder_demo.jpg", "Cable wound around the yellow keychain's raised stand neck", "Cable-management demonstration showing a short cable wrapped around the stand neck to keep it together during storage.", "is-portrait")}
        <p>Together, these functions turn the keychain from a single-purpose item into a compact daily-carry multi-tool, combining everyday convenience with emergency-tool-inspired design exploration.</p>
        <p><strong>Safety note.</strong> The emergency-tool-inspired geometry is design exploration only. The photos document the intended contact points and mechanical ideas, not certified seatbelt-cutting or glass-breaking performance; real deployment would require suitable materials, controlled testing, and relevant safety standards.</p>
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
        <h3 class="modal-section-heading">Reflection: Print Results and Problems Faced</h3>
        <p>The design went through two print iterations &mdash; the first shown in green, the second revised version in yellow.</p>
        ${createCaseStudyMediaGrid([
          { src: "images/keychain-report/12_print_comparison_first_vs_second.jpg", alt: "Green first-print and yellow second-print keychains placed together for comparison", caption: "First-versus-second print comparison: the green version has crowded ruler details, while the yellow revision uses clearer spacing and engraving." },
          { src: "images/keychain-report/13_print_comparison_closeup_detail.jpg", alt: "Close-up back view comparing the green and yellow keychain print iterations", caption: "Close-up of the reverse faces, including the revised magnet recess and the effect of the first version's over-deep engraving." }
        ], "First and second keychain print comparison", "is-document-safe is-landscape-pair")}
        <ol class="modal-feature-list">
          <li><strong>Illegible engraving.</strong> The ruler markings and numbers were spaced too tightly for the printer's nozzle diameter to resolve cleanly, so the scale printed crowded and difficult to read.</li>
          <li><strong>Over-deep name engraving.</strong> The "Ziqian PB" text was engraved with too much depth, cutting through to the back face and weakening that section of the part as well as looking unfinished.</li>
          <li><strong>SD card read failure.</strong> The 3D printer would not detect the print file from the SD card. With the teacher's help, the card was reformatted, after which the file was recognised and the print completed successfully.</li>
        </ol>
        <p>For the second iteration, I widened the spacing between ruler markings and enlarged the scale numerals so they would resolve more clearly at the printer's minimum feature size. I also reduced the engraving depth on the name text so it no longer broke through to the back face. Both changes are visible in the yellow print: the ruler is more legible and the engraving no longer shows through.</p>
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
        <p>The final keychain prototype showed improvement from the first print to the second print. The project strengthened my ability to design with manufacturing in mind, not just appearance. It also taught me to consider print quality, engraving depth, spacing, and usability before finalising a physical product.</p>
      </section>

      <section class="modal-section modal-case-section">
        <h3 class="modal-section-heading">What I Learned</h3>
        <p>This project taught me that designing for the screen is different from designing for manufacturing. Some features looked clear in Autodesk Inventor, but became too small or unclear after 3D printing because I had not fully considered printer resolution, minimum feature size, spacing, and material behaviour.</p>
        <p>The first print revealed several problems: the ruler markings were too close together, the engraved details were unclear, and the name engraving was too deep. For the second print, I increased the spacing between markings, adjusted the feature size, and reduced the engraving depth. These changes improved the readability and overall print quality.</p>
        <p>This strengthened my ability to use Autodesk Inventor tools such as extrude, cut, fillet, chamfer, and emboss with manufacturing intent, not just visual design intent. I learned that a good product is not only about how it looks on screen, but also whether it can be printed, used, and improved in real life.</p>
        <p>Autodesk Inventor's core tools &mdash; extrude, cut, revolve, fillet, chamfer, and emboss &mdash; were taught in class, but this assignment was the first time I had to apply them together on a complete, self-directed design rather than a guided practice exercise. In class, I focused mainly on matching a shape to a given specification; I gave little thought to how a design would actually be manufactured.</p>
        <p>Going through the 3D printing process changed that. I learned that a feature can look correct on screen and still fail in print &mdash; the ruler markings and the name engraving were both features that were geometrically valid in Inventor but too fine for the printer's actual resolution. This taught me that minimum feature size, wall thickness, and engraving depth all need to be checked against the manufacturing method, not just against the CAD model, before a design can be considered finished.</p>
        <p>I also became noticeably faster and more accurate in Inventor over the course of the project &mdash; starting slowly and sometimes producing incorrect dimensions, and finishing able to model with better speed and precision &mdash; and more disciplined about checking tolerances and dimensions up front so the part would print correctly the first time rather than requiring another iteration.</p>
        <p>Overall, this project shifted how I think about modelling: not just "does this shape match the design," but "will this shape actually manufacture correctly and function as intended." It strengthened my CAD skills, my problem-solving process when a print does not come out as expected, and my confidence going into future design-and-print projects.</p>
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
        <p class="modal-link-helper modal-helper-text">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
      </section>
    </article>
  `;
}

function getProjectKey(project) {
  return PROJECT_ORDER.find((key) => PROJECTS[key] === project) || null;
}

function getAdjacentProjectKey(projectKey, direction) {
  const currentIndex = PROJECT_ORDER.indexOf(projectKey);
  if (currentIndex < 0) return null;
  return PROJECT_ORDER[(currentIndex + direction + PROJECT_ORDER.length) % PROJECT_ORDER.length];
}

function getProjectActionDefinitions(project) {
  const projectKey = getProjectKey(project);

  const definitions = {
    piano: [
      { label: "Play Game", url: project.playUrl, icon: "&#9654;", primary: true },
      { label: "View Code", url: project.github, icon: "</>", primary: false },
      { label: "Watch Gameplay Video", url: project.video, icon: "VIDEO", primary: false }
    ],
    erebus: [
      { label: "Play Game", url: project.playUrl, icon: "&#9654;", primary: true },
      { label: "View Code", url: project.github, icon: "</>", primary: false },
      { label: "Watch Gameplay Video", url: project.video, icon: "VIDEO", primary: false }
    ],
    mcfast: [
      { label: "Try App on Streamlit", url: project.streamlitUrl, icon: "&#8599;", primary: true },
      { label: "View Code on GitHub", url: project.github, icon: "</>", primary: false },
      { label: "Watch Project Video", url: project.video, icon: "VIDEO", primary: false }
    ],
    wheelchair: [
      { label: "Download Slides (PDF)", url: project.slidesUrl, icon: "PDF", primary: false, download: "wheelchair-prototype-slides.pdf" },
      { label: "View Circuit in Tinkercad", url: project.tinkercadUrl, icon: "CAD", primary: false },
      { label: "Watch Demo", url: project.demoUrl, icon: "&#9654;", primary: true }
    ],
    greenhouse: [
      { label: "View Full Report", url: project.reportUrl, icon: "PDF", primary: false },
      { label: "Watch Demo", url: project.demoUrl, icon: "&#9654;", primary: true }
    ],
    keychain: [
      { label: "View the Keychain", url: project.keychainUrl, icon: "KEY", primary: false },
      { label: "View in Autodesk Inventor", url: project.inventorUrl, icon: "CAD", primary: false, download: "multifunctional-keychain-autodesk-inventor.ipt" },
      { label: "View Full Report", url: project.reportUrl, icon: "PDF", primary: true }
    ],
    ecowaste: [
      { label: "View Full Report", url: project.reportUrl, icon: "PDF", primary: true },
      { label: "View Presentation", url: project.presentationUrl, icon: "PDF", primary: false },
      { label: "Download Dashboard (.pbix)", url: project.dashboardUrl, icon: "PBI", primary: false, download: "EcoWaste-PowerBI-Dashboard-ZiQian.pbix" }
    ],
    construction: []
  };

  return (definitions[projectKey] || []).filter((action) => {
    const url = action.url?.trim();
    return url && url !== "#" && !url.includes("REPLACE-WITH");
  });
}

function getProjectCardAction(project) {
  // The IoT case study embeds its demo directly after the role metadata, so its
  // project-specific media plan intentionally omits a duplicate grid shortcut.
  if (getProjectKey(project) === "greenhouse") return null;

  const primaryAction = getProjectActionDefinitions(project).find((action) => action.primary);
  if (!primaryAction) return null;

  if (primaryAction.label.startsWith("Play Game")) {
    return {
      label: "PLAY",
      url: primaryAction.url,
      ariaLabel: `Play ${project.title}`
    };
  }

  if (primaryAction.label.startsWith("Try App")) {
    return {
      label: "TRY APP",
      url: primaryAction.url,
      ariaLabel: `Try ${project.title} app`
    };
  }

  if (primaryAction.label.startsWith("Watch Demo")) {
    return {
      label: "WATCH DEMO",
      url: primaryAction.url,
      ariaLabel: `Watch ${project.title} demo`
    };
  }

  return null;
}

function initProjectCardActions() {
  $$("[data-project-card]").forEach((card) => {
    const project = PROJECTS[card.dataset.openProject];
    const action = project ? getProjectCardAction(project) : null;
    let link = $(".project-play-button", card);

    if (!action) {
      link?.remove();
      return;
    }

    if (!link) {
      link = document.createElement("a");
      link.className = "game-chip project-play-button";
      const statusBadge = $(".status-badge", card);
      if (statusBadge) {
        statusBadge.insertAdjacentElement("afterend", link);
      } else {
        card.prepend(link);
      }
    }

    link.href = action.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = action.label;
    link.setAttribute("aria-label", action.ariaLabel);
  });
}

function createProjectActionButtons(project, compact = false) {
  const actions = getProjectActionDefinitions(project);
  if (!actions.length) return "";

  return actions.map((action) => {
    const className = action.primary ? "modal-play-button btn-primary" : "modal-github-button btn-secondary";
    const download = action.download ? ` download="${escapeHtml(action.download)}"` : "";
    return `
      <a class="modal-action-button ${className}${compact ? " project-quick-action" : ""}" href="${escapeHtml(action.url)}" target="_blank" rel="noopener noreferrer"${download} data-modal-action>
        <span aria-hidden="true">${action.icon}</span>
        ${escapeHtml(action.label)}
      </a>
    `;
  }).join("");
}

function createProjectTopNavigation(project) {
  const actions = createProjectActionButtons(project, true);
  return `
    <nav class="project-modal-top-nav" aria-label="Project quick links">
      <a class="project-all-link" href="projects.html">&larr; All Projects</a>
      ${actions ? `<div class="project-quick-actions">${actions}</div>` : ""}
    </nav>
  `;
}

function createProjectBottomActions(project) {
  const projectKey = getProjectKey(project);
  const actions = createProjectActionButtons(project);
  if (!actions) return "";

  let supportingCopy = "";
  if (projectKey === "mcfast") {
    supportingCopy = `<p class="modal-link-helper modal-helper-text">Note: This app is hosted on a free tier and may take 30&ndash;60 seconds to load if it has been inactive. If you see a 'Zzzz' sleep screen, click to wake it up and wait briefly.</p>`;
  }
  if (projectKey === "greenhouse") {
    supportingCopy += `<p class="modal-coauthor-note">Co-authored with Li Heng as a joint project submission.</p>`;
  }
  if (projectKey === "ecowaste") {
    supportingCopy += `<p class="modal-link-helper modal-helper-text">The report and presentation open in a new tab. The dashboard is a Power BI <code>.pbix</code> file, so it downloads and needs Power BI Desktop to open.</p>`;
  }

  const helper = projectKey === "keychain"
    ? "Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime."
    : "Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.";

  return `
    <section class="modal-action-block project-bottom-actions" aria-label="Project links">
      <div class="modal-actions modal-action-row${getProjectActionDefinitions(project).length >= 3 ? " modal-action-row-triple" : ""}">
        ${actions}
      </div>
      ${supportingCopy}
      <p class="modal-link-helper modal-helper-text">${helper}</p>
    </section>
  `;
}

function getProjectCategoryLabel(project) {
  return project.category === "software" ? "Software Project" : "Hardware Project";
}

function createProjectPreviewCard(projectKey, direction) {
  const targetProject = PROJECTS[projectKey];
  if (!targetProject) return "";

  const isPrevious = direction === "previous";
  const directionLabel = isPrevious ? "Previous" : "Next";
  const arrow = isPrevious ? "&larr;" : "&rarr;";
  const title = escapeHtml(targetProject.title);

  return `
    <div class="project-sequence-item project-sequence-${direction}">
      <p class="modal-eyebrow">${directionLabel} Project</p>
      <button class="project-next-card project-${direction}-card" type="button" data-project-nav="${escapeHtml(projectKey)}" aria-label="View ${direction} project: ${escapeHtml(targetProject.title)}">
        <span class="project-next-image"><img src="${escapeHtml(targetProject.image)}" width="${targetProject.imageWidth}" height="${targetProject.imageHeight}" alt="" loading="lazy" decoding="async"></span>
        <span class="project-next-copy">
          <span class="project-category-label">${escapeHtml(getProjectCategoryLabel(targetProject))}</span>
          <strong>${title}</strong>
          <span class="project-next-teaser">${escapeHtml(targetProject.description)}</span>
        </span>
        <span class="project-next-arrow" aria-hidden="true">${arrow}</span>
      </button>
    </div>
  `;
}

function createProjectSequenceNavigation(project) {
  const projectKey = getProjectKey(project);
  const previousKey = getAdjacentProjectKey(projectKey, -1);
  const nextKey = getAdjacentProjectKey(projectKey, 1);

  return `
    <section class="project-next-section" aria-label="Previous and next projects">
      <div class="project-sequence-grid">
        ${createProjectPreviewCard(previousKey, "previous")}
        ${createProjectPreviewCard(nextKey, "next")}
      </div>
    </section>
  `;
}

function decorateProjectModal(root, project) {
  const article = root.querySelector(".project-modal-body, .modal-project-layout");
  if (!article) return;

  article.querySelectorAll(".modal-action-block").forEach((block) => block.remove());

  const projectKey = getProjectKey(project);
  if (projectKey === "construction") article.querySelector(".modal-video-frame")?.remove();

  const topAnchor = article.querySelector(".modal-role-section")
    || article.querySelector(".modal-status-callout")
    || article.querySelector(".modal-case-header, .modal-project-hero");
  topAnchor?.insertAdjacentHTML("afterend", createProjectTopNavigation(project));

  article.insertAdjacentHTML("beforeend", createProjectBottomActions(project));
  article.insertAdjacentHTML("beforeend", createProjectSequenceNavigation(project));
}

function updateProjectEdgeNavigation(modal, projectKey) {
  const previousKey = getAdjacentProjectKey(projectKey, -1);
  const nextKey = getAdjacentProjectKey(projectKey, 1);
  const previousButton = $("[data-project-prev]", modal);
  const nextButton = $("[data-project-next]", modal);

  if (previousButton && previousKey) {
    previousButton.setAttribute("aria-label", `Previous project: ${PROJECTS[previousKey].title}`);
    previousButton.title = PROJECTS[previousKey].title;
  }
  if (nextButton && nextKey) {
    nextButton.setAttribute("aria-label", `Next project: ${PROJECTS[nextKey].title}`);
    nextButton.title = PROJECTS[nextKey].title;
  }
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
      <p class="modal-link-helper">Opens in a new tab &mdash; this portfolio stays open here, so you can switch back anytime.</p>
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

    const syncIntrinsicAspect = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      video.style.setProperty("--modal-video-aspect", `${video.videoWidth} / ${video.videoHeight}`);
    };
    if (video.readyState >= 1) syncIntrinsicAspect();
    else video.addEventListener("loadedmetadata", syncIntrinsicAspect, { once: true });

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
  let animationFrame = null;

  const render = () => {
    current.x += (pointer.x - current.x) * 0.15;
    current.y += (pointer.y - current.y) * 0.15;
    cursor.style.opacity = visible ? "1" : "0";
    cursor.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
    animationFrame = visible ? requestAnimationFrame(render) : null;
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      visible = true;
      if (!animationFrame) animationFrame = requestAnimationFrame(render);
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
  let lastDrawTime = 0;
  const pointer = { x: 0, y: 0, active: false };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(36, Math.min(72, Math.floor(width / 18)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22
    }));
  };

  const draw = (time = 0) => {
    if (!prefersReducedMotion && time - lastDrawTime < 1000 / 30) {
      animationFrame = requestAnimationFrame(draw);
      return;
    }
    lastDrawTime = time;
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
      let connections = 0;
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
          connections += 1;
          if (connections >= 3) break;
        }
      }
    }

    context.globalAlpha = 1;
    context.restore();
    animationFrame = prefersReducedMotion || document.body.classList.contains("low-performance")
      ? null
      : requestAnimationFrame(draw);
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

    if (lowPerformance && time - (render.lastRendered || 0) < 1000 / 20) {
      animationFrame = requestAnimationFrame(render);
      return;
    }
    render.lastRendered = time;

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

  $$(".category-card").forEach((card) => {
    let frame = null;
    const maxTilt = 5;

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

function safeInit(fn) {
  try {
    fn();
  } catch (error) {
    console.error(`${fn.name || "init function"} failed to initialize:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeInit(setNavHeightVar);
  let navResizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(navResizeTimer);
    navResizeTimer = window.setTimeout(() => requestAnimationFrame(() => safeInit(() => setNavHeightVar(true))), 150);
  });
  window.addEventListener("load", () => {
    requestAnimationFrame(() => safeInit(() => setNavHeightVar(true)));
    safeInit(correctInitialHashOffset);
  });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      safeInit(() => setNavHeightVar(true));
      safeInit(correctInitialHashOffset);
    });
  }

  safeInit(initCinematicIntro);
  safeInit(initHeroEntrance);
  const startCinematicCanvas = () => {
    safeInit(initCinematicCanvas);
    safeInit(initAmbientParallax);
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(startCinematicCanvas, { timeout: 800 });
  } else {
    window.setTimeout(startCinematicCanvas, 120);
  }
  safeInit(initPageTransitions);
  safeInit(initSmoothAnchors);
  safeInit(initMobileMenu);
  safeInit(initAutoHideNav);
  safeInit(initActiveMenuLinks);
  safeInit(initHeadingWordReveals);
  safeInit(initRevealAnimations);
  safeInit(initSceneDirector);
  safeInit(initProjectTabs);
  safeInit(initProjectCardActions);
  safeInit(initProjectModal);
  safeInit(initAboutModal);
  safeInit(initImageLightbox);
  safeInit(initContactForm);
  safeInit(initStatCounters);
  safeInit(initPhotoTilt);
  safeInit(initCustomCursor);
  safeInit(initNeuralCanvas);
  safeInit(initCinematicInteractions);
  safeInit(initMagneticButtons);
  safeInit(initButtonRipples);
  requestAnimationFrame(() => safeInit(correctInitialHashOffset));
});
