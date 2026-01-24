"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";

type AlertType = "confirm" | "destructive" | "info";

type AlertDialogProps = {
  /** Si el dialog está abierto */
  isOpen: boolean;
  /** Callback para cerrar el dialog */
  onClose: () => void;
  /** Callback cuando se confirma */
  onConfirm: () => void;
  /** Título del dialog */
  title: string;
  /** Mensaje o descripción */
  message: string;
  /** Tipo de alerta */
  type?: AlertType;
  /** Texto del botón confirmar */
  confirmText?: string;
  /** Texto del botón cancelar */
  cancelText?: string;
  /** Mostrar botón cancelar */
  showCancel?: boolean;
  /** Estado de carga del botón confirmar */
  isLoading?: boolean;
};

const typeConfig: Record<
  AlertType,
  {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    confirmBg: string;
    confirmHover: string;
  }
> = {
  confirm: {
    icon: <CheckCircle className="w-6 h-6" />,
    iconBg: "bg-[#00ff88]/10",
    iconColor: "text-[#00ff88]",
    confirmBg: "bg-[#00ff88]",
    confirmHover: "hover:bg-[#00ff88]/90",
  },
  destructive: {
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    confirmBg: "bg-red-500",
    confirmHover: "hover:bg-red-600",
  },
  info: {
    icon: <Info className="w-6 h-6" />,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    confirmBg: "bg-blue-500",
    confirmHover: "hover:bg-blue-600",
  },
};

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

export default function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showCancel = true,
  isLoading = false,
}: AlertDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const config = typeConfig[type];

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus confirm button
      setTimeout(() => confirmRef.current?.focus(), 100);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose, isLoading]);

  const handleConfirm = () => {
    if (isLoading) return;
    onConfirm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => !isLoading && onClose()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby="alert-message"
        >
          <motion.div
            variants={dialogVariants}
            initial="hidden"
            animate={type === "destructive" ? ["visible", "shake"] : "visible"}
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Close button */}
            <motion.button
              onClick={() => !isLoading && onClose()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-50"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Content */}
            <div className="p-6 pt-8">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className={`w-14 h-14 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center mx-auto mb-4`}
              >
                {config.icon}
              </motion.div>

              {/* Title */}
              <h3
                id="alert-title"
                className="text-xl font-semibold text-white text-center mb-2"
              >
                {title}
              </h3>

              {/* Message */}
              <p
                id="alert-message"
                className="text-neutral-400 text-center mb-6"
              >
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                {showCancel && (
                  <motion.button
                    onClick={() => !isLoading && onClose()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-700 transition-colors disabled:opacity-50"
                  >
                    {cancelText}
                  </motion.button>
                )}

                <motion.button
                  ref={confirmRef}
                  onClick={handleConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-3 ${config.confirmBg} ${config.confirmHover} text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Procesando...
                    </>
                  ) : (
                    confirmText
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
