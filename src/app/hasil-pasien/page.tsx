"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PatientLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, ClipboardCheck, User, Loader2 } from "lucide-react";
import Link from "next/link";

interface HasilItem {
  id_hasil: number;
  id_penyakit: number;
  namapasien: string;
  jeniskelamin: string;
  hasildiagnosa: string;
  created_at: string | null;
  penyakit?: { nama_penyakit: string };
}

function formatDate(iso: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HasilPasienPage() {
  const [hasil, setHasil] = useState<HasilItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pasienNama = sessionStorage.getItem("pasien_nama");
    if (!pasienNama) {
      window.location.href = "/login-pasien";
      return;
    }

    const supabase = createClient();
    supabase
      .from("hasil")
      .select("*, penyakit:penyakit(nama_penyakit)")
      .eq("namapasien", pasienNama)
      .order("id_hasil", { ascending: false })
      .then(({ data }) => {
        setHasil(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Hasil Diagnosa Saya
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Riwayat hasil diagnosa gizi buruk
            </p>
          </div>
          <Link href="/hasil-pasien/cetak">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Printer className="mr-2 h-5 w-5" />
              Cetak
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>JK</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Hasil Diagnosa</TableHead>
                  <TableHead>Penyakit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p className="text-sm">Memuat data...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : hasil.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ClipboardCheck className="h-8 w-8 opacity-40" />
                        <p className="text-sm">Belum ada hasil diagnosa</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  hasil.map((h, i) => (
                    <TableRow key={h.id_hasil}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {h.namapasien}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{h.jeniskelamin}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(h.created_at)}
                      </TableCell>
                      <TableCell>{h.hasildiagnosa}</TableCell>
                      <TableCell>
                        <Badge>
                          {h.penyakit?.nama_penyakit ?? h.hasildiagnosa}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  );
}
