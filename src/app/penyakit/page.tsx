import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwarePenyakit } from "./role-aware";

export const metadata: Metadata = {
  title: "Penyakit",
  description:
    "Informasi lengkap tentang jenis gizi buruk: Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor beserta gejala dan penanganannya.",
};

export default async function PenyakitPage() {
  const supabase = await createServerSupabase();
  const { data: penyakit } = await supabase
    .from("penyakit")
    .select("*")
    .order("id_penyakit", { ascending: true });

  return <RoleAwarePenyakit penyakit={penyakit ?? []} />;
}
