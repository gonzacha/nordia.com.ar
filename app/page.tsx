"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PainPointsSection from "./components/PainPointsSection";
import BenefitsSection from "./components/BenefitsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import StatsSection from "./components/StatsSection";
import ChatSimulator from "./components/ChatSimulator";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import ScrollProgress from "./components/ScrollProgress";

export default function LandingPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PHONE ?? "5493794281273";

  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-950">
      <ScrollProgress />
      <Header whatsappNumber={whatsappNumber} />

      <HeroSection
        headline="Tu negocio responde WhatsApp las 24 horas, sin contratar a nadie"
        subheadline="Inteligencia artificial entrenada para tu negocio. Responde consultas, agenda turnos y deriva lo complejo. Desde $15.000 por 3 meses."
        primaryCTA={{ text: "Empezar ahora", href: "#" }}
        secondaryCTA={{ text: "Ver demo", href: "#demo" }}
        whatsappNumber={whatsappNumber}
      />

      <PainPointsSection painPoints={[
        {
          emoji: "😩",
          title: "Mensajes que se acumulan sin responder",
          description: "Llegás al local y tenés 30 mensajes esperando. Algunos ya fueron a la competencia porque no contestaste a tiempo.",
          stat: "El 60% de los clientes espera respuesta en menos de 1 hora"
        },
        {
          emoji: "🔁",
          title: "Contestar lo mismo una y otra vez",
          description: "Horarios, precios, ubicación... Repetís las mismas respuestas 20 veces por día en lugar de atender clientes presenciales.",
          stat: "El 70% de las consultas son preguntas frecuentes"
        },
        {
          emoji: "🌙",
          title: "Perdés ventas fuera de horario",
          description: "A las 22hs alguien quiere reservar turno. A las 9am ya se olvidó o eligió otro lugar que sí le respondió.",
          stat: "35% de las consultas llegan fuera del horario comercial"
        },
        {
          emoji: "🤯",
          title: "No das abasto y te agotás",
          description: "Atendés clientes, contestás WhatsApp, cobrás, limpiás. El celular vibra y ya no sabés ni qué mensaje priorizar.",
          stat: "3 horas diarias promedio dedicadas solo a responder mensajes"
        },
        {
          emoji: "📉",
          title: "Clientes que no vuelven a escribir",
          description: "Tardaste en responder y el chat quedó muerto. No sabés cuántas ventas perdiste por respuestas lentas.",
          stat: "El 78% no vuelve a contactar si no recibe respuesta rápida"
        },
        {
          emoji: "💸",
          title: "Contratar alguien sale carísimo",
          description: "Un empleado para responder mensajes cuesta más de $300.000 mensuales entre sueldo, cargas sociales y capacitación.",
          stat: "Costo mínimo de un recepcionista: $350.000/mes"
        }
      ]} />

      <BenefitsSection />

      <StatsSection />

      <HowItWorksSection whatsappNumber={whatsappNumber} />

      <ChatSimulator />

      <PricingSection whatsappNumber={whatsappNumber} />

      <FAQSection />

      <FinalCTASection whatsappNumber={whatsappNumber} />

      <Footer whatsappNumber={whatsappNumber} />

      <FloatingWhatsAppButton phoneNumber={whatsappNumber} />
    </main>
  );
}
