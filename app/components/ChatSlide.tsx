"use client";

import { motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import type { ChatSlide as ChatSlideType } from "@/app/data/chatSlides";

type ChatSlideProps = ChatSlideType;

const slideVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function ChatSlide({
  rubro,
  titulo,
  icono,
  color,
  mensajes,
}: ChatSlideProps) {
  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-800 rounded-2xl p-6 shadow-xl"
    >
      {/* Header negocio */}
      <div
        className="flex items-center gap-3 mb-6 p-4 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        }}
      >
        <span className="text-3xl">{icono}</span>
        <div>
          <h3 className="font-bold text-white">{titulo}</h3>
          <p className="text-sm text-gray-400">{rubro}</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="space-y-3">
        {mensajes.map((mensaje, index) => (
          <ChatBubble
            key={mensaje.id}
            id={mensaje.id}
            tipo={mensaje.tipo}
            texto={mensaje.texto}
            hora={mensaje.hora}
            delay={index * 0.15}
          />
        ))}
      </div>
    </motion.div>
  );
}
