# brat-image

Generator gambar teks gaya brat. Background putih, teks hitam, rata justify, ukuran font menyesuaikan jumlah teks.

## Pakai
Buka `index.html` di browser, ketik teks, klik Download PNG.

## Struktur
- `index.html` - kerangka halaman
- `css/style.css` - tampilan
- `js/config.js` - semua pengaturan (ukuran, margin, font, warna)
- `js/layout.js` - pecah baris dan cari ukuran font
- `js/renderer.js` - gambar ke canvas (justify)
- `js/exporter.js` - simpan PNG
- `js/app.js` - sambungkan semuanya
