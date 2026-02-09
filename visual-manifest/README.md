# Manifiesto Visual Oficial de Nordia

**Versión:** 1.0.0
**Fecha de creación:** 2026-02-09
**Autoridad:** Este documento es la única fuente de verdad para todo desarrollo UI/UX de Nordia

---

## Propósito

Este manifiesto define las reglas visuales, tipográficas, cromáticas y de interacción que gobiernan la identidad digital de Nordia. Su objetivo es garantizar coherencia, predictibilidad y profesionalismo en cada punto de contacto visual con el usuario.

No es una guía de estilo abierta a interpretación. Es una especificación técnica con autoridad institucional.

---

## Audiencia

Este documento está dirigido a:

1. **Diseñadores UI/UX** — Responsables de la conceptualización visual
2. **Desarrolladores frontend** — Implementadores del sistema de diseño
3. **Agentes IA (Antigravity, etc.)** — Sistemas autónomos que generan código visual
4. **Product owners** — Validadores de coherencia con la identidad de marca

---

## Estructura del Manifiesto

Este manifiesto está organizado en módulos especializados:

### [brand.md](./brand.md)
Identidad de marca, principios de diseño, posicionamiento y personalidad visual de Nordia. Define QUÉ es Nordia y cómo debe comunicarse visualmente.

### [colors.md](./colors.md)
Paleta cromática oficial con códigos hex, restricciones de uso, contraste WCAG y colores semánticos. Especifica CUÁNDO usar cada color y DÓNDE.

### [typography.md](./typography.md)
Tipografías oficiales, escala tipográfica, jerarquía visual y reglas de composición. Define CÓMO estructurar texto para máxima claridad.

### [layout.md](./layout.md)
Sistema de espaciado, grid, contenedores y estrategia responsive. Especifica DÓNDE colocar elementos y CUÁNTO espacio dejar.

### [motion.md](./motion.md)
Filosofía de animación, duraciones permitidas, easings y tipos de transición. Define CUÁNDO animar y CUÁNDO mantener estático.

### [favicon.md](./favicon.md)
Especificación técnica del favicon, concepto de diseño y formatos requeridos. Define la identidad mínima de Nordia en 16x16px.

### [anti_patterns.md](./anti_patterns.md)
Lista exhaustiva de QUÉ NO HACER. Restricciones explícitas para evitar desviaciones de la identidad visual.

---

## Principio Rector

**"Sobriedad institucional sobre impresión visual. Claridad operativa sobre innovación estética."**

Nordia es una herramienta para negocios con trayectoria que no pueden permitirse experimentar. El diseño debe comunicar:

- **Confianza sistémica** — No magia tecnológica
- **Predictibilidad** — No sorpresas
- **Profesionalismo** — No hype de startup

---

## Jerarquía de Autoridad

Cuando haya conflicto entre fuentes de información, seguir este orden:

1. **Este manifiesto visual** — Máxima autoridad
2. **Prompt específico de la tarea** — Contexto local
3. **Criterio del implementador** — Solo si 1 y 2 no especifican

---

## Versionado

Este manifiesto sigue versionado semántico:

- **MAJOR (1.x.x)** — Cambios que rompen compatibilidad (cambio de paleta, tipografías)
- **MINOR (x.1.x)** — Adiciones que no rompen compatibilidad (nuevo componente, color adicional)
- **PATCH (x.x.1)** — Correcciones y aclaraciones sin cambios funcionales

**Versión actual:** 1.0.0 (inicial)

---

## Reglas para Agentes IA

Este manifiesto visual es la **única fuente de verdad** para todo desarrollo UI/UX de Nordia.

### Reglas obligatorias:

1. ✅ Seguir especificaciones A RAJATABLA
2. ❌ NO reinterpretar
3. ❌ NO "mejorar" sin consultar
4. ❌ NO proponer variantes no solicitadas
5. ❌ NO agregar efectos no especificados
6. ❌ NO cambiar colores, tipografías o motion
7. ✅ SI hay duda, PREGUNTAR antes de implementar

### Jerarquía de autoridad:

1. Este manifiesto visual
2. Prompt específico de la tarea
3. Criterio del agente (solo si 1 y 2 no especifican)

### Validación pre-entrega:

Antes de entregar cualquier componente visual, verificar:

- [ ] Colores usados están en colors.md
- [ ] Tipografías son las oficiales de typography.md
- [ ] Spacing sigue el sistema de layout.md
- [ ] Animaciones cumplen con motion.md
- [ ] Ningún anti-patrón de anti_patterns.md está presente

---

## Contacto y Mantenimiento

Este manifiesto es un documento vivo. Las actualizaciones deben ser:

1. Propuestas con justificación técnica
2. Validadas por Design Systems Lead
3. Documentadas con changelog
4. Comunicadas a todos los equipos

**Última actualización:** 2026-02-09
