"use client";

import { BRAND, SERVICES } from "@/data/services";
import { useLocale } from "@/components/LocaleProvider";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-ink/10 bg-paper px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ink">{BRAND.name}</p>
          <p className="mt-2 text-sm text-ink/65">{t.brand.tagline}</p>
          <p className="mt-3 text-sm text-ink/55">{t.brand.location}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t.footer.services}</p>
          <ul className="mt-3 space-y-1 text-sm text-ink/65">
            {SERVICES.map((s) => (
              <li key={s.id}>{t.services.items[s.id].title}</li>
            ))}
            <li>
              <a href="#harga" className="hover:text-teal">
                {t.footer.priceList}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t.footer.contact}</p>
          <ul className="mt-3 space-y-1 text-sm text-ink/65">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal"
              >
                WA {BRAND.whatsappDisplay}
              </a>
            </li>
            {BRAND.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="hover:text-teal">
                  {email}
                </a>
              </li>
            ))}
            <li>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal"
              >
                Instagram @{BRAND.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink/45">
        © {new Date().getFullYear()} {BRAND.name}. {t.footer.rights}
      </p>
    </footer>
  );
}
