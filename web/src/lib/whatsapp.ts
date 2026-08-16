import { BRAND } from "@/data/services";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${BRAND.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
