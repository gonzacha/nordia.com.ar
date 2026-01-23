"use client";

type Stat = {
  value: string;
  label: string;
  description?: string;
};

type StatsSectionProps = {
  title?: string;
  stats?: Stat[];
};

const defaultStats: Stat[] = [
  {
    value: "48hs",
    label: "Setup completo",
    description: "De la firma al bot funcionando",
  },
  {
    value: "24/7",
    label: "Atención continua",
    description: "Todos los días, todo el año",
  },
  {
    value: "+500",
    label: "Conversaciones/mes",
    description: "Incluidas en cada plan",
  },
  {
    value: "0%",
    label: "Costo de contratación",
    description: "Sin sueldos ni cargas sociales",
  },
];

export default function StatsSection({
  title,
  stats = defaultStats,
}: StatsSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-neutral-900 border-y border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional title */}
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            {title}
          </h2>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Decorative line for desktop */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-neutral-800" />
              )}

              {/* Value */}
              <div className="text-5xl lg:text-6xl font-bold text-[#00ff88] mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <div className="text-sm text-neutral-500">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
