/**
 * Tipos centralizados para Nordia Landing
 * Importar desde: @/app/types
 */

// ============================================
// PRICING
// ============================================

export type PricingFeature = {
  text: string;
  included: boolean;
};

export type PricingPlan = {
  id: "founder" | "monthly" | string;
  badge: string;
  title: string;
  description: string;
  price: string;
  priceDetail: string;
  features: PricingFeature[];
  note: string;
  ctaText: string;
  valueComparison: string;
  highlighted: boolean;
};

export type PricingGuarantee = {
  title: string;
  description: string;
};

// ============================================
// TESTIMONIALS
// ============================================

export type Testimonial = {
  id?: string | number;
  name: string;
  business: string;
  city: string;
  text: string;
  avatar?: string;
  rating?: number;
};

// ============================================
// FAQ
// ============================================

export type FAQCategory = "Técnico" | "Comercial" | "Funcional";

export type FAQ = {
  id?: string | number;
  category: FAQCategory;
  question: string;
  answer: string;
};

// ============================================
// BENEFITS
// ============================================

export type BenefitTag = "Automatización" | "Personalización" | "Soporte";

export type Benefit = {
  id?: string | number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: BenefitTag;
};

// ============================================
// PROCESS / HOW IT WORKS
// ============================================

export type ProcessStep = {
  id?: string | number;
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlight?: string;
};

// ============================================
// PAIN POINTS
// ============================================

export type PainPoint = {
  id?: string | number;
  emoji: string;
  title: string;
  description: string;
  stat?: string;
};

// ============================================
// CTA / BUTTONS
// ============================================

export type CTAVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";

export type CTAProps = {
  text: string;
  href: string;
  variant?: CTAVariant;
  icon?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
};

// ============================================
// NAVIGATION
// ============================================

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

// ============================================
// CONTACT / FOOTER
// ============================================

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  whatsapp?: string;
};

// ============================================
// ANALYTICS
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

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  params?: Record<string, string | number | boolean>;
  timestamp?: string;
};

// ============================================
// SEO
// ============================================

export type SEOPageType = "home" | "pricing" | "faq" | "demo" | "blog" | "contact";

export type SEOMeta = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
};

export type OpenGraphMeta = {
  type: "website" | "article";
  locale: string;
  url: string;
  siteName: string;
  title: string;
  description: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
};

// ============================================
// FORMS
// ============================================

export type FormFieldType = "email" | "phone" | "name" | "message" | "custom";

export type FormField = {
  name: string;
  type: FormFieldType;
  value: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

export type FormState = {
  fields: Record<string, FormField>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
};

// ============================================
// DEVICE / RESPONSIVE
// ============================================

export type DeviceType = "mobile" | "tablet" | "desktop";

export type DeviceInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  deviceType: DeviceType;
  windowWidth: number;
  windowHeight: number;
  orientation: "portrait" | "landscape";
};

// ============================================
// CHAT SIMULATOR
// ============================================

export type ChatMessageType = "user" | "bot";

export type ChatMessage = {
  id: number | string;
  type: ChatMessageType;
  text: string;
  time: string;
};

// ============================================
// COMPARISON TABLE
// ============================================

export type ComparisonFeature = {
  feature: string;
  nordia: string | boolean;
  employee: string | boolean;
  nothing: string | boolean;
};

// ============================================
// STATS
// ============================================

export type Stat = {
  id?: string | number;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
};

// ============================================
// GENERIC / UTILITY TYPES
// ============================================

/** Hace todas las propiedades de T opcionales recursivamente */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Extrae el tipo de los elementos de un array */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/** Props comunes para secciones de la landing */
export type SectionProps = {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
};

/** Props para componentes con WhatsApp */
export type WithWhatsApp = {
  whatsappNumber?: string;
};
