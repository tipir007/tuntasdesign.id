import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/data/services";

export default function Portfolio() {
  return (
    <section id="portofolio" className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Portofolio</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">Cuplikan karya.</h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Sample starter — mockup dan versi anonim. Karya klien ditampilkan hanya dengan izin;
          CV dan skripsi tanpa data pribadi.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO_ITEMS.map((item) => (
            <figure key={item.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={item.image}
                  alt={`${item.category}: ${item.title}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3">
                <p className="text-xs uppercase tracking-wider text-teal">{item.category}</p>
                <p className="font-display text-xl text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-ink/65">{item.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
