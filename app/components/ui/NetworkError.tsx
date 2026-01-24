"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";

type NetworkErrorProps = {
  /** Callback cuando se hace click en reintentar */
  onRetry?: () => void;
  /** Número máximo de reintentos automáticos */
  maxRetries?: number;
  /** Intervalo entre reintentos automáticos en ms */
  autoRetryInterval?: number;
  /** Mensaje principal */
  message?: string;
  /** Mensaje secundario */
  submessage?: string;
};

export default function NetworkError({
  onRetry,
  maxRetries = 3,
  autoRetryInterval = 5000,
  message = "Sin conexión a internet",
  submessage = "Revisá tu conexión y volvé a intentar",
}: NetworkErrorProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleRetry = useCallback(() => {
    if (isRetrying) return;

    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    // Simular intento de reconexión
    setTimeout(() => {
      if (onRetry) {
        onRetry();
      }
      setIsRetrying(false);
    }, 1000);
  }, [isRetrying, onRetry]);

  // Auto-retry logic
  useEffect(() => {
    if (retryCount >= maxRetries || isRetrying) return;

    // Countdown timer
    setCountdown(autoRetryInterval / 1000);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-retry timer
    const retryTimer = setTimeout(() => {
      handleRetry();
    }, autoRetryInterval);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(retryTimer);
    };
  }, [retryCount, maxRetries, autoRetryInterval, isRetrying, handleRetry]);

  const retriesLeft = maxRetries - retryCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-8 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-center"
    >
      {/* Icon with pulse animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4"
      >
        <WifiOff className="w-8 h-8 text-yellow-500" />
      </motion.div>

      {/* Message */}
      <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
      <p className="text-neutral-400 mb-6">{submessage}</p>

      {/* Retry button */}
      <motion.button
        onClick={handleRetry}
        disabled={isRetrying}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-neutral-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <motion.span
          animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isRetrying
              ? { duration: 1, repeat: Infinity, ease: "linear" }
              : { duration: 0 }
          }
        >
          <RefreshCw className="w-5 h-5" />
        </motion.span>
        {isRetrying ? "Reintentando..." : "Reintentar"}
      </motion.button>

      {/* Status info */}
      <div className="mt-4 text-sm text-neutral-500">
        {retriesLeft > 0 ? (
          <>
            {countdown > 0 && !isRetrying && (
              <p>Reintento automático en {countdown}s</p>
            )}
            <p className="mt-1">
              {retriesLeft} intento{retriesLeft !== 1 ? "s" : ""} restante
              {retriesLeft !== 1 ? "s" : ""}
            </p>
          </>
        ) : (
          <p>Sin reintentos automáticos disponibles</p>
        )}
      </div>
    </motion.div>
  );
}
