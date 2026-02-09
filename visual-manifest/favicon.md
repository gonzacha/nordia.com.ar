# Favicon Oficial Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## 1. Concepto de Diseño

### ¿Qué Representa el Favicon de Nordia?

El favicon de Nordia debe comunicar **estructura, sistema y determinismo** en un espacio mínimo de 16x16 píxeles. No representa "conversación" ni "chat", sino la naturaleza sistemática y predecible de la herramienta.

### Restricciones Conceptuales

**NO usar:**
- ❌ Ícono genérico de chat bubble o mensaje
- ❌ Logo de WhatsApp o referencia visual directa (restricciones legales)
- ❌ Representación de "persona hablando" o elementos antropomórficos
- ❌ Símbolos de "IA" o "robot" (comunicaría lo opuesto a determinismo)

**SÍ representar:**
- ✅ **Sistema:** Estructura, organización, red de nodos
- ✅ **Orden:** Geometría clara, patrones repetibles
- ✅ **Institucional:** Forma reconocible, no casual
- ✅ **Nordia:** Relación visual con el color verde (#00ff88)

### Por Qué Este Enfoque

Nordia no es un chatbot que "habla". Es un sistema que **ejecuta reglas**. El favicon debe reflejar esto visualmente: no es orgánico ni conversacional, es estructurado y predecible. Un usuario que ve el favicon debe intuir "herramienta profesional", no "app de mensajería".

---

## 2. Propuesta de Diseño

### Concepto Visual: Grid Estructurado en Rombo

**Forma base:** Rombo (cuadrado rotado 45°)
**Elementos internos:** Grid de 3x3 puntos o líneas
**Color principal:** Verde Nordia (#00ff88)
**Background:** Transparente o neutral oscuro según contexto

### Descripción Detallada

El favicon consiste en:

1. **Rombo exterior:**
   - Forma geométrica distintiva (no es el típico círculo o cuadrado)
   - Rotación de 45° comunica "diferente pero ordenado"
   - Border sólido de 2px en verde Nordia (#00ff88)

2. **Grid interno:**
   - 3x3 puntos o nodos conectados
   - Representa "sistema de flujos" o "red determinística"
   - Cada punto es visible incluso en 16x16px (círculos de 2px)
   - Conexiones opcionales (líneas sutiles) si el tamaño lo permite

3. **Contraste:**
   - Background del rombo: Neutral-900 (#171717) o transparente
   - Puntos del grid: Verde Nordia (#00ff88)
   - Alto contraste garantiza legibilidad en tabs claros y oscuros

### Por Qué Este Diseño

- **Rombo:** Distintivo en una fila de tabs (la mayoría son círculos o cuadrados rectos)
- **Grid 3x3:** Lo más complejo que se puede representar en 16x16px sin perder claridad
- **Monocromático verde:** Instantáneamente asociable con la marca Nordia
- **Funciona en 16x16px:** La forma es reconocible incluso en el tamaño mínimo de navegador

### Alternativas Consideradas (y Por Qué Se Descartaron)

| Alternativa | Por Qué NO |
|-------------|-----------|
| "N" estilizada | Demasiado genérica, no comunica "sistema" |
| Ícono de flujo (flechas) | Se confunde con diagramas técnicos, poco distintivo |
| Cuadrado simple verde | Demasiado básico, no memorable |
| Nodo de red con conexiones | Demasiado complejo para 16x16px, se ve borroso |

---

## 3. Especificaciones Técnicas

### Formatos Requeridos

Nordia debe tener el favicon en los siguientes formatos:

#### SVG (Vectorial, Escalable)
```
/public/favicon.svg
```
**Uso:** Navegadores modernos (Chrome, Firefox, Safari moderno)
**Ventajas:** Escalable sin pérdida de calidad, perfecto para pantallas retina
**Especificaciones:**
- ViewBox: `0 0 32 32` (diseñar en 32x32, el browser escala)
- Colores: Sólidos, sin gradientes
- Formas: Paths simples, sin filtros o efectos

---

#### PNG 16x16 (Mínimo)
```
/public/favicon-16x16.png
```
**Uso:** Fallback para navegadores viejos, tamaño de tab estándar
**Especificaciones:**
- Dimensiones: 16x16px exacto
- Formato: PNG-8 (256 colores suficientes)
- Fondo: Transparente
- Antialiasing: Minimal (para mantener sharpness)

---

#### PNG 32x32 (Estándar)
```
/public/favicon-32x32.png
```
**Uso:** Pantallas retina, bookmarks, algunos navegadores
**Especificaciones:**
- Dimensiones: 32x32px exacto
- Formato: PNG-24 (con alpha channel)
- Fondo: Transparente
- Antialiasing: Suave (hay espacio para detalles)

---

#### Apple Touch Icon (180x180)
```
/public/apple-touch-icon.png
```
**Uso:** iOS home screen, iPad, iPhone
**Especificaciones:**
- Dimensiones: 180x180px exacto
- Formato: PNG-24
- Fondo: Sólido (neutral-900 o nordia)
- No transparencia (iOS agrega sus propios efectos)
- Padding interno: 10% (el ícono no debe tocar los bordes)

---

### Paleta de Colores para Favicon

**Monocromático o máximo 2 colores:**

| Elemento | Color | Hex | Uso |
|----------|-------|-----|-----|
| Border del rombo | Nordia Primary | #00ff88 | Contorno principal |
| Puntos del grid | Nordia Primary | #00ff88 | Nodos internos |
| Background del rombo | Neutral-900 | #171717 | Fondo (o transparente) |

**Variante para Apple Touch Icon (fondo sólido requerido):**
- Background: Neutral-900 (#171717)
- Rombo y grid: Nordia Primary (#00ff88)
- Padding: 18px (10% de 180px)

---

### Formas y Geometría

**Especificaciones del rombo:**
- Tamaño: 28x28px en canvas de 32x32px (deja 2px de margen)
- Rotación: 45° exacto
- Border width: 2px
- Border radius: 0 (esquinas sharp, no redondeadas)

**Especificaciones del grid 3x3:**
- Puntos: 3 filas x 3 columnas
- Spacing: Equidistante (aprox. 6px entre centros en 32x32)
- Radio de puntos: 2px (círculos pequeños pero visibles)
- Conexiones (opcional): Líneas de 1px entre puntos adyacentes

**Sin texto:**
- NO incluir letra "N" ni texto alguno
- Texto es ilegible en 16x16px y genera ruido visual

---

## 4. Implementación HTML

### Head Tags Requeridos

El siguiente código debe estar en el `<head>` de todas las páginas:

```html
<!-- Favicon SVG (prioridad para navegadores modernos) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Fallback PNG para navegadores sin soporte SVG -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon (iOS, iPadOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Manifest (para PWA, opcional pero recomendado) -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme color para navegadores móviles -->
<meta name="theme-color" content="#171717">
```

### Manifest (site.webmanifest)

```json
{
  "name": "Nordia",
  "short_name": "Nordia",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#00ff88",
  "background_color": "#171717",
  "display": "standalone"
}
```

**Nota:** Si Nordia eventualmente se convierte en PWA, estos íconos adicionales (192x192 y 512x512) serán necesarios.

---

## 5. Generación del Favicon

### Proceso Recomendado

1. **Diseñar en Figma/Illustrator a 32x32px:**
   - Canvas: 32x32px
   - Rombo: 28x28px con 2px de margen
   - Grid 3x3 interno con puntos de 2px
   - Colores: #00ff88 sobre fondo #171717 o transparente

2. **Exportar SVG:**
   - Optimizar con SVGO o Figma "Outline Stroke"
   - Verificar que el código es limpio (sin IDs innecesarios, sin comentarios)
   - ViewBox debe ser `0 0 32 32`

3. **Generar PNGs:**
   - Desde el SVG, exportar 16x16, 32x32, 180x180
   - Herramienta recomendada: https://realfavicongenerator.net/
   - Verificar manualmente que 16x16 se ve sharp (no borroso)

4. **Verificar en Múltiples Contextos:**
   - Chrome tab (light mode y dark mode)
   - Firefox tab
   - Safari tab
   - iOS home screen
   - Android home screen (si aplica)

---

## 6. Testing y Validación

### Checklist Pre-Deploy

- [ ] SVG está optimizado (sin código innecesario)
- [ ] PNG 16x16 se ve sharp, no borroso
- [ ] PNG 32x32 tiene detalles claros
- [ ] Apple Touch Icon tiene padding interno (no toca bordes)
- [ ] Funciona en light mode (contrasta con fondo blanco de tab)
- [ ] Funciona en dark mode (contrasta con fondo oscuro de tab)
- [ ] No viola trademark de WhatsApp (no usa su logo ni elementos distintivos)
- [ ] Es reconocible en una fila de 10+ tabs abiertos

### Herramientas de Testing

**Favicon Checker:**
```
https://realfavicongenerator.net/favicon_checker
```

**Previsualización en Vivo:**
```html
<!-- Abrir esta página en el navegador para ver el favicon en action -->
<!DOCTYPE html>
<html>
<head>
  <title>Nordia Favicon Test</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <h1>Si ves el favicon en el tab, funciona</h1>
</body>
</html>
```

---

## 7. Variantes Alternativas (Para Futuros Estados)

Aunque actualmente Nordia tiene un solo favicon, estos son casos donde podrían existir variantes:

### Favicon con Badge (Notificaciones)

Si eventualmente se necesita indicar notificaciones no leídas:

```html
<!-- Usar librería como tinycon.js para agregar badge dinámico -->
<script src="tinycon.min.js"></script>
<script>
  Tinycon.setBubble(3); // Muestra "3" en el favicon
</script>
```

**Reglas:**
- Solo usar si hay notificaciones críticas (mensajes no leídos)
- Badge en rojo (#ef4444) sobre fondo del favicon
- Debe ser legible en 16x16px (máximo 2 dígitos: "99+")

---

### Favicon Animado (NO USAR)

**Prohibición explícita:**
- ❌ NO crear favicon.gif animado
- ❌ NO rotar el favicon con JavaScript
- ❌ NO cambiar el favicon constantemente

**Por qué:**
- Distrae en la fila de tabs
- Alto consumo de CPU (se renderiza continuamente)
- Comunica "startup que llama la atención", no "herramienta seria"

**Excepción única:**
- Si hay una tarea crítica en progreso (upload de archivo), puede cambiar temporalmente a un favicon de "loading", pero debe volver al original al terminar.

---

## 8. Licencia y Trademark

### Propiedad

El favicon es propiedad de Nordia y parte de su identidad de marca registrada.

### Restricciones de Uso

- ✅ Usar en el sitio oficial de Nordia
- ✅ Usar en documentación oficial
- ✅ Usar en comunicaciones institucionales
- ❌ NO usar en proyectos no relacionados con Nordia
- ❌ NO modificar los colores o forma sin autorización
- ❌ NO usar como logo de terceros

---

## 9. Mantenimiento y Evolución

### Cuándo Actualizar el Favicon

El favicon debe actualizarse SOLO si:
1. **Rebrand completo:** Cambio de identidad visual de Nordia
2. **Feedback negativo consistente:** Usuarios reportan que no es distinguible o se confunde
3. **Restricciones legales:** Reclamo de trademark que requiere cambio

**NO actualizar por:**
- ❌ "Modernizar" sin razón funcional
- ❌ Seguir tendencias visuales pasajeras
- ❌ Preferencias personales de diseñadores individuales

### Proceso de Actualización

Si se requiere actualizar:
1. Propuesta debe justificar por qué el actual no funciona
2. Diseño debe pasar por Design Systems Lead
3. Testing A/B con usuarios reales (reconocimiento de marca)
4. Implementación gradual (no cambiar de un día para otro)
5. Comunicación a usuarios existentes (changelog)

---

## 10. Ejemplo de Código SVG (Propuesta)

```svg
<!-- favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- Background (opcional, puede ser transparente) -->
  <rect width="32" height="32" fill="#171717" rx="0"/>

  <!-- Rombo exterior (rotado 45°) -->
  <rect x="4" y="4" width="24" height="24"
        fill="none" stroke="#00ff88" stroke-width="2"
        transform="rotate(45 16 16)"/>

  <!-- Grid 3x3 de puntos -->
  <!-- Fila 1 -->
  <circle cx="10" cy="10" r="2" fill="#00ff88"/>
  <circle cx="16" cy="10" r="2" fill="#00ff88"/>
  <circle cx="22" cy="10" r="2" fill="#00ff88"/>

  <!-- Fila 2 -->
  <circle cx="10" cy="16" r="2" fill="#00ff88"/>
  <circle cx="16" cy="16" r="2" fill="#00ff88"/>
  <circle cx="22" cy="16" r="2" fill="#00ff88"/>

  <!-- Fila 3 -->
  <circle cx="10" cy="22" r="2" fill="#00ff88"/>
  <circle cx="16" cy="22" r="2" fill="#00ff88"/>
  <circle cx="22" cy="22" r="2" fill="#00ff88"/>
</svg>
```

**Nota:** Este es un ejemplo conceptual. El diseño final debe ser creado por un diseñador siguiendo estas especificaciones, optimizado para máxima legibilidad en 16x16px.

---

**Última actualización:** 2026-02-09
