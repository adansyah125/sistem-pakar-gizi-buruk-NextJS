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
import { Plus, Pencil, Trash2, User, Search } from "lucide-react";
import { toast } from "sonner";
import type { Pasien } from "@/lib/types";

interface PasienClientProps {
  pasien: Pasien[];
}

export function PasienClient({ pasien }: PasienClientProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPasien = pasien.filter(
    (p) =>
      p.nama_pasien.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.usernameuser.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [form, setForm] = useState({
    nama_pasien: "",
    usernameuser: "",
    jk: "",
    usia: "",
    password_user: "",
  });

  const resetForm = () => {
    setForm({
      nama_pasien: "",
      usernameuser: "",
      jk: "",
      usia: "",
      password_user: "",
    });
    setEditId(null);
  };

  const handleEdit = (p: Pasien) => {
    setForm({
      nama_pasien: p.nama_pasien,
      usernameuser: p.usernameuser,
      jk: p.jk,
      usia: p.usia,
      password_user: "",
    });
    setEditId(p.id_pasien);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    try {
      if (editId) {
        const updateData: Record<string, string> = {
          nama_pasien: form.nama_pasien,
          usernameuser: form.usernameuser,
          jk: form.jk,
          usia: form.usia,
        };
        if (form.password_user) updateData.password_user = form.password_user;

        const { error } = await supabase
          .from("pasien")
          .update(updateData)
          .eq("id_pasien", editId);
        if (error) throw error;
        toast.success("Pasien berhasil diupdate");
      } else {
        const { error } = await supabase.from("pasien").insert({
          id_admin: 1,
          nama_pasien: form.nama_pasien,
          usernameuser: form.usernameuser,
          jk: form.jk,
          usia: form.usia,
          password_user: form.password_user,
        });
        if (error) throw error;
        toast.success("Pasien berhasil ditambahkan");
      }

      setOpen(false);
      resetForm();
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan data pasien");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase.from("pasien").delete().eq("id_pasien", id);
    if (error) {
      toast.error("Gagal menghapus pasien");
      return;
    }
    toast.success("Pasien berhasil dihapus");
    setDeleteId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-center md:text-left lg:text-4xl font-bold tracking-tight">Data Pasien</h1>
          <p className="text-sm sm:text-base text-center md:text-left text-muted-foreground">
            Kelola data pasien yang terdaftar
          </p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger render={<Button size="lg" className="w-full sm:w-auto" />}>
            <Plus className="mr-2 h-5 w-5" />
            Tambah Pasien
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Pasien" : "Tambah Pasien"}
              </DialogTitle>
              <DialogDescription>
                {editId
                  ? "Ubah data pasien yang sudah terdaftar"
                  : "Tambahkan pasien baru ke dalam sistem"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_pasien">Nama Pasien</Label>
                <Input
                  id="nama_pasien"
                  value={form.nama_pasien}
                  onChange={(e) =>
                    setForm({ ...form, nama_pasien: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jk">Jenis Kelamin</Label>
                <Select
                  value={form.jk}
                  onValueChange={(v) => v && setForm({ ...form, jk: v })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="usia">Usia</Label>
                <Input
                  id="usia"
                  value={form.usia}
                  onChange={(e) =>
                    setForm({ ...form, usia: e.target.value })
                  }
                  placeholder="Contoh: 5 Tahun"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usernameuser">Username</Label>
                <Input
                  id="usernameuser"
                  value={form.usernameuser}
                  onChange={(e) =>
                    setForm({ ...form, usernameuser: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_user">
                  Password {editId && "(kosongkan jika tidak diubah)"}
                </Label>
                <Input
                  id="password_user"
                  type="password"
                  value={form.password_user}
                  onChange={(e) =>
                    setForm({ ...form, password_user: e.target.value })
                  }
                  required={!editId}
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
          placeholder="Cari pasien..."
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
                <TableHead>Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>JK</TableHead>
                <TableHead>Usia</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPasien.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <User className="h-8 w-8 opacity-40" />
                      <p className="text-sm">
                        {searchQuery ? "Tidak ditemukan" : "Belum ada data pasien"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPasien.map((p, i) => (
                  <TableRow key={p.id_pasien}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {p.nama_pasien}
                      </div>
                    </TableCell>
                    <TableCell>{p.usernameuser}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.jk}</Badge>
                    </TableCell>
                    <TableCell>{p.usia}</TableCell>
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
                          onClick={() => setDeleteId(p.id_pasien)}
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
            <DialogTitle>Hapus Pasien</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pasien ini? Tindakan ini tidak
              dapat dibatalkan.
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
