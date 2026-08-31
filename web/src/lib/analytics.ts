import { getSupabaseConfig } from "@/lib/supabase";

export const VISITOR_COOKIE = "dt_vid";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type AnalyticsSummary = {
  pageviews: number;
  unique_visitors: number;
  pageviews_today: number;
  unique_visitors_today: number;
};

export type TopPathRow = {
  path: string;
  views: number;
};

const BOT_UA =
  /bot|crawler|spider|slurp|facebookexternalhit|whatsapp|preview|lighthouse|headless|curl|wget|python-requests/i;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent?.trim()) return false;
  return BOT_UA.test(userAgent);
}

export function shouldTrackPath(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith("/admin")) return false;
  if (normalized.startsWith("/api")) return false;
  if (normalized.includes("..")) return false;
  return normalized.length <= 200;
}

export function sanitizePath(path: string): string {
  const trimmed = path.trim().slice(0, 200);
  if (!trimmed.startsWith("/")) return `/${trimmed}`;
  return trimmed;
}

export function isValidVisitorId(value: string | null | undefined): value is string {
  return Boolean(value && UUID_RE.test(value));
}

export function createVisitorId(): string {
  return crypto.randomUUID();
}

export async function supabaseRpc<T>(
  fn: string,
  body: Record<string, unknown> = {}
): Promise<{ ok: boolean; data: T | null; errorText: string }> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, data: null, errorText: "Supabase not configured" };
  }

  const response = await fetch(`${config.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!response.ok) {
    return { ok: false, data: null, errorText: text || `HTTP ${response.status}` };
  }

  if (!text) return { ok: true, data: null, errorText: "" };

  try {
    return { ok: true, data: JSON.parse(text) as T, errorText: "" };
  } catch {
    return { ok: false, data: null, errorText: "Invalid RPC response" };
  }
}

export async function recordPageView(path: string, visitorId: string): Promise<boolean> {
  const config = getSupabaseConfig();
  if (!config) return false;

  const response = await fetch(`${config.url}/rest/v1/page_views`, {
    method: "POST",
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ path, visitor_id: visitorId })
  });

  return response.ok;
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary | null> {
  const result = await supabaseRpc<AnalyticsSummary>("analytics_summary");
  if (!result.ok || !result.data) return null;
  return result.data;
}

export async function fetchTopPaths(limit = 5): Promise<TopPathRow[]> {
  const result = await supabaseRpc<TopPathRow[]>("analytics_top_paths", {
    limit_count: limit
  });
  if (!result.ok || !result.data) return [];
  return Array.isArray(result.data) ? result.data : [];
}
