"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function HowItWorks() {
  const { t } = useLocale();

  return (
    <section id="cara-kerja" className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">
          {t.howItWorks.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">{t.howItWorks.title}</h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.howItWorks.steps.map((step, index) => (
            <li key={step.title} className="relative pl-2">
              <span className="font-display text-4xl text-teal/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
