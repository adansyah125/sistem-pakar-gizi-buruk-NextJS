"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout/app-layout";
import { PatientLayout } from "@/components/layout/app-layout";
import { PasienClient } from "./client";
import { PatientViewPasien } from "./patient-view";
import type { Pasien } from "@/lib/types";

function getStoredRole(): "admin" | "patient" | null {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem("admin_logged_in") === "true") return "admin";
  if (sessionStorage.getItem("pasien_id")) return "patient";
  return null;
}

export function RoleAwarePasien({ pasien }: { pasien: Pasien[] }) {
  const router = useRouter();
  const [role] = useState(getStoredRole);

  useEffect(() => {
    if (!getStoredRole()) router.replace("/");
  }, [router]);

  if (role === "admin") {
    return (
      <AdminLayout>
        <PasienClient pasien={pasien} />
      </AdminLayout>
    );
  }

  if (role === "patient") {
    return (
      <PatientLayout>
        <PatientViewPasien />
      </PatientLayout>
    );
  }

  return null;
}
