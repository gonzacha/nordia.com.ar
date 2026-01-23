/**
 * Analytics Tracking Utility
 * Sistema de tracking de eventos para Google Analytics 4
 */

// ============================================
// TIPOS DE EVENTOS
// ============================================

export type AnalyticsEventName =
  | "hero_cta_click"
  | "pricing_plan_selected"
  | "faq_item_opened"
  | "whatsapp_contact_clicked"
  | "testimonial_slide_viewed"
  | "demo_video_played"
  | "scroll_depth_reached"
  | "form_submitted"
  | "page_view";

export type HeroCtaParams = {
  button_text: string;
  button_position: "primary" | "secondary";
};

export type PricingPlanParams = {
  plan_id: "founder" | "monthly";
  plan_name: string;
  plan_price: number;
};

export type FAQItemParams = {
  question_index: number;
  question_text: string;
  category: "Técnico" | "Comercial" | "Funcional";
};

export type WhatsAppContactParams = {
  source: "hero" | "pricing" | "floating" | "faq" | "final_cta" | "navbar";
  message_type?: string;
};

export type TestimonialParams = {
  slide_index: number;
  testimonial_name: string;
  testimonial_business: string;
};

export type DemoVideoParams = {
  video_title?: string;
  video_duration?: number;
  play_percentage?: number;
};

export type ScrollDepthParams = {
  depth_percentage: 25 | 50 | 75 | 100;
  section_reached?: string;
};

export type FormSubmittedParams = {
  form_id: string;
  form_name: string;
  success: boolean;
};

export type PageViewParams = {
  page_path: string;
  page_title: string;
  referrer?: string;
};

// Mapa de eventos a sus parámetros
export type AnalyticsEventParams = {
  hero_cta_click: HeroCtaParams;
  pricing_plan_selected: PricingPlanParams;
  faq_item_opened: FAQItemParams;
  whatsapp_contact_clicked: WhatsAppContactParams;
  testimonial_slide_viewed: TestimonialParams;
  demo_video_played: DemoVideoParams;
  scroll_depth_reached: ScrollDepthParams;
  form_submitted: FormSubmittedParams;
  page_view: PageViewParams;
};

// ============================================
// DECLARACIÓN DE GTAG GLOBAL
// ============================================

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// ============================================
// CONFIGURACIÓN
// ============================================

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const DEBUG_MODE = process.env.NODE_ENV === "development";

/**
 * Verifica si Google Analytics está disponible
 */
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Log de debug para desarrollo
 */
function debugLog(eventName: string, params: Record<string, unknown>): void {
  if (DEBUG_MODE) {
    console.log(
      `%c[Analytics] ${eventName}`,
      "color: #00ff88; font-weight: bold;",
      params
    );
  }
}

// ============================================
// FUNCIÓN PRINCIPAL DE TRACKING
// ============================================

/**
 * Trackea un evento en Google Analytics 4
 *
 * @param eventName - Nombre del evento
 * @param eventParams - Parámetros específicos del evento
 *
 * @example
 * trackEvent("hero_cta_click", {
 *   button_text: "Empezar ahora",
 *   button_position: "primary"
 * });
 *
 * @example
 * trackEvent("pricing_plan_selected", {
 *   plan_id: "founder",
 *   plan_name: "Plan Founder",
 *   plan_price: 15000
 * });
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  eventParams: AnalyticsEventParams[T]
): void {
  // Log en desarrollo
  debugLog(eventName, eventParams as Record<string, unknown>);

  // En producción, enviar a GA
  if (IS_PRODUCTION && isGtagAvailable()) {
    window.gtag!("event", eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  }
}

// ============================================
// FUNCIONES HELPER POR EVENTO
// ============================================

/**
 * Trackea click en CTA del Hero
 */
export function trackHeroCta(
  buttonText: string,
  position: "primary" | "secondary" = "primary"
): void {
  trackEvent("hero_cta_click", {
    button_text: buttonText,
    button_position: position,
  });
}

/**
 * Trackea selección de plan de pricing
 */
export function trackPricingPlan(
  planId: "founder" | "monthly",
  planName: string,
  planPrice: number
): void {
  trackEvent("pricing_plan_selected", {
    plan_id: planId,
    plan_name: planName,
    plan_price: planPrice,
  });
}

/**
 * Trackea apertura de item de FAQ
 */
export function trackFAQOpen(
  questionIndex: number,
  questionText: string,
  category: "Técnico" | "Comercial" | "Funcional"
): void {
  trackEvent("faq_item_opened", {
    question_index: questionIndex,
    question_text: questionText.substring(0, 100), // Truncar para GA
    category,
  });
}

/**
 * Trackea click en botón de WhatsApp
 */
export function trackWhatsAppClick(
  source: WhatsAppContactParams["source"],
  messageType?: string
): void {
  trackEvent("whatsapp_contact_clicked", {
    source,
    message_type: messageType,
  });
}

/**
 * Trackea visualización de testimonio
 */
export function trackTestimonialView(
  slideIndex: number,
  name: string,
  business: string
): void {
  trackEvent("testimonial_slide_viewed", {
    slide_index: slideIndex,
    testimonial_name: name,
    testimonial_business: business,
  });
}

/**
 * Trackea reproducción de video demo
 */
export function trackDemoVideo(
  title?: string,
  duration?: number,
  playPercentage?: number
): void {
  trackEvent("demo_video_played", {
    video_title: title,
    video_duration: duration,
    play_percentage: playPercentage,
  });
}

/**
 * Trackea profundidad de scroll
 */
export function trackScrollDepth(
  percentage: 25 | 50 | 75 | 100,
  sectionReached?: string
): void {
  trackEvent("scroll_depth_reached", {
    depth_percentage: percentage,
    section_reached: sectionReached,
  });
}

// ============================================
// INICIALIZACIÓN DE GA
// ============================================

/**
 * Inicializa Google Analytics (llamar en layout.tsx o _app.tsx)
 * Inyecta el script de GA si no está presente
 */
export function initializeGA(): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  // Evitar doble inicialización
  if (window.gtag) return;

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];

  // Definir gtag
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date().toISOString());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  // Inyectar script de GA
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  if (DEBUG_MODE) {
    console.log(
      "%c[Analytics] GA4 initialized",
      "color: #00ff88; font-weight: bold;",
      { measurementId: GA_MEASUREMENT_ID }
    );
  }
}

// ============================================
// HOOK DE PAGE VIEW (para Next.js App Router)
// ============================================

/**
 * Trackea page view - usar en layout o con usePathname
 */
export function trackPageView(path: string, title: string): void {
  if (!isGtagAvailable()) return;

  window.gtag!("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });

  trackEvent("page_view", {
    page_path: path,
    page_title: title,
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
  });
}
