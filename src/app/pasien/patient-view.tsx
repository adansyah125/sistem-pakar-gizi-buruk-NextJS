"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Shield, Phone, Mail, MapPin, HeartPulse, Ruler, Scale, Loader2, Save } from "lucide-react";
import { updateProfile } from "./actions";

interface PasienData {
  id_pasien: number;
  nama_pasien: string;
  usernameuser: string;
  jk: string;
  usia: string;
  password_user: string;
  telepon: string | null;
  email: string | null;
  alamat: string | null;
  golongan_darah: string | null;
  tinggi_badan: string | null;
  berat_badan: string | null;
  alergi: string | null;
  no_asuransi: string | null;
}

export function PatientViewPasien() {
  const router = useRouter();
  const [data, setData] = useState<PasienData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("pasien_id");
    if (!id) return;

    const supabase = createClient();
    supabase
      .from("pasien")
      .select("*")
      .eq("id_pasien", Number(id))
      .single()
      .then(({ data }) => {
        if (data) setData(data as PasienData);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const form = new FormData(e.target as HTMLFormElement);
      await updateProfile(data.id_pasien, form);
      toast.success("Profil berhasil disimpan");

      const supabase = createClient();
      const { data: refreshed } = await supabase
        .from("pasien")
        .select("*")
        .eq("id_pasien", data.id_pasien)
        .single();
      if (refreshed) setData(refreshed as PasienData);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: keyof PasienData, value: string) => {
    setData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        Memuat data pasien...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Data Saya
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Lengkapi data diri dan rekam medis Anda
            </p>
          </div>
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1 h-fit">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-3">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl font-bold line-clamp-1">
                {data.nama_pasien}
              </CardTitle>
              <CardDescription className="text-sm">
                @{data.usernameuser}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_pasien">Nama Lengkap</Label>
                <Input
                  id="nama_pasien"
                  name="nama_pasien"
                  value={data.nama_pasien}
                  onChange={(e) => set("nama_pasien", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usernameuser">Username</Label>
                <Input
                  id="usernameuser"
                  name="usernameuser"
                  value={data.usernameuser}
                  onChange={(e) => set("usernameuser", e.target.value)}
                  required
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="password_user">Password</Label>
                <Input
                  id="password_user"
                  name="password_user"
                  type="password"
                  placeholder="Kosongkan jika tidak diubah"
                />
              </div> */}
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Data Diri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jk">Jenis Kelamin</Label>
                    <Select
                      value={data.jk}
                      onValueChange={(v) => v && set("jk", v)}
                    >
                      <SelectTrigger id="jk">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="jk" value={data.jk} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usia">Usia</Label>
                    <Input
                      id="usia"
                      name="usia"
                      value={data.usia}
                      onChange={(e) => set("usia", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telepon">
                      <Phone className="h-3.5 w-3.5 inline mr-1" />
                      Telepon
                    </Label>
                    <Input
                      id="telepon"
                      name="telepon"
                      value={data.telepon ?? ""}
                      onChange={(e) => set("telepon", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-3.5 w-3.5 inline mr-1" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={data.email ?? ""}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="alamat">
                      <MapPin className="h-3.5 w-3.5 inline mr-1" />
                      Alamat
                    </Label>
                    <Textarea
                      id="alamat"
                      name="alamat"
                      value={data.alamat ?? ""}
                      onChange={(e) => set("alamat", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartPulse className="h-5 w-5" />
                  Kondisi Fisik & Medis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="golongan_darah">Gol. Darah</Label>
                    <Select
                      value={data.golongan_darah ?? ""}
                      onValueChange={(v) => set("golongan_darah", v ?? "")}
                    >
                      <SelectTrigger id="golongan_darah">
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="AB">AB</SelectItem>
                        <SelectItem value="O">O</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="golongan_darah" value={data.golongan_darah ?? ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tinggi_badan">
                      <Ruler className="h-3.5 w-3.5 inline mr-1" />
                      Tinggi Badan (cm)
                    </Label>
                    <Input
                      id="tinggi_badan"
                      name="tinggi_badan"
                      value={data.tinggi_badan ?? ""}
                      onChange={(e) => set("tinggi_badan", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="berat_badan">
                      <Scale className="h-3.5 w-3.5 inline mr-1" />
                      Berat Badan (kg)
                    </Label>
                    <Input
                      id="berat_badan"
                      name="berat_badan"
                      value={data.berat_badan ?? ""}
                      onChange={(e) => set("berat_badan", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Jaminan Kesehatan & Lainnya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="no_asuransi">Nomor Jaminan / JKN</Label>
                    <Input
                      id="no_asuransi"
                      name="no_asuransi"
                      value={data.no_asuransi ?? ""}
                      onChange={(e) => set("no_asuransi", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alergi">Alergi (jika ada)</Label>
                    <Input
                      id="alergi"
                      name="alergi"
                      value={data.alergi ?? ""}
                      onChange={(e) => set("alergi", e.target.value)}
                      placeholder="Contoh: seafood, penisilin"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
