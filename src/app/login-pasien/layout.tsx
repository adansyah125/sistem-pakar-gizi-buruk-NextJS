import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Pasien",
  description: "Halaman login pasien untuk melakukan diagnosa gizi buruk.",
  robots: { index: false, follow: false },
};

export default function LoginPasienLayout({ children }: { children: React.ReactNode }) {
  return children;
}
