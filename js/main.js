/* ============================================================
   Maxodus Portfolio — main.js
   Mengambil repo dari GitHub API (public, tanpa token).
   ============================================================ */
(function () {
  'use strict';

  var USER = 'Maxodus126';
  var API = 'https://api.github.com/users/' + USER + '/repos?per_page=100&sort=updated';
  var BASE = 'https://github.com/' + USER;

  /* Warna bahasa (fallback default). */
  var LANG_COLORS = {
    'HTML': '#e34c26',
    'CSS': '#663399',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'C#': '#178600',
    'Python': '#3572A5',
    'Rust': '#dea584',
    'Shell': '#89e051',
    'Swift': '#f05138',
    'Go': '#00ADD8'
  };

  /* ---------- Proyek unggulan ---------- */
  var featured = [
    {
      name: 'WIN MAC',
      desc: 'A macOS-style dock and menu bar for Windows 11 — ditulis dari nol dalam Rust di atas Win32. Dock Liquid Glass, icon magnification, genie minimize, Spotlight, dan lain-lain. Ringan: ~1 MB, 0% CPU saat idle.',
      lang: 'Rust',
      repo: 'WinMac',
      img: 'assets/img/winmac.png',
      stars: false,
      tags: ['Desktop', 'Rust']
    },
    {
      name: 'AllSense Control',
      desc: 'Satu panel kecil untuk mengendalikan daya laptop Windows — kecerahan, volume, mode daya, hotkey global, dan self-update. Tanpa admin, tanpa driver vendor, dibangun dengan .NET.',
      lang: 'C#',
      repo: 'AllSense-Control',
      img: 'assets/img/allsense-control.png',
      stars: false,
      tags: ['Utilitas', '.NET']
    },
    {
      name: '9Router Controller Pro',
      desc: 'GUI manager desktop untuk 9router (npx 9router) — tombol ON/OFF tanpa terminal. Status hidup real-time, monitor uptime & RAM, console live, dan system tray.',
      lang: 'Python',
      repo: '9router-controller',
      img: null,
      stars: false,
      tags: ['GUI', 'Python', 'Windows']
    },
    {
      name: 'Spotifast Marketplace',
      desc: 'Rebranded fork dari Spicetify Marketplace — install themes, extensions, dan snippets langsung dari dalam Spotify.',
      lang: 'TypeScript',
      repo: 'spotifast-marketplace',
      img: null,
      stars: false,
      tags: ['Spotify', 'Plugin']
    },
    {
      name: 'Docker Lab Studio',
      desc: 'Proyek eksperimen seputar Docker — container dan environment untuk belajar & uji coba.',
      lang: 'HTML',
      repo: 'Docker-Lab-Studio',
      img: null,
      stars: false,
      tags: ['Docker']
    },
    {
      name: 'MCP for Document',
      desc: 'Model Context Protocol server untuk memproses dokumen — tool pengembangan berbasis TypeScript.',
      lang: 'TypeScript',
      repo: 'MCP-FOR-DOCUMENT',
      img: null,
      stars: false,
      tags: ['MCP', 'Tool']
    }
  ];

  /* ---------- Utilitas ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function langColor(lang) {
    return LANG_COLORS[lang] || '#8b949e';
  }

  function repoUrl(name) { return BASE + '/' + encodeURIComponent(name); }
  function releaseUrl(name) { return repoUrl(name) + '/releases/latest'; }

  /* ---------- Render proyek unggulan ---------- */
  function renderFeatured() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;

    featured.forEach(function (p) {
      var card = el('article', 'project-card');

      var thumb = el('div', 'project-thumb');
      if (p.img) {
        var img = document.createElement('img');
        img.src = p.img;
        img.alt = p.name + ' screenshot';
        img.loading = 'lazy';
        thumb.appendChild(img);
      } else {
        var fb = el('div', 'fallback');
        fb.appendChild(el('span', null, '🛠️'));
        thumb.appendChild(fb);
      }
      card.appendChild(thumb);

      var body = el('div', 'project-body');
      var titleRow = el('div', 'project-title');
      titleRow.appendChild(el('span', null, p.name));
      var langBadge = el('span', 'project-lang', p.lang);
      titleRow.appendChild(langBadge);
      body.appendChild(titleRow);

      body.appendChild(el('p', 'project-desc', p.desc));

      var meta = el('div', 'project-meta');
      p.tags.forEach(function (t) {
        meta.appendChild(el('span', null, '#' + t));
      });
      body.appendChild(meta);

      var actions = el('div', 'project-actions');
      var viewBtn = el('a', 'btn btn-primary btn-sm', 'Lihat Repo');
      viewBtn.href = repoUrl(p.repo);
      viewBtn.target = '_blank';
      viewBtn.rel = 'noopener';
      var dlBtn = el('a', 'btn btn-ghost btn-sm', '⬇️ Rilis');
      dlBtn.href = releaseUrl(p.repo);
      dlBtn.target = '_blank';
      dlBtn.rel = 'noopener';
      actions.appendChild(viewBtn);
      actions.appendChild(dlBtn);
      body.appendChild(actions);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- Render semua repo dari GitHub ---------- */
  function renderRepos(repos) {
    var grid = document.getElementById('repo-grid');
    if (!grid) return;

    repos.forEach(function (r) {
      var card = el('a', 'repo-card');
      card.href = r.html_url;
      card.target = '_blank';
      card.rel = 'noopener';

      var top = el('div', 'repo-top');
      var name = el('span', 'repo-name', r.name);
      var star = el('span', 'repo-star');
      star.innerHTML = '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 .25l2.36 4.78 5.27.77-3.81 3.72.9 5.25L8 12.32 3.28 14.77l.9-5.25L.37 5.8l5.27-.77z"/></svg>';
      star.appendChild(el('span', null, String(r.stargazers_count || 0)));
      top.appendChild(name);
      top.appendChild(star);
      card.appendChild(top);

      var desc = (r.description || '—');
      card.appendChild(el('p', 'repo-desc', desc));

      var bottom = el('div', 'repo-bottom');
      if (r.language) {
        var lang = el('span', 'repo-lang');
        var dot = document.createElement('i');
        dot.style.background = langColor(r.language);
        lang.appendChild(dot);
        lang.appendChild(el('span', null, r.language));
        bottom.appendChild(lang);
      }
      var link = el('span', 'repo-link', 'Buka →');
      bottom.appendChild(link);
      card.appendChild(bottom);

      grid.appendChild(card);
    });
  }

  function showLoading(grid, n) {
    for (var i = 0; i < n; i++) {
      var s = el('div', 'skeleton');
      grid.appendChild(s);
    }
  }

  function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ---------- Ambil dari GitHub API ---------- */
  function fetchRepos() {
    var grid = document.getElementById('repo-grid');
    if (!grid) return;
    showLoading(grid, 6);

    fetch(API)
      .then(function (res) {
        if (!res.ok) {
          // Batas limit/error -> fallback ke daftar lokal.
          throw new Error('GitHub API ' + res.status);
        }
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) throw new Error('format tidak valid');
        clearChildren(grid);
        var publicRepos = repos.filter(function (r) { return !r.fork; });
        if (!publicRepos.length) {
          grid.appendChild(el('p', 'repo-empty', 'Tidak ada repo publik.'));
          return;
        }
        renderRepos(publicRepos);
      })
      .catch(function () {
        clearChildren(grid);
        var msg = el('p', 'repo-error', 'Gagal memuat dari GitHub (mungkin terkena rate-limit). Coba lagi nanti — repo unggulan di atas tetap tampil.');
        grid.appendChild(msg);
      });
  }

  /* ---------- Statistik hero ---------- */
  function fetchStats() {
    Promise.all([
      fetch(API).then(function (r) { return r.json(); }),
      fetch('https://api.github.com/users/' + USER).then(function (r) { return r.json(); })
    ]).then(function (results) {
      var repos = Array.isArray(results[0]) ? results[0] : [];
      var user = results[1] || {};
      var repoEl = document.getElementById('stat-repos');
      var starEl = document.getElementById('stat-stars');
      if (repoEl) {
        repoEl.textContent = Array.isArray(user.public_repos) ? user.public_repos : repos.filter(function (r) { return !r.fork; }).length;
      }
      if (starEl && repos.length) {
        starEl.textContent = repos.reduce(function (s, r) { return s + (r.stargazers_count || 0); }, 0);
      }
    }).catch(function () {});
  }

  /* ---------- Init ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  renderFeatured();
  fetchRepos();
  fetchStats();
})();
