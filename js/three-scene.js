const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export async function initThreeScene() {
  const canvas = document.querySelector("#hero-canvas, [data-three-hero]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reducedMotion) return;

  const start = () => buildParticleNetwork(canvas);
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 800 });
  } else {
    window.setTimeout(start, 140);
  }
}

async function buildParticleNetwork(canvas) {
  let THREE;
  try {
    THREE = await import(THREE_URL);
  } catch {
    canvas.classList.add("is-dimmed");
    return;
  }

  const lowPower = window.innerWidth < 760 || navigator.hardwareConcurrency <= 4;
  const particleCount = lowPower ? 2000 : 5000;
  const connectionNodes = lowPower ? 0 : 170;
  const maxConnections = 3;
  const proximity = 0.82;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const base = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 2);
  const blue = new THREE.Color(0x3d5afe);
  const violet = new THREE.Color(0x7b61ff);

  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    const depth = Math.random();
    const radius = 2.2 + Math.random() * 6;
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 6.5;

    base[i3] = Math.cos(angle) * radius;
    base[i3 + 1] = y;
    base[i3 + 2] = -depth * 8;
    positions[i3] = base[i3];
    positions[i3 + 1] = base[i3 + 1];
    positions[i3 + 2] = base[i3 + 2];
    velocities[i * 2] = (Math.random() - 0.5) * 0.012;
    velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.012;

    const color = blue.clone().lerp(violet, Math.random());
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  scene.add(particles);

  const lineCapacity = connectionNodes * maxConnections;
  const linePositions = new Float32Array(lineCapacity * 2 * 3);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 0);
  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: 0x7b61ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  if (connectionNodes) scene.add(lines);

  const mouse = { x: 999, y: 999, active: false };
  let raf = 0;
  let running = true;
  let reducedLoad = false;
  let lastTime = performance.now();
  const frameDeltas = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  }

  function pointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.x = nx * 5.2;
    mouse.y = ny * 3.1;
    mouse.active = true;
  }

  function pointerLeave() {
    mouse.active = false;
  }

  function updateParticles(time) {
    const t = time * 0.001;
    const radius = 1.45;
    const radiusSq = radius * radius;

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      base[i3] += velocities[i * 2];
      base[i3 + 1] += velocities[i * 2 + 1];

      if (base[i3] > 7 || base[i3] < -7) velocities[i * 2] *= -1;
      if (base[i3 + 1] > 3.6 || base[i3 + 1] < -3.6) velocities[i * 2 + 1] *= -1;

      let x = base[i3] + Math.sin(t + i * 0.011) * 0.045;
      let y = base[i3 + 1] + Math.cos(t * 0.72 + i * 0.009) * 0.035;

      if (mouse.active) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const pull = (1 - distSq / radiusSq) * 0.02;
          x += dx * pull;
          y += dy * pull;
        }
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = base[i3 + 2] + Math.sin(t * 0.45 + i) * 0.08;
    }

    geometry.attributes.position.needsUpdate = true;
  }

  function updateConnections() {
    if (!connectionNodes || reducedLoad) {
      lineGeometry.setDrawRange(0, 0);
      return;
    }

    let lineIndex = 0;
    const connections = new Uint8Array(connectionNodes);

    for (let i = 0; i < connectionNodes; i += 1) {
      const i3 = i * 3;
      for (let j = i + 1; j < connectionNodes; j += 1) {
        if (connections[i] >= maxConnections || connections[j] >= maxConnections) continue;

        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        if (dx * dx + dy * dy + dz * dz > proximity * proximity) continue;

        const p = lineIndex * 6;
        linePositions[p] = positions[i3];
        linePositions[p + 1] = positions[i3 + 1];
        linePositions[p + 2] = positions[i3 + 2];
        linePositions[p + 3] = positions[j3];
        linePositions[p + 4] = positions[j3 + 1];
        linePositions[p + 5] = positions[j3 + 2];
        lineIndex += 1;
        connections[i] += 1;
        connections[j] += 1;
        if (lineIndex >= lineCapacity) break;
      }
      if (lineIndex >= lineCapacity) break;
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;
  }

  function watchPerformance(time) {
    const delta = time - lastTime;
    lastTime = time;
    frameDeltas.push(delta);
    while (frameDeltas.length > 120) frameDeltas.shift();

    if (frameDeltas.length < 90 || reducedLoad) return;
    const avgDelta = frameDeltas.reduce((sum, value) => sum + value, 0) / frameDeltas.length;
    if (avgDelta > 25) {
      geometry.setDrawRange(0, Math.floor(particleCount / 2));
      lineGeometry.setDrawRange(0, 0);
      mouse.active = false;
      reducedLoad = true;
      document.documentElement.classList.add("effects-reduced");
    }
  }

  function animate(time) {
    if (!running) return;
    watchPerformance(time);
    updateParticles(time);
    updateConnections();
    particles.rotation.y = Math.sin(time * 0.00015) * 0.12;
    camera.position.x += ((mouse.active && !reducedLoad ? mouse.x * 0.025 : 0) - camera.position.x) * 0.035;
    camera.position.y += ((mouse.active && !reducedLoad ? mouse.y * 0.025 : 0) - camera.position.y) * 0.035;
    camera.lookAt(0, 0, -3);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  function dimOnScroll() {
    const hero = document.querySelector("#hero");
    if (!hero) return;
    const shouldDim = window.scrollY > hero.offsetHeight * 0.5;
    canvas.classList.toggle("is-dimmed", shouldDim);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", dimOnScroll, { passive: true });
  window.addEventListener("pointermove", pointerMove, { passive: true });
  window.addEventListener("pointerleave", pointerLeave, { passive: true });
  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) {
      lastTime = performance.now();
      raf = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(raf);
    }
  });

  raf = requestAnimationFrame(animate);
}
