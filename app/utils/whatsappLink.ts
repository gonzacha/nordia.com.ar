/**
 * WhatsApp Link Generator Utility
 * Genera links de WhatsApp pre-poblados para CTAs de Nordia
 */

type WhatsAppLinkOptions = {
  /** Usar protocolo whatsapp:// en lugar de wa.me (para apps nativas) */
  useNativeProtocol?: boolean;
  /** Forzar detección de dispositivo móvil */
  forceMobile?: boolean;
};

type ValidationResult = {
  valid: boolean;
  formatted?: string;
  error?: string;
};

/**
 * Valida y formatea un número de teléfono argentino
 * Formato esperado: 549 + código de área + número (sin 15)
 * Ejemplo: 5493794281273
 */
export function validateArgentinePhone(phone: string): ValidationResult {
  // Limpiar el número de caracteres no numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Verificar longitud (Argentina: 13 dígitos con 549)
  if (cleaned.length < 10 || cleaned.length > 14) {
    return {
      valid: false,
      error: "El número debe tener entre 10 y 14 dígitos",
    };
  }

  // Si ya tiene el prefijo 549, está formateado correctamente
  if (cleaned.startsWith("549") && cleaned.length >= 12) {
    return { valid: true, formatted: cleaned };
  }

  // Si empieza con 54, agregar el 9 para móvil
  if (cleaned.startsWith("54") && !cleaned.startsWith("549")) {
    const formatted = "549" + cleaned.slice(2);
    return { valid: true, formatted };
  }

  // Si empieza con 9, agregar 54
  if (cleaned.startsWith("9") && cleaned.length >= 10) {
    const formatted = "54" + cleaned;
    return { valid: true, formatted };
  }

  // Si es solo el número local (sin código país), agregar 549
  if (cleaned.length === 10) {
    const formatted = "549" + cleaned;
    return { valid: true, formatted };
  }

  // Asumir que está bien formateado
  return { valid: true, formatted: cleaned };
}

/**
 * Detecta si el usuario está en un dispositivo móvil
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Codifica el mensaje para URL de WhatsApp
 * Maneja espacios, emojis, saltos de línea y caracteres especiales
 */
export function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message)
    .replace(/'/g, "%27")
    .replace(/!/g, "%21");
}

/**
 * Genera un link de WhatsApp pre-poblado
 *
 * @param phone - Número de teléfono (con o sin formato)
 * @param message - Mensaje pre-poblado
 * @param options - Opciones adicionales
 * @returns URL de WhatsApp formateada
 *
 * @example
 * // Link básico
 * generateWhatsAppLink("5493794281273", "Hola, quiero info sobre Nordia")
 * // => "https://wa.me/5493794281273?text=Hola%2C%20quiero%20info%20sobre%20Nordia"
 *
 * @example
 * // Con protocolo nativo
 * generateWhatsAppLink("5493794281273", "Hola!", { useNativeProtocol: true })
 * // => "whatsapp://send?phone=5493794281273&text=Hola%21"
 */
export function generateWhatsAppLink(
  phone: string,
  message: string,
  options: WhatsAppLinkOptions = {}
): string {
  const { useNativeProtocol = false, forceMobile } = options;

  // Validar y formatear el número
  const validation = validateArgentinePhone(phone);
  const formattedPhone = validation.formatted || phone.replace(/\D/g, "");

  // Codificar el mensaje
  const encodedMessage = encodeWhatsAppMessage(message);

  // Determinar si usar protocolo nativo
  const useMobile = forceMobile ?? isMobileDevice();
  const shouldUseNative = useNativeProtocol || useMobile;

  if (shouldUseNative) {
    return `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`;
  }

  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

// ============================================
// MENSAJES PRE-DEFINIDOS PARA CTAs DE NORDIA
// ============================================

export const NORDIA_PHONE = "5493794281273";

export const PREDEFINED_MESSAGES = {
  // Hero CTA principal
  heroConsulta: "Hola! Vi la landing de Nordia y me interesa saber más sobre la IA para WhatsApp. ¿Me pueden dar info?",

  // Plan Founder
  planFounder: "Hola! Quiero contratar el Plan Founder de Nordia ($15.000 por 3 meses). ¿Cómo sigo?",

  // Plan Mensual
  planMensual: "Hola! Quiero contratar el Plan Mensual de Nordia ($18.000/mes). ¿Cómo sigo?",

  // Consulta general
  consultaGeneral: "Hola! Tengo una consulta sobre Nordia WhatsApp IA.",

  // Desde FAQ
  desdeFAQ: "Hola! Estuve viendo las preguntas frecuentes de Nordia pero tengo otra duda...",

  // Demo
  solicitarDemo: "Hola! Me gustaría ver una demo de Nordia WhatsApp IA. ¿Es posible?",

  // Soporte
  soporte: "Hola! Soy cliente de Nordia y necesito soporte.",
} as const;

export type PredefinedMessageKey = keyof typeof PREDEFINED_MESSAGES;

/**
 * Genera un link de WhatsApp usando mensajes predefinidos de Nordia
 *
 * @example
 * getNordiaWhatsAppLink("planFounder")
 * // => "https://wa.me/5493794281273?text=Hola!%20Quiero%20contratar..."
 */
export function getNordiaWhatsAppLink(
  messageKey: PredefinedMessageKey,
  options?: WhatsAppLinkOptions
): string {
  return generateWhatsAppLink(
    NORDIA_PHONE,
    PREDEFINED_MESSAGES[messageKey],
    options
  );
}

/**
 * Genera un link de WhatsApp con mensaje personalizado para Nordia
 */
export function getNordiaCustomLink(
  customMessage: string,
  options?: WhatsAppLinkOptions
): string {
  return generateWhatsAppLink(NORDIA_PHONE, customMessage, options);
}
