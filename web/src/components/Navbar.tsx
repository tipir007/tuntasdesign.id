"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

const links = [
  { href: "#layanan", label: "Layanan" },
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#tuti", label: "Tuti AI" },
  { href: "#portofolio", label: "Portofolio" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#beranda" className="font-display text-xl tracking-tight text-ink md:text-2xl">
          {BRAND.name}
        </a>
        <nav className="hidden items-center gap-6 text-sm text-ink/75 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-teal">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappUrl("Halo DesignTuntas, saya ingin konsultasi layanan.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-teal"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
