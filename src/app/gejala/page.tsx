import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwareGejala } from "./role-aware";

export const metadata: Metadata = {
  title: "Gejala",
  description:
    "Daftar gejala klinis gizi buruk pada anak untuk membantu proses diagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor.",
};

export default async function GejalaPage() {
  const supabase = await createServerSupabase();
  const { data: gejala } = await supabase
    .from("gejala")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .order("id_penyakit");

  return <RoleAwareGejala gejala={gejala ?? []} />;
}
