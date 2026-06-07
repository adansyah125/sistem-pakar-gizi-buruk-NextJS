"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPasien() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("pasien")
    .select("*")
    .order("id_pasien", { ascending: true });
  return data ?? [];
}

export async function getPasienById(id: number) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("pasien")
    .select("*")
    .eq("id_pasien", id)
    .single();
  return data;
}

export async function createPasien(formData: FormData) {
  const supabase = await createServerSupabase();
  const data = {
    id_admin: 1,
    nama_pasien: formData.get("nama_pasien") as string,
    usernameuser: formData.get("usernameuser") as string,
    jk: formData.get("jk") as string,
    usia: formData.get("usia") as string,
    password_user: formData.get("password_user") as string,
  };

  const { error } = await supabase.from("pasien").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/pasien");
}

export async function updatePasien(id: number, formData: FormData) {
  const supabase = await createServerSupabase();
  const data: Record<string, string> = {
    nama_pasien: formData.get("nama_pasien") as string,
    usernameuser: formData.get("usernameuser") as string,
    jk: formData.get("jk") as string,
    usia: formData.get("usia") as string,
  };

  const password = formData.get("password_user") as string;
  if (password) data.password_user = password;

  const { error } = await supabase
    .from("pasien")
    .update(data)
    .eq("id_pasien", id);
  if (error) throw new Error(error.message);
  revalidatePath("/pasien");
}

export async function updateProfile(id: number, formData: FormData) {
  const supabase = await createServerSupabase();
  const data: Record<string, string | null> = {
    nama_pasien: formData.get("nama_pasien") as string,
    usernameuser: formData.get("usernameuser") as string,
    jk: formData.get("jk") as string,
    usia: formData.get("usia") as string,
    telepon: (formData.get("telepon") as string) || null,
    email: (formData.get("email") as string) || null,
    alamat: (formData.get("alamat") as string) || null,
    golongan_darah: (formData.get("golongan_darah") as string) || null,
    tinggi_badan: (formData.get("tinggi_badan") as string) || null,
    berat_badan: (formData.get("berat_badan") as string) || null,
    alergi: (formData.get("alergi") as string) || null,
    no_asuransi: (formData.get("no_asuransi") as string) || null,
  };

  const password = formData.get("password_user") as string;
  if (password) data.password_user = password;

  const { error } = await supabase
    .from("pasien")
    .update(data)
    .eq("id_pasien", id);
  if (error) throw new Error(error.message);
  revalidatePath("/pasien");
}

export async function deletePasien(id: number) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("pasien")
    .delete()
    .eq("id_pasien", id);
  if (error) throw new Error(error.message);
  revalidatePath("/pasien");
}
