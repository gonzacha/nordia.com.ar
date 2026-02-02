export default function LiveDemoSection() {
  return (
    <section
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
            Escribí 'setup' para configurar un negocio de ejemplo.
          </p>
        </div>

        {/* Demo Frame */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
            <iframe
              src="/demo/chatbot_demo.html"
              className="w-full h-[520px] lg:h-[560px] border-0"
              loading="lazy"
              allow="clipboard-write"
              title="Nordia Bot Demo Interactivo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
