import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import DigitalTwinChat from "@/components/DigitalTwinChat";
import Portfolio from "@/components/Portfolio";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import Footer from "@/components/Footer";
import { BRAND } from "@/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://designtuntas.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND.name,
  description: BRAND.tagline,
  url: siteUrl,
  telephone: `+${BRAND.whatsappE164}`,
  areaServed: "Indonesia",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressCountry: "ID"
  },
  sameAs: [BRAND.instagramUrl],
  priceRange: "Rp 26.000+"
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <HowItWorks />
        <DigitalTwinChat />
        <Portfolio />
        <CtaWhatsApp />
      </main>
      <Footer />
    </>
  );
}
