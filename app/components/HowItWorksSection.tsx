"use client";

import { Link, Brain, Bot, Settings, ArrowRight, MessageCircle } from "lucide-react";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  timeEstimate?: string;
};

type ProcessCTA = {
  headline: string;
  buttonText: string;
  subtext: string;
};

type HowItWorksSectionProps = {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
  cta?: ProcessCTA;
  whatsappNumber?: string;
};

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Conectamos tu WhatsApp Business",
    description: "Vinculamos la IA a tu número de WhatsApp Business en minutos. No necesitás conocimientos técnicos ni cambiar de número. Tu cuenta sigue siendo tuya.",
    icon: <Link className="w-6 h-6" />,
    timeEstimate: "15 minutos",
  },
  {
    number: "02",
    title: "Entrenamos la IA con tu info",
    description: "Nos pasás tus precios, servicios, horarios y forma de hablar. Configuramos respuestas personalizadas para que la IA suene como vos, no como un robot.",
    icon: <Brain className="w-6 h-6" />,
    timeEstimate: "24-48 horas",
  },
  {
    number: "03",
    title: "La IA empieza a responder",
    description: "Tu asistente virtual atiende consultas, responde preguntas frecuentes y agenda turnos automáticamente. Vos seguís con tu trabajo mientras ella se encarga.",
    icon: <Bot className="w-6 h-6" />,
    timeEstimate: "Inmediato",
  },
  {
    number: "04",
    title: "Vos supervisás y mejoramos juntos",
    description: "Revisás las conversaciones cuando quieras, ajustamos respuestas según tu feedback y la IA aprende cada vez más sobre tu negocio. Mejora continua garantizada.",
    icon: <Settings className="w-6 h-6" />,
    timeEstimate: "Continuo",
  },
];

const defaultCTA: ProcessCTA = {
  headline: "¿Listo para automatizar tu WhatsApp?",
  buttonText: "Empezar ahora",
  subtext: "Setup en 48hs · Sin compromisos",
};

export default function HowItWorksSection({
  title = "Cómo funciona",
  subtitle = "En 4 simples pasos tenés tu IA funcionando",
  steps = defaultSteps,
  cta = defaultCTA,
  whatsappNumber = "5493794281273",
}: HowItWorksSectionProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola! Quiero empezar con Nordia WhatsApp IA"
  )}`;

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-neutral-950 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">
            {subtitle}
          </p>
        </div>

        {/* Timeline - Desktop horizontal */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-700" />

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Circle with number */}
                <div className="relative z-10 w-32 h-32 rounded-full bg-neutral-900 border-2 border-neutral-700 flex flex-col items-center justify-center mb-6 group hover:border-[#00ff88] transition-colors duration-300">
                  <span className="text-[#00ff88] mb-1">{step.icon}</span>
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>

                {/* Time estimate badge */}
                {step.timeEstimate && (
                  <span className="inline-block px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs font-medium rounded-full mb-4">
                    {step.timeEstimate}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile vertical */}
        <div className="lg:hidden relative max-w-md mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Circle with number */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-neutral-900 border-2 border-neutral-700 flex flex-col items-center justify-center">
                  <span className="text-[#00ff88] text-sm">{step.icon}</span>
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  {/* Time estimate badge */}
                  {step.timeEstimate && (
                    <span className="inline-block px-2 py-0.5 bg-[#00ff88]/10 text-[#00ff88] text-xs font-medium rounded-full mb-2">
                      {step.timeEstimate}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {cta.headline}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {cta.buttonText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-4 text-neutral-500 text-sm">
            {cta.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
