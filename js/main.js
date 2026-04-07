/* ============================================================
   main.js — KVishal Portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  setupDurations();
});

function calcDuration(fromStr, toStr) {
  const [fy, fm] = fromStr.split('-').map(Number);
  let ty, tm;
  if (toStr === 'present') {
    const now = new Date();
    ty = now.getFullYear();
    tm = now.getMonth() + 1;
  } else {
    [ty, tm] = toStr.split('-').map(Number);
  }
  const total = (ty - fy) * 12 + (tm - fm);
  const yrs   = Math.floor(total / 12);
  const mos   = total % 12;

  if (yrs === 0) return `${mos} mo${mos !== 1 ? 's' : ''}`;
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr ${mos} mo${mos !== 1 ? 's' : ''}`;
}

function setupDurations() {
  document.querySelectorAll('.tl-left[data-from]').forEach(el => {
    const from = el.dataset.from;
    const to   = el.dataset.to;
    if (!from || !to) return;
    const dur = calcDuration(from, to);
    const tag = document.createElement('div');
    tag.className = 'tl-duration';
    tag.textContent = dur;
    el.appendChild(tag);
  });
}
