/* Subtle 3D tilt for cards. Disabled on touch, reduced motion, and low-performance mode. */

export function initTilt() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (reduceMotion || touch) return;

  const cards = Array.from(document.querySelectorAll("[data-tilt]"));
  cards.forEach((card) => {
    let raf = 0;

    const reset = () => {
      cancelAnimationFrame(raf);
      card.style.transform = "";
    };

    card.addEventListener("pointermove", (event) => {
      if (document.body.classList.contains("low-performance")) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
      });
    });

    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset);
  });
}

export function initCursorGlow() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (reduceMotion || touch) return;

  const glow = document.createElement("span");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true }
  );

  const loop = () => {
    x += (targetX - x) * 0.15;
    y += (targetY - y) * 0.15;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}
