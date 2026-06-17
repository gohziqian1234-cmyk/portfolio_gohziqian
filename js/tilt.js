function initTilt() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (reduceMotion || !finePointer) return;

  const cards = Array.from(document.querySelectorAll("[data-tilt]"));

  cards.forEach((card) => {
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const applyTilt = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      const x = (pointer.x - rect.left) / rect.width - 0.5;
      const y = (pointer.y - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-2px)`;
      card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
      card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
    };

    card.addEventListener("pointermove", (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(applyTilt);
    });

    card.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.transform = "";
    });
  });
}

window.initTilt = initTilt;
