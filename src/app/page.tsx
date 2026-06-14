import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatusBoard from "@/components/StatusBoard";
import TrustSection from "@/components/TrustSection";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main className="flex-1">
        <Hero />
        <StatusBoard />
        <TrustSection />
        <Services />
        <Pricing />
        <Process />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
