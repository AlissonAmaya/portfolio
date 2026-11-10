/* script.js — renders everything from portfolioData (js/data.js). Do not put personal info here. */
(function () {
  'use strict';
  const D = portfolioData, P = D.personal;
  const $ = (s, r = document) => r.querySelector(s);

  /* ---- Helpers: safe DOM builder (uses textContent, never innerHTML) ---- */
  const h = (tag, props = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false || v === '') continue;
      if (k === 'text') e.textContent = v; else e.setAttribute(k === 'cls' ? 'class' : k, v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c); });
    return e;
  };
  const okUrl = u => /^(https?:\/\/|mailto:|assets\/)/i.test(u || '');          // blocks javascript: etc.
  const link = (href, text, cls) => okUrl(href) && h('a', { href, cls, text,
    target: /^https?/i.test(href) ? '_blank' : null, rel: 'noopener noreferrer' });
  const chips = a => (a && a.length) ? h('ul', { cls: 'chips' }, a.map(x => h('li', { text: x }))) : null;
  const list = a => (a && a.length) ? h('ul', { cls: 'bul' }, a.map(x => h('li', { text: x }))) : null;
  const sampleTag = o => o.sample && h('span', { cls: 'tag sample', text: 'Sample data' });
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const socials = () => Object.entries(D.social || {}).filter(([, v]) => okUrl(v)).map(([k, v]) => h('li', {}, link(v, cap(k))));
  // Hide a section (and its nav link) when it has nothing to show.
  const hideSection = id => { $('#' + id).hidden = true; const a = $(`#menu a[href="#${id}"]`); if (a) a.parentElement.hidden = true; };
  const fill = (id, body, nodes) => { if (nodes.length) $(body).replaceChildren(...nodes); else hideSection(id); };

  /* ---- Metadata + Hero ---- */
  document.title = `${P.name} | ${P.title}`;
  $('meta[name=description]').content = P.description;
  $('meta[property="og:title"]').content = document.title;
  $('meta[property="og:description"]').content = P.description;
  $('#logo').textContent = P.initials;
  $('#h-loc').textContent = P.location; $('#h-name').textContent = P.name;
  $('#h-title').textContent = P.title; $('#h-desc').textContent = P.description;
  if (okUrl(P.cv)) { const cv = $('#cv'); cv.href = P.cv; cv.hidden = false; }
  $('#h-social').replaceChildren(...socials());
  const av = $('#avatar'), fallback = () => av.replaceChildren(h('span', { text: P.initials }));
  if (P.profileImage) {
    const img = h('img', { src: P.profileImage, alt: `Portrait of ${P.name}`, width: 240, height: 240, fetchpriority: 'high' });
    img.addEventListener('error', fallback); av.append(img);
  } else fallback();

  /* ---- About ---- */
  const ab = D.about || {};
  fill('about', '#about-body', [
    ...(ab.paragraphs || []).map(t => h('p', { cls: 'lead', text: t })),
    (ab.highlights || []).length ? h('div', { cls: 'grid' }, ab.highlights.map(x => h('article', { cls: 'card' }, h('h3', { text: x.title }), h('p', { text: x.text })))) : null
  ].filter(Boolean));

  /* ---- Skills ---- */
  fill('skills', '#skills-body', (D.skills || []).filter(s => s.items && s.items.length)
    .map(s => h('article', { cls: 'card' }, h('h3', { text: s.category }), chips(s.items))));

  /* ---- Projects (cards + category filter) ---- */
  const projects = D.projects || [];
  const card = p => h('article', { cls: 'card proj' },
    p.image ? h('img', { src: p.image, alt: `Screenshot of ${p.name}`, loading: 'lazy' }) : h('div', { cls: 'ph', 'aria-hidden': 'true', text: p.name.charAt(0) }),
    h('div', { cls: 'pad' },
      h('div', { cls: 'row' }, p.status && h('span', { cls: 'tag', text: p.status }), p.category && h('span', { cls: 'tag', text: p.category }), sampleTag(p)),
      h('h3', { text: p.name }), h('p', { text: p.description }), chips(p.tech),
      (okUrl(p.repo) || okUrl(p.demo)) ? h('div', { cls: 'row' }, link(p.repo, 'GitHub', 'btn sm ghost'), link(p.demo, 'Live demo', 'btn sm')) : null));
  if (!projects.length) hideSection('projects'); else {
    let cur = 'All'; const grid = $('#projects-grid'), bar = $('#filters');
    const draw = () => grid.replaceChildren(...projects.filter(p => cur === 'All' || p.category === cur).map(card));
    const cats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
    if (cats.length > 2) bar.append(...cats.map(c => {
      const b = h('button', { type: 'button', text: c, 'aria-pressed': String(c === cur) });
      b.addEventListener('click', () => { cur = c; bar.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); draw(); });
      return b;
    }));
    draw();
  }

  /* ---- Timelines (education + experience) ---- */
  const period = o => [o.start, o.current ? 'Present' : o.end].filter(Boolean).join(' – ');
  const entry = (title, sub, o, ...extra) => h('article', { cls: 'item' },
    h('p', { cls: 'muted small', text: period(o) }), h('h3', { text: title }), h('p', { cls: 'sub', text: sub }), sampleTag(o), ...extra);
  fill('education', '#education-body', (D.education || []).map(e => entry(e.program, e.institution, e,
    e.description && h('p', { text: e.description }), chips(e.subjects), list(e.achievements))));
  const exp = D.experience || [];
  if (exp.length) fill('experience', '#experience-body', exp.map(e => entry(e.role, e.company, e, list(e.responsibilities), list(e.achievements), chips(e.tech))));
  else $('#experience-body').replaceChildren(h('p', { cls: 'empty', text: D.experienceEmptyMessage || 'Professional experience will appear here.' }));

  /* ---- Certifications + achievements ---- */
  fill('certifications', '#certs-body', (D.certifications || []).map(c => h('article', { cls: 'card' },
    h('div', { cls: 'row' }, c.type && h('span', { cls: 'tag', text: c.type }), sampleTag(c)),
    h('h3', { text: c.title }), h('p', { cls: 'muted small', text: [c.issuer, c.date].filter(Boolean).join(' · ') }),
    c.description && h('p', { text: c.description }), link(c.link, 'View credential', 'btn sm ghost'))));

  /* ---- Contact + footer ---- */
  $('#contact-info').replaceChildren(
    h('li', {}, 'Email: ', link('mailto:' + P.email, P.email)), h('li', { text: 'Location: ' + P.location }), ...socials());
  $('#f-copy').textContent = `© ${new Date().getFullYear()} ${P.name}`; $('#f-msg').textContent = P.closing;
  $('#f-social').replaceChildren(...socials());
  $('#f-nav').replaceChildren(...[...document.querySelectorAll('#menu a')].filter(a => !a.parentElement.hidden)
    .map(a => h('li', {}, h('a', { href: a.getAttribute('href'), text: a.textContent }))));

  /* ---- Theme (remembers choice) ---- */
  const root = document.documentElement; let t = null;
  try { t = localStorage.getItem('theme'); } catch (e) { /* storage blocked */ }
  root.dataset.theme = t || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  $('#theme').addEventListener('click', () => {
    const n = root.dataset.theme === 'dark' ? 'light' : 'dark'; root.dataset.theme = n;
    try { localStorage.setItem('theme', n); } catch (e) { /* ignore */ }
  });

  /* ---- Mobile menu ---- */
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---- Active link + scroll reveal ---- */
  const secs = [...document.querySelectorAll('main section')].filter(s => !s.hidden);
  if ('IntersectionObserver' in window) {
    const act = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) menu.querySelectorAll('a').forEach(a =>
      a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { threshold: 0.08 });
    secs.forEach(s => { act.observe(s); if (s.classList.contains('reveal')) rev.observe(s); });
  } else document.querySelectorAll('.reveal').forEach(s => s.classList.add('in'));

  /* ---- Contact form: validates, then opens a mailto link (no backend) ---- */
  const f = $('#form');
  f.addEventListener('submit', ev => {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(f)), err = {};
    if (!d.name.trim()) err.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) err.email = 'Enter a valid email address.';
    if (d.subject.trim().length < 3) err.subject = 'Enter a subject (3+ characters).';
    if (d.message.trim().length < 10) err.message = 'Write a message (10+ characters).';
    ['name', 'email', 'subject', 'message'].forEach(k => { $('#e-' + k).textContent = err[k] || ''; f.elements[k].setAttribute('aria-invalid', String(!!err[k])); });
    const st = $('#status');
    if (Object.keys(err).length) { st.textContent = 'Fix the highlighted fields and try again.'; return; }
    st.textContent = 'Opening your email app…';
    location.href = `mailto:${P.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message + '\n\n' + d.name + ' (' + d.email + ')')}`;
  });
})();
