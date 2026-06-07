"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Stethoscope,
  Activity,
  ClipboardList,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const adminMenu = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Pasien", icon: Users, href: "/pasien" },
  { label: "Penyakit", icon: Activity, href: "/penyakit" },
  { label: "Gejala", icon: Stethoscope, href: "/gejala" },
  { label: "Diagnosa", icon: ClipboardList, href: "/diagnosa" },
  { label: "Hasil", icon: ClipboardCheck, href: "/hasil" },
];

function ThemeToggle({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start gap-3 text-muted-foreground py-2.5"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 shrink-0" />
      ) : (
        <Moon className="h-5 w-5 shrink-0" />
      )}
      {!collapsed && <span>{theme === "dark" ? "Mode Terang" : "Mode Gelap"}</span>}
    </Button>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    sessionStorage.removeItem("admin_logged_in");
    toast.success("Berhasil keluar");
    router.push("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground shadow-lg ring-1 ring-sidebar-border backdrop-blur-sm lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "max-lg:fixed max-lg:transition-transform max-lg:duration-300",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            SP
          </div>
          {!collapsed && (
            <span className="font-semibold tracking-tight">
              Sistem Pakar
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 max-lg:hidden"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 lg:hidden"
            onClick={closeMobile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {adminMenu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <Separator />
        <div className="space-y-1 p-2">
          <ThemeToggle collapsed={collapsed} />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground py-2.5"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}

const patientMenu = [
  { label: "Dashboard", icon: Home, href: "/dashboard-pasien" },
  { label: "Data Saya", icon: Users, href: "/pasien" },
  { label: "Penyakit", icon: Activity, href: "/penyakit" },
  { label: "Gejala", icon: Stethoscope, href: "/gejala" },
  { label: "Diagnosa", icon: ClipboardList, href: "/diagnosa" },
  { label: "Hasil Saya", icon: ClipboardCheck, href: "/hasil-pasien" },
];

export function PatientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    sessionStorage.clear();
    toast.success("Berhasil keluar");
    router.push("/login-pasien");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground shadow-lg ring-1 ring-sidebar-border backdrop-blur-sm lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "max-lg:fixed max-lg:transition-transform max-lg:duration-300",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            SP
          </div>
          {!collapsed && (
            <span className="font-semibold tracking-tight">
             Sistem Pakar
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 max-lg:hidden"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 lg:hidden"
            onClick={closeMobile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {patientMenu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <Separator />
        <div className="space-y-1 p-2">
          <ThemeToggle collapsed={collapsed} />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground py-2.5"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
