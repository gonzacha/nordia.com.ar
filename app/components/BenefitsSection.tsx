"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  CalendarCheck,
  MessageCircleQuestion,
  UserCheck,
  Sparkles,
  HeartHandshake,
  Zap,
  ShieldCheck,
} from "lucide-react";

type BenefitTag = "Automatización" | "Personalización" | "Soporte";

type Benefit = {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: BenefitTag;
};

type BenefitsSectionProps = {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
};

const tagColors: Record<BenefitTag, string> = {
  Automatización: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Personalización: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Soporte: "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20",
};

const defaultBenefits: Benefit[] = [
  {
    title: "Atención 24/7 real",
    description: "Tu negocio responde a las 3am, los domingos y feriados. Nunca más pierdas un cliente porque no estabas disponible para contestar.",
    icon: <Clock className="w-8 h-8" />,
    tag: "Automatización",
  },
  {
    title: "Agenda turnos automáticamente",
    description: "La IA consulta tu disponibilidad, ofrece horarios y confirma reservas sin que toques el celular. El cliente elige y listo.",
    icon: <CalendarCheck className="w-8 h-8" />,
    tag: "Automatización",
  },
  {
    title: "Responde preguntas frecuentes",
    description: "Precios, horarios, ubicación, servicios. Todo lo que repetís mil veces ahora lo contesta la IA con la info exacta de tu negocio.",
    icon: <MessageCircleQuestion className="w-8 h-8" />,
    tag: "Automatización",
  },
  {
    title: "Deriva consultas complejas",
    description: "Cuando detecta algo que necesita tu atención personal, te avisa y transfiere la conversación. Vos decidís cuándo intervenir.",
    icon: <UserCheck className="w-8 h-8" />,
    tag: "Automatización",
  },
  {
    title: "Se adapta a tu tono",
    description: "¿Sos formal o más relajado? La IA aprende cómo hablás con tus clientes y responde como si fueras vos. Nadie nota la diferencia.",
    icon: <Sparkles className="w-8 h-8" />,
    tag: "Personalización",
  },
  {
    title: "Soporte 100% argentino",
    description: "Equipo local que entiende tu negocio, tu zona horaria y habla tu idioma. Nada de tickets en inglés ni esperas eternas.",
    icon: <HeartHandshake className="w-8 h-8" />,
    tag: "Soporte",
  },
  {
    title: "Setup en 48 horas",
    description: "Nos pasás la info de tu negocio, configuramos todo y en dos días ya tenés la IA respondiendo. Sin complicaciones técnicas de tu lado.",
    icon: <Zap className="w-8 h-8" />,
    tag: "Soporte",
  },
  {
    title: "Sin contratos ni permanencia",
    description: "Pagás mes a mes y cancelás cuando quieras. Sin letra chica, sin penalidades, sin ataduras. Si no te sirve, te vas y listo.",
    icon: <ShieldCheck className="w-8 h-8" />,
    tag: "Soporte",
  },
];

// Individual benefit item component with its own inView
function BenefitItem({
  benefit,
  index,
}: {
  benefit: Benefit;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  // Slide from left for odd, right for even
  const slideVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 lg:py-12 ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Icon side */}
        <div className="flex-shrink-0">
          <div className="relative">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#00ff88]"
            >
              {benefit.icon}
            </motion.div>
            {/* Number badge */}
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.4,
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-[#00ff88] text-neutral-900 rounded-full flex items-center justify-center text-sm font-bold"
            >
              {number}
            </motion.span>
          </div>
        </div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`flex-1 text-center lg:text-left ${!isEven && "lg:text-right"}`}
        >
          {/* Tag */}
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-4 ${
              tagColors[benefit.tag]
            }`}
          >
            {benefit.tag}
          </span>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
            {benefit.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {benefit.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Separator */}
      {index < defaultBenefits.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex justify-center origin-top"
        >
          <div className="w-px h-8 bg-gradient-to-b from-neutral-700 to-transparent" />
        </motion.div>
      )}
    </div>
  );
}

export default function BenefitsSection({
  title = "Todo lo que Nordia hace por tu negocio",
  subtitle = "Automatización inteligente que se adapta a vos",
  benefits = defaultBenefits,
}: BenefitsSectionProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-neutral-900 scroll-mt-20">
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

        {/* Benefits zig-zag */}
        <div className="max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
