export interface Admin {
  id_admin: number;
  username: string;
  password: string;
}

export interface Pasien {
  id_pasien: number;
  id_admin: number;
  nama_pasien: string;
  usernameuser: string;
  jk: string;
  usia: string;
  password_user: string;
  telepon?: string | null;
  email?: string | null;
  alamat?: string | null;
  golongan_darah?: string | null;
  tinggi_badan?: string | null;
  berat_badan?: string | null;
  alergi?: string | null;
  no_asuransi?: string | null;
}

export interface Penyakit {
  id_penyakit: number;
  id_pasien: number;
  nama_penyakit: string;
  solusi: string;
}

export interface Gejala {
  id_gejala: number;
  id_admin: number;
  id_penyakit: number;
  nama_gejala: string;
  cf: number;
}

export interface Nilai {
  id_nilai: number;
  id_penyakit: number;
  nilai: number;
}

export interface NilaiAkhir {
  id_nilaiakhir: number;
  id_penyakit: number;
  nilai_akhir: number;
}

export interface Hasil {
  id_hasil: number;
  id_penyakit: number;
  namapasien: string;
  jeniskelamin: string;
  hasildiagnosa: string;
}

export interface NilaiAkhirWithPenyakit extends NilaiAkhir {
  penyakit: Penyakit;
}

export interface GejalaWithPenyakit extends Gejala {
  penyakit: Penyakit;
}
