"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout/app-layout";
import { PatientLayout } from "@/components/layout/app-layout";
import { GejalaClient } from "./client";
import { PatientViewGejala } from "./patient-view";
import type { Gejala } from "@/lib/types";

interface GejalaWithPenyakit extends Gejala {
  penyakit?: { nama_penyakit: string };
}

function getStoredRole(): "admin" | "patient" | null {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem("admin_logged_in") === "true") return "admin";
  if (sessionStorage.getItem("pasien_id")) return "patient";
  return null;
}

export function RoleAwareGejala({
  gejala,
}: {
  gejala: GejalaWithPenyakit[];
}) {
  const router = useRouter();
  const [role] = useState(getStoredRole);

  useEffect(() => {
    if (!getStoredRole()) router.replace("/");
  }, [router]);

  if (role === "admin") {
    return (
      <AdminLayout>
        <GejalaClient gejala={gejala} />
      </AdminLayout>
    );
  }

  if (role === "patient") {
    return (
      <PatientLayout>
        <PatientViewGejala gejala={gejala} />
      </PatientLayout>
    );
  }

  return null;
}
