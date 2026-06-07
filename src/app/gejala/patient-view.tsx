import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import type { Gejala } from "@/lib/types";

interface GejalaWithPenyakit extends Gejala {
  penyakit?: { nama_penyakit: string };
}

export function PatientViewGejala({
  gejala,
}: {
  gejala: GejalaWithPenyakit[];
}) {
  const grouped = gejala.reduce(
    (acc, g) => {
      const key = g.penyakit?.nama_penyakit ?? "Lainnya";
      if (!acc[key]) acc[key] = [];
      acc[key].push(g);
      return acc;
    },
    {} as Record<string, GejalaWithPenyakit[]>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Data Gejala</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Daftar gejala klinis gizi buruk pada anak
        </p>
      </div>

      {Object.entries(grouped).map(([penyakit, gejalaList]) => (
        <Card key={penyakit}>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{penyakit}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {gejalaList.map((g) => (
                <div
                  key={g.id_gejala}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <Stethoscope className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm sm:text-base">{g.nama_gejala}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
