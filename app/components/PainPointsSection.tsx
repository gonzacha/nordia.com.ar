"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type PainPoint = {
  emoji: string;
  title: string;
  description: string;
  stat?: string;
};

type PainPointsSectionProps = {
  title?: string;
  subtitle?: string;
  painPoints: PainPoint[];
  closingPhrase?: string;
};

const defaultPainPoints: PainPoint[] = [
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
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const closingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PainPointsSection({
  title = "¿Te suena familiar?",
  subtitle = "Los problemas de siempre que nadie resuelve",
  painPoints = defaultPainPoints,
  closingPhrase = "¿Y si pudieras resolver todo esto por menos de lo que gastás en café al mes?",
}: PainPointsSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const closingRef = useRef(null);
  const isClosingInView = useInView(closingRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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

        {/* Pain points grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              className="group p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors duration-300 cursor-default"
            >
              {/* Emoji */}
              <motion.span
                className="text-4xl mb-4 block"
                whileHover={{
                  rotate: [0, -5, 5, -5, 5, 0],
                  transition: { duration: 0.5 },
                }}
              >
                {point.emoji}
              </motion.span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                {point.description}
              </p>

              {/* Stat */}
              {point.stat && (
                <motion.div
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="pt-4 border-t border-neutral-800"
                >
                  <p className="text-xs text-[#00ff88] font-medium">
                    📊 {point.stat}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Closing phrase */}
        <motion.div
          ref={closingRef}
          variants={closingVariants}
          initial="hidden"
          animate={isClosingInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl text-white font-medium max-w-2xl mx-auto">
            {closingPhrase}
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isClosingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
