"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getHasil() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("hasil")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .order("id_hasil", { ascending: false });
  return data ?? [];
}

export async function deleteHasil(id: number) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("hasil")
    .delete()
    .eq("id_hasil", id);
  if (error) throw new Error(error.message);
  revalidatePath("/hasil");
}
