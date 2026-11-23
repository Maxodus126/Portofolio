/* ============================================================
   Maxodus Portfolio — main.js
   Proyek unggulan = 6 folder di 1_PROJECT_, pakai logo asli.
   Semua repo tetap diambil live dari GitHub API.
   ============================================================ */
(function () {
  'use strict';

  var USER = 'Maxodus126';
  var API = 'https://api.github.com/users/' + USER + '/repos?per_page=100&sort=updated';
  var BASE = 'https://github.com/' + USER;

  var LANG_COLORS = {
    'HTML': '#e34c26', 'CSS': '#663399', 'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6', 'C#': '#178600', 'Python': '#3572A5',
    'Rust': '#dea584', 'Shell': '#89e051', 'Swift': '#f05138', 'Go': '#00ADD8'
  };

  /* 6 proyek sesuai folder di C:\Users\aflin\Music\1_PROJECT_ */
  var projects = [
    {
      name: 'WIN MAC (MAC DOS)',
      desc: 'Dock ala macOS + menu bar untuk Windows 11. Ditulis dari nol dengan Rust di Win32 — ringan, tanpa Windhawk/Explorer patching.',
      lang: 'Rust',
      repo: 'WinMac',
      img: 'assets/img/winmac.png',
      tags: ['Desktop', 'Rust', 'Windows']
    },
    {
      name: 'AllSense Control',
      desc: 'Satu panel kendali daya laptop Windows — kecerahan, volume, power mode, hotkey global. Tanpa admin & tanpa driver vendor.',
      lang: 'C#',
      repo: 'AllSense-Control',
      img: 'assets/img/logo-allsense.png',
      tags: ['Utilitas', '.NET', 'Windows']
    },
    {
      name: '9Router Controller Pro',
      desc: 'GUI manager desktop untuk npx 9router. Start/stop sekali klik, monitoring status & RAM, console live, dan system tray.',
      lang: 'Python',
      repo: '9router-controller',
      img: 'assets/img/logo-9router.png',
      tags: ['GUI', 'Python', 'Windows']
    },
    {
      name: 'G_Controll',
      desc: 'Control center laptop gaming — panel kontrol untuk kecerahan, volume, dan pengaturan daya dengan tampilan khas gaming.',
      lang: 'C#',
      repo: 'AllSense-Control',
      img: 'assets/img/logo-gcontroll.png',
      tags: ['Gaming', 'Utilitas', 'Windows']
    },
    {
      name: 'Spotifast',
      desc: 'Tool & marketplace untuk Spotify — pasang theme, extension, dan snippet langsung dari dalam aplikasi Spotify.',
      lang: 'TypeScript',
      repo: 'spotifast-marketplace',
      img: 'assets/img/logo-spotifast.png',
      tags: ['Spotify', 'Tool', 'Plugin']
    },
    {
      name: 'Syris (yt-unified)',
      desc: 'Kumpulan tool dan tool AI — termasuk yt-unified, analisis, serta utilitas pengembangan lain dalam satu workspace.',
      lang: 'TypeScript',
      repo: 'MCP-FOR-DOCUMENT',
      img: 'assets/img/logo-syris.png',
      tags: ['Tool', 'AI', 'CLI']
    }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function langColor(lang) {
    return LANG_COLORS[lang] || '#8b949e';
  }

  function repoUrl(name) { return BASE + '/' + encodeURIComponent(name); }
  function releaseUrl(name) { return repoUrl(name) + '/releases/latest'; }

  /* ---------- Proyek unggulan ---------- */
  function renderFeatured() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;

    projects.forEach(function (p) {
      var card = el('article', 'project-card');

      var thumb = el('div', 'project-thumb');
      if (p.img) {
        var img = document.createElement('img');
        img.src = p.img;
        img.alt = p.name + ' logo';
        img.loading = 'lazy';
        thumb.appendChild(img);
      } else {
        var fb = el('div', 'fallback', '🛠️');
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

  /* ---------- Semua repo dari GitHub ---------- */
  function renderRepos(repos) {
    var grid = document.getElementById('repo-grid');
    if (!grid) return;

    repos.forEach(function (r) {
      var card = el('a', 'repo-card');
      card.href = r.html_url;
      card.target = '_blank';
      card.rel = 'noopener';

      var top = el('div', 'repo-top');
      top.appendChild(el('span', 'repo-name', r.name));
      var star = el('span', 'repo-star');
      star.innerHTML = '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 .25l2.36 4.78 5.27.77-3.81 3.72.9 5.25L8 12.32 3.28 14.77l.9-5.25L.37 5.8l5.27-.77z"/></svg>';
      star.appendChild(el('span', null, String(r.stargazers_count || 0)));
      top.appendChild(star);
      card.appendChild(top);

      card.appendChild(el('p', 'repo-desc', r.description || '—'));

      var bottom = el('div', 'repo-bottom');
      if (r.language) {
        var lang = el('span', 'repo-lang');
        var dot = document.createElement('i');
        dot.style.background = langColor(r.language);
        lang.appendChild(dot);
        lang.appendChild(el('span', null, r.language));
        bottom.appendChild(lang);
      }
      bottom.appendChild(el('span', 'repo-link', 'Buka →'));
      card.appendChild(bottom);
      grid.appendChild(card);
    });
  }

  function showLoading(grid, n) {
    for (var i = 0; i < n; i++) grid.appendChild(el('div', 'skeleton'));
  }

  function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function fetchRepos() {
    var grid = document.getElementById('repo-grid');
    if (!grid) return;
    showLoading(grid, 6);

    fetch(API)
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) throw new Error('format tidak valid');
        clearChildren(grid);
        var list = repos.filter(function (r) { return !r.fork; });
        if (!list.length) {
          grid.appendChild(el('p', 'repo-empty', 'Tidak ada repo publik.'));
          return;
        }
        renderRepos(list);
      })
      .catch(function () {
        clearChildren(grid);
        grid.appendChild(el('p', 'repo-error', 'Gagal memuat dari GitHub (rate-limit). Coba lagi nanti.'));
      });
  }

  function fetchStats() {
    Promise.all([
      fetch(API).then(function (r) { return r.json(); }),
      fetch('https://api.github.com/users/' + USER).then(function (r) { return r.json(); })
    ]).then(function (results) {
      var repos = Array.isArray(results[0]) ? results[0] : [];
      var user = results[1] || {};
      var repoEl = document.getElementById('stat-repos');
      var starEl = document.getElementById('stat-stars');
      if (repoEl) repoEl.textContent = user.public_repos != null ? user.public_repos : repos.filter(function (r) { return !r.fork; }).length;
      if (starEl && repos.length) starEl.textContent = repos.reduce(function (s, r) { return s + (r.stargazers_count || 0); }, 0);
    }).catch(function () {});
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  renderFeatured();
  fetchRepos();
  fetchStats();
})();
