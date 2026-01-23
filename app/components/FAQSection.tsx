"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQCategory = "Técnico" | "Comercial" | "Funcional";

type FAQ = {
  category: FAQCategory;
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
  defaultOpenIndex?: number;
};

const defaultFaqs: FAQ[] = [
  // TÉCNICO
  {
    category: "Técnico",
    question: "¿Funciona con mi WhatsApp Business o necesito otro número?",
    answer: "Funciona con tu WhatsApp Business actual. No necesitás cambiar de número ni perder tus conversaciones anteriores. Vinculamos la IA a tu cuenta existente y listo. Tus clientes siguen escribiendo al mismo número de siempre.",
  },
  {
    category: "Técnico",
    question: "¿Es complicado el setup? No sé nada de tecnología.",
    answer: "Nosotros hacemos todo. Vos solo nos pasás la información de tu negocio (precios, horarios, servicios) y en 48 horas tenés la IA funcionando. No tocás código ni configuraciones raras. Si sabés usar WhatsApp, ya estás listo.",
  },
  {
    category: "Técnico",
    question: "¿Mis datos y conversaciones están seguros?",
    answer: "Totalmente. Usamos encriptación de extremo a extremo y servidores seguros. No compartimos tu información con terceros ni usamos tus datos para entrenar otros modelos. Las conversaciones son tuyas y de nadie más.",
  },
  {
    category: "Técnico",
    question: "¿Qué pasa si la IA no sabe responder algo?",
    answer: "La IA está entrenada para reconocer sus límites. Cuando detecta una consulta compleja o fuera de su conocimiento, te notifica y deriva la conversación para que vos la continúes. Nunca inventa respuestas ni deja al cliente colgado.",
  },
  // COMERCIAL
  {
    category: "Comercial",
    question: "¿Cuánto cuesta y qué incluye cada plan?",
    answer: "El Plan Founder sale $15.000 únicos por 3 meses completos, ideal para probar. El Plan Mensual es $18.000/mes con WhatsApp directo y funciones avanzadas. Ambos incluyen setup, entrenamiento personalizado y soporte. Sin costos ocultos.",
  },
  {
    category: "Comercial",
    question: "¿Puedo cancelar cuando quiera o hay permanencia?",
    answer: "Sin permanencia ni contratos largos. Cancelás cuando quieras desde tu panel o escribiéndonos. El servicio se corta al final del período pagado y listo. Sin penalidades, sin vueltas, sin retención forzada.",
  },
  {
    category: "Comercial",
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos transferencia bancaria, Mercado Pago, tarjetas de crédito y débito. Podés pagar en pesos argentinos sin drama. Te mandamos factura y todo prolijo para que lo tengas ordenado.",
  },
  {
    category: "Comercial",
    question: "¿Tienen soporte si tengo problemas o dudas?",
    answer: "Sí, soporte humano y argentino. Nada de bots respondiendo tus consultas (irónico, ¿no?). Nos escribís por WhatsApp o mail y te respondemos en horario comercial. Problemas urgentes los atendemos con prioridad.",
  },
  // FUNCIONAL
  {
    category: "Funcional",
    question: "¿Sirve para mi tipo de negocio o es solo para peluquerías?",
    answer: "Sirve para cualquier negocio que atienda clientes por WhatsApp: estéticas, barberías, consultorios, veterinarias, tiendas, restaurantes, profesionales independientes. Lo adaptamos a tu rubro específico y a cómo manejás tu negocio.",
  },
  {
    category: "Funcional",
    question: "¿Los clientes se dan cuenta de que es una IA?",
    answer: "La mayoría no. La IA responde de forma natural, con tu tono y estilo. Igual, si preferís ser transparente, podemos configurar un mensaje inicial que avise que es un asistente virtual. Vos decidís cómo manejarlo.",
  },
  {
    category: "Funcional",
    question: "¿Hay límite de mensajes o conversaciones por mes?",
    answer: "El plan incluye hasta 500 conversaciones mensuales, más que suficiente para la mayoría de PyMEs. Si tu negocio crece y necesitás más, tenemos opciones de escalar. Te avisamos antes de llegar al límite.",
  },
  {
    category: "Funcional",
    question: "¿Puedo cambiar las respuestas o entrenar más a la IA?",
    answer: "Sí, siempre. Nos mandás los ajustes que querés y actualizamos la IA. ¿Cambiaste precios? ¿Agregaste un servicio? Lo reflejamos rápido. La IA mejora constantemente con tu feedback y el uso real.",
  },
];

const categoryColors: Record<FAQCategory, string> = {
  Técnico: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Comercial: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Funcional: "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20",
};

// Animation variants
const answerVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

const iconVariants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
};

export default function FAQSection({
  title = "Preguntas frecuentes",
  subtitle = "Todo lo que necesitás saber antes de empezar",
  faqs = defaultFaqs,
  defaultOpenIndex = 0,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-neutral-950 scroll-mt-20" ref={sectionRef}>
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

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#00ff88]/30 bg-neutral-900"
                    : "border-neutral-800 bg-neutral-900/50"
                }`}
              >
                {/* Question button */}
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: "rgba(38, 38, 38, 0.8)" }}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Category badge */}
                    <span
                      className={`hidden sm:inline-flex flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border ${
                        categoryColors[faq.category]
                      }`}
                    >
                      {faq.category}
                    </span>

                    {/* Question text */}
                    <motion.span
                      animate={{ color: isOpen ? "#00ff88" : "#ffffff" }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {faq.question}
                    </motion.span>
                  </div>

                  {/* Toggle icon */}
                  <motion.div
                    variants={iconVariants}
                    animate={isOpen ? "expanded" : "collapsed"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#00ff88] text-neutral-900"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </motion.button>

                {/* Answer with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      variants={answerVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        {/* Mobile category badge */}
                        <span
                          className={`sm:hidden inline-flex mb-3 px-2.5 py-1 text-xs font-medium rounded-full border ${
                            categoryColors[faq.category]
                          }`}
                        >
                          {faq.category}
                        </span>

                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="text-neutral-400 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 mb-4">
            ¿Tenés otra pregunta que no está acá?
          </p>
          <motion.a
            href="https://wa.me/5493794281273?text=Hola!%20Tengo%20una%20consulta%20sobre%20Nordia"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-[#00ff88] hover:text-[#00ff88]/80 font-medium transition-colors"
          >
            Escribinos por WhatsApp →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
