"use client";

import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

type FooterProps = {
  logo?: string;
  description?: string;
  quickLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    email: string;
    phone: string;
    location: string;
  };
  whatsappNumber?: string;
};

const defaultQuickLinks: FooterLink[] = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Precios", href: "#pricing" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Demo", href: "#demo" },
];

const defaultSocialLinks: SocialLink[] = [
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://instagram.com/nordia.ia",
    label: "Instagram",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/company/nordia",
    label: "LinkedIn",
  },
];

const defaultContactInfo = {
  email: "founders@nordia.com.ar",
  phone: "+54 9 379 428-1273",
  location: "Corrientes, Argentina",
};

export default function Footer({
  logo = "Nordia",
  description = "Sistema conversacional determinístico para negocios.",
  quickLinks = defaultQuickLinks,
  socialLinks = defaultSocialLinks,
  contactInfo = defaultContactInfo,
  whatsappNumber = "5493794281273",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo & description */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">{logo}</span>
            </a>

            {/* Description */}
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-neutral-400 hover:text-[#00ff88] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-[#00ff88] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-400 hover:text-[#00ff88] text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {contactInfo.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 spacer */}
          <div />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-neutral-500 text-sm text-center sm:text-left">
              © {currentYear} Nordia. Todos los derechos reservados.
            </p>

            {/* Made in Argentina */}
            <p className="text-neutral-500 text-sm flex items-center gap-2">
              Hecho con 💚 en Argentina 🇦🇷
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
