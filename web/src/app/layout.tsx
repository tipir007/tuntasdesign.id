import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"]
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "designtuntas.id — Desain & dokumen, sampai tuntas",
  description:
    "Resume CV, konsultasi skripsi, design visual, dan design 3D. Tanya Tuti AI atau order via WhatsApp.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "designtuntas.id",
    description: "Siap menyelesaikan masalah Anda sampai tuntas.",
    type: "website"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
