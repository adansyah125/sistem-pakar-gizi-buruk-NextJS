import { PatientLayout } from "@/components/layout/app-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  BrainCircuit,
  Stethoscope,
  Info,
  ClipboardList,
  Activity,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";

const infoCards = [
  {
    title: "Gizi Buruk",
    icon: AlertTriangle,
    description:
      "Gizi buruk adalah suatu keadaan kekurangan konsumsi zat gizi yang disebabkan oleh rendahnya konsumsi energi protein dalam makanan sehari-hari, yang ditandai dengan berat dan tinggi badan tidak sesuai umur (dibawah rata-rata) dan harus ditetapkan oleh tenaga medis.",
  },
  {
    title: "Naive Bayes",
    icon: BrainCircuit,
    description:
      "Naive Bayes classifier merupakan salah satu metoda pemelajaran mesin yang memanfaatkan perhitungan probabilitas dan statistik yang dikemukakan oleh ilmuwan Inggris Thomas Bayes.",
  },
  {
    title: "Gejala",
    icon: Stethoscope,
    description:
      "Gejala yang sering dialami pasien yang nantinya akan mengetahui diagnosa gizi buruk apa yang dialaminya.",
  },
  {
    title: "Tentang",
    icon: Info,
    description:
      "Tentang Aplikasi ini adalah untuk mengetahui diagnosis gizi buruk sesuai gejala yang dialami pasien dengan menggunakan metode Naive Bayes.",
  },
];

const navCards = [
  {
    label: "Diagnosa",
    icon: ClipboardList,
    href: "/diagnosa",
    desc: "Lakukan diagnosa gizi buruk berdasarkan gejala",
  },
  {
    label: "Penyakit",
    icon: Activity,
    href: "/penyakit",
    desc: "Lihat daftar penyakit gizi buruk",
  },
  {
    label: "Gejala",
    icon: Stethoscope,
    href: "/gejala",
    desc: "Lihat daftar gejala klinis",
  },
  {
    label: "Hasil Saya",
    icon: ClipboardCheck,
    href: "/hasil-pasien",
    desc: "Lihat riwayat hasil diagnosa",
  },
];

export default function DashboardPasienPage() {
  return (
    <PatientLayout>
      <div className="space-y-8 sm:space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Dashboard Pasien
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Selamat datang di sistem diagnosa gizi buruk
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {infoCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base sm:text-lg">
                      {card.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4">
            Menu Cepat
          </h2>
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {navCards.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="cursor-pointer transition-all duration-200 hover:bg-accent hover:ring-2 hover:ring-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm sm:text-base font-medium">
                      {item.label}
                    </CardTitle>
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
