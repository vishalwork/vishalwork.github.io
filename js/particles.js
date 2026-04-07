/* ============================================================
   particles.js — subtle interactive canvas background
   ============================================================ */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    zIndex: '0', pointerEvents: 'none', opacity: '0.45'
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const ACCENT       = '#64ffda';
  const COUNT        = 35;           // was 55
  const CONNECT_DIST = 110;          // was 130
  const CONNECT_SQ   = CONNECT_DIST * CONNECT_DIST;
  const MOUSE_DIST   = 140;
  const MOUSE_SQ     = MOUSE_DIST * MOUSE_DIST;
  const SPEED        = 0.28;
  const FPS_CAP      = 30;
  const FRAME_MS     = 1000 / FPS_CAP;

  let W, H, mouse = { x: -9999, y: -9999 };
  let particles = [];
  let lastFrame  = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function spawn() {
    return { x: rand(0, W), y: rand(0, H), vx: rand(-SPEED, SPEED), vy: rand(-SPEED, SPEED), r: rand(1.2, 2) };
  }

  function init() { resize(); particles = Array.from({ length: COUNT }, spawn); }

  function draw(ts) {
    requestAnimationFrame(draw);

    // cap to FPS_CAP
    if (ts - lastFrame < FRAME_MS) return;
    lastFrame = ts;

    ctx.clearRect(0, 0, W, H);

    // move + draw dots
    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.fill();
    }

    ctx.strokeStyle = ACCENT;

    // particle-to-particle lines — use squared distance, skip sqrt
    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      for (let j = i + 1; j < COUNT; j++) {
        const q  = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < CONNECT_SQ) {
          ctx.globalAlpha = (1 - dSq / CONNECT_SQ) * 0.18;
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // mouse lines
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const mSq = mdx * mdx + mdy * mdy;
      if (mSq < MOUSE_SQ) {
        ctx.globalAlpha = (1 - mSq / MOUSE_SQ) * 0.35;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  init();
  requestAnimationFrame(draw);
})();
