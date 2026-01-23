"use client";

import { MessageCircle, Play, Shield, Clock, CreditCard } from "lucide-react";

type TrustElement = {
  icon: React.ReactNode;
  text: string;
};

type FinalCTASectionProps = {
  headline?: string;
  subheadline?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  trustElements?: TrustElement[];
  whatsappNumber?: string;
};

const defaultTrustElements: TrustElement[] = [
  { icon: <Shield className="w-5 h-5" />, text: "Garantía 15 días" },
  { icon: <Clock className="w-5 h-5" />, text: "Setup en 48hs" },
  { icon: <CreditCard className="w-5 h-5" />, text: "Sin permanencia" },
];

export default function FinalCTASection({
  headline = "¿Listo para dejar de perder clientes?",
  subheadline = "Empezá hoy y en 48 horas tu negocio responde solo. Sin riesgo: si no te convence, te devolvemos el 100%.",
  primaryButton = {
    text: "Quiero mi lugar",
    href: "#",
  },
  secondaryButton = {
    text: "Ver demo",
    href: "#demo",
  },
  trustElements = defaultTrustElements,
  whatsappNumber = "5493794281273",
}: FinalCTASectionProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola! Quiero empezar con Nordia WhatsApp IA"
  )}`;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 via-[#00ff88]/10 to-transparent" />
      <div className="absolute inset-0 bg-neutral-950" style={{ mixBlendMode: "multiply" }} />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff88]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
            </span>
            <span className="text-[#00ff88] text-sm font-medium">
              Solo quedan 12 lugares este mes
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-[#00ff88]/25"
            >
              <MessageCircle className="w-5 h-5" />
              {primaryButton.text}
            </a>

            <a
              href={secondaryButton.href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              {secondaryButton.text}
            </a>
          </div>

          {/* Trust elements */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {trustElements.map((element, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-neutral-400"
              >
                <span className="text-[#00ff88]">{element.icon}</span>
                <span className="text-sm">{element.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom trust badge */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <p className="text-neutral-500 text-sm">
              🔒 Pago seguro · 📧 Factura incluida · 🇦🇷 Soporte 100% argentino
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
