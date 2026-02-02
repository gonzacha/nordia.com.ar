"use client";

type PricingSectionProps = {
  whatsappNumber?: string;
};

export default function PricingSection({
  whatsappNumber = "5493794281273",
}: PricingSectionProps) {
  const plans = [
    {
      name: "Founder",
      price: "$15.000",
      period: "/ 3 meses",
      note: "Cupo limitado",
      message: "Hola! Quiero información sobre el plan Founder"
    },
    {
      name: "Starter",
      price: "$18.000",
      period: "/ mes",
      note: null,
      message: "Hola! Quiero información sobre el plan Starter"
    }
  ];

  const features = [
    "Bot WhatsApp",
    "Servicios",
    "Turnos",
    "Soporte básico"
  ];

  return (
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
          Planes simples
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(plan.message)}`;

            return (
              <div key={plan.name} className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {plan.name}
                </h3>

                {plan.note && (
                  <p className="text-sm text-neutral-600 mb-4">{plan.note}</p>
                )}

                <div className="text-4xl font-bold text-neutral-900 mb-6">
                  {plan.price}<span className="text-lg font-normal text-neutral-600"> {plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="text-neutral-700">
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors text-center"
                >
                  Contratar
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
