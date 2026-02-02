"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "¿Necesito instalar algo?",
    answer: "No, nosotros configuramos todo por vos."
  },
  {
    question: "¿Funciona en mi WhatsApp?",
    answer: "Sí, funciona con tu cuenta de WhatsApp Business actual."
  },
  {
    question: "¿Puedo editar servicios luego?",
    answer: "Sí, podés actualizar servicios y precios cuando quieras."
  },
  {
    question: "¿Cuánto tarda el setup?",
    answer: "48 horas desde que confirmás."
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
