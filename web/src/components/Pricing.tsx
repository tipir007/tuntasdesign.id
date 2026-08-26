"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Pricing() {
  const { locale, t } = useLocale();
  const groups = t.pricing.groups;
  const [activeId, setActiveId] = useState(groups[0].id);

  useEffect(() => {
    setActiveId(t.pricing.groups[0].id);
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps -- reset tab when language changes

  const group = groups.find((item) => item.id === activeId) ?? groups[0];

  return (
    <section id="harga" className="bg-sand px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">{t.pricing.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink md:text-5xl">{t.pricing.title}</h2>
        <p className="mt-4 max-w-2xl text-ink/70">{t.pricing.intro}</p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {groups.map((item) => {
            const active = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-ink text-paper" : "bg-paper text-ink/70 hover:text-ink"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="mt-8 border-t border-ink/15 pt-8">
          <p className="text-sm text-teal">{group.duration}</p>

          <div className="mt-6 space-y-10">
            {group.tables.map((table) => (
              <div key={table.heading ?? group.id}>
                {table.heading ? (
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink/50">
                    {table.heading}
                  </h3>
                ) : null}
                <ul>
                  {table.rows.map((row) => (
                    <li
                      key={row.item}
                      className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3"
                    >
                      <span className="text-sm text-ink/80 md:text-base">{row.item}</span>
                      <span className="shrink-0 text-sm font-semibold text-ink md:text-base">
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {group.notes?.length ? (
            <ul className="mt-6 space-y-1 text-sm text-ink/60">
              {group.notes.map((note) => (
                <li key={note}>— {note}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <ul className="space-y-1 text-sm text-ink/70">
            {t.pricing.policies.map((policy) => (
              <li key={policy}>— {policy}</li>
            ))}
          </ul>
          <a
            href={whatsappUrl(t.pricing.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-teal"
          >
            {t.pricing.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
