"use client";

import { motion, useScroll, useSpring } from "framer-motion";

type ScrollProgressProps = {
  /** Color de la barra de progreso */
  color?: string;
  /** Altura de la barra en píxeles */
  height?: number;
  /** Mostrar glow effect */
  showGlow?: boolean;
  /** Z-index de la barra */
  zIndex?: number;
};

export default function ScrollProgress({
  color = "#00ff88",
  height = 3,
  showGlow = true,
  zIndex = 9999,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  // Aplicar spring para suavizar el movimiento
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        scaleX,
        height,
        backgroundColor: color,
        zIndex,
        boxShadow: showGlow
          ? `0 0 10px ${color}, 0 0 20px ${color}40`
          : "none",
      }}
    />
  );
}
