"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type PublicStats = {
  pageviews: number;
  uniqueVisitors: number;
};

export default function VisitorCounter() {
  const { t } = useLocale();
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/analytics/stats")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PublicStats | null) => {
        if (!cancelled && data) setStats(data);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  return (
    <p className="mx-auto mt-3 max-w-6xl text-center text-xs text-ink/40">
      {t.footer.visitorStats(stats.uniqueVisitors, stats.pageviews)}
    </p>
  );
}
