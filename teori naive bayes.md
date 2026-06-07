# Teori Naive Bayes — Sistem Pakar Gizi

## Rumus Dasar

```
P(penyakit_i | gejala) ∝ P(penyakit_i) × Π P(gejala_j | penyakit_i)
```

| Simbol | Arti |
|--------|------|
| `P(penyakit_i \| gejala)` | Probabilitas penyakit i diberikan gejala yang dipilih (posterior) |
| `P(penyakit_i)` | Prior probability penyakit i |
| `P(gejala_j \| penyakit_i)` | Conditional probability gejala j muncul pada penyakit i |
| `Π` | Perkalian semua gejala yang dipilih |

Karena penyebut `P(gejala)` sama untuk semua penyakit, kita hanya menghitung **pembilang** (nilai yang sebanding dengan posterior).

---

## Implementasi

### Prior

```ts
const prior = 1 / totalPenyakit;
```

Uniform — semua penyakit punya kesempatan awal yang sama.

### Conditional Probability (Laplace Smoothing)

```ts
const m = jumlah_gejala_dipilih;
const pembulatan = Math.max(Math.round(m * prior), 1);
const penyebut = m + 1;

nilai = (pembulatan + nilaigejala) / penyebut;
```

| Variabel | Arti |
|----------|------|
| `m` | Jumlah gejala yang dipilih user |
| `pembulatan` | Pseudo-count Laplace, minimal 1 |
| `nilaigejala` | 1 jika gejala terkait penyakit ini, 0 jika tidak |

Laplace smoothing mencegah probabilitas 0 ketika suatu gejala tidak terkait penyakit tertentu, yang akan membuat hasil perkalian = 0.

### Nilai Akhir

```ts
nilai_akhir = Π nilai × prior
```

Semua conditional probability dikalikan, lalu dikali prior.

### Ranking

Hasil diurutkan menurun berdasarkan `nilai_akhir`. Penyakit dengan nilai tertinggi adalah diagnosa utama.

---

## Normalisasi Tampilan

Nilai `nilai_akhir` asli sangat kecil (terutama jika banyak gejala dipilih) karena perkalian banyak bilangan < 1. Untuk keterbacaan, nilai dinormalisasi:

```ts
maxNilai = nilai_akhir[0]  // nilai tertinggi
normalisasi(x) = (x / maxNilai) × 100
```

Penyakit teratas selalu **100%**, sisanya proporsional. Ini adalah **max-normalization** — hanya mengubah skala tampilan, tidak mengubah rumus atau ranking.

### Alternatif: Sum-Normalization (Posterior Aktual)

```
P(penyakit_i | gejala) = nilai_akhir_i / Σ nilai_akhir_j
```

Semua penyakit berjumlah 100%. Lebih akurat secara statistik, tapi untuk aplikasi diagnosa max-normalization lebih intuitif karena langsung menunjukkan seberapa yakin sistem relatif terhadap penyakit lain.

---

## Contoh Alur

1. User memilih gejala: `[G1, G2, G3]`
2. Untuk setiap penyakit, hitung likelihood setiap gejala:
   - Jika gejala terkait penyakit → `(pembulatan + 1) / (m + 1)`
   - Jika tidak → `(pembulatan + 0) / (m + 1)`
3. Kalikan semua likelihood → kalikan prior → `nilai_akhir`
4. Urutkan menurun
5. Normalisasi tampilan ke 0-100%
6. Penyakit dengan nilai tertinggi = hasil diagnosa

---

## Catatan

- Pasien tidak perlu login sebagai user Supabase Auth — sesi pasien menggunakan `sessionStorage`
- Admin login menggunakan `sessionStorage.setItem("admin_logged_in", "true")`
- Perhitungan Naive Bayes dilakukan client-side di `src/lib/naive-bayes.ts` agar tidak perlu server action
- Akurasi tergantung pada kualitas data relasi `gejala` (penyakit ↔ gejala)
