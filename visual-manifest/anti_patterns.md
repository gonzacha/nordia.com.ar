# Anti-Patrones Prohibidos en Nordia

**Versión:** 1.0.0
**Fecha:** 2026-02-09

---

## Propósito de Este Documento

Esta es la **lista negra oficial** de prácticas visuales, de interacción y de copy que están **explícitamente prohibidas** en Nordia. No son sugerencias, son restricciones absolutas.

Si un elemento de diseño aparece en este documento, NO debe implementarse bajo ninguna circunstancia sin aprobación explícita del Design Systems Lead.

---

## 1. Anti-Patrones Visuales

### ❌ Gradientes Arcoíris o Multi-Color

**Qué es:**
Gradientes que usan más de 2 colores, especialmente si incluyen colores fuera de la paleta oficial.

**Ejemplos prohibidos:**
```css
/* PROHIBIDO */
background: linear-gradient(to right, red, orange, yellow, green, blue, purple);
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Por qué está prohibido:**
Los gradientes arcoíris comunican "startup experimental" o "app de diseño". Nordia es una herramienta institucional que debe comunicar sobriedad. Además, reducen contraste y legibilidad del texto sobre ellos.

**Alternativa permitida:**
Gradientes sutiles neutral-to-transparent o single-color con variación de luminosidad:
```css
/* PERMITIDO */
background: linear-gradient(to bottom, transparent, rgba(0,255,136,0.05));
background: linear-gradient(to right, #fafafa, #f5f5f5);
```

---

### ❌ Sombras Excesivas (>4px blur)

**Qué es:**
Shadows con blur radius mayor a 16px o con offset exagerado.

**Ejemplos prohibidos:**
```css
/* PROHIBIDO */
box-shadow: 0 20px 60px rgba(0,0,0,0.5);
box-shadow: 0 10px 40px rgba(0,255,136,0.8);
```

**Por qué está prohibido:**
Sombras exageradas crean sensación de "profundidad fake" sin propósito funcional. Además, reducen legibilidad y se sienten artificiosas.

**Alternativa permitida:**
Sombras sutiles con propósito jerárquico:
```css
/* PERMITIDO */
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
box-shadow: 0 4px 6px rgba(0,0,0,0.05);
```

---

### ❌ Bordes con Colores Fuera de Paleta

**Qué es:**
Usar colores en borders que no están definidos en colors.md.

**Ejemplos prohibidos:**
```css
/* PROHIBIDO */
border: 2px solid #ff00ff;
border: 1px solid #ffa500;
```

**Por qué está prohibido:**
Introduce colores aleatorios que rompen la coherencia de la paleta y confunden el significado semántico de los colores.

**Alternativa permitida:**
Borders usando colores oficiales:
```css
/* PERMITIDO */
border: 2px solid #00ff88; /* nordia */
border: 1px solid #e5e5e5; /* neutral-200 */
```

---

### ❌ Fondos con Imágenes que Compiten con Contenido

**Qué es:**
Background images complejas bajo texto o componentes interactivos.

**Ejemplos prohibidos:**
- Foto de ciudad borrosa bajo texto
- Patrón complejo de líneas bajo formulario
- Imagen de oficina con personas bajo CTA

**Por qué está prohibido:**
Reduce legibilidad drásticamente, distrae del contenido principal y comunica falta de claridad institucional.

**Alternativa permitida:**
Fondos sólidos o gradientes sutiles:
```css
/* PERMITIDO */
background: #fafafa;
background: linear-gradient(to bottom, #fafafa, #f5f5f5);
```

---

### ❌ Más de 3 Colores en un Componente

**Qué es:**
Usar más de 3 colores distintos (excluyendo neutrales) en un solo componente.

**Ejemplo prohibido:**
```html
<!-- PROHIBIDO: 4 colores (verde, azul, rojo, naranja) -->
<div>
  <span className="text-nordia">Título</span>
  <span className="text-info">Metadata</span>
  <span className="text-error">Error</span>
  <span className="text-warning">Warning</span>
</div>
```

**Por qué está prohibido:**
Crea ruido visual y confunde jerarquía. El ojo no sabe dónde enfocar.

**Alternativa permitida:**
Máximo 2 colores semánticos + neutrales:
```html
<!-- PERMITIDO: 1 color principal + neutrales -->
<div>
  <span className="text-neutral-900">Título</span>
  <span className="text-neutral-600">Metadata</span>
  <span className="text-nordia">CTA</span>
</div>
```

---

### ❌ Iconos 3D o con Mucho Detalle

**Qué es:**
Iconos con efectos de profundidad, gradientes internos o detalles que se pierden en tamaños pequeños.

**Ejemplos prohibidos:**
- Iconos con sombras internas y highlights
- Iconos con gradientes metálicos
- Ilustraciones complejas usadas como iconos

**Por qué está prohibido:**
En tamaños pequeños (16-24px) los detalles se convierten en ruido. Los iconos deben ser siluetas claras.

**Alternativa permitida:**
Iconos line-art o solid simples:
- Heroicons (outline o solid)
- Feather Icons
- Lucide Icons

---

### ❌ Comic Sans o Fonts Decorativas

**Qué es:**
Usar tipografías fuera de las oficiales (Space Grotesk, Inter, JetBrains Mono).

**Ejemplos prohibidos:**
- Comic Sans MS
- Papyrus
- Brush Script
- Fonts con serifs decorativos
- Fonts "handwritten"

**Por qué está prohibido:**
Destruye la sobriedad institucional instantáneamente. Comunica falta de profesionalismo.

**Alternativa permitida:**
Solo las tipografías oficiales:
```css
/* PERMITIDO */
font-family: 'Space Grotesk', sans-serif; /* Headings */
font-family: 'Inter', sans-serif; /* Body */
font-family: 'JetBrains Mono', monospace; /* Code */
```

---

## 2. Anti-Patrones de Animación

### ❌ Animaciones >600ms

**Qué es:**
Cualquier animación con duration mayor a 600ms.

**Ejemplos prohibidos:**
```css
/* PROHIBIDO */
transition: all 1000ms;
animation: fadeIn 2s;
```

**Por qué está prohibido:**
El usuario percibe la interfaz como lenta. 600ms es el máximo tolerable.

**Alternativa permitida:**
150ms, 300ms o 600ms:
```css
/* PERMITIDO */
transition: all 300ms;
```

---

### ❌ Loops Infinitos que Distraen

**Qué es:**
Animaciones que se repiten infinitamente sin propósito funcional.

**Ejemplos prohibidos:**
- Elementos que "flotan" arriba y abajo constantemente
- Iconos que pulsan sin parar
- Backgrounds con partículas moviéndose
- Texto con efecto "glitch" continuo

**Por qué está prohibido:**
Genera fatiga visual, distrae del contenido y consume CPU innecesariamente.

**Alternativa permitida:**
Loops infinitos SOLO para loading states:
```css
/* PERMITIDO: Spinner mientras carga */
.spinner {
  animation: spin 1s linear infinite;
}
```

---

### ❌ Parallax Scroll

**Qué es:**
Elementos que se mueven a velocidades diferentes al hacer scroll, creando efecto de profundidad.

**Ejemplos prohibidos:**
```javascript
// PROHIBIDO
window.addEventListener('scroll', () => {
  element.style.transform = `translateY(${scrollY * 0.5}px)`;
});
```

**Por qué está prohibido:**
1. Demasiado decorativo, no funcional
2. Problemas de performance (recalcular en cada scroll)
3. Viola accesibilidad (prefers-reduced-motion)
4. Comunica "sitio creativo", no "herramienta institucional"

**Alternativa permitida:**
Fade-in on scroll (una sola vez):
```javascript
// PERMITIDO
IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    element.classList.add('fade-in');
  }
});
```

---

### ❌ Bouncing Excesivo

**Qué es:**
Animaciones con easing "bounce" o "elastic" que hacen que los elementos reboten.

**Ejemplos prohibidos:**
```css
/* PROHIBIDO */
transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55); /* bounce */
```

**Por qué está prohibido:**
Demasiado "playful", comunica juguete en vez de herramienta seria.

**Alternativa permitida:**
Ease-out estándar:
```css
/* PERMITIDO */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

### ❌ Transiciones sin Propósito

**Qué es:**
Animar propiedades que no comunican nada al usuario.

**Ejemplos prohibidos:**
- Rotar un ícono sin razón
- Cambiar color de fondo aleatoriamente
- Scale de elementos que no tienen interacción

**Por qué está prohibido:**
Motion sin propósito distrae y confunde. Cada animación debe responder a una acción del usuario o cambio de estado.

**Alternativa permitida:**
Animaciones con feedback claro:
```css
/* PERMITIDO: Hover indica interactividad */
button:hover {
  transform: scale(1.02);
}
```

---

### ❌ Auto-play con Sonido

**Qué es:**
Videos o audios que empiezan a reproducirse automáticamente con sonido.

**Ejemplos prohibidos:**
```html
<!-- PROHIBIDO -->
<video autoplay>
  <source src="video.mp4">
</video>
```

**Por qué está prohibido:**
Intrusivo, viola expectativas del usuario, bloqueado por muchos navegadores.

**Alternativa permitida:**
Auto-play muted:
```html
<!-- PERMITIDO -->
<video autoplay muted loop playsinline>
  <source src="video.mp4">
</video>
```

---

## 3. Anti-Patrones de Copy

### ❌ "Inteligencia Artificial Revolucionaria"

**Qué es:**
Prometer IA generativa o capacidades que Nordia NO tiene.

**Ejemplos prohibidos:**
- "Nuestro chatbot aprende de tus conversaciones"
- "Inteligencia artificial que entiende a tus clientes"
- "Respuestas automáticas inteligentes"
- "Machine learning que optimiza tus ventas"

**Por qué está prohibido:**
Nordia es un sistema determinístico, NO tiene IA generativa. Prometer esto es mentir y genera expectativas incorrectas.

**Alternativa permitida:**
Copy que explica el sistema real:
- "Sistema de reglas que ejecuta flujos definidos por vos"
- "Respuestas predefinidas que enviás según condiciones"
- "Automatización sin sorpresas: ejecuta lo que configurás"

---

### ❌ "El Futuro del Comercio"

**Qué es:**
Promesas grandiosas, buzzwords vacíos, hype sin sustancia.

**Ejemplos prohibidos:**
- "Revoluciona tu negocio"
- "La próxima generación de atención al cliente"
- "El futuro llegó"
- "Disruption en WhatsApp"

**Por qué está prohibido:**
Suena a marketing vacío. Nordia es una herramienta práctica para problemas concretos, no una "visión del futuro".

**Alternativa permitida:**
Copy concreto, con beneficios tangibles:
- "Registra cada mensaje de tus clientes en WhatsApp"
- "Automatiza respuestas según reglas que vos definís"
- "Pedidos organizados sin perder mensajes"

---

### ❌ "Chatbot Super Inteligente"

**Qué es:**
Usar la palabra "chatbot" o "bot" para describir Nordia.

**Ejemplos prohibidos:**
- "Nuestro chatbot responde automáticamente"
- "Bot inteligente para WhatsApp"
- "Asistente virtual para tu negocio"

**Por qué está prohibido:**
Nordia NO es un chatbot. Es un sistema de automatización conversacional determinístico. La palabra "chatbot" implica conversación natural e IA.

**Alternativa permitida:**
- "Sistema conversacional determinístico"
- "Automatización de WhatsApp con reglas explícitas"
- "Herramienta operativa para WhatsApp Business"

---

### ❌ "Automatiza Todo con IA"

**Qué es:**
Prometer automatización mágica sin explicar cómo funciona.

**Ejemplos prohibidos:**
- "Olvídate de responder manualmente"
- "Automatiza el 100% de tus conversaciones"
- "La IA se encarga de todo"

**Por qué está prohibido:**
Es una promesa imposible y deshonesta. Nordia automatiza flujos específicos, no "todo".

**Alternativa permitida:**
- "Automatiza flujos repetitivos como confirmación de pedidos"
- "Respuestas automáticas para preguntas frecuentes predefinidas"
- "Sistema que ejecuta reglas configuradas manualmente"

---

### ❌ Emojis Excesivos en Landing

**Qué es:**
Usar más de 1 emoji por sección o usarlos sin propósito claro.

**Ejemplos prohibidos:**
```
"¡Bienvenido! 🎉🚀✨
Nuestro sistema es increíble 😍💪
Automatiza todo 🤖⚡🔥"
```

**Por qué está prohibido:**
Comunica falta de sobriedad institucional. Los emojis pertenecen a mensajería personal, no a herramientas empresariales.

**Alternativa permitida:**
Emojis SOLO en contextos específicos:
- ✅ Checkmarks para listas de features (visual aid)
- ⚠️ Warning icon para alertas (semántico)
- Sin emojis en headings, CTAs o copy principal

---

### ❌ Exclamaciones Múltiples

**Qué es:**
Usar más de un signo de exclamación o usarlos sin propósito claro.

**Ejemplos prohibidos:**
```
"Registrate ahora!!"
"Es increíble!!!"
"No te lo pierdas!!!!"
```

**Por qué está prohibido:**
Comunica desesperación, falta de profesionalismo y sobre-entusiasmo artificial.

**Alternativa permitida:**
Tono directo, sin exclamaciones innecesarias:
```
"Solicitar demo"
"Comenzar ahora"
"Registrarse"
```

---

## 4. Anti-Patrones de UX

### ❌ Modals que Bloquean sin Razón

**Qué es:**
Mostrar un modal que interrumpe el flujo del usuario sin beneficio claro.

**Ejemplos prohibidos:**
- Modal de "Suscribite a nuestro newsletter" al entrar al sitio
- Modal que bloquea contenido hasta aceptar cookies (más allá del banner legal)
- Modal de "Descargá nuestra app" en mobile web

**Por qué está prohibido:**
Interrumpe la experiencia del usuario sin su consentimiento. Los modals deben ser respuesta a una acción del usuario, no imposiciones.

**Alternativa permitida:**
- Banner de newsletter al final de la página (no bloqueante)
- Cookie banner mínimo y no bloqueante (solo lo legalmente requerido)
- Sugerencia de app como banner inline, no modal

---

### ❌ Carruseles Automáticos

**Qué es:**
Carousels/sliders que avanzan automáticamente sin intervención del usuario.

**Ejemplos prohibidos:**
```javascript
// PROHIBIDO
setInterval(() => {
  carousel.next();
}, 3000);
```

**Por qué está prohibido:**
1. El usuario puede estar leyendo y el contenido cambia
2. Problemas de accesibilidad (no se puede pausar fácilmente)
3. Estadísticas muestran que los usuarios rara vez ven más allá del primer slide

**Alternativa permitida:**
Carousel manual con flechas o dots:
```javascript
// PERMITIDO
<button onClick={() => carousel.next()}>→</button>
```

---

### ❌ Scroll Hijacking

**Qué es:**
Modificar el comportamiento nativo del scroll del navegador.

**Ejemplos prohibidos:**
```javascript
// PROHIBIDO
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  customScrollFunction();
}, { passive: false });
```

**Por qué está prohibido:**
Rompe expectativas del usuario, genera frustración y problemas de accesibilidad. El scroll debe funcionar como el usuario espera.

**Alternativa permitida:**
Scroll nativo con smooth-scroll CSS:
```css
/* PERMITIDO */
html {
  scroll-behavior: smooth;
}
```

---

### ❌ Tooltips que se Abren Solos

**Qué es:**
Tooltips o popovers que aparecen sin que el usuario haga hover o click.

**Ejemplos prohibidos:**
```javascript
// PROHIBIDO
setTimeout(() => {
  tooltip.show();
}, 2000);
```

**Por qué está prohibido:**
Distrae al usuario de su tarea actual. Los tooltips deben aparecer solo cuando el usuario los solicita (hover/click).

**Alternativa permitida:**
Tooltips con hover o click:
```html
<!-- PERMITIDO -->
<button onMouseEnter={showTooltip}>
  Hover me
</button>
```

---

### ❌ Formularios Multi-Página sin Progreso

**Qué es:**
Wizard o formulario de múltiples pasos sin indicador de progreso.

**Por qué está prohibido:**
El usuario no sabe cuántos pasos quedan, genera frustración y abandono.

**Alternativa permitida:**
Progress indicator claro:
```html
<!-- PERMITIDO -->
<div className="flex gap-2">
  <span className="w-8 h-8 rounded-full bg-nordia">1</span>
  <span className="w-8 h-8 rounded-full bg-neutral-300">2</span>
  <span className="w-8 h-8 rounded-full bg-neutral-300">3</span>
</div>
<p className="text-sm text-neutral-600">Paso 1 de 3</p>
```

---

### ❌ CTAs Ocultos o Confusos

**Qué es:**
Call-to-actions que no son evidentes o usan copy ambiguo.

**Ejemplos prohibidos:**
- Botón con texto "Click aquí"
- CTA que no se distingue del texto normal
- Múltiples CTAs con la misma jerarquía visual

**Por qué está prohibido:**
Reduce conversión y genera confusión. El usuario debe saber exactamente qué sucederá al hacer click.

**Alternativa permitida:**
CTA claro, distinguible, con copy específico:
```html
<!-- PERMITIDO -->
<button className="px-8 py-4 bg-nordia text-neutral-900 font-medium rounded-lg">
  Solicitar demo gratuita
</button>
```

---

## 5. Anti-Patrones de Componentes

### ❌ Cards sin Padding Adecuado

**Qué es:**
Cards con padding interno <24px, haciendo que el contenido toque los bordes.

**Ejemplos prohibidos:**
```html
<!-- PROHIBIDO: p-2 (8px) es insuficiente -->
<div className="p-2 bg-white rounded border">
  <h3>Título</h3>
  <p>Descripción</p>
</div>
```

**Por qué está prohibido:**
Genera sensación de apretado, reduce legibilidad y comunica falta de atención al detalle.

**Alternativa permitida:**
Mínimo p-6 (24px):
```html
<!-- PERMITIDO -->
<div className="p-6 md:p-8 bg-white rounded border">
  <h3>Título</h3>
  <p>Descripción</p>
</div>
```

---

### ❌ Botones sin Hover States

**Qué es:**
Botones que no cambian visualmente al hacer hover.

**Por qué está prohibido:**
El usuario no sabe si el elemento es interactivo. Todos los elementos clickeables deben dar feedback visual.

**Alternativa permitida:**
Hover y active states claros:
```html
<!-- PERMITIDO -->
<button className="bg-nordia hover:brightness-90 active:scale-95 transition-all duration-150">
  Click me
</button>
```

---

### ❌ Inputs sin Labels

**Qué es:**
Inputs que solo tienen placeholder text, sin label visible.

**Ejemplos prohibidos:**
```html
<!-- PROHIBIDO -->
<input placeholder="Ingresa tu email" />
```

**Por qué está prohibido:**
1. Accesibilidad: Screen readers no pueden leer el placeholder
2. UX: El placeholder desaparece al escribir, el usuario olvida qué estaba escribiendo

**Alternativa permitida:**
Label visible + placeholder opcional:
```html
<!-- PERMITIDO -->
<label className="block text-sm font-medium text-neutral-700 mb-2">
  Email
</label>
<input placeholder="ejemplo@email.com" />
```

---

### ❌ Errores sin Mensajes Claros

**Qué es:**
Mostrar error sin explicar qué salió mal y cómo solucionarlo.

**Ejemplos prohibidos:**
- "Error 500"
- "Algo salió mal"
- "Error inesperado"

**Por qué está prohibido:**
No ayuda al usuario a resolver el problema. Todo error debe ser explicado.

**Alternativa permitida:**
Mensajes de error específicos y accionables:
```html
<!-- PERMITIDO -->
<div className="text-error text-sm mt-2">
  El email es requerido. Por favor ingresá un email válido.
</div>
```

---

### ❌ Loading States sin Feedback

**Qué es:**
Acciones que tardan >500ms sin mostrar loading indicator.

**Por qué está prohibido:**
El usuario no sabe si el sistema está procesando o si se congeló.

**Alternativa permitida:**
Loading state visible:
```html
<!-- PERMITIDO -->
<button disabled className="bg-neutral-300 cursor-not-allowed">
  <svg className="animate-spin h-5 w-5 mr-2 inline-block">...</svg>
  Cargando...
</button>
```

---

### ❌ Links sin Underline o Color Diferenciado

**Qué es:**
Links que se ven idénticos al texto normal.

**Ejemplos prohibidos:**
```html
<!-- PROHIBIDO: Parece texto normal -->
<a href="/about" className="text-neutral-700">
  Sobre nosotros
</a>
```

**Por qué está prohibido:**
El usuario no sabe que es clickeable. Los links deben ser evidentes.

**Alternativa permitida:**
Link con color diferenciado o underline:
```html
<!-- PERMITIDO -->
<a href="/about" className="text-nordia underline hover:no-underline">
  Sobre nosotros
</a>
```

---

## 6. Validación de Cumplimiento

### Checklist Pre-Deploy

Antes de deployar cualquier componente, verificar que NO contiene ninguno de estos anti-patrones:

**Visual:**
- [ ] Sin gradientes multi-color
- [ ] Sombras ≤16px blur
- [ ] Colores solo de paleta oficial
- [ ] Fondos sólidos o sutiles
- [ ] Máximo 3 colores por componente
- [ ] Iconos simples (line-art)
- [ ] Solo fonts oficiales

**Animación:**
- [ ] Duraciones ≤600ms
- [ ] Sin loops infinitos distractivos
- [ ] Sin parallax
- [ ] Sin bounce excesivo
- [ ] Sin auto-play con sonido

**Copy:**
- [ ] Sin promesas de IA generativa
- [ ] Sin buzzwords vacíos
- [ ] Sin palabra "chatbot"
- [ ] Emojis solo funcionales
- [ ] Sin exclamaciones múltiples

**UX:**
- [ ] Modals solo como respuesta a acciones
- [ ] Sin carruseles automáticos
- [ ] Sin scroll hijacking
- [ ] Tooltips con hover/click
- [ ] Formularios con progreso
- [ ] CTAs claros y distinguibles

**Componentes:**
- [ ] Cards con padding ≥24px
- [ ] Botones con hover states
- [ ] Inputs con labels visibles
- [ ] Errores con mensajes claros
- [ ] Loading states visibles
- [ ] Links distinguibles

**Si algún anti-patrón está presente, el componente NO debe ir a producción.**

---

## 7. Proceso de Excepción

Si se cree que un anti-patrón debe ser violado por razones funcionales válidas:

1. **Documentar justificación:** Por qué este caso específico requiere romper la regla
2. **Proponer alternativa:** Qué se usará en su lugar
3. **Aprobar con Design Systems Lead:** No implementar sin aprobación
4. **Documentar excepción:** Agregar nota en este archivo si se aprueba

**Ejemplo de excepción válida:**
> "Se permitió un carrusel automático en el onboarding inicial porque testeos A/B mostraron 40% más completitud. Se agregó botón de pausa visible y se respeta prefers-reduced-motion."

---

**Última actualización:** 2026-02-09
