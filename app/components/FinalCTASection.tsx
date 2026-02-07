"use client";

import { MessageCircle, Play } from "lucide-react";

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
  whatsappNumber?: string;
};

export default function FinalCTASection({
  headline = "¿Tu negocio opera por WhatsApp sin sistema?",
  subheadline = "Estamos buscando negocios reales para validar Nordia. Sin costo, sin compromiso.",
  primaryButton = {
    text: "Hablemos",
    href: "#",
  },
  secondaryButton = {
    text: "Ver cómo funciona",
    href: "/new",
  },
  whatsappNumber = "5493794281273",
}: FinalCTASectionProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola! Quiero empezar con Nordia WhatsApp IA"
  )}`;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 via-transparent to-[#00ff88]/5" />
      <div className="absolute inset-0 bg-white" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            {headline}
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
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
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-neutral-300 text-neutral-900 font-semibold rounded-xl hover:border-[#00ff88] hover:bg-neutral-50 hover:scale-105 transition-all duration-200 shadow-md"
            >
              <Play className="w-5 h-5" />
              {secondaryButton.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
