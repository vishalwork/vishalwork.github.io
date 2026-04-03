/* ============================================================
   terminal.js — hidden terminal Easter egg
   press ` (backtick) to open, or type "help"
   ============================================================ */

(function () {

  const COMMANDS = {
    help: () => [
      '<span class="t-comment">// available commands</span>',
      '<span class="t-key">whoami</span>       — who is this guy?',
      '<span class="t-key">skills</span>       — tech stack',
      '<span class="t-key">experience</span>   — work history',
      '<span class="t-key">contact</span>      — get in touch',
      '<span class="t-key">packages</span>     — open source work',
      '<span class="t-key">clear</span>        — clear terminal',
      '<span class="t-key">exit</span>         — close terminal',
    ],

    whoami: () => [
      '<span class="t-comment">$ cat vishal.json</span>',
      '{',
      '  <span class="t-key">"name"</span>: <span class="t-str">"Vishal Kumar"</span>,',
      '  <span class="t-key">"role"</span>: <span class="t-str">"Sr. Flutter Developer"</span>,',
      '  <span class="t-key">"location"</span>: <span class="t-str">"Ranchi, JH 🇮🇳"</span>,',
      '  <span class="t-key">"experience"</span>: <span class="t-num">3</span>,',
      '  <span class="t-key">"open_to"</span>: <span class="t-str">"freelance & full-time"</span>',
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
      '<span class="t-ok">[✓]</span> MySQL / SQL',
      '<span class="t-warn">[~]</span> React JS — web dabbling',
    ],

    experience: () => [
      '<span class="t-comment">$ git log --oneline --jobs</span>',
      '<span class="t-hash">a3f1c9e</span> <span class="t-str">Jan 2025 → now</span>  Shanvia Tech — Sr. Flutter Dev',
      '<span class="t-hash">b82de01</span> <span class="t-str">Sep–Nov 2024</span>  Provis Tech — Flutter Dev',
      '<span class="t-hash">c91ab44</span> <span class="t-str">Jul 2023–2024</span> Nellsys — Mobile Dev',
      '<span class="t-hash">d04ff72</span> <span class="t-str">Mar 2022–2023</span> Raneso Global — Software Dev',
    ],

    packages: () => [
      '<span class="t-comment">$ pub get</span>',
      'Resolving dependencies...',
      '<span class="t-ok">+ ai_smart_translate 1.0.2</span>',
      '  → Google Translate + AI context layer',
      '  → 100+ languages, auto-fallback',
      '  → MIT license, pub.dev published',
      '',
      '<span class="t-comment">// more packages in progress...</span>',
    ],

    contact: () => [
      '<span class="t-comment">$ curl vishal.dev/contact</span>',
      '{',
      '  <span class="t-key">"github"</span>:   <span class="t-str">"github.com/vishalwork"</span>,',
      '  <span class="t-key">"linkedin"</span>: <span class="t-str">"linkedin.com/in/kvishalwork21"</span>,',
      '  <span class="t-key">"pubdev"</span>:   <span class="t-str">"pub.dev/publishers/vishalwork"</span>',
      '}',
    ],

    clear: () => '__clear__',
    exit:  () => '__exit__',
  };

  const CSS = `
    #vk-terminal {
      position: fixed; bottom: 32px; right: 32px;
      width: 520px; max-height: 380px;
      background: rgba(8, 8, 14, 0.97);
      border: 1px solid rgba(100,255,218,0.25);
      border-radius: 10px;
      font-family: 'Courier New', monospace;
      font-size: 13px; line-height: 1.65;
      color: #c8d3e8;
      z-index: 9999;
      display: none;
      flex-direction: column;
      box-shadow: 0 0 40px rgba(100,255,218,0.08);
      overflow: hidden;
    }
    #vk-terminal.open { display: flex; }

    .vk-term-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.04);
      border-bottom: 1px solid rgba(100,255,218,0.12);
      flex-shrink: 0;
    }
    .vk-dot { width: 11px; height: 11px; border-radius: 50%; }
    .vk-dot-r { background: #ff5f57; }
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
    }

    .vk-term-line { white-space: pre-wrap; }

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
      flex: 1; caret-color: #64ffda;
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
      letter-spacing: 0.1em;
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.4s;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  const hint = document.createElement('div');
  hint.id = 'vk-hint';
  hint.textContent = 'press ` to open terminal';
  document.body.appendChild(hint);

  const term = document.createElement('div');
  term.id = 'vk-terminal';
  term.innerHTML = `
    <div class="vk-term-bar">
      <div class="vk-dot vk-dot-r" id="vk-close-btn" style="cursor:pointer" title="close"></div>
      <div class="vk-dot vk-dot-y"></div>
      <div class="vk-dot vk-dot-g"></div>
      <div class="vk-term-title">vishal@portfolio ~ </div>
    </div>
    <div class="vk-term-body" id="vk-body"></div>
    <div class="vk-term-input-row">
      <span class="vk-prompt">❯</span>
      <input class="vk-input" id="vk-input" autocomplete="off" spellcheck="false" placeholder="type 'help'"/>
    </div>
  `;
  document.body.appendChild(term);

  const body  = document.getElementById('vk-body');
  const input = document.getElementById('vk-input');
  const closeBtn = document.getElementById('vk-close-btn');

  function print(lines) {
    if (lines === '__clear__') { body.innerHTML = ''; return; }
    if (lines === '__exit__')  { close(); return; }
    lines.forEach(line => {
      const el = document.createElement('div');
      el.className = 'vk-term-line';
      el.innerHTML = line;
      body.appendChild(el);
    });
    body.scrollTop = body.scrollHeight;
  }

  function open() {
    term.classList.add('open');
    hint.style.opacity = '0';
    input.focus();
    if (body.children.length === 0) {
      print([
        '<span class="t-ok">// KVishal portfolio terminal v1.0</span>',
        '<span class="t-comment">type <span class="t-key">help</span> to see commands</span>',
        '',
      ]);
    }
  }

  function close() {
    term.classList.remove('open');
    hint.style.opacity = '1';
  }

  closeBtn.addEventListener('click', close);

  input.addEventListener('keydown', e => {
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
      term.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && term.classList.contains('open')) close();
  });

  setTimeout(() => {
    hint.style.opacity = '0';
    setTimeout(() => { hint.style.opacity = '1'; }, 2000);
  }, 3000);

})();
