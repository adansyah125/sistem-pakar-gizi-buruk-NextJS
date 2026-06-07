"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, PatientSidebar } from "@/components/layout/sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("admin_logged_in") !== "true") {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64 min-w-0">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export function PatientLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("pasien_id")) {
      router.replace("/login-pasien");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <PatientSidebar />
      <main className="flex-1 lg:pl-64 min-w-0">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
