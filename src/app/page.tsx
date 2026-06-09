import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Stethoscope, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Certainty Factor. Diagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor secara cepat dan akurat.",
  openGraph: {
    title: "Sistem Pakar Gizi Buruk - Diagnosa Gizi Buruk Anak",
    description:
      "Diagnosa gizi buruk pada anak secara cepat menggunakan metode Certainty Factor.",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-base">
            <div className=" h-8 w-8 hidden md:flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              SP
            </div>
            <span className="hidden sm:inline">Sistem Pakar Gizi Buruk</span>
            {/* <span className="sm:hidden">SP Gizi</span> */}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="default" render={<Link href="/login" />} nativeButton={false}>
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Button>
            <Button size="default" render={<Link href="/login-pasien" />} nativeButton={false}>
              <User className="mr-2 h-4 w-4" />
              Pasien
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 md:py-32 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <h1 className="max-w-3xl text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Diagnosa Gizi Buruk Anak
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
            Sistem pakar berbasis metode Certainty Factor untuk mendiagnosa jenis gizi buruk pada anak secara 
            cepat, akurat berdasarkan penilaian pakar, dan mudah digunakan.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="text-base h-10 px-5" render={<Link href="/login-pasien" />} nativeButton={false}>
              Mulai Diagnosa
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base h-10 px-5" render={<Link href="/login" />} nativeButton={false}>
              Login Admin
            </Button>
          </div>
        </section>

        <section className="border-t py-12 sm:py-16">
          <div className="container mx-auto grid gap-6 sm:gap-8 px-4 sm:px-6 md:grid-cols-3">
            <div className="rounded-lg border p-6 sm:p-8">
              <h3 className="mb-3 text-base sm:text-lg font-semibold">Certainty Factor</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
               Menggunakan metode Certainty Factor untuk menghitung tingkat keyakinan 
jenis gizi buruk berdasarkan gejala yang dipilih.
              </p>
            </div>
            <div className="rounded-lg border p-6 sm:p-8">
              <h3 className="mb-3 text-base sm:text-lg font-semibold">3 Jenis Diagnosa</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Mendiagnosa Marasmus, Kwarshiorkor, dan Marasmik-Kwarshiorkor
                berdasarkan gejala klinis yang teramati.
              </p>
            </div>
            <div className="rounded-lg border p-6 sm:p-8">
              <h3 className="mb-3 text-base sm:text-lg font-semibold">Mudah Digunakan</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Cukup pilih gejala yang dialami anak, sistem akan menghitung
                dan menampilkan hasil diagnosa secara otomatis.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm sm:text-base text-muted-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          &copy; {new Date().getFullYear()} Sistem Pakar Gizi Buruk - Metode
          Certainty Factor
        </div>
      </footer>
    </div>
  );
}
