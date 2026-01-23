# Variables de Entorno - Nordia Landing

## Setup Rápido

```bash
# Copiar template
cp .env.example .env.local

# Editar con tus valores
nano .env.local
```

## Variables Públicas (NEXT_PUBLIC_*)

Estas variables son accesibles desde el cliente (navegador). No pongas secretos acá.

### `NEXT_PUBLIC_WA_PHONE`
**Requerido** | Número de WhatsApp Business para todos los CTAs

```
NEXT_PUBLIC_WA_PHONE=5493794281273
```

- Formato: `549` + código de área + número (sin el 15)
- Sin espacios, guiones ni símbolos
- Ejemplo Corrientes: `5493794281273`

**Usado en:**
- `HeroSection.tsx` - CTA principal
- `PricingSection.tsx` - Botones de contratar
- `FloatingWhatsAppButton.tsx` - Botón flotante
- `FinalCTASection.tsx` - CTA final
- `Header.tsx` - Botón del navbar

---

### `NEXT_PUBLIC_GA_ID`
**Opcional** | Google Analytics 4 Measurement ID

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- Obtener en: [Google Analytics](https://analytics.google.com/) → Admin → Data Streams
- Formato: `G-` seguido de 10 caracteres alfanuméricos

**Usado en:**
- `app/utils/analytics.ts` - Inicialización y tracking de eventos

**Eventos trackeados:**
- `hero_cta_click` - Click en botones del hero
- `pricing_plan_selected` - Selección de plan
- `whatsapp_contact_clicked` - Click en WhatsApp
- `faq_item_opened` - Apertura de FAQ
- `testimonial_slide_viewed` - Vista de testimonios

---

### `NEXT_PUBLIC_SITE_URL`
**Requerido para SEO** | URL canónica del sitio

```
NEXT_PUBLIC_SITE_URL=https://nordia.com.ar
```

- Sin trailing slash
- Usar HTTPS en producción

**Usado en:**
- `app/utils/seo.ts` - URLs canónicas y Open Graph
- Meta tags y JSON-LD structured data

---

### `NEXT_PUBLIC_DEBUG_ANALYTICS`
**Opcional** | Modo debug para analytics

```
NEXT_PUBLIC_DEBUG_ANALYTICS=true
```

- `true`: Loguea todos los eventos en consola (desarrollo)
- `false`: Silent mode (producción)

---

### `NEXT_PUBLIC_DISABLE_TRACKING`
**Opcional** | Deshabilitar tracking completamente

```
NEXT_PUBLIC_DISABLE_TRACKING=true
```

- Útil para desarrollo local
- En producción debería ser `false` o no estar definido

---

## Variables Privadas (Solo Servidor)

Estas variables NO son accesibles desde el cliente. Seguras para secretos.

### `MERCADOPAGO_PUBLIC_KEY` / `MERCADOPAGO_ACCESS_TOKEN`
**Opcional** | Credenciales de MercadoPago

```
MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR-0000000000000000-000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-000000000
```

- Obtener en: [MercadoPago Developers](https://www.mercadopago.com.ar/developers/panel/app)
- Public Key: Para el frontend (checkout)
- Access Token: Para el backend (crear preferencias, webhooks)

---

### `EMAIL_SERVICE_API_KEY`
**Opcional** | API Key del servicio de email

```
EMAIL_SERVICE_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Servicios compatibles:
- [Resend](https://resend.com/) (recomendado)
- [SendGrid](https://sendgrid.com/)
- [Postmark](https://postmarkapp.com/)

**Usado para:**
- Formulario de contacto
- Notificaciones de nuevos leads
- Confirmaciones automáticas

---

### `EMAIL_FROM_ADDRESS` / `EMAIL_TO_ADDRESS`
**Opcional** | Direcciones de email

```
EMAIL_FROM_ADDRESS=founders@nordia.com.ar
EMAIL_TO_ADDRESS=founders@nordia.com.ar
```

- `FROM`: Remitente de emails automáticos (debe estar verificado en el servicio)
- `TO`: Destinatario de notificaciones de leads

---

## Configuración por Ambiente

### Desarrollo Local
```bash
# .env.local
NEXT_PUBLIC_WA_PHONE=5493794281273
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG_ANALYTICS=true
NEXT_PUBLIC_DISABLE_TRACKING=true
```

### Producción (Vercel)
```bash
# Configurar en Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_WA_PHONE=5493794281273
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://nordia.com.ar
NEXT_PUBLIC_DEBUG_ANALYTICS=false
```

---

## Verificar Configuración

```bash
# Ver variables cargadas (solo públicas)
npm run dev
# Abrir consola del navegador y ejecutar:
# console.log(process.env.NEXT_PUBLIC_WA_PHONE)
```

---

## Troubleshooting

### Variables no se actualizan
Next.js cachea las variables de entorno. Después de cambiar `.env.local`:
```bash
# Reiniciar el servidor de desarrollo
npm run dev
```

### Error "is not defined"
Verificar que:
1. La variable empiece con `NEXT_PUBLIC_` si se usa en el cliente
2. El archivo sea `.env.local` (no `.env`)
3. Reiniciaste el servidor después de agregar la variable

### Analytics no trackea
Verificar:
1. `NEXT_PUBLIC_GA_ID` está definido
2. `NEXT_PUBLIC_DISABLE_TRACKING` no está en `true`
3. El ID tiene formato correcto (`G-XXXXXXXXXX`)
