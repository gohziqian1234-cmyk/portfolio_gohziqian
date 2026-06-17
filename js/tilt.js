export function initTilt() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (reducedMotion || !finePointer) return;

  document.querySelectorAll("[data-tilt], .project-card").forEach((card) => {
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hovering = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      card.style.setProperty("--tilt-x", `${currentY * -8}deg`);
      card.style.setProperty("--tilt-y", `${currentX * 8}deg`);
      card.style.setProperty("--shadow-x", `${currentX * -22}px`);
      card.style.setProperty("--shadow-y", `${18 + currentY * 10}px`);

      if (hovering || Math.abs(currentX) > 0.005 || Math.abs(currentY) > 0.005) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    card.addEventListener("pointermove", (event) => {
      if (document.documentElement.classList.contains("effects-reduced")) return;
      const rect = card.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--glow-x", `${(targetX + 0.5) * 100}%`);
      card.style.setProperty("--glow-y", `${(targetY + 0.5) * 100}%`);
      hovering = true;
      if (!frame) frame = requestAnimationFrame(render);
    });

    card.addEventListener("pointerleave", () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(render);
    });
  });
}
