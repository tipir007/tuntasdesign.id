import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/data/services";

export default function Portfolio() {
  return (
    <section id="portofolio" className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Portofolio</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">Cuplikan karya.</h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Sample starter — versi anonim siap unduh. CV tersedia PDF; karya 3D tersedia
          gambar teknik, model, dan animasi.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO_ITEMS.map((item) => {
            const isRaster = /\.(png|jpe?g)$/i.test(item.image);
            const downloadHref =
              "pdf" in item && item.pdf
                ? item.pdf
                : item.category === "3D" && isRaster
                  ? item.image
                  : null;
            const downloadLabel = downloadHref?.endsWith(".pdf")
              ? "PDF"
              : downloadHref?.match(/\.jpe?g$/i)
                ? "JPG"
                : "PNG";
            const isTeknik = item.title.startsWith("Gambar Teknik");

            return (
            <figure key={item.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={item.image}
                  alt={`${item.category}: ${item.title}`}
                  fill
                  unoptimized={isRaster}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition duration-500 group-hover:scale-[1.03] ${
                    isTeknik ? "object-[60%_20%]" : "object-top"
                  }`}
                />
                {downloadHref ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-8 opacity-0 transition group-hover:opacity-100">
                    <a
                      href={downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={!downloadHref.endsWith(".pdf")}
                      className="block w-full rounded bg-teal px-3 py-2 text-center text-xs font-medium text-white transition hover:bg-teal/90"
                    >
                      Lihat &amp; Unduh {downloadLabel}
                    </a>
                  </div>
                ) : null}
              </div>
              <figcaption className="mt-3">
                <p className="text-xs uppercase tracking-wider text-teal">{item.category}</p>
                <p className="font-display text-xl text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-ink/65">{item.note}</p>
                {downloadHref ? (
                  <a
                    href={downloadHref}
                    download
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                  >
                    Unduh {downloadLabel}
                    <span aria-hidden="true">↓</span>
                  </a>
                ) : null}
              </figcaption>
            </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
