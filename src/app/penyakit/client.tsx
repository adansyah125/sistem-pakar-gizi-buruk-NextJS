"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, Activity, Search } from "lucide-react";
import { toast } from "sonner";
import type { Penyakit } from "@/lib/types";

interface PenyakitClientProps {
  penyakit: Penyakit[];
}

export function PenyakitClient({ penyakit }: PenyakitClientProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPenyakit = penyakit.filter(
    (p) =>
      p.nama_penyakit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solusi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [form, setForm] = useState({
    nama_penyakit: "",
    solusi: "",
  });

  const resetForm = () => {
    setForm({ nama_penyakit: "", solusi: "" });
    setEditId(null);
  };

  const handleEdit = (p: Penyakit) => {
    setForm({ nama_penyakit: p.nama_penyakit, solusi: p.solusi });
    setEditId(p.id_penyakit);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    try {
      if (editId) {
        const { error } = await supabase
          .from("penyakit")
          .update(form)
          .eq("id_penyakit", editId);
        if (error) throw error;
        toast.success("Penyakit berhasil diupdate");
      } else {
        const { error } = await supabase.from("penyakit").insert({
          id_pasien: 1,
          ...form,
        });
        if (error) throw error;
        toast.success("Penyakit berhasil ditambahkan");
      }

      setOpen(false);
      resetForm();
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan data penyakit");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("penyakit")
      .delete()
      .eq("id_penyakit", id);
    if (error) {
      toast.error("Gagal menghapus penyakit");
      return;
    }
    toast.success("Penyakit berhasil dihapus");
    setDeleteId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Data Penyakit</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Kelola data penyakit gizi buruk
          </p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger>
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="mr-2 h-5 w-5" />
              Tambah Penyakit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Penyakit" : "Tambah Penyakit"}
              </DialogTitle>
              <DialogDescription>
                {editId
                  ? "Ubah data penyakit"
                  : "Tambahkan penyakit baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_penyakit">Nama Penyakit</Label>
                <Input
                  id="nama_penyakit"
                  value={form.nama_penyakit}
                  onChange={(e) =>
                    setForm({ ...form, nama_penyakit: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solusi">Solusi</Label>
                <Textarea
                  id="solusi"
                  value={form.solusi}
                  onChange={(e) =>
                    setForm({ ...form, solusi: e.target.value })
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
          placeholder="Cari penyakit..."
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
                <TableHead>Nama Penyakit</TableHead>
                <TableHead>Solusi</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPenyakit.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Activity className="h-8 w-8 opacity-40" />
                      <p className="text-sm">
                        {searchQuery ? "Tidak ditemukan" : "Belum ada data penyakit"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPenyakit.map((p, i) => (
                  <TableRow key={p.id_penyakit}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        {p.nama_penyakit}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {p.solusi}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(p.id_penyakit)}
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
            <DialogTitle>Hapus Penyakit</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus penyakit ini?
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
