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

const baseUrl = "https://sistempakargizi.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Sistem Pakar Gizi Buruk - Certainty Factor",
    template: "%s | Sistem Pakar Gizi Buruk",
  },
  description:
    "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Certainty Factor. Cepat, akurat, dan mudah digunakan untuk mendiagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor.",
  keywords: [
    "sistem pakar",
    "gizi buruk",
    "certainty factor",
    "diagnosa",
    "marasmus",
    "kwarshiorkor",
    "marasmik-kwarshiorkor",
    "anak",
    "kesehatan",
    "malnutrisi",
    "diagnosa online",
  ],
  authors: [{ name: "Sistem Pakar Gizi Buruk" }],
  creator: "Sistem Pakar Gizi Buruk",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Sistem Pakar Gizi Buruk - Certainty Factor",
    description:
      "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Certainty Factor. Diagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor secara cepat.",
    url: baseUrl,
    siteName: "Sistem Pakar Gizi Buruk",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sistem Pakar Gizi Buruk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistem Pakar Gizi Buruk - Certainty Factor",
    description:
      "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Certainty Factor.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: [{ url: "/icon.svg", sizes: "180x180" }],
  },
  manifest: "/manifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sistem Pakar Gizi Buruk",
  description:
    "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Certainty Factor",
  url: baseUrl,
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  author: {
    "@type": "Organization",
    name: "Sistem Pakar Gizi Buruk",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
