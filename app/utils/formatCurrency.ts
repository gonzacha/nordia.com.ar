/**
 * Currency Formatter Utility
 * Formateo de montos en pesos argentinos
 */

// ============================================
// TIPOS
// ============================================

export type CurrencyFormatOptions = {
  /** Mostrar código de moneda (ARS) antes del monto */
  showCurrencyCode?: boolean;
  /** Sufijo a agregar después del monto (ej: "/mes") */
  suffix?: string;
  /** Mostrar centavos (por defecto false) */
  showDecimals?: boolean;
  /** Usar formato compacto para números grandes (ej: 1.5M) */
  compact?: boolean;
};

// ============================================
// FORMATEADORES
// ============================================

/**
 * Formatea un monto en pesos argentinos
 *
 * @param amount - Monto numérico
 * @param options - Opciones de formateo
 * @returns String formateado
 *
 * @example
 * formatCurrency(15000)
 * // => "$15.000"
 *
 * @example
 * formatCurrency(18000, { suffix: "/mes" })
 * // => "$18.000/mes"
 *
 * @example
 * formatCurrency(15000, { showCurrencyCode: true })
 * // => "ARS $15.000"
 *
 * @example
 * formatCurrency(1500000, { compact: true })
 * // => "$1,5M"
 */
export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    showCurrencyCode = false,
    suffix = "",
    showDecimals = false,
    compact = false,
  } = options;

  // Formato compacto para números grandes
  if (compact && amount >= 1000000) {
    const millions = amount / 1000000;
    const formatted = millions % 1 === 0
      ? millions.toString()
      : millions.toFixed(1).replace(".", ",");
    const result = `$${formatted}M`;
    return showCurrencyCode ? `ARS ${result}${suffix}` : `${result}${suffix}`;
  }

  if (compact && amount >= 1000) {
    const thousands = amount / 1000;
    const formatted = thousands % 1 === 0
      ? thousands.toString()
      : thousands.toFixed(1).replace(".", ",");
    const result = `$${formatted}K`;
    return showCurrencyCode ? `ARS ${result}${suffix}` : `${result}${suffix}`;
  }

  // Formateo estándar con Intl
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  // Formatear y limpiar
  let formatted = formatter.format(amount);

  // Intl devuelve "ARS 15.000" o "$ 15.000" según el navegador
  // Normalizamos a "$15.000" (sin espacio)
  formatted = formatted
    .replace("ARS", "")
    .replace(/\s+/g, "")
    .trim();

  // Asegurar que empiece con $
  if (!formatted.startsWith("$")) {
    formatted = "$" + formatted;
  }

  // Agregar código de moneda si se solicita
  if (showCurrencyCode) {
    formatted = `ARS ${formatted}`;
  }

  // Agregar sufijo
  if (suffix) {
    formatted = `${formatted}${suffix}`;
  }

  return formatted;
}

// ============================================
// HELPERS ESPECÍFICOS PARA NORDIA
// ============================================

/**
 * Formatea precio de plan con sufijo de período
 *
 * @example
 * formatPlanPrice(15000, "único")
 * // => "$15.000 pago único"
 *
 * @example
 * formatPlanPrice(18000, "mes")
 * // => "$18.000/mes"
 */
export function formatPlanPrice(
  amount: number,
  period: "mes" | "único" | "año" | "trimestre"
): string {
  if (period === "único") {
    return `${formatCurrency(amount)} pago único`;
  }

  return formatCurrency(amount, { suffix: `/${period}` });
}

/**
 * Formatea el ahorro comparativo
 *
 * @example
 * formatSavings(350000, 18000)
 * // => "Ahorrás $332.000/mes"
 */
export function formatSavings(costWithout: number, costWith: number): string {
  const savings = costWithout - costWith;
  if (savings <= 0) return "";

  return `Ahorrás ${formatCurrency(savings, { suffix: "/mes" })}`;
}

/**
 * Calcula y formatea el costo diario
 *
 * @example
 * formatDailyCost(18000)
 * // => "$600/día"
 */
export function formatDailyCost(monthlyAmount: number): string {
  const daily = Math.round(monthlyAmount / 30);
  return formatCurrency(daily, { suffix: "/día" });
}

/**
 * Formatea comparación de valor
 *
 * @example
 * formatValueComparison(15000, 3)
 * // => "Solo $5.000/mes"
 */
export function formatValueComparison(totalAmount: number, months: number): string {
  const perMonth = Math.round(totalAmount / months);
  return `Solo ${formatCurrency(perMonth, { suffix: "/mes" })}`;
}

/**
 * Parsea un string de precio a número
 * Útil para inputs de usuario
 *
 * @example
 * parseCurrency("$15.000")
 * // => 15000
 *
 * @example
 * parseCurrency("18.000,50")
 * // => 18000.5
 */
export function parseCurrency(value: string): number {
  // Remover todo excepto números, comas y puntos
  const cleaned = value.replace(/[^\d.,]/g, "");

  // En Argentina: punto = miles, coma = decimales
  // Convertir a formato parseFloat (punto = decimales)
  const normalized = cleaned
    .replace(/\./g, "") // Remover separadores de miles
    .replace(",", "."); // Coma a punto para decimales

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}
