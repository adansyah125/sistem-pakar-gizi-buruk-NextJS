import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwarePasien } from "./role-aware";

export const metadata: Metadata = {
  title: "Data Pasien",
  description: "Kelola data pasien sistem pakar gizi buruk.",
  robots: { index: false, follow: false },
};

export default async function PasienPage() {
  const supabase = await createServerSupabase();
  const { data: pasien } = await supabase
    .from("pasien")
    .select("*")
    .order("id_pasien", { ascending: true });

  return <RoleAwarePasien pasien={pasien ?? []} />;
}
