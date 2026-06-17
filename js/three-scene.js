async function initThreeScene() {
  const canvas = document.querySelector("[data-three-hero]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reduceMotion) return;

  const start = () => buildScene(canvas);

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 700 });
  } else {
    window.setTimeout(start, 120);
  }
}

async function buildScene(canvas) {
  let THREE;
  try {
    THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
  } catch {
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070815, 0.055);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 1.2, 7);

  const group = new THREE.Group();
  scene.add(group);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.15, 0.28, 130, 16),
    new THREE.MeshStandardMaterial({
      color: 0x3d5afe,
      roughness: 0.22,
      metalness: 0.78,
      emissive: 0x10154d,
      emissiveIntensity: 0.72
    })
  );
  knot.position.set(2.3, 0.3, -0.4);
  group.add(knot);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.2, 0.012, 12, 160),
    new THREE.MeshBasicMaterial({ color: 0x7b61ff, transparent: true, opacity: 0.46 })
  );
  ring.rotation.x = Math.PI * 0.58;
  ring.position.set(2.1, 0, -0.8);
  group.add(ring);

  const grid = new THREE.GridHelper(18, 42, 0x3d5afe, 0x23284b);
  grid.position.y = -1.85;
  grid.material.transparent = true;
  grid.material.opacity = 0.24;
  scene.add(grid);

  const particles = createParticles(THREE, 150);
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffffff, 0.48));
  const keyLight = new THREE.PointLight(0x7b61ff, 16, 18);
  keyLight.position.set(0, 4, 5);
  scene.add(keyLight);

  const mouse = { x: 0, y: 0 };
  let animationFrame = 0;
  let visible = true;
  let reducedLoad = false;
  const frameTimes = [];
  let lastTime = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  };

  const onPointerMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const animate = (time) => {
    if (!visible) return;

    const delta = time - lastTime;
    lastTime = time;
    frameTimes.push(delta);
    while (frameTimes.length > 120) frameTimes.shift();

    const avgDelta = frameTimes.reduce((total, value) => total + value, 0) / frameTimes.length;
    if (!reducedLoad && frameTimes.length > 60 && avgDelta > 25) {
      particles.geometry.setDrawRange(0, 75);
      reducedLoad = true;
    }

    const t = time * 0.001;
    knot.rotation.x = t * 0.22;
    knot.rotation.y = t * 0.34;
    ring.rotation.z = t * 0.1;
    particles.rotation.y = t * 0.025;

    const parallaxStrength = reducedLoad ? 0.04 : 0.12;
    camera.position.x += (mouse.x * parallaxStrength - camera.position.x) * 0.04;
    camera.position.y += (1.2 + -mouse.y * parallaxStrength - camera.position.y) * 0.04;
    camera.position.z = 7 + Math.sin(t * 0.5) * 0.08;
    camera.lookAt(0.6, 0, 0);

    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", () => {
    visible = document.visibilityState === "visible";
    if (visible) {
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  });

  animationFrame = requestAnimationFrame(animate);
}

function createParticles(THREE, count) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.1) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xcbd6ff,
      size: 0.025,
      transparent: true,
      opacity: 0.74
    })
  );
}

window.initThreeScene = initThreeScene;
