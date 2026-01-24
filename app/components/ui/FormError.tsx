"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  /** Mensaje de error a mostrar */
  message?: string;
  /** Si el error es visible */
  visible?: boolean;
  /** ID para asociar con aria-describedby */
  id?: string;
  /** Clase adicional */
  className?: string;
};

export default function FormError({
  message,
  visible = true,
  id,
  className = "",
}: FormErrorProps) {
  // No renderizar si no hay mensaje o no es visible
  const shouldShow = visible && message;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          id={id}
          role="alert"
          aria-live="polite"
          className={`overflow-hidden ${className}`}
        >
          <div className="flex items-start gap-2 mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Versión inline más compacta para usar junto a inputs
 */
export function FormErrorInline({
  message,
  visible = true,
}: {
  message?: string;
  visible?: boolean;
}) {
  if (!visible || !message) return null;

  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="text-red-400 text-xs ml-2"
    >
      {message}
    </motion.span>
  );
}

/**
 * Hook helper para manejar errores de formulario
 *
 * @example
 * const { error, setError, clearError, hasError } = useFormError();
 *
 * // En validación
 * if (!email) setError("El email es obligatorio");
 *
 * // En render
 * <FormError message={error} visible={hasError} />
 */
export function useFormError(initialError?: string) {
  const [error, setErrorState] = useState<string | undefined>(initialError);

  const setError = (message: string) => setErrorState(message);
  const clearError = () => setErrorState(undefined);
  const hasError = Boolean(error);

  return { error, setError, clearError, hasError };
}
