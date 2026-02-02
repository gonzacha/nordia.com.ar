"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LiveDemoSection from "./components/LiveDemoSection";
import ValueBullets from "./components/ValueBullets";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";

export default function LandingPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PHONE ?? "5493794281273";

  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-50">
      <Header whatsappNumber={whatsappNumber} />

      <HeroSection />

      <LiveDemoSection />

      <ValueBullets />

      <PricingSection whatsappNumber={whatsappNumber} />

      <FAQSection />

      <FinalCTASection whatsappNumber={whatsappNumber} />

      <Footer whatsappNumber={whatsappNumber} />
    </main>
  );
}
