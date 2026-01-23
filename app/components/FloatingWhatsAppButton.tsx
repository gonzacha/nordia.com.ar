"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageCircle } from "lucide-react";

type FloatingWhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
  tooltipText?: string;
  ariaLabel?: string;
  showAfterScroll?: number;
};

export default function FloatingWhatsAppButton({
  phoneNumber = "5493794281273",
  message = "Hola! Quiero información sobre Nordia WhatsApp IA",
  tooltipText = "Chateá con nosotros",
  ariaLabel = "Contactar por WhatsApp",
  showAfterScroll = 200,
}: FloatingWhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Show button after scrolling past threshold
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > showAfterScroll);
  });

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
              >
                {tooltipText}
                {/* Tooltip arrow */}
                <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={ariaLabel}
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(37, 211, 102, 0.4)",
                "0 0 0 15px rgba(37, 211, 102, 0)",
                "0 0 0 0 rgba(37, 211, 102, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              },
            }}
            className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20BD5A]"
          >
            {/* Glow effect */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Icon */}
            <MessageCircle className="w-7 h-7 text-white relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
