"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { RotateCcw, Phone, Video, MoreVertical } from "lucide-react";

type Message = {
  id: number;
  type: "user" | "bot";
  text: string;
  time: string;
};

type ChatSimulatorProps = {
  title?: string;
  subtitle?: string;
  businessName?: string;
  messages?: Message[];
  typingDelay?: number;
  messageDelay?: number;
};

const defaultMessages: Message[] = [
  {
    id: 1,
    type: "user",
    text: "Hola! Quería saber cuánto sale un corte de pelo",
    time: "20:15",
  },
  {
    id: 2,
    type: "bot",
    text: "¡Hola! 👋 Gracias por escribirnos. El corte de pelo está $8.500. También tenemos combo corte + barba por $12.000. ¿Te interesa agendar un turno?",
    time: "20:15",
  },
  {
    id: 3,
    type: "user",
    text: "Dale, quiero solo el corte. Tenés para mañana?",
    time: "20:16",
  },
  {
    id: 4,
    type: "bot",
    text: "¡Perfecto! Para mañana tengo estos horarios disponibles:\n\n🕐 10:00\n🕐 14:30\n🕐 18:00\n\n¿Cuál te queda mejor?",
    time: "20:16",
  },
  {
    id: 5,
    type: "user",
    text: "A las 18 va",
    time: "20:17",
  },
  {
    id: 6,
    type: "bot",
    text: "¡Listo! Te agendé para mañana a las 18:00hs 📅\n\nCorte de pelo - $8.500\n\nTe mando recordatorio 1 hora antes. ¿A qué nombre confirmo?",
    time: "20:17",
  },
  {
    id: 7,
    type: "user",
    text: "Martín",
    time: "20:17",
  },
  {
    id: 8,
    type: "bot",
    text: "¡Perfecto Martín! Quedás agendado ✅\n\n📍 Estamos en Av. Corrientes 1234\n\nTe esperamos mañana. ¡Cualquier cosa escribinos!",
    time: "20:18",
  },
];

// Animation variants
const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// Typing dots component
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="bg-neutral-800 px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-neutral-500 rounded-full"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatSimulator({
  title = "Mirá cómo funciona",
  subtitle = "Una conversación real con Nordia IA",
  businessName = "Barbería Don Corte",
  messages = defaultMessages,
  typingDelay = 1500,
  messageDelay = 800,
}: ChatSimulatorProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const sectionRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  const simulateChat = useCallback(() => {
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsComplete(false);
    setIsTyping(false);
    setIsStarted(true);
  }, []);

  // Start simulation when in view
  useEffect(() => {
    if (isInView && !isStarted) {
      const timer = setTimeout(() => {
        setIsStarted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, isStarted]);

  // Message orchestration
  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex >= messages.length) {
      setIsComplete(true);
      return;
    }

    const currentMessage = messages[currentIndex];

    if (currentMessage.type === "bot") {
      // Show typing indicator for bot messages
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, currentMessage]);
        setCurrentIndex((prev) => prev + 1);
      }, typingDelay);

      return () => clearTimeout(typingTimer);
    } else {
      // User messages appear after a shorter delay
      const messageTimer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, currentMessage]);
        setCurrentIndex((prev) => prev + 1);
      }, messageDelay);

      return () => clearTimeout(messageTimer);
    }
  }, [currentIndex, messages, typingDelay, messageDelay, isStarted]);

  return (
    <section id="demo" className="py-20 lg:py-28 bg-neutral-950 scroll-mt-20" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">{subtitle}</p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm mx-auto"
        >
          <div className="bg-neutral-800 rounded-[2.5rem] p-3 shadow-2xl shadow-[#00ff88]/5">
            {/* Screen */}
            <div className="bg-neutral-900 rounded-[2rem] overflow-hidden">
              {/* WhatsApp header */}
              <div className="bg-[#075E54] px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", delay: 0.4 }}
                      className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center"
                    >
                      <span className="text-neutral-900 font-bold text-sm">N</span>
                    </motion.div>
                    {/* Info */}
                    <div>
                      <p className="text-white font-medium text-sm">{businessName}</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={isTyping ? "typing" : "online"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[#00ff88] text-xs"
                        >
                          {isTyping ? "escribiendo..." : "en línea"}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* Header icons */}
                  <div className="flex items-center gap-4 text-white/70">
                    <Video className="w-5 h-5" />
                    <Phone className="w-5 h-5" />
                    <MoreVertical className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Chat area */}
              <div
                ref={chatContainerRef}
                className="h-[400px] bg-[#0B141A] p-4 overflow-y-auto flex flex-col"
              >
                {/* Date badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mb-4"
                >
                  <span className="px-3 py-1 bg-neutral-800/80 rounded-lg text-neutral-400 text-xs">
                    Hoy
                  </span>
                </motion.div>

                {/* Messages */}
                <div className="flex-1 space-y-3">
                  <AnimatePresence mode="popLayout">
                    {visibleMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className={`flex ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`max-w-[85%] px-3 py-2 rounded-2xl ${
                            message.type === "user"
                              ? "bg-[#005C4B] rounded-tr-sm"
                              : "bg-neutral-800 rounded-tl-sm"
                          }`}
                        >
                          <p className="text-white text-sm whitespace-pre-line">
                            {message.text}
                          </p>
                          <p className="text-[10px] text-neutral-400 text-right mt-1">
                            {message.time}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && <TypingIndicator />}
                  </AnimatePresence>
                </div>
              </div>

              {/* Input bar */}
              <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3">
                <div className="flex-1 bg-neutral-800 rounded-full px-4 py-2">
                  <p className="text-neutral-500 text-sm">Mensaje</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-5 h-5 text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Replay button */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex justify-center mt-6"
              >
                <motion.button
                  onClick={simulateChat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl hover:bg-neutral-700 transition-colors"
                >
                  <motion.span
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.span>
                  Ver de nuevo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-neutral-500 text-sm mt-8 max-w-md mx-auto"
        >
          Esta es una simulación. La IA real se adapta a tu negocio, tus precios y tu forma de hablar.
        </motion.p>
      </div>
    </section>
  );
}
