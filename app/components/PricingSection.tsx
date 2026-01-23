"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import PricingCard from "./PricingCard";

type PricingFeature = {
  text: string;
  included: boolean;
};

type PricingPlan = {
  id: string;
  badge: string;
  title: string;
  description: string;
  price: string;
  priceDetail: string;
  features: PricingFeature[];
  note: string;
  ctaText: string;
  valueComparison: string;
  highlighted: boolean;
};

type GlobalGuarantee = {
  title: string;
  description: string;
};

type PricingSectionProps = {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  guarantee?: GlobalGuarantee;
  whatsappNumber?: string;
};

const defaultPlans: PricingPlan[] = [
  {
    id: "founder",
    badge: "🚀 Oferta Fundadores",
    title: "Plan Founder",
    description: "Para negocios que quieren probar la IA con mínimo riesgo y máximo ahorro.",
    price: "$15.000",
    priceDetail: "pago único por 3 meses",
    features: [
      { text: "IA entrenada para tu negocio", included: true },
      { text: "Respuestas automáticas 24/7", included: true },
      { text: "Hasta 500 conversaciones/mes", included: true },
      { text: "Soporte por email", included: true },
      { text: "Setup en 48 horas", included: true },
      { text: "Integración WhatsApp directa", included: false },
    ],
    note: "Precio especial para los primeros 50 clientes. Una vez que se llenen los cupos, este plan no estará más disponible.",
    ctaText: "Asegurar precio Founder",
    valueComparison: "Equivale a $5.000/mes → 60 veces más barato que un empleado",
    highlighted: true,
  },
  {
    id: "monthly",
    badge: "⭐ Más popular",
    title: "Plan Mensual",
    description: "Para negocios que ya validaron y quieren potencia completa sin límites.",
    price: "$18.000",
    priceDetail: "por mes",
    features: [
      { text: "IA entrenada para tu negocio", included: true },
      { text: "Respuestas automáticas 24/7", included: true },
      { text: "Conversaciones ilimitadas", included: true },
      { text: "Soporte prioritario WhatsApp", included: true },
      { text: "Setup en 48 horas", included: true },
      { text: "Integración WhatsApp directa", included: true },
    ],
    note: "Sin permanencia mínima. Cancelás cuando quieras y el servicio se mantiene hasta fin del mes pagado.",
    ctaText: "Empezar Plan Mensual",
    valueComparison: "Menos de $600/día → Lo que cuesta un café con medialunas",
    highlighted: false,
  },
];

const defaultGuarantee: GlobalGuarantee = {
  title: "Garantía de satisfacción 15 días",
  description: "Probá Nordia sin riesgo. Si en los primeros 15 días no estás conforme con el servicio, te devolvemos el 100% de tu dinero. Sin preguntas, sin vueltas.",
};

export default function PricingSection({
  title = "Planes simples, sin sorpresas",
  subtitle = "Elegí el que mejor se adapte a tu negocio",
  plans = defaultPlans,
  guarantee = defaultGuarantee,
  whatsappNumber = "5493794281273",
}: PricingSectionProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const guaranteeRef = useRef(null);
  const isGuaranteeInView = useInView(guaranteeRef, { once: true, amount: 0.5 });

  const getCtaHref = (planId: string) => {
    const message = planId === "founder"
      ? "Hola! Quiero contratar el Plan Founder de Nordia"
      : "Hola! Quiero contratar el Plan Mensual de Nordia";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-neutral-900 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">
            {subtitle}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              badge={plan.badge}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              priceDetail={plan.priceDetail}
              features={plan.features}
              note={plan.note}
              ctaText={plan.ctaText}
              valueComparison={plan.valueComparison}
              highlighted={plan.highlighted}
              ctaHref={getCtaHref(plan.id)}
              index={index}
            />
          ))}
        </div>

        {/* Global guarantee */}
        <motion.div
          ref={guaranteeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isGuaranteeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isGuaranteeInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.5,
              }}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center"
            >
              <ShieldCheck className="w-7 h-7 text-[#00ff88]" />
            </motion.div>
            <div className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-1">{guarantee.title}</h4>
              <p className="text-neutral-400 text-sm">{guarantee.description}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
