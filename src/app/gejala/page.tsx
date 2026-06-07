import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwareGejala } from "./role-aware";

export default async function GejalaPage() {
  const supabase = await createServerSupabase();
  const { data: gejala } = await supabase
    .from("gejala")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .order("id_penyakit");

  return <RoleAwareGejala gejala={gejala ?? []} />;
}
