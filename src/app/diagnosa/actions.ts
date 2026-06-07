"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function simpanHasil(
  id_penyakit: number,
  namapasien: string,
  jeniskelamin: string,
  hasildiagnosa: string
) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("hasil").insert({
    id_penyakit,
    namapasien,
    jeniskelamin,
    hasildiagnosa,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/hasil");
  revalidatePath("/hasil-pasien");
}
