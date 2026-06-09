import type { Metadata } from "next";
import { AdminLayout } from "@/components/layout/app-layout";
import { getHasil } from "./actions";
import { HasilClient } from "./client";

export const metadata: Metadata = {
  title: "Hasil Diagnosa",
  description: "Lihat hasil diagnosa gizi buruk pasien.",
  robots: { index: false, follow: false },
};

export default async function HasilPage() {
  const hasil = await getHasil();

  return (
    <AdminLayout>
      <HasilClient hasil={hasil} />
    </AdminLayout>
  );
}
