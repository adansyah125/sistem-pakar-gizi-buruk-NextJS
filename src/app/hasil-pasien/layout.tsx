import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Diagnosa Saya",
  description: "Riwayat hasil diagnosa gizi buruk pasien.",
};

export default function HasilPasienLayout({ children }: { children: React.ReactNode }) {
  return children;
}
