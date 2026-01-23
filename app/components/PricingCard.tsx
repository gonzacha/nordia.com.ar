"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type PricingFeature = {
  text: string;
  included: boolean;
};

type PricingCardProps = {
  badge: string;
  title: string;
  description: string;
  price: string;
  priceDetail: string;
  features: PricingFeature[];
  note: string;
  ctaText: string;
  valueComparison: string;
  highlighted?: boolean;
  ctaHref?: string;
  index?: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (highlighted: boolean) => ({
    opacity: 1,
    y: 0,
    scale: highlighted ? 1.05 : 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      scale: highlighted
        ? {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }
        : undefined,
    },
  }),
};

export default function PricingCard({
  badge,
  title,
  description,
  price,
  priceDetail,
  features,
  note,
  ctaText,
  valueComparison,
  highlighted = false,
  ctaHref = "#",
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={highlighted}
      whileHover={!highlighted ? { y: -8, transition: { duration: 0.2 } } : {}}
      className={`relative flex flex-col p-8 rounded-3xl transition-colors duration-300 ${
        highlighted
          ? "bg-neutral-900 border-2 border-[#00ff88] shadow-xl shadow-[#00ff88]/10"
          : "bg-neutral-900 border border-neutral-800 hover:border-neutral-700"
      }`}
    >
      {/* Glow effect for highlighted */}
      {highlighted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#00ff88]/20 to-transparent blur-xl -z-10"
        />
      )}

      {/* Badge */}
      <motion.div
        initial={{ scale: 0, y: 10 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          delay: 0.3 + index * 0.1,
        }}
        className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
          highlighted
            ? "bg-[#00ff88] text-neutral-900"
            : "bg-neutral-800 text-white border border-neutral-700"
        }`}
      >
        {highlighted && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#00ff88]"
            style={{ zIndex: -1 }}
          />
        )}
        <span className="relative">{badge}</span>
      </motion.div>

      {/* Header */}
      <div className="text-center pt-4 pb-6 border-b border-neutral-800">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="py-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-baseline justify-center gap-1"
        >
          <span className="text-5xl font-bold text-white">{price}</span>
        </motion.div>
        <p className="text-neutral-400 mt-2">{priceDetail}</p>
        <p className="text-[#00ff88] text-sm mt-3 font-medium">{valueComparison}</p>
      </div>

      {/* Features */}
      <ul className="space-y-4 flex-1 py-6 border-t border-neutral-800">
        {features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + featureIndex * 0.08 }}
            className="flex items-start gap-3"
          >
            {feature.included ? (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-[#00ff88]" />
              </div>
            ) : (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center mt-0.5">
                <X className="w-3 h-3 text-neutral-600" />
              </div>
            )}
            <span
              className={`text-sm ${
                feature.included ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              {feature.text}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Note */}
      <p className="text-xs text-neutral-500 text-center py-4 border-t border-neutral-800">
        {note}
      </p>

      {/* CTA */}
      <motion.a
        href={ctaHref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`block w-full py-4 px-6 rounded-xl text-center font-semibold ${
          highlighted
            ? "bg-[#00ff88] text-neutral-900 hover:bg-[#00ff88]/90"
            : "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
        }`}
      >
        {ctaText}
      </motion.a>
    </motion.div>
  );
}
