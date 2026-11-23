/* ============================================================
   Maxodus Portfolio — main.js
   4 project dengan website github.io yang sudah aktif.
   ============================================================ */
(function () {
  'use strict';

  var projects = [
    {
      name: 'WIN MAC',
      desc: 'Dock ala macOS dan menu bar untuk Windows 11. Ditulis dari nol dengan Rust di atas Win32 — ringan, tanpa Windhawk, tanpa patch Explorer.',
      lang: 'Rust',
      site: 'https://maxodus126.github.io/WinMac/',
      img: 'assets/img/winmac.png',
      tags: ['Desktop', 'Rust', 'Windows']
    },
    {
      name: 'AllSense Control',
      desc: 'Satu panel kecil untuk mengendalikan daya laptop Windows — kecerahan, volume, power mode, dan hotkey global. Tanpa admin, tanpa driver vendor.',
      lang: 'C#',
      site: 'https://maxodus126.github.io/AllSense-Control/',
      img: 'assets/img/logo-allsense.png',
      tags: ['Utilitas', '.NET', 'Windows']
    },
    {
      name: '9Router Controller Pro',
      desc: 'GUI manager desktop untuk 9router (npx 9router). Start/stop sekali klik, status hidup real-time, monitoring RAM, dan console langsung.',
      lang: 'Python',
      site: 'https://maxodus126.github.io/9router-controller/',
      img: 'assets/img/logo-9router.png',
      tags: ['GUI', 'Python', 'Windows']
    },
    {
      name: 'Spotifast',
      desc: 'Tool dan marketplace untuk Spotify — pasang theme, extension, dan snippet langsung dari dalam aplikasi Spotify.',
      lang: 'TypeScript',
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

  function renderFeatured() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;

    projects.forEach(function (p) {
      var card = el('article', 'project-card');

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
      titleRow.appendChild(el('span', 'project-lang', p.lang));
      body.appendChild(titleRow);

      body.appendChild(el('p', 'project-desc', p.desc));

      var meta = el('div', 'project-meta');
      p.tags.forEach(function (t) {
        meta.appendChild(el('span', null, '#' + t));
      });
      body.appendChild(meta);

      var actions = el('div', 'project-actions');
      var viewBtn = el('a', 'btn btn-primary btn-sm', 'Buka Website');
      viewBtn.href = p.site;
      viewBtn.target = '_blank';
      viewBtn.rel = 'noopener';
      actions.appendChild(viewBtn);
      body.appendChild(actions);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  renderFeatured();
})();
