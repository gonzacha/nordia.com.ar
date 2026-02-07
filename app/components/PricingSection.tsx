"use client";

type PricingSectionProps = {
  whatsappNumber?: string;
};

export default function PricingSection({
  whatsappNumber = "5493794281273",
}: PricingSectionProps) {
  const message = "Hola! Quiero información sobre la etapa de validación de Nordia";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">
          Etapa de validación
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-neutral-600 mb-8">
            Nordia está en fase de prueba con negocios reales. Si tu negocio
            tiene múltiples personas atendiendo WhatsApp y querés poner orden,
            hablemos. No hay costo durante la validación.
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}
