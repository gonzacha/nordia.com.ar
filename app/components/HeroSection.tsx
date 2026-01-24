"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Clock, Shield, Zap } from "lucide-react";

type TrustBadge = {
  icon: React.ReactNode;
  text: string;
};

type HeroSectionProps = {
  preheadline?: string;
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  trustBadges?: TrustBadge[];
  whatsappNumber: string;
};

const defaultTrustBadges: TrustBadge[] = [
  { icon: <Clock className="w-4 h-4" />, text: "Setup en 48hs" },
  { icon: <Shield className="w-4 h-4" />, text: "15 días de garantía" },
  { icon: <Zap className="w-4 h-4" />, text: "Sin permanencia" },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInDown = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HeroSection({
  preheadline = "Nordia WhatsApp IA",
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  trustBadges = defaultTrustBadges,
  whatsappNumber,
}: HeroSectionProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola! Quiero información sobre Nordia WhatsApp IA"
  )}`;

  return (
    <section className="relative min-h-0 md:min-h-[90vh] flex items-center py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Content (order-2 on mobile to show phone first) */}
          <div className="order-2 lg:order-1 flex flex-col space-y-4 md:space-y-6 text-center lg:text-left">
            {/* Preheadline - hidden on mobile */}
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:inline-flex items-center justify-center lg:justify-start"
            >
              <span className="px-4 py-1.5 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[#00ff88] text-sm font-medium">
                {preheadline}
              </span>
            </motion.span>

            {/* Headline - hidden on mobile */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {headline}
            </motion.h1>

            {/* Subheadline - hidden on mobile */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInDown}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block text-lg sm:text-xl text-neutral-300 max-w-xl mx-auto lg:mx-0"
            >
              {subheadline}
            </motion.p>

            {/* Mobile-only short text */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInDown}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="md:hidden text-lg text-neutral-300 text-center"
            >
              Automatizá tu WhatsApp. Respuestas 24/7.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.a
                variants={scaleIn}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {primaryCTA.text}
              </motion.a>
              <motion.button
                variants={scaleIn}
                transition={{ duration: 0.4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00ff88]/10 to-emerald-500/10 hover:from-[#00ff88]/20 hover:to-emerald-500/20 border-2 border-[#00ff88] hover:border-[#00ff88]/80 text-[#00ff88] font-semibold text-lg rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                {/* Icono Play */}
                <span className="flex items-center justify-center w-10 h-10 bg-[#00ff88] text-neutral-900 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-[#00ff88]/50">
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </span>

                <span className="relative">
                  Ver demo interactiva
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ff88] group-hover:w-full transition-all duration-300"></span>
                </span>

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                {/* Badge GRATIS */}
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-400 text-neutral-900 text-xs font-bold rounded-full animate-pulse">
                  GRATIS
                </span>
              </motion.button>
            </motion.div>

            {/* Trust badges - hidden on mobile */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delay: 0.8 }}
              className="hidden md:flex flex-wrap gap-6 justify-center lg:justify-start pt-6"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  variants={fadeInDown}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 text-neutral-400 text-sm"
                >
                  <span className="text-[#00ff88]">{badge.icon}</span>
                  {badge.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Chat mockup (order-1 on mobile to show first) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm">
              {/* Phone frame */}
              <div className="bg-neutral-800 rounded-[2.5rem] p-3 shadow-2xl shadow-[#00ff88]/10">
                {/* Screen */}
                <div className="bg-neutral-900 rounded-[2rem] overflow-hidden">
                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center">
                      <span className="text-neutral-900 font-bold text-sm">N</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Nordia IA</p>
                      <p className="text-[#00ff88] text-xs">en línea</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[320px] bg-[#0B141A]">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="flex justify-end"
                    >
                      <div className="bg-[#005C4B] text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                        <p className="text-sm">Hola! ¿Cuánto sale un corte?</p>
                        <p className="text-[10px] text-neutral-400 text-right mt-1">20:15</p>
                      </div>
                    </motion.div>

                    {/* Bot message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="flex justify-start"
                    >
                      <div className="bg-neutral-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                        <p className="text-sm">
                          ¡Hola! 👋 El corte de pelo está $8.500. ¿Querés que te agende un turno?
                        </p>
                        <p className="text-[10px] text-neutral-400 text-right mt-1">20:15</p>
                      </div>
                    </motion.div>

                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                      className="flex justify-end"
                    >
                      <div className="bg-[#005C4B] text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                        <p className="text-sm">Dale, para mañana a las 18</p>
                        <p className="text-[10px] text-neutral-400 text-right mt-1">20:16</p>
                      </div>
                    </motion.div>

                    {/* Bot message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2 }}
                      className="flex justify-start"
                    >
                      <div className="bg-neutral-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                        <p className="text-sm">
                          ¡Perfecto! Te agendé mañana a las 18:00hs. Te mando recordatorio 1 hora antes. 📅✅
                        </p>
                        <p className="text-[10px] text-neutral-400 text-right mt-1">20:16</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 bg-neutral-800 rounded-full px-4 py-2">
                      <p className="text-neutral-500 text-sm">Mensaje</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-neutral-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-[#00ff88]/20 blur-3xl rounded-full -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
