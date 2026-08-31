"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND } from "@/data/services";
import { useLocale } from "@/components/LocaleProvider";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/data/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "/#layanan", label: t.nav.services },
    { href: "/#harga", label: t.nav.pricing },
    { href: "/#cara-kerja", label: t.nav.howItWorks },
    { href: "/#tuti", label: t.nav.tuti },
    { href: "/#portofolio", label: t.nav.portfolio },
    { href: "/order", label: locale === "en" ? "Order" : "Order" },
    { href: "/lacak", label: locale === "en" ? "Track" : "Lacak" }
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-ink/10 bg-paper/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-8">
        <a href="/#beranda" className="flex items-center gap-2.5">
          <Image
            src={BRAND.logo}
            alt={BRAND.logoAlt}
            width={40}
            height={40}
            className="h-9 w-9 rounded-lg object-cover object-center"
            priority
          />
          <span className="font-display text-xl tracking-tight text-ink md:text-2xl">{BRAND.name}</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-ink/75 lg:flex">
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
                onClick={() => setLocale(code)}
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
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-teal sm:inline-flex"
          >
            {t.nav.whatsapp}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-ink transition ${menuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-ink/10 bg-paper px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base text-ink transition hover:bg-sand"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl(
                locale === "en"
                  ? "Hi DesignTuntas, I would like to consult about your services."
                  : "Halo DesignTuntas, saya ingin konsultasi layanan."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-paper"
            >
              {t.nav.whatsapp}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
