import { PORTFOLIO_ITEMS } from "@/data/services";

export default function Portfolio() {
  return (
    <section id="portofolio" className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Portofolio</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">Cuplikan karya.</h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Placeholder visual — akan diganti contoh asli (dengan izin klien; CV/skripsi tetap
          anonim).
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO_ITEMS.map((item) => (
            <figure
              key={item.title}
              className="portfolio-tile flex min-h-48 flex-col justify-end p-5 text-paper"
            >
              <p className="text-xs uppercase tracking-wider text-paper/70">{item.category}</p>
              <figcaption className="mt-1 font-display text-2xl">{item.title}</figcaption>
              <p className="mt-1 text-sm text-paper/75">{item.note}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
