"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ORDER_STATUSES,
  SERVICE_LABELS,
  STATUS_LABELS,
  type OrderRecord,
  type OrderStatus
} from "@/lib/orders";

type AdminAnalyticsStats = {
  pageviews: number;
  uniqueVisitors: number;
  pageviewsToday: number;
  uniqueVisitorsToday: number;
  topPaths: { path: string; views: number }[];
};

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret") || "";
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [stats, setStats] = useState<AdminAnalyticsStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch(`/api/orders?secret=${encodeURIComponent(secret)}`, {
          headers: { "x-admin-secret": secret }
        }),
        fetch(`/api/analytics/stats?secret=${encodeURIComponent(secret)}`, {
          headers: { "x-admin-secret": secret }
        })
      ]);

      const ordersPayload = (await ordersRes.json()) as { orders?: OrderRecord[]; error?: string };
      if (!ordersRes.ok) throw new Error(ordersPayload.error || "Unauthorized");

      setOrders(ordersPayload.orders || []);

      if (statsRes.ok) {
        setStats((await statsRes.json()) as AdminAnalyticsStats);
      } else {
        setStats(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (secret) void load();
    else {
      setLoading(false);
      setError("Tambahkan ?secret=ADMIN_SECRET di URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secret]);

  const updateStatus = async (code: string, status: OrderStatus) => {
    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": secret
      },
      body: JSON.stringify({ code, status })
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Gagal update");
      return;
    }
    await load();
  };

  return (
    <main className="bg-paper px-5 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl text-ink">Admin orders</h1>
        <p className="mt-2 text-sm text-ink/60">Akses dengan secret. Jangan bagikan URL ini.</p>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        {stats ? (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal">Pengunjung</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Unik hari ini" value={stats.uniqueVisitorsToday} />
              <StatCard label="Kunjungan hari ini" value={stats.pageviewsToday} />
              <StatCard label="Unik total" value={stats.uniqueVisitors} />
              <StatCard label="Kunjungan total" value={stats.pageviews} />
            </div>
            {stats.topPaths.length > 0 ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-ink/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-sand text-ink/70">
                    <tr>
                      <th className="px-4 py-2 font-medium">Halaman</th>
                      <th className="px-4 py-2 font-medium text-right">Kunjungan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topPaths.map((row) => (
                      <tr key={row.path} className="border-t border-ink/10">
                        <td className="px-4 py-2 font-mono text-xs text-ink/80">{row.path}</td>
                        <td className="px-4 py-2 text-right text-ink">{row.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ) : null}

        {loading ? <p className="mt-6 text-sm text-ink/60">Memuat…</p> : null}
        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-teal">Order</h2>
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border border-ink/10 bg-sand p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink">
                  {order.code} · {SERVICE_LABELS[order.service].id}
                </p>
                <p className="text-xs text-ink/50">
                  {new Date(order.created_at).toLocaleString("id-ID")}
                </p>
              </div>
              <p className="mt-1 text-sm text-ink/70">
                {order.name} · {order.contact}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-ink/80">{order.brief}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ORDER_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => void updateStatus(order.code, status)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === status
                        ? "bg-ink text-paper"
                        : "border border-ink/15 text-ink/70 hover:border-teal"
                    }`}
                  >
                    {STATUS_LABELS[status].id}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-8 inline-block text-sm text-teal hover:underline">
          Beranda
        </Link>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-sand px-4 py-3">
      <p className="text-xs text-ink/55">{label}</p>
      <p className="mt-1 font-display text-2xl text-ink">{value.toLocaleString("id-ID")}</p>
    </div>
  );
}
