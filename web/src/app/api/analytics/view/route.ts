import { NextResponse } from "next/server";
import {
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
  createVisitorId,
  isBotUserAgent,
  isValidVisitorId,
  recordPageView,
  sanitizePath,
  shouldTrackPath
} from "@/lib/analytics";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const maxDuration = 10;

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000;

function parseCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) {
      return decodeURIComponent(part.slice(name.length + 1));
    }
  }
  return null;
}

function visitorCookieOptions(isProduction: boolean): string {
  const parts = [
    `Path=/`,
    `Max-Age=${VISITOR_COOKIE_MAX_AGE}`,
    `SameSite=Lax`,
    `HttpOnly`
  ];
  if (isProduction) parts.push("Secure");
  return parts.join("; ");
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`analytics:view:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json({ ok: true, skipped: "rate_limited" });
    }

    const userAgent = request.headers.get("user-agent");
    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    let path = "/";
    try {
      const body = (await request.json()) as { path?: string };
      if (body.path) path = sanitizePath(body.path);
    } catch {
      /* empty body ok */
    }

    if (!shouldTrackPath(path)) {
      return NextResponse.json({ ok: true, skipped: "path" });
    }

    const cookieHeader = request.headers.get("cookie");
    let visitorId = parseCookieValue(cookieHeader, VISITOR_COOKIE);
    let isNewVisitor = false;

    if (!isValidVisitorId(visitorId)) {
      visitorId = createVisitorId();
      isNewVisitor = true;
    }

    const recorded = await recordPageView(path, visitorId);
    if (!recorded) {
      return NextResponse.json({ ok: false, error: "Analytics not configured." }, { status: 503 });
    }

    const response = NextResponse.json({ ok: true });
    if (isNewVisitor) {
      const isProduction = process.env.NODE_ENV === "production";
      response.headers.set(
        "Set-Cookie",
        `${VISITOR_COOKIE}=${encodeURIComponent(visitorId)}; ${visitorCookieOptions(isProduction)}`
      );
    }
    return response;
  } catch (error) {
    console.error("[analytics/view]", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
