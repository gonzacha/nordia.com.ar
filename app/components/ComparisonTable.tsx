"use client";

import { Check, X, Minus } from "lucide-react";

type CompetitorValue = {
  value: string;
  status: "positive" | "neutral" | "negative";
};

type ComparisonFeature = {
  feature: string;
  nordia: CompetitorValue;
  competitors: {
    name: string;
    value: string;
    status: "positive" | "neutral" | "negative";
  }[];
};

type ComparisonTableProps = {
  title?: string;
  subtitle?: string;
  features?: ComparisonFeature[];
  footnote?: string;
};

const defaultFeatures: ComparisonFeature[] = [
  {
    feature: "Precio mensual",
    nordia: { value: "Desde $5.000/mes", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Desde USD $99/mes", status: "negative" },
      { name: "Cliengo", value: "Desde USD $79/mes", status: "negative" },
    ],
  },
  {
    feature: "Tiempo de setup",
    nordia: { value: "48 horas", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "1-2 semanas", status: "neutral" },
      { name: "Cliengo", value: "1-2 semanas", status: "neutral" },
    ],
  },
  {
    feature: "Soporte en español",
    nordia: { value: "Argentino, por WhatsApp", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Limitado", status: "neutral" },
      { name: "Cliengo", value: "Latam genérico", status: "neutral" },
    ],
  },
  {
    feature: "Especializado en PyMEs",
    nordia: { value: "100% pensado para locales", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Empresas medianas", status: "negative" },
      { name: "Cliengo", value: "Enfoque corporativo", status: "negative" },
    ],
  },
  {
    feature: "Cancelación",
    nordia: { value: "Sin permanencia", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Contratos anuales", status: "negative" },
      { name: "Cliengo", value: "Permanencia mínima", status: "negative" },
    ],
  },
  {
    feature: "Costo implementación",
    nordia: { value: "$0 incluido", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "USD $500+", status: "negative" },
      { name: "Cliengo", value: "USD $300+", status: "negative" },
    ],
  },
  {
    feature: "Personalización de tono",
    nordia: { value: "Suena como vos", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Plantillas", status: "neutral" },
      { name: "Cliengo", value: "Plantillas", status: "neutral" },
    ],
  },
  {
    feature: "Curva de aprendizaje",
    nordia: { value: "Cero, lo hacemos nosotros", status: "positive" },
    competitors: [
      { name: "Botmaker", value: "Requiere capacitación", status: "neutral" },
      { name: "Cliengo", value: "Requiere capacitación", status: "neutral" },
    ],
  },
];

const StatusIcon = ({ status }: { status: "positive" | "neutral" | "negative" }) => {
  if (status === "positive") {
    return (
      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00ff88]/20">
        <Check className="w-3 h-3 text-[#00ff88]" />
      </div>
    );
  }
  if (status === "negative") {
    return (
      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20">
        <X className="w-3 h-3 text-red-400" />
      </div>
    );
  }
  return (
    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/20">
      <Minus className="w-3 h-3 text-yellow-400" />
    </div>
  );
};

export default function ComparisonTable({
  title = "¿Por qué elegir Nordia?",
  subtitle = "Comparamos con las alternativas más conocidas del mercado",
  features = defaultFeatures,
  footnote = "Precios relevados en enero 2025. Las funcionalidades y precios de competidores pueden variar.",
}: ComparisonTableProps) {
  // Get competitor names from first feature
  const competitorNames = features[0]?.competitors.map((c) => c.name) || [];

  return (
    <section className="py-20 lg:py-28 bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">{subtitle}</p>
        </div>

        {/* Table wrapper with horizontal scroll on mobile */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="min-w-[640px]">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-neutral-400 font-medium text-sm">
                    Característica
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center">
                        <span className="text-neutral-900 font-bold">N</span>
                      </div>
                      <span className="text-[#00ff88] font-semibold">Nordia</span>
                    </div>
                  </th>
                  {competitorNames.map((name) => (
                    <th key={name} className="py-4 px-4 text-center">
                      <div className="inline-flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                          <span className="text-neutral-400 font-bold text-sm">
                            {name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-neutral-400 font-medium">{name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`border-t border-neutral-800 ${
                      index % 2 === 0 ? "bg-neutral-900/50" : "bg-transparent"
                    }`}
                  >
                    {/* Feature name */}
                    <td className="py-4 px-4 text-white font-medium">
                      {feature.feature}
                    </td>

                    {/* Nordia column - highlighted */}
                    <td className="py-4 px-4 bg-[#00ff88]/5 border-x border-[#00ff88]/20">
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon status={feature.nordia.status} />
                        <span className="text-white text-sm text-center">
                          {feature.nordia.value}
                        </span>
                      </div>
                    </td>

                    {/* Competitor columns */}
                    {feature.competitors.map((competitor, cIndex) => (
                      <td key={cIndex} className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <StatusIcon status={competitor.status} />
                          <span className="text-neutral-400 text-sm text-center">
                            {competitor.value}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="flex justify-center mt-4 lg:hidden">
          <p className="text-neutral-500 text-xs flex items-center gap-2">
            <span>←</span>
            Deslizá para ver más
            <span>→</span>
          </p>
        </div>

        {/* Footnote */}
        <p className="text-center text-neutral-500 text-xs mt-8 max-w-2xl mx-auto">
          {footnote}
        </p>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
          >
            Ver planes y precios
          </a>
        </div>
      </div>
    </section>
  );
}
