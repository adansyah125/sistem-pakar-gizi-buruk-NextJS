import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sistem Pakar Gizi Buruk - Centainty Factory",
    template: "%s | Sistem Pakar Gizi Buruk",
  },
  description:
    "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Centainty Factory. Cepat, akurat, dan mudah digunakan untuk mendiagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor.",
  keywords: [
    "sistem pakar",
    "gizi buruk",
    "naive bayes",
    "diagnosa",
    "marasmus",
    "kwarshiorkor",
    "marasmik",
    "anak",
    "kesehatan",
  ],
  authors: [{ name: "Sistem Pakar Gizi Buruk" }],
  creator: "Sistem Pakar Gizi Buruk",
  metadataBase: new URL("https://sistempakargizi.vercel.app"),
  openGraph: {
    title: "Sistem Pakar Gizi Buruk - Centainty Factory",
    description:
      "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Centainty Factory",
    url: "https://sistempakargizi.vercel.app",
    siteName: "Sistem Pakar Gizi Buruk",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sistem Pakar Gizi Buruk - Centainty Factory",
    description:
      "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Centainty Factory",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
