import { BRAND } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 hero-canvas" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-paper" aria-hidden />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="animate-fade-up mb-3 font-display text-4xl text-paper md:text-6xl lg:text-7xl">
          {BRAND.name}
        </p>
        <h1 className="animate-fade-up delay-1 max-w-2xl text-2xl font-medium leading-snug text-paper/95 md:text-4xl">
          Desain & dokumen, sampai tuntas.
        </h1>
        <p className="animate-fade-up delay-2 mt-4 max-w-xl text-base text-paper/80 md:text-lg">
          {BRAND.tagline} Resume CV, bantuan skripsi, design visual, dan design 3D — satu pintu,
          proses jelas.
        </p>
        <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Halo, saya ingin order layanan designtuntas.id.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink transition hover:bg-teal-bright"
          >
            Chat WhatsApp
          </a>
          <a
            href="#tuti"
            className="rounded-full border border-paper/40 bg-paper/10 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition hover:bg-paper/20"
          >
            Tanya Tuti AI
          </a>
        </div>
      </div>
    </section>
  );
}
