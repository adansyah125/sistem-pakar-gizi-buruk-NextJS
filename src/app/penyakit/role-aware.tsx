"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout/app-layout";
import { PatientLayout } from "@/components/layout/app-layout";
import { PenyakitClient } from "./client";
import { PatientViewPenyakit } from "./patient-view";
import type { Penyakit } from "@/lib/types";

function getStoredRole(): "admin" | "patient" | null {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem("admin_logged_in") === "true") return "admin";
  if (sessionStorage.getItem("pasien_id")) return "patient";
  return null;
}

export function RoleAwarePenyakit({
  penyakit,
}: {
  penyakit: Penyakit[];
}) {
  const router = useRouter();
  const [role] = useState(getStoredRole);

  useEffect(() => {
    if (!getStoredRole()) router.replace("/");
  }, [router]);

  if (role === "admin") {
    return (
      <AdminLayout>
        <PenyakitClient penyakit={penyakit} />
      </AdminLayout>
    );
  }

  if (role === "patient") {
    return (
      <PatientLayout>
        <PatientViewPenyakit penyakit={penyakit} />
      </PatientLayout>
    );
  }

  return null;
}
