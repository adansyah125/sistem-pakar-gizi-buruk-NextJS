"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Save,
  Award,
  Stethoscope,
  FlaskConical,
  User,
} from "lucide-react";
import { hitungCF } from "@/lib/certainty-factor";

type DiagnosisResult = ReturnType<typeof hitungCF> & {
  namaPasien: string;
  jenisKelamin: string;
};

interface HasilDiagnosaProps {
  result: DiagnosisResult;
  onSimpan: () => void;
  onReset: () => void;
}

export function HasilDiagnosa({
  result,
  onSimpan,
  onReset,
}: HasilDiagnosaProps) {
  const { topResult, hasilAkhir, selectedGejala, namaPasien, jenisKelamin } =
    result;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Hasil Diagnosa
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Berikut adalah hasil diagnosa berdasarkan gejala yang dipilih
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" onClick={onReset}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali
          </Button>
          <Button size="lg" onClick={onSimpan}>
            <Save className="mr-2 h-5 w-5" />
            Simpan Hasil
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">
                    {topResult.penyakit.nama_penyakit}
                  </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Tingkat Keyakinan: {(topResult.cf_akhir * 100).toFixed(2)}%
                    </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-muted-foreground mb-1">
                    Solusi / Penanganan
                  </h4>
                  <p className="text-base sm:text-lg">{topResult.penyakit.solusi}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Gejala yang Dipilih
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGejala.map((g) => (
                      <Badge key={g.id_gejala} variant="secondary">
                        <Stethoscope className="mr-1 h-3 w-3" />
                        {g.nama_gejala}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <FlaskConical className="h-5 w-5 sm:h-6 sm:w-6" />
                Detail Perhitungan Certainty Factor
              </CardTitle>
              <CardDescription>
                Nilai CF dikombinasikan secara sequential untuk setiap penyakit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penyakit</TableHead>
                    <TableHead>CF Akhir</TableHead>
                    <TableHead>Keyakinan</TableHead>
                    <TableHead>Ranking</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasilAkhir.map((h, i) => (
                    <TableRow
                      key={h.id_penyakit}
                      className={
                        i === 0 ? "bg-primary/5 font-medium" : undefined
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {h.penyakit.nama_penyakit}
                          {i === 0 && (
                            <Badge
                              variant="default"
                              className="text-[10px] px-1.5 py-0"
                            >
                              TERPILIH
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {h.cf_akhir.toFixed(4)}
                      </TableCell>
                      <TableCell>
                        {(h.cf_akhir * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full max-w-24 rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{
                                width: `${h.cf_akhir * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            #{i + 1}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Data Pasien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{namaPasien}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{jenisKelamin}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Keterangan</CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground space-y-2">
              <p>
                Hasil diagnosa ini dihitung menggunakan metode Certainty Factor
                berdasarkan bobot keyakinan pakar pada setiap gejala.
              </p>
              <p>
                Penyakit dengan nilai CF tertinggi adalah hasil diagnosa
                yang paling mungkin.
              </p>
              <p className="text-xs">
                *Harap konsultasikan hasil ini dengan tenaga medis
                profesional.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
