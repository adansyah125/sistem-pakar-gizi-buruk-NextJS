"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout/app-layout";
import { PatientLayout } from "@/components/layout/app-layout";
import { DiagnosaClient } from "./client";
import type { Gejala, Penyakit, Pasien } from "@/lib/types";

interface GejalaWithPenyakit extends Gejala {
  penyakit?: { nama_penyakit: string };
}

function getStoredRole(): "admin" | "patient" | null {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem("admin_logged_in") === "true") return "admin";
  if (sessionStorage.getItem("pasien_id")) return "patient";
  return null;
}

function getStoredNama(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("pasien_nama") ?? "";
}

export function RoleAwareDiagnosa({
  gejala,
  penyakit,
  pasien,
}: {
  gejala: GejalaWithPenyakit[];
  penyakit: Penyakit[];
  pasien: Pasien[];
}) {
  const router = useRouter();
  const [role] = useState(getStoredRole);
  const [pasienNama] = useState(getStoredNama);

  useEffect(() => {
    if (!getStoredRole()) router.replace("/");
  }, [router]);

  const filteredPasien = role === "patient"
    ? pasien.filter((p) => String(p.id_pasien) === sessionStorage.getItem("pasien_id"))
    : pasien;

  const content = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Diagnosa</h1>
        <p className="text-muted-foreground">
          Pilih gejala yang dialami pasien untuk mendapatkan hasil diagnosa
        </p>
      </div>
      <DiagnosaClient
        gejala={gejala}
        penyakit={penyakit}
        pasien={filteredPasien}
        defaultNama={pasienNama}
      />
    </div>
  );

  if (role === "admin") return <AdminLayout>{content}</AdminLayout>;
  if (role === "patient") return <PatientLayout>{content}</PatientLayout>;

  return null;
}
