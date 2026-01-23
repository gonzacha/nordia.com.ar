/**
 * SEO Meta Tags Generator
 * Utilidad para generar meta tags optimizados para Nordia
 */

import type { Metadata } from "next";

// ============================================
// CONFIGURACIÓN BASE
// ============================================

const SITE_CONFIG = {
  name: "Nordia WhatsApp IA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nordia.com.ar",
  locale: "es_AR",
  twitterHandle: "@nordia_ia",
  defaultImage: "/og-image.jpg",
  themeColor: "#00ff88",
};

// ============================================
// TIPOS
// ============================================

export type PageType = "home" | "pricing" | "faq" | "demo" | "blog" | "contact";

export type SEOConfig = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
};

export type BlogPostSEO = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
  slug: string;
};

// ============================================
// CONTENIDO SEO POR PÁGINA
// ============================================

const PAGE_SEO: Record<PageType, SEOConfig> = {
  home: {
    title: "Nordia WhatsApp IA | Automatización de Atención al Cliente",
    description:
      "Tu negocio responde WhatsApp 24/7 sin contratar a nadie. IA entrenada para tu negocio desde $15.000. Respondé consultas, agendá turnos y vendé más.",
    keywords: [
      "whatsapp ia",
      "automatización whatsapp",
      "chatbot whatsapp argentina",
      "atención al cliente ia",
      "respuestas automáticas whatsapp",
      "agendar turnos whatsapp",
      "whatsapp business ia",
    ],
  },
  pricing: {
    title: "Precios | Nordia WhatsApp IA - Planes desde $15.000",
    description:
      "Planes simples sin sorpresas. Plan Founder $15.000 por 3 meses o Plan Mensual $18.000/mes. Sin permanencia, cancelás cuando quieras.",
    keywords: [
      "precios nordia",
      "planes whatsapp ia",
      "chatbot whatsapp precio argentina",
      "automatización whatsapp costo",
    ],
  },
  faq: {
    title: "Preguntas Frecuentes | Nordia WhatsApp IA",
    description:
      "Todo lo que necesitás saber sobre Nordia WhatsApp IA. Setup en 48hs, funciona con tu WhatsApp Business actual, soporte argentino.",
    keywords: [
      "nordia faq",
      "preguntas frecuentes whatsapp ia",
      "como funciona chatbot whatsapp",
    ],
  },
  demo: {
    title: "Ver Demo | Nordia WhatsApp IA en Acción",
    description:
      "Mirá cómo Nordia IA responde consultas, agenda turnos y atiende clientes automáticamente. Demo interactiva en vivo.",
    keywords: ["demo whatsapp ia", "ver chatbot funcionando", "nordia demo"],
  },
  blog: {
    title: "Blog | Nordia WhatsApp IA - Tips de Automatización",
    description:
      "Consejos y guías para automatizar tu negocio con WhatsApp. Aprendé a vender más y atender mejor con inteligencia artificial.",
    keywords: [
      "blog automatización",
      "tips whatsapp business",
      "guias chatbot",
    ],
  },
  contact: {
    title: "Contacto | Nordia WhatsApp IA",
    description:
      "Contactanos por WhatsApp o email. Soporte 100% argentino, respondemos en horario comercial.",
    keywords: ["contacto nordia", "soporte nordia", "whatsapp nordia"],
  },
};

// ============================================
// GENERADOR PRINCIPAL
// ============================================

/**
 * Genera metadata de Next.js para una página
 *
 * @param page - Tipo de página
 * @param overrides - Sobreescrituras opcionales
 * @returns Objeto Metadata para Next.js
 *
 * @example
 * // En page.tsx
 * export const metadata = generateSEOMeta("home");
 *
 * @example
 * // Con sobreescrituras
 * export const metadata = generateSEOMeta("pricing", {
 *   title: "Ofertas Especiales | Nordia",
 * });
 */
export function generateSEOMeta(
  page: PageType,
  overrides?: Partial<SEOConfig>
): Metadata {
  const config = { ...PAGE_SEO[page], ...overrides };
  const { title, description, keywords, image, noIndex, canonical } = config;

  const imageUrl = image || SITE_CONFIG.defaultImage;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${SITE_CONFIG.url}${imageUrl}`;

  const canonicalUrl = canonical || `${SITE_CONFIG.url}${page === "home" ? "" : `/${page}`}`;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    other: {
      "theme-color": SITE_CONFIG.themeColor,
    },
  };
}

// ============================================
// GENERADOR PARA BLOG POSTS
// ============================================

/**
 * Genera metadata para un artículo de blog
 */
export function generateBlogPostMeta(post: BlogPostSEO): Metadata {
  const fullUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SITE_CONFIG.url}${post.image}`
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`;

  return {
    title: `${post.title} | Blog Nordia`,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : [{ name: SITE_CONFIG.name }],
    openGraph: {
      type: "article",
      locale: SITE_CONFIG.locale,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// ============================================
// JSON-LD STRUCTURED DATA
// ============================================

/**
 * Genera JSON-LD para la organización (home page)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nordia",
    description: "Automatización de atención al cliente por WhatsApp con IA",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-9-379-428-1273",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://instagram.com/nordia_ia",
      "https://twitter.com/nordia_ia",
    ],
  };
}

/**
 * Genera JSON-LD para el producto/servicio
 */
export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nordia WhatsApp IA",
    description:
      "Sistema de automatización de respuestas por WhatsApp con inteligencia artificial para PyMEs",
    brand: {
      "@type": "Brand",
      name: "Nordia",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Plan Founder",
        price: "15000",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2025-12-31",
        description: "3 meses de servicio con pago único",
      },
      {
        "@type": "Offer",
        name: "Plan Mensual",
        price: "18000",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        description: "Suscripción mensual sin permanencia",
      },
    ],
  };
}

/**
 * Genera JSON-LD para FAQ
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Genera JSON-LD para un artículo de blog
 */
export function generateArticleSchema(post: BlogPostSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image
      ? `${SITE_CONFIG.url}${post.image}`
      : `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "Equipo Nordia",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  };
}

// ============================================
// COMPONENTE PARA INYECTAR JSON-LD
// ============================================

/**
 * Genera el script tag para JSON-LD
 * Usar en layout o page con dangerouslySetInnerHTML
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
 * />
 */
export function getJsonLdScript(schema: object): string {
  return JSON.stringify(schema);
}
