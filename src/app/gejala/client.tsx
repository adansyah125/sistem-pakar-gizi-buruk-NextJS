"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Stethoscope, Search } from "lucide-react";
import { toast } from "sonner";
import type { Gejala } from "@/lib/types";

interface GejalaWithPenyakit extends Gejala {
  penyakit?: { nama_penyakit: string };
}

interface GejalaClientProps {
  gejala: GejalaWithPenyakit[];
}

export function GejalaClient({ gejala }: GejalaClientProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGejala = gejala.filter(
    (g) =>
      g.nama_gejala.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.penyakit?.nama_penyakit ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const [form, setForm] = useState({
    nama_gejala: "",
    id_penyakit: "",
    cf: "0.5",
  });

  const resetForm = () => {
    setForm({ nama_gejala: "", id_penyakit: "", cf: "0.5" });
    setEditId(null);
  };

  const handleEdit = (g: GejalaWithPenyakit) => {
    setForm({
      nama_gejala: g.nama_gejala,
      id_penyakit: String(g.id_penyakit),
      cf: String(g.cf ?? 0),
    });
    setEditId(g.id_gejala);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    try {
      if (editId) {
        const { error } = await supabase
          .from("gejala")
          .update({
            nama_gejala: form.nama_gejala,
            id_penyakit: Number(form.id_penyakit),
            cf: Number(form.cf) || 0,
          })
          .eq("id_gejala", editId);
        if (error) throw error;
        toast.success("Gejala berhasil diupdate");
      } else {
        const { error } = await supabase.from("gejala").insert({
          id_admin: 1,
          nama_gejala: form.nama_gejala,
          id_penyakit: Number(form.id_penyakit),
          cf: Number(form.cf) || 0,
        });
        if (error) throw error;
        toast.success("Gejala berhasil ditambahkan");
      }

      setOpen(false);
      resetForm();
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan data gejala");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("gejala")
      .delete()
      .eq("id_gejala", id);
    if (error) {
      toast.error("Gagal menghapus gejala");
      return;
    }
    toast.success("Gejala berhasil dihapus");
    setDeleteId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-center md:text-left lg:text-4xl font-bold tracking-tight">Data Gejala</h1>
          <p className="text-sm sm:text-base text-center md:text-left text-muted-foreground">
            Kelola data gejala klinis gizi buruk
          </p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger render={<Button size="lg" className="w-full sm:w-auto" />}>
            <Plus className="mr-2 h-5 w-5" />
            Tambah Gejala
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Gejala" : "Tambah Gejala"}
              </DialogTitle>
              <DialogDescription>
                {editId
                  ? "Ubah data gejala"
                  : "Tambahkan gejala baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id_penyakit">Penyakit</Label>
                <Select
                  value={form.id_penyakit}
                  onValueChange={(v) => v && setForm({ ...form, id_penyakit: v })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih penyakit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      new Map(
                        gejala.map((g) => [
                          g.id_penyakit,
                          { id: g.id_penyakit, name: g.penyakit?.nama_penyakit ?? "" },
                        ])
                      ).values()
                    ).map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_gejala">Nama Gejala</Label>
                <Input
                  id="nama_gejala"
                  value={form.nama_gejala}
                  onChange={(e) =>
                    setForm({ ...form, nama_gejala: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cf">Nilai CF (0 – 1)</Label>
                <Input
                  id="cf"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={form.cf}
                  onChange={(e) =>
                    setForm({ ...form, cf: e.target.value })
                  }
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari gejala..."
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
                <TableHead>Gejala</TableHead>
                <TableHead>Penyakit</TableHead>
                <TableHead>Nilai CF</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGejala.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Stethoscope className="h-8 w-8 opacity-40" />
                      <p className="text-sm">
                        {searchQuery ? "Tidak ditemukan" : "Belum ada data gejala"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredGejala.map((g, i) => (
                  <TableRow key={g.id_gejala}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        {g.nama_gejala}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {g.penyakit?.nama_penyakit ?? "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-center">
                      {g.cf?.toFixed(1) ?? "0.0"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(g)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(g.id_gejala)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteId !== null} onOpenChange={(v) => { if (!v) setDeleteId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Gejala</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus gejala ini?
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
