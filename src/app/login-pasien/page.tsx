"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPasienPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    const { data: pasien, error } = await supabase
      .from("pasien")
      .select("*")
      .eq("usernameuser", username)
      .eq("password_user", password)
      .single();

    if (error || !pasien) {
      toast.error("Username atau password salah");
      setLoading(false);
      return;
    }

    sessionStorage.setItem("pasien_id", String(pasien.id_pasien));
    sessionStorage.setItem("pasien_nama", pasien.nama_pasien);
    sessionStorage.setItem("pasien_jk", pasien.jk);

    toast.success("Login berhasil");
    router.push("/dashboard-pasien");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Login Pasien</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Masukkan username dan password pasien
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Login"}
            </Button>
            <Button variant="link" size="sm" render={<Link href="/" />} nativeButton={false}>
              <ArrowLeft className="mr-1 h-3 w-3" />
              Kembali ke Beranda
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
