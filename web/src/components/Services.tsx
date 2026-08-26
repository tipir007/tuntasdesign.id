"use client";

import { SERVICES } from "@/data/services";
import { useLocale } from "@/components/LocaleProvider";

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="layanan" className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">{t.services.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink md:text-5xl">{t.services.title}</h2>
        <p className="mt-4 max-w-2xl text-ink/70">{t.services.intro}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const copy = t.services.items[service.id];
            return (
              <article
                key={service.id}
                className="group border-t border-ink/15 pt-6 transition hover:border-teal"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-ink md:text-3xl">{copy.title}</h3>
                  <span className="text-xs text-ink/40">0{index + 1}</span>
                </div>
                <p className="mt-3 text-ink/75">{copy.summary}</p>
                <p className="mt-4 text-sm text-teal">
                  {copy.priceFrom} · {copy.duration}
                </p>
                <ul className="mt-4 space-y-1 text-sm text-ink/65">
                  {copy.highlights.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
