"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "¿Qué es Nordia?",
    answer:
      "Un sistema conversacional determinístico que permite a tu negocio operar a través de WhatsApp. No es un bot genérico — tiene flujos definidos y cada acción es predecible."
  },
  {
    question: "¿Necesito instalar algo?",
    answer:
      "No. Nordia se conecta a tu WhatsApp Business. Seguís usando tu número de siempre."
  },
  {
    question: "¿Usa inteligencia artificial?",
    answer:
      "El core es determinístico, sin modelo de lenguaje. Cada respuesta está definida por reglas, no por un modelo que interpreta."
  },
  {
    question: "¿Para qué tipo de negocio es?",
    answer:
      "Para negocios con más de una persona atendiendo WhatsApp, o con múltiples sucursales. Si una sola persona maneja todo sin problemas, probablemente no lo necesitás todavía."
  },
  {
    question: "¿Tiene costo?",
    answer:
      "Estamos en etapa de validación. No hay costo mientras probamos juntos."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <span className="text-neutral-500">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-4">
                    <p className="text-neutral-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
