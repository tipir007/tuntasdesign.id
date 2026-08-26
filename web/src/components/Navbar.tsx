"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/data/services";
import { useLocale } from "@/components/LocaleProvider";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/data/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#layanan", label: t.nav.services },
    { href: "#harga", label: t.nav.pricing },
    { href: "#cara-kerja", label: t.nav.howItWorks },
    { href: "#tuti", label: t.nav.tuti },
    { href: "#portofolio", label: t.nav.portfolio }
  ];

  const switchLocale = (next: Locale) => {
    setLocale(next);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-8">
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
        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-ink/15 bg-paper/80 p-0.5 text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            {(["id", "en"] as Locale[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLocale(code)}
                className={`rounded-full px-2.5 py-1 uppercase transition ${
                  locale === code ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
                }`}
                aria-pressed={locale === code}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href={whatsappUrl(
              locale === "en"
                ? "Hi DesignTuntas, I would like to consult about your services."
                : "Halo DesignTuntas, saya ingin konsultasi layanan."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-teal"
          >
            {t.nav.whatsapp}
          </a>
        </div>
      </div>
    </header>
  );
}
