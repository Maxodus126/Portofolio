# Design Direction — Maxodus Portfolio

## Identity

Portfolio untuk pembuat **software desktop Windows**. Visual language: *window chrome / system monitor*, bukan kartu SaaS generik. Page ini adalah etalase tool, jadi tiap project ditampilkan seperti panel aplikasi yang sedang berjalan, bukan seperti artikel/blog.

**Dial:** ENERGY 2 / RHYTHM 2 / MOTION 1.

## Palette (2 core + 1 accent + 1 semantic)

| Role | Hex | Reason |
|---|---|---|
| Background | `#0b0d11` | Gelap karena subjeknya tool/terminal desktop, bukan dark-by-default |
| Surface | `#141821` | Panel jendela, cukup terang untuk memisahkan dari background |
| Line | `#262c38` | Border jendela yang terlihat tanpa berat |
| Text | `#e9edf5` | Kontras tinggi untuk judul dan isi |
| Muted | `#a7b0c0` | Teks sekunder, lulus WCAG AA di atas surface |
| Accent | `#ffb02e` | Amber: warna LED/status pada panel kontrol, dipakai sekali di elemen utama |
| Success | `#4ae0a0` | Hijau terminal untuk indikator "berjalan" dan prompt |

Dilarang: gradasi biru-ungu, glow di semua elemen, shadow lembut di semua kartu.

## Typography

- **Display/UI:** Bricolage Grotesque, weight 500-800. Karakter tegas, jauh dari Inter/Geist default.
- **Monospace:** JetBrains Mono, weight 400-700. Dipakai hanya untuk prompt terminal, label angka/versi, dan path.
- Alasan: kombinasi ini menghadirkan rasa tool desktop modern tanpa meniru Linear/Vercel.

## Layout

- Nav sticky, rata kiri, dengan menu mobile yang benar-benar berfungsi (tidak `display:none`).
- Hero: dua kolom, kiri judul + deskripsi (tanpa `<br>` paksa), kanan jendela terminal sebagai focal point.
- Bagian "Tentang": tiga blok teks dengan garis pemisah, bukan kartu identik.
- Bagian "Project": 2x2 **window modules**. Tiap modul punya chrome bar (titik, judul, label `v1.0` / Bahasa), area preview berisi **screenshot asli atau logo besar**, deskripsi, dan satu CTA berbentuk perintah: `$ buka winmac` dengan `aria-label` deskriptif.
- Variasi preview:
  - WinMac: logo besar + strip dock (dari aset `winmac.png`).
  - AllSense Control: screenshot panel `allsense-ss.png` (tinggi, dipangkas rapi).
  - 9Router: logo play hijau di atas garis console.
  - Spotifast: logo audio + baris daftar.
- Footer ringkas, dua tautan nyata.

## Purpose log (R-31)

| Keputusan | Alasan satu baris |
|---|---|
| Amber single accent | Mensimulasikan LED status pada panel kontrol Windows, bukan dekorasi generik |
| Window chrome pada project | Sesuai dengan produk berupa aplikasi desktop berjendela |
| Terminal di hero | Menunjukkanimodal kerja pembuat tool (CLI + GUI) tanpa fake typing animation |
| Screenshot asli di preview | Bukti nyata produk, bukan ilustrasi stok |
| CTA `$ buka ...` | Mengubah tombol menjadi perintah yang sesuai dengan konteks tool |
| Satu warna teks muted | Mencegah teks abu-abu sulit dibaca |
| Tanpa animasi masuk | MOTION 1, fokus pada kejelasan |

## Constraint konten

- Tepat 4 project: WIN MAC, AllSense Control, 9Router Controller Pro, Spotifast.
- Tiap project satu tombol "Buka Website" ke github.io masing-masing.
- Tanpa API GitHub, tanpa "Semua Repo", tanpa G_Controll, tanpa Syris.
- Tanpa statistik, testimoni, atau klaim yang tidak bisa diverifikasi.
