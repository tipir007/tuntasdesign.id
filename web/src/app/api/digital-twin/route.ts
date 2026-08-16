import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/data/knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const maxDuration = 30;

const REQUEST_TIMEOUT_MS = 15000;
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60_000;

const MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "openai/gpt-oss-20b:free"
];

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return true;
  }

  bucket.count += 1;
  return false;
};

const getAllowedOrigins = (): string[] =>
  [
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "http://localhost:3001"
  ].filter((value): value is string => Boolean(value));

const isAllowedOrigin = (origin: string, host: string | null): boolean => {
  if (getAllowedOrigins().includes(origin)) {
    return true;
  }
  try {
    const originHost = new URL(origin).host;
    if (host && originHost === host) {
      return true;
    }
    if (originHost.endsWith(".vercel.app")) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

const getSiteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type ModelResult =
  | { ok: true; answer: string }
  | { ok: false; detail: string };

const requestModel = async (
  model: string,
  apiKey: string,
  messages: ChatMessage[]
): Promise<ModelResult> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": getSiteUrl(),
        "X-Title": "designtuntas.id Tuti AI"
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
        temperature: 0.4
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      return { ok: false, detail: `HTTP ${response.status}: ${await response.text()}` };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return { ok: false, detail: "Empty response" };
    }
    return { ok: true, answer };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "Network error"
    };
  } finally {
    clearTimeout(timeoutId);
  }
};

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && !isAllowedOrigin(origin, request.headers.get("host"))) {
      return NextResponse.json({ error: "Origin tidak diizinkan." }, { status: 403 });
    }

    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
        { status: 429 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[digital-twin] Missing OPENROUTER_API_KEY");
      return NextResponse.json(
        { error: "Asisten belum dikonfigurasi. Hubungi admin atau coba lagi nanti." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const incomingMessages = Array.isArray(body?.messages) ? body.messages : [];
    const sanitizedMessages = incomingMessages
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({
        role: m.role,
        content: String(m.content || "").slice(0, 2500)
      }))
      .filter((m) => m.content.trim().length > 0)
      .slice(-12);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Minimal satu pesan pengguna diperlukan." },
        { status: 400 }
      );
    }

    let answer: string | null = null;
    for (const model of MODELS) {
      const result = await requestModel(model, apiKey, sanitizedMessages);
      if (result.ok) {
        answer = result.answer;
        break;
      }
      console.error(`[digital-twin] Model "${model}" failed:`, result.detail);
      await sleep(300);
    }

    if (!answer) {
      return NextResponse.json(
        { error: "Asisten sedang tidak tersedia. Coba lagi atau hubungi WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error(
      "[digital-twin] Unexpected error:",
      error instanceof Error ? error.message : "Unknown"
    );
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
