"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

type FloatingWhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
  tooltipText?: string;
  ariaLabel?: string;
};

export default function FloatingWhatsAppButton({
  phoneNumber = "5493794281273",
  message = "Hola! Quiero información sobre Nordia WhatsApp IA",
  tooltipText = "Chateá con nosotros",
  ariaLabel = "Contactar por WhatsApp",
}: FloatingWhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {tooltipText}
        {/* Tooltip arrow */}
        <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
      </div>

      {/* Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel}
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* Second pulse ring (delayed) */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Icon */}
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  );
}
