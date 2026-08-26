import { NextResponse } from "next/server";
import type { OrderRecord } from "@/lib/orders";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    if (!getSupabaseConfig()) {
      return NextResponse.json(
        { error: "Sistem lacak belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const kode = new URL(request.url).searchParams.get("kode")?.trim().toUpperCase() || "";
    if (!kode || !/^DT-[A-Z0-9]{4}$/.test(kode)) {
      return NextResponse.json({ error: "Kode order tidak valid." }, { status: 400 });
    }

    const result = await supabaseRest<OrderRecord[]>(
      `orders?code=eq.${encodeURIComponent(kode)}&select=code,service,status,created_at,updated_at`,
      { method: "GET" }
    );

    if (!result.ok || !Array.isArray(result.data) || !result.data[0]) {
      return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });
    }

    const order = result.data[0];
    return NextResponse.json({
      code: order.code,
      service: order.service,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at
    });
  } catch (error) {
    console.error("[orders/track]", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}
