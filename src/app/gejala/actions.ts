"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getGejala() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("gejala")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .order("id_gejala", { ascending: true });
  return data ?? [];
}

export async function getGejalaById(id: number) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("gejala")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .eq("id_gejala", id)
    .single();
  return data;
}

export async function createGejala(formData: FormData) {
  const supabase = await createServerSupabase();
  const data = {
    id_admin: 1,
    id_penyakit: Number(formData.get("id_penyakit")),
    nama_gejala: formData.get("nama_gejala") as string,
  };

  const { error } = await supabase.from("gejala").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/gejala");
}

export async function updateGejala(id: number, formData: FormData) {
  const supabase = await createServerSupabase();
  const data = {
    id_penyakit: Number(formData.get("id_penyakit")),
    nama_gejala: formData.get("nama_gejala") as string,
  };

  const { error } = await supabase
    .from("gejala")
    .update(data)
    .eq("id_gejala", id);
  if (error) throw new Error(error.message);
  revalidatePath("/gejala");
}

export async function deleteGejala(id: number) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("gejala")
    .delete()
    .eq("id_gejala", id);
  if (error) throw new Error(error.message);
  revalidatePath("/gejala");
}
