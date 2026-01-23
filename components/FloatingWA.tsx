"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWA() {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE ?? "549XXXXXXXXXX";
  const text = encodeURIComponent("QUIERO ORDENAR WHATSAPP");
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-nordia text-black rounded-full shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:bg-white transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2.5} />
    </motion.a>
  );
}
