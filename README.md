# Maxodus — Portofolio

Website portofolio statis untuk project-project GitHub — dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework).

## Fitur

- 🖥️ **Proyek unggulan** — kartu dengan screenshot, bahasa, dan link ke repo & rilis.
- 🔄 **Semua repo otomatis** — dimuat langsung dari API GitHub `@Maxodus126`.
- 📊 **Statistik live** — jumlah repo & star diambil otomatis.
- 🌙 Desain gelap profesional & responsif.

## Menjalankan lokal

Cukup buka `index.html` di browser, atau jalankan server sederhana:

```bash
python -m http.server 8000
# lalu buka http://localhost:8000
```

## Deploy ke GitHub Pages

1. Push repo ini ke GitHub.
2. **Settings → Pages** → Source: `main` branch → Save.
3. Website tampil di `https://<username>.github.io/Portofolio/`.

## Ubah username GitHub

Di [js/main.js](js/main.js), ubah variabel `USER` (default: `Maxodus126`).
