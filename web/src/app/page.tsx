import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import DigitalTwinChat from "@/components/DigitalTwinChat";
import Portfolio from "@/components/Portfolio";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
