type SupabaseConfig = {
  url: string;
  apiKey: string;
};

/** Prefers service_role; falls back to anon/publishable (server-only). */
export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !apiKey) return null;
  return { url, apiKey };
}

export async function supabaseRest<T>(
  path: string,
  init: RequestInit & { prefer?: string } = {}
): Promise<{ ok: boolean; status: number; data: T | null; errorText: string }> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 500, data: null, errorText: "Supabase not configured" };
  }

  const headers = new Headers(init.headers);
  headers.set("apikey", config.apiKey);
  headers.set("Authorization", `Bearer ${config.apiKey}`);
  headers.set("Content-Type", "application/json");
  if (init.prefer) {
    headers.set("Prefer", init.prefer);
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers
  });

  const text = await response.text();
  let data: T | null = null;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = null;
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    errorText: response.ok ? "" : text || `HTTP ${response.status}`
  };
}
