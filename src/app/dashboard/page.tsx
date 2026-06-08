import { createServerSupabase } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/layout/app-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Activity, Stethoscope, ClipboardCheck } from "lucide-react";
import { ChartArea } from "./chart-area";
import { RecentDiagnoses } from "./recent-diagnoses";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const [
    { count: pasienCount },
    { count: penyakitCount },
    { count: gejalaCount },
    { data: semuaHasil },
    { data: hasilTerbaru },
    { data: penyakit },
  ] = await Promise.all([
    supabase.from("pasien").select("*", { count: "exact", head: true }),
    supabase.from("penyakit").select("*", { count: "exact", head: true }),
    supabase.from("gejala").select("*", { count: "exact", head: true }),
    supabase
      .from("hasil")
      .select("id_penyakit"),
    supabase
      .from("hasil")
      .select("*, penyakit:penyakit(nama_penyakit)")
      .order("id_hasil", { ascending: false })
      .limit(10),
    supabase.from("penyakit").select("id_penyakit, nama_penyakit"),
  ]);

  const countMap = semuaHasil?.reduce((acc, h) => {
    acc[h.id_penyakit] = (acc[h.id_penyakit] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>) ?? {};

  const chartData =
    penyakit?.map((p) => ({
      name: p.nama_penyakit,
      total: countMap[p.id_penyakit] ?? 0,
    })) ?? [];

  const recentData =
    hasilTerbaru?.map((h) => ({
      id: h.id_hasil,
      nama: h.namapasien,
      jk: h.jeniskelamin,
      penyakit: h.penyakit?.nama_penyakit ?? h.hasildiagnosa,
      created_at: h.created_at,
    })) ?? [];

  const stats: { title: string; value: number; desc: string }[] = [
    { title: "Total Pasien", value: pasienCount ?? 0, desc: "Pasien terdaftar" },
    { title: "Total Penyakit", value: penyakitCount ?? 0, desc: "Jenis penyakit" },
    { title: "Total Gejala", value: gejalaCount ?? 0, desc: "Gejala klinis" },
    { title: "Total Hasil", value: semuaHasil?.length ?? 0, desc: "Diagnosa tersimpan" },
  ];
  const statIcons = [Users, Activity, Stethoscope, ClipboardCheck];

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl text-center md:text-left lg:text-4xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Selamat datang di panel admin Sistem Pakar Gizi Buruk
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </CardContent>
            </Card>;
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartArea data={chartData} />
          <RecentDiagnoses data={recentData} />
        </div>
      </div>
    </AdminLayout>
  );
}
