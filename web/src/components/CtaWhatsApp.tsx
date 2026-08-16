import { BRAND } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

export default function CtaWhatsApp() {
  return (
    <section className="bg-ink px-5 py-20 text-paper md:px-8 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl md:text-5xl">Siap lanjut sampai tuntas?</h2>
          <p className="mt-4 text-paper/75">
            Chat WhatsApp {BRAND.whatsappDisplay} · jam {BRAND.hours}. Atau tanya Tuti AI dulu di
            atas.
          </p>
        </div>
        <a
          href={whatsappUrl("Halo DesignTuntas, saya siap order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-teal-bright"
        >
          Buka WhatsApp
        </a>
      </div>
    </section>
  );
}
