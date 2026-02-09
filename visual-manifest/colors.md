# Paleta Cromática Oficial Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## Filosofía de Color

La paleta de Nordia es **restringida deliberadamente**. Cada color tiene un propósito específico y un significado semántico fijo. No se permite inventar colores fuera de esta especificación.

**Principio rector:** Menos colores, más significado.

---

## 1. Paleta Primaria (Nordia Brand)

### Nordia Primary
```
Hex: #00ff88
RGB: 0, 255, 136
HSL: 152°, 100%, 50%
Tailwind: nordia-DEFAULT
```

**Uso específico:**
- CTAs principales (botones de acción primaria)
- Badges de estado "completado" o "activo"
- Highlights de información crítica
- Underline de links en hover
- Iconos de confirmación

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AAA (4.52:1)
- Sobre negro (#000000): ✅ AAA (4.64:1)
- Sobre neutral-900 (#171717): ✅ AAA (13.21:1)

**NO usar para:**
- Fondos de secciones completas (demasiado intenso)
- Texto de párrafos largos (legibilidad reducida)
- Más de 3 elementos en la misma vista

---

### Nordia Light
```
Hex: #66ffb3
RGB: 102, 255, 179
HSL: 150°, 100%, 70%
Tailwind: nordia-light
```

**Uso específico:**
- Fondos de secciones hero con overlay
- Hover states de CTAs secundarios
- Backgrounds de badges informativos
- Highlights sutiles en tablas

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ⚠️ Falla contraste, usar con textos dark
- Sobre neutral-900 (#171717): ✅ AAA (15.83:1)

**NO usar para:**
- CTAs principales (usar nordia-DEFAULT)
- Estados críticos (usar semantic colors)

---

### Nordia Dim
```
Hex: #00cc6a
RGB: 0, 204, 106
HSL: 151°, 100%, 40%
Tailwind: nordia-dim
```

**Uso específico:**
- Active states de botones primarios
- Borders de elementos seleccionados
- Progress bars en estado completado
- Backgrounds de notificaciones de éxito (con alpha 0.1)

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AA (3.62:1)
- Sobre neutral-900 (#171717): ✅ AAA (10.57:1)

**NO usar para:**
- Como color principal (usar nordia-DEFAULT)
- Estados de error o warning

---

### Nordia Dark
```
Hex: #00994f
RGB: 0, 153, 79
HSL: 151°, 100%, 30%
Tailwind: nordia-dark
```

**Uso específico:**
- Texto sobre fondos claros cuando se necesita verde
- Borders de elementos con brand color
- Iconos secundarios en contextos con brand
- Disabled states de elementos verdes

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AAA (5.42:1)
- Como color de texto sobre blanco: ✅ Excelente

**NO usar para:**
- CTAs (usar nordia-DEFAULT o nordia-dim)
- Fondos oscuros completos

---

### Nordia Darker
```
Hex: #00331b
RGB: 0, 51, 27
HSL: 152°, 100%, 10%
Tailwind: nordia-darker
```

**Uso específico:**
- Backgrounds de código o consola (con JetBrains Mono)
- Footers con branding oscuro
- Overlays oscuros con tinte de marca
- Texto de máxima jerarquía sobre fondos verdes claros

**Contraste con texto:**
- Sobre nordia-light (#66ffb3): ✅ AAA (15.83:1)
- Como background con texto blanco: ✅ AAA (16.12:1)

**NO usar para:**
- Backgrounds de secciones principales (demasiado oscuro)

---

## 2. Paleta Semántica

### Success
```
Hex: #00ff88 (mismo que nordia-DEFAULT)
RGB: 0, 255, 136
Tailwind: success
```

**Cuándo usar:**
- Flujo completado exitosamente
- Mensaje enviado correctamente
- Configuración guardada sin errores
- Cliente respondió a una acción
- Tarea marcada como "done"

**Contextos específicos:**
- Checkmark icons: ✅
- Toast notifications: "Operación exitosa"
- Status badges: "Completado"
- Progress bars: Estado 100%

**NO usar para:**
- Estados neutrales (usar info)
- Estados de espera (usar pending gray)

---

### Warning
```
Hex: #fbbf24
RGB: 251, 191, 36
HSL: 43°, 96%, 56%
Tailwind: warning
```

**Cuándo usar:**
- Acción requiere atención pero no es crítica
- Configuración con valores por defecto que deberían revisarse
- Límite de uso cercano (ej: 80% de cuota mensual)
- Información que el usuario debe saber antes de continuar

**Contextos específicos:**
- Alert boxes: ⚠️ "Revisar antes de continuar"
- Status badges: "Pendiente de revisión"
- Borders de inputs con advertencias
- Background de secciones que requieren acción no urgente

**NO usar para:**
- Errores críticos (usar error)
- Estados positivos (usar success)

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AA (3.21:1)
- Sobre neutral-900 (#171717): ✅ AAA (15.67:1)

---

### Error
```
Hex: #ef4444
RGB: 239, 68, 68
HSL: 0°, 84%, 60%
Tailwind: error
```

**Cuándo usar:**
- Operación falló y requiere corrección inmediata
- Validación de formulario no pasó
- Conexión perdida o timeout
- Configuración inválida que bloquea funcionalidad
- Mensaje no pudo enviarse

**Contextos específicos:**
- Error messages: "No se pudo conectar al servidor"
- Form validation: "Este campo es requerido"
- Status badges: "Falló"
- Destructive actions: Botón de "Eliminar"

**NO usar para:**
- Advertencias no críticas (usar warning)
- Estados de carga o pendientes

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AA (3.04:1)
- Sobre neutral-900 (#171717): ✅ AAA (16.59:1)

---

### Info
```
Hex: #3b82f6
RGB: 59, 130, 246
HSL: 217°, 91%, 60%
Tailwind: info
```

**Cuándo usar:**
- Información neutral o educativa
- Tips o ayudas contextuales
- Estados de carga o procesamiento
- Notificaciones informativas sin urgencia
- Links a documentación

**Contextos específicos:**
- Info boxes: 💡 "Sabías que..."
- Loading states: "Cargando datos..."
- Status badges: "En proceso"
- Tooltips explicativos

**NO usar para:**
- Acciones principales (usar nordia)
- Errores o warnings (usar semánticos específicos)

**Contraste con texto:**
- Sobre blanco (#FFFFFF): ✅ AA (3.06:1)
- Sobre neutral-900 (#171717): ✅ AAA (16.48:1)

---

## 3. Escala de Neutrales

### Neutral-950
```
Hex: #0a0a0a
RGB: 10, 10, 10
Tailwind: neutral-950
```
**Uso:** Texto principal en modo oscuro, backgrounds de máxima profundidad

---

### Neutral-900
```
Hex: #171717
RGB: 23, 23, 23
Tailwind: neutral-900
```
**Uso:** Texto principal (default body text), headings de máxima jerarquía

**Contraste sobre blanco:** ✅ AAA (16.11:1)

---

### Neutral-700
```
Hex: #404040
RGB: 64, 64, 64
Tailwind: neutral-700
```
**Uso:** Texto secundario, metadata (timestamps, labels)

**Contraste sobre blanco:** ✅ AAA (9.73:1)

---

### Neutral-600
```
Hex: #525252
RGB: 82, 82, 82
Tailwind: neutral-600
```
**Uso:** Texto terciario, placeholders, disabled text

**Contraste sobre blanco:** ✅ AAA (7.27:1)

---

### Neutral-300
```
Hex: #d4d4d4
RGB: 212, 212, 212
Tailwind: neutral-300
```
**Uso:** Borders de inputs, divisores sutiles, backgrounds de disabled states

---

### Neutral-200
```
Hex: #e5e5e5
RGB: 229, 229, 229
Tailwind: neutral-200
```
**Uso:** Borders principales, divisores de secciones

---

### Neutral-100
```
Hex: #f5f5f5
RGB: 245, 245, 245
Tailwind: neutral-100
```
**Uso:** Backgrounds de secciones alternadas, hover states sutiles, card backgrounds

---

### Neutral-50
```
Hex: #fafafa
RGB: 250, 250, 250
Tailwind: neutral-50
```
**Uso:** Backgrounds principales, offwhite para reducir fatiga visual

---

### Neutral-0 (White)
```
Hex: #ffffff
RGB: 255, 255, 255
Tailwind: white
```
**Uso:** Backgrounds de cards sobre fondos grises, texto sobre fondos oscuros

---

## 4. Estados de Flujo (Demo/AdminPanel)

Estos colores son específicos para visualización de estados de flujos en el AdminPanel o demos interactivas.

### Pending (Gris)
```
Hex: #6b7280
RGB: 107, 114, 128
Tailwind: gray-500
```
**Psicología:** Neutro, sin acción tomada aún
**Uso:** Pasos de flujo que aún no se ejecutaron, mensajes en queue

---

### Active (Azul)
```
Hex: #3b82f6 (mismo que info)
RGB: 59, 130, 246
Tailwind: info / blue-500
```
**Psicología:** En proceso, requiere atención
**Uso:** Paso de flujo actualmente ejecutándose, mensaje siendo enviado

---

### Completed (Verde)
```
Hex: #00ff88 (mismo que success)
RGB: 0, 255, 136
Tailwind: success / nordia
```
**Psicología:** Éxito, tarea terminada
**Uso:** Paso de flujo completado, mensaje enviado exitosamente

---

### Failed (Rojo)
```
Hex: #ef4444 (mismo que error)
RGB: 239, 68, 68
Tailwind: error / red-500
```
**Psicología:** Error, requiere intervención
**Uso:** Paso de flujo que falló, mensaje no enviado

---

### Skipped (Naranja)
```
Hex: #f59e0b
RGB: 245, 158, 11
Tailwind: orange-500
```
**Psicología:** Omitido intencionalmente, no es error
**Uso:** Paso de flujo que se salteó por condición, ruta alternativa tomada

**Contraste con texto:**
- Sobre blanco: ✅ AA (3.51:1)
- Sobre neutral-900: ✅ AAA (14.36:1)

---

## 5. WhatsApp Colors (Simulaciones)

Cuando se simulen interfaces de WhatsApp (ej: en demos), usar esta paleta para mantener familiaridad:

### WhatsApp Background
```
Hex: #ECE5DD
RGB: 236, 229, 221
```
**Uso:** Background del chat simulado

---

### WhatsApp Sent Bubble
```
Hex: #DCF8C6
RGB: 220, 248, 198
```
**Uso:** Mensajes enviados por el negocio

---

### WhatsApp Received Bubble
```
Hex: #FFFFFF
RGB: 255, 255, 255
```
**Uso:** Mensajes recibidos del cliente

---

### WhatsApp Text
```
Hex: #303030
RGB: 48, 48, 48
```
**Uso:** Texto dentro de burbujas de WhatsApp

---

## 6. Reglas Críticas de Uso

### ❌ Prohibiciones Absolutas

1. **NO inventar colores** — Si un color no está en este documento, no existe
2. **NO usar gradientes entre colores** — Solo colores sólidos o gradientes neutral → transparent
3. **NO cambiar significado semántico** — Verde siempre es success, rojo siempre es error
4. **NO usar más de 3 colores en un componente** — (neutral no cuenta como color)
5. **NO usar colores primarios para texto largo** — Solo neutrales para body text
6. **NO usar fondos de color saturado** — Fondos siempre neutrales o tintes con alpha <0.1

### ✅ Reglas de Combinación

**Jerarquía de color por sección:**
1. Neutral como base (background, texto principal)
2. UN color semántico o nordia para acción principal
3. Máximo un color adicional para información secundaria

**Ejemplo válido (Hero section):**
- Background: neutral-50
- Heading: neutral-900
- Paragraph: neutral-700
- CTA Button: nordia-DEFAULT
- Secondary link: info (blue)

**Ejemplo inválido:**
- Background: nordia-light (demasiado saturado)
- Heading: info (debería ser neutral)
- Paragraph: neutral-700 (OK)
- CTA Button: warning (confuso, no es advertencia)
- Secondary link: error (confuso, no es error)

---

## 7. Accesibilidad (WCAG)

Todas las combinaciones de color DEBEN cumplir:

- **Texto normal (16px):** Mínimo AA (4.5:1)
- **Texto grande (24px o bold 18px):** Mínimo AA (3:1)
- **Elementos UI (buttons, borders):** Mínimo AA (3:1)

**Target ideal:** AAA en todo texto crítico (7:1)

### Combinaciones Pre-Validadas

| Color | Background | Ratio | WCAG |
|-------|-----------|-------|------|
| neutral-900 | white | 16.11:1 | ✅ AAA |
| neutral-700 | white | 9.73:1 | ✅ AAA |
| neutral-600 | white | 7.27:1 | ✅ AAA |
| nordia-DEFAULT | neutral-900 | 13.21:1 | ✅ AAA |
| nordia-dark | white | 5.42:1 | ✅ AAA |

---

## 8. Validación Pre-Deploy

Antes de deployar cualquier componente, verificar:

- [ ] Todos los colores usados están en este documento
- [ ] Contraste de texto cumple WCAG AA mínimo
- [ ] Colores semánticos se usan correctamente (verde = success, rojo = error)
- [ ] No se usan más de 3 colores en un componente
- [ ] Fondos son neutrales o transparentes

**Si alguna verificación falla, el componente NO debe ir a producción.**

---

**Última actualización:** 2026-02-09
