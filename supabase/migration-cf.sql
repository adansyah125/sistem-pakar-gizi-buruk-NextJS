-- Migration: Tambah kolom CF ke tabel gejala
ALTER TABLE gejala ADD COLUMN IF NOT EXISTS cf DOUBLE PRECISION DEFAULT 0;

-- Update nilai CF berdasarkan pengetahuan pakar
UPDATE gejala SET cf = 0.9 WHERE nama_gejala = 'bengkak seluruh tubuh' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.8 WHERE nama_gejala = 'bengkak pada kedua punggung kaki' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.7 WHERE nama_gejala = 'bila ditekan tidak sakit' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'perubahan rambut' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'rambut tipis' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut kusam' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'mudah dicabut' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'perubahan kulit' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'kulit kering' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'terdapat bercak merah muda' AND id_penyakit = 1;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'otot menyusut' AND id_penyakit = 1;

UPDATE gejala SET cf = 0.7 WHERE nama_gejala = 'bengkak seluruh tubuh' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.9 WHERE nama_gejala = 'badan sangat kurus' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.8 WHERE nama_gejala = 'wajah seperti orang tua' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'kadang-kadang nafsu makan baik' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'perubahan mental' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'cengeng dan rewel' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'bibir kering dan pecah-pecah' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'perubahan rambut' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut tipis' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut kusam' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut kering' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'perubahan kulit' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'kulit kering' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'terdapat bercak merah muda' AND id_penyakit = 2;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'dinding perut tipis' AND id_penyakit = 2;

UPDATE gejala SET cf = 0.9 WHERE nama_gejala = 'badan sangat kurus' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.8 WHERE nama_gejala = 'wajah seperti orang tua' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.5 WHERE nama_gejala = 'cengeng dan rewel' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'perubahan rambut' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut tipis' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'rambut kusam' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'rambut mudah dicabut' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'perubahan kulit' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.3 WHERE nama_gejala = 'kulit kering' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.4 WHERE nama_gejala = 'terdapat bercak merah muda' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.7 WHERE nama_gejala = 'otot menyusut' AND id_penyakit = 3;
UPDATE gejala SET cf = 0.6 WHERE nama_gejala = 'dinding perut tipis' AND id_penyakit = 3;
