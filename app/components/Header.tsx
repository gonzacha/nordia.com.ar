"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  logo?: string;
  navLinks?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  whatsappNumber?: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Precios", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Demo", href: "#demo" },
];

export default function Header({
  logo = "Nordia",
  navLinks = defaultNavLinks,
  ctaText = "Empezar ahora",
  whatsappNumber = "5493794281273",
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola! Quiero información sobre Nordia WhatsApp IA"
  )}`;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">{logo}</span>
            </a>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ff88] text-neutral-900 font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {ctaText}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-neutral-900 border-l border-neutral-800 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">{logo}</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg text-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sidebar CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
