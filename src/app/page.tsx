import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatusBoard from "@/components/StatusBoard";
import TrustSection from "@/components/TrustSection";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatusBoard />
        <TrustSection />
        <Services />
        <Process />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
