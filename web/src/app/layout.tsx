import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"]
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://designtuntas.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "designtuntas.id — Desain & dokumen, sampai tuntas",
    template: "%s | designtuntas.id"
  },
  description:
    "Resume CV, konsultasi skripsi, design visual, dan design 3D. Tanya Tuti AI atau order via WhatsApp. Bogor, online se-Indonesia.",
  keywords: [
    "jasa cv",
    "buat cv",
    "konsultasi skripsi",
    "design visual",
    "design 3D",
    "designtuntas",
    "bogor"
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "designtuntas.id — Desain & dokumen, sampai tuntas",
    description: "CV · Skripsi · Visual · 3D. Tanya Tuti AI atau chat WhatsApp 088901178816.",
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "designtuntas.id"
  },
  twitter: {
    card: "summary_large_image",
    title: "designtuntas.id",
    description: "Desain & dokumen, sampai tuntas."
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/marketing/logo-designtuntas.png",
    apple: "/marketing/logo-designtuntas.png"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
