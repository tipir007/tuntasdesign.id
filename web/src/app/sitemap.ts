import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://designtuntas.vercel.app";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/order`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/lacak`, changeFrequency: "monthly", priority: 0.6 }
  ];
}
