"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, User } from "lucide-react";

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

interface Diagnosis {
  id: number;
  nama: string;
  jk: string;
  penyakit: string;
  created_at: string | null;
}

interface RecentDiagnosesProps {
  data: Diagnosis[];
}

export function RecentDiagnoses({ data }: RecentDiagnosesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg">
              Riwayat Diagnosa Terbaru
            </CardTitle>
            <CardDescription className="text-sm">
              {data.length} diagnosa terakhir
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-12">No</TableHead> */}
              <TableHead>Nama Pasien</TableHead>
              <TableHead className="w-20">JK</TableHead>
              <TableHead className="w-36">Tanggal</TableHead>
              <TableHead>Hasil Diagnosa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <ClipboardCheck className="h-6 w-6 opacity-40" />
                    <p className="text-sm">Belum ada diagnosa</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  {/* <TableCell className="text-muted-foreground">{item.id}</TableCell> */}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      {item.nama}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.jk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell>
                    <Badge>{item.penyakit}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
