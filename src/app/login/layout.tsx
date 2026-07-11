import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Admin",
  description: "Halaman login admin untuk mengelola sistem pakar gizi buruk.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
