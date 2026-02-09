# Tipografía Oficial Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## Filosofía Tipográfica

La tipografía de Nordia prioriza **legibilidad y claridad jerárquica** sobre expresión estética. Usamos sans-serif modernas que comunican profesionalismo sin frialdad, y monospace para contextos técnicos.

**Principio rector:** La tipografía debe ser invisible cuando funciona bien.

---

## 1. Tipografías Oficiales

### Headings: Space Grotesk

**Font:** Space Grotesk
**Diseñador:** Florian Karsten
**Tipo:** Geometric sans-serif
**Weights disponibles:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap
```

**Fallback stack:**
```css
font-family: 'Space Grotesk', ui-sans-serif, system-ui, -apple-system,
             BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Tailwind config:**
```javascript
fontFamily: {
  heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif']
}
```

**Razón de elección:**

Space Grotesk es una tipografía geométrica con personalidad sobria. Su estructura angular y sus proporciones balanceadas comunican modernidad institucional sin caer en tendencias visuales pasajeras. A diferencia de otras geometric sans (como Futura), mantiene legibilidad en tamaños pequeños y no se siente "demasiado perfecta" (lo que podría percibirse como frío o artificial).

**Características clave:**
- Apertures amplias (buena legibilidad)
- Altura-x generosa (funciona en pantalla)
- Formas geométricas sin ser rígidas
- Personalidad distinguible sin ser llamativa

**NO usar para:** Body text extenso (usar Inter)

---

### Body: Inter

**Font:** Inter
**Diseñador:** Rasmus Andersson
**Tipo:** Sans-serif optimizada para UI
**Weights disponibles:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap
```

**Fallback stack:**
```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system,
             BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Tailwind config:**
```javascript
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
}
```

**Razón de elección:**

Inter fue diseñada específicamente para interfaces digitales. Su hinting excepcional y sus proporciones optimizadas para pantalla garantizan legibilidad en cualquier tamaño. Es la elección estándar para productos enterprise (GitHub, Stripe, Linear) porque es neutral, profesional y extremadamente funcional.

**Características clave:**
- Optimizada para pantallas (hinting perfecto)
- Distinguible en tamaños pequeños
- Neutral sin ser genérica
- Ampliamente testeada en productos de escala

**NO usar para:** Headings principales (usar Space Grotesk para diferenciación)

---

### Code/Comandos: JetBrains Mono

**Font:** JetBrains Mono
**Diseñador:** Philipp Nurullin (JetBrains)
**Tipo:** Monospace
**Weights disponibles:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap
```

**Fallback stack:**
```css
font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
```

**Tailwind config:**
```javascript
fontFamily: {
  mono: ['JetBrains Mono', 'Courier New', 'monospace']
}
```

**Razón de elección:**

JetBrains Mono fue diseñada para lectura de código. Sus ligaduras opcionales, altura incrementada y formas distinguibles (0 vs O, 1 vs l vs I) la hacen ideal para mostrar comandos del AdminPanel, logs de sistema o snippets técnicos. A diferencia de Monaco o Consolas, está disponible como webfont sin problemas de licencia.

**Uso específico:**
- Comandos del AdminPanel: `!send_message`
- Logs de sistema o timestamps técnicos
- Código inline: `const flow = 'registro'`
- Tablas de registro con datos estructurados

**NO usar para:** Párrafos largos o copy marketing

---

## 2. Escala Tipográfica

### Desktop (≥1024px)

| Elemento | Tamaño | Line Height | Weight | Font |
|----------|--------|-------------|--------|------|
| **H1** | 4rem (64px) | 1.1 (70px) | 700 | Space Grotesk |
| **H2** | 3rem (48px) | 1.2 (58px) | 600 | Space Grotesk |
| **H3** | 2.25rem (36px) | 1.3 (47px) | 600 | Space Grotesk |
| **H4** | 1.875rem (30px) | 1.4 (42px) | 600 | Space Grotesk |
| **H5** | 1.5rem (24px) | 1.5 (36px) | 600 | Space Grotesk |
| **H6** | 1.25rem (20px) | 1.5 (30px) | 600 | Space Grotesk |
| **Lead** | 1.25rem (20px) | 1.6 (32px) | 400 | Inter |
| **Paragraph** | 1rem (16px) | 1.75 (28px) | 400 | Inter |
| **Small** | 0.875rem (14px) | 1.6 (22px) | 400 | Inter |
| **Caption** | 0.75rem (12px) | 1.5 (18px) | 500 | Inter |

### Mobile (<768px)

| Elemento | Tamaño | Line Height | Weight | Font |
|----------|--------|-------------|--------|------|
| **H1** | 2.5rem (40px) | 1.2 (48px) | 700 | Space Grotesk |
| **H2** | 2rem (32px) | 1.25 (40px) | 600 | Space Grotesk |
| **H3** | 1.75rem (28px) | 1.3 (36px) | 600 | Space Grotesk |
| **H4** | 1.5rem (24px) | 1.4 (34px) | 600 | Space Grotesk |
| **H5** | 1.25rem (20px) | 1.5 (30px) | 600 | Space Grotesk |
| **H6** | 1.125rem (18px) | 1.5 (27px) | 600 | Space Grotesk |
| **Lead** | 1.125rem (18px) | 1.6 (29px) | 400 | Inter |
| **Paragraph** | 1rem (16px) | 1.75 (28px) | 400 | Inter |
| **Small** | 0.875rem (14px) | 1.6 (22px) | 400 | Inter |
| **Caption** | 0.75rem (12px) | 1.5 (18px) | 500 | Inter |

---

## 3. Jerarquía Visual: Cuándo Usar Cada Nivel

### H1 — Hero Principal

**Uso:** Una sola vez por página, en la sección hero principal.

**Contexto:**
- Landing page: Título principal ("Convierte WhatsApp en tu herramienta operativa")
- Páginas internas: NO usar (usar H2)

**Reglas:**
- Máximo 8-10 palabras
- No usar puntos finales
- Siempre acompañado de párrafo lead o subtítulo

**Ejemplo:**
```html
<h1 className="font-heading text-4xl md:text-6xl font-bold text-neutral-900">
  WhatsApp como herramienta institucional
</h1>
```

---

### H2 — Títulos de Sección

**Uso:** Inicio de cada sección principal del sitio.

**Contexto:**
- "Cómo funciona"
- "Planes y precios"
- "Preguntas frecuentes"

**Reglas:**
- Máximo 12 palabras
- Puede usarse múltiples veces por página
- Debe tener padding vertical generoso (py-16 md:py-24)

**Ejemplo:**
```html
<h2 className="font-heading text-3xl md:text-5xl font-semibold text-neutral-900">
  Tres componentes que funcionan en conjunto
</h2>
```

---

### H3 — Subsecciones

**Uso:** Títulos de cards, features, testimonios.

**Contexto:**
- Título de un feature individual
- Nombre de un plan de precios
- Pregunta en FAQ (expandibles)

**Reglas:**
- Debe estar contenido en una sección con H2
- Puede repetirse múltiples veces (ej: 6 features)

**Ejemplo:**
```html
<h3 className="font-heading text-2xl md:text-4xl font-semibold text-neutral-900">
  Registro exhaustivo de operaciones
</h3>
```

---

### H4 — Subtítulos de componentes

**Uso:** Subtítulos dentro de cards o secciones complejas.

**Contexto:**
- Categorías dentro de una lista
- Subtítulos de tabs
- Títulos de modals

**Reglas:**
- Debe estar subordinado a H3
- No usar si H3 no está presente

---

### H5 y H6 — Microtítulos

**Uso:** Raramente necesarios. Solo para documentación técnica o AdminPanel.

**Contexto:**
- Labels de secciones en formularios complejos
- Títulos de accordions anidados
- Headers de tablas complejas

---

### Lead — Párrafo Destacado

**Uso:** Subtítulo o descripción principal justo debajo de H1 o H2.

**Contexto:**
- Hero description
- Introducción de sección

**Reglas:**
- Máximo 2 oraciones (aprox. 25 palabras)
- Siempre neutral-700 o neutral-600
- Peso 400 (regular), nunca bold

**Ejemplo:**
```html
<p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
  Sistema determinístico que convierte WhatsApp Business en herramienta
  operativa predecible para negocios de barrio.
</p>
```

---

### Paragraph — Texto Principal

**Uso:** Body text general, explicaciones, descripciones.

**Contexto:**
- Descripción de features
- Contenido de FAQ
- Copy general

**Reglas:**
- Siempre Inter 400 (regular)
- Color neutral-700 (default) o neutral-600 (secundario)
- Line-height 1.75 (generoso para legibilidad)
- Max-width: 65-75 caracteres (aprox. 600-700px)

**Ejemplo:**
```html
<p className="text-base text-neutral-700 leading-relaxed max-w-2xl">
  Nordia ejecuta flujos definidos por el comerciante. No improvisa respuestas
  ni requiere entrenamiento. Cada mensaje sigue una regla explícita.
</p>
```

---

### Small — Texto Secundario

**Uso:** Metadata, disclaimers, timestamps, labels.

**Contexto:**
- "Última actualización: 5 min atrás"
- "Plan incluye 1000 mensajes/mes"
- Labels de inputs

**Reglas:**
- Siempre neutral-600 o neutral-500
- Peso 400 (regular) o 500 (medium) para labels

**Ejemplo:**
```html
<span className="text-sm text-neutral-600">
  Actualizado hace 2 minutos
</span>
```

---

### Caption — Texto Mínimo

**Uso:** Footnotes, legal copy, badges pequeños.

**Contexto:**
- "© 2026 Nordia"
- Badges de versión
- Tooltips

**Reglas:**
- NUNCA para información crítica (muy pequeño)
- Peso 500 (medium) para distinguibilidad
- Solo en contextos donde el tamaño es necesario

**Ejemplo:**
```html
<span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
  Beta
</span>
```

---

## 4. Reglas de Composición

### Max Line Length

**Body text:** Máximo 65-75 caracteres por línea (aprox. 600-700px)

**Razón:** La legibilidad óptima se logra cuando el ojo no tiene que hacer saltos largos. Líneas muy largas fatigan la lectura.

**Implementación:**
```html
<p className="max-w-2xl"> <!-- 672px -->
  Texto largo aquí...
</p>
```

**Excepción:** Tablas, logs, código (pueden ser más anchos).

---

### Alineación

**Default:** Izquierda (left-aligned)

**Centro:** SOLO para:
- Hero headings (H1)
- Secciones con texto corto (< 3 líneas)
- CTAs aislados

**Justificado:** NUNCA (crea rivers y espaciado irregular)

**Derecha:** NUNCA (salvo casos específicos de metadata en tablas)

---

### Letter Spacing

**Default:** Normal (tracking-normal)

**Increased tracking (tracking-wide):**
- Uppercase text (badges, labels)
- Headings all-caps (solo H5/H6)

**NO usar tracking en:**
- Párrafos largos (reduce legibilidad)
- Headings principales (H1-H3)

**Implementación:**
```html
<span className="uppercase tracking-wide text-xs font-medium">
  Nuevo
</span>
```

---

### Text Transform

**Uppercase:**
- ✅ Badges pequeños (< 12px)
- ✅ Labels de categorías
- ✅ Breadcrumbs
- ❌ NUNCA en párrafos largos (ilegible)
- ❌ NUNCA en headings principales (agresivo)

**Lowercase:**
- ✅ Default para todo
- ❌ Nunca forzar lowercase en nombres propios

**Capitalize:**
- ✅ Títulos (H1-H6)
- ✅ Botones y CTAs
- ❌ No automático (usar sentence case)

---

### Emphasis (Bold, Italic)

**Bold (font-weight: 600 o 700):**
- ✅ Términos clave en párrafos
- ✅ Cifras importantes ("3 segundos")
- ✅ Calls-to-action en texto
- ❌ NO abusar (máximo 1-2 palabras por párrafo)

**Italic (font-style: italic):**
- ✅ Términos en otro idioma ("onboarding")
- ✅ Citas textuales breves
- ❌ NO para énfasis general (usar bold)
- ❌ NO en headings (poco legible)

**Underline:**
- ✅ Solo para links (mantener convención web)
- ❌ NUNCA para énfasis (usar bold)

---

## 5. Casos Especiales

### Números y Cifras

**Cifras destacadas (metrics, stats):**
```html
<span className="font-heading text-5xl font-bold text-nordia">
  3<span className="text-neutral-700">s</span>
</span>
<p className="text-sm text-neutral-600">tiempo de respuesta</p>
```

**Uso:** Hero stats, features con números como foco.

---

### Listas

**Bulleted lists:**
```html
<ul className="space-y-2 text-base text-neutral-700">
  <li>Item con punto</li>
  <li>Otro item</li>
</ul>
```

**Numbered lists:**
```html
<ol className="space-y-2 text-base text-neutral-700 list-decimal list-inside">
  <li>Primer paso</li>
  <li>Segundo paso</li>
</ol>
```

**Checklist (features):**
```html
<ul className="space-y-3">
  <li className="flex items-start gap-3">
    <span className="text-nordia">✓</span>
    <span className="text-neutral-700">Feature incluido</span>
  </li>
</ul>
```

---

### Quotes / Testimonios

```html
<blockquote className="border-l-4 border-nordia pl-6 py-2">
  <p className="text-lg text-neutral-700 italic">
    "Nordia convirtió WhatsApp en nuestro sistema de pedidos oficial."
  </p>
  <cite className="block text-sm text-neutral-600 mt-2 not-italic">
    — Juan Pérez, Ferretería El Tornillo
  </cite>
</blockquote>
```

---

### Código Inline

```html
<code className="font-mono text-sm bg-neutral-100 text-nordia-dark
              px-2 py-1 rounded">
  !send_message
</code>
```

---

### Código en Bloque

```html
<pre className="font-mono text-sm bg-nordia-darker text-neutral-50
                p-4 rounded-lg overflow-x-auto">
<code>
!define_flow registro {
  message: "¡Bienvenido!"
  wait_reply: true
}
</code>
</pre>
```

---

## 6. Accesibilidad Tipográfica

### Contraste

- Texto normal (16px): Mínimo 4.5:1 (WCAG AA)
- Texto grande (24px): Mínimo 3:1 (WCAG AA)

**Combinaciones validadas:**
- neutral-900 sobre white: ✅ 16.11:1 (AAA)
- neutral-700 sobre white: ✅ 9.73:1 (AAA)
- neutral-600 sobre white: ✅ 7.27:1 (AAA)

### Tamaño Mínimo

- **Desktop:** 16px para body text
- **Mobile:** 16px para body text (NO reducir en mobile)

**Razón:** Tamaños menores requieren zoom en mobile, empeorando UX.

### Line Height

- **Mínimo:** 1.5 para body text
- **Recomendado:** 1.75 para párrafos largos
- **Headings:** 1.1-1.4 (más cerrado porque son líneas cortas)

---

## 7. Implementación en Tailwind

### Clases Predefinidas

```javascript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Courier New', 'monospace']
    },
    fontSize: {
      // Mobile-first approach
      'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      'h2': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],
      'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
      'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
      'h5': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
      'h6': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
      // Desktop overrides via md: breakpoint
    }
  }
}
```

### Uso en Componentes

```tsx
// Heading component
<h1 className="font-heading text-4xl md:text-6xl font-bold text-neutral-900">
  Título Principal
</h1>

// Paragraph
<p className="text-base text-neutral-700 leading-relaxed max-w-2xl">
  Texto del párrafo con máxima legibilidad.
</p>

// Code inline
<code className="font-mono text-sm bg-neutral-100 text-nordia-dark px-2 py-1 rounded">
  !comando
</code>
```

---

## 8. Validación Pre-Deploy

Antes de deployar cualquier componente con texto, verificar:

- [ ] Headings usan Space Grotesk
- [ ] Body text usa Inter
- [ ] Código/comandos usan JetBrains Mono
- [ ] Tamaño mínimo de texto es 16px (mobile y desktop)
- [ ] Line height de párrafos es mínimo 1.5
- [ ] Contraste de texto cumple WCAG AA
- [ ] Max-width de párrafos largos no excede 700px
- [ ] No se usa uppercase en párrafos largos

**Si alguna verificación falla, el componente NO debe ir a producción.**

---

**Última actualización:** 2026-02-09
