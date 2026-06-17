const PROJECTS = {
  piano: {
    title: "Alien Piano Tiles",
    eyebrow: "Software Project",
    media: {
      type: "video",
      src: "assets/videos/piano-tiles-gameplay.mp4",
      poster: "images/piano-tiles-poster.svg",
      label: "Alien Piano Tiles gameplay video"
    },
    role: ["Solo Software Project", "Game Developer / Front-End Developer"],
    roleText:
      "I designed and developed the game logic, tile spawning system, keyboard input controls, scoring system, streak multiplier, lives system, and game state flow.",
    sections: [
      {
        heading: "The Problem",
        body: [
          "Many modern games become complex, competitive, and time-consuming. I wanted to create a simple browser game that feels fun, nostalgic, and quick to play during a break.",
          "The challenge was making the game slightly difficult but still simple enough for players to understand immediately."
        ]
      },
      {
        heading: "What I Built",
        body: [
          "I built a rhythm game where piano tiles fall into different lanes and the player presses the correct key at the right time. Missing tiles costs lives, while accurate hits build score and streaks.",
          "The game includes tile spawning, keyboard input detection, scoring, streak multipliers, lives, pause control, and game-over logic."
        ]
      },
      {
        heading: "Key Features",
        list: [
          "Rhythm gameplay inspired by classic piano tile games",
          "Alien-themed visual style",
          "Keyboard controls using D, F, J, and K",
          "Randomized tile spawning",
          "Increasing speed for rising difficulty",
          "Scoring with streak multiplier rewards",
          "Three-lives challenge system",
          "Clear feedback for hits, misses, score changes, and states"
        ]
      },
      {
        heading: "Technologies Used",
        body: [
          "Built with HTML, CSS, vanilla JavaScript, and HTML5 Canvas.",
          "JavaScript powers the gameplay logic, while Canvas renders falling tiles, effects, lane boards, particles, and animations in real time."
        ],
        tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"]
      },
      {
        heading: "Outcome",
        body: [
          "The final result is a simple but engaging rhythm game with increasing difficulty, responsive controls, scoring feedback, and a nostalgic gameplay style."
        ]
      }
    ],
    repo: "gohziqian1234-cmyk/piano-tiles-alien-",
    actions: [
      ["View on GitHub", "https://github.com/gohziqian1234-cmyk/piano-tiles-alien-", "secondary", "&lt;/&gt;"],
      ["Try The Game", "https://gohziqian1234-cmyk.github.io/piano-tiles-alien-/", "primary", "Play"]
    ]
  },
  erebus: {
    title: "Erebus-7: Parasite Protocol",
    eyebrow: "Software Project",
    media: {
      type: "video",
      src: "assets/videos/erebus-7-gameplay.mp4",
      poster: "images/project-erebus-7.png",
      label: "Erebus-7 Parasite Protocol gameplay video"
    },
    role: ["Solo Software Project", "Game Developer / Narrative Systems Developer"],
    roleText:
      "I designed and developed the core gameplay systems, including player progression, detection logic, difficulty scaling, resource management, story flow, and game state control.",
    sections: [
      {
        heading: "The Problem",
        body: [
          "Among Us is usually multiplayer, but not every player wants to play online with random people or depend on friends being available.",
          "This project redesigns an Among Us-style experience as a single-player horror stealth game built around solo gameplay, tasks, decisions, and suspense."
        ]
      },
      {
        heading: "What I Built",
        body: [
          "Players take the role of an alien parasite controlling a human host inside a space station. The goal is to infect crew members, avoid detection, and reach SELENE, the station AI.",
          "The game includes enemy patrols, detection systems, infection mechanics, clone respawn, difficulty levels, tactical map, story scenes, save/load, tutorials, and multiple chapters."
        ]
      },
      {
        heading: "Key Features",
        list: [
          "Single-player horror stealth gameplay",
          "Branching narrative progression",
          "Detection bar for guards and cameras",
          "Easy, Medium, and Hard difficulty modes",
          "Clone respawn system",
          "Tactical map with rooms, danger, objectives, and routes",
          "Story scenes and blackbox logs",
          "Sound design with alarms, footsteps, whispers, scanners, and horror music"
        ]
      },
      {
        heading: "Technologies Used",
        body: [
          "Built with HTML, CSS, JavaScript, and HTML5 Canvas.",
          "Canvas renders the map, rooms, characters, vision cones, lighting, particles, objectives, and animations in real time."
        ],
        tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"]
      },
      {
        heading: "Outcome",
        body: [
          "The outcome is a playable horror game with a full story theme, multiple levels, enemies, objectives, sound, and a clear mission flow."
        ]
      }
    ],
    repo: "gohziqian1234-cmyk/erebus-7",
    actions: [
      ["View on GitHub", "https://github.com/gohziqian1234-cmyk/erebus-7", "secondary", "&lt;/&gt;"],
      ["Try The Game", "https://gohziqian1234-cmyk.github.io/erebus-7/", "primary", "Play"]
    ]
  },
  wheelchair: {
    title: "Motor-Assisted Wheelchair Support Prototype",
    eyebrow: "Hardware Project",
    media: {
      type: "image",
      src: "images/project-smart-wheelchair.svg",
      label: "Wireframe graphic of a motor-assisted wheelchair support prototype"
    },
    role: ["Team Project", "Technical Lead / Prototype Developer"],
    roleText:
      "I led the main technical development and refinement of the prototype, including hardware integration, Arduino control logic, testing, weakness identification, and final prototype refinement.",
    sections: [
      {
        heading: "Overview",
        body: [
          "An assistive hardware prototype designed to support self-propelled wheelchair users when travelling on slopes. The system combines motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control."
        ]
      },
      {
        heading: "Problem / Brief",
        body: [
          "Self-propelled wheelchair users face greater difficulty when moving up slopes because more physical effort is required than on flat ground. Moving down slopes can also be harder to control.",
          "This project aimed to create a low-cost assistive prototype that demonstrates motor assistance, user-adjustable speed control, and obstacle alert feedback."
        ]
      },
      {
        heading: "Key Features",
        list: [
          "DC motor assistance to support wheelchair movement",
          "Potentiometer speed control for adjustable motor output",
          "Ultrasonic sensor for obstacle detection",
          "Buzzer alert when an object is detected",
          "Switch control for manual system on/off",
          "Prototype refinement through testing"
        ]
      },
      {
        heading: "Testing & Evidence",
        table: [
          ["Test", "What Was Checked", "Observation", "What This Proved"],
          ["Motor Assist Test", "Whether the DC motor could rotate and support forward movement", "Motor spun consistently when switched on and adjusted", "Core drive function was operational"],
          ["Speed Control Test", "Whether the potentiometer could adjust motor output", "Motor speed changed when the knob was turned", "User-adjustable speed control worked"],
          ["Obstacle Detection Test", "Whether the ultrasonic sensor could detect nearby objects", "Buzzer activated when an object was placed in front", "Obstacle alert function was working"],
          ["Switch Control Test", "Whether the user could turn the system on and off", "Motor and buzzer stopped when the switch was off", "User had direct control"]
        ]
      },
      {
        heading: "Future Improvements",
        body: [
          "Future versions require a higher-torque motor, a dedicated battery system, stronger mounting, and a slope detection sensor to adjust assistance more automatically."
        ],
        tags: ["Arduino", "DC Motor", "Ultrasonic Sensor", "Potentiometer", "Buzzer", "Tinkercad"]
      }
    ],
    actions: [
      ["View Project Slides (PDF)", "assets/reports/wheelchair-prototype-slides.pdf", "secondary", "PDF"],
      ["View Circuit in Tinkercad", "https://www.tinkercad.com/things/3lyqhQ6I2kl-terrific-wolt-kup/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard%2Fdesigns%2Fall", "secondary", "Tool"],
      ["Watch Demo", "assets/videos/wheelchair-prototype-demo.mp4", "primary", "Play"]
    ],
    triple: true
  },
  plant: {
    title: "IoT-Based Smart Plant Monitoring System",
    eyebrow: "Hardware Project",
    media: {
      type: "image",
      src: "images/project-smart-greenhouse.svg",
      label: "IoT plant monitoring system thumbnail"
    },
    role: ["Team Project", "Co-developer / IoT System Developer"],
    roleText:
      "I contributed to sensor integration, Arduino logic, Raspberry Pi data handling, MariaDB database implementation, Flask web monitoring, testing, troubleshooting, and system documentation.",
    sections: [
      {
        heading: "Overview",
        body: [
          "An automated indoor farming monitoring system designed to track plant-growing conditions in real time. The system monitors temperature, light intensity, and water level, then provides alerts, automatic LED control, database storage, and web-based monitoring.",
          "This project connects hardware, software, database management, and web development into one complete IoT solution for sustainable indoor farming."
        ]
      },
      {
        heading: "The Problem",
        body: [
          "Indoor farming can support food security, but plant-growing conditions still need stable temperature, sufficient light, and enough water.",
          "Manual monitoring can cause delayed responses, inconsistent plant care, inefficient resource use, and weaker plant growth."
        ]
      },
      {
        heading: "What I Built",
        list: [
          "Grove temperature sensor for the 20&deg;C to 35&deg;C suitable range",
          "Grove light sensor for ambient light intensity",
          "Ultrasonic sensor for water level estimation",
          "Rotary angle sensor for manual LED brightness control",
          "LED, buzzer, and 16x2 LCD display for feedback",
          "Arduino collection and output control",
          "Raspberry Pi processing, MariaDB storage, and Flask web display"
        ]
      },
      {
        heading: "System Architecture",
        diagram: "images/iot-plant-monitoring-architecture.png",
        body: [
          "Sensor readings flow from plant conditions into Arduino control, Raspberry Pi data handling, MariaDB storage, and Flask web monitoring."
        ]
      },
      {
        heading: "Testing & Results",
        list: [
          "Buzzer stayed off when conditions were suitable",
          "Buzzer activated when temperature, light, or water level was unsuitable",
          "LED brightness increased in darker conditions",
          "LED brightness decreased in brighter conditions",
          "Manual LED control overrode automatic adjustment"
        ],
        tags: ["Arduino", "Raspberry Pi", "IoT", "Sensors", "MariaDB", "Flask", "Python", "Sustainability"]
      },
      {
        heading: "Outcome",
        body: [
          "The final system monitored temperature, light intensity, and water level in real time. It could adjust LED brightness, alert users, store sensor data, and display readings through a Flask web interface."
        ]
      }
    ],
    actions: [
      ["View Full Report", "assets/reports/iot-smart-plant-monitoring-report.pdf", "secondary", "PDF"],
      ["Watch Demo", "assets/videos/iot-smart-plant-monitoring-demo.mp4", "primary", "Play"]
    ],
    coauthor: "Co-authored with Li Heng as a joint project submission."
  }
};

export function initProjectModal() {
  const modal = document.querySelector("[data-modal-root]");
  const content = document.querySelector("[data-modal-content]");
  if (!modal || !content) return;

  let lastFocus = null;

  const open = (key) => {
    const project = PROJECTS[key];
    if (!project) return;

    lastFocus = document.activeElement;
    content.innerHTML = renderProject(project);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector("[data-modal-close]")?.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modal.querySelectorAll("video").forEach((video) => video.pause());
    content.innerHTML = "";
    lastFocus?.focus?.();
  };

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open-project]");
    if (opener) {
      open(opener.dataset.openProject);
      return;
    }

    if (event.target.closest("[data-modal-close]")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });
}

function renderProject(project) {
  return `
    <article class="modal-body">
      <header class="modal-header">
        <p class="modal-eyebrow">${project.eyebrow}</p>
        <h2 id="modal-title" class="modal-title">${project.title}</h2>
      </header>
      ${renderMedia(project.media)}
      ${renderRole(project.role, project.roleText)}
      ${project.sections.map(renderSection).join("")}
      ${project.repo ? `<p class="modal-repo">${project.repo}</p>` : ""}
      <div class="modal-actions${project.triple ? " triple" : ""}">
        ${project.actions.map(renderAction).join("")}
      </div>
      ${project.coauthor ? `<p class="modal-coauthor">${project.coauthor}</p>` : ""}
      <p class="modal-helper">Opens in a new tab - this portfolio stays open here, so you can switch back anytime.</p>
    </article>
  `;
}

function renderMedia(media) {
  if (!media) return "";
  if (media.type === "video") {
    return `
      <div class="modal-media">
        <video class="modal-video" controls poster="${media.poster}" preload="metadata" aria-label="${media.label}">
          <source src="${media.src}" type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    `;
  }

  return `
    <div class="modal-media">
      <img src="${media.src}" alt="${media.label}" loading="lazy" />
    </div>
  `;
}

function renderRole(role, text) {
  if (!role) return "";
  return `
    <section class="modal-section modal-role-section">
      <div class="modal-role-meta">
        <div class="role-meta-item">
          <span class="role-meta-label">Project Type</span>
          <span class="role-meta-value">${role[0]}</span>
        </div>
        <div class="role-meta-item">
          <span class="role-meta-label">My Role</span>
          <span class="role-meta-value">${role[1]}</span>
        </div>
      </div>
      <p>${text}</p>
    </section>
  `;
}

function renderSection(section) {
  return `
    <section class="modal-section">
      <h3 class="modal-section-heading">${section.heading}</h3>
      ${section.body ? section.body.map((paragraph) => `<p>${paragraph}</p>`).join("") : ""}
      ${section.list ? `<ul class="modal-feature-list">${section.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${section.diagram ? `<div class="modal-diagram"><img src="${section.diagram}" alt="${section.heading} diagram" loading="lazy" /></div>` : ""}
      ${section.table ? renderTable(section.table) : ""}
      ${section.tags ? `<div class="modal-tech-tags">${section.tags.map((tag) => `<span class="tech-tag">${tag}</span>`).join("")}</div>` : ""}
    </section>
  `;
}

function renderTable(rows) {
  const [head, ...body] = rows;
  return `
    <div class="modal-table-wrapper">
      <table class="modal-data-table">
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>
          ${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAction([label, href, style, icon]) {
  return `
    <a class="modal-button ${style}" href="${href}" target="_blank" rel="noopener noreferrer">
      <span>${icon}</span>
      ${label}
    </a>
  `;
}

