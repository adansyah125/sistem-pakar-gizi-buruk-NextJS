"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full sm:w-auto"
      onClick={() => window.print()}
    >
      <Printer className="mr-2 h-5 w-5" />
      Cetak / Print
    </Button>
  );
}
