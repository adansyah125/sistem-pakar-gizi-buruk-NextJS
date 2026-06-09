import type { Metadata } from "next";
import { AdminLayout } from "@/components/layout/app-layout";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Cetak Hasil Diagnosa",
  description: "Cetak laporan hasil diagnosa gizi buruk.",
  robots: { index: false, follow: false },
};
import { PrintButton } from "./print-button";

export default async function CetakPage() {
  const supabase = await createServerSupabase();
  const { data: hasil } = await supabase
    .from("hasil")
    .select("*, penyakit:penyakit(nama_penyakit)")
    .order("id_hasil", { ascending: false });

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 20mm 25mm;
        }

        @media print {
          html, body {
            background: white !important;
            color: black !important;
            font-size: 12pt !important;
          }

          .no-print {
            display: none !important;
          }

          .print-area {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
          }

          .print-area .print-card {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: transparent !important;
            --card: transparent !important;
            ring: none !important;
          }

          .print-header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 16pt;
            margin-bottom: 20pt;
          }

          .print-header h1 {
            font-size: 18pt !important;
            font-weight: 700 !important;
            margin: 0 0 4pt 0 !important;
            color: #000 !important;
          }

          .print-header p {
            font-size: 11pt !important;
            margin: 0 !important;
            color: #333 !important;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
          }

          .print-table th {
            background: #f0f0f0 !important;
            color: #000 !important;
            font-weight: 600 !important;
            padding: 6pt 8pt !important;
            border: 1px solid #000 !important;
            text-align: left !important;
          }

          .print-table td {
            padding: 5pt 8pt !important;
            border: 1px solid #999 !important;
            color: #000 !important;
          }

          .print-table tr:nth-child(even) td {
            background: #f9f9f9 !important;
          }

          .print-footer {
            text-align: center;
            font-size: 9pt;
            color: #666;
            margin-top: 24pt;
            padding-top: 12pt;
            border-top: 1px solid #ccc;
          }

          .print-badge {
            display: inline !important;
            padding: 1pt 6pt !important;
            border: 1px solid #000 !important;
            border-radius: 2pt !important;
            font-size: 9pt !important;
            background: transparent !important;
            color: #000 !important;
            font-weight: 500 !important;
          }

          .sidebar, .print-hide {
            display: none !important;
          }
        }
      `}</style>

      <AdminLayout>
        <div className="space-y-6 sm:space-y-8 print-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Cetak Hasil Diagnosa
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Laporan hasil diagnosa gizi buruk
              </p>
            </div>
            <PrintButton />
          </div>

          <div className="print-card">
            <div className="print-header">
              <h1 className="text-xl sm:text-2xl font-bold">
                LAPORAN HASIL DIAGNOSA
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistem Pakar Gizi Buruk — Metode Certainty Factor
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tanggal Cetak: {today}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full print-table">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 border-b">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 border-b">
                      Nama Pasien
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 border-b">
                      JK
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 border-b">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 border-b">
                      Hasil Diagnosa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hasil && hasil.length > 0 ? (
                    hasil.map((h, i) => (
                      <tr key={h.id_hasil} className="border-b border-border/50">
                        <td className="px-4 py-3 text-sm">{i + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium">{h.namapasien}</td>
                        <td className="px-4 py-3 text-sm">{h.jeniskelamin}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {h.created_at
                            ? new Date(h.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="print-badge inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            {h.penyakit?.nama_penyakit ?? h.hasildiagnosa}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-sm text-muted-foreground">
                        Belum ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="print-footer no-print hidden print:block">
              <p>Dicetak dari Sistem Pakar Gizi Buruk — {today}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
