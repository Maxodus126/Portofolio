/* ============================================================
   Maxodus Portfolio — main.js
   Hanya 6 project lokal dari folder 1_PROJECT_, pakai logo asli.
   Tidak ada fetch GitHub API.
   ============================================================ */
(function () {
  'use strict';

  var BASE = 'https://github.com/Maxodus126';

  var projects = [
    {
      name: 'WIN MAC',
      desc: 'Dock ala macOS dan menu bar untuk Windows 11. Ditulis dari nol dengan Rust di atas Win32 — ringan, tanpa Windhawk, tanpa patch Explorer.',
      lang: 'Rust',
      repo: 'WinMac',
      img: 'assets/img/winmac.png',
      tags: ['Desktop', 'Rust', 'Windows']
    },
    {
      name: 'AllSense Control',
      desc: 'Satu panel kecil untuk mengendalikan daya laptop Windows — kecerahan, volume, power mode, dan hotkey global. Tanpa admin, tanpa driver vendor.',
      lang: 'C#',
      repo: 'AllSense-Control',
      img: 'assets/img/logo-allsense.png',
      tags: ['Utilitas', '.NET', 'Windows']
    },
    {
      name: '9Router Controller Pro',
      desc: 'GUI manager desktop untuk 9router (npx 9router). Start/stop sekali klik, status hidup real-time, monitoring RAM, dan console langsung.',
      lang: 'Python',
      repo: '9router-controller',
      img: 'assets/img/logo-9router.png',
      tags: ['GUI', 'Python', 'Windows']
    },
    {
      name: 'G_Controll',
      desc: 'Control center laptop gaming — satu panel untuk kecerahan, volume, dan pengaturan daya dengan tampilan khas gaming.',
      lang: 'C#',
      repo: 'AllSense-Control',
      img: 'assets/img/logo-gcontroll.png',
      tags: ['Gaming', 'Utilitas', 'Windows']
    },
    {
      name: 'Spotifast',
      desc: 'Tool dan marketplace untuk Spotify — pasang theme, extension, dan snippet langsung dari dalam aplikasi Spotify.',
      lang: 'TypeScript',
      repo: 'spotifast-marketplace',
      img: 'assets/img/logo-spotifast.png',
      tags: ['Spotify', 'Tool', 'Plugin']
    },
    {
      name: 'Syris',
      desc: 'Tool dan tool AI dalam satu workspace — termasuk yt-unified, utilitas analisis, dan pengembangan.',
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

  function repoUrl(name) { return BASE + '/' + encodeURIComponent(name); }
  function releaseUrl(name) { return repoUrl(name) + '/releases/latest'; }

  function renderFeatured() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;

    projects.forEach(function (p, index) {
      var card = el('article', 'project-card');

      // nomor urut kecil sebagai penanda daftar (bukan dekorasi)
      var thumb = el('div', 'project-thumb');
      var img = document.createElement('img');
      img.src = p.img;
      img.alt = 'Logo ' + p.name;
      img.loading = 'lazy';
      thumb.appendChild(img);
      card.appendChild(thumb);

      var body = el('div', 'project-body');
      var titleRow = el('div', 'project-title');
      titleRow.appendChild(el('span', null, p.name));
      var badge = el('span', 'project-lang', p.lang);
      titleRow.appendChild(badge);
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

  document.getElementById('year').textContent = new Date().getFullYear();
  renderFeatured();
})();
