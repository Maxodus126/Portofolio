/* ============================================================
   Maxodus Portfolio main.js
   4 project, satu CTA "Buka Website" per kartu.
   Interaksi: dock (lompat ke kartu), reveal on scroll, menu mobile.
   ============================================================ */
(function () {
  'use strict';

  // Gate dibuat di sini (bukan di <head>): hanya aktif bila main.js benar-benar
  // berjalan, sehingga konten tetap terlihat jika script gagal dimuat.
  document.documentElement.classList.add('js');

  var projects = [
    {
      id: 'p-winmac',
      name: 'WIN MAC',
      lang: 'Rust',
      desc: 'Dock ala macOS dan menu bar untuk Windows 11. Ditulis dari nol dengan Rust di atas Win32, tanpa Windhawk dan tanpa patch Explorer.',
      site: 'https://maxodus126.github.io/WinMac/',
      img: 'assets/img/winmac.png',
      tags: ['Desktop', 'Rust', 'Windows']
    },
    {
      id: 'p-allsense',
      name: 'AllSense Control',
      lang: 'C#',
      desc: 'Panel kendali daya laptop Windows: kecerahan, volume, power mode, dan hotkey global. Tanpa admin dan tanpa driver vendor.',
      site: 'https://maxodus126.github.io/AllSense-Control/',
      img: 'assets/img/logo-allsense.png',
      tags: ['Utilitas', '.NET', 'Windows']
    },
    {
      id: 'p-9router',
      name: '9Router Controller Pro',
      lang: 'Python',
      desc: 'GUI manager untuk 9router. Start dan stop sekali klik, status real-time, monitoring RAM, dan console langsung di jendela aplikasi.',
      site: 'https://maxodus126.github.io/9router-controller/',
      img: 'assets/img/logo-9router.png',
      tags: ['GUI', 'Python', 'Windows']
    },
    {
      id: 'p-spotifast',
      name: 'Spotifast',
      lang: 'TypeScript',
      desc: 'Marketplace Spotify untuk memasang theme, extension, dan snippet langsung dari dalam aplikasi Spotify.',
      site: 'https://maxodus126.github.io/Spotifast/',
      img: 'assets/img/logo-spotifast.png',
      tags: ['Spotify', 'Tool', 'Plugin']
    }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function dots() {
    var wrap = el('span', 'win-dots');
    wrap.setAttribute('aria-hidden', 'true');
    ['d1', 'd2', 'd3'].forEach(function (c) {
      var i = document.createElement('i');
      i.className = c;
      wrap.appendChild(i);
    });
    return wrap;
  }

  /* ---------- Reduced-motion: satu sumber kebenaran + observasi perubahan ---------- */
  var rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reducedMotion = rmq.matches;
  if (rmq.addEventListener) {
    rmq.addEventListener('change', function () {
      reducedMotion = rmq.matches;
      if (reducedMotion) {
        document.querySelectorAll('.dock-item, .btn').forEach(function (el) {
          el.style.transform = '';
        });
      }
    });
  }

  /* ---------- Kartu project ---------- */
  function renderProjects() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;

    projects.forEach(function (p) {
      var card = el('article', 'project-card');
      card.id = p.id;
      card.tabIndex = -1; // agar bisa menerima focus() programatik dari dock

      var bar = el('div', 'card-bar');
      bar.appendChild(dots());
      bar.appendChild(el('span', 'card-name', p.name));
      bar.appendChild(el('span', 'card-lang', p.lang));
      card.appendChild(bar);

      var shot = el('div', 'card-shot');
      var img = document.createElement('img');
      img.src = p.img;
      img.alt = 'Ikon ' + p.name;
      img.width = 256;
      img.height = 256;
      img.loading = 'lazy';
      img.decoding = 'async';
      shot.appendChild(img);
      card.appendChild(shot);

      var body = el('div', 'card-body');
      body.appendChild(el('p', 'card-desc', p.desc));

      var tags = el('div', 'card-tags');
      p.tags.forEach(function (t) { tags.appendChild(el('span', null, t)); });
      body.appendChild(tags);

      var cta = el('a', 'btn btn-primary btn-sm card-cta', 'Buka Website');
      cta.href = p.site;
      cta.target = '_blank';
      cta.rel = 'noopener';
      cta.setAttribute('aria-label', 'Buka website ' + p.name + ' di tab baru');
      body.appendChild(cta);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- Entrance hero (saat muat) ---------- */
  function initHeroEntrance() {
    var els = document.querySelectorAll('.hero [data-anim]');
    if (!els.length) return;
    if (reducedMotion) {
      els.forEach(function (e) { e.classList.add('is-visible'); });
      return;
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.forEach(function (e) { e.classList.add('is-visible'); });
      });
    });
  }

  /* ---------- Reveal on scroll (generik: data-reveal + kartu) ---------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal], .project-card');
    if (!els.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.transitionDelay = (idx % 6) * 80 + 'ms';
        el.classList.add('is-visible');
        io.unobserve(el);
        // Bersihkan delay setelah entrance selesai agar hover interaktif tidak ikut melambat.
        var clearDelay = function (ev) {
          if (ev.propertyName === 'opacity') {
            el.style.transitionDelay = '';
            el.removeEventListener('transitionend', clearDelay);
          }
        };
        el.addEventListener('transitionend', clearDelay);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Dock: magnifikasi ala macOS (jarak kursor) ---------- */
  function initDockMagnify() {
    var dock = document.querySelector('.dock');
    var items = Array.prototype.slice.call(document.querySelectorAll('.dock-item'));
    if (!dock || !items.length) return;
    if (reducedMotion) return;

    var RADIUS = 170;
    var BOOST = 0.55;

    function update(cx, cy) {
      items.forEach(function (item) {
        var r = item.getBoundingClientRect();
        var dx = (r.left + r.width / 2) - cx;
        var dy = (r.top + r.height / 2) - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var t = Math.max(0, 1 - dist / RADIUS);
        var s = 1 + t * BOOST;
        var lift = t * 8;
        item.style.transform = 'translateY(' + (-lift) + 'px) scale(' + s + ')';
      });
    }

    // Throttle rAF: hindari layout-read per frame dari kursor cepat.
    var ticking = false;
    dock.addEventListener('mousemove', function (e) {
      if (reducedMotion) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        dock.classList.add('is-magnifying');
        update(e.clientX, e.clientY);
      });
    });
    dock.addEventListener('mouseleave', function () {
      ticking = false;
      dock.classList.remove('is-magnifying');
      items.forEach(function (i) { i.style.transform = ''; });
    });
  }

  /* ---------- Tombol magnetik ---------- */
  function initMagnetic() {
    if (reducedMotion) return;
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        if (reducedMotion) return;
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left) - r.width / 2;
        var y = (e.clientY - r.top) - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.12).toFixed(1) + 'px, ' +
          (y * 0.12).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- Scrollspy: sorot tautan navbar aktif ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a, .nav-mobile a'));
    var ids = links.map(function (a) { return a.getAttribute('href'); })
      .filter(function (h) { return h && h.charAt(0) === '#'; });
    var sections = ids.map(function (id) { return document.querySelector(id); }).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Dock: lompat ke kartu ---------- */
  function initDock() {
    document.querySelectorAll('.dock-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.dataset.target);
        if (!target) return;
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
        target.classList.add('is-visible');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-mobile');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('show'));
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('show')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Init aman: satu kegagalan tidak membekukan halaman ---------- */
  function safeInit(label, fn) {
    try {
      fn();
    } catch (err) {
      if ((window.console) && console.error) console.error('[init] ' + label, err);
    }
  }

  safeInit('year', function () {
    document.getElementById('year').textContent = new Date().getFullYear();
  });
  safeInit('projects', renderProjects);
  safeInit('entrance', initHeroEntrance);
  safeInit('reveal', initReveal);
  safeInit('dock', initDock);
  safeInit('dockMagnify', initDockMagnify);
  safeInit('magnetic', initMagnetic);
  safeInit('scrollspy', initScrollSpy);
  safeInit('mobileMenu', initMobileMenu);
})();
