"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles } from "lucide-react";
import {
  calculateROI,
  INPUT_RANGES,
  INPUT_LABELS,
  PRECIOS_NORDIA,
  type ROIInputs,
  type ROIResult,
} from "@/app/utils/roiCalculator";
import { formatCurrency } from "@/app/utils/formatCurrency";

type ROICalculatorProps = {
  title?: string;
  subtitle?: string;
};

export default function ROICalculator({
  title = "¿Cuánto estás perdiendo por no responder a tiempo?",
  subtitle = "Calculá tu retorno de inversión en 30 segundos",
}: ROICalculatorProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [inputs, setInputs] = useState<ROIInputs>({
    consultasPorDia: INPUT_RANGES.consultasPorDia.default,
    ticketPromedio: INPUT_RANGES.ticketPromedio.default,
    horasDedicadas: INPUT_RANGES.horasDedicadas.default,
  });

  const [result, setResult] = useState<ROIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (key: keyof ROIInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setResult(null); // Reset result when inputs change
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    // Simular pequeño delay para efecto
    setTimeout(() => {
      const calculatedResult = calculateROI(inputs);
      setResult(calculatedResult);
      setIsCalculating(false);
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-neutral-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[#00ff88] text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            Calculadora de ROI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">{subtitle}</p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
            {/* Inputs */}
            <div className="space-y-6 mb-8">
              {/* Consultas por día */}
              <div>
                <label className="block text-white font-medium mb-2">
                  {INPUT_LABELS.consultasPorDia.label}
                </label>
                <p className="text-neutral-500 text-sm mb-3">
                  {INPUT_LABELS.consultasPorDia.helper}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={INPUT_RANGES.consultasPorDia.min}
                    max={INPUT_RANGES.consultasPorDia.max}
                    step={INPUT_RANGES.consultasPorDia.step}
                    value={inputs.consultasPorDia}
                    onChange={(e) =>
                      handleInputChange("consultasPorDia", Number(e.target.value))
                    }
                    className="flex-1 h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-[#00ff88]"
                  />
                  <span className="w-20 text-right text-[#00ff88] font-bold text-lg">
                    {inputs.consultasPorDia}
                  </span>
                </div>
              </div>

              {/* Ticket promedio */}
              <div>
                <label className="block text-white font-medium mb-2">
                  {INPUT_LABELS.ticketPromedio.label}
                </label>
                <p className="text-neutral-500 text-sm mb-3">
                  {INPUT_LABELS.ticketPromedio.helper}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={INPUT_RANGES.ticketPromedio.min}
                    max={INPUT_RANGES.ticketPromedio.max}
                    step={INPUT_RANGES.ticketPromedio.step}
                    value={inputs.ticketPromedio}
                    onChange={(e) =>
                      handleInputChange("ticketPromedio", Number(e.target.value))
                    }
                    className="flex-1 h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-[#00ff88]"
                  />
                  <span className="w-24 text-right text-[#00ff88] font-bold text-lg">
                    {formatCurrency(inputs.ticketPromedio)}
                  </span>
                </div>
              </div>

              {/* Horas dedicadas */}
              <div>
                <label className="block text-white font-medium mb-2">
                  {INPUT_LABELS.horasDedicadas.label}
                </label>
                <p className="text-neutral-500 text-sm mb-3">
                  {INPUT_LABELS.horasDedicadas.helper}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={INPUT_RANGES.horasDedicadas.min}
                    max={INPUT_RANGES.horasDedicadas.max}
                    step={INPUT_RANGES.horasDedicadas.step}
                    value={inputs.horasDedicadas}
                    onChange={(e) =>
                      handleInputChange("horasDedicadas", Number(e.target.value))
                    }
                    className="flex-1 h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-[#00ff88]"
                  />
                  <span className="w-20 text-right text-[#00ff88] font-bold text-lg">
                    {inputs.horasDedicadas}hs
                  </span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <motion.button
              onClick={handleCalculate}
              disabled={isCalculating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#00ff88] text-neutral-900 font-bold rounded-xl hover:bg-[#00ff88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCalculating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Calculando...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Calcular mi ROI
                </>
              )}
            </motion.button>

            {/* Results */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 pt-8 border-t border-neutral-800"
                >
                  {/* Main message */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`p-4 rounded-xl mb-6 ${
                      result.conviene
                        ? "bg-[#00ff88]/10 border border-[#00ff88]/20"
                        : "bg-yellow-500/10 border border-yellow-500/20"
                    }`}
                  >
                    <p
                      className={`text-lg ${
                        result.conviene ? "text-[#00ff88]" : "text-yellow-400"
                      }`}
                    >
                      {result.mensaje}
                    </p>
                  </motion.div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-neutral-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                        <DollarSign className="w-4 h-4" />
                        Pérdida mensual
                      </div>
                      <div className="text-2xl font-bold text-red-400">
                        {formatCurrency(result.costoOportunidad)}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-neutral-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                        <TrendingUp className="w-4 h-4" />
                        Ahorro con Nordia
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          result.ahorroMensual > 0
                            ? "text-[#00ff88]"
                            : "text-neutral-400"
                        }`}
                      >
                        {result.ahorroMensual > 0
                          ? formatCurrency(result.ahorroMensual)
                          : "-"}
                        <span className="text-sm font-normal">/mes</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-neutral-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                        <Clock className="w-4 h-4" />
                        Tiempo recuperado
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {result.tiempoRecuperado}hs
                        <span className="text-sm font-normal">/mes</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-neutral-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                        <Sparkles className="w-4 h-4" />
                        ROI
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          result.roiPorcentaje > 0
                            ? "text-[#00ff88]"
                            : "text-neutral-400"
                        }`}
                      >
                        {result.roiPorcentaje > 0 ? "+" : ""}
                        {result.roiPorcentaje}%
                      </div>
                    </motion.div>
                  </div>

                  {/* CTA if positive ROI */}
                  {result.conviene && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-neutral-400 text-sm mb-4">
                        Recuperás la inversión en{" "}
                        <span className="text-white font-semibold">
                          {result.diasRecuperacion} días
                        </span>
                      </p>
                      <a
                        href={`https://wa.me/5493794281273?text=${encodeURIComponent(
                          `Hola! Hice el cálculo de ROI y me interesa Nordia. Pierdo aproximadamente ${formatCurrency(result.costoOportunidad)}/mes por no responder a tiempo.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
                      >
                        Quiero dejar de perder plata
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price reference */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center text-neutral-500 text-sm mt-6"
          >
            Nordia cuesta {formatCurrency(PRECIOS_NORDIA.mensual)}/mes o{" "}
            {formatCurrency(PRECIOS_NORDIA.founder)} por{" "}
            {PRECIOS_NORDIA.founderMeses} meses (Plan Founder)
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
