# Motion y Animación Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## Filosofía de Motion

**"Las animaciones tienen propósito funcional, no son decorativas."**

En Nordia, el motion existe para:
1. Comunicar feedback de acciones del usuario
2. Guiar la atención hacia cambios de estado
3. Suavizar transiciones entre vistas
4. Indicar carga o procesamiento

**El motion NO existe para:**
- Impresionar visualmente sin razón
- Distraer la atención del contenido
- Alargar artificialmente la percepción de espera
- Llenar espacios vacíos con "dinamismo"

---

## 1. Cuándo SÍ Animar

### Feedback de Acción del Usuario

**Ejemplos:**
- ✅ Botón cambia de escala al hacer click (pressed state)
- ✅ Input muestra borde animado al recibir focus
- ✅ Checkbox hace check animado al seleccionar
- ✅ Toggle switch se desliza al cambiar estado

**Por qué:** El usuario necesita confirmación inmediata de que su acción fue registrada.

---

### Transiciones de Estado

**Ejemplos:**
- ✅ Badge cambia de "pending" (gris) a "completed" (verde) con fade
- ✅ Notificación entra desde el lado derecho (slide-in)
- ✅ Modal aparece con fade + scale desde 0.95 a 1
- ✅ Accordion se expande con height transition

**Por qué:** Los cambios abruptos de estado desorientan. Una transición suave comunica continuidad.

---

### Guía de Atención

**Ejemplos:**
- ✅ Scroll reveal: Secciones aparecen con fade-in al entrar al viewport
- ✅ Highlight flash: Fila de tabla se ilumina brevemente después de actualizar
- ✅ Nueva notificación pulsa una vez para llamar la atención

**Por qué:** El usuario necesita saber dónde mirar cuando algo cambia.

---

### Carga de Contenido

**Ejemplos:**
- ✅ Spinner rotating mientras se carga data
- ✅ Skeleton screens con shimmer effect
- ✅ Progress bar que se llena durante upload
- ✅ "Typing..." indicator (3 dots bouncing) en simulación de WhatsApp

**Por qué:** El usuario necesita saber que el sistema está procesando, no congelado.

---

## 2. Cuándo NO Animar

### Solo para "Verse Bien"

**Ejemplos:**
- ❌ Texto que se escribe letra por letra sin razón funcional
- ❌ Elementos que entran con bounce exagerado
- ❌ Backgrounds con gradientes animados infinitamente
- ❌ Íconos que rotan o pulsan constantemente

**Por qué:** Distrae del contenido principal y comunica "startup que intenta impresionar" en vez de "herramienta seria".

---

### Animaciones Largas (>600ms)

**Ejemplos:**
- ❌ Modal que tarda 1 segundo en aparecer
- ❌ Transición de página con fade de 800ms
- ❌ Hover effect con delay de 500ms

**Por qué:** El usuario percibe la interfaz como lenta. Nordia debe sentirse instantánea.

---

### Movimiento Constante en Viewport

**Ejemplos:**
- ❌ Elementos que flotan arriba y abajo infinitamente
- ❌ Carruseles que rotan automáticamente sin pausa
- ❌ Fondos con partículas moviéndose
- ❌ Texto con efecto "neon flickering"

**Por qué:** Movimiento constante genera fatiga visual y reduce concentración. Además, viola principios de accesibilidad (prefers-reduced-motion).

---

## 3. Duraciones Estandarizadas

Todas las animaciones deben usar estas duraciones. NO inventar valores arbitrarios.

### Fast: 150ms

**Uso:**
- Hover effects (buttons, links, cards)
- Click feedback (scale down en pressed state)
- Focus states (input borders)
- Tooltip appearance

**Razón:** Feedback debe ser inmediato. 150ms es el umbral perceptual de "instantáneo" pero suficiente para suavizar el cambio.

**Implementación:**
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

```html
<button className="transition-all duration-150 hover:scale-105 active:scale-95">
  Click me
</button>
```

---

### Medium: 300ms

**Uso:**
- Transiciones de estado (pending → completed)
- Slide-in de sidebars o drawers
- Fade de modals/overlays
- Color changes con significado (success, error)
- Expansion de accordions

**Razón:** 300ms es lo suficientemente rápido para no sentirse lento, pero permite que el ojo siga el movimiento y entienda qué cambió.

**Implementación:**
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

```html
<div className="transition-colors duration-300 bg-neutral-100 hover:bg-neutral-200">
  Hover me
</div>
```

---

### Slow: 600ms

**Uso:**
- Entrada de secciones al scroll (fade-in on scroll)
- Transiciones de página (page transitions)
- Animaciones de onboarding (solo primera vez)

**Razón:** 600ms es el máximo tolerable antes de que el usuario perciba lentitud. Solo usar para animaciones que suceden UNA VEZ y tienen propósito narrativo (ej: explicar onboarding).

**Implementación:**
```css
animation: fadeIn 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
```

```html
<section className="animate-fade-in">
  Contenido que aparece al scroll
</section>
```

---

### Never: >600ms

**Prohibición absoluta.**

Ninguna animación debe durar más de 600ms, bajo ninguna circunstancia.

**Excepción:** Loaders infinitos (spinners) que rotan continuamente mientras esperan respuesta del servidor. En ese caso, la rotación individual puede ser más larga, pero debe ser fluida.

---

## 4. Easings (Timing Functions)

El easing define cómo la animación acelera/desacelera. Nordia usa UN SOLO easing para todo.

### Default: cubic-bezier(0.4, 0, 0.2, 1)

**También conocido como:** `ease-out` en Tailwind

**Comportamiento:**
- Empieza rápido, desacelera al final
- Sensación de "naturalidad" (como objetos físicos)
- No es abrupto (linear) ni exagerado (bounce)

**Implementación:**
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Tailwind shorthand:**
```html
<div className="transition-all duration-300 ease-out">
```

---

### Prohibidos

#### ❌ Bounce

```css
/* NUNCA USAR */
transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Por qué:** Demasiado "playful". Comunica juguete, no herramienta profesional.

---

#### ❌ Linear (salvo excepciones)

```css
/* Evitar salvo en loaders infinitos */
transition: all 300ms linear;
```

**Por qué:** Se siente robótico y abrupto. Solo usar para:
- Spinners que rotan (infinite rotation)
- Progress bars que avanzan uniformemente

---

#### ❌ Ease-in

```css
/* Evitar */
transition: all 300ms ease-in;
```

**Por qué:** Empieza lento y acelera al final, lo opuesto a la percepción natural de movimiento. Hacer que un botón "acelere" al final se siente extraño.

---

## 5. Tipos de Animación Permitidos

### Fade In (on scroll)

**Uso:** Secciones de landing que aparecen al hacer scroll.

**Implementación:**
```tsx
// Usando Intersection Observer
const [isVisible, setIsVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.1 }
  );

  if (ref.current) observer.observe(ref.current);

  return () => observer.disconnect();
}, []);

<section
  ref={ref}
  className={`transition-opacity duration-600 ease-out ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`}
>
  Contenido
</section>
```

**Tailwind config (opcional):**
```javascript
// tailwind.config.ts
animation: {
  'fade-in': 'fadeIn 0.6s ease-out forwards',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```

**Reglas:**
- Solo activar una vez (no animar cada vez que sale y entra del viewport)
- Threshold bajo (0.1) para que empiece antes de que esté completamente visible
- Combinar opacity + translateY sutil (10px) para sensación de "elevación"

---

### Hover Effects

#### Cards
```html
<div className="transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-lg">
  Card content
</div>
```

**Propiedades:**
- Scale: 1.02 (2% más grande, sutil)
- Shadow: Aumentar de `shadow` a `shadow-lg`
- Duration: 300ms
- NO rotar, NO cambiar color drásticamente

---

#### Buttons
```html
<button className="transition-all duration-150 ease-out
                   hover:brightness-90 active:scale-[0.98]">
  Click me
</button>
```

**Propiedades:**
- Hover: `brightness-90` (ligeramente más oscuro)
- Active (pressed): `scale-[0.98]` (se "hunde" 2%)
- Duration: 150ms (instantáneo)
- NO agregar shadows exageradas, NO bounce

---

#### Links
```html
<a className="relative inline-block after:absolute after:bottom-0 after:left-0
              after:h-[2px] after:w-0 after:bg-nordia
              after:transition-all after:duration-300
              hover:after:w-full">
  Link text
</a>
```

**Propiedades:**
- Underline crece desde izquierda (width: 0 → 100%)
- Color: nordia (verde)
- Duration: 300ms
- Alternativa simple: `hover:underline` con `transition-all duration-300`

---

### Loading States

#### Spinner (Rotating)
```html
<svg className="animate-spin h-8 w-8 text-nordia" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
</svg>
```

**Tailwind config:**
```javascript
animation: {
  spin: 'spin 1s linear infinite',
}
```

**Reglas:**
- Linear easing (única excepción)
- Infinite loop
- No usar para más de 5 segundos (si algo tarda más, mostrar progress bar)

---

#### Typing Indicator (WhatsApp style)
```html
<div className="flex gap-1">
  <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
  <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
  <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce"></span>
</div>
```

**Propiedades:**
- 3 dots con animation-delay escalonado
- Bounce sutil (Tailwind default)
- Solo usar en contexto de chat/mensajería

---

#### Skeleton Shimmer
```html
<div className="animate-pulse bg-neutral-200 rounded h-4 w-full"></div>
```

**Tailwind config:**
```javascript
animation: {
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
keyframes: {
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '.5' },
  },
}
```

**Reglas:**
- Usar para carga de contenido estructurado (listas, cards)
- Mismo tamaño que el contenido real
- NO usar para más de 3 segundos (si tarda más, mostrar mensaje)

---

### Micro-interactions

#### Button Click (Pressed State)
```html
<button className="transition-transform duration-150 active:scale-95">
  Click me
</button>
```

**Efecto:** Botón se "hunde" al hacer click (scale: 1 → 0.95)

---

#### Input Focus
```html
<input className="transition-all duration-300 border-2 border-neutral-300
                  focus:border-nordia focus:ring-4 focus:ring-nordia/20" />
```

**Efecto:**
- Border cambia a nordia (verde)
- Ring sutil aparece (20% opacity)
- Duration: 300ms

---

#### Notification (Slide-in from right)
```tsx
// Usando Framer Motion (opcional, o CSS puro)
<motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
>
  Notificación
</motion.div>
```

**Propiedades:**
- Entra desde derecha (x: 100 → 0)
- Fade simultáneo (opacity: 0 → 1)
- Sale por derecha al cerrar
- Duration: 300ms

---

## 6. Reglas Críticas

### ✅ SIEMPRE Respetar prefers-reduced-motion

**Obligatorio por accesibilidad y ley (ADA, WCAG).**

**Implementación:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**En Tailwind:**
```html
<div className="motion-safe:animate-fade-in">
  Solo anima si el usuario NO tiene prefers-reduced-motion
</div>
```

**Por qué:** Usuarios con condiciones vestibulares (vértigo, epilepsia) pueden sufrir con animaciones. Es obligación legal y ética respetar esta preferencia.

---

### ❌ NUNCA Animaciones que Distraen del Contenido

**Ejemplos:**
- ❌ Elementos que se mueven constantemente (floating)
- ❌ Backgrounds animados con partículas
- ❌ Texto con efectos de "glitch" o distorsión
- ❌ Colores que cambian automáticamente (rainbow)

**Por qué:** El contenido es lo importante. La animación es soporte, no protagonista.

---

### ❌ NUNCA Parallax

**Prohibición absoluta.**

```css
/* NUNCA HACER ESTO */
transform: translateY(calc(scrollY * 0.5));
```

**Por qué:**
1. Demasiado decorativo, no funcional
2. Problemas de performance (recalcular en cada scroll)
3. Viola prefers-reduced-motion frecuentemente
4. Comunica "sitio creativo" no "herramienta institucional"

---

### ❌ NUNCA Auto-play de Videos con Sonido

**Regla:**
- Videos pueden auto-play si están MUTED
- Videos NO pueden auto-play con sonido
- Videos deben tener controles visibles

**Implementación:**
```html
<video autoplay muted loop playsinline>
  <source src="demo.mp4" type="video/mp4">
</video>
```

**Por qué:** Auto-play con sonido es intrusivo y viola expectativas del usuario. Además, muchos browsers lo bloquean por default.

---

## 7. Performance de Animaciones

### Propiedades Optimizadas (GPU-accelerated)

**✅ USAR:**
- `transform` (scale, translateX, translateY, rotate)
- `opacity`

**❌ EVITAR:**
- `width`, `height` (causan reflow)
- `top`, `left`, `right`, `bottom` (usar `transform` en su lugar)
- `margin`, `padding` (causan reflow)

**Por qué:** `transform` y `opacity` son las únicas propiedades que el browser puede animar sin recalcular layout, usando GPU directamente.

**Ejemplo incorrecto:**
```css
/* MAL (causa reflow) */
.card {
  transition: width 300ms;
}
.card:hover {
  width: 320px;
}
```

**Ejemplo correcto:**
```css
/* BIEN (GPU-accelerated) */
.card {
  transition: transform 300ms;
}
.card:hover {
  transform: scale(1.05);
}
```

---

### Will-Change (Usar con Precaución)

**Cuándo usar:**
```css
.animated-element {
  will-change: transform, opacity;
}
```

**SOLO usar si:**
- El elemento se anima frecuentemente (hover repetido, scroll continuo)
- Ya probaste y hay jank (frame drops)

**NO usar:**
- En todos los elementos "por si acaso"
- En elementos que solo se animan una vez

**Por qué:** `will-change` reserva recursos de GPU. Usar en exceso causa problemas de memory.

---

## 8. Testing de Animaciones

### Checklist Pre-Deploy

Antes de deployar animaciones, verificar:

- [ ] Duración es 150ms, 300ms o 600ms (no valores arbitrarios)
- [ ] Easing es `cubic-bezier(0.4, 0, 0.2, 1)` (salvo spinners)
- [ ] Se respeta `prefers-reduced-motion`
- [ ] No hay animaciones >600ms
- [ ] No hay movimiento constante sin propósito
- [ ] Animaciones usan `transform` y `opacity` (no width/height)
- [ ] Funciona en mobile (60fps en iPhone 12 mínimo)
- [ ] No causa layout shift (CLS score)

---

### Herramientas de Testing

**Chrome DevTools:**
1. Abrir DevTools → Performance tab
2. Grabar interacción con animación
3. Verificar que FPS se mantiene en 60
4. Verificar que no hay "Long Tasks" (>50ms)

**Lighthouse:**
- Correr Lighthouse audit
- Verificar "Cumulative Layout Shift" (CLS) < 0.1
- Verificar "First Input Delay" (FID) < 100ms

**Emulación de prefers-reduced-motion:**
```
Chrome DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
```

---

## 9. Validación Final

Si una animación no pasa TODAS estas preguntas, NO debe ir a producción:

1. ¿Tiene propósito funcional claro? (no es solo decorativa)
2. ¿Dura 600ms o menos?
3. ¿Usa transform/opacity en vez de width/height/position?
4. ¿Se desactiva con prefers-reduced-motion?
5. ¿Mejora la UX o solo "se ve bien"?

**Si alguna respuesta es NO, remover la animación.**

---

**Última actualización:** 2026-02-09
