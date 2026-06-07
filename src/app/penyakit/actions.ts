"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPenyakit() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("penyakit")
    .select("*")
    .order("id_penyakit", { ascending: true });
  return data ?? [];
}

export async function getPenyakitById(id: number) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("penyakit")
    .select("*")
    .eq("id_penyakit", id)
    .single();
  return data;
}

export async function createPenyakit(formData: FormData) {
  const supabase = await createServerSupabase();
  const data = {
    id_pasien: Number(formData.get("id_pasien")),
    nama_penyakit: formData.get("nama_penyakit") as string,
    solusi: formData.get("solusi") as string,
  };

  const { error } = await supabase.from("penyakit").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/penyakit");
}

export async function updatePenyakit(id: number, formData: FormData) {
  const supabase = await createServerSupabase();
  const data = {
    nama_penyakit: formData.get("nama_penyakit") as string,
    solusi: formData.get("solusi") as string,
  };

  const { error } = await supabase
    .from("penyakit")
    .update(data)
    .eq("id_penyakit", id);
  if (error) throw new Error(error.message);
  revalidatePath("/penyakit");
}

export async function deletePenyakit(id: number) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("penyakit")
    .delete()
    .eq("id_penyakit", id);
  if (error) throw new Error(error.message);
  revalidatePath("/penyakit");
}
