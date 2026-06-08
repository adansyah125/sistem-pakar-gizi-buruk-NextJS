interface PenyakitData {
  id_penyakit: number;
  nama_penyakit: string;
  solusi: string;
}

interface GejalaData {
  id_gejala: number;
  id_penyakit: number;
  nama_gejala: string;
  cf: number;
}

interface HasilCF {
  id_penyakit: number;
  cf_akhir: number;
  penyakit: PenyakitData;
}

interface CFResult {
  hasilAkhir: HasilCF[];
  topResult: HasilCF;
  selectedGejala: GejalaData[];
}

export function hitungCF(
  idsGejala: number[],
  penyakit: PenyakitData[],
  gejala: GejalaData[]
): CFResult {
  const hasil: HasilCF[] = [];

  for (const p of penyakit) {
    const cfValues = gejala
      .filter(g => idsGejala.includes(g.id_gejala) && g.id_penyakit === p.id_penyakit)
      .map(g => g.cf);

    if (cfValues.length === 0) {
      hasil.push({ id_penyakit: p.id_penyakit, cf_akhir: 0, penyakit: p });
      continue;
    }

    let cfCombine = cfValues[0];
    for (let i = 1; i < cfValues.length; i++) {
      cfCombine = cfCombine + cfValues[i] * (1 - cfCombine);
    }

    hasil.push({ id_penyakit: p.id_penyakit, cf_akhir: cfCombine, penyakit: p });
  }

  hasil.sort((a, b) => b.cf_akhir - a.cf_akhir);

  return {
    hasilAkhir: hasil,
    topResult: hasil[0],
    selectedGejala: gejala.filter(g => idsGejala.includes(g.id_gejala)),
  };
}
