import { Suspense } from "react";
import TrackClient from "./TrackClient";

export default function LacakPage() {
  return (
    <Suspense fallback={<main className="bg-paper px-5 py-24 text-ink/70">Loading…</main>}>
      <TrackClient />
    </Suspense>
  );
}
