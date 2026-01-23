"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

type Stat = {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
};

type StatsSectionProps = {
  title?: string;
  stats?: Stat[];
};

const defaultStats: Stat[] = [
  {
    value: 48,
    suffix: "hs",
    label: "Setup completo",
    description: "De la firma al bot funcionando",
  },
  {
    value: "24/7",
    label: "Atención continua",
    description: "Todos los días, todo el año",
  },
  {
    value: 500,
    prefix: "+",
    label: "Conversaciones/mes",
    description: "Incluidas en cada plan",
  },
  {
    value: 0,
    suffix: "%",
    label: "Costo de contratación",
    description: "Sin sueldos ni cargas sociales",
  },
];

// CountUp component for animated numbers
function CountUpValue({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, motionValue]);

  // Format number with thousand separators
  const formattedValue = displayValue.toLocaleString("es-AR");

  return (
    <span ref={ref}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// Single stat item component
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const isNumeric = typeof stat.value === "number";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative text-center group"
    >
      {/* Decorative line for desktop */}
      {index < defaultStats.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-neutral-800 origin-left"
        />
      )}

      {/* Value */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-5xl lg:text-6xl font-bold text-[#00ff88] mb-2"
      >
        {isNumeric ? (
          <CountUpValue
            value={stat.value as number}
            prefix={stat.prefix}
            suffix={stat.suffix}
            duration={2}
          />
        ) : (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
          >
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </motion.span>
        )}
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        className="text-lg font-semibold text-white mb-1"
      >
        {stat.label}
      </motion.div>

      {/* Description */}
      {stat.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          className="text-sm text-neutral-500"
        >
          {stat.description}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function StatsSection({
  title,
  stats = defaultStats,
}: StatsSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-neutral-900 border-y border-neutral-800 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional title */}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-12"
          >
            {title}
          </motion.h2>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
