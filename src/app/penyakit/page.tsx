import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwarePenyakit } from "./role-aware";

export default async function PenyakitPage() {
  const supabase = await createServerSupabase();
  const { data: penyakit } = await supabase
    .from("penyakit")
    .select("*")
    .order("id_penyakit", { ascending: true });

  return <RoleAwarePenyakit penyakit={penyakit ?? []} />;
}
