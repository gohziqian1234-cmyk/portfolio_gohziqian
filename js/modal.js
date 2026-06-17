/* Project modal data and one clean lightbox system. */

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
      "I designed and developed the game logic, tile spawning system, keyboard input controls, scoring system, streak multiplier, lives system, and game state flow. I also worked on the visual feedback, difficulty progression, testing, and debugging to make the game feel responsive and playable.",
    sections: [
      {
        heading: "The Problem",
        body: [
          "Nowadays, games are becoming more complex, competitive, and time-consuming. Many people lose the original feeling of playing games for fun. Instead, they start playing mainly to win, which can make them feel more stressed or frustrated.",
          "I wanted to create a simple browser game that is fun, interesting, and nostalgic. The target users are mainly students, polytechnic students, young adults, and the elderly who want a quick way to relax, reduce stress, and enjoy a short nostalgic game during their break time. Adults can also show their children what games were like when they were young, which can help create a bond between them.",
          "The challenge of this project was to make the game slightly difficult but still simple at the same time, so users could understand it immediately and feel motivated to keep playing."
        ]
      },
      {
        heading: "What I Built",
        body: [
          "I built a rhythm game where piano tiles fall into different lanes, and the player needs to press the correct key at the right time. If the player fails to do so, they lose one life and lose the game after missing more than two times.",
          "The game includes tile spawning, keyboard input detection, scoring, streak multipliers, lives, pause control, and game-over logic."
        ]
      },
      {
        heading: "Key Features",
        list: [
          "Simple rhythm gameplay inspired by classic piano tile games",
          "Alien-themed visual style for a unique look and feel",
          "Keyboard controls using the D, F, J, and K keys",
          "Randomized tile spawning across different lanes",
          "Speed that steadily increases for rising difficulty",
          "Scoring system with streak multiplier rewards",
          "Three-lives system for added challenge",
          "Clear visual feedback for hits, misses, score changes, and game states"
        ]
      },
      {
        heading: "Technologies Used",
        body: [
          "Built with HTML, CSS, vanilla JavaScript, and HTML5 Canvas.",
          "<strong>HTML</strong> structured the game page, including the canvas, start screen, game-over screen, and scoreboard display.",
          "<strong>CSS</strong> styled the purple alien theme, including effects, buttons, and layout.",
          "<strong>JavaScript</strong> powered the gameplay logic, including falling tiles, keyboard and touch input, scoring, combo system, lives, levels, collision detection, and game-over handling.",
          "<strong>HTML5 Canvas</strong> rendered the live graphics, including falling tiles, alien effects, the lane board, stars, particles, and animations."
        ],
        tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"]
      },
      {
        heading: "Challenges and How I Overcame Them",
        body: [
          "One challenge was making the game feel fair as the tiles became faster. Too strict a timing window felt frustrating; too loose made the game too easy and less engaging. I adjusted the hit-detection window and added clearer visual feedback so players could understand exactly when they hit or missed a tile.",
          "Another challenge was managing different game states: ready, playing, paused, and game over. To avoid logic errors, I organized the game around a clear state system so each action only fires when the game is in the correct state."
        ]
      },
      {
        heading: "Skills Demonstrated",
        list: [
          "JavaScript programming",
          "HTML5 Canvas rendering",
          "Keyboard event handling",
          "Game loop logic",
          "Game state management",
          "Scoring and multiplier logic",
          "Debugging and testing",
          "User interface feedback"
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The final result is a simple but engaging rhythm game with increasing difficulty, responsive controls, scoring feedback, and a nostalgic gameplay style. This project helped me understand how real-time interaction, game loops, and user feedback shape the overall player experience."
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
      "I designed and developed the core gameplay systems, including player progression, detection logic, difficulty scaling, resource management, story flow, and game state control. I also worked on the narrative structure, interaction design, testing, and balancing so that the game felt tense but still fair for the player.",
    sections: [
      {
        heading: "The Problem",
        body: [
          "Among Us is usually a multiplayer game, but not every player wants to play with random people online. Some do not have friends to play with, or simply prefer to play alone without depending on anyone else.",
          "This project set out to redesign the Among Us-style experience as a single-player game, built around solo gameplay, tasks, decision-making, and suspense rather than real players. The challenge was making the game genuinely interesting without any multiplayer interaction to fall back on."
        ]
      },
      {
        heading: "What I Built",
        body: [
          "I built a single-player social-horror stealth game called <strong>Erebus-7: Parasite Protocol</strong>. Players take on the role of an alien parasite confined within a space station, controlling a human host who must infect crew members, evade detection, and gradually take over the station.",
          "The primary objective is to navigate through the station's various sections and reach SELENE, the station's AI. To succeed, players must complete tasks, use infected hosts as allies, avoid guards and surveillance systems, and survive until the final chapter at the AI Core.",
          "The game features movement mechanics, enemy patrols, detection systems, infection mechanics, a clone respawn option, varying difficulty levels, narrative scenes, sound effects, a tactical map, tutorials, save/load functionality, and multiple chapters."
        ]
      },
      {
        heading: "Key Features",
        list: [
          "Single-player horror stealth gameplay",
          "Branching storyline with narrative progression",
          "Detection bar that rises when guards or cameras spot the player",
          "Easy, Medium, and Hard difficulty modes",
          "Clone system letting the player respawn at a planted backup body",
          "Tactical map showing rooms, people, danger, objectives, and routes",
          "Distinct station zones: Crew Quarters, Med Bay, Security Hub, Command Deck, and AI Core",
          "Story scenes and blackbox logs revealing what happened on the station",
          "Sound design with alarms, footsteps, whispers, scanner sounds, and horror music",
          "Pause menu, settings, save/load, tutorial, and game-over screens"
        ]
      },
      {
        heading: "Technologies Used",
        body: [
          "Built with HTML, CSS, JavaScript, and HTML5 Canvas.",
          "<strong>HTML</strong> established the framework of the game page: the canvas, intro screen, tutorial, HUD, pause menu, tactical map, story scenes, and game-over screens.",
          "<strong>CSS</strong> shaped the visual style, using a dark horror aesthetic in teal, red, green, and blue tones to match the space station and parasite theme.",
          "<strong>JavaScript</strong> powered the game's functionality, including player movement, enemy AI, the detection bar, infection system, abilities, map system, story progression, sound, save/load, and game rules.",
          "<strong>HTML5 Canvas</strong> rendered the live game environment, including the map, rooms, characters, vision cones, effects, lighting, particles, objectives, and animations in real time."
        ],
        tags: ["HTML", "CSS", "JavaScript", "HTML5 Canvas"]
      },
      {
        heading: "Challenges and Solutions",
        body: [
          "One challenge was creating a genuinely scary atmosphere rather than just a dark one. Early on, the game felt too simplistic because players were just navigating a map. To fix this, I added more detailed room art, horror effects, sound design, story scenes, and frightening events triggered when the player entered certain areas.",
          "Another challenge was balancing the detection system. If it filled too slowly, the game became too easy; too quickly, and it felt unfair. I addressed this by introducing difficulty levels and tuning the detection range, speed, and cooldown for each mode."
        ]
      },
      {
        heading: "Skills Demonstrated",
        list: [
          "HTML, CSS, and JavaScript programming",
          "HTML5 Canvas rendering",
          "Game loop logic",
          "Player movement and collision detection",
          "Enemy AI and patrol behaviour",
          "Detection and stealth systems",
          "Game state management",
          "UI and HUD design",
          "Sound and music handling in the browser",
          "Story writing and mission flow",
          "Save/load system",
          "Debugging and playtesting",
          "Git and GitHub Pages publishing"
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The outcome is a playable horror game with a full story theme, multiple levels, enemies, objectives, sound, and a clear mission flow.",
          "This project opened my eyes to how much work goes into making a game actually feel good. Gameplay is so much more than controls and rules. A good game also needs feedback, sound, pacing, story, balance, and clear instructions for the player.",
          "All in all, Erebus-7: Parasite Protocol became much more than a simple prototype: a full-fledged browser game, playable on the web and shareable with others."
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
      "I led the main technical development and refinement of the prototype. My contribution included planning the solution, building and integrating the hardware components, developing the Arduino control logic, testing the system, identifying design weaknesses, and refining the final prototype.",
    sections: [
      {
        heading: "Overview",
        body: [
          "An assistive hardware prototype designed to support self-propelled wheelchair users when travelling on slopes. The system combines motor assistance, adjustable speed control, ultrasonic obstacle detection, buzzer feedback, and switch control to reduce user effort and improve safety awareness."
        ]
      },
      {
        heading: "Problem / Brief",
        body: [
          "Self-propelled wheelchair users face greater difficulty when moving up slopes because more physical effort is required compared to flat ground. Moving down slopes can also be harder to control and may increase the risk of collision, tipping, or falling.",
          "This project aimed to create a low-cost assistive prototype that demonstrates three core functions: motor assistance, user-adjustable speed control, and obstacle alert feedback."
        ]
      },
      {
        heading: "What I Built",
        body: [
          "The prototype uses a DC motor to support forward movement, a potentiometer to control motor speed, an ultrasonic sensor to detect nearby obstacles, a buzzer to alert the user, and a switch to turn the system on or off.",
          "The goal was not to build a commercial wheelchair product, but to demonstrate a practical assistive concept that could reduce user effort and improve safety awareness."
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
        heading: "Design Process",
        body: [
          "The project started with Crazy 8 brainstorming to generate multiple possible solutions. The team then used a value-effort map to compare ideas and selected the motor-assist wheelchair concept because it provided high user value while still being achievable within the project constraints."
        ]
      },
      {
        heading: "Testing and Evidence",
        table: [
          ["Test", "What Was Checked", "Observation", "What This Proved"],
          ["Motor Assist Test", "Whether the DC motor could rotate and support forward movement", "Motor spun consistently when the system was switched on and the potentiometer was adjusted", "Core drive function was operational"],
          ["Speed Control Test", "Whether the potentiometer could adjust motor output", "Motor speed increased or decreased when the knob was turned", "User-adjustable speed control worked"],
          ["Obstacle Detection Test", "Whether the ultrasonic sensor could detect nearby objects", "Buzzer activated when an object was placed in front of the sensor", "Obstacle alert function was working"],
          ["Switch Control Test", "Whether the user could turn the system on and off", "Motor and buzzer stopped when the switch was turned off", "User had direct control and could cut off the system when needed"],
          ["Feedback Comparison", "Whether LED or buzzer feedback was more useful", "Buzzer feedback was clearer and more noticeable than the LED", "Audio feedback was more practical, so the LED was removed"],
          ["Sensor Placement Test", "Whether ultrasonic sensor placement affected detection", "Sensor placement was adjusted after testing", "Placement affected detection quality and needed refinement"]
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The final prototype demonstrated a functional assistive concept that combines motor support, speed control, and obstacle alert feedback. The strongest part of this project was the refinement process: removing unnecessary LED feedback, adding manual switch control, and improving ultrasonic sensor placement based on testing.",
          "Each decision directly improved the user experience: simpler feedback, safer control, and more reliable obstacle detection without adding unnecessary cost or complexity."
        ]
      },
      {
        heading: "Future Improvements",
        body: [
          "Future versions require a higher-torque motor for stronger slope support, a dedicated battery system for longer operation, a stronger mounting structure, and a slope detection sensor to adjust motor assistance more automatically."
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
      "I contributed to the development of the IoT plant monitoring system, including sensor integration, Arduino logic, Raspberry Pi data handling, MariaDB database implementation, Flask web monitoring, testing, troubleshooting, and system documentation.",
    sections: [
      {
        heading: "Overview",
        body: [
          "An automated indoor farming monitoring system designed to track plant-growing conditions in real time. The system monitors temperature, light intensity, and water level using sensors, then provides alerts, automatic LED control, database storage, and web-based monitoring.",
          "This project connects hardware, software, database management, and web development into one complete IoT solution for sustainable indoor farming."
        ]
      },
      {
        heading: "The Problem",
        body: [
          "Singapore has limited land for agriculture and aims to strengthen food security by increasing local food production. Indoor farming and vertical farming can help, but they require stable growing conditions: suitable temperature, sufficient light, and enough water.",
          "In many indoor farming setups, these conditions are still checked manually. This can lead to delayed responses, inconsistent plant care, inefficient resource use, and weaker plant growth. Vertical farming can also create uneven lighting, where upper plants block light from reaching lower plants.",
          "This project was built to reduce manual monitoring by using IoT technology to provide real-time feedback, automatic light adjustment, and alerts when plant conditions are unsuitable."
        ]
      },
      {
        heading: "What I Built",
        body: ["I built an automated plant monitoring and alert system that uses sensors to check whether the plant environment is suitable for growth. The system uses:"],
        list: [
          "A Grove temperature sensor to monitor whether the temperature is within the 20&deg;C-35&deg;C suitable range",
          "A Grove light sensor to measure ambient light intensity",
          "An ultrasonic sensor to estimate water level by measuring distance to the water surface",
          "A rotary angle sensor to allow manual LED brightness control",
          "An LED to simulate grow-light adjustment",
          "A buzzer to alert users when conditions are not suitable",
          "A 16x2 LCD display to show real-time readings and status",
          "Arduino to collect sensor data and control outputs",
          "Raspberry Pi to receive and process data",
          "MariaDB to store sensor readings",
          "Flask to display recorded data on a web interface"
        ]
      },
      {
        heading: "Key Features",
        list: [
          "Real-time temperature monitoring",
          "Light intensity monitoring",
          "Water level detection",
          "Automatic LED brightness adjustment",
          "Manual LED brightness override",
          "LCD display for live plant condition feedback",
          "Buzzer alert for unsuitable conditions",
          "Serial communication between Arduino and Raspberry Pi",
          "MariaDB database storage",
          "Flask web interface for monitoring recorded data"
        ]
      },
      {
        heading: "System Architecture",
        diagram: "images/iot-plant-monitoring-architecture.png",
        body: [
          "The Arduino collects data from the temperature sensor, light sensor, ultrasonic sensor, and rotary angle sensor. It processes the readings, controls the LED and buzzer, and displays the status on the LCD screen.",
          "The processed data is then sent to the Raspberry Pi through serial communication. The Raspberry Pi stores the readings in a MariaDB database and displays the data through a Flask web page, allowing users to view plant condition data more clearly and use it for future analysis."
        ]
      },
      {
        heading: "Technical Implementation",
        body: [
          "The system uses predefined thresholds to decide whether the environment is suitable for plant growth.",
          "The temperature condition is suitable when the reading is between 20&deg;C and 35&deg;C. The light condition is evaluated using effective light, which combines ambient light and LED brightness. If the light level is too low, LED brightness increases automatically; if there is enough light, brightness decreases to save energy.",
          "The ultrasonic sensor measures the distance between the sensor and the water surface. If the distance is too high, the system treats the water level as low and activates an alert. The rotary angle sensor allows the user to manually override the automatic LED control when needed."
        ],
        tags: ["Arduino", "Raspberry Pi", "IoT", "Sensors", "MariaDB", "Flask", "Python", "Sustainability"]
      },
      {
        heading: "Testing and Results",
        body: ["The system was tested under different environmental conditions to verify each function worked correctly. Test cases checked whether:"],
        list: [
          "The buzzer stayed off when all conditions were suitable",
          "The buzzer activated when temperature, light, or water level was unsuitable",
          "LED brightness increased in darker conditions",
          "LED brightness decreased in brighter conditions",
          "Low water level was detected correctly",
          "Manual LED control overrode automatic brightness adjustment"
        ],
        after:
          "The system successfully responded to these test conditions, showing that the hardware, software, database, and web interface could work together as one complete IoT system."
      },
      {
        heading: "Skills Demonstrated",
        list: [
          "IoT system design",
          "Sensor integration",
          "Arduino programming",
          "Raspberry Pi data processing",
          "Serial communication",
          "Python scripting",
          "MariaDB database implementation",
          "Flask web development",
          "Real-time monitoring",
          "Testing and troubleshooting",
          "Sustainability-focused engineering"
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The final system successfully monitored temperature, light intensity, and water level in real time. It could automatically adjust LED brightness, alert users when plant conditions were unsuitable, store sensor data in a database, and display the readings through a Flask web interface.",
          "This project helped me understand how hardware, software, databases, and web technologies can be integrated into a practical IoT solution, and how technology can support more efficient and sustainable indoor farming."
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
  const modal = document.querySelector("[data-project-modal]");
  const content = document.querySelector("[data-modal-content]");
  if (!modal || !content) return;

  let lastFocus = null;

  const open = (key) => {
    const project = PROJECTS[key];
    if (!project) return;

    lastFocus = document.activeElement;
    content.innerHTML = renderProject(project);
    wireModalVideos(content);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    wireScrollFade(modal);
    requestAnimationFrame(() => modal.querySelector("[data-modal-close]")?.focus());
  };

  const close = () => {
    if (!modal.classList.contains("is-open")) return;
    modal.querySelectorAll("video").forEach((video) => video.pause());
    modal.classList.remove("is-open", "has-scroll-overflow", "is-scroll-end");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    content.innerHTML = "";
    lastFocus?.focus?.();
  };

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open-project]");
    if (opener) {
      open(opener.dataset.openProject);
      return;
    }

    if (event.target.closest("[data-modal-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function renderProject(project) {
  return `
    <article class="project-modal-body">
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
        <video class="modal-video" controls poster="${media.poster}" preload="metadata" aria-label="${media.label}" data-volume-boost="1.45">
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
      ${section.after ? `<p>${section.after}</p>` : ""}
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

function wireScrollFade(modal) {
  const scrollArea = modal.querySelector(".modal-scroll-area");
  if (!scrollArea) return;

  const update = () => {
    const remaining = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight;
    modal.classList.toggle("is-scroll-end", remaining <= 50);
    modal.classList.toggle("has-scroll-overflow", scrollArea.scrollHeight > scrollArea.clientHeight + 8);
  };

  scrollArea.addEventListener("scroll", update, { passive: true });
  requestAnimationFrame(update);
}

function wireModalVideos(root) {
  root.querySelectorAll("video[data-volume-boost]").forEach((video) => {
    video.volume = 1;
    video.addEventListener(
      "play",
      () => {
        tryBoostVideo(video, Number(video.dataset.volumeBoost || "1"));
      },
      { once: true }
    );
  });
}

const boostedVideos = new WeakMap();

function tryBoostVideo(video, gainValue) {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  if (boostedVideos.has(video)) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextClass();
    const source = context.createMediaElementSource(video);
    const gain = context.createGain();
    gain.gain.value = Math.min(Math.max(gainValue, 1), 1.6);
    source.connect(gain);
    gain.connect(context.destination);
    boostedVideos.set(video, { context, source, gain });
  } catch {
    video.volume = 1;
  }
}
