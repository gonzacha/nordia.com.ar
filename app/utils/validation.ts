/**
 * Form Validation Utility
 * Validaciones para formularios con mensajes en español argentino
 */

// ============================================
// TIPOS
// ============================================

export type FieldType = "email" | "phone" | "name" | "message" | "custom";

export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

// ============================================
// REGEX PATTERNS
// ============================================

const PATTERNS = {
  // Email válido
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Teléfono argentino: acepta varios formatos
  // +54 9 379 4281273, 5493794281273, 379-4281273, etc.
  phoneArgentine: /^(\+?54\s?9?\s?)?(\d{2,4}[\s-]?)?\d{6,8}$/,

  // Solo números (para limpiar teléfono)
  onlyNumbers: /^\d+$/,

  // Nombre: letras, espacios, tildes, sin números
  name: /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]{2,}$/,

  // Sin números
  noNumbers: /^[^\d]*$/,
};

// ============================================
// VALIDADORES INDIVIDUALES
// ============================================

/**
 * Valida un email
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();

  if (!trimmed) {
    return { valid: false, error: "El email es obligatorio" };
  }

  if (!PATTERNS.email.test(trimmed)) {
    return { valid: false, error: "Ingresá un email válido (ej: tu@email.com)" };
  }

  return { valid: true };
}

/**
 * Valida un teléfono argentino
 * Acepta: +54 9 379 4281273, 5493794281273, 379-4281273, 3794281273
 */
export function validatePhone(phone: string): ValidationResult {
  const trimmed = phone.trim();

  if (!trimmed) {
    return { valid: false, error: "El teléfono es obligatorio" };
  }

  // Limpiar y contar solo dígitos
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (digitsOnly.length < 10) {
    return { valid: false, error: "El teléfono debe tener al menos 10 dígitos" };
  }

  if (digitsOnly.length > 14) {
    return { valid: false, error: "El teléfono tiene demasiados dígitos" };
  }

  // Validar formato general
  if (!PATTERNS.phoneArgentine.test(trimmed)) {
    return { valid: false, error: "Formato inválido. Ej: 379 4281273 o +54 9 379 4281273" };
  }

  return { valid: true };
}

/**
 * Valida un nombre
 * Min 2 caracteres, sin números
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();

  if (!trimmed) {
    return { valid: false, error: "El nombre es obligatorio" };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: "El nombre debe tener al menos 2 caracteres" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "El nombre es demasiado largo" };
  }

  if (!PATTERNS.noNumbers.test(trimmed)) {
    return { valid: false, error: "El nombre no puede contener números" };
  }

  if (!PATTERNS.name.test(trimmed)) {
    return { valid: false, error: "El nombre solo puede contener letras y espacios" };
  }

  return { valid: true };
}

/**
 * Valida un mensaje
 * Min 10 caracteres
 */
export function validateMessage(message: string): ValidationResult {
  const trimmed = message.trim();

  if (!trimmed) {
    return { valid: false, error: "El mensaje es obligatorio" };
  }

  if (trimmed.length < 10) {
    return { valid: false, error: "Contanos un poco más (mínimo 10 caracteres)" };
  }

  if (trimmed.length > 1000) {
    return { valid: false, error: "El mensaje es muy largo (máximo 1000 caracteres)" };
  }

  return { valid: true };
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

/**
 * Valida un campo según su tipo
 *
 * @param fieldType - Tipo de campo a validar
 * @param value - Valor a validar
 * @returns Resultado de validación con error opcional
 *
 * @example
 * validateField("email", "test@email.com")
 * // => { valid: true }
 *
 * @example
 * validateField("phone", "123")
 * // => { valid: false, error: "El teléfono debe tener al menos 10 dígitos" }
 */
export function validateField(fieldType: FieldType, value: string): ValidationResult {
  switch (fieldType) {
    case "email":
      return validateEmail(value);
    case "phone":
      return validatePhone(value);
    case "name":
      return validateName(value);
    case "message":
      return validateMessage(value);
    default:
      return { valid: true };
  }
}

// ============================================
// VALIDACIÓN DE FORMULARIO COMPLETO
// ============================================

export type FormFields = {
  [key: string]: {
    value: string;
    type: FieldType;
    required?: boolean;
  };
};

export type FormValidationResult = {
  valid: boolean;
  errors: { [key: string]: string };
};

/**
 * Valida un formulario completo
 *
 * @example
 * validateForm({
 *   nombre: { value: "Juan", type: "name", required: true },
 *   email: { value: "juan@test.com", type: "email", required: true },
 *   telefono: { value: "", type: "phone", required: false },
 * })
 */
export function validateForm(fields: FormFields): FormValidationResult {
  const errors: { [key: string]: string } = {};
  let valid = true;

  for (const [fieldName, field] of Object.entries(fields)) {
    // Si no es required y está vacío, skip
    if (!field.required && !field.value.trim()) {
      continue;
    }

    const result = validateField(field.type, field.value);

    if (!result.valid && result.error) {
      errors[fieldName] = result.error;
      valid = false;
    }
  }

  return { valid, errors };
}

// ============================================
// HELPERS
// ============================================

/**
 * Formatea un teléfono argentino para mostrar
 * Input: 5493794281273
 * Output: +54 9 379 428-1273
 */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 13 && digits.startsWith("549")) {
    // 549 + área (3) + número (7)
    const area = digits.slice(3, 6);
    const part1 = digits.slice(6, 9);
    const part2 = digits.slice(9);
    return `+54 9 ${area} ${part1}-${part2}`;
  }

  if (digits.length === 10) {
    // área (3) + número (7)
    const area = digits.slice(0, 3);
    const part1 = digits.slice(3, 6);
    const part2 = digits.slice(6);
    return `${area} ${part1}-${part2}`;
  }

  return phone;
}

/**
 * Limpia un teléfono dejando solo dígitos
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}
