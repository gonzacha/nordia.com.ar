"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LiveDemoSection() {
  const [activeTab, setActiveTab] = useState<"basic" | "commerce" | "spa">("basic");
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load 200px before section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="live-demo"
      className="py-12 lg:py-16 bg-gray-50 scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            Probá Nordia ahora
          </h2>
          <p className="text-lg text-neutral-600">
            Elegí una demo para ver cómo funciona el sistema.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "basic"
                  ? "bg-nordia text-neutral-900"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              Demo Básica
            </button>
            <button
              onClick={() => setActiveTab("commerce")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "commerce"
                  ? "bg-nordia text-neutral-900"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              Demo Comercio
            </button>
            <button
              onClick={() => setActiveTab("spa")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "spa"
                  ? "bg-nordia text-neutral-900"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              Demo Spa/Estética
            </button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "basic" ? (
            <div>
              <p className="text-center text-sm text-neutral-600 mb-4">
                Así lo ve un paciente en su celular
              </p>
              <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
                <div className="hidden lg:block">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    Así se ve un turno dental por WhatsApp
                  </h3>
                  <ul className="space-y-3 text-neutral-700 text-lg">
                    <li>• Responde al instante</li>
                    <li>• Ofrece horarios reales</li>
                    <li>• Confirma antes del turno</li>
                    <li>• Ayuda a rellenar huecos si alguien cancela</li>
                  </ul>
                </div>
                <div className="bg-white overflow-hidden shadow-lg sm:rounded-2xl sm:border sm:border-neutral-200 lg:rounded-[32px] lg:border-neutral-300 lg:shadow-2xl lg:p-4">
                  <div className="relative bg-neutral-900 lg:rounded-[28px] lg:p-3">
                    <div className="hidden lg:block absolute left-1/2 top-3 h-4 w-24 -translate-x-1/2 rounded-full bg-neutral-800"></div>
                    {shouldLoadIframe ? (
                      <iframe
                        src="/demo/chatbot_demo.html"
                        className="w-full h-[520px] lg:h-[640px] border-0 lg:rounded-[22px] bg-black"
                        allow="clipboard-write"
                        title="Nordia Bot Demo Interactivo"
                      />
                    ) : (
                      <div className="w-full h-[520px] lg:h-[640px] flex items-center justify-center bg-neutral-50 lg:rounded-[22px]">
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-nordia mb-4"></div>
                          <p className="text-neutral-600 text-sm">Cargando demo interactiva...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600 mb-3">
                  ¿Querés ver este flujo adaptado a tu consultorio?
                </p>
                <a
                  href="https://wa.me/5493794281273"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-neutral-300 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Ver demo personalizada
                </a>
              </div>
            </div>
          ) : activeTab === "commerce" ? (
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Demo de Reactivación de Clientes
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                Mirá cómo Nordia ejecuta un flujo completo y determinístico para reactivar clientes dormidos en comercio electrónico.
              </p>
              <Link
                href="/demo/commerce"
                className="inline-block px-8 py-4 bg-nordia text-neutral-900 font-semibold rounded-xl hover:bg-nordia-dim transition-colors"
              >
                Ver Demo Completa
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Demo de Reserva de Turnos Spa
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                Mirá cómo Nordia gestiona reservas de turnos con flujo determinístico, validación de horarios y confirmaciones automáticas.
              </p>
              <Link
                href="/demo/spa"
                className="inline-block px-8 py-4 bg-nordia text-neutral-900 font-semibold rounded-xl hover:bg-nordia-dim transition-colors"
              >
                Ver Demo Completa
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
