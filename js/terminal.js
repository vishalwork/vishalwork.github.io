/* ============================================================
   terminal.js — hidden terminal Easter egg
   press ` (backtick) to toggle, auto-opens on load
   ============================================================ */

(function () {

  const COMMANDS = {
    help: () => [
      '<span class="t-comment">// available commands</span>',
      '<span class="t-key">whoami</span>       — who is this guy?',
      '<span class="t-key">skills</span>       — tech stack',
      '<span class="t-key">experience</span>   — work history',
      '<span class="t-key">packages</span>     — open source work',
      '<span class="t-key">contact</span>      — get in touch',
      '<span class="t-key">clear</span>        — clear terminal',
      '<span class="t-key">exit</span>         — close terminal',
    ],

    whoami: () => [
      '<span class="t-comment">$ cat vishal.json</span>',
      '{',
      '  <span class="t-key">"name"</span>:       <span class="t-str">"Vishal Kumar"</span>,',
      '  <span class="t-key">"role"</span>:       <span class="t-str">"Sr. Flutter Developer"</span>,',
      '  <span class="t-key">"location"</span>:   <span class="t-str">"Ranchi, JH 🇮🇳"</span>,',
      '  <span class="t-key">"experience"</span>: <span class="t-num">3</span>,',
      '  <span class="t-key">"open_to"</span>:    <span class="t-str">"freelance & full-time"</span>',
      '}',
    ],

    skills: () => [
      '<span class="t-comment">$ flutter doctor --verbose</span>',
      '<span class="t-ok">[✓]</span> Flutter — primary framework',
      '<span class="t-ok">[✓]</span> Dart — language of choice',
      '<span class="t-ok">[✓]</span> Firebase + Supabase — backend',
      '<span class="t-ok">[✓]</span> Node JS + REST APIs',
      '<span class="t-ok">[✓]</span> WebRTC — real-time video',
      '<span class="t-ok">[✓]</span> AWS — cloud infra',
      '<span class="t-ok">[✓]</span> App Store + Play Store',
      '<span class="t-ok">[✓]</span> BASH / Linux — CLI tools',
      '<span class="t-warn">[~]</span> React JS — web dabbling',
    ],

    experience: () => [
      '<span class="t-comment">$ git log --oneline --jobs</span>',
      '<span class="t-hash">a3f1c9e</span> <span class="t-str">Jan 2025 → Apr 2026</span>  Shanvia Tech — Sr. Flutter Dev',
      '<span class="t-hash">b82de01</span> <span class="t-str">Sep–Nov 2024</span>  Provis Tech — Flutter Dev',
      '<span class="t-hash">c91ab44</span> <span class="t-str">Jul 2023–2024</span> Nellsys — Mobile Dev',
      '<span class="t-hash">d04ff72</span> <span class="t-str">Mar 2022–2023</span> Raneso Global — Software Dev',
    ],

    packages: () => [
      '<span class="t-comment">$ open-source --list</span>',
      '',
      '<span class="t-ok">+ ai_smart_translate</span> <span class="t-str">v1.0.2</span>  [pub.dev]',
      '  → Flutter pkg: Google Translate + AI context layer',
      '  → 100+ languages, auto-fallback, MIT license',
      '',
      '<span class="t-ok">+ sispack</span>             <span class="t-str">v1.2</span>    [GitHub]',
      '  → Cross-platform Bash CLI: disk usage per package',
      '  → dpkg / rpm / pacman / Homebrew support',
      '  → brew tap vishalwork/sispack && brew install sispack',
    ],

    contact: () => [
      '<span class="t-comment">$ curl vishal.dev/contact</span>',
      '{',
      '  <span class="t-key">"github"</span>:   <span class="t-str">"github.com/vishalwork"</span>,',
      '  <span class="t-key">"linkedin"</span>: <span class="t-str">"linkedin.com/in/kvishalwork21"</span>,',
      '  <span class="t-key">"pubdev"</span>:   <span class="t-str">"https://pub.dev/publishers/vishalwork.is-a.dev/packages"</span>',
      '}',
    ],

    clear: () => '__clear__',
    exit:  () => '__exit__',
  };

  /* ── Styles ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    #vk-terminal {
      position: fixed; bottom: 32px; right: 32px;
      width: min(520px, calc(100vw - 24px)); max-height: 380px;
      background: rgba(8,8,14,0.97);
      border: 1px solid rgba(100,255,218,0.25);
      border-radius: 10px;
      font-family: 'Courier New', monospace;
      font-size: 13px; line-height: 1.65;
      color: #c8d3e8;
      z-index: 9999;
      display: none; flex-direction: column;
      box-shadow: 0 0 40px rgba(100,255,218,0.08);
      overflow: hidden;
      transform: translateY(12px);
      opacity: 0;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    #vk-terminal.open {
      display: flex;
    }
    #vk-terminal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .vk-term-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.04);
      border-bottom: 1px solid rgba(100,255,218,0.12);
      flex-shrink: 0; cursor: default; user-select: none;
    }
    .vk-dot { width: 11px; height: 11px; border-radius: 50%; }
    .vk-dot-r { background: #ff5f57; cursor: pointer; }
    .vk-dot-y { background: #febc2e; }
    .vk-dot-g { background: #28c840; }
    .vk-term-title {
      flex: 1; text-align: center;
      font-size: 11px; color: rgba(200,211,232,0.4);
      letter-spacing: 0.08em;
    }
    .vk-term-body {
      flex: 1; overflow-y: auto;
      padding: 14px 18px;
      display: flex; flex-direction: column; gap: 2px;
      scrollbar-width: thin;
      scrollbar-color: rgba(100,255,218,0.2) transparent;
      cursor: text;
    }
    .vk-term-line { white-space: pre-wrap; word-break: break-word; }
    .vk-term-input-row {
      display: flex; align-items: center; gap: 6px;
      padding: 10px 18px;
      border-top: 1px solid rgba(100,255,218,0.1);
      flex-shrink: 0;
    }
    .vk-prompt { color: #64ffda; flex-shrink: 0; }
    .vk-input {
      background: none; border: none; outline: none;
      color: #e8eaf6; font-family: inherit; font-size: 13px;
      flex: 1; caret-color: #64ffda; cursor: text;
    }
    .t-comment { color: #4b5268; }
    .t-key     { color: #64ffda; }
    .t-str     { color: #ffd166; }
    .t-num     { color: #ff6584; }
    .t-ok      { color: #64ffda; }
    .t-warn    { color: #ffd166; }
    .t-hash    { color: #ff6584; }
    #vk-hint {
      position: fixed; bottom: 32px; right: 32px;
      font-family: 'Courier New', monospace;
      font-size: 11px; color: rgba(100,255,218,0.4);
      letter-spacing: 0.1em; pointer-events: none;
      z-index: 9998; transition: opacity 0.4s;
    }
    #vk-mob-btn {
      display: none;
      position: fixed; bottom: 24px; right: 24px;
      width: 46px; height: 46px; border-radius: 14px;
      background: rgba(8,8,14,0.95);
      border: 1px solid rgba(100,255,218,0.3);
      color: #64ffda; font-family: 'Courier New', monospace;
      font-size: 14px; font-weight: 700;
      align-items: center; justify-content: center;
      cursor: pointer; z-index: 9998;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: background 0.2s, transform 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    #vk-mob-btn:active { transform: scale(0.92); }
    @media (max-width: 680px) {
      #vk-hint    { display: none !important; }
      #vk-mob-btn { display: flex; }
      #vk-terminal { bottom: 12px; right: 12px; left: 12px; width: auto; max-height: 60vh; }
    }
  `;
  document.head.appendChild(styleEl);

  /* ── DOM ── */
  const hint = document.createElement('div');
  hint.id = 'vk-hint';
  hint.textContent = 'press ` to open terminal';
  document.body.appendChild(hint);

  const mobBtn = document.createElement('button');
  mobBtn.id = 'vk-mob-btn';
  mobBtn.setAttribute('aria-label', 'Open terminal');
  mobBtn.textContent = '>_';
  document.body.appendChild(mobBtn);

  const term = document.createElement('div');
  term.id = 'vk-terminal';
  term.innerHTML = `
    <div class="vk-term-bar">
      <div class="vk-dot vk-dot-r" id="vk-close-btn" title="close"></div>
      <div class="vk-dot vk-dot-y"></div>
      <div class="vk-dot vk-dot-g"></div>
      <div class="vk-term-title">vishal@portfolio ~ </div>
    </div>
    <div class="vk-term-body" id="vk-body"></div>
    <div class="vk-term-input-row">
      <span class="vk-prompt">❯</span>
      <input class="vk-input" id="vk-input" autocomplete="off" spellcheck="false" placeholder="type 'help' and press Enter"/>
    </div>
  `;
  document.body.appendChild(term);

  const body     = document.getElementById('vk-body');
  const input    = document.getElementById('vk-input');
  const closeBtn = document.getElementById('vk-close-btn');

  /* ── Print ── */
  function print(lines) {
    if (!Array.isArray(lines)) return;
    lines.forEach(line => {
      const el = document.createElement('div');
      el.className = 'vk-term-line';
      el.innerHTML = line;
      body.appendChild(el);
    });
    body.scrollTop = body.scrollHeight;
  }

  /* ── Open / Close ── */
  function open(auto) {
    term.classList.add('open');
    hint.style.opacity = '0';
    mobBtn.style.opacity = '0';
    mobBtn.style.pointerEvents = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => term.classList.add('visible'));
    });
    if (body.children.length === 0) {
      print([
        '<span class="t-ok">// KVishal portfolio terminal v1.0</span>',
        '<span class="t-comment">type <span class="t-key">help</span> to see commands</span>',
        '',
      ]);
    }
    if (!auto) input.focus();
    else setTimeout(() => input.focus(), 300);
  }

  function close() {
    term.classList.remove('visible');
    setTimeout(() => term.classList.remove('open'), 250);
    hint.style.opacity = '1';
    mobBtn.style.opacity = '1';
    mobBtn.style.pointerEvents = 'auto';
  }

  /* ── Events ── */
  closeBtn.addEventListener('click', close);

  // click anywhere in terminal body → refocus input
  body.addEventListener('click', () => input.focus());
  term.addEventListener('click', () => input.focus());
  mobBtn.addEventListener('click', () => open(false));

  input.addEventListener('keydown', e => {
    e.stopPropagation(); // don't let global handler steal keys
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    print([`<span class="t-key">❯ ${cmd}</span>`]);

    const fn = COMMANDS[cmd];
    if (fn) {
      const result = fn();
      if (result === '__clear__') { body.innerHTML = ''; }
      else if (result === '__exit__') { close(); }
      else { print(result); print(['']); }
    } else {
      print([
        `<span style="color:#ff6584">command not found: ${cmd}</span>`,
        'type <span class="t-key">help</span> for available commands',
        '',
      ]);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === '`') {
      e.preventDefault();
      term.classList.contains('open') ? close() : open(false);
    }
    if (e.key === 'Escape' && term.classList.contains('open')) close();
  });

  /* ── Auto-open on load (desktop only) ── */
  if (!('ontouchstart' in window) && window.innerWidth > 680) {
    setTimeout(() => {
      open(true);
      const autoClose = setTimeout(() => {
        if (input.value === '' && body.children.length <= 3) close();
      }, 6000);
      input.addEventListener('keydown', () => clearTimeout(autoClose), { once: true });
    }, 2000);
  }

})();
