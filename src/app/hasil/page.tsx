import { AdminLayout } from "@/components/layout/app-layout";
import { getHasil } from "./actions";
import { HasilClient } from "./client";

export default async function HasilPage() {
  const hasil = await getHasil();

  return (
    <AdminLayout>
      <HasilClient hasil={hasil} />
    </AdminLayout>
  );
}
