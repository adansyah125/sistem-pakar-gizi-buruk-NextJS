import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cetak Hasil Diagnosa",
  description: "Cetak laporan hasil diagnosa gizi buruk pasien.",
  robots: { index: false, follow: false },
};

export default function CetakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
