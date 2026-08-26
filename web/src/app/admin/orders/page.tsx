import { Suspense } from "react";
import AdminClient from "./AdminClient";

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<main className="bg-paper px-5 py-16 text-ink/70">Loading…</main>}>
      <AdminClient />
    </Suspense>
  );
}
