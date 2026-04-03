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
  const ACCENT = '#64ffda';
  const COUNT = 55;
  const CONNECT_DIST = 130;
  const SPEED = 0.28;

  let W, H, mouse = { x: -999, y: -999 };
  let particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function spawn() {
    return {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-SPEED, SPEED), vy: rand(-SPEED, SPEED),
      r: rand(1.2, 2.2)
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, spawn);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = ACCENT;
          ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = ACCENT;
        ctx.globalAlpha = (1 - md / 160) * 0.35;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  init();
  draw();
})();
