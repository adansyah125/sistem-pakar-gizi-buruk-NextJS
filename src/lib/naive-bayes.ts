interface PenyakitData {
  id_penyakit: number;
  nama_penyakit: string;
  solusi: string;
}

interface GejalaData {
  id_gejala: number;
  id_penyakit: number;
  nama_gejala: string;
}

interface HasilAkhir {
  id_penyakit: number;
  nilai_akhir: number;
  penyakit: PenyakitData;
}

export function hitungNaiveBayes(
  idsGejala: number[],
  penyakit: PenyakitData[],
  gejala: GejalaData[]
) {
  const totalPenyakit = penyakit.length;
  const prior = 1 / totalPenyakit;
  const m = gejala.length;
  const pembulatan = Math.max(Math.round(m * prior), 1);
  const penyebut = m + 1;

  const gejalaPenyakit = new Map<number, Set<number>>();
  for (const g of gejala) {
    if (!gejalaPenyakit.has(g.id_penyakit)) {
      gejalaPenyakit.set(g.id_penyakit, new Set());
    }
    gejalaPenyakit.get(g.id_penyakit)!.add(g.id_gejala);
  }

  const hasilNilai: { id_penyakit: number; nilai: number }[] = [];

  for (const penyakitItem of penyakit) {
    const gejalaSet = gejalaPenyakit.get(penyakitItem.id_penyakit) ?? new Set();
    for (const idGejala of idsGejala) {
      const nilaigejala = gejalaSet.has(idGejala) ? 1 : 0;
      hasilNilai.push({
        id_penyakit: penyakitItem.id_penyakit,
        nilai: (pembulatan + nilaigejala) / penyebut,
      });
    }
  }

  const penyakitMap = new Map(penyakit.map((p) => [p.id_penyakit, p]));
  const hasilAkhir: HasilAkhir[] = [];

  for (const penyakitItem of penyakit) {
    const nilaiPenyakit = hasilNilai.filter(
      (n) => n.id_penyakit === penyakitItem.id_penyakit
    );

    let kali = 1;
    for (const n of nilaiPenyakit) {
      kali *= n.nilai;
    }

    hasilAkhir.push({
      id_penyakit: penyakitItem.id_penyakit,
      nilai_akhir: kali * prior,
      penyakit: penyakitMap.get(penyakitItem.id_penyakit)!,
    });
  }

  hasilAkhir.sort((a, b) => b.nilai_akhir - a.nilai_akhir);

  const selectedGejala = gejala.filter((g) => idsGejala.includes(g.id_gejala));

  return {
    hasilAkhir,
    topResult: hasilAkhir[0],
    selectedGejala,
    prior,
  };
}
