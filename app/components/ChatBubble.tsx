"use client";

import { motion } from "framer-motion";

export type ChatBubbleProps = {
  id: string;
  tipo: "cliente" | "ia";
  texto: string;
  hora: string;
  delay?: number;
};

const bubbleVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function ChatBubble({
  tipo,
  texto,
  hora,
  delay = 0,
}: ChatBubbleProps) {
  const isCliente = tipo === "cliente";

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`flex ${isCliente ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`px-4 py-3 max-w-[80%] ${
          isCliente
            ? "bg-gray-700 text-white rounded-2xl rounded-tl-none"
            : "bg-[#00ff88] text-black rounded-2xl rounded-tr-none"
        }`}
      >
        <p className={isCliente ? "" : "font-medium"}>{texto}</p>
        <span
          className={`text-xs mt-1 block ${
            isCliente ? "text-gray-400" : "opacity-60"
          }`}
        >
          {hora}
        </span>
      </div>
    </motion.div>
  );
}
