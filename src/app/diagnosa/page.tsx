import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwareDiagnosa } from "./role-aware";

export default async function DiagnosaPage() {
  const supabase = await createServerSupabase();

  const [gejala, penyakit, pasien] = await Promise.all([
    supabase.from("gejala").select("*, penyakit:penyakit(nama_penyakit)").order("id_gejala"),
    supabase.from("penyakit").select("*"),
    supabase.from("pasien").select("*"),
  ]);

  return (
    <RoleAwareDiagnosa
      gejala={gejala.data ?? []}
      penyakit={penyakit.data ?? []}
      pasien={pasien.data ?? []}
    />
  );
}
