"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MessageCircle, HelpCircle, CreditCard } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 grande */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <span className="text-[150px] font-bold leading-none bg-gradient-to-b from-[#00ff88] to-[#00ff88]/20 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Mensaje */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-3"
        >
          Ups, esta página no existe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-neutral-400 mb-8"
        >
          Parece que te perdiste. No te preocupes, te ayudamos a volver.
        </motion.p>

        {/* Botón principal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </motion.div>

        {/* Links útiles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 pt-8 border-t border-neutral-800"
        >
          <p className="text-neutral-500 text-sm mb-4">O tal vez buscabas:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#pricing"
              className="flex items-center gap-2 text-neutral-400 hover:text-[#00ff88] transition-colors text-sm"
            >
              <CreditCard className="w-4 h-4" />
              Precios
            </Link>
            <Link
              href="/#faq"
              className="flex items-center gap-2 text-neutral-400 hover:text-[#00ff88] transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Preguntas frecuentes
            </Link>
            <a
              href="https://wa.me/5493794281273?text=Hola!%20Tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-400 hover:text-[#00ff88] transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contacto
            </a>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
