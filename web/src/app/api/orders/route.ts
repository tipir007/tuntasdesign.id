import { NextResponse } from "next/server";
import {
  generateOrderCode,
  isOrderStatus,
  sanitizeOrderInput,
  type OrderRecord
} from "@/lib/orders";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase";

export const maxDuration = 20;

const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return true;
  bucket.count += 1;
  return false;
};

async function notifyAdmin(order: OrderRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const from = process.env.RESEND_FROM?.trim() || "designtuntas <onboarding@resend.dev>";
  if (!apiKey || !adminEmail) {
    console.info("[orders] Email skipped (missing RESEND_API_KEY or ADMIN_EMAIL)", order.code);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [adminEmail],
        subject: `Order baru ${order.code} — ${order.service}`,
        text: [
          `Kode: ${order.code}`,
          `Layanan: ${order.service}`,
          `Nama: ${order.name}`,
          `Kontak: ${order.contact}`,
          `Deadline: ${order.deadline || "-"}`,
          "",
          "Brief:",
          order.brief
        ].join("\n")
      })
    });
  } catch (error) {
    console.error("[orders] Email failed:", error instanceof Error ? error.message : "unknown");
  }
}

export async function POST(request: Request) {
  try {
    if (!getSupabaseConfig()) {
      return NextResponse.json(
        { error: "Sistem order belum dikonfigurasi. Hubungi admin atau chat WhatsApp." },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = sanitizeOrderInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    // Honeypot: bots fill hidden "website" field
    if (parsed.data.honeypot) {
      return NextResponse.json({
        code: generateOrderCode(),
        status: "baru",
        message: "Order diterima."
      });
    }

    let created: OrderRecord | null = null;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const code = generateOrderCode();
      const result = await supabaseRest<OrderRecord[]>("orders", {
        method: "POST",
        prefer: "return=representation",
        body: JSON.stringify({
          code,
          service: parsed.data.service,
          name: parsed.data.name,
          contact: parsed.data.contact,
          brief: parsed.data.brief,
          deadline: parsed.data.deadline,
          status: "baru"
        })
      });

      if (result.ok && Array.isArray(result.data) && result.data[0]) {
        created = result.data[0];
        break;
      }

      // Unique violation on code → retry
      if (result.status === 409 || result.errorText.toLowerCase().includes("duplicate")) {
        continue;
      }

      console.error("[orders] Insert failed:", result.errorText);
      return NextResponse.json(
        { error: "Gagal menyimpan order. Coba lagi atau hubungi WhatsApp." },
        { status: 502 }
      );
    }

    if (!created) {
      return NextResponse.json(
        { error: "Gagal membuat kode order. Coba lagi." },
        { status: 502 }
      );
    }

    void notifyAdmin(created);

    return NextResponse.json({
      code: created.code,
      status: created.status,
      message: "Order diterima."
    });
  } catch (error) {
    console.error("[orders] Unexpected:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Terjadi kesalahan. Silakan coba lagi." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET?.trim();
    const provided = request.headers.get("x-admin-secret")?.trim();
    if (!adminSecret || !provided || provided !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!getSupabaseConfig()) {
      return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
    }

    const body = (await request.json()) as { code?: string; status?: string };
    const code = String(body.code || "").trim().toUpperCase();
    const status = String(body.status || "").trim();

    if (!code || !isOrderStatus(status)) {
      return NextResponse.json({ error: "Code/status tidak valid." }, { status: 400 });
    }

    const result = await supabaseRest<OrderRecord[]>(
      `orders?code=eq.${encodeURIComponent(code)}`,
      {
        method: "PATCH",
        prefer: "return=representation",
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
      }
    );

    if (!result.ok || !Array.isArray(result.data) || !result.data[0]) {
      return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ order: result.data[0] });
  } catch (error) {
    console.error("[orders] PATCH error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET?.trim();
    const provided =
      request.headers.get("x-admin-secret")?.trim() ||
      new URL(request.url).searchParams.get("secret")?.trim() ||
      "";
    if (!adminSecret || provided !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!getSupabaseConfig()) {
      return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
    }

    const result = await supabaseRest<OrderRecord[]>(
      "orders?select=*&order=created_at.desc&limit=50",
      { method: "GET" }
    );

    if (!result.ok || !Array.isArray(result.data)) {
      return NextResponse.json({ error: "Gagal memuat order." }, { status: 502 });
    }

    return NextResponse.json({ orders: result.data });
  } catch (error) {
    console.error("[orders] GET error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}
