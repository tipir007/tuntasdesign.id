import { NextResponse } from "next/server";
import {
  fetchAnalyticsSummary,
  fetchTopPaths,
  type AnalyticsSummary,
  type TopPathRow
} from "@/lib/analytics";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const maxDuration = 10;

const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW_MS = 60_000;

export type PublicAnalyticsStats = {
  pageviews: number;
  uniqueVisitors: number;
};

export type AdminAnalyticsStats = PublicAnalyticsStats & {
  pageviewsToday: number;
  uniqueVisitorsToday: number;
  topPaths: TopPathRow[];
};

function toPublicStats(summary: AnalyticsSummary): PublicAnalyticsStats {
  return {
    pageviews: summary.pageviews ?? 0,
    uniqueVisitors: summary.unique_visitors ?? 0
  };
}

function toAdminStats(summary: AnalyticsSummary, topPaths: TopPathRow[]): AdminAnalyticsStats {
  return {
    pageviews: summary.pageviews ?? 0,
    uniqueVisitors: summary.unique_visitors ?? 0,
    pageviewsToday: summary.pageviews_today ?? 0,
    uniqueVisitorsToday: summary.unique_visitors_today ?? 0,
    topPaths
  };
}

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`analytics:stats:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const url = new URL(request.url);
    const secretParam = url.searchParams.get("secret")?.trim();
    const headerSecret = request.headers.get("x-admin-secret")?.trim();
    const adminSecret = process.env.ADMIN_SECRET?.trim();
    const isAdmin =
      Boolean(adminSecret) &&
      (secretParam === adminSecret || headerSecret === adminSecret);

    const summary = await fetchAnalyticsSummary();
    if (!summary) {
      return NextResponse.json({ error: "Analytics not configured." }, { status: 503 });
    }

    if (isAdmin) {
      const topPaths = await fetchTopPaths(5);
      return NextResponse.json(toAdminStats(summary, topPaths));
    }

    return NextResponse.json(toPublicStats(summary));
  } catch (error) {
    console.error("[analytics/stats]", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}
