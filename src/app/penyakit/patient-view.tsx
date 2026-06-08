import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { Penyakit } from "@/lib/types";

export function PatientViewPenyakit({
  penyakit,
}: {
  penyakit: Penyakit[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl text-center md:text-left lg:text-4xl font-bold tracking-tight">Data Penyakit</h1>
        <p className="text-sm sm:text-base text-center md:text-left text-muted-foreground">
          Daftar penyakit gizi buruk pada anak
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {penyakit.map((p) => (
          <Card key={p.id_penyakit}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl">{p.nama_penyakit}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* <Badge variant="secondary">ID: {p.id_penyakit}</Badge> */}
                <p className="text-sm text-muted-foreground">{p.solusi}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
