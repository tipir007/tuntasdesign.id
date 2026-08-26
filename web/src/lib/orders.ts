export const ORDER_SERVICES = ["cv", "skripsi", "visual", "3d"] as const;
export type OrderService = (typeof ORDER_SERVICES)[number];

export const ORDER_STATUSES = ["baru", "diproses", "revisi", "selesai"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderRecord = {
  id: string;
  code: string;
  service: OrderService;
  name: string;
  contact: string;
  brief: string;
  deadline: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export function isOrderService(value: string): value is OrderService {
  return (ORDER_SERVICES as readonly string[]).includes(value);
}

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

export function generateOrderCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `DT-${suffix}`;
}

export function sanitizeOrderInput(body: unknown): {
  ok: true;
  data: {
    service: OrderService;
    name: string;
    contact: string;
    brief: string;
    deadline: string | null;
    honeypot: string;
  };
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Payload tidak valid." };
  }

  const raw = body as Record<string, unknown>;
  const service = String(raw.service || "").trim();
  const name = String(raw.name || "").trim().slice(0, 120);
  const contact = String(raw.contact || "").trim().slice(0, 120);
  const brief = String(raw.brief || "").trim().slice(0, 4000);
  const deadlineRaw = String(raw.deadline || "").trim().slice(0, 80);
  const honeypot = String(raw.website || "").trim();

  if (!isOrderService(service)) {
    return { ok: false, error: "Pilih layanan yang valid." };
  }
  if (name.length < 2) {
    return { ok: false, error: "Nama terlalu pendek." };
  }
  if (contact.length < 5) {
    return { ok: false, error: "Kontak (WhatsApp/email) wajib diisi." };
  }
  if (brief.length < 10) {
    return { ok: false, error: "Brief terlalu pendek (min. 10 karakter)." };
  }

  return {
    ok: true,
    data: {
      service,
      name,
      contact,
      brief,
      deadline: deadlineRaw || null,
      honeypot
    }
  };
}

export const SERVICE_LABELS: Record<OrderService, { id: string; en: string }> = {
  cv: { id: "Resume / CV", en: "Resume / CV" },
  skripsi: { id: "Skripsi", en: "Thesis" },
  visual: { id: "Design Visual", en: "Visual Design" },
  "3d": { id: "Design 3D", en: "3D Design" }
};

export const STATUS_LABELS: Record<OrderStatus, { id: string; en: string }> = {
  baru: { id: "Baru", en: "New" },
  diproses: { id: "Diproses", en: "In progress" },
  revisi: { id: "Revisi", en: "Revision" },
  selesai: { id: "Selesai", en: "Done" }
};
