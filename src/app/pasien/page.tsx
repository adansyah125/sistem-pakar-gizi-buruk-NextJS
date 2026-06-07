import { createServerSupabase } from "@/lib/supabase/server";
import { RoleAwarePasien } from "./role-aware";

export default async function PasienPage() {
  const supabase = await createServerSupabase();
  const { data: pasien } = await supabase
    .from("pasien")
    .select("*")
    .order("id_pasien", { ascending: true });

  return <RoleAwarePasien pasien={pasien ?? []} />;
}
