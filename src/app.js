/* Catch-Up Quest — app engine. Plain JavaScript, no libraries. Everything is saved on this device. */
(function () {
  'use strict';
  const QC = window.QC;

  /* ───────────── helpers ───────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fmt = n => typeof n !== 'number' ? String(n) : (Math.round(n * 100) / 100).toLocaleString('en-AU', { maximumFractionDigits: 2 });
  const words = t => (String(t || '').trim().match(/\S+/g) || []).length;
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const fmtDate = t => new Date(t).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = t => new Date(t).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });

  function md(src) {
    const inline = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    let html = '', inList = false, para = [];
    const flush = () => { if (para.length) { html += '<p>' + para.map(inline).join(' ') + '</p>\n'; para = []; } };
    for (const raw of String(src).split('\n')) {
      const l = raw.trim();
      if (l.startsWith('- ')) { flush(); if (!inList) { html += '<ul>\n'; inList = true; } html += '<li>' + inline(l.slice(2)) + '</li>\n'; }
      else { if (inList) { html += '</ul>\n'; inList = false; } if (!l) flush(); else para.push(l); }
    }
    flush(); if (inList) html += '</ul>\n';
    return html;
  }

  /* ───────────── icons ───────────── */
  const ic = p => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${p}</svg>`;
  const I = {
    speaker: ic('<path d="M4 9.5h3.5L13 5v14l-5.5-4.5H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
    home: ic('<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" fill="currentColor"/>'),
    pause: ic('<rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor"/>'),
    gear: ic('<path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="16" cy="7" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="17" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>'),
    arrow: ic('<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    back: ic('<path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    star: ic('<path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" fill="currentColor"/>'),
    lock: ic('<rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="2" fill="none"/>'),
    mic: ic('<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>'),
    book: ic('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" fill="currentColor"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z" fill="currentColor" opacity=".55"/>'),
    maths: ic('<path d="M7 4v6M4 7h6M14 7h6M5 15l4 4M9 15l-4 4M14 17h6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="17" cy="14.3" r="1.2" fill="currentColor"/><circle cx="17" cy="19.7" r="1.2" fill="currentColor"/>'),
    flask: ic('<path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M7.2 15h9.6l2 3.6a1 1 0 0 1-.9 1.4H6.1a1 1 0 0 1-.9-1.4z" fill="currentColor"/>'),
    globe: ic('<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" stroke="currentColor" stroke-width="2" fill="none"/>'),
    pen: ic('<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z" fill="currentColor"/><path d="M4 21h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
    flag: ic('<path d="M5 21V4M5 4h11l-2 4 2 4H5" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M5 4h11l-2 4 2 4H5z" fill="currentColor" opacity=".35"/>'),
    blob: ic('<path d="M12 3c4 0 8 3 8 8 0 5-3.5 10-8.5 10S3 17.5 3.5 13C4 8 7.5 3 12 3z" fill="currentColor"/>'),
    trophy: ic('<path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="currentColor"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5A3.5 3.5 0 0 1 16.5 11M12 14v4M8 21h8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>'),
    shield: ic('<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" fill="currentColor"/>'),
    refresh: ic('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    copy: ic('<rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" stroke-width="2" fill="none"/>'),
    chevron: ic('<path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
  };

  /* ───────────── subjects and levels ───────────── */
  const SUBJECTS = [
    { id: 'english', name: 'English', world: 'Word World', color: 'var(--eng)', icon: 'book', blurb: 'Reading, spelling and writing skills' },
    { id: 'maths', name: 'Maths', world: 'Number Realm', color: 'var(--math)', icon: 'maths', blurb: 'Numbers, shapes, algebra and money' },
    { id: 'science', name: 'Science', world: 'Lab Zone', color: 'var(--sci)', icon: 'flask', blurb: 'Body, chemistry, energy, space and nature' },
    { id: 'hass', name: 'History & Geography', world: 'Time & Maps', color: 'var(--hum)', icon: 'globe', blurb: 'Australia, the world and the past' }
  ];
  const SUB = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
  const YEAR = { 1: 'Year 5', 2: 'Year 6', 3: 'Year 7', 4: 'Year 8', 5: 'Year 9' };
  const lessonsOf = sub => QC.lessons[sub] || [];
  const findLesson = id => { for (const s of SUBJECTS) { const l = lessonsOf(s.id).find(x => x.id === id); if (l) return { L: l, sub: s.id }; } return null; };
  const allLessons = () => SUBJECTS.flatMap(s => lessonsOf(s.id).map(l => ({ L: l, sub: s.id })));
  const qCount = L => (L.q ? L.q.length : 0) + (L.g ? (L.gn || 6) : 0);
  const lessonMins = L => Math.max(5, Math.round((L.c || []).length * 1.5 + qCount(L) * 0.8 + (L.k ? 2 : 0)));

  /* ───────────── state ───────────── */
  const KEY = 'catchup-quest-v1';
  const DEFAULT_SETTINGS = { font: 'lexend', scale: 1, spacing: 'normal', tint: 'blue', mode: 'auto', autoRead: false, rate: 0.9, voice: '', sound: false, timer: 10, calm: false };
  const fresh = () => ({ v: 1, created: Date.now(), setup: false, name: '', xp: 0, settings: Object.assign({}, DEFAULT_SETTINGS), start: {}, done: {}, days: {}, time: {}, events: [], badges: [], drafts: [], projects: {}, missions: 0, breaks: 0, bonus: {}, pin: '', checks: {} });
  function hydrate(obj) {
    const base = fresh();
    const out = Object.assign(base, obj || {});
    out.settings = Object.assign({}, DEFAULT_SETTINGS, (obj && obj.settings) || {});
    for (const k of ['start', 'done', 'days', 'time', 'projects', 'bonus', 'checks']) if (!out[k] || typeof out[k] !== 'object' || Array.isArray(out[k])) out[k] = {};
    for (const k of ['events', 'badges', 'drafts']) if (!Array.isArray(out[k])) out[k] = [];
    return out;
  }
  function load() { try { const r = localStorage.getItem(KEY); if (r) return hydrate(JSON.parse(r)); } catch (e) { /* storage unavailable */ } return fresh(); }
  let S = load();
  let storageOk = true;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; } catch (e) { storageOk = false; } }
  let saveTimer = null;
  const saveSoon = () => { clearTimeout(saveTimer); saveTimer = setTimeout(save, 500); };

  function logEvent(type, text, extra) {
    S.events.unshift(Object.assign({ t: Date.now(), type, text }, extra || {}));
    if (S.events.length > 400) S.events.length = 400;
    S.days[dayKey()] = true;
  }
  const doneToday = (type, sub) => S.events.some(e => e.type === type && (!sub || e.sub === sub) && dayKey(new Date(e.t)) === dayKey());

  /* ───────────── settings → page ───────────── */
  function applySettings() {
    const r = document.documentElement, st = S.settings;
    r.dataset.font = st.font;
    if (st.tint && st.tint !== 'blue') r.dataset.tint = st.tint; else delete r.dataset.tint;
    r.dataset.spacing = st.spacing;
    r.dataset.calm = st.calm ? '1' : '0';
    r.style.setProperty('--scale', String(st.scale || 1));
    if (st.mode === 'light' || st.mode === 'dark') r.dataset.theme = st.mode;
    else if (applySettings.setTheme) delete r.dataset.theme;
    applySettings.setTheme = st.mode === 'light' || st.mode === 'dark';
  }

  /* ───────────── read aloud ───────────── */
  const SPEAK_RULES = [['___', ' blank '], ['→', ', '], ['≈', ' about '], ['½', ' half '], ['/', ' over '], ['•', ' ']];
  const TTS = {
    ok: typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined',
    voices: [], btn: null, el: null, elLen: 0, token: null,
    init() {
      if (!this.ok) return;
      const loadV = () => { try { this.voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); } catch (e) { this.voices = []; } };
      loadV();
      try { speechSynthesis.addEventListener('voiceschanged', loadV); } catch (e) { speechSynthesis.onvoiceschanged = loadV; }
    },
    voice() {
      const want = S.settings.voice;
      return this.voices.find(v => v.name === want) || this.voices.find(v => /en[-_]AU/i.test(v.lang)) || this.voices.find(v => /en[-_]GB/i.test(v.lang)) || this.voices[0] || null;
    },
    prep(text) {
      let out = ''; const map = [];
      for (let i = 0; i < text.length;) {
        const hit = SPEAK_RULES.find(([a]) => text.startsWith(a, i));
        if (hit) { for (const ch of hit[1]) { out += ch; map.push(i); } i += hit[0].length; }
        else { out += text[i]; map.push(i); i++; }
      }
      map.push(text.length);
      return { out, map };
    },
    speak(text, el, btn) {
      if (!this.ok) { toast('Read-aloud isn’t available in this browser.'); return; }
      const same = btn && this.btn === btn;
      this.stop();
      if (same) return;
      text = String(text || '').replace(/\s+/g, ' ').trim();
      if (!text) return;
      const { out, map } = this.prep(text);
      const chunks = []; let s0 = 0;
      for (let i = 0; i < out.length; i++) {
        if ('.!?'.includes(out[i]) && (i + 1 === out.length || /\s/.test(out[i + 1]))) {
          let j = i + 1; while (j < out.length && /\s/.test(out[j])) j++;
          if (out.slice(s0, j).trim()) chunks.push({ s: s0, t: out.slice(s0, j) });
          s0 = j; i = j - 1;
        }
      }
      if (s0 < out.length && out.slice(s0).trim()) chunks.push({ s: s0, t: out.slice(s0) });
      this.el = el || null; this.btn = btn || null; this.elLen = el ? el.textContent.replace(/\s+/g, ' ').trim().length : 0;
      this.elText = el ? el.textContent : '';
      if (btn) btn.classList.add('speaking');
      if (el && !(window.CSS && CSS.highlights)) el.classList.add('reading');
      const token = this.token = {};
      const v = this.voice();
      const next = i => {
        if (token !== this.token) return;
        if (i >= chunks.length) { this.clear(); return; }
        const c = chunks[i];
        const u = new SpeechSynthesisUtterance(c.t);
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-AU';
        u.rate = S.settings.rate || 0.9;
        u.onboundary = e => {
          if (token !== this.token || (e.name && e.name !== 'word')) return;
          const oi = map[c.s + e.charIndex];
          if (oi == null || oi >= this.elLen) return;
          const w = /^\S+/.exec(text.slice(oi));
          this.mark(text, oi, w ? w[0].length : 1);
        };
        u.onend = () => next(i + 1);
        u.onerror = () => { if (token === this.token) this.clear(); };
        try { speechSynthesis.speak(u); } catch (e) { this.clear(); }
      };
      setTimeout(() => next(0), 60);
    },
    mark(norm, start, len) {
      if (!this.el || !(window.CSS && CSS.highlights && window.Highlight)) return;
      // Map the whitespace-normalised index back onto the element's real text nodes.
      const raw = this.elText; let ni = 0, ri = 0, rs = -1, re = -1; let prevSpace = true;
      // skip leading whitespace in raw
      while (ri < raw.length && /\s/.test(raw[ri])) ri++;
      for (; ri <= raw.length; ri++) {
        if (ni === start && rs < 0 && ri < raw.length && !/\s/.test(raw[ri])) rs = ri;
        if (ni === start + len) { re = ri; break; }
        if (ri === raw.length) break;
        const sp = /\s/.test(raw[ri]);
        if (sp) { if (!prevSpace) ni++; prevSpace = true; } else { ni++; prevSpace = false; }
      }
      if (rs < 0) return; if (re < 0) re = raw.length;
      const w = document.createTreeWalker(this.el, NodeFilter.SHOW_TEXT); let pos = 0, n; const r = document.createRange(); let started = false;
      while ((n = w.nextNode())) {
        const L = n.nodeValue.length;
        if (!started && rs < pos + L) { r.setStart(n, rs - pos); started = true; }
        if (started && re <= pos + L) { r.setEnd(n, re - pos); try { CSS.highlights.set('tts', new Highlight(r)); } catch (e) { /* ignore */ } return; }
        pos += L;
      }
    },
    stop() { this.token = null; try { if (this.ok) speechSynthesis.cancel(); } catch (e) { /* ignore */ } this.clear(); },
    clear() {
      try { if (window.CSS && CSS.highlights) CSS.highlights.delete('tts'); } catch (e) { /* ignore */ }
      $$('.reading').forEach(x => x.classList.remove('reading'));
      $$('.speaking').forEach(x => x.classList.remove('speaking'));
      this.btn = null; this.el = null;
    }
  };
  const spk = (label = 'Read this out loud', cls = '') => `<button class="spk ${cls}" data-act="say" aria-label="${esc(label)}">${I.speaker}</button>`;
  const sayBlock = (html, cls = '') => `<div class="say"><div class="say-text ${cls}">${html}</div>${spk()}</div>`;

  /* ───────────── voice typing ───────────── */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function dictate(ta, btn) {
    if (!SR || !ta) { dictationTip(); return; }
    try {
      const r = new SR(); r.lang = 'en-AU'; r.interimResults = false; r.continuous = false;
      btn.classList.add('speaking');
      r.onresult = e => { const t = Array.from(e.results).map(x => x[0].transcript).join(' '); insertAtCursor(ta, t); };
      r.onerror = () => { btn.classList.remove('speaking'); dictationTip(); };
      r.onend = () => btn.classList.remove('speaking');
      r.start();
    } catch (e) { btn.classList.remove('speaking'); dictationTip(); }
  }
  function dictationTip() {
    modal(`<h2>Talk instead of type</h2>
      <div class="stack tight">${sayBlock(md('- **iPad:** tap the **microphone** key on the keyboard, then talk. Tap it again to stop.\n- **Windows laptop:** press the **Windows key + H**, then talk.\n- **Mac:** press the **Fn (globe) key twice**, then talk.\n\nSay ‘full stop’, ‘comma’ or ‘new line’ to add punctuation.'))}</div>
      <div class="row end"><button class="btn primary" data-act="close-modal">Got it</button></div>`);
  }
  function insertAtCursor(ta, text) {
    const s = ta.selectionStart != null ? ta.selectionStart : ta.value.length, e = ta.selectionEnd != null ? ta.selectionEnd : s;
    const before = ta.value.slice(0, s), after = ta.value.slice(e);
    const pad = before && !/\s$/.test(before) ? ' ' : '';
    const ins = pad + text + (after.startsWith(' ') ? '' : ' ');
    ta.value = before + ins + after;
    const pos = (before + ins).length;
    try { ta.setSelectionRange(pos, pos); } catch (err) { /* ignore */ }
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.focus();
  }

  /* ───────────── sound (off by default) ───────────── */
  let audioCtx = null;
  function chime(good) {
    if (!S.settings.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = good ? [523, 784] : [392];
      notes.forEach((f, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime + i * 0.12;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        o.connect(g); g.connect(audioCtx.destination); o.start(t); o.stop(t + 0.4);
      });
    } catch (e) { /* ignore */ }
  }

  /* ───────────── toast and modal ───────────── */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }
  function modal(html, onMount) {
    closeModal();
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
    $('#modal-root').appendChild(back);
    back.addEventListener('click', e => { if (e.target === back) closeModal(); });
    const box = back.firstElementChild;
    if (onMount) onMount(box);
    const f = box.querySelector('input, textarea, .btn.primary, .btn'); if (f) f.focus({ preventScroll: true });
    return box;
  }
  function closeModal() { TTS.stop(); $('#modal-root').innerHTML = ''; }
  function confirmBox(title, text, okLabel, onOk) {
    modal(`<h2>${esc(title)}</h2>${sayBlock(`<p>${esc(text)}</p>`)}<div class="row end"><button class="btn ghost" data-act="close-modal">Cancel</button><button class="btn primary" id="modal-ok">${esc(okLabel)}</button></div>`,
      box => box.querySelector('#modal-ok').addEventListener('click', () => { closeModal(); onOk(); }));
  }

  /* ───────────── XP, levels, badges ───────────── */
  function levelInfo(xp) {
    let lvl = 1, need = 100, base = 0;
    while (xp >= base + need) { base += need; lvl++; need = 100 + (lvl - 1) * 25; }
    return { lvl, into: xp - base, need };
  }
  function addXP(n) {
    const before = levelInfo(S.xp).lvl;
    S.xp += n; S.days[dayKey()] = true;
    const after = levelInfo(S.xp).lvl;
    save(); renderTop();
    if (after > before) { logEvent('level', `Reached player level ${after}`); toast(`Level up! You are now Level ${after}.`); }
  }
  const doneCount = () => Object.keys(S.done).length;
  const BADGES = [
    { id: 'first', name: 'First Steps', desc: 'Finish your first lesson.', icon: 'star', test: () => doneCount() >= 1 },
    { id: 'warmup', name: 'Scout', desc: 'Do a warm-up check in any world.', icon: 'flag', test: () => Object.keys(S.start).length >= 1 },
    { id: 'five', name: 'On a Roll', desc: 'Finish 5 lessons.', icon: 'star', test: () => doneCount() >= 5 },
    { id: 'ten', name: 'Double Digits', desc: 'Finish 10 lessons.', icon: 'star', test: () => doneCount() >= 10 },
    { id: 'twentyfive', name: 'Quest Veteran', desc: 'Finish 25 lessons.', icon: 'trophy', test: () => doneCount() >= 25 },
    { id: 'fifty', name: 'Legend', desc: 'Finish 50 lessons.', icon: 'trophy', test: () => doneCount() >= 50 },
    { id: 'explorer', name: 'Explorer', desc: 'Finish a lesson in all 4 worlds.', icon: 'globe', test: () => SUBJECTS.every(s => lessonsOf(s.id).some(l => S.done[l.id])) },
    { id: 'flawless', name: 'Flawless', desc: 'Get 3 stars on a lesson.', icon: 'star', test: () => Object.values(S.done).some(d => d.stars === 3) },
    { id: 'side', name: 'Side Quester', desc: 'Complete 3 side quests.', icon: 'flag', test: () => S.missions >= 3 },
    { id: 'selfboss', name: 'Self Boss', desc: 'Take 3 brain breaks. Knowing when to rest is a real skill.', icon: 'blob', test: () => S.breaks >= 3 },
    { id: 'writer', name: 'Wordsmith', desc: 'Finish a piece in the Writing Lab.', icon: 'pen', test: () => S.drafts.some(d => d.finished) },
    { id: 'paragraph', name: 'Paragraph Pro', desc: 'Finish a Hamburger Paragraph.', icon: 'pen', test: () => S.drafts.some(d => d.finished && d.stage >= 2) },
    { id: 'author', name: 'Author', desc: 'Finish a Full Piece with 250+ words.', icon: 'book', test: () => S.drafts.some(d => d.finished && d.stage === 3 && draftWords(d) >= 250) },
    { id: 'builder', name: 'Builder', desc: 'Complete a step in a Quest Project.', icon: 'flag', test: () => Object.values(S.projects).some(p => Object.values(p.steps || {}).some(s => s.done)) },
    { id: 'master', name: 'Master Builder', desc: 'Finish a whole Quest Project.', icon: 'trophy', test: () => Object.values(S.projects).some(p => QC.stepTemplate.every(st => p.steps && p.steps[st.k] && p.steps[st.k].done)) },
    { id: 'daily', name: 'Daily Hero', desc: 'Finish all 3 daily quests in one day.', icon: 'check', test: () => Object.keys(S.bonus).length >= 1 },
    { id: 'days5', name: 'Regular', desc: 'Play on 5 different days.', icon: 'check', test: () => Object.keys(S.days).length >= 5 },
    { id: 'days20', name: 'Dedicated', desc: 'Play on 20 different days.', icon: 'trophy', test: () => Object.keys(S.days).length >= 20 },
    { id: 'y9', name: 'Year 9 Ready', desc: 'Finish a Level 5 lesson in every world.', icon: 'trophy', test: () => SUBJECTS.every(s => lessonsOf(s.id).some(l => l.t === 5 && S.done[l.id])) }
  ];
  function checkBadges() {
    const got = [];
    for (const b of BADGES) if (!S.badges.includes(b.id) && b.test()) { S.badges.push(b.id); got.push(b); logEvent('badge', `Badge earned: ${b.name}`); }
    if (got.length) { save(); setTimeout(() => toast(`Badge unlocked: ${got.map(b => b.name).join(', ')}`), 900); }
    return got;
  }

  /* ───────────── daily quests ───────────── */
  function dailyQuests() {
    const d = new Date(); const doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
    const third = ['science', 'writing', 'hass', 'project'][doy % 4];
    const qs = [{ kind: 'lesson', sub: 'english' }, { kind: 'lesson', sub: 'maths' }];
    if (third === 'science' || third === 'hass') qs.push({ kind: 'lesson', sub: third }); else qs.push({ kind: third });
    return qs.map(q => {
      if (q.kind === 'lesson') {
        const L = nextLesson(q.sub);
        return Object.assign(q, { done: doneToday('lesson', q.sub), title: `${SUB[q.sub].name}: ${L ? L.n : 'any level'}`, sub2: S.start[q.sub] ? `${SUB[q.sub].world} · about ${L ? lessonMins(L) : 7} min` : `${SUB[q.sub].world} · starts with a quick warm-up` });
      }
      if (q.kind === 'writing') return Object.assign(q, { done: doneToday('writing'), title: 'Writing Lab: write 20+ words', sub2: 'Any type. Talking counts too (use the mic).' });
      return Object.assign(q, { done: doneToday('project'), title: 'Quest Project: finish one step', sub2: 'Hands-on. Pick a project you like.' });
    });
  }
  function checkDailyBonus() {
    const k = dayKey();
    if (S.bonus[k]) return;
    if (dailyQuests().every(q => q.done)) { S.bonus[k] = true; logEvent('bonus', 'Finished all 3 daily quests'); addXP(30); setTimeout(() => toast('All 3 daily quests done! +30 XP bonus'), 400); }
  }

  /* ───────────── recommendations ───────────── */
  function nextLesson(sub) {
    const ls = lessonsOf(sub); const start = S.start[sub] || 1;
    return ls.find(l => l.t >= start && !S.done[l.id]) || ls.find(l => !S.done[l.id]) ||
      ls.slice().sort((a, b) => (S.done[a.id].best - S.done[b.id].best) || (S.done[a.id].last - S.done[b.id].last))[0];
  }
  function nextAfter(sub, id) {
    const ls = lessonsOf(sub); const i = ls.findIndex(l => l.id === id);
    return ls.slice(i + 1).find(l => !S.done[l.id]) || nextLesson(sub);
  }

  /* ───────────── question generators (Maths + spelling) ───────────── */
  const mcq = (q, right, wrongs, hint, extra) => {
    const opts = [String(right)];
    for (const w of wrongs) { const s = String(w); if (!opts.includes(s) && opts.length < 4) opts.push(s); }
    return Object.assign({ type: 'mc', q, opts, ans: String(right), hint }, extra || {});
  };
  const numq = (q, ans, hint, extra) => Object.assign({ type: 'num', q, ans, hint }, extra || {});
  const sv = (w, h, inner, label) => `<div class="visual" style="margin-top:12px"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">${inner}</svg></div>`;
  const T = (x, y, s, anchor = 'middle', size = 16) => `<text x="${x}" y="${y}" text-anchor="${anchor}" style="fill:var(--ink);font:600 ${size}px var(--f-body)">${s}</text>`;

  function rectSvg(w, h) {
    const s = Math.min(24, 240 / Math.max(w, h)); const W = w * s, H = h * s;
    return sv(W + 90, H + 60, `<rect x="60" y="30" width="${W}" height="${H}" rx="4" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:3"/>${T(60 + W / 2, 22, w + ' m')}${T(52, 30 + H / 2 + 5, h + ' m', 'end')}`, `Rectangle ${w} m by ${h} m`);
  }
  function triAreaSvg(b, h) {
    const s = Math.min(22, 220 / Math.max(b, h)); const W = b * s, H = h * s, ax = 30 + W * 0.35;
    return sv(W + 80, H + 60, `<polygon points="30,${H + 20} ${30 + W},${H + 20} ${ax},20" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:3"/><line x1="${ax}" y1="20" x2="${ax}" y2="${H + 20}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>${T(30 + W / 2, H + 44, 'base ' + b + ' cm')}${T(ax + 8, 20 + H / 2, 'height ' + h + ' cm', 'start', 14)}`, `Triangle base ${b} cm, height ${h} cm`);
  }
  function rightTriSvg(a, b, c, labels) {
    // right angle at bottom-left; a = vertical side, b = bottom side, c = hypotenuse
    const W = 220, H = 150, x0 = 40, y0 = 20;
    return sv(W + 110, H + 60, `<polygon points="${x0},${y0} ${x0},${y0 + H} ${x0 + W},${y0 + H}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:3"/><rect x="${x0}" y="${y0 + H - 16}" width="16" height="16" style="fill:none;stroke:var(--accent);stroke-width:2"/>${T(x0 - 10, y0 + H / 2 + 5, (labels ? labels[0] + ' = ' : 'a = ') + a, 'end')}${T(x0 + W / 2, y0 + H + 26, (labels ? labels[1] + ' = ' : 'b = ') + b)}${T(x0 + W / 2 + 18, y0 + H / 2 - 8, (labels ? labels[2] + ' = ' : 'c = ') + c, 'start')}`, 'Right-angled triangle');
  }
  function trigSvg(o, a, h, names) {
    // angle θ at bottom-left, right angle at bottom-right, opposite = right side
    const W = 230, H = 140, x0 = 20, y0 = 20;
    const lab = (n, v) => names ? n : v;
    return sv(W + 120, H + 60, `<polygon points="${x0},${y0 + H} ${x0 + W},${y0 + H} ${x0 + W},${y0}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:3"/><rect x="${x0 + W - 16}" y="${y0 + H - 16}" width="16" height="16" style="fill:none;stroke:var(--accent);stroke-width:2"/><path d="M${x0 + 40},${y0 + H} A40,40 0 0 0 ${x0 + 37},${y0 + H - 15}" style="fill:none;stroke:var(--xp);stroke-width:3"/>${T(x0 + 52, y0 + H - 8, 'θ', 'start', 18)}${T(x0 + W + 10, y0 + H / 2 + 5, lab('Opposite', o), 'start')}${T(x0 + W / 2, y0 + H + 26, lab('Adjacent', a))}${T(x0 + W / 2 - 14, y0 + H / 2 - 10, lab('Hypotenuse', h), 'end')}`, 'Right-angled triangle with angle theta');
  }
  function spinnerSvg(n, g) {
    const R = 70, cx = 80, cy = 80; let paths = '';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      paths += `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" style="fill:${i < g ? 'var(--xp)' : 'var(--surface-2)'};stroke:var(--ink);stroke-width:2"/>`;
    }
    return sv(160, 160, paths, `Spinner with ${n} parts, ${g} gold`);
  }
  const VIS = {
    fracbar: () => `<div class="visual"><div class="fbar" aria-label="3 of 4 parts full"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div></div>`,
    rect: () => rectSvg(5, 3),
    numline: () => {
      let s = `<line x1="20" y1="50" x2="460" y2="50" style="stroke:var(--ink);stroke-width:2"/>`;
      for (let v = -5; v <= 5; v++) { const x = 240 + v * 42; s += `<line x1="${x}" y1="42" x2="${x}" y2="58" style="stroke:var(--ink);stroke-width:2"/>${T(x, 82, v < 0 ? '−' + (-v) : v, 'middle', 15)}`; }
      s += `<path d="M${240 - 3 * 42},36 Q${240 - 0.5 * 42},0 ${240 + 2 * 42},36" style="fill:none;stroke:var(--xp);stroke-width:3"/><polygon points="${240 + 2 * 42},40 ${240 + 2 * 42 - 10},30 ${240 + 2 * 42 + 4},28" style="fill:var(--xp)"/>${T(240 - 0.5 * 42, 14, '+5', 'middle', 15)}`;
      return sv(480, 96, s, 'Number line from negative 5 to 5, jumping from negative 3 up 5 to 2');
    },
    graph: () => {
      const ox = 50, oy = 210, u = 30; let s = '';
      for (let i = 0; i <= 5; i++) s += `<line x1="${ox + i * u}" y1="20" x2="${ox + i * u}" y2="${oy}" style="stroke:var(--line);stroke-width:1"/>`;
      for (let j = 0; j <= 6; j++) s += `<line x1="${ox}" y1="${oy - j * u}" x2="${ox + 5 * u}" y2="${oy - j * u}" style="stroke:var(--line);stroke-width:1"/>`;
      s += `<line x1="${ox}" y1="${oy}" x2="${ox + 5.4 * u}" y2="${oy}" style="stroke:var(--ink);stroke-width:2"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="10" style="stroke:var(--ink);stroke-width:2"/>`;
      for (let i = 1; i <= 5; i++) s += T(ox + i * u, oy + 20, i, 'middle', 13);
      for (let j = 1; j <= 6; j++) s += T(ox - 10, oy - j * u + 5, j, 'end', 13);
      s += `<line x1="${ox}" y1="${oy - 1 * u}" x2="${ox + 2.5 * u}" y2="${oy - 6 * u}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/><circle cx="${ox}" cy="${oy - u}" r="6" style="fill:var(--xp)"/>${T(ox + 2.6 * u + 6, oy - 6 * u + 16, 'y = 2x + 1', 'start', 15)}${T(ox + 10, oy - u - 10, 'crosses at 1', 'start', 12)}${T(ox + 5.5 * u, oy + 20, 'x', 'start', 14)}${T(ox, 10, 'y', 'end', 14)}`;
      return sv(300, 240, s, 'Graph of y equals 2x plus 1');
    },
    pythag: () => rightTriSvg('a', 'b', 'c (hypotenuse)', ['a', 'b', 'c']).replace(/a = a|b = b|c = c \(hypotenuse\)/g, m => m.split(' = ')[1]),
    trig: () => trigSvg('O', 'A', 'H', true),
    gridmap: () => {
      const cols = ['A', 'B', 'C', 'D'], cw = 78, ch = 62, x0 = 40, y0 = 36;
      const items = { A1: 'Castle', D1: 'Village', C2: 'Treasure', B3: 'Lake', D3: 'Forest' };
      let s = '';
      cols.forEach((c, i) => { s += T(x0 + i * cw + cw / 2, y0 - 12, c, 'middle', 16); });
      for (let r = 1; r <= 3; r++) {
        s += T(x0 - 14, y0 + (r - 1) * ch + ch / 2 + 6, r, 'middle', 16);
        cols.forEach((c, i) => {
          const k = c + r, x = x0 + i * cw, y = y0 + (r - 1) * ch;
          s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" style="fill:${items[k] ? 'var(--accent-soft)' : 'var(--surface)'};stroke:var(--line);stroke-width:2"/>`;
          if (items[k]) s += T(x + cw / 2, y + ch / 2 + 5, items[k], 'middle', 13);
        });
      }
      s += `<g transform="translate(${x0 + 4 * cw + 34},${y0 + 40})"><circle r="22" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/><polygon points="0,-18 6,0 0,-4 -6,0" style="fill:var(--xp)"/>${T(0, -28, 'N', 'middle', 14)}</g>`;
      return sv(x0 + 4 * cw + 70, y0 + 3 * ch + 10, s, 'Grid map: Castle A1, Village D1, Treasure C2, Lake B3, Forest D3');
    }
  };

  const GEN = {
    spell() {
      const [right, ...wrong] = pick(QC.spell); const sent = QC.spellSentences[right];
      return mcq(`${esc(sent || 'Which spelling is correct?')}<br><span class="muted small-text">Choose the correct spelling.</span>`, right, wrong, `The correct spelling is <b>${right}</b>. Say it in chunks while you look at it.`, { sayAlso: `The word is: ${right}.` });
    },
    placeValue() {
      const n = rnd(10000, 999999), s = String(n);
      const idxs = [...s].map((c, i) => i).filter(i => s[i] !== '0' && i < s.length - 1);
      const i = pick(idxs), d = +s[i], place = 10 ** (s.length - 1 - i), val = d * place;
      const names = { 10: 'tens', 100: 'hundreds', 1000: 'thousands', 10000: 'ten thousands', 100000: 'hundred thousands' };
      let di = -1, html = '';
      for (const ch of fmt(n)) { if (/\d/.test(ch)) { di++; html += di === i ? `<u class="hl">${ch}</u>` : ch; } else html += ch; }
      return mcq(`Your high score is <span class="big-num">${html}</span>. What is the value of the highlighted digit?`, fmt(val), [fmt(val * 10), fmt(d), fmt(val >= 100 ? val / 10 : val * 100), fmt(val * 100)], `The ${d} is in the <b>${names[place]}</b> place, so it is worth ${d} × ${fmt(place)} = <b>${fmt(val)}</b>.`, { sayAlso: `The highlighted digit is ${d}.` });
    },
    rounding() {
      const to = pick([10, 100, 1000]); let n = rnd(1000, 99999); if (n % to === 0) n += 3;
      const ans = Math.round(n / to) * to; const nm = { 10: 'ten', 100: 'hundred', 1000: 'thousand' }[to];
      return numq(`Round <span class="big-num">${fmt(n)}</span> to the nearest <b>${nm}</b>.`, ans, `Look at the digit just to the right of the ${nm}s place. 5 or more: round up. 4 or less: round down. The answer is <b>${fmt(ans)}</b>.`);
    },
    times() {
      const a = rnd(2, 12), b = rnd(2, 12);
      const t = pick([`Your sword does <b>${a}</b> damage per hit. You hit <b>${b}</b> times. How much damage in total?`, `There are <b>${a}</b> chests with <b>${b}</b> gems in each. How many gems altogether?`, `What is <b>${a} × ${b}</b>?`, `A team has <b>${a}</b> players. Each player scores <b>${b}</b> points. What is the team total?`]);
      return numq(t, a * b, `${a} × ${b} = <b>${a * b}</b>. Skip count by ${b}: ${[1, 2, 3].map(k => k * b).join(', ')}… and keep going for ${a} jumps.`);
    },
    divide() {
      const ans = rnd(2, 12), d = rnd(2, 12), total = ans * d;
      const t = pick([`<b>${total}</b> coins are shared equally between <b>${d}</b> players. How many coins each?`, `What is <b>${total} ÷ ${d}</b>?`, `You need <b>${total}</b> XP. Each quest gives <b>${d}</b> XP. How many quests do you need?`]);
      return numq(t, ans, `Think: ${d} × what = ${total}? ${d} × ${ans} = ${total}, so the answer is <b>${ans}</b>.`);
    },
    addSub() {
      if (Math.random() < 0.5) {
        const a = rnd(120, 4999), b = rnd(105, 2999);
        return numq(pick([`You have <b>${fmt(a)}</b> coins and find <b>${fmt(b)}</b> more. How many coins now?`, `What is <b>${fmt(a)} + ${fmt(b)}</b>?`]), a + b, `Line up the ones, tens, hundreds and thousands. Add from the right. Carry when a column makes 10 or more. Answer: <b>${fmt(a + b)}</b>.`);
      }
      const a = rnd(500, 5000), b = rnd(101, a - 50);
      return numq(pick([`Your health is <b>${fmt(a)}</b>. You take <b>${fmt(b)}</b> damage. How much health is left?`, `What is <b>${fmt(a)} − ${fmt(b)}</b>?`]), a - b, `Line up the digits. Subtract from the right. Borrow when the top digit is smaller. Check: ${fmt(a - b)} + ${fmt(b)} = ${fmt(a)}. Answer: <b>${fmt(a - b)}</b>.`);
    },
    fracShade() {
      const n = pick([2, 3, 4, 5, 6, 8, 10]), k = rnd(1, n - 1);
      const bar = `<div class="visual" style="margin-top:12px"><div class="fbar" aria-label="health bar">${Array.from({ length: n }, (_, i) => `<i class="${i < k ? 'on' : ''}"></i>`).join('')}</div></div>`;
      return mcq(`What fraction of this health bar is full?${bar}`, `${k}/${n}`, [`${n - k}/${n}`, `${k}/${n - k}`, `${n}/${k}`, `${k}/${n + 1}`], `Count all the parts: ${n}. That’s the bottom number. Count the full parts: ${k}. That’s the top number. So it’s <b>${k}/${n}</b>.`);
    },
    equivFrac() {
      const [a, b] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5]]); const k = rnd(2, 5);
      return numq(`Fill in the missing number:<br><span class="big-num">${a}/${b} = ?/${b * k}</span>`, a * k, `The bottom went from ${b} to ${b * k}. That’s × ${k}. Do the same to the top: ${a} × ${k} = <b>${a * k}</b>.`);
    },
    money() {
      const price = rnd(105, 995) / 100; const pay = price < 5 ? pick([5, 10]) : pick([10, 20]);
      const ans = Math.round((pay - price) * 100) / 100;
      return numq(`A game skin costs <b>$${price.toFixed(2)}</b>. You pay with a <b>$${pay}</b> note. How much change do you get?`, ans, `Count up from $${price.toFixed(2)} to $${pay}. Or work out ${pay} − ${price.toFixed(2)} = <b>$${ans.toFixed(2)}</b>.`, { unit: '$', pre: true });
    },
    moneyMulti() {
      const each = pick([1.5, 2.5, 0.75, 1.2, 3.5, 2.25, 4.1]), n = rnd(2, 6); const ans = Math.round(each * n * 100) / 100;
      return numq(`Potions cost <b>$${each.toFixed(2)}</b> each. You buy <b>${n}</b>. What is the total cost?`, ans, `${n} × $${each.toFixed(2)} = <b>$${ans.toFixed(2)}</b>. Tip: work in cents: ${Math.round(each * 100)}c × ${n} = ${Math.round(ans * 100)}c.`, { unit: '$', pre: true });
    },
    decCompare() {
      let a, b; do { a = rnd(1, 9) / 10; b = rnd(11, 99) / 100; } while (a === b);
      const big = Math.max(a, b), small = Math.min(a, b);
      return { type: 'mc', q: `Which number is bigger: <b>${a}</b> or <b>${b}</b>?`, opts: [String(big), String(small)], ans: String(big), hint: `Give them the same number of decimal places: ${a.toFixed(2)} and ${b.toFixed(2)}. Now compare: <b>${big}</b> is bigger.` };
    },
    decAdd() {
      const a = rnd(11, 99) / 10, b = rnd(11, 99) / 10; const ans = Math.round((a + b) * 10) / 10;
      return numq(`Your long jump was <b>${a} m</b>. Your second jump was <b>${b} m</b>. What is the total distance?`, ans, `Line up the decimal points: ${a} + ${b} = <b>${ans}</b>.`, { unit: 'm' });
    },
    percentBasic() {
      const p = pick([10, 20, 25, 50, 75]); let base;
      if (p === 10 || p === 20) base = rnd(2, 30) * 10; else if (p === 50) base = rnd(2, 60) * 2; else base = rnd(1, 25) * 4;
      const ans = base * p / 100;
      const how = { 10: 'divide by 10', 20: 'find 10% (divide by 10), then double it', 25: 'divide by 4', 50: 'halve it', 75: 'find 25% (divide by 4), then × 3' }[p];
      return numq(pick([`What is <b>${p}%</b> of <b>${base}</b>?`, `A quest gives <b>${base} XP</b>. A bonus gives you <b>${p}%</b> extra. How much bonus XP?`, `A battery lasts <b>${base}</b> minutes when full. It is <b>${p}%</b> full. How many minutes are left?`]), ans, `To find ${p}%, ${how}: <b>${fmt(ans)}</b>.`);
    },
    orderOps() {
      const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9);
      const f = pick([
        [`${a} + ${b} × ${c}`, a + b * c, `Multiply first: ${b} × ${c} = ${b * c}. Then add: ${a} + ${b * c} = <b>${a + b * c}</b>.`],
        [`(${a} + ${b}) × ${c}`, (a + b) * c, `Brackets first: ${a} + ${b} = ${a + b}. Then multiply: ${a + b} × ${c} = <b>${(a + b) * c}</b>.`],
        [`${a * c} ÷ ${c} + ${b}`, a + b, `Divide first: ${a * c} ÷ ${c} = ${a}. Then add: ${a} + ${b} = <b>${a + b}</b>.`],
        [`${a} × ${b} − ${Math.min(c, a * b - 1)}`, a * b - Math.min(c, a * b - 1), `Multiply first: ${a} × ${b} = ${a * b}. Then subtract: ${a * b} − ${Math.min(c, a * b - 1)} = <b>${a * b - Math.min(c, a * b - 1)}</b>.`],
        [`${a + 20} − ${b} × 2`, a + 20 - b * 2, `Multiply first: ${b} × 2 = ${b * 2}. Then subtract: ${a + 20} − ${b * 2} = <b>${a + 20 - b * 2}</b>.`]
      ]);
      return numq(`Work it out: <span class="big-num">${f[0]}</span>`, f[1], `BODMAS! ${f[2]}`);
    },
    areaRect() {
      const w = rnd(2, 12), h = rnd(2, 9), area = Math.random() < 0.55;
      return numq(`What is the <b>${area ? 'area' : 'perimeter'}</b> of this room?${rectSvg(w, h)}`, area ? w * h : 2 * (w + h), area ? `Area = length × width = ${w} × ${h} = <b>${w * h} m²</b>.` : `Perimeter = add all 4 sides: ${w} + ${h} + ${w} + ${h} = <b>${2 * (w + h)} m</b>.`, { unit: area ? 'm²' : 'm' });
    },
    angles() {
      const k = rnd(0, 2);
      if (k === 0) { const a = rnd(25, 155); return numq(`Two angles sit on a straight line. One is <b>${a}°</b>. What is the other one?`, 180 - a, `Angles on a straight line add to 180°. 180 − ${a} = <b>${180 - a}°</b>.`, { unit: '°' }); }
      if (k === 1) { const a = rnd(30, 90), b = rnd(20, 150 - a); return numq(`A triangle has angles of <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`, 180 - a - b, `The angles in a triangle add to 180°. 180 − ${a} − ${b} = <b>${180 - a - b}°</b>.`, { unit: '°' }); }
      const a = rnd(15, 75); return numq(`A right angle is split into two parts. One part is <b>${a}°</b>. What is the other part?`, 90 - a, `A right angle is 90°. 90 − ${a} = <b>${90 - a}°</b>.`, { unit: '°' });
    },
    integers() {
      const k = rnd(0, 3);
      if (k === 0) { const t = rnd(-10, -1), r = rnd(2, 15); return numq(`It is <b>${t}°C</b> on a snowy mountain level. The temperature rises by <b>${r}</b> degrees. What is it now?`, t + r, `Start at ${t} on the number line and move up ${r}: <b>${t + r}°C</b>.`, { unit: '°C' }); }
      if (k === 1) { const t = rnd(-3, 8), d = rnd(t + 2, t + 12); return numq(`You are on floor <b>${t}</b> of a dungeon tower. You go down <b>${d}</b> floors. Which floor are you on now?`, t - d, `Start at ${t} and move down ${d}: ${t} − ${d} = <b>${t - d}</b>.`); }
      if (k === 2) { const a = rnd(-12, 12), b = rnd(-12, -1), plus = Math.random() < 0.5; return numq(`Work it out: <span class="big-num">${a} ${plus ? '+' : '−'} (${b})</span>`, plus ? a + b : a - b, plus ? `Adding a negative is the same as subtracting: ${a} − ${-b} = <b>${a + b}</b>.` : `Subtracting a negative is the same as adding: ${a} + ${-b} = <b>${a - b}</b>.`); }
      const a = rnd(-9, -2), b = Math.random() < 0.5 ? rnd(2, 9) : rnd(-9, -2);
      return numq(`Work it out: <span class="big-num">${a} × ${b < 0 ? '(' + b + ')' : b}</span>`, a * b, `${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}. ${b < 0 ? 'Negative × negative = positive' : 'Negative × positive = negative'}, so the answer is <b>${a * b}</b>.`);
    },
    fracAmount() {
      const [a, b] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [3, 8], [5, 6]]); const total = b * rnd(2, 12), ans = total / b * a;
      return numq(pick([`What is <b>${a}/${b}</b> of <b>${total}</b> gems?`, `You have <b>${total}</b> arrows. You use <b>${a}/${b}</b> of them. How many did you use?`]), ans, `Divide by the bottom: ${total} ÷ ${b} = ${total / b}. Times by the top: ${total / b} × ${a} = <b>${ans}</b>.`);
    },
    ratio() {
      const a = rnd(1, 5); let b = rnd(1, 5); while (b === a) b = rnd(1, 5);
      const k = rnd(2, 10), total = (a + b) * k, big = Math.max(a, b) * k;
      return numq(`Two players share <b>${total}</b> gold in the ratio <b>${a} : ${b}</b>. How much does the player with the <b>bigger</b> share get?`, big, `Parts: ${a} + ${b} = ${a + b}. One part: ${total} ÷ ${a + b} = ${k}. Bigger share: ${Math.max(a, b)} × ${k} = <b>${big}</b>.`);
    },
    substitute() {
      const x = rnd(2, 9), a = rnd(2, 6), b = rnd(1, 12);
      const f = pick([[`${a}x + ${b}`, a * x + b, `${a} × ${x} + ${b} = ${a * x} + ${b}`], [`${a}x − ${b}`, a * x - b, `${a} × ${x} − ${b} = ${a * x} − ${b}`], [`x² + ${b}`, x * x + b, `${x} × ${x} + ${b} = ${x * x} + ${b}`], [`${a}(x + ${b})`, a * (x + b), `${a} × (${x} + ${b}) = ${a} × ${x + b}`]]);
      return numq(`If <b>x = ${x}</b>, what is <span class="big-num">${f[0]}</span>?`, f[1], `Swap x for ${x}: ${f[2]} = <b>${f[1]}</b>.`);
    },
    stats() {
      const kind = pick(['mean', 'median', 'range', 'mode']); let nums;
      if (kind === 'mode') { const set = new Set(); while (set.size < 4) set.add(rnd(1, 20)); const arr = [...set]; nums = shuffle([...arr, arr[0]]); }
      else { nums = Array.from({ length: 5 }, () => rnd(1, 20)); if (kind === 'mean') { const r = nums.reduce((p, c) => p + c, 0) % 5; if (r) nums[4] = nums[4] - r > 0 ? nums[4] - r : nums[4] + (5 - r); } }
      const sorted = [...nums].sort((x, y) => x - y), sum = nums.reduce((p, c) => p + c, 0);
      const q = `Your last 5 game scores: <b>${nums.join(', ')}</b>. What is the <b>${kind}</b>?`;
      if (kind === 'mean') return numq(q, sum / 5, `Add them: ${nums.join(' + ')} = ${sum}. Divide by 5: <b>${sum / 5}</b>.`);
      if (kind === 'median') return numq(q, sorted[2], `Put them in order: ${sorted.join(', ')}. The middle one is <b>${sorted[2]}</b>.`);
      if (kind === 'range') return numq(q, sorted[4] - sorted[0], `Biggest − smallest: ${sorted[4]} − ${sorted[0]} = <b>${sorted[4] - sorted[0]}</b>.`);
      const counts = {}; nums.forEach(n => { counts[n] = (counts[n] || 0) + 1; }); const mode = +Object.keys(counts).find(k => counts[k] === 2);
      return numq(q, mode, `${mode} appears twice. It’s the most common, so the mode is <b>${mode}</b>.`);
    },
    equations() {
      const x = rnd(2, 15), k = rnd(0, 3);
      if (k === 0) { const b = rnd(2, 20); return numq(`Solve for x: <span class="big-num">x + ${b} = ${x + b}</span>`, x, `Take ${b} from both sides: x = ${x + b} − ${b} = <b>${x}</b>.`, { unit: 'x =', pre: true }); }
      if (k === 1) { const a = rnd(2, 9); return numq(`Solve for x: <span class="big-num">${a}x = ${a * x}</span>`, x, `Divide both sides by ${a}: x = ${a * x} ÷ ${a} = <b>${x}</b>.`, { unit: 'x =', pre: true }); }
      if (k === 2) { const a = rnd(2, 6), b = rnd(1, 15); return numq(`Solve for x: <span class="big-num">${a}x + ${b} = ${a * x + b}</span>`, x, `Take ${b} from both sides: ${a}x = ${a * x}. Divide by ${a}: x = <b>${x}</b>.`, { unit: 'x =', pre: true }); }
      const a = rnd(2, 6), b = rnd(1, 10); return numq(`Solve for x: <span class="big-num">${a}x − ${b} = ${a * x - b}</span>`, x, `Add ${b} to both sides: ${a}x = ${a * x}. Divide by ${a}: x = <b>${x}</b>.`, { unit: 'x =', pre: true });
    },
    percentChange() {
      const p = pick([10, 20, 25, 50]); const price = p === 25 ? rnd(2, 30) * 4 : rnd(2, 20) * 10; const off = price * p / 100;
      if (Math.random() < 0.65) return numq(`A game costs <b>$${price}</b>. It’s <b>${p}% off</b> in a sale. What is the sale price?`, price - off, `${p}% of $${price} is $${fmt(off)}. Take it off: ${price} − ${fmt(off)} = <b>$${fmt(price - off)}</b>.`, { unit: '$', pre: true });
      return numq(`A controller costs <b>$${price}</b>. The price goes <b>up ${p}%</b>. What is the new price?`, price + off, `${p}% of $${price} is $${fmt(off)}. Add it on: ${price} + ${fmt(off)} = <b>$${fmt(price + off)}</b>.`, { unit: '$', pre: true });
    },
    areaTri() {
      const b = rnd(2, 8) * 2, h = rnd(2, 12);
      return numq(`What is the area of this triangle?${triAreaSvg(b, h)}`, b * h / 2, `Area = ½ × base × height = ½ × ${b} × ${h} = <b>${b * h / 2} cm²</b>.`, { unit: 'cm²' });
    },
    circle() {
      const r = rnd(1, 10);
      if (Math.random() < 0.5) { const ans = Math.round(3.14 * r * r * 100) / 100; return numq(`A round arena has a radius of <b>${r} m</b>. What is its area? Use π ≈ 3.14.`, ans, `Area = π × r × r = 3.14 × ${r} × ${r} = <b>${fmt(ans)} m²</b>.`, { unit: 'm²', tol: 0.5 }); }
      const ans = Math.round(2 * 3.14 * r * 100) / 100; return numq(`A round shield has a radius of <b>${r} cm</b>. What is its circumference? Use π ≈ 3.14.`, ans, `Circumference = 2 × π × r = 2 × 3.14 × ${r} = <b>${fmt(ans)} cm</b>.`, { unit: 'cm', tol: 0.5 });
    },
    probability() {
      const k = rnd(0, 2);
      if (k === 0) { const n = pick([4, 5, 6, 8, 10]), g = rnd(1, n - 1); return mcq(`A spinner has <b>${n}</b> equal parts. <b>${g}</b> of them are gold. What is the probability of landing on gold?${spinnerSvg(n, g)}`, `${g}/${n}`, [`${n - g}/${n}`, `${g}/${n - g}`, `1/${n}`, `${n}/${g}`], `Probability = gold parts ÷ total parts = <b>${g}/${n}</b>.`); }
      if (k === 1) { const ev = pick([['a number greater than 4', 2], ['an even number', 3], ['a 1', 1], ['a number less than 3', 2], ['a number greater than 2', 4]]); return mcq(`You roll a normal 6-sided dice. What is the probability of rolling <b>${ev[0]}</b>?`, `${ev[1]}/6`, [`${6 - ev[1]}/6`, `${ev[1]}/5`, `1/${ev[1] + 1}`, '0'], `List the numbers that work and count them: ${ev[1]} out of 6 = <b>${ev[1]}/6</b>.`); }
      const red = rnd(1, 5), blue = rnd(1, 5), total = red + blue;
      return mcq(`A chest has <b>${red}</b> red gems and <b>${blue}</b> blue gems. You grab one without looking. What is the probability it is <b>red</b>?`, `${red}/${total}`, [`${blue}/${total}`, `${red}/${blue}`, `1/${total}`, `${red}/${total + 1}`], `There are ${total} gems and ${red} are red. Probability = <b>${red}/${total}</b>.`);
    },
    powers() {
      if (Math.random() < 0.6) { const b = rnd(2, 6), e = b <= 3 ? rnd(2, 5) : rnd(2, 3); return numq(`Work it out: <span class="big-num">${b}<sup>${e}</sup></span>`, b ** e, `${b}<sup>${e}</sup> = ${Array(e).fill(b).join(' × ')} = <b>${b ** e}</b>.`, { sayAlso: `${b} to the power of ${e}.` }); }
      const b = rnd(2, 9), e = rnd(3, 5);
      return mcq(`Write <b>${Array(e).fill(b).join(' × ')}</b> as a power.`, `${b}<sup>${e}</sup>`, [`${e}<sup>${b}</sup>`, `${b} × ${e}`, `${b * e}`], `${b} is multiplied by itself ${e} times, so it’s <b>${b}<sup>${e}</sup></b>.`);
    },
    expand() {
      const a = rnd(2, 7), b = rnd(1, 9), neg = Math.random() < 0.3, s = neg ? '−' : '+';
      return mcq(`Expand: <span class="big-num">${a}(x ${s} ${b})</span>`, `${a}x ${s} ${a * b}`, [`${a}x ${s} ${b}`, `x ${s} ${a * b}`, `${a}x ${neg ? '+' : '−'} ${a * b}`, `${a + b}x`], `Multiply everything inside by ${a}: ${a} × x = ${a}x and ${a} × ${b} = ${a * b}. So it’s <b>${a}x ${s} ${a * b}</b>.`);
    },
    likeTerms() {
      const a = rnd(2, 8), b = rnd(1, 9), c = rnd(2, 8);
      return mcq(`Simplify: <span class="big-num">${a}x + ${b} + ${c}x</span>`, `${a + c}x + ${b}`, [`${a + b + c}x`, `${a * c}x + ${b}`, `${a + c}x + ${b}x`, `${a + b}x + ${c}`], `Put the x terms together: ${a}x + ${c}x = ${a + c}x. The ${b} stays on its own. Answer: <b>${a + c}x + ${b}</b>.`);
    },
    linear() {
      const m = rnd(2, 5), c = Math.random() < 0.3 ? rnd(-4, -1) : rnd(1, 9), k = rnd(0, 2);
      const tail = c < 0 ? `− ${-c}` : `+ ${c}`, rule = `y = ${m}x ${tail}`;
      if (k === 0) { const x = rnd(0, 6); return numq(`The rule is <span class="big-num">${rule}</span>. What is y when x = ${x}?`, m * x + c, `Put ${x} in for x: ${m} × ${x} ${tail} = <b>${m * x + c}</b>.`); }
      if (k === 1) return numq(`What is the <b>gradient</b> of <span class="big-num">${rule}</span>?`, m, `In y = mx + c, the gradient is m, the number in front of x: <b>${m}</b>.`);
      return numq(`Where does <span class="big-num">${rule}</span> cross the y-axis? (What is the y-intercept?)`, c, `In y = mx + c, the y-intercept is c: <b>${c}</b>.`);
    },
    pythag() {
      const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      if (Math.random() < 0.6) return numq(`Find the hypotenuse <b>c</b> (in cm).${rightTriSvg(a, b, '?')}`, c, `a² + b² = c². ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. √${c * c} = <b>${c}</b>.`, { unit: 'cm' });
      return numq(`Find the missing side <b>b</b> (in cm).${rightTriSvg(a, '?', c)}`, b, `c² − a² = b². ${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}. √${b * b} = <b>${b}</b>.`, { unit: 'cm' });
    },
    interest() {
      const P = pick([100, 200, 400, 500, 1000, 2000]), r = pick([2, 3, 4, 5, 10]), t = rnd(1, 5), I_ = P * r * t / 100;
      return numq(`You save <b>$${fmt(P)}</b> in a bank account at <b>${r}%</b> simple interest per year. How much interest do you earn in <b>${plural(t, 'year')}</b>?`, I_, `I = P × r × t ÷ 100 = ${P} × ${r} × ${t} ÷ 100 = <b>$${fmt(I_)}</b>.`, { unit: '$', pre: true });
    },
    sciNot() {
      const d1 = rnd(1, 9), d2 = rnd(1, 9), k = rnd(3, 8), sup = e => `10<sup>${e}</sup>`;
      const n = Number(`${d1}${d2}${'0'.repeat(k - 1)}`);
      if (Math.random() < 0.6) return mcq(`Write <span class="big-num">${fmt(n)}</span> in scientific notation.`, `${d1}.${d2} × ${sup(k)}`, [`${d1}${d2} × ${sup(k - 1)}`, `${d1}.${d2} × ${sup(k - 1)}`, `${d1}.${d2} × ${sup(k + 1)}`], `Move the decimal point until there’s one digit in front: ${d1}.${d2}. You moved it ${k} places, so it’s <b>${d1}.${d2} × ${sup(k)}</b>.`);
      const e = rnd(2, 5), ans = Number(`${d1}${d2}${'0'.repeat(e - 1)}`);
      return numq(`Write as a normal number: <span class="big-num">${d1}.${d2} × ${sup(e)}</span>`, ans, `Move the decimal point ${e} places to the right: <b>${fmt(ans)}</b>.`, { sayAlso: `${d1} point ${d2} times 10 to the power of ${e}.` });
    },
    trig() {
      const [o, a, h] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]); const f = pick(['sin', 'cos', 'tan']);
      const pair = f === 'sin' ? [o, h] : f === 'cos' ? [a, h] : [o, a];
      const rule = f === 'sin' ? 'SOH: sin = Opposite ÷ Hypotenuse' : f === 'cos' ? 'CAH: cos = Adjacent ÷ Hypotenuse' : 'TOA: tan = Opposite ÷ Adjacent';
      if (Math.random() < 0.5) return mcq(`Using the angle θ, what is <b>${f} θ</b>?${trigSvg(o, a, h)}`, `${pair[0]}/${pair[1]}`, [`${o}/${h}`, `${a}/${h}`, `${o}/${a}`, `${a}/${o}`, `${h}/${o}`], `${rule} = <b>${pair[0]}/${pair[1]}</b>.`);
      const val = Math.round(pair[0] / pair[1] * 100) / 100;
      return numq(`Using the angle θ, work out <b>${f} θ</b> as a decimal (2 decimal places).${trigSvg(o, a, h)}`, val, `${rule} = ${pair[0]} ÷ ${pair[1]} = <b>${fmt(val)}</b>.`, { tol: 0.011 });
    }
  };

  function norm(a) {
    const [t, q, x, hint, extra] = a;
    const base = { q, hint };
    if (t === 'm') return Object.assign(base, { type: 'mc', opts: x.slice(), ans: x[0] }, extra || {}, extra && extra.v ? { q: q + VIS[extra.v]() } : {});
    if (t === 'o') return Object.assign(base, { type: 'order', items: x });
    if (t === 's') return Object.assign(base, { type: 'sort', groups: x });
    if (t === 'p') return Object.assign(base, { type: 'match', pairs: x });
    return null;
  }
  function genQ(names, seen) {
    for (let tries = 0; tries < 10; tries++) {
      const q = GEN[pick(names)]();
      const key = q.q + '|' + q.ans;
      if (!seen.has(key)) { seen.add(key); return q; }
    }
    return GEN[pick(names)]();
  }
  function buildSteps(L) {
    const steps = (L.c || []).map(c => ({ k: 'learn', title: c[1], body: c[2], v: c[3] }));
    let qs = (L.q || []).map(norm).filter(Boolean);
    if (L.g) { const seen = new Set(); for (let i = 0; i < (L.gn || 6); i++) qs.push(genQ(L.g, seen)); }
    qs = shuffle(qs);
    qs.forEach(q => steps.push({ k: 'q', q }));
    if (L.k) steps.push({ k: 'mission', text: L.k });
    return steps;
  }

  /* ───────────── question engine ───────────── */
  const GOOD = ['Nice one!', 'Critical hit!', 'You got it!', 'Combo +1!', 'Smooth move.', 'That’s the one.', 'Spot on.', 'Boss-level thinking.', 'Yes! Well played.', 'Clean win.'];
  const RETRY = ['Good try. Have another go.', 'Not quite. You’re close.', 'Respawn and try again.', 'That’s okay. Mistakes help your brain grow.', 'Almost. Check the hint.', 'No stress. Try another one.'];
  const REVEAL = ['Here’s the answer. Now you know it for next time.', 'That was a tricky one. Here’s how it works.', 'All good. Tricky ones build your skills.'];
  let curQ = null; let keyHandler = null;

  const qHeader = q => `<div class="say"><div class="say-text q-text" id="qtext">${q.q}</div><button class="spk lg" data-act="readq" aria-label="Read the question out loud">${I.speaker}</button></div>`;
  function retryFb(host, q, msg) {
    const fb = host.querySelector('#fb'); fb.className = 'fb retry';
    fb.innerHTML = `<div class="fb-title">${esc(msg || pick(RETRY))}</div>${q.hint ? sayBlock(`<p><b>Hint:</b> ${q.hint}</p>`) : ''}`;
    chime(false);
  }

  function mountQ(q, host, mode, done) {
    curQ = q; keyHandler = null;
    const fn = { mc: mcUI, order: orderUI, sort: sortUI, match: matchUI, num: numUI }[q.type];
    fn(q, host, mode, done);
  }

  function mcUI(q, host, mode, done) {
    const opts = shuffle(q.opts);
    host.innerHTML = qHeader(q) + `<div class="opts" role="group" aria-label="Answers">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="key">${'ABCD'[i]}</span><span class="opt-text">${o}</span></button>`).join('')}</div>` +
      (mode === 'check' ? `<div class="row"><button class="btn ghost" id="skipq">I don’t know this one yet</button></div>` : '') + `<div class="fb" id="fb" aria-live="polite"></div>`;
    let tries = 0, finished = false; const maxTries = opts.length <= 2 ? 1 : 2;
    const lock = () => host.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
    const pickOpt = b => {
      if (finished || b.disabled) return;
      const o = opts[+b.dataset.i];
      if (mode === 'check') { finished = true; lock(); b.classList.add(o === q.ans ? 'right' : 'no'); done({ firstTry: o === q.ans, tries: 1 }); return; }
      if (o === q.ans) { finished = true; b.classList.add('right'); lock(); done({ firstTry: tries === 0, tries: tries + 1 }); return; }
      tries++; b.classList.add('no'); b.disabled = true;
      if (tries >= maxTries) { finished = true; host.querySelectorAll('.opt').forEach(x => { if (opts[+x.dataset.i] === q.ans) x.classList.add('right'); }); lock(); done({ firstTry: false, tries, revealed: true }); }
      else retryFb(host, q);
    };
    host.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => pickOpt(b)));
    const sk = host.querySelector('#skipq'); if (sk) sk.addEventListener('click', () => { if (finished) return; finished = true; lock(); sk.disabled = true; done({ firstTry: false, tries: 1, skipped: true }); });
    keyHandler = e => { const n = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()]; if (n != null) { const b = host.querySelectorAll('.opt')[n]; if (b) { e.preventDefault(); pickOpt(b); } } };
  }

  function orderUI(q, host, mode, done) {
    const items = q.items, n = items.length;
    let pool = shuffle(items.map((t, id) => ({ t, id })));
    if (n > 1 && pool.every((p, i) => p.t === items[i])) pool = pool.slice(1).concat(pool[0]);
    const slots = Array(n).fill(null), locked = Array(n).fill(false);
    const long = items.some(t => t.length > 16);
    let tries = 0, finished = false;
    host.innerHTML = qHeader(q) + `<p class="muted small-text">Tap the cards in the right order. Tap a placed card to take it back.</p><div class="slots ${long ? 'col' : ''}" id="slots"></div><div class="pool" id="pool"></div><div class="row"><button class="btn primary big" id="checkbtn" disabled>Check</button><button class="btn ghost" id="clearbtn">Clear</button></div><div class="fb" id="fb" aria-live="polite"></div>`;
    const draw = () => {
      host.querySelector('#slots').innerHTML = slots.map((s, i) => `<button class="slot ${s ? 'filled' : ''} ${locked[i] ? 'ok' : ''}" data-i="${i}" ${locked[i] || finished ? 'disabled' : ''}>${long ? `<span class="num">${i + 1}</span>` : ''}${s ? s.t : (long ? '<span class="muted small-text">empty</span>' : '&nbsp;')}</button>`).join('');
      host.querySelector('#pool').innerHTML = pool.map(p => `<button class="tag ${slots.some(s => s && s.id === p.id) ? 'used' : ''}" data-id="${p.id}" ${finished ? 'disabled' : ''}>${p.t}</button>`).join('');
      host.querySelector('#checkbtn').disabled = finished || slots.some(s => !s);
    };
    host.querySelector('#pool').addEventListener('click', e => {
      const b = e.target.closest('.tag'); if (!b || finished) return;
      const p = pool.find(x => x.id === +b.dataset.id); if (slots.some(s => s && s.id === p.id)) return;
      const i = slots.findIndex(s => !s); if (i < 0) return; slots[i] = p; draw();
    });
    host.querySelector('#slots').addEventListener('click', e => {
      const b = e.target.closest('.slot'); if (!b || finished) return; const i = +b.dataset.i; if (locked[i]) return; slots[i] = null; draw();
    });
    host.querySelector('#clearbtn').addEventListener('click', () => { if (finished) return; for (let i = 0; i < n; i++) if (!locked[i]) slots[i] = null; draw(); });
    host.querySelector('#checkbtn').addEventListener('click', () => {
      if (finished) return;
      const ok = slots.map((s, i) => s && s.t === items[i]);
      if (ok.every(Boolean)) { finished = true; ok.forEach((_, i) => { locked[i] = true; }); draw(); done({ firstTry: tries === 0, tries: tries + 1 }); return; }
      tries++;
      ok.forEach((g, i) => { if (g) locked[i] = true; else slots[i] = null; });
      if (tries >= 3) { finished = true; items.forEach((t, i) => { slots[i] = pool.find(p => p.t === t); locked[i] = true; }); draw(); done({ firstTry: false, tries, revealed: true }); return; }
      draw(); retryFb(host, q, `${ok.filter(Boolean).length} of ${n} in the right spot. The green ones are locked in.`);
    });
    draw();
  }

  function sortUI(q, host, mode, done) {
    const groups = Object.keys(q.groups);
    const all = shuffle(groups.flatMap((g, gi) => q.groups[g].map(t => ({ t, gi })))).map((x, id) => Object.assign(x, { id }));
    const place = {}; const okIds = new Set(); let sel = null, tries = 0, finished = false;
    host.innerHTML = qHeader(q) + `<p class="muted small-text">Tap a card, then tap the box it belongs in.</p><div class="pool" id="pool"></div><div class="bins" id="bins"></div><div class="row"><button class="btn primary big" id="checkbtn" disabled>Check</button></div><div class="fb" id="fb" aria-live="polite"></div>`;
    const draw = () => {
      host.querySelector('#pool').innerHTML = all.filter(x => place[x.id] == null).map(x => `<button class="tag ${sel === x.id ? 'sel' : ''}" data-id="${x.id}">${x.t}</button>`).join('') || `<span class="muted small-text">All cards placed. Tap Check.</span>`;
      host.querySelector('#bins').innerHTML = groups.map((g, gi) => `<div class="bin ${sel != null ? 'target' : ''}" data-g="${gi}" role="button" tabindex="0" aria-label="Put in ${esc(g)}"><span class="bin-name">${g}</span><div class="bin-items">${all.filter(x => place[x.id] === gi).map(x => `<button class="tag ${okIds.has(x.id) ? 'ok' : ''}" data-id="${x.id}" ${okIds.has(x.id) || finished ? 'aria-disabled="true"' : ''}>${x.t}</button>`).join('')}</div></div>`).join('');
      host.querySelector('#checkbtn').disabled = finished || all.some(x => place[x.id] == null);
    };
    host.querySelector('#pool').addEventListener('click', e => { const b = e.target.closest('.tag'); if (!b || finished) return; const id = +b.dataset.id; sel = sel === id ? null : id; draw(); });
    const binClick = e => {
      if (finished) return;
      const bin = e.target.closest('.bin'); if (!bin) return;
      const t = e.target.closest('.tag');
      if (sel == null && t) { const id = +t.dataset.id; if (!okIds.has(id)) { delete place[id]; draw(); } return; }
      if (sel == null) { toast('Tap a card first, then tap a box.'); return; }
      place[sel] = +bin.dataset.g; sel = null; draw();
    };
    host.querySelector('#bins').addEventListener('click', binClick);
    host.querySelector('#bins').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); binClick(e); } });
    host.querySelector('#checkbtn').addEventListener('click', () => {
      if (finished) return;
      const wrong = all.filter(x => place[x.id] !== x.gi);
      all.forEach(x => { if (place[x.id] === x.gi) okIds.add(x.id); });
      if (!wrong.length) { finished = true; draw(); done({ firstTry: tries === 0, tries: tries + 1 }); return; }
      tries++;
      if (tries >= 3) { finished = true; all.forEach(x => { place[x.id] = x.gi; okIds.add(x.id); }); draw(); done({ firstTry: false, tries, revealed: true }); return; }
      wrong.forEach(x => { delete place[x.id]; });
      draw(); retryFb(host, q, `${all.length - wrong.length} of ${all.length} are right and locked in. Try the others again.`);
    });
    draw();
  }

  function matchUI(q, host, mode, done) {
    const left = q.pairs.map((p, i) => ({ t: p[0], i })), right = shuffle(q.pairs.map((p, i) => ({ t: p[1], i })));
    const matched = {}; let selL = null, selR = null, mistakes = 0, finished = false, count = 0;
    host.innerHTML = qHeader(q) + `<p class="muted small-text">Tap one on the left, then its partner on the right.</p><div class="match"><div class="mcol" id="ml"></div><div class="mcol" id="mr"></div></div><div class="fb" id="fb" aria-live="polite"></div>`;
    const draw = () => {
      host.querySelector('#ml').innerHTML = left.map(x => `<button class="tag ${matched[x.i] ? 'ok' : ''} ${selL === x.i ? 'sel' : ''}" data-side="l" data-i="${x.i}" ${matched[x.i] ? 'disabled' : ''}>${matched[x.i] ? `<span class="pair-n">${matched[x.i]}</span>` : ''}${x.t}</button>`).join('');
      host.querySelector('#mr').innerHTML = right.map(x => `<button class="tag ${matched[x.i] ? 'ok' : ''} ${selR === x.i ? 'sel' : ''}" data-side="r" data-i="${x.i}" ${matched[x.i] ? 'disabled' : ''}>${matched[x.i] ? `<span class="pair-n">${matched[x.i]}</span>` : ''}${x.t}</button>`).join('');
    };
    const tryPair = () => {
      if (selL == null || selR == null) return;
      if (selL === selR) {
        matched[selL] = ++count; selL = selR = null; draw(); chime(true);
        const fb = host.querySelector('#fb'); fb.className = 'fb'; fb.innerHTML = '';
        if (count === left.length) { finished = true; done({ firstTry: mistakes === 0, tries: mistakes + 1 }); }
      } else {
        mistakes++; selR = null; draw();
        retryFb(host, mistakes >= 2 ? q : Object.assign({}, q, { hint: '' }), 'Not a pair. Try another one.');
      }
    };
    host.querySelector('.match').addEventListener('click', e => {
      const b = e.target.closest('.tag'); if (!b || finished || b.disabled) return;
      const i = +b.dataset.i;
      if (b.dataset.side === 'l') selL = selL === i ? null : i; else selR = selR === i ? null : i;
      draw(); tryPair();
    });
    draw();
  }

  function numUI(q, host, mode, done) {
    let val = '', tries = 0, finished = false;
    const keys = ['1', '2', '3', 'back', '4', '5', '6', '-', '7', '8', '9', '.', '0', 'go'];
    host.innerHTML = qHeader(q) + `<div class="numpad-wrap"><div class="num-display" id="nd" aria-live="polite"></div><div class="numpad" id="pad">${keys.map(k => k === 'back' ? `<button data-k="back" aria-label="Delete">⌫</button>` : k === 'go' ? `<button data-k="go" class="wide go">Check</button>` : k === '0' ? `<button data-k="0" class="wide">0</button>` : k === '-' ? `<button data-k="-" aria-label="Minus">−</button>` : `<button data-k="${k}">${k}</button>`).join('')}</div>${mode === 'check' ? `<button class="btn ghost" id="skipq">I don’t know this one yet</button>` : ''}</div><div class="fb" id="fb" aria-live="polite"></div>`;
    const unit = q.unit || '';
    const show = () => {
      const v = val ? esc(val.replace('-', '−')) : '<span class="ph">Tap the numbers</span>';
      host.querySelector('#nd').innerHTML = q.pre ? `<span class="unit">${esc(unit)}</span>${v}` : `${v}${unit ? `<span class="unit">${esc(unit)}</span>` : ''}`;
    };
    const press = k => {
      if (finished) return;
      if (k === 'back') val = val.slice(0, -1);
      else if (k === '-') val = val.startsWith('-') ? val.slice(1) : '-' + val;
      else if (k === '.') { if (!val.includes('.')) val += (val === '' || val === '-' ? '0.' : '.'); }
      else if (k === 'go') return check();
      else if (val.replace(/[-.]/g, '').length < 10) val += k;
      show();
    };
    const check = () => {
      const v = Number(val);
      if (val === '' || val === '-' || isNaN(v)) { toast('Type a number first.'); return; }
      const ok = Math.abs(v - Number(q.ans)) <= (q.tol || 0.001);
      if (mode === 'check') { finished = true; done({ firstTry: ok, tries: 1 }); return; }
      if (ok) { finished = true; host.querySelector('#nd').style.borderColor = 'var(--good)'; done({ firstTry: tries === 0, tries: tries + 1 }); return; }
      tries++;
      if (tries >= 2) { finished = true; done({ firstTry: false, tries, revealed: true }); return; }
      retryFb(host, q);
    };
    host.querySelector('#pad').addEventListener('click', e => { const b = e.target.closest('button'); if (b) press(b.dataset.k); });
    const sk = host.querySelector('#skipq'); if (sk) sk.addEventListener('click', () => { if (finished) return; finished = true; sk.disabled = true; done({ firstTry: false, tries: 1, skipped: true }); });
    keyHandler = e => {
      if (/^[0-9]$/.test(e.key)) press(e.key); else if (e.key === '.' || e.key === ',') press('.'); else if (e.key === '-') press('-');
      else if (e.key === 'Backspace') { e.preventDefault(); press('back'); } else if (e.key === 'Enter' && !finished) { e.preventDefault(); press('go'); } else return;
    };
    show();
  }

  /* ───────────── router ───────────── */
  let R = { name: 'home', p: {} };
  let returnTo = null;
  const ACTIVE = new Set(['lesson', 'check', 'write', 'project', 'intro']);
  function go(name, p = {}) {
    TTS.stop(); closeModal(); keyHandler = null; curQ = null;
    if (name === 'break' && R.name !== 'break') { returnTo = { name: R.name, p: R.p }; }
    R = { name, p };
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    renderTop();
    keyHandler = null;
    const old = $('#main'); const main = old.cloneNode(false); old.replaceWith(main);
    if (!S.setup && R.name !== 'welcome') R = { name: 'welcome', p: {} };
    (SCREENS[R.name] || SCREENS.home)(main, R.p);
    if (focusNudge.pending && ACTIVE.has(R.name)) showNudge();
  }
  const backBtn = (act, label, data = '') => `<button class="btn ghost small" data-act="${act}" ${data}>${I.back}<span>${esc(label)}</span></button>`;

  /* ───────────── top bar ───────────── */
  function renderTop() {
    const top = $('#topbar'); if (!top) return;
    const li = levelInfo(S.xp); const name = S.name || 'New player';
    top.innerHTML = `<div class="topbar-in">
      <button class="icon-btn" data-act="home" aria-label="Home">${I.home}</button>
      <div class="player"><div class="avatar" aria-hidden="true">${esc((name[0] || 'P').toUpperCase())}</div>
        <div class="player-meta"><div class="player-name">${esc(name)}</div>
          <div class="xpline"><span class="lvl">LVL ${li.lvl}</span><div class="xpbar" role="progressbar" aria-label="XP to next level" aria-valuemin="0" aria-valuemax="${li.need}" aria-valuenow="${li.into}"><i style="width:${Math.round(li.into / li.need * 100)}%"></i></div><span class="lvl" style="color:var(--muted)">${li.into}/${li.need}</span></div>
        </div></div>
      <div class="top-actions"><span class="focus-chip" id="focus" hidden></span>
        <button class="icon-btn break-btn" data-act="break">${I.pause}<span>Break</span></button>
        <button class="icon-btn" data-act="settings" aria-label="Settings">${I.gear}</button></div>
    </div>`;
    updateFocusChip();
  }

  /* focus timer: counts time actually spent on learning screens */
  const focusNudge = { sec: 0, next: 0, pending: false };
  let lastInput = Date.now(), activeSec = 0;
  function resetFocus() { focusNudge.sec = 0; focusNudge.next = (S.settings.timer || 0) * 60; focusNudge.pending = false; $('#nudge') && $('#nudge').remove(); }
  function updateFocusChip() {
    const el = $('#focus'); if (!el) return;
    if (!ACTIVE.has(R.name) || !S.settings.timer) { el.hidden = true; return; }
    el.hidden = false;
    const m = Math.floor(focusNudge.sec / 60), s = focusNudge.sec % 60, goal = S.settings.timer * 60;
    el.innerHTML = `<span>FOCUS ${m}:${String(s).padStart(2, '0')}</span><span class="mini"><i style="width:${Math.min(100, focusNudge.sec / goal * 100)}%"></i></span>`;
    el.setAttribute('aria-label', `Focused for ${m} minutes`);
  }
  function tick() {
    const active = document.visibilityState === 'visible' && ACTIVE.has(R.name) && Date.now() - lastInput < 150000;
    if (active) {
      focusNudge.sec++; activeSec++;
      if (activeSec >= 60) { activeSec = 0; const k = dayKey(); S.time[k] = (S.time[k] || 0) + 1; S.days[k] = true; saveSoon(); }
      if (S.settings.timer && focusNudge.next && focusNudge.sec >= focusNudge.next && !focusNudge.pending) { focusNudge.pending = true; showNudge(); }
    }
    updateFocusChip();
  }
  function showNudge() {
    if ($('#nudge')) return;
    const m = Math.round(focusNudge.sec / 60);
    const div = document.createElement('div'); div.className = 'banner'; div.id = 'nudge';
    div.innerHTML = `<div class="b-text">${sayBlock(`<p><b>You’ve focused for ${m} minutes.</b> Great effort! Time for a brain break?</p>`)}</div><div class="row"><button class="btn calm" data-act="break">Take a break</button><button class="btn ghost" data-act="keep-going">Keep going</button></div>`;
    $('#main').prepend(div);
  }

  /* ───────────── screens ───────────── */
  const SCREENS = {};

  SCREENS.welcome = main => {
    const st = S.settings;
    main.innerHTML = `<div class="stack">
      <div><div class="eyebrow">New game</div><h1>Welcome to Catch-Up Quest</h1></div>
      <div class="card flat">${sayBlock(md('This app helps you catch up to **Year 9**, one small level at a time.\n- Every lesson is short: about 5 to 10 minutes.\n- You earn **XP** and unlock **badges**.\n- Tap the speaker on anything to hear it read out loud.\n- Press **Break** at the top whenever you need a rest.'))}</div>
      <div class="card flat stack tight"><label for="w-name"><h2>What should I call you?</h2></label>
        <input class="field" id="w-name" maxlength="24" autocomplete="off" placeholder="Your name or gamer tag" value="${esc(S.name)}">
        <p class="muted small-text">On iPad you can tap the microphone on the keyboard and say it.</p></div>
      <div class="card flat stack tight"><h2>Pick the reading style that feels easiest</h2>
        <div class="type-grid" id="w-font">
          ${[['lexend', 'Lexend', '"Lexend", sans-serif'], ['atkinson', 'Atkinson', '"Atkinson Hyperlegible", sans-serif'], ['system', 'Plain', 'system-ui, sans-serif']].map(([k, n, f]) => `<button class="choice ${st.font === k ? 'on' : ''}" data-font="${k}" style="font-family:${f}"><span class="c-name">${n}</span><span class="c-sub" style="font-family:${f}">The fox found 3 gold coins.</span></button>`).join('')}
        </div>
        <p class="muted small-text">Background colour</p>
        <div class="swatches" id="w-tint">${tintSwatches(st.tint)}</div>
        <p class="muted small-text">Text size</p>
        <div class="seg" id="w-size">${[[0.9, 'Small'], [1, 'Medium'], [1.12, 'Large'], [1.25, 'Extra large']].map(([v, n]) => `<button data-v="${v}" class="${st.scale === v ? 'on' : ''}">${n}</button>`).join('')}</div>
      </div>
      <div class="card flat stack tight"><h2>Read questions out loud automatically?</h2>
        <p class="muted small-text">You can always tap a speaker button instead. You can change this later in Settings.</p>
        <div class="seg" id="w-read"><button data-v="1" class="${st.autoRead ? 'on' : ''}">Yes, read them out</button><button data-v="0" class="${!st.autoRead ? 'on' : ''}">No, I’ll tap the speaker</button></div>
      </div>
      <div class="row"><button class="btn primary big" id="w-go">Start my quest ${I.arrow}</button></div>
      <p class="muted small-text">For parents and carers: progress, reports and backups are in the Parent area at the bottom of the home screen.</p>
    </div>`;
    const reflow = () => { applySettings(); };
    $('#w-font').addEventListener('click', e => { const b = e.target.closest('[data-font]'); if (!b) return; st.font = b.dataset.font; $$('#w-font .choice').forEach(x => x.classList.toggle('on', x === b)); reflow(); });
    $('#w-tint').addEventListener('click', e => { const b = e.target.closest('[data-tint]'); if (!b) return; st.tint = b.dataset.tint; $$('#w-tint .swatch').forEach(x => x.classList.toggle('on', x === b)); reflow(); });
    $('#w-size').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (!b) return; st.scale = +b.dataset.v; $$('#w-size button').forEach(x => x.classList.toggle('on', x === b)); reflow(); });
    $('#w-read').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (!b) return; st.autoRead = b.dataset.v === '1'; $$('#w-read button').forEach(x => x.classList.toggle('on', x === b)); });
    $('#w-go').addEventListener('click', () => {
      S.name = ($('#w-name').value || '').trim().slice(0, 24) || 'Player';
      S.setup = true; logEvent('start', 'Started Catch-Up Quest'); save(); go('home');
    });
  };
  const TINTS = [['blue', '#E8EEF2'], ['cream', '#F4EEDA'], ['mint', '#E3F0E7'], ['peach', '#F6E7DC'], ['lilac', '#ECE8F4']];
  const tintSwatches = cur => TINTS.map(([k, c]) => `<button class="swatch ${cur === k ? 'on' : ''}" data-tint="${k}" style="background:${c}" aria-label="${k} background"></button>`).join('');

  SCREENS.home = main => {
    const qs = dailyQuests(); const allDone = qs.every(q => q.done);
    const hour = new Date().getHours(); const hi = hour < 12 ? 'Good morning' : hour < 17 ? 'Hi' : 'Good evening';
    main.innerHTML = `
      <div class="hello"><h1>${hi}, ${esc(S.name)}.</h1></div>
      <div class="card stack tight">
        <div class="row between"><h2>Today’s quests</h2><span class="chip lvl-chip">${allDone ? 'ALL DONE' : '+30 XP BONUS'}</span></div>
        ${sayBlock(`<p>${allDone ? 'You finished all 3 today. Anything else is extra XP.' : 'Three small quests. Do them in any order. Finish all 3 for a bonus.'}</p>`)}
        <div class="quests">${qs.map((q, i) => `<button class="quest ${q.done ? 'done' : ''}" data-act="quest" data-i="${i}"><span class="qdot">${q.done ? I.check : ''}</span><span class="qtext"><span>${esc(q.title)}</span><br><span class="qsub">${esc(q.sub2)}</span></span><span class="go">${q.done ? 'Again' : 'Go'}</span></button>`).join('')}</div>
      </div>
      <div class="section-title"><h2>Worlds</h2><span class="muted small-text">Tap a world to see its levels</span></div>
      <div class="grid-tiles">${SUBJECTS.map(s => {
        const ls = lessonsOf(s.id), d = ls.filter(l => S.done[l.id]).length;
        return `<button class="tile" style="--c:${s.color}" data-act="world" data-sub="${s.id}">
          <span class="tile-top"><span class="tile-ico">${I[s.icon]}</span><span><span class="world">${s.world}</span><h3>${s.name}</h3></span></span>
          <span class="muted small-text">${s.blurb}</span>
          <span class="row between"><span class="chip ${S.start[s.id] ? 'lvl-chip' : 'new'}">${S.start[s.id] ? 'START LVL ' + S.start[s.id] : 'Warm-up first'}</span><span class="small-text muted">${d}/${ls.length} done</span></span>
          <span class="meter"><i style="width:${ls.length ? d / ls.length * 100 : 0}%"></i></span></button>`;
      }).join('')}</div>
      <div class="section-title"><h2>More quests</h2></div>
      <div class="grid-tiles">
        <button class="tile" style="--c:var(--write)" data-act="go" data-to="writing"><span class="tile-top"><span class="tile-ico">${I.pen}</span><span><span class="world">Writing Lab</span><h3>Level up your writing</h3></span></span><span class="muted small-text">Sentences, paragraphs, then full pieces. Starters, word banks and read-back.</span></button>
        <button class="tile" style="--c:var(--proj)" data-act="go" data-to="projects"><span class="tile-top"><span class="tile-ico">${I.flag}</span><span><span class="world">Quest Projects</span><h3>Hands-on projects</h3></span></span><span class="muted small-text">Research, make and present. One step at a time.</span></button>
        <button class="tile" style="--c:var(--calm)" data-act="break"><span class="tile-top"><span class="tile-ico">${I.blob}</span><span><span class="world">Break Zone</span><h3>Brain break</h3></span></span><span class="muted small-text">Squish blob, pop-it, breathing and movement ideas.</span></button>
        <button class="tile" style="--c:var(--xp)" data-act="go" data-to="badges"><span class="tile-top"><span class="tile-ico">${I.trophy}</span><span><span class="world">Trophy Room</span><h3>${S.badges.length} of ${BADGES.length} badges</h3></span></span><span class="muted small-text">See what you’ve unlocked and what’s next.</span></button>
      </div>
      <div class="row" style="margin-top:28px"><button class="btn ghost" data-act="settings">${I.gear}<span>Settings</span></button><button class="btn ghost" data-act="go" data-to="parents">${I.shield}<span>Parent area</span></button></div>
      ${storageOk ? '' : `<p class="muted small-text" style="margin-top:12px">Progress can’t be saved in this browser window. Use the Parent area backup code to keep it.</p>`}`;
  };

  SCREENS.world = (main, p) => {
    const s = SUB[p.sub]; if (!s) return go('home');
    const ls = lessonsOf(s.id), start = S.start[s.id], rec = nextLesson(s.id);
    const openTier = rec ? rec.t : (start || 1);
    main.innerHTML = `
      <div class="page-head">${backBtn('home', 'Home')}</div>
      <div class="page-head"><span class="tile-ico" style="width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:${s.color};color:var(--surface)">${I[s.icon]}</span><div style="flex:1;min-width:0"><div class="eyebrow">${s.world}</div><h1>${s.name}</h1></div></div>
      ${!start ? `<div class="callout">${sayBlock(`<p><b>First, a quick warm-up.</b> About 2 minutes. It finds the best level for you to start on. It’s not a test, and wrong answers are totally fine.</p>`)}<div class="row"><button class="btn primary big" data-act="check" data-sub="${s.id}">Start warm-up ${I.arrow}</button><button class="btn ghost" data-act="skip-check" data-sub="${s.id}">Skip, start at Level 1</button></div></div>`
        : `<div class="row between"><span class="chip lvl-chip">YOUR START: LEVEL ${start} · ${YEAR[start].toUpperCase()} SKILLS</span><button class="btn ghost small" data-act="check" data-sub="${s.id}">${I.refresh}<span>Redo warm-up</span></button></div>`}
      ${rec && start ? `<div class="card stack tight" style="margin-top:16px"><div class="eyebrow">Next up</div><div class="row between"><div style="flex:1 1 220px;min-width:0"><h2>${esc(rec.n)}</h2><p class="muted small-text">Level ${rec.t} · ${YEAR[rec.t]} skills · about ${lessonMins(rec)} min</p></div><button class="btn primary big" data-act="intro" data-id="${rec.id}">Play ${I.arrow}</button></div></div>` : ''}
      <div class="section-title"><h2>All levels</h2><span class="muted small-text">You can play any level, any time.</span></div>
      ${[1, 2, 3, 4, 5].map(t => {
        const tl = ls.filter(l => l.t === t); const d = tl.filter(l => S.done[l.id]).length;
        return `<details class="tier" ${t === openTier ? 'open' : ''}><summary><span class="chip lvl-chip">LEVEL ${t}</span><span><b>${YEAR[t]} skills</b></span><span class="muted small-text">${d}/${tl.length} done</span><span class="arrow">${I.chevron.replace('<svg', '<svg width="20" height="20"')}</span></summary>
          <div class="tier-body">${tl.map(l => {
            const dn = S.done[l.id];
            return `<button class="lesson-row ${rec && rec.id === l.id ? 'rec' : ''}" data-act="intro" data-id="${l.id}"><span class="lr-main"><span class="lr-title">${esc(l.n)}</span><br><span class="lr-sub">about ${lessonMins(l)} min · ${plural(qCount(l), 'question')}${l.k ? ' · side quest' : ''}</span></span>${dn ? starsHtml(dn.stars) : rec && rec.id === l.id ? '<span class="chip new">Next up</span>' : '<span class="chip">New</span>'}</button>`;
          }).join('')}</div></details>`;
      }).join('')}`;
  };
  const starsHtml = (n, big) => `<span class="stars${big ? ' big' : ''}" aria-label="${n} of 3 stars">${[1, 2, 3].map(i => `<span class="${i <= n ? '' : 'off'}">${I.star}</span>`).join('')}</span>`;

  SCREENS.intro = (main, p) => {
    const f = findLesson(p.id); if (!f) return go('home');
    const { L, sub } = f; const s = SUB[sub];
    const nq = qCount(L), nl = (L.c || []).length;
    main.innerHTML = `<div class="page-head">${backBtn('world', s.name, `data-sub="${sub}"`)}</div>
      <div class="stack">
        <div><div class="eyebrow">${s.world} · Level ${L.t} · ${YEAR[L.t]} skills</div><h1>${esc(L.n)}</h1></div>
        <div class="card stack tight"><h2>What happens in this level</h2>
          ${sayBlock(md(`- **${plural(nl, 'learn card')}**: read or listen.\n- **${plural(nq, 'question')}**: you get a hint if you need one.${L.k ? '\n- **1 side quest**: something hands-on to do away from the screen. It’s optional.' : ''}\n- About **${lessonMins(L)} minutes**. Press Break any time.`))}
        </div>
        <div class="row"><button class="btn primary big" data-act="start-lesson" data-id="${L.id}">Start ${I.arrow}</button>${S.done[L.id] ? `<span class="muted small-text">Best so far: ${starsHtml(S.done[L.id].stars)}</span>` : ''}</div>
      </div>`;
    maybeAutoRead();
  };

  /* lesson player */
  let P = null;
  function startLesson(id) {
    const f = findLesson(id); if (!f) return;
    P = { L: f.L, sub: f.sub, steps: buildSteps(f.L), i: 0, results: [], xp: 0, summary: null };
    resetFocus(); go('lesson');
  }
  SCREENS.lesson = main => {
    if (!P) return go('home');
    if (P.i >= P.steps.length) return renderFinish(main);
    const st = P.steps[P.i], n = P.steps.length, s = SUB[P.sub];
    const qNums = P.steps.filter(x => x.k === 'q'); const qi = qNums.indexOf(st) + 1;
    main.innerHTML = `<div class="player-head"><button class="btn ghost small" data-act="leave-lesson">${I.back}<span>Leave</span></button>
        <div class="dots" aria-label="Step ${P.i + 1} of ${n}">${P.steps.map((_, i) => `<i class="${i < P.i ? 'done' : i === P.i ? 'now' : ''}"></i>`).join('')}</div>
        <span class="chip" style="color:${s.color}">${esc(P.L.n)}</span></div>
      <div class="step-card" id="step"></div>`;
    const card = $('#step');
    if (st.k === 'learn') {
      card.innerHTML = `<div class="step-kind">Learn</div><h2>${esc(st.title)}</h2>${sayBlock(md(st.body), 'learn-text')}${st.v && VIS[st.v] ? VIS[st.v]() : ''}<div class="row end"><button class="btn primary big" id="next">Got it ${I.arrow}</button></div>`;
      $('#next').addEventListener('click', nextStep);
      maybeAutoRead();
    } else if (st.k === 'q') {
      card.innerHTML = `<div class="step-kind">Question ${qi} of ${qNums.length}</div><div id="qhost" class="stack"></div>`;
      const host = $('#qhost');
      mountQ(st.q, host, 'lesson', res => onQDone(st.q, host, res, P.i === n - 1));
      maybeAutoRead();
    } else if (st.k === 'mission') {
      card.innerHTML = `<div class="mission"><div class="eyebrow">Side quest · away from the screen · optional</div>${sayBlock(`<p>${esc(st.text)}</p>`)}<p class="muted small-text">You can do it now, or later today.</p><div class="row"><button class="btn primary big" id="mdone">I did it! +15 XP</button><button class="btn ghost big" id="mskip">Skip for now</button></div></div>`;
      $('#mdone').addEventListener('click', () => { S.missions++; logEvent('mission', `Side quest: ${st.text.slice(0, 80)}`, { sub: P.sub }); P.xp += 15; addXP(15); nextStep(); });
      $('#mskip').addEventListener('click', nextStep);
      maybeAutoRead();
    }
  };
  function nextStep() { TTS.stop(); P.i++; render(); window.scrollTo(0, 0); }
  function onQDone(q, host, res, isLast) {
    P.results.push(res);
    const gain = res.revealed ? 3 : res.firstTry ? 10 : 6;
    P.xp += gain; addXP(gain); chime(!res.revealed);
    const fb = host.querySelector('#fb');
    fb.className = 'fb ' + (res.revealed ? 'neutral' : 'good');
    fb.innerHTML = `<div class="row between"><div class="fb-title">${esc(res.revealed ? pick(REVEAL) : pick(GOOD))}</div><span class="xp-pop">+${gain} XP</span></div>${(res.revealed || !res.firstTry) && q.hint ? sayBlock(`<p>${q.hint}</p>`) : ''}<div class="row end"><button class="btn primary big" id="next">${isLast ? 'Finish level' : 'Next'} ${I.arrow}</button></div>`;
    const nb = $('#next'); nb.addEventListener('click', nextStep);
    keyHandler = null;
    setTimeout(() => { nb.scrollIntoView({ block: 'nearest', behavior: S.settings.calm ? 'auto' : 'smooth' }); nb.focus({ preventScroll: true }); }, 50);
  }
  function renderFinish(main) {
    if (!P.summary) {
      const qs = P.results.length, first = P.results.filter(r => r.firstTry).length, pct = qs ? first / qs : 1;
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      const prev = S.done[P.L.id];
      S.done[P.L.id] = { best: Math.max(pct, prev ? prev.best : 0), stars: Math.max(stars, prev ? prev.stars : 0), times: (prev ? prev.times : 0) + 1, last: Date.now(), lastPct: pct, first, total: qs };
      logEvent('lesson', `${SUB[P.sub].name}: ${P.L.n} (${first}/${qs} first try)`, { sub: P.sub, id: P.L.id, pct });
      P.xp += 20; addXP(20);
      P.summary = { qs, first, pct, stars, newBadges: checkBadges() };
      checkDailyBonus();
      save();
    }
    const sm = P.summary, s = SUB[P.sub], nxt = nextAfter(P.sub, P.L.id);
    const msg = sm.pct >= 0.9 ? 'Boss level! You smashed it.' : sm.pct >= 0.6 ? 'Solid run. Your brain is getting stronger.' : 'You finished it, and that’s what counts. Playing it again will make it easier.';
    main.innerHTML = `<div class="step-card finish">
      <div class="eyebrow">Level complete</div>
      <h1>${esc(P.L.n)}</h1>
      <div class="row">${starsHtml(sm.stars, true)}<span class="big-xp">+${P.xp} XP</span></div>
      ${sayBlock(`<p><b>${msg}</b> You got ${sm.first} of ${sm.qs} on the first try.</p>`)}
      ${sm.newBadges.length ? `<div class="panel"><b>New badge${sm.newBadges.length > 1 ? 's' : ''}:</b> ${sm.newBadges.map(b => esc(b.name)).join(', ')}</div>` : ''}
      <div class="row">
        ${nxt && nxt.id !== P.L.id ? `<button class="btn primary big" data-act="intro" data-id="${nxt.id}">Next: ${esc(nxt.n)} ${I.arrow}</button>` : ''}
        <button class="btn calm big" data-act="break">Take a brain break</button>
        <button class="btn ghost big" data-act="start-lesson" data-id="${P.L.id}">Play again</button>
        <button class="btn ghost big" data-act="world" data-sub="${s.id}">Back to ${esc(s.name)}</button>
      </div></div>`;
    maybeAutoRead();
  }

  /* warm-up check */
  let W = null;
  function checkQuestion(sub, tier) {
    const ls = lessonsOf(sub).filter(l => l.t === tier);
    const withGen = ls.filter(l => l.g);
    if (withGen.length && (sub === 'maths' || Math.random() < 0.3)) { const l = pick(withGen); const q = GEN[pick(l.g)](); return q.type === 'mc' || q.type === 'num' ? q : checkQuestion(sub, tier); }
    const pool = ls.flatMap(l => (l.q || []).filter(a => a[0] === 'm'));
    return norm(pick(pool));
  }
  function startCheck(sub) { W = { sub, tier: 1, n: 0, right: 0, log: [], q: checkQuestion(sub, 1), answered: false }; resetFocus(); go('check'); }
  SCREENS.check = main => {
    if (!W) return go('home');
    const s = SUB[W.sub];
    if (W.result) {
      main.innerHTML = `<div class="step-card finish"><div class="eyebrow">Warm-up done · ${s.name}</div><h1>Start at Level ${W.result}</h1>
        ${sayBlock(`<p>Your best starting point in ${esc(s.name)} is <b>Level ${W.result}</b> (${YEAR[W.result]} skills). This isn’t a score. It just shows where to begin. You can still play any level.</p>`)}
        <div class="row"><span class="xp-pop">+15 XP for the warm-up</span></div>
        <div class="row"><button class="btn primary big" data-act="intro" data-id="${nextLesson(W.sub).id}">Start my first level ${I.arrow}</button><button class="btn ghost big" data-act="world" data-sub="${W.sub}">See all levels</button></div></div>`;
      maybeAutoRead();
      return;
    }
    main.innerHTML = `<div class="player-head"><button class="btn ghost small" data-act="world" data-sub="${W.sub}">${I.back}<span>Stop warm-up</span></button><span class="chip">Warm-up · ${esc(s.name)}</span><span class="chip">Question ${W.log.length + 1}</span></div>
      <div class="step-card"><div class="step-kind">Warm-up · no hints, no pressure</div><div id="qhost" class="stack"></div></div>`;
    const host = $('#qhost');
    mountQ(W.q, host, 'check', res => {
      W.log.push({ tier: W.tier, ok: res.firstTry }); if (res.firstTry) W.right++; W.n++;
      const fb = host.querySelector('#fb'); fb.className = 'fb neutral';
      fb.innerHTML = `<div class="fb-title">${res.firstTry ? 'Got it!' : 'No worries. That helps me find your level.'}</div><div class="row end"><button class="btn primary big" id="next">Next ${I.arrow}</button></div>`;
      const nb = $('#next');
      nb.addEventListener('click', () => {
        if (W.n >= 2) {
          const aced = W.right === 2;
          if (aced && W.tier < 5) { W.tier++; W.n = 0; W.right = 0; }
          else { W.result = aced ? 5 : W.tier; S.start[W.sub] = W.result; S.checks[W.sub] = { t: Date.now(), log: W.log, result: W.result }; logEvent('check', `${s.name} warm-up: start at Level ${W.result}`, { sub: W.sub }); addXP(15); checkBadges(); save(); render(); return; }
        }
        W.q = checkQuestion(W.sub, W.tier); render();
      });
      setTimeout(() => { nb.scrollIntoView({ block: 'nearest' }); nb.focus({ preventScroll: true }); }, 50);
    });
    maybeAutoRead();
  };

  /* writing lab */
  let WL = { type: 'persuasive', stage: 0 };
  const draftWords = d => words(draftText(d));
  function draftText(d) {
    const T = QC.writing.types.find(t => t.id === d.type);
    if (d.stage === 1) return d.parts.main || '';
    if (d.stage === 2) return ['top', 'f1', 'f2', 'f3', 'bottom'].map(k => (d.parts[k] || '').trim()).filter(Boolean).join(' ');
    return T.sections.map(sct => (d.parts[sct.k] || '').trim()).filter(Boolean).join('\n\n');
  }
  function suggestedStage() {
    const fin = S.drafts.filter(d => d.finished);
    if (fin.some(d => d.stage >= 2)) return 3;
    if (fin.some(d => d.stage === 1)) return 2;
    return 1;
  }
  SCREENS.writing = main => {
    if (!WL.stage) WL.stage = suggestedStage();
    const types = QC.writing.types, stages = QC.writing.stages;
    const drafts = S.drafts.slice().sort((a, b) => b.updated - a.updated);
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}</div>
      <div class="stack">
        <div><div class="eyebrow">Writing Lab</div><h1>Level up your writing</h1></div>
        ${sayBlock(md('Big writing is just small writing, stacked up. Start with one sentence, then a paragraph, then a full piece.\n\nYou can **talk instead of type**: on iPad, tap the microphone on the keyboard.'))}
        <div class="card stack tight"><h2>1. What kind of writing?</h2>
          <div class="type-grid" id="wl-type">${types.map(t => `<button class="choice ${WL.type === t.id ? 'on' : ''}" data-id="${t.id}"><span class="c-name">${esc(t.name)}</span><span class="c-sub">${esc(t.purpose)}</span></button>`).join('')}</div></div>
        <div class="card stack tight"><h2>2. Which stage?</h2>
          <div class="type-grid" id="wl-stage">${[1, 2, 3].map(n => `<button class="choice ${WL.stage === n ? 'on' : ''}" data-n="${n}"><span class="c-name">Stage ${n}: ${esc(stages[n].name)}</span><span class="c-sub">${esc(stages[n].blurb)} Goal: ${stages[n].goal}+ words.</span>${suggestedStage() === n ? '<span class="chip new" style="justify-self:start">Suggested</span>' : ''}</button>`).join('')}</div></div>
        <div class="row"><button class="btn primary big" data-act="new-draft">Start writing ${I.arrow}</button></div>
        ${drafts.length ? `<div class="section-title"><h2>Your writing</h2></div><div class="stack tight">${drafts.map(d => { const T = types.find(t => t.id === d.type); return `<div class="draft-row"><div class="d-main"><b>${esc(d.prompt || 'Untitled')}</b><br><span class="muted small-text">${esc(T ? T.name : '')} · ${esc(stages[d.stage].name)} · ${plural(draftWords(d), 'word')} · ${fmtDate(d.updated)}${d.finished ? ' · finished' : ''}</span></div><button class="btn small primary" data-act="open-draft" data-id="${d.id}">${d.finished ? 'Open' : 'Continue'}</button><button class="btn small ghost" data-act="del-draft" data-id="${d.id}">Delete</button></div>`; }).join('')}</div>` : ''}
      </div>`;
    $('#wl-type').addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (!b) return; WL.type = b.dataset.id; $$('#wl-type .choice').forEach(x => x.classList.toggle('on', x === b)); });
    $('#wl-stage').addEventListener('click', e => { const b = e.target.closest('[data-n]'); if (!b) return; WL.stage = +b.dataset.n; $$('#wl-stage .choice').forEach(x => x.classList.toggle('on', x === b)); });
  };

  let lastTA = null;
  SCREENS.write = (main, p) => {
    const d = S.drafts.find(x => x.id === p.id); if (!d) return go('writing');
    const T = QC.writing.types.find(t => t.id === d.type), stg = QC.writing.stages[d.stage];
    if (d.part == null) d.part = 0;
    if (d.startWords == null || d.startDay !== dayKey()) { d.startWords = draftWords(d); d.startDay = dayKey(); }
    const chipsFor = list => `<div class="chips">${list.map(s => `<button class="tag" data-insert="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
    const ta = (k, rows, ph) => `<textarea class="write" id="ta-${k}" data-k="${k}" rows="${rows}" placeholder="${esc(ph || '')}" spellcheck="true" autocapitalize="sentences">${esc(d.parts[k] || '')}</textarea>`;
    let body = '';
    if (d.stage === 1) {
      const b = d.builder || {};
      const fields = [['who', 'Who or what?', 'A tiny robot'], ['doing', 'What are they doing?', 'rolled across the lava bridge'], ['where', 'Where?', 'in the middle of the volcano level'], ['when', 'When?', 'just before midnight'], ['why', 'Why?', 'because it needed to find the lost key']];
      body = `<div class="card stack tight"><h2>Build it</h2>${sayBlock('<p>Fill in some boxes (you don’t need all 5). Then tap <b>Build my sentence</b>.</p>')}
        <div class="stack tight" id="builder">${fields.map(([k, l, ph]) => `<label class="stack tight" style="gap:4px"><span><b>${l}</b></span><input class="field" data-b="${k}" value="${esc(b[k] || '')}" placeholder="e.g. ${esc(ph)}" autocomplete="off"></label>`).join('')}</div>
        <div class="row"><button class="btn primary" id="build">Build my sentence</button></div></div>
        <div class="card stack tight"><h2>Your super sentence</h2><p class="muted small-text">Fix it up so it reads well. Start with a capital letter. End with a full stop.</p>${ta('main', 4, 'Your sentence will appear here, or type it yourself.')}</div>`;
    } else if (d.stage === 2) {
      const S0 = T.sections;
      const layers = [['top', 'bun', 'Top bun: topic sentence', 'Say what the paragraph is about.', S0[0].starters], ['f1', 'fill', 'Filling 1: a detail or reason', 'Explain or give an example.', S0[1].starters], ['f2', 'fill', 'Filling 2: another detail', 'Add more.', S0[2].starters], ['f3', 'fill', 'Filling 3: one more detail', 'Evidence or an example.', S0[3].starters], ['bottom', 'bun', 'Bottom bun: closing sentence', 'Sum it up or link back to the topic.', S0[4].starters]];
      body = `<div class="burger">${layers.map(([k, c, l, tip, st]) => `<div class="layer ${c}"><label for="ta-${k}">${l}</label><span class="muted small-text">${tip}</span>${ta(k, 2)}${chipsFor(st)}</div>`).join('')}</div>`;
    } else {
      const sct = T.sections[d.part];
      body = `<div class="part-steps" id="parts">${T.sections.map((x, i) => `<button class="${i === d.part ? 'on' : ''} ${(d.parts[x.k] || '').trim() ? 'has' : ''}" data-part="${i}">${i + 1}. ${esc(x.label)}</button>`).join('')}</div>
        <div class="card stack tight"><div class="eyebrow">Part ${d.part + 1} of ${T.sections.length}</div><h2>${esc(sct.label)}</h2>${sayBlock(`<p>${esc(sct.tip)}</p>`)}${ta(sct.k, 7, 'Write (or talk) here…')}<p class="muted small-text">Sentence starters: tap one to add it</p>${chipsFor(sct.starters)}
          <div class="row between"><button class="btn ghost" data-part-go="-1" ${d.part === 0 ? 'disabled' : ''}>${I.back}<span>Previous part</span></button><button class="btn primary" data-part-go="1" ${d.part === T.sections.length - 1 ? 'disabled' : ''}><span>Next part</span>${I.arrow}</button></div></div>`;
    }
    main.innerHTML = `<div class="page-head">${backBtn('go', 'Writing Lab', 'data-to="writing"')}<span class="muted small-text" id="saved"></span></div>
      <div class="stack">
        <div><div class="eyebrow">${esc(T.name)} · Stage ${d.stage}: ${esc(stg.name)}</div><h1>${esc(d.prompt || 'Choose a topic')}</h1></div>
        <div class="card stack tight"><h2>Topic</h2><input class="field" id="prompt" value="${esc(d.prompt || '')}" placeholder="Type a topic, or tap an idea below" autocomplete="off">${chipsFor(T.prompts).replace(/data-insert/g, 'data-prompt')}</div>
        ${body}
        <div class="card stack tight"><div class="row between"><h2>Tools</h2><span class="wc" id="wc"></span></div>
          <div class="goal-bar"><i id="goal" style="width:0"></i></div>
          <div class="row"><button class="btn" id="readback">${I.speaker}<span>Read my writing to me</span></button><button class="btn" id="mic">${I.mic}<span>Talk to type</span></button><button class="btn ghost" id="showall">See the whole piece</button></div>
          <p class="muted small-text">Word bank: tap a word to add it</p>${chipsFor(T.bank)}
        </div>
        <div class="card stack tight" id="finishbox"><h2>Finished? Check it</h2>
          <div class="checklist" id="checks">${['Every sentence starts with a capital letter', 'Every sentence ends with . ? or !', 'I stuck to the topic', 'I used at least one word from the word bank', 'I listened to it read aloud and fixed anything that sounded wrong'].map((c, i) => `<label class="check"><input type="checkbox" data-c="${i}" ${d.checks && d.checks[i] ? 'checked' : ''}><span>${c}</span></label>`).join('')}</div>
          <div class="row"><button class="btn primary big" id="finish">${d.finished ? 'Save changes' : 'Finish piece'} ${I.check}</button></div></div>
      </div>`;
    const save_ = () => { d.updated = Date.now(); saveSoon(); const sv_ = $('#saved'); if (sv_) sv_.textContent = 'Saved'; };
    const refreshCount = () => {
      const w = draftWords(d); $('#wc').textContent = `${w} / ${stg.goal} WORDS`; $('#goal').style.width = Math.min(100, w / stg.goal * 100) + '%';
      if (!doneToday('writing') && w - (d.startWords || 0) >= 20) { logEvent('writing', `Wrote 20+ words (${T.name})`); save(); checkDailyBonus(); toast('Daily quest done: writing!'); }
    };
    main.addEventListener('input', e => {
      const t = e.target;
      if (t.matches('textarea.write')) { d.parts[t.dataset.k] = t.value; save_(); refreshCount(); }
      else if (t.id === 'prompt') { d.prompt = t.value; save_(); }
      else if (t.dataset.b) { d.builder = d.builder || {}; d.builder[t.dataset.b] = t.value; save_(); }
    });
    main.addEventListener('focusin', e => { if (e.target.matches('textarea.write')) lastTA = e.target; });
    main.addEventListener('change', e => { if (e.target.matches('#checks input')) { d.checks = d.checks || {}; d.checks[e.target.dataset.c] = e.target.checked; save_(); } });
    main.addEventListener('click', e => {
      const ins = e.target.closest('[data-insert]');
      if (ins) { const tgt = lastTA && document.body.contains(lastTA) ? lastTA : $('textarea.write'); if (tgt) insertAtCursor(tgt, ins.dataset.insert); return; }
      const pr = e.target.closest('[data-prompt]');
      if (pr) { d.prompt = pr.dataset.prompt; $('#prompt').value = d.prompt; main.querySelector('h1').textContent = d.prompt; save_(); return; }
      const pt = e.target.closest('[data-part]');
      if (pt) { d.part = +pt.dataset.part; save(); render(); return; }
      const pg = e.target.closest('[data-part-go]');
      if (pg && !pg.disabled) { d.part = Math.max(0, Math.min(T.sections.length - 1, d.part + +pg.dataset.partGo)); save(); render(); window.scrollTo(0, 0); }
    });
    const bb = $('#build');
    if (bb) bb.addEventListener('click', () => {
      const b = d.builder || {}; let s = ['who', 'doing', 'where', 'when', 'why'].map(k => (b[k] || '').trim()).filter(Boolean).join(' ');
      if (!s) { toast('Fill in at least one box first.'); return; }
      s = s.charAt(0).toUpperCase() + s.slice(1); if (!/[.!?]$/.test(s)) s += '.';
      d.parts.main = s; $('#ta-main').value = s; save_(); refreshCount();
    });
    $('#readback').addEventListener('click', e => {
      const text = d.stage === 3 ? (d.parts[T.sections[d.part].k] || '') : draftText(d);
      if (!text.trim()) { toast('Write something first, then I’ll read it back.'); return; }
      const box = d.stage === 3 ? $(`#ta-${T.sections[d.part].k}`) : null;
      TTS.speak(text, null, e.currentTarget); if (box) box.focus({ preventScroll: true });
    });
    $('#mic').addEventListener('click', e => dictate(lastTA && document.body.contains(lastTA) ? lastTA : $('textarea.write'), e.currentTarget));
    $('#showall').addEventListener('click', () => {
      const text = draftText(d);
      modal(`<h2>${esc(d.prompt || 'My writing')}</h2><div class="say"><div class="say-text" style="max-height:55vh;overflow:auto">${text.trim() ? text.split(/\n\n+/).map(pp => `<p>${esc(pp)}</p>`).join('') : '<p class="muted">Nothing written yet.</p>'}</div>${spk()}</div><p class="wc">${draftWords(d)} WORDS</p><div class="row end"><button class="btn primary" data-act="close-modal">Close</button></div>`);
    });
    $('#finish').addEventListener('click', () => {
      const w = draftWords(d);
      if (w < 5) { toast('Write a little more first.'); return; }
      if (!d.finished) {
        d.finished = true; d.finishedAt = Date.now();
        const xp = { 1: 20, 2: 40, 3: 80 }[d.stage] + (w >= stg.goal ? 20 : 0);
        logEvent('writing-done', `Finished ${T.name} (${stg.name}): ${w} words`); addXP(xp); checkBadges();
        modal(`<h2>Piece finished!</h2>${sayBlock(`<p>You wrote <b>${w} words</b>. ${w >= stg.goal ? 'You reached the goal!' : 'Next time, try to reach ' + stg.goal + ' words.'}</p>`)}<p class="xp-pop">+${xp} XP</p><div class="row end"><button class="btn ghost" data-act="close-modal">Keep editing</button><button class="btn primary" data-act="go" data-to="writing">Back to Writing Lab</button></div>`);
      } else { toast('Saved.'); }
      save();
    });
    refreshCount();
  };

  /* projects */
  SCREENS.projects = main => {
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}</div>
      <div class="stack"><div><div class="eyebrow">Quest Projects</div><h1>Hands-on projects</h1></div>
      ${sayBlock(md('A project is a big quest split into **7 small steps**. Do one step per session. You choose how to show what you learned: a poster, a video, a model, a Minecraft build, or just talking about it.'))}
      <div class="grid-tiles">${QC.projects.map(pr => {
        const st = (S.projects[pr.id] || {}).steps || {}; const d = QC.stepTemplate.filter(x => st[x.k] && st[x.k].done).length;
        return `<button class="tile" style="--c:var(--proj)" data-act="project" data-id="${pr.id}"><span class="world">${esc(pr.tag)}</span><h3>${esc(pr.name)}</h3><span class="muted small-text">${esc(pr.blurb)}</span><span class="row between"><span class="chip ${d ? 'good' : ''}">${d}/7 steps</span></span><span class="meter"><i style="width:${d / 7 * 100}%"></i></span></button>`;
      }).join('')}</div></div>`;
  };
  SCREENS.project = (main, p) => {
    const pr = QC.projects.find(x => x.id === p.id); if (!pr) return go('projects');
    const data = S.projects[pr.id] = S.projects[pr.id] || { steps: {}, how: '' };
    const firstOpen = QC.stepTemplate.findIndex(x => !(data.steps[x.k] && data.steps[x.k].done));
    main.innerHTML = `<div class="page-head">${backBtn('go', 'Projects', 'data-to="projects"')}<span class="muted small-text" id="saved"></span></div>
      <div class="stack"><div><div class="eyebrow">${esc(pr.tag)}</div><h1>${esc(pr.name)}</h1></div>
      ${sayBlock(`<p>${esc(pr.blurb)}</p>`)}
      <div class="card stack tight"><h2>Ideas to pick from</h2><div class="chips">${pr.ideas.map(i => `<button class="tag" data-idea="${esc(i)}">${esc(i)}</button>`).join('')}</div></div>
      <div class="step-list">${QC.stepTemplate.map((st, i) => {
        const sd = data.steps[st.k] || {}; const extra = pr.extra[st.k];
        return `<details class="pstep ${sd.done ? 'done' : ''}" ${i === firstOpen ? 'open' : ''}><summary><span class="pnum">${sd.done ? I.check.replace('<svg', '<svg width="18" height="18"') : i + 1}</span><b style="flex:1">${esc(st.title)}</b>${sd.done ? '<span class="chip good">Done</span>' : ''}</summary>
          <div class="pbody">${sayBlock(`<p>${esc(st.text)}</p>${extra ? `<p><b>For this project:</b> ${esc(extra)}</p>` : ''}`)}
          ${st.k === 'plan' ? `<p class="muted small-text">How will you show it?</p><div class="chips" id="how">${QC.presentWays.map(w => `<button class="tag ${data.how === w ? 'sel' : ''}" data-how="${esc(w)}">${esc(w)}</button>`).join('')}</div>` : ''}
          <textarea class="write" data-step="${st.k}" rows="4" placeholder="${esc(st.notes)}">${esc(sd.notes || '')}</textarea>
          <div class="row"><button class="btn ${sd.done ? 'ghost' : 'primary'}" data-stepdone="${st.k}">${sd.done ? 'Mark as not done' : 'Step done! +15 XP'}</button><button class="btn ghost" data-mic="${st.k}">${I.mic}<span>Talk to type</span></button></div></div></details>`;
      }).join('')}</div></div>`;
    const save_ = () => { saveSoon(); const s_ = $('#saved'); if (s_) s_.textContent = 'Saved'; };
    main.addEventListener('input', e => { const t = e.target; if (t.dataset.step) { (data.steps[t.dataset.step] = data.steps[t.dataset.step] || {}).notes = t.value; save_(); } });
    main.addEventListener('click', e => {
      const idea = e.target.closest('[data-idea]');
      if (idea) { const ta_ = main.querySelector('textarea[data-step="choose"]'); ta_.value = idea.dataset.idea; (data.steps.choose = data.steps.choose || {}).notes = ta_.value; ta_.closest('details').open = true; save_(); ta_.focus(); return; }
      const how = e.target.closest('[data-how]');
      if (how) { data.how = how.dataset.how; $$('#how .tag').forEach(x => x.classList.toggle('sel', x === how)); save_(); return; }
      const mic = e.target.closest('[data-mic]');
      if (mic) { dictate(main.querySelector(`textarea[data-step="${mic.dataset.mic}"]`), mic); return; }
      const sd = e.target.closest('[data-stepdone]');
      if (sd) {
        const k = sd.dataset.stepdone; const s0 = data.steps[k] = data.steps[k] || {};
        s0.done = !s0.done;
        if (s0.done) {
          s0.at = Date.now(); logEvent('project', `${pr.name}: ${QC.stepTemplate.find(x => x.k === k).title}`); addXP(15);
          if (QC.stepTemplate.every(x => data.steps[x.k] && data.steps[x.k].done) && !data.complete) { data.complete = Date.now(); logEvent('project-done', `Finished project: ${pr.name}`); addXP(50); toast('Project complete! +50 XP'); }
          checkBadges(); checkDailyBonus();
        }
        save(); render();
      }
    });
  };

  /* break zone */
  let blobStop = null;
  const MOVES = ['Do 10 wall push-ups.', 'Shake out your hands and arms for 10 seconds.', 'Get a glass of water and drink it.', 'Stretch up tall, then try to touch your toes.', 'Walk to the furthest room in the house and back.', 'Squish your Blu Tack into a ball, then a snake, then a flat pancake.', 'Look out a window. Find 3 things that are moving.', 'Do 15 star jumps (or 15 slow squats).', 'Push your palms together hard for 10 seconds, then let go.', 'Roll your shoulders backwards 10 times.', 'Stand on one leg and count to 20. Swap legs.', 'Lie on the floor and breathe slowly for one minute.'];
  SCREENS.break = main => {
    if (!SCREENS.break.counted) { SCREENS.break.counted = true; S.breaks++; logEvent('break', 'Took a brain break'); checkBadges(); save(); }
    const back = returnTo && returnTo.name !== 'break' ? returnTo : { name: 'home', p: {} };
    const backLabel = back.name === 'lesson' ? 'Back to my lesson' : back.name === 'check' ? 'Back to the warm-up' : back.name === 'write' ? 'Back to my writing' : back.name === 'project' ? 'Back to my project' : 'I’m ready to go back';
    const moves = shuffle(MOVES).slice(0, 3);
    main.innerHTML = `<div class="stack"><div class="row between"><div><div class="eyebrow">Break Zone</div><h1>Brain break</h1></div><button class="btn primary big" data-act="end-break">${esc(backLabel)} ${I.arrow}</button></div>
      ${sayBlock('<p>Take as long as you need. Nothing here is timed, and nothing here is scored.</p>')}
      <div class="break-grid">
        <div class="card stack tight"><h2>Squish blob</h2><p class="muted small-text">Poke it, press it, pull it.</p><div class="blob-box"><canvas id="blob" aria-label="A squishy blob you can poke and stretch"></canvas></div><div class="swatches" id="blobc">${['var(--accent)', 'var(--math)', 'var(--write)', 'var(--xp)', 'var(--sci)'].map((c, i) => `<button class="swatch ${i === 0 ? 'on' : ''}" style="background:${c}" data-c="${c}" aria-label="Blob colour ${i + 1}"></button>`).join('')}</div></div>
        <div class="card stack tight"><h2>Pop-it</h2><p class="muted small-text">Pop them all, then flip it over.</p><div class="popit" id="popit"></div><div class="row"><button class="btn ghost" id="flip">${I.refresh}<span>Flip it</span></button></div></div>
        <div class="card stack tight"><h2>Box breathing</h2><div class="breathe"><div class="breathe-box" aria-hidden="true"><div class="breathe-dot"></div></div><div class="breathe-word" id="bword" aria-live="polite">Breathe in</div><p class="muted small-text">Follow the dot around the box. 4 seconds each side.</p></div></div>
        <div class="card stack tight"><h2>Move your body</h2>${moves.map(m => `<div class="move-card">${sayBlock(`<p>${esc(m)}</p>`)}</div>`).join('')}<div class="row"><button class="btn ghost" id="moremoves">${I.refresh}<span>Different ideas</span></button></div></div>
      </div></div>`;
    // pop-it
    const cols = ['var(--accent)', 'var(--math)', 'var(--write)', 'var(--xp)', 'var(--sci)'];
    const drawPop = () => { $('#popit').innerHTML = Array.from({ length: 20 }, (_, i) => `<button style="--c:${cols[Math.floor(i / 4) % 5]}" aria-label="Bubble ${i + 1}"></button>`).join(''); };
    drawPop();
    $('#popit').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; b.classList.toggle('popped'); if (S.settings.sound) chime(true); });
    $('#flip').addEventListener('click', drawPop);
    $('#moremoves').addEventListener('click', () => render());
    // breathing words
    const bw = ['Breathe in', 'Hold', 'Breathe out', 'Hold']; let bi = 0;
    const bt = setInterval(() => { const el = $('#bword'); if (!el) { clearInterval(bt); return; } bi = (bi + 1) % 4; el.textContent = bw[bi]; }, 4000);
    // blob
    if (blobStop) blobStop();
    blobStop = startBlob($('#blob'), () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
    $('#blobc').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; $$('#blobc .swatch').forEach(x => x.classList.toggle('on', x === b)); const v = b.dataset.c.match(/--[\w-]+/)[0]; blobStop.setColor(() => getComputedStyle(document.documentElement).getPropertyValue(v).trim()); });
  };
  function startBlob(canvas, colorFn) {
    const ctx = canvas.getContext('2d'); const N = 28;
    const pts = Array.from({ length: N }, (_, i) => ({ a: i / N * Math.PI * 2, off: 0, v: 0 }));
    let W = 0, H = 0, cx = 0, cy = 0, R = 0, ptr = null, alive = true, t = 0, getColor = colorFn;
    const calm = () => S.settings.calm || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    const resize = () => { const r = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.3; };
    resize();
    const pos = e => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    canvas.addEventListener('pointerdown', e => { ptr = pos(e); try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } });
    canvas.addEventListener('pointermove', e => { if (ptr) ptr = pos(e); });
    const up = () => { ptr = null; };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up); canvas.addEventListener('pointerleave', up);
    window.addEventListener('resize', resize);
    const frame = () => {
      if (!alive || !document.body.contains(canvas)) { alive = false; window.removeEventListener('resize', resize); return; }
      t += 0.02;
      const pa = ptr ? Math.atan2(ptr.y - cy, ptr.x - cx) : 0, pd = ptr ? Math.hypot(ptr.x - cx, ptr.y - cy) : 0;
      for (const p of pts) {
        let target = calm() ? 0 : Math.sin(t * 2 + p.a * 3) * 2;
        if (ptr) { let da = Math.abs(p.a - ((pa + Math.PI * 2) % (Math.PI * 2))); da = Math.min(da, Math.PI * 2 - da); const f = Math.pow(Math.max(0, Math.cos(da)), 6); target += f * Math.max(-R * 0.7, Math.min(R * 0.9, pd - R)); }
        p.v += (target - p.off) * (ptr ? 0.25 : 0.09); p.v *= 0.8; p.off += p.v;
      }
      ctx.clearRect(0, 0, W, H);
      const xy = pts.map(p => [cx + Math.cos(p.a) * (R + p.off), cy + Math.sin(p.a) * (R + p.off)]);
      ctx.beginPath();
      for (let i = 0; i < N; i++) { const a = xy[i], b = xy[(i + 1) % N]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; if (i === 0) { const z = xy[N - 1]; ctx.moveTo((z[0] + a[0]) / 2, (z[1] + a[1]) / 2); } ctx.quadraticCurveTo(a[0], a[1], mx, my); }
      ctx.closePath(); ctx.fillStyle = getColor() || '#1B6B7A'; ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx - R * 0.35, cy - R * 0.4, R * 0.22, R * 0.12, -0.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    const stop = () => { alive = false; };
    stop.setColor = fn => { getColor = fn; };
    return stop;
  }

  SCREENS.badges = main => {
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}</div><div class="stack"><div><div class="eyebrow">Trophy Room</div><h1>${S.badges.length} of ${BADGES.length} badges</h1></div>
      <div class="badge-grid">${BADGES.map(b => { const on = S.badges.includes(b.id); return `<div class="badge ${on ? '' : 'locked'}"><span class="b-ico">${on ? I[b.icon] : I.lock}</span><span class="b-name">${esc(b.name)}</span><span class="b-desc">${esc(b.desc)}</span></div>`; }).join('')}</div></div>`;
  };

  /* settings */
  SCREENS.settings = main => {
    const st = S.settings;
    const seg = (id, opts, cur) => `<div class="seg" id="${id}">${opts.map(([v, n]) => `<button data-v="${v}" class="${String(cur) === String(v) ? 'on' : ''}">${n}</button>`).join('')}</div>`;
    const tog = (id, on) => `<button class="toggle ${on ? 'on' : ''}" id="${id}" role="switch" aria-checked="${on}" aria-label="toggle"></button>`;
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}</div><div class="stack"><div><div class="eyebrow">Settings</div><h1>Make it work for you</h1></div>
      <div class="card"><h2>Reading</h2>
        <div class="set-row"><div class="s-label"><label for="s-name"><b>Your name</b></label></div><input class="field" id="s-name" style="max-width:260px" value="${esc(S.name)}" maxlength="24"></div>
        <div class="set-row"><div class="s-label"><b>Font</b><small>Lexend and Atkinson are designed to be easier to read.</small></div>${seg('s-font', [['lexend', 'Lexend'], ['atkinson', 'Atkinson'], ['system', 'Plain']], st.font)}</div>
        <div class="set-row"><div class="s-label"><b>Text size</b></div>${seg('s-scale', [[0.9, 'S'], [1, 'M'], [1.12, 'L'], [1.25, 'XL']], st.scale)}</div>
        <div class="set-row"><div class="s-label"><b>Letter and line spacing</b><small>Wide spacing can make words easier to track.</small></div>${seg('s-spacing', [['normal', 'Normal'], ['wide', 'Wide']], st.spacing)}</div>
        <div class="set-row"><div class="s-label"><b>Background colour</b><small>A tinted background can reduce glare.</small></div><div class="swatches" id="s-tint">${tintSwatches(st.tint)}</div></div>
        <div class="set-row"><div class="s-label"><b>Light or dark</b></div>${seg('s-mode', [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']], st.mode)}</div>
      </div>
      <div class="card"><h2>Read aloud</h2>
        <div class="set-row"><div class="s-label"><b>Read questions automatically</b><small>Otherwise, tap any speaker button.</small></div>${tog('s-auto', st.autoRead)}</div>
        <div class="set-row"><div class="s-label"><b>Reading speed</b></div>${seg('s-rate', [[0.75, 'Slow'], [0.9, 'Normal'], [1.05, 'Fast']], st.rate)}</div>
        <div class="set-row"><div class="s-label"><label for="s-voice"><b>Voice</b></label><small>${TTS.ok ? 'Australian voices are picked first if your device has one.' : 'Read-aloud isn’t available in this browser.'}</small></div><div class="row"><select class="field" id="s-voice" style="max-width:260px"><option value="">Automatic</option>${TTS.voices.map(v => `<option value="${esc(v.name)}" ${st.voice === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select><button class="btn" id="s-test">${I.speaker}<span>Test</span></button></div></div>
      </div>
      <div class="card"><h2>Focus and calm</h2>
        <div class="set-row"><div class="s-label"><b>Brain break reminder</b><small>A gentle reminder to take a break after this many minutes.</small></div>${seg('s-timer', [[0, 'Off'], [5, '5 min'], [10, '10 min'], [15, '15 min'], [20, '20 min']], st.timer)}</div>
        <div class="set-row"><div class="s-label"><b>Sound effects</b><small>Soft chimes for right answers. Off by default.</small></div>${tog('s-sound', st.sound)}</div>
        <div class="set-row"><div class="s-label"><b>Calm mode</b><small>Turns off all movement and animation.</small></div>${tog('s-calm', st.calm)}</div>
      </div></div>`;
    const bindSeg = (id, key, num) => $('#' + id).addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (!b) return; st[key] = num ? +b.dataset.v : b.dataset.v; $$('#' + id + ' button').forEach(x => x.classList.toggle('on', x === b)); applySettings(); save(); if (key === 'timer') resetFocus(); });
    bindSeg('s-font', 'font'); bindSeg('s-scale', 'scale', true); bindSeg('s-spacing', 'spacing'); bindSeg('s-mode', 'mode'); bindSeg('s-rate', 'rate', true); bindSeg('s-timer', 'timer', true);
    const bindTog = (id, key) => $('#' + id).addEventListener('click', e => { st[key] = !st[key]; e.currentTarget.classList.toggle('on', st[key]); e.currentTarget.setAttribute('aria-checked', st[key]); applySettings(); save(); });
    bindTog('s-auto', 'autoRead'); bindTog('s-sound', 'sound'); bindTog('s-calm', 'calm');
    $('#s-tint').addEventListener('click', e => { const b = e.target.closest('[data-tint]'); if (!b) return; st.tint = b.dataset.tint; $$('#s-tint .swatch').forEach(x => x.classList.toggle('on', x === b)); applySettings(); save(); });
    $('#s-name').addEventListener('input', e => { S.name = e.target.value.slice(0, 24); saveSoon(); renderTop(); });
    $('#s-voice').addEventListener('change', e => { st.voice = e.target.value; save(); });
    $('#s-test').addEventListener('click', e => TTS.speak(`Hi ${S.name || 'there'}. This is how I will read your questions.`, null, e.currentTarget));
  };

  /* parents */
  let parentOpen = false;
  SCREENS.parents = main => {
    if (!parentOpen) return pinGate(main);
    const days = Object.keys(S.days).length;
    const last14 = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (13 - i)); return { k: dayKey(d), d }; });
    const week = last14.slice(7).reduce((a, x) => a + (S.time[x.k] || 0), 0);
    const maxMin = Math.max(10, ...last14.map(x => S.time[x.k] || 0));
    const ld = Object.keys(S.done).length;
    const rows = SUBJECTS.map(s => {
      const ls = lessonsOf(s.id); const dn = ls.filter(l => S.done[l.id]);
      const avg = dn.length ? Math.round(dn.reduce((a, l) => a + (S.done[l.id].lastPct || 0), 0) / dn.length * 100) : null;
      return `<tr><td><b>${s.name}</b></td><td>${S.start[s.id] ? `Level ${S.start[s.id]} (${YEAR[S.start[s.id]]})` : '<span class="muted">Not done yet</span>'}</td><td>${[1, 2, 3, 4, 5].map(t => { const tl = ls.filter(l => l.t === t); return `L${t}: ${tl.filter(l => S.done[l.id]).length}/${tl.length}`; }).join('<br>')}</td><td>${avg == null ? '–' : avg + '%'}</td></tr>`;
    }).join('');
    const tough = allLessons().filter(x => S.done[x.L.id] && S.done[x.L.id].best < 0.6);
    const strong = allLessons().filter(x => S.done[x.L.id] && S.done[x.L.id].stars === 3);
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}<button class="btn ghost small" data-act="lock-parents">${I.lock}<span>Lock</span></button></div>
      <div class="stack"><div><div class="eyebrow">Parent area</div><h1>${esc(S.name)}’s progress</h1></div>
      <div class="stat-row"><div class="stat"><div class="s-num">${days}</div><div class="s-lab">days played</div></div><div class="stat"><div class="s-num">${Math.round(week)}</div><div class="s-lab">minutes learning, last 7 days</div></div><div class="stat"><div class="s-num">${ld}</div><div class="s-lab">lessons finished</div></div><div class="stat"><div class="s-num">${levelInfo(S.xp).lvl}</div><div class="s-lab">player level (${S.xp} XP)</div></div></div>
      <div class="card stack tight"><h2>Minutes of active learning per day</h2><p class="muted small-text">Counts time on lessons, warm-ups, writing and projects. Idle time isn’t counted.</p>
        <div class="bars">${last14.map(x => { const v = S.time[x.k] || 0; return `<div class="bar" title="${fmtDate(x.d)}: ${v} min"><span>${v || ''}</span><i style="height:${v / maxMin * 100}%"></i></div>`; }).join('')}</div>
        <div class="bar-labels">${last14.map(x => `<span>${x.d.toLocaleDateString('en-AU', { weekday: 'narrow' })}</span>`).join('')}</div></div>
      <div class="card stack tight"><h2>Subjects</h2><div class="table-wrap"><table class="prog-table"><thead><tr><th>Subject</th><th>Warm-up start level</th><th>Lessons done by level</th><th>Avg first-try</th></tr></thead><tbody>${rows}</tbody></table></div>
        <p class="muted small-text">Level 1 = Year 5 skills, up to Level 5 = Year 9 skills (Victorian Curriculum). “First-try” means correct without a hint.</p></div>
      <div class="card stack tight"><h2>Needs more practice</h2>${tough.length ? `<ul class="list-plain">${tough.map(x => `<li>${SUB[x.sub].name}: ${esc(x.L.n)} (Level ${x.L.t}, best ${Math.round(S.done[x.L.id].best * 100)}%)</li>`).join('')}</ul>` : '<p class="muted">Nothing flagged yet.</p>'}
        <h2 style="margin-top:10px">Going well</h2>${strong.length ? `<ul class="list-plain">${strong.slice(0, 12).map(x => `<li>${SUB[x.sub].name}: ${esc(x.L.n)}</li>`).join('')}</ul>` : '<p class="muted">Three-star lessons will show here.</p>'}</div>
      <div class="card stack tight"><h2>Writing</h2>${S.drafts.length ? S.drafts.map(d => { const T_ = QC.writing.types.find(t => t.id === d.type); return `<div class="draft-row"><div class="d-main"><b>${esc(d.prompt || 'Untitled')}</b><br><span class="muted small-text">${esc(T_ ? T_.name : '')} · ${esc(QC.writing.stages[d.stage].name)} · ${plural(draftWords(d), 'word')}${d.finished ? ' · finished' : ' · in progress'} · ${fmtDate(d.updated)}</span></div><button class="btn small" data-act="read-draft" data-id="${d.id}">Read</button></div>`; }).join('') : '<p class="muted">No writing yet.</p>'}</div>
      <div class="card stack tight"><h2>Projects</h2>${QC.projects.map(pr => { const st = (S.projects[pr.id] || {}).steps || {}; const n = QC.stepTemplate.filter(x => st[x.k] && st[x.k].done).length; return n ? `<p>${esc(pr.name)}: ${n}/7 steps${(S.projects[pr.id] || {}).how ? ' · presenting as: ' + esc(S.projects[pr.id].how) : ''}</p>` : ''; }).join('') || '<p class="muted">No project steps done yet.</p>'}</div>
      <div class="card stack tight"><h2>Recent activity</h2>${S.events.length ? `<div class="table-wrap"><table class="prog-table"><tbody>${S.events.slice(0, 20).map(e => `<tr><td style="white-space:nowrap">${fmtDate(e.t)} ${fmtTime(e.t)}</td><td>${esc(e.text)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Nothing yet.</p>'}</div>
      <div class="card stack tight"><h2>Progress report</h2>${sayBlock('<p>A plain-text summary you can copy into an email, or give to a school, tutor or support worker.</p>')}<div class="row"><button class="btn primary" id="mkreport">Make report</button></div><textarea class="code" id="report" hidden readonly></textarea><div class="row" id="reportrow" hidden><button class="btn" id="copyreport">${I.copy}<span>Copy report</span></button></div></div>
      <div class="card stack tight"><h2>Move progress between iPad and laptop</h2>${sayBlock(md('Progress is saved on each device separately. To move it:\n- On the device with the progress, tap **Copy progress code**.\n- Send it to yourself (for example, by email or notes).\n- On the other device, open the Parent area, paste it below and tap **Load**.\n\nKeep a copy somewhere safe as a backup, too.'))}
        <div class="row"><button class="btn primary" id="copycode">${I.copy}<span>Copy progress code</span></button></div><textarea class="code" id="code" hidden readonly></textarea>
        <label for="loadcode" class="muted small-text">Paste a progress code here:</label><textarea class="code" id="loadcode" placeholder="Paste code here"></textarea><div class="row"><button class="btn" id="loadbtn">Load progress</button></div></div>
      <details class="tier"><summary><b>Curriculum map</b><span class="muted small-text">Every lesson, by level</span><span class="arrow">${I.chevron.replace('<svg', '<svg width="20" height="20"')}</span></summary><div class="tier-body">${SUBJECTS.map(s => `<h3>${s.name}</h3><div class="table-wrap"><table class="prog-table"><tbody>${lessonsOf(s.id).map(l => `<tr><td>Level ${l.t} · ${YEAR[l.t]}</td><td>${esc(l.n)}</td><td>${S.done[l.id] ? 'Done · ' + Math.round(S.done[l.id].best * 100) + '%' : '<span class="muted">Not yet</span>'}</td></tr>`).join('')}</tbody></table></div>`).join('')}</div></details>
      <div class="card stack tight"><h2>Parent settings</h2><div class="row"><button class="btn ghost" id="chpin">Change PIN</button><button class="btn ghost" id="reset">Reset all progress</button></div></div>
      </div>`;
    $('#mkreport').addEventListener('click', () => { const r = $('#report'); r.value = buildReport(); r.hidden = false; $('#reportrow').hidden = false; r.style.minHeight = '320px'; });
    $('#copyreport').addEventListener('click', () => copyText($('#report')));
    $('#copycode').addEventListener('click', () => { const c = $('#code'); c.value = exportCode(); c.hidden = false; copyText(c); });
    $('#loadbtn').addEventListener('click', () => {
      const code = $('#loadcode').value.trim(); if (!code) { toast('Paste a code first.'); return; }
      let data; try { data = JSON.parse(decodeURIComponent(escape(atob(code)))); } catch (e) { toast('That code doesn’t look right. Copy it again and paste the whole thing.'); return; }
      if (!data || typeof data !== 'object' || !('xp' in data)) { toast('That code doesn’t look right.'); return; }
      confirmBox('Load this progress?', `This replaces the progress on this device with ${data.name || 'the saved player'}’s progress (${data.xp} XP). The current progress here will be overwritten.`, 'Load it', () => { S = hydrate(data); save(); applySettings(); toast('Progress loaded.'); render(); });
    });
    $('#chpin').addEventListener('click', () => { S.pin = ''; save(); parentOpen = false; render(); });
    $('#reset').addEventListener('click', () => {
      modal(`<h2>Reset all progress?</h2><p>This deletes all XP, lessons, writing and projects on this device. It can’t be undone. Copy a progress code first if you might want it back.</p><label for="rs" class="muted small-text">Type RESET to confirm</label><input class="field" id="rs" autocomplete="off"><div class="row end"><button class="btn ghost" data-act="close-modal">Cancel</button><button class="btn primary" id="rsgo">Reset</button></div>`,
        box => box.querySelector('#rsgo').addEventListener('click', () => { if (box.querySelector('#rs').value.trim().toUpperCase() !== 'RESET') { toast('Type RESET to confirm.'); return; } const keep = S.settings; S = fresh(); S.settings = keep; save(); parentOpen = false; closeModal(); go('welcome'); }));
    });
  };
  function copyText(ta) {
    const fallback = () => { ta.hidden = false; ta.focus(); ta.select(); toast('Selected. Use your device’s Copy to copy it.'); };
    try { navigator.clipboard.writeText(ta.value).then(() => toast('Copied.'), fallback); } catch (e) { fallback(); }
  }
  const exportCode = () => btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  function buildReport() {
    const L7 = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - i); return S.time[dayKey(d)] || 0; }).reduce((a, b) => a + b, 0);
    const lines = [`Catch-Up Quest progress report: ${S.name}`, `Date: ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}`, '',
      `Days of learning: ${Object.keys(S.days).length}`, `Active learning time in the last 7 days: ${Math.round(L7)} minutes`, `Lessons completed: ${Object.keys(S.done).length}`, `Side quests (hands-on tasks) completed: ${S.missions}`, '',
      'Level scale: Level 1 = Year 5 skills, Level 2 = Year 6, Level 3 = Year 7, Level 4 = Year 8, Level 5 = Year 9 (based on the Victorian Curriculum).', ''];
    for (const s of SUBJECTS) {
      const ls = lessonsOf(s.id), dn = ls.filter(l => S.done[l.id]);
      lines.push(`${s.name.toUpperCase()}`);
      lines.push(`  Starting level from warm-up: ${S.start[s.id] ? `Level ${S.start[s.id]} (${YEAR[S.start[s.id]]})` : 'not done yet'}`);
      lines.push(`  Lessons completed: ${dn.length} of ${ls.length}`);
      dn.forEach(l => lines.push(`   - Level ${l.t}: ${l.n} (best ${Math.round(S.done[l.id].best * 100)}% first try)`));
      lines.push('');
    }
    const fin = S.drafts.filter(d => d.finished);
    lines.push('WRITING', `  Pieces finished: ${fin.length}${fin.length ? ` (longest: ${Math.max(...fin.map(draftWords))} words)` : ''}`);
    fin.forEach(d => lines.push(`   - ${QC.writing.stages[d.stage].name}, ${d.type}: “${d.prompt || 'Untitled'}” (${draftWords(d)} words)`));
    lines.push('', 'PROJECTS');
    let anyP = false;
    QC.projects.forEach(pr => { const st = (S.projects[pr.id] || {}).steps || {}; const n = QC.stepTemplate.filter(x => st[x.k] && st[x.k].done).length; if (n) { anyP = true; lines.push(`  ${pr.name}: ${n} of 7 steps`); } });
    if (!anyP) lines.push('  None started yet.');
    const tough = allLessons().filter(x => S.done[x.L.id] && S.done[x.L.id].best < 0.6);
    lines.push('', 'AREAS TO KEEP PRACTISING'); if (tough.length) tough.forEach(x => lines.push(`  - ${SUB[x.sub].name}: ${x.L.n} (Level ${x.L.t})`)); else lines.push('  None flagged.');
    lines.push('', 'Supports used: read-aloud, dyslexia-friendly fonts and spacing, voice typing, short sessions with brain breaks, and hands-on tasks.');
    return lines.join('\n');
  }
  function pinGate(main) {
    const setting = !S.pin; let entry = '', first = null;
    main.innerHTML = `<div class="page-head">${backBtn('home', 'Home')}</div>
      <div class="card stack" style="max-width:420px;margin:0 auto"><div class="eyebrow">Parent area</div><h1 id="pin-title">${setting ? 'Create a 4-digit parent PIN' : 'Enter the parent PIN'}</h1>
        <p class="muted small-text" id="pin-sub">${setting ? 'This keeps the parent area separate. It isn’t high security.' : ''}</p>
        <div class="pin-dots" id="pdots"><i></i><i></i><i></i><i></i></div>
        <div class="numpad" id="ppad" style="justify-content:center">${['1', '2', '3', 'back', '4', '5', '6', '', '7', '8', '9', '', '0'].map(k => k === '' ? '<span></span>' : k === 'back' ? '<button data-k="back" aria-label="Delete">⌫</button>' : k === '0' ? '<button data-k="0" class="wide">0</button>' : `<button data-k="${k}">${k}</button>`).join('')}</div>
        ${setting ? '' : '<button class="btn ghost small" id="forgot">Forgot PIN?</button>'}</div>`;
    const dots = () => $$('#pdots i').forEach((d, i) => d.classList.toggle('on', i < entry.length));
    const done = () => {
      if (setting) {
        if (first == null) { first = entry; entry = ''; $('#pin-title').textContent = 'Type the same PIN again'; dots(); return; }
        if (entry === first) { S.pin = entry; save(); parentOpen = true; render(); } else { first = null; entry = ''; $('#pin-title').textContent = 'The PINs didn’t match. Create a PIN'; dots(); }
        return;
      }
      if (entry === S.pin) { parentOpen = true; render(); } else { entry = ''; dots(); toast('That PIN isn’t right.'); }
    };
    $('#ppad').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const k = b.dataset.k; if (k === 'back') entry = entry.slice(0, -1); else if (entry.length < 4) entry += k; dots(); if (entry.length === 4) done(); });
    keyHandler = e => { if (/^[0-9]$/.test(e.key) && entry.length < 4) { entry += e.key; dots(); if (entry.length === 4) done(); } else if (e.key === 'Backspace') { entry = entry.slice(0, -1); dots(); } };
    const fg = $('#forgot');
    if (fg) fg.addEventListener('click', () => modal(`<h2>Forgot the PIN?</h2><p>Answer this grown-up question to clear the PIN. Progress is kept.</p><label for="fq"><b>What is 17 × 23?</b></label><input class="field" id="fq" inputmode="numeric" autocomplete="off"><div class="row end"><button class="btn ghost" data-act="close-modal">Cancel</button><button class="btn primary" id="fqgo">Clear PIN</button></div>`,
      box => box.querySelector('#fqgo').addEventListener('click', () => { if (box.querySelector('#fq').value.trim() === '391') { S.pin = ''; save(); closeModal(); render(); toast('PIN cleared. Create a new one.'); } else toast('Not quite. Try again.'); })));
  }

  /* auto read */
  function maybeAutoRead() {
    if (!S.settings.autoRead || !TTS.ok) return;
    setTimeout(() => { const b = $('#main [data-act="readq"]') || $('#main .step-card [data-act="say"]') || $('#main [data-act="say"]'); if (b) b.click(); }, 250);
  }

  /* ───────────── global actions ───────────── */
  const ACT = {
    home: () => go('home'),
    go: b => go(b.dataset.to),
    world: b => go('world', { sub: b.dataset.sub }),
    intro: b => go('intro', { id: b.dataset.id }),
    'start-lesson': b => startLesson(b.dataset.id),
    check: b => startCheck(b.dataset.sub),
    'skip-check': b => { S.start[b.dataset.sub] = 1; logEvent('check', `${SUB[b.dataset.sub].name}: skipped warm-up, starting at Level 1`, { sub: b.dataset.sub }); save(); render(); },
    settings: () => go('settings'),
    break: () => { SCREENS.break.counted = false; go('break'); },
    'end-break': () => { const r = returnTo && returnTo.name !== 'break' ? returnTo : { name: 'home', p: {} }; returnTo = null; resetFocus(); if (blobStop) blobStop(); go(r.name, r.p); },
    'keep-going': () => { focusNudge.pending = false; focusNudge.next = focusNudge.sec + 5 * 60; const n = $('#nudge'); if (n) n.remove(); },
    project: b => { resetFocus(); go('project', { id: b.dataset.id }); },
    quest: b => {
      const q = dailyQuests()[+b.dataset.i];
      if (q.kind === 'lesson') { if (!S.start[q.sub]) go('world', { sub: q.sub }); else go('intro', { id: nextLesson(q.sub).id }); }
      else if (q.kind === 'writing') go('writing'); else go('projects');
    },
    'new-draft': () => {
      const d = { id: 'd' + Date.now().toString(36), type: WL.type, stage: WL.stage || 1, prompt: '', parts: {}, created: Date.now(), updated: Date.now(), finished: false };
      S.drafts.push(d); save(); resetFocus(); go('write', { id: d.id });
    },
    'open-draft': b => { resetFocus(); go('write', { id: b.dataset.id }); },
    'del-draft': b => confirmBox('Delete this writing?', 'It will be gone for good.', 'Delete', () => { S.drafts = S.drafts.filter(d => d.id !== b.dataset.id); save(); render(); }),
    'read-draft': b => { const d = S.drafts.find(x => x.id === b.dataset.id); if (!d) return; modal(`<h2>${esc(d.prompt || 'Untitled')}</h2><div class="say"><div class="say-text" style="max-height:55vh;overflow:auto">${draftText(d).split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join('')}</div>${spk()}</div><p class="wc">${draftWords(d)} WORDS</p><div class="row end"><button class="btn primary" data-act="close-modal">Close</button></div>`); },
    'leave-lesson': () => confirmBox('Leave this level?', 'Your XP so far is kept, but the level won’t be marked as finished. You can start it again any time.', 'Leave', () => { const sub = P ? P.sub : 'english'; P = null; go('world', { sub }); }),
    'lock-parents': () => { parentOpen = false; go('home'); },
    'close-modal': () => closeModal(),
    say: b => { const box = b.closest('.say'); const el = box && box.querySelector('.say-text'); if (el) TTS.speak(el.textContent, el, b); },
    readq: b => {
      const el = $('#qtext'); if (!el) return;
      let extra = '';
      const opts = $$('#qhost .opt .opt-text'); if (opts.length) extra = ' ' + opts.map((o, i) => `${'ABCD'[i]}: ${o.textContent}.`).join(' ');
      if (curQ && curQ.sayAlso) extra = ' ' + curQ.sayAlso + extra;
      TTS.speak(el.textContent + extra, el, b);
    }
  };

  document.addEventListener('click', e => {
    lastInput = Date.now();
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const fn = ACT[b.dataset.act]; if (!fn) return;
    e.preventDefault(); fn(b, e);
  });
  document.addEventListener('keydown', e => {
    lastInput = Date.now();
    if (e.key === 'Escape' && $('#modal-root').children.length) { closeModal(); return; }
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'Enter' || e.key === ' ') { if (tag === 'button' || tag === 'summary' || tag === 'a') return; }
    if (e.key === 'Enter') { const nb = $('#next'); if (nb) { e.preventDefault(); nb.click(); return; } }
    if (keyHandler && !$('#modal-root').children.length) keyHandler(e);
  });
  document.addEventListener('pointerdown', () => { lastInput = Date.now(); }, { passive: true });
  document.addEventListener('input', () => { lastInput = Date.now(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { save(); TTS.stop(); } });
  window.addEventListener('pagehide', save);

  /* ───────────── start ───────────── */
  applySettings();
  TTS.init();
  resetFocus();
  setInterval(tick, 1000);
  if (!S.setup) R = { name: 'welcome', p: {} };
  const hash = (location.hash || '').slice(1);
  if (S.setup && ['writing', 'projects', 'badges', 'settings', 'parents', 'break'].includes(hash)) R = { name: hash, p: {} };
  render();
  try { if (document.querySelector('link[rel="manifest"]') && 'serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) { /* ignore */ }
  window.__quest = { get state() { return S; }, GEN, QC };
})();
