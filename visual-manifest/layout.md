# Sistema de Layout Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## Filosofía de Layout

El layout de Nordia sigue el principio de **breathing room** — más espacio en blanco que densidad de información. Los elementos deben tener espacio para respirar, creando una jerarquía visual clara y reduciendo carga cognitiva.

**Principio rector:** El espacio vacío comunica tanto como el contenido.

---

## 1. Sistema de Spacing

Nordia usa el sistema de spacing de Tailwind basado en unidades de 4px.

### Base Unit
```
1 unit = 4px
```

### Escala Completa

| Token | Valor (px) | Valor (rem) | Tailwind | Uso Típico |
|-------|-----------|-------------|----------|------------|
| `0` | 0 | 0 | `p-0`, `m-0` | Reset |
| `1` | 4px | 0.25rem | `p-1`, `m-1` | Padding mínimo (badges) |
| `2` | 8px | 0.5rem | `p-2`, `m-2` | Padding interno de botones |
| `3` | 12px | 0.75rem | `p-3`, `m-3` | Padding de cards pequeñas |
| `4` | 16px | 1rem | `p-4`, `m-4` | **Spacing base estándar** |
| `5` | 20px | 1.25rem | `p-5`, `m-5` | Padding de cards medianas |
| `6` | 24px | 1.5rem | `p-6`, `m-6` | Padding de cards grandes |
| `8` | 32px | 2rem | `p-8`, `m-8` | **Spacing entre elementos** |
| `10` | 40px | 2.5rem | `p-10`, `m-10` | Padding de secciones small |
| `12` | 48px | 3rem | `p-12`, `m-12` | Padding de secciones medium |
| `16` | 64px | 4rem | `p-16`, `m-16` | **Padding de secciones large** |
| `20` | 80px | 5rem | `p-20`, `m-20` | Separación entre secciones |
| `24` | 96px | 6rem | `p-24`, `m-24` | **Padding de secciones XL** |
| `32` | 128px | 8rem | `p-32`, `m-32` | Separación máxima |

### Por Qué 4px

El sistema de 4px permite:
1. Alineación pixel-perfect en todas las densidades de pantalla
2. Escalabilidad coherente (cada salto es proporcional)
3. Compatibilidad con grids de 8px (común en diseño de sistemas)
4. Flexibilidad sin caer en decisiones arbitrarias

---

## 2. Vertical Rhythm (Spacing Vertical)

El spacing vertical crea respiración y jerarquía. Nordia usa tres niveles de separación vertical:

### Sections (Secciones completas de landing/app)

**Mobile:**
```css
py-16 (padding: 64px 0)
```

**Desktop:**
```css
md:py-24 (padding: 96px 0)
```

**Uso:**
- Hero section
- Features section
- Pricing section
- FAQ section

**Por qué este tamaño:**
Las secciones principales necesitan "respirar" para que el usuario perciba cambios de contexto. 64-96px es suficiente para crear separación visual clara sin desperdiciar viewport.

**Implementación:**
```html
<section className="py-16 md:py-24">
  <!-- Contenido de la sección -->
</section>
```

---

### Components (Componentes dentro de secciones)

**Mobile:**
```css
py-8 (padding: 32px 0)
```

**Desktop:**
```css
md:py-12 (padding: 48px 0)
```

**Uso:**
- Cards dentro de features
- Bloques de texto con título
- Grupos de elementos relacionados

**Por qué este tamaño:**
Los componentes necesitan separación suficiente para distinguirse, pero no tanto como una sección completa. 32-48px crea agrupación visual sin romper el flujo.

**Implementación:**
```html
<div className="py-8 md:py-12">
  <h3>Título del componente</h3>
  <p>Descripción...</p>
</div>
```

---

### Elements (Elementos individuales)

**Mobile:**
```css
py-4 (padding: 16px 0)
```

**Desktop:**
```css
md:py-6 (padding: 24px 0)
```

**Uso:**
- Espacio entre párrafos
- Separación de list items
- Padding interno de botones

**Por qué este tamaño:**
Los elementos individuales necesitan respiración mínima. 16-24px es suficiente para separación sin crear huecos visuales incómodos.

**Implementación:**
```html
<p className="py-4 md:py-6">
  Párrafo con espaciado vertical...
</p>
```

---

### Tabla de Decisión Rápida

| Contexto | Mobile | Desktop | Ejemplo |
|----------|--------|---------|---------|
| Separación entre secciones principales | `py-16` | `md:py-24` | Hero → Features |
| Separación entre components | `py-8` | `md:py-12` | Card → Card |
| Separación entre elementos | `py-4` | `md:py-6` | Párrafo → Párrafo |
| Padding interno de cards | `p-6` | `md:p-8` | Card content |
| Padding interno de buttons | `px-6 py-3` | `md:px-8 md:py-4` | CTA button |

---

## 3. Container System

El container define el ancho máximo del contenido y su padding lateral.

### Configuración del Container

**Padding lateral:**
```css
px-4   (mobile: 16px)
md:px-8  (tablet: 32px)
lg:px-16 (desktop: 64px)
```

**Max width:**
```css
max-w-7xl (1280px)
```

**Centrado:**
```css
mx-auto
```

**Implementación completa:**
```html
<div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
  <!-- Contenido limitado a 1280px y centrado -->
</div>
```

### Por Qué 1280px

1280px es el ancho máximo en el que el contenido sigue siendo cómodamente legible sin requerir movimientos excesivos de cabeza. Es el estándar en laptops modernas (1440px de ancho de pantalla deja 80px de margen lateral).

**Excepciones:**
- Full-width backgrounds: No usar container en el wrapper, solo en el contenido interno
- Hero sections: Puede extenderse más allá de 1280px si el diseño lo requiere
- Tablas amplias: Usar scroll horizontal en mobile

---

### Ejemplo de Sección con Container

```html
<section className="py-16 md:py-24 bg-neutral-50">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
    <h2 className="font-heading text-3xl md:text-5xl font-semibold text-neutral-900">
      Título de Sección
    </h2>
    <p className="mt-4 text-lg text-neutral-700 max-w-2xl">
      Descripción de la sección con max-width para legibilidad.
    </p>
  </div>
</section>
```

---

## 4. Grid System

Nordia usa un grid de 12 columnas con gaps variables según contexto.

### Configuración Base

**Columnas:** 12 (estándar CSS Grid)
**Gaps disponibles:**
- `gap-4` (16px) — Para elementos densos (badges, tags)
- `gap-6` (24px) — **Default para cards y componentes**
- `gap-8` (32px) — Para separación generosa (features grandes)
- `gap-12` (48px) — Para secciones con mucho breathing room

### Breakpoints

Nordia usa los breakpoints de Tailwind:

| Breakpoint | Min Width | Uso Típico |
|------------|-----------|------------|
| `sm` | 640px | Teléfonos grandes / tablets pequeñas |
| `md` | 768px | **Tablets (cambio principal de layout)** |
| `lg` | 1024px | Laptops pequeñas |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Pantallas grandes (raro usar) |

**Breakpoint principal:** `md` (768px) — Aquí se hace el salto de mobile a desktop.

---

### Patrones de Grid Comunes

#### Grid 2 Columnas (Features)

**Mobile:** 1 columna
**Desktop:** 2 columnas

```html
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <div>Feature 1</div>
  <div>Feature 2</div>
</div>
```

---

#### Grid 3 Columnas (Cards pequeñas)

**Mobile:** 1 columna
**Tablet:** 2 columnas
**Desktop:** 3 columnas

```html
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

---

#### Grid 4 Columnas (Logos, badges)

**Mobile:** 2 columnas
**Tablet:** 3 columnas
**Desktop:** 4 columnas

```html
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>Logo 1</div>
  <div>Logo 2</div>
  <div>Logo 3</div>
  <div>Logo 4</div>
</div>
```

---

#### Sidebar Layout (AdminPanel)

**Desktop:** Sidebar fijo + contenido principal

```html
<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
  <aside>Sidebar</aside>
  <main>Contenido principal</main>
</div>
```

**Mobile:** Sidebar colapsa a menú hamburguesa (no usar grid).

---

### Cuándo NO Usar Grid

**Usar Flexbox en su lugar cuando:**
- Contenido tiene anchos variables (cards con texto de longitud distinta)
- Necesitas alineación vertical dinámica
- Solo hay 1-2 elementos en la fila

**Ejemplo (mejor con flex):**
```html
<div className="flex flex-col md:flex-row items-center justify-between gap-6">
  <div>Texto de longitud variable</div>
  <button>CTA</button>
</div>
```

---

## 5. Principio de Breathing Room

**Definición:** Más espacio en blanco que densidad de información.

### Qué Significa en Práctica

#### ❌ MAL (Denso, sin respiración)

```html
<section className="py-8">
  <div className="container px-4">
    <h2 className="text-2xl mb-2">Título</h2>
    <p className="text-sm mb-2">Párrafo corto</p>
    <button className="px-3 py-1 text-xs">CTA</button>
  </div>
</section>
```

**Problemas:**
- Padding vertical insuficiente (py-8 para una sección)
- Márgenes entre elementos demasiado pequeños (mb-2)
- Botón con padding interno mínimo
- Todo se siente apretado y difícil de escanear

---

#### ✅ BIEN (Breathing room)

```html
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-8 max-w-7xl">
    <h2 className="font-heading text-3xl md:text-5xl font-semibold text-neutral-900">
      Título con Espacio
    </h2>
    <p className="mt-6 text-lg text-neutral-700 max-w-2xl leading-relaxed">
      Párrafo con line-height generoso y max-width para legibilidad.
    </p>
    <button className="mt-8 px-8 py-4 bg-nordia text-neutral-900 font-medium rounded-lg">
      Llamado a la Acción
    </button>
  </div>
</section>
```

**Por qué funciona:**
- Padding vertical generoso (py-16 md:py-24)
- Separación clara entre elementos (mt-6, mt-8)
- Botón con padding cómodo para click (px-8 py-4)
- Max-width en párrafo para legibilidad
- Todo respira, fácil de escanear

---

### Reglas de Breathing Room

1. **Siempre prefiere más espacio que menos** — Si dudas entre `gap-6` y `gap-8`, usa `gap-8`
2. **Padding interno generoso** — Cards con `p-6 md:p-8`, no `p-4`
3. **Márgenes entre secciones evidentes** — `py-16 md:py-24`, no `py-8`
4. **Line-height cómodo** — Mínimo `1.5`, preferir `1.75` en párrafos
5. **Max-width en texto largo** — Nunca más de 700px de ancho

---

## 6. Responsive Strategy

Nordia usa **mobile-first approach**.

### ¿Qué Significa Mobile-First?

**Escribir CSS/clases para mobile primero, luego agregar overrides para desktop.**

#### Ejemplo

```html
<!-- Mobile: 1 columna, Desktop: 2 columnas -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

Esto se lee como:
1. Por defecto (mobile): 1 columna
2. A partir de `md` (768px): 2 columnas

---

### Colapso de Layouts

#### Stack en Mobile, Side-by-side en Desktop

**Patrón más común:**
```html
<div className="flex flex-col md:flex-row gap-6 md:gap-8">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</div>
```

**Mobile:** Elementos apilados verticalmente
**Desktop:** Elementos horizontales

---

#### Grid Progresivo

```html
<!-- 1 col → 2 col → 3 col según viewport -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

**Mobile (<640px):** 1 columna
**Tablet (640-1024px):** 2 columnas
**Desktop (>1024px):** 3 columnas

---

### Touch Targets (Mobile)

**Mínimo absoluto:** 44x44px (recomendación Apple/Google)

**Implementación en botones:**
```html
<!-- Desktop puede ser más pequeño, mobile mínimo 44px alto -->
<button className="px-6 py-3 md:px-8 md:py-4">
  CTA
</button>
```

**Verificación:**
- `py-3` = 12px top + 12px bottom + line-height ≈ 44px mínimo
- `py-4` = 16px top + 16px bottom + line-height ≈ 52px (cómodo)

---

### Scroll Horizontal (Evitar cuando sea posible)

**Cuándo permitir scroll horizontal:**
- Tablas amplias con muchas columnas (AdminPanel)
- Carruseles de imágenes (raro en Nordia)
- Código con líneas largas

**Implementación:**
```html
<div className="overflow-x-auto">
  <table className="min-w-full">
    <!-- Tabla amplia -->
  </table>
</div>
```

**Cuándo NO permitir:**
- Texto principal (siempre debe hacer wrap)
- Botones o CTAs (deben ser visibles sin scroll)
- Navegación principal

---

## 7. Casos Especiales

### Hero Section

El hero es la única sección que puede romper algunas reglas de padding:

```html
<section className="py-20 md:py-32 lg:py-40">
  <div className="container mx-auto px-4 md:px-8 max-w-7xl">
    <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold
                   text-neutral-900 text-center">
      Título Principal
    </h1>
    <p className="mt-6 text-lg md:text-xl text-neutral-700 text-center
                  max-w-3xl mx-auto">
      Subtítulo centrado con max-width
    </p>
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <button>CTA Primario</button>
      <button>CTA Secundario</button>
    </div>
  </div>
</section>
```

**Por qué más padding:**
El hero necesita impacto visual. Padding vertical de 80-160px (py-20 a py-40) crea presencia.

---

### Cards

Cards siempre con padding generoso y border/shadow sutil:

```html
<div className="p-6 md:p-8 bg-white rounded-lg border border-neutral-200
                hover:shadow-lg transition-shadow">
  <h3 className="font-heading text-xl md:text-2xl font-semibold text-neutral-900">
    Título de Card
  </h3>
  <p className="mt-4 text-base text-neutral-700">
    Descripción de la card con espacio entre título y texto.
  </p>
</div>
```

**Reglas:**
- Padding interno: `p-6 md:p-8` (mínimo)
- Border sutil: `border-neutral-200` (no colores fuertes)
- Shadow en hover: `hover:shadow-lg` (feedback visual)
- Transiciones: `transition-shadow` (suave)

---

### Formularios

Formularios con spacing generoso entre fields:

```html
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      Nombre
    </label>
    <input className="w-full px-4 py-3 border border-neutral-300 rounded-lg
                      focus:border-nordia focus:ring-2 focus:ring-nordia/20"
           type="text" />
  </div>
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      Email
    </label>
    <input className="w-full px-4 py-3 border border-neutral-300 rounded-lg
                      focus:border-nordia focus:ring-2 focus:ring-nordia/20"
           type="email" />
  </div>
  <button className="w-full px-8 py-4 bg-nordia text-neutral-900 font-medium rounded-lg">
    Enviar
  </button>
</form>
```

**Reglas:**
- `space-y-6` entre fields (24px)
- Input padding: `px-4 py-3` (cómodo para escribir)
- Labels con `mb-2` (8px de separación)
- Focus state visible: `focus:border-nordia focus:ring-2`

---

## 8. Implementación en Tailwind

### Configuración Recomendada

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',   // 16px mobile
        md: '2rem',        // 32px tablet
        lg: '4rem',        // 64px desktop
      },
    },
    extend: {
      maxWidth: {
        '7xl': '1280px',
      },
      spacing: {
        // Ya incluido por defecto en Tailwind, pero clarificar
        '0': '0',
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '24': '6rem',    // 96px
      },
    },
  },
}
```

---

## 9. Validación Pre-Deploy

Antes de deployar cualquier layout, verificar:

- [ ] Padding de secciones principales es `py-16 md:py-24` mínimo
- [ ] Container usa `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
- [ ] Párrafos largos tienen `max-w-2xl` o similar
- [ ] Gaps entre elementos son mínimo `gap-6`
- [ ] Touch targets en mobile son mínimo 44x44px
- [ ] Layout colapsa correctamente en mobile (usar dev tools)
- [ ] No hay scroll horizontal accidental en mobile

**Si alguna verificación falla, el componente NO debe ir a producción.**

---

**Última actualización:** 2026-02-09
