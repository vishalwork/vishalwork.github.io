/* ============================================================
   typewriter.js — hero role typewriter cycling
   ============================================================ */

(function () {
  const PHRASES = [
    'Building <span>open-source</span> Flutter packages',
    'Crafting <span>real-time</span> mobile apps',
    'Shipping to <span>App Store</span> & <span>Play Store</span>',
    'Integrating <span>AI</span> into Flutter',
    'Writing <span>Dart</span> that scales',
  ];

  const el = document.querySelector('.hero-role');
  if (!el) return;

  let idx = 0, charIdx = 0, deleting = false, waiting = false;

  function tick() {
    const target = PHRASES[idx];
    const plain  = target.replace(/<[^>]+>/g, '');

    if (waiting) { waiting = false; setTimeout(tick, 1800); return; }

    if (!deleting) {
      charIdx++;
      const slice = plain.slice(0, charIdx);
      const full  = target.replace(/<[^>]+>/g, c => c);

      let shown = '';
      let count = 0;
      let i = 0;
      while (i < target.length) {
        if (target[i] === '<') {
          const end = target.indexOf('>', i);
          if (count < charIdx) { shown += target.slice(i, end + 1); }
          i = end + 1;
        } else {
          if (count < charIdx) shown += target[i];
          count++; i++;
        }
      }
      el.innerHTML = shown + '<span class="cursor-blink">|</span>';

      if (charIdx >= plain.length) { deleting = true; waiting = true; setTimeout(tick, 100); return; }
      setTimeout(tick, 55 + Math.random() * 35);
    } else {
      charIdx = Math.max(0, charIdx - 2);
      const plain2 = target.replace(/<[^>]+>/g, '');
      let shown = '';
      let count = 0;
      let i = 0;
      while (i < target.length) {
        if (target[i] === '<') {
          const end = target.indexOf('>', i);
          if (count < charIdx) shown += target.slice(i, end + 1);
          i = end + 1;
        } else {
          if (count < charIdx) shown += target[i];
          count++; i++;
        }
      }
      el.innerHTML = shown + '<span class="cursor-blink">|</span>';

      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % PHRASES.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 28);
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .cursor-blink {
      color: var(--accent);
      animation: blink 0.9s step-end infinite;
      font-weight: 300;
    }
    @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
  `;
  document.head.appendChild(style);

  el.innerHTML = '';
  setTimeout(tick, 900);
})();
