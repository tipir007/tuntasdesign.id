import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "designtuntas.id — Desain & dokumen, sampai tuntas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0c1f24 0%, #132830 55%, #0c1f24 100%)",
          color: "#f5f0e8"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#1a9b8e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#0c1f24"
            }}
          >
            DT
          </div>
          <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.85 }}>DESIGNTUNTAS.ID</div>
        </div>
        <div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 900
            }}
          >
            Desain & dokumen, sampai tuntas.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "#8fd9d0",
              maxWidth: 820,
              lineHeight: 1.35
            }}
          >
            CV · Skripsi · Visual · 3D — Tanya Tuti AI atau order via WhatsApp
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 24, opacity: 0.7 }}>
          <span>088901178816</span>
          <span>designtuntas.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
