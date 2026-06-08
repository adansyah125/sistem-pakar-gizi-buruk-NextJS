# Teori Certainty Factor (CF) — Sistem Pakar Gizi

## 1. Definisi

Certainty Factor (CF) adalah metode untuk menangani ketidakpastian dalam sistem pakar. CF merepresentasikan **tingkat keyakinan pakar** terhadap suatu gejala dalam mengindikasikan penyakit.

```
CF(H, E) = nilai antara 0 sampai 1
```

| Simbol | Arti |
|--------|------|
| `H` | Hipotesis (penyakit) |
| `E` | Evidence (gejala) |
| `CF(H, E)` | Tingkat keyakinan bahwa gejala E mengindikasikan penyakit H |

Nilai 0 = tidak yakin, nilai 1 = sangat yakin/pasti.

---

## 2. Panduan Penentuan Nilai CF

| Range CF | Interpretasi |
|---|---|
| 0.8 – 1.0 | Gejala **pasti / sangat khas** untuk penyakit tersebut |
| 0.6 – 0.7 | Gejala **cukup khas / sering muncul** |
| 0.4 – 0.5 | Gejala **mungkin muncul** tapi tidak selalu |
| 0.1 – 0.3 | Gejala **kurang spesifik** (bisa di banyak penyakit) |

---

## 3. Rumus Kombinasi Sequential

Karena user bisa memilih banyak gejala, nilai CF dikombinasikan satu per satu secara berurutan:

```
CFcombine(CF1, CF2) = CF1 + CF2 × (1 - CF1)
```

Untuk gejala lebih dari dua, ulangi kombinasi secara sequential:

```
CFtotal = CF1
CFtotal = CFtotal + CF2 × (1 - CFtotal)
CFtotal = CFtotal + CF3 × (1 - CFtotal)
...
```

Karena semua CF bernilai positif (0 sampai 1), hasil kombinasi akan **mendekati 1** tetapi **tidak pernah melebihi 1**.

---

## 4. Contoh Perhitungan

### 4.1 Kwarshiorkor

| Gejala | CF |
|---|---|
| Bengkak seluruh tubuh | 0.9 |
| Perubahan rambut | 0.5 |
| Kulit kering | 0.3 |

Jika user pilih bengkak + rambut:

```
CF = 0.9 + 0.5 × (1 - 0.9)
   = 0.9 + 0.5 × 0.1
   = 0.9 + 0.05
   = 0.95 (95%)
```

Jika user pilih bengkak + rambut + kulit kering:

```
Step 1: CF₁₂ = 0.9 + 0.5 × (1 - 0.9) = 0.95
Step 2: CF₁₂₃ = 0.95 + 0.3 × (1 - 0.95) = 0.95 + 0.015 = 0.965 (96.5%)
```

### 4.2 Marasmus

| Gejala | CF |
|---|---|
| Badan sangat kurus | 0.9 |
| Wajah seperti orang tua | 0.8 |
| Otot menyusut | 0.7 |

Jika user pilih badan kurus + wajah seperti orang tua:

```
CF = 0.9 + 0.8 × (1 - 0.9)
   = 0.9 + 0.08
   = 0.98 (98%)
```

### 4.3 Perbandingan Antar Penyakit

User memilih gejala: *bengkak seluruh tubuh, perubahan rambut, badan sangat kurus, wajah seperti orang tua*

**Kwarshiorkor** (gejala cocok: bengkak + rambut):

```
CF = 0.9 + 0.5 × (1 - 0.9) = 0.95 (95%)
```

**Marasmus** (gejala cocok: badan kurus + wajah tua):

```
CF = 0.9 + 0.8 × (1 - 0.9) = 0.98 (98%)
```

**Marasmik-Kwarshiorkor** (gejala cocok: bengkak + badan kurus):

```
CF = 0.7 + 0.9 × (1 - 0.7) = 0.97 (97%)
```

**Hasil:** Marasmus (98%) → diagnosa utama.

---

## 5. Alur Sistem

```
User pilih gejala
       ↓
Ambil nilai CF dari setiap gejala yang dipilih
       ↓
Untuk setiap penyakit:
  - Filter gejala yang cocok dengan penyakit tsb
  - Jika ada ≥ 1 gejala, kombinasikan CF secara sequential
  - Jika tidak ada gejala, CF = 0
       ↓
Urutkan penyakit dari CF tertinggi ke terendah
       ↓
Penyakit dengan CF tertinggi = hasil diagnosa
```

---

## 6. Perbedaan Naive Bayes vs Certainty Factor

| Aspek | Naive Bayes (sebelumnya) | Certainty Factor (sekarang) |
|---|---|---|
| Input | Biner (0/1) — gejala dipilih/tidak | Bobot pakar (0–1) — seberapa kuat indikasi |
| Perhitungan | Perkalian probabilitas + Laplace smoothing | Kombinasi sequential CF |
| Hasil | Probabilitas sangat kecil | Nilai keyakinan 0–100% |
| Sumber nilai | Frekuensi statistik | Pengetahuan pakar |
| Nilai 0 | Dicegah dengan Laplace smoothing | Gejala tidak relevan = tidak dihitung |
