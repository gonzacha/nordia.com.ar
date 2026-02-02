"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LiveDemoSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="live-demo"
      className="py-20 lg:py-32 bg-white scroll-mt-20 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-700 text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              Demo en Vivo
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Probá Nordia en tiempo real
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Este es el mismo bot que atiende negocios reales.{" "}
            <span className="text-neutral-900 font-medium">Escribí 'setup'</span> para comenzar y configurá tu propio negocio ficticio.
          </p>

          {/* Quick instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">1️⃣</div>
              <p className="text-sm text-neutral-600">Escribí <span className="text-neutral-900 font-mono">setup</span></p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">2️⃣</div>
              <p className="text-sm text-neutral-600">Configurá tu negocio</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">3️⃣</div>
              <p className="text-sm text-neutral-600">Probá consultas y turnos</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Demo Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="demo-frame-wrapper relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20" />

            {/* Frame container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-neutral-400/30 border border-neutral-200">
              <iframe
                src="/demo/chatbot_demo.html"
                className="w-full h-[600px] lg:h-[720px] border-0"
                loading="lazy"
                allow="clipboard-write"
                title="Nordia Bot Demo Interactivo"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
            💡 <span className="text-neutral-600">Tip:</span> Después de completar el setup, probá escribir <span className="text-neutral-900 font-mono">servicios</span> o <span className="text-neutral-900 font-mono">turno</span> para ver las capacidades del bot.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
