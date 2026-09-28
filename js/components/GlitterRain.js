const colours = ["#fff6d4", "#f0d48a", "#c9964a", "#fffef6", "#a97832"];

export function attachGlitterRain() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "glitter-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
  let running = true;
  let last = 0;

  function make(fromTop) {
    return {
      x: Math.random() * width,
      y: fromTop ? Math.random() * height : -10,
      r: 0.45 + Math.random() * 1.05,
      speed: 16 + Math.random() * 32,
      drift: 8 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
      tw: Math.random() * Math.PI * 2,
      twSpeed: 1.1 + Math.random() * 2.4,
      star: Math.random() < 0.18,
      colour: colours[(Math.random() * colours.length) | 0],
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(78, Math.max(34, width / 20)) * 1.25);
    particles = Array.from({ length: count }, () => make(true));
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
    last = now;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.y += p.speed * dt;
      p.x += Math.sin(p.phase) * p.drift * dt;
      p.phase += dt * 0.7;
      p.tw += dt * p.twSpeed;
      if (p.y > height + 8) {
        const next = make(false);
        p.x = next.x;
        p.y = -8;
        p.r = next.r;
        p.speed = next.speed;
        p.drift = next.drift;
        p.phase = next.phase;
        p.tw = next.tw;
        p.twSpeed = next.twSpeed;
        p.star = next.star;
        p.colour = next.colour;
      }

      const alpha = 0.16 + 0.7 * (0.5 + 0.5 * Math.sin(p.tw));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.colour;
      ctx.shadowColor = "rgba(92, 58, 18, 0.28)";
      ctx.shadowBlur = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.star) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = p.colour;
        ctx.lineWidth = 0.45;
        const arm = p.r * 3.4;
        ctx.beginPath();
        ctx.moveTo(p.x - arm, p.y);
        ctx.lineTo(p.x + arm, p.y);
        ctx.moveTo(p.x, p.y - arm);
        ctx.lineTo(p.x, p.y + arm);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      return;
    }
    if (!running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }
  });
  requestAnimationFrame(frame);
}
