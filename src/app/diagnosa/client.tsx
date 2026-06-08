"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { simpanHasil } from "./actions";
import { hitungCF } from "@/lib/certainty-factor";
import { HasilDiagnosa } from "./hasil-diagnosa";
import type { Gejala, Penyakit, Pasien } from "@/lib/types";

interface GejalaWithPenyakit extends Gejala {
  penyakit?: { nama_penyakit: string };
}

interface DiagnosaClientProps {
  gejala: GejalaWithPenyakit[];
  penyakit: Penyakit[];
  pasien: Pasien[];
  defaultNama?: string;
}

type DiagnosisResult = ReturnType<typeof hitungCF> & {
  namaPasien: string;
  jenisKelamin: string;
};

export function DiagnosaClient({ gejala, penyakit, pasien, defaultNama }: DiagnosaClientProps) {
  const router = useRouter();
  const [selectedGejala, setSelectedGejala] = useState<number[]>([]);
  const [namaPasien, setNamaPasien] = useState(defaultNama ?? "");
  const [jenisKelamin, setJenisKelamin] = useState(
    pasien.length === 1 && defaultNama ? (pasien[0].jk ?? "") : ""
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const gejalaByPenyakit = penyakit.map((p) => ({
    penyakit: p,
    gejala: gejala.filter((g) => g.id_penyakit === p.id_penyakit),
  }));

  const toggleGejala = (id: number) => {
    setSelectedGejala((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleDiagnosa = () => {
    if (selectedGejala.length === 0) {
      toast.error("Pilih minimal satu gejala");
      return;
    }
    if (!namaPasien) {
      toast.error("Pilih atau masukkan nama pasien");
      return;
    }

    setLoading(true);
    try {
      const result = hitungCF(
        selectedGejala,
        penyakit,
        gejala
      );
      setResult(Object.assign(result, { namaPasien, jenisKelamin }) as DiagnosisResult);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal melakukan diagnosa"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSimpan = async () => {
    if (!result) return;
    try {
      await simpanHasil(
        result.topResult.id_penyakit,
        result.namaPasien,
        result.jenisKelamin,
        result.topResult.penyakit.nama_penyakit
      );
      toast.success("Hasil diagnosa berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan hasil");
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedGejala([]);
  };

  if (result) {
    return (
      <HasilDiagnosa
        result={result}
        onSimpan={handleSimpan}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {gejalaByPenyakit.map(({ penyakit: p, gejala: gList }) => (
          <Card key={p.id_penyakit}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Stethoscope className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl">{p.nama_penyakit}</CardTitle>
                  <CardDescription>{p.solusi}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {gList.map((g) => (
                  <label
                    key={g.id_gejala}
                    className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      checked={selectedGejala.includes(g.id_gejala)}
                      onCheckedChange={() => toggleGejala(g.id_gejala)}
                      className="mt-0.5"
                    />
                    <div className="text-sm sm:text-base">{g.nama_gejala}</div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Data Pasien</CardTitle>
            <CardDescription>Masukkan data pasien</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Pasien</Label>
              <Select value={namaPasien} onValueChange={(v) => v && setNamaPasien(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pasien" />
                </SelectTrigger>
                <SelectContent>
                  {pasien.map((p) => (
                    <SelectItem key={p.id_pasien} value={p.nama_pasien}>
                      {p.nama_pasien}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Jenis Kelamin</Label>
              <Select value={jenisKelamin} onValueChange={(v) => v && setJenisKelamin(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih JK" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Gejala Terpilih
              </Label>
              {selectedGejala.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Belum ada gejala dipilih
                </p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {selectedGejala.map((id) => {
                    const g = gejala.find((g) => g.id_gejala === id);
                    return g ? (
                      <Badge key={id} variant="secondary" className="text-xs">
                        {g.nama_gejala}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            <Button
              className="w-full text-base"
              size="lg"
              onClick={handleDiagnosa}
              disabled={loading || selectedGejala.length === 0 || !namaPasien}
            >
              {loading ? "Memproses..." : "Diagnosa"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
