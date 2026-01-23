/**
 * ROI Calculator Utility
 * Calcula el retorno de inversión al usar Nordia WhatsApp IA
 */

// ============================================
// TIPOS
// ============================================

export type ROIInputs = {
  /** Consultas que recibís por día en WhatsApp */
  consultasPorDia: number;
  /** Ticket promedio de venta en ARS */
  ticketPromedio: number;
  /** Horas diarias dedicadas a responder mensajes */
  horasDedicadas: number;
};

export type ROIResult = {
  /** Ventas que perdés por mes por responder tarde */
  ventasPerdidasMes: number;
  /** Costo de oportunidad mensual en ARS */
  costoOportunidad: number;
  /** Ahorro mensual al usar Nordia */
  ahorroMensual: number;
  /** Porcentaje de ROI */
  roiPorcentaje: number;
  /** Días para recuperar la inversión */
  diasRecuperacion: number;
  /** Si conviene usar Nordia */
  conviene: boolean;
  /** Mensaje personalizado */
  mensaje: string;
  /** Valor de tu hora (estimado) */
  valorHora: number;
  /** Tiempo recuperado por mes en horas */
  tiempoRecuperado: number;
};

// ============================================
// CONSTANTES
// ============================================

const PRECIO_NORDIA_MENSUAL = 18000;
const PRECIO_NORDIA_FOUNDER = 15000;
const DIAS_POR_MES = 30;

/** Porcentaje de consultas que se pierden por respuesta tardía */
const TASA_PERDIDA_POR_DEMORA = 0.15; // 15%

/** Porcentaje de consultas que se convierten en venta */
const TASA_CONVERSION_BASE = 0.20; // 20%

/** Valor promedio de hora de trabajo para PyME argentina */
const VALOR_HORA_ESTIMADO = 3500; // ARS

// ============================================
// CÁLCULO PRINCIPAL
// ============================================

/**
 * Calcula el ROI de usar Nordia WhatsApp IA
 *
 * @param inputs - Datos del negocio
 * @returns Resultado del cálculo de ROI
 *
 * @example
 * const resultado = calculateROI({
 *   consultasPorDia: 20,
 *   ticketPromedio: 5000,
 *   horasDedicadas: 3,
 * });
 * // resultado.mensaje = "Estás perdiendo $45.000/mes..."
 */
export function calculateROI(inputs: ROIInputs): ROIResult {
  const { consultasPorDia, ticketPromedio, horasDedicadas } = inputs;

  // Consultas mensuales
  const consultasMes = consultasPorDia * DIAS_POR_MES;

  // Ventas perdidas por responder tarde (15% de las consultas)
  const consultasPerdidasMes = Math.round(consultasMes * TASA_PERDIDA_POR_DEMORA);

  // De esas consultas perdidas, cuántas hubieran convertido (20%)
  const ventasPerdidasMes = Math.round(consultasPerdidasMes * TASA_CONVERSION_BASE);

  // Costo de oportunidad = ventas perdidas * ticket promedio
  const costoOportunidad = ventasPerdidasMes * ticketPromedio;

  // Valor del tiempo dedicado a responder
  const tiempoRecuperado = horasDedicadas * DIAS_POR_MES; // horas/mes
  const valorTiempo = tiempoRecuperado * VALOR_HORA_ESTIMADO;

  // Beneficio total = oportunidad recuperada + valor del tiempo
  const beneficioTotal = costoOportunidad + valorTiempo;

  // Ahorro mensual = beneficio - costo Nordia
  const ahorroMensual = beneficioTotal - PRECIO_NORDIA_MENSUAL;

  // ROI = (beneficio - costo) / costo * 100
  const roiPorcentaje = Math.round(
    ((beneficioTotal - PRECIO_NORDIA_MENSUAL) / PRECIO_NORDIA_MENSUAL) * 100
  );

  // Días para recuperar inversión
  const beneficioDiario = beneficioTotal / DIAS_POR_MES;
  const diasRecuperacion =
    beneficioDiario > 0
      ? Math.ceil(PRECIO_NORDIA_MENSUAL / beneficioDiario)
      : 999;

  // ¿Conviene?
  const conviene = ahorroMensual > 0;

  // Generar mensaje personalizado
  const mensaje = generarMensaje({
    costoOportunidad,
    ahorroMensual,
    diasRecuperacion,
    tiempoRecuperado,
    conviene,
  });

  return {
    ventasPerdidasMes,
    costoOportunidad,
    ahorroMensual,
    roiPorcentaje,
    diasRecuperacion,
    conviene,
    mensaje,
    valorHora: VALOR_HORA_ESTIMADO,
    tiempoRecuperado,
  };
}

// ============================================
// GENERADOR DE MENSAJES
// ============================================

function generarMensaje(data: {
  costoOportunidad: number;
  ahorroMensual: number;
  diasRecuperacion: number;
  tiempoRecuperado: number;
  conviene: boolean;
}): string {
  const { costoOportunidad, ahorroMensual, diasRecuperacion, tiempoRecuperado, conviene } = data;

  const formatMoney = (n: number) =>
    "$" + Math.abs(n).toLocaleString("es-AR");

  if (!conviene) {
    return `Con tu volumen actual, Nordia podría no ser la mejor inversión todavía. Pero si tu negocio crece, ¡volvé a calcular!`;
  }

  if (diasRecuperacion <= 7) {
    return `🔥 Estás perdiendo ${formatMoney(costoOportunidad)}/mes en ventas. Nordia se paga solo en ${diasRecuperacion} días. Además, recuperás ${tiempoRecuperado}hs de tu tiempo cada mes.`;
  }

  if (diasRecuperacion <= 15) {
    return `💰 Perdés aproximadamente ${formatMoney(costoOportunidad)}/mes por no responder a tiempo. Con Nordia ahorrás ${formatMoney(ahorroMensual)}/mes y recuperás ${tiempoRecuperado}hs de tu vida.`;
  }

  return `📈 Tu costo de oportunidad es ${formatMoney(costoOportunidad)}/mes. Nordia te ayuda a recuperar esas ventas y te libera ${tiempoRecuperado}hs mensuales para enfocarte en lo importante.`;
}

// ============================================
// HELPERS PARA UI
// ============================================

/**
 * Rangos sugeridos para los inputs
 */
export const INPUT_RANGES = {
  consultasPorDia: { min: 1, max: 100, step: 1, default: 15 },
  ticketPromedio: { min: 1000, max: 100000, step: 500, default: 5000 },
  horasDedicadas: { min: 0.5, max: 8, step: 0.5, default: 2 },
};

/**
 * Labels para los inputs
 */
export const INPUT_LABELS = {
  consultasPorDia: {
    label: "Consultas por día",
    helper: "Mensajes de WhatsApp que recibís por día",
    unit: "consultas/día",
  },
  ticketPromedio: {
    label: "Ticket promedio",
    helper: "Valor promedio de cada venta",
    unit: "ARS",
  },
  horasDedicadas: {
    label: "Horas respondiendo",
    helper: "Tiempo diario que dedicás a WhatsApp",
    unit: "horas/día",
  },
};

/**
 * Precios de Nordia para mostrar
 */
export const PRECIOS_NORDIA = {
  mensual: PRECIO_NORDIA_MENSUAL,
  founder: PRECIO_NORDIA_FOUNDER,
  founderMeses: 3,
};
