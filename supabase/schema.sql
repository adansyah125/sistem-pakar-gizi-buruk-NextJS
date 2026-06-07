-- Migrate from MySQL to PostgreSQL for Supabase
-- Original database: sistempakargiziburuk

-- Create tables matching original schema exactly

CREATE TABLE admin (
  id_admin SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE pasien (
  id_pasien SERIAL PRIMARY KEY,
  id_admin INTEGER NOT NULL REFERENCES admin(id_admin) ON DELETE CASCADE,
  nama_pasien VARCHAR(50) NOT NULL,
  usernameuser VARCHAR(50) NOT NULL,
  jk VARCHAR(10) NOT NULL,
  usia VARCHAR(10) NOT NULL,
  password_user VARCHAR(255) NOT NULL,
  telepon VARCHAR(20),
  email VARCHAR(100),
  alamat TEXT,
  golongan_darah VARCHAR(5),
  tinggi_badan VARCHAR(10),
  berat_badan VARCHAR(10),
  alergi TEXT,
  no_asuransi VARCHAR(50)
);

CREATE TABLE penyakit (
  id_penyakit SERIAL PRIMARY KEY,
  id_pasien INTEGER NOT NULL REFERENCES pasien(id_pasien) ON DELETE CASCADE,
  nama_penyakit VARCHAR(30) NOT NULL,
  solusi VARCHAR(255) NOT NULL
);

CREATE TABLE gejala (
  id_gejala SERIAL PRIMARY KEY,
  id_admin INTEGER NOT NULL REFERENCES admin(id_admin) ON DELETE CASCADE,
  id_penyakit INTEGER NOT NULL REFERENCES penyakit(id_penyakit) ON DELETE CASCADE,
  nama_gejala VARCHAR(255) NOT NULL
);

CREATE TABLE nilai (
  id_nilai SERIAL PRIMARY KEY,
  id_penyakit INTEGER NOT NULL REFERENCES penyakit(id_penyakit) ON DELETE CASCADE,
  nilai DOUBLE PRECISION NOT NULL
);

CREATE TABLE nilai_akhir (
  id_nilaiakhir SERIAL PRIMARY KEY,
  id_penyakit INTEGER NOT NULL REFERENCES penyakit(id_penyakit) ON DELETE CASCADE,
  nilai_akhir DOUBLE PRECISION NOT NULL
);

CREATE TABLE hasil (
  id_hasil SERIAL PRIMARY KEY,
  id_penyakit INTEGER NOT NULL REFERENCES penyakit(id_penyakit) ON DELETE CASCADE,
  namapasien VARCHAR(100) NOT NULL,
  jeniskelamin VARCHAR(50) NOT NULL,
  hasildiagnosa VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data matching original
INSERT INTO admin (username, password) VALUES
  ('admin', 'admin');

INSERT INTO pasien (id_admin, nama_pasien, usernameuser, jk, usia, password_user) VALUES
  (1, 'budi', 'budi', 'Laki-Laki', '5 Tahun', '123');

INSERT INTO penyakit (id_pasien, nama_penyakit, solusi) VALUES
  (1, 'Kwarshiorkor', 'Penanganan medis segera, pemberian makanan tinggi protein dan energi secara bertahap, suplementasi vitamin dan mineral, serta pengobatan infeksi penyerta'),
  (1, 'Marasmik-Kwarshiorkor', 'Perawatan intensif dengan penanganan dehidrasi, koreksi elektrolit, pemberian nutrisi tinggi protein dan energi secara bertahap, serta pengobatan komplikasi medis'),
  (1, 'Marasmus', 'Pemberian makanan bergizi tinggi energi dan protein secara bertahap, suplementasi vitamin dan mineral, serta pemantauan pertumbuhan berat badan secara rutin');

INSERT INTO gejala (id_admin, id_penyakit, nama_gejala) VALUES
  (1, 1, 'bengkak seluruh tubuh'),
  (1, 1, 'bengkak pada kedua punggung kaki'),
  (1, 1, 'bila ditekan tidak sakit'),
  (1, 1, 'perubahan rambut'),
  (1, 1, 'rambut tipis'),
  (1, 1, 'rambut kusam'),
  (1, 1, 'mudah dicabut'),
  (1, 1, 'perubahan kulit'),
  (1, 1, 'kulit kering'),
  (1, 1, 'terdapat bercak merah muda'),
  (1, 1, 'otot menyusut'),
  (1, 2, 'bengkak seluruh tubuh'),
  (1, 2, 'badan sangat kurus'),
  (1, 2, 'wajah seperti orang tua'),
  (1, 2, 'kadang-kadang nafsu makan baik'),
  (1, 2, 'perubahan mental'),
  (1, 2, 'cengeng dan rewel'),
  (1, 2, 'bibir kering dan pecah-pecah'),
  (1, 2, 'perubahan rambut'),
  (1, 2, 'rambut tipis'),
  (1, 2, 'rambut kusam'),
  (1, 2, 'rambut kering'),
  (1, 2, 'perubahan kulit'),
  (1, 2, 'kulit kering'),
  (1, 2, 'terdapat bercak merah muda'),
  (1, 2, 'dinding perut tipis'),
  (1, 3, 'badan sangat kurus'),
  (1, 3, 'wajah seperti orang tua'),
  (1, 3, 'cengeng dan rewel'),
  (1, 3, 'perubahan rambut'),
  (1, 3, 'rambut tipis'),
  (1, 3, 'rambut kusam'),
  (1, 3, 'rambut mudah dicabut'),
  (1, 3, 'perubahan kulit'),
  (1, 3, 'kulit kering'),
  (1, 3, 'terdapat bercak merah muda'),
  (1, 3, 'otot menyusut'),
  (1, 3, 'dinding perut tipis');
