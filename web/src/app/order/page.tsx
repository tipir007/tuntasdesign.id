"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { BRAND } from "@/data/services";
import { ORDER_SERVICES, SERVICE_LABELS, type OrderService } from "@/lib/orders";
import { whatsappUrl } from "@/lib/whatsapp";
import { useLocale } from "@/components/LocaleProvider";

export default function OrderPage() {
  const { locale } = useLocale();
  const [service, setService] = useState<OrderService>("cv");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [brief, setBrief] = useState("");
  const [deadline, setDeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const copy =
    locale === "en"
      ? {
          title: "Order form",
          intro: "Send a short brief. We'll confirm scope and deposit via WhatsApp. Files can be sent on WhatsApp after the order code is created.",
          service: "Service",
          name: "Full name",
          contact: "WhatsApp / email",
          brief: "Brief",
          deadline: "Deadline (optional)",
          submit: "Submit order",
          success: "Order received",
          track: "Track status",
          wa: "Continue on WhatsApp",
          back: "Back to home",
          note: "No file upload on this form — attach files on WhatsApp."
        }
      : {
          title: "Form order",
          intro: "Kirim brief singkat. Scope dan DP dikonfirmasi via WhatsApp. File bisa dikirim di WhatsApp setelah kode order dibuat.",
          service: "Layanan",
          name: "Nama lengkap",
          contact: "WhatsApp / email",
          brief: "Brief",
          deadline: "Deadline (opsional)",
          submit: "Kirim order",
          success: "Order diterima",
          track: "Lacak status",
          wa: "Lanjut ke WhatsApp",
          back: "Kembali ke beranda",
          note: "Tidak ada upload file di form ini — kirim lampiran via WhatsApp."
        };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, name, contact, brief, deadline, website })
      });
      const payload = (await response.json()) as { code?: string; error?: string };
      if (!response.ok || !payload.code) {
        throw new Error(payload.error || "Gagal mengirim order.");
      }
      setCode(payload.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-paper px-5 py-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">{BRAND.name}</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-ink/70">{copy.intro}</p>
        <p className="mt-2 text-sm text-ink/55">{copy.note}</p>

        {code ? (
          <div className="mt-10 space-y-4 rounded-2xl border border-ink/10 bg-sand p-6">
            <p className="text-sm text-teal">{copy.success}</p>
            <p className="font-display text-3xl text-ink">{code}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/lacak?kode=${code}`}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
              >
                {copy.track}
              </Link>
              <a
                href={whatsappUrl(
                  locale === "en"
                    ? `Hi, I submitted an order. Code: ${code}`
                    : `Halo, saya sudah kirim order. Kode: ${code}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-ink"
              >
                {copy.wa}
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-4">
            <label className="block text-sm text-ink/80">
              {copy.service}
              <select
                value={service}
                onChange={(e) => setService(e.target.value as OrderService)}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink"
              >
                {ORDER_SERVICES.map((id) => (
                  <option key={id} value={id}>
                    {SERVICE_LABELS[id][locale]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-ink/80">
              {copy.name}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3"
              />
            </label>
            <label className="block text-sm text-ink/80">
              {copy.contact}
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3"
              />
            </label>
            <label className="block text-sm text-ink/80">
              {copy.brief}
              <textarea
                required
                rows={5}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3"
              />
            </label>
            <label className="block text-sm text-ink/80">
              {copy.deadline}
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3"
              />
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink disabled:opacity-50"
            >
              {loading ? "…" : copy.submit}
            </button>
          </form>
        )}

        <Link href="/" className="mt-8 inline-block text-sm text-teal hover:underline">
          {copy.back}
        </Link>
      </div>
    </main>
  );
}
