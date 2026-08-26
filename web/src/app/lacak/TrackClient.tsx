"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/data/services";
import {
  ORDER_STATUSES,
  SERVICE_LABELS,
  STATUS_LABELS,
  type OrderService,
  type OrderStatus
} from "@/lib/orders";
import { whatsappUrl } from "@/lib/whatsapp";
import { useLocale } from "@/components/LocaleProvider";

type TrackResult = {
  code: string;
  service: OrderService;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export default function TrackPage() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const [kode, setKode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  const copy =
    locale === "en"
      ? {
          title: "Track order",
          intro: "Enter your order code (example: DT-A1B2).",
          label: "Order code",
          submit: "Check status",
          back: "Back to home",
          wa: "Ask on WhatsApp"
        }
      : {
          title: "Lacak order",
          intro: "Masukkan kode order (contoh: DT-A1B2).",
          label: "Kode order",
          submit: "Cek status",
          back: "Kembali ke beranda",
          wa: "Tanya via WhatsApp"
        };

  const lookup = async (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`/api/orders/track?kode=${encodeURIComponent(clean)}`);
      const payload = (await response.json()) as TrackResult & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Order tidak ditemukan.");
      }
      setResult(payload);
      setKode(clean);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initial = searchParams.get("kode");
    if (initial) {
      setKode(initial.toUpperCase());
      void lookup(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void lookup(kode);
  };

  return (
    <main className="bg-paper px-5 py-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">{BRAND.name}</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-ink/70">{copy.intro}</p>

        <form onSubmit={onSubmit} className="mt-8 flex gap-2">
          <input
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase())}
            placeholder="DT-XXXX"
            className="min-w-0 flex-1 rounded-full border border-ink/15 px-4 py-3 text-sm"
            aria-label={copy.label}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-ink disabled:opacity-50"
          >
            {copy.submit}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        {result ? (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-sand p-6">
            <p className="font-display text-2xl text-ink">{result.code}</p>
            <p className="mt-2 text-sm text-ink/70">
              {SERVICE_LABELS[result.service][locale]} · {STATUS_LABELS[result.status][locale]}
            </p>
            <ol className="mt-6 space-y-2">
              {ORDER_STATUSES.map((status) => {
                const activeIndex = ORDER_STATUSES.indexOf(result.status);
                const stepIndex = ORDER_STATUSES.indexOf(status);
                const done = stepIndex <= activeIndex;
                return (
                  <li
                    key={status}
                    className={`text-sm ${done ? "font-semibold text-ink" : "text-ink/40"}`}
                  >
                    {done ? "●" : "○"} {STATUS_LABELS[status][locale]}
                  </li>
                );
              })}
            </ol>
            <a
              href={whatsappUrl(
                locale === "en"
                  ? `Hi, I want to ask about order ${result.code}`
                  : `Halo, saya ingin menanyakan order ${result.code}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
            >
              {copy.wa}
            </a>
          </div>
        ) : null}

        <Link href="/" className="mt-8 inline-block text-sm text-teal hover:underline">
          {copy.back}
        </Link>
      </div>
    </main>
  );
}
