"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Printer, Trash2, ClipboardCheck, User, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface HasilWithPenyakit {
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

interface HasilClientProps {
  hasil: HasilWithPenyakit[];
}

export function HasilClient({ hasil }: HasilClientProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHasil = hasil.filter(
    (h) =>
      h.namapasien.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.hasildiagnosa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.penyakit?.nama_penyakit ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("hasil")
      .delete()
      .eq("id_hasil", id);
    if (error) {
      toast.error("Gagal menghapus hasil");
      return;
    }
    toast.success("Hasil berhasil dihapus");
    setDeleteId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Hasil Diagnosa</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Riwayat hasil diagnosa gizi buruk
          </p>
        </div>
        <Link href="/hasil/cetak">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Printer className="mr-2 h-5 w-5" />
            Cetak
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari hasil diagnosa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
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
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHasil.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ClipboardCheck className="h-8 w-8 opacity-40" />
                      <p className="text-sm">
                        {searchQuery ? "Tidak ditemukan" : "Belum ada hasil diagnosa"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredHasil.map((h, i) => (
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
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(h.id_hasil)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={deleteId !== null}
        onOpenChange={(v) => {
          if (!v) setDeleteId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Hasil</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus hasil diagnosa ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId !== null && handleDelete(deleteId)}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
